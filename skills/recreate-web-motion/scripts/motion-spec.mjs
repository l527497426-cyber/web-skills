#!/usr/bin/env node

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const templatePath = path.resolve(scriptDirectory, "../assets/motion-spec.template.json");

const allowedDrivers = new Set([
  "load",
  "time-loop",
  "scroll-scrub",
  "scroll-play",
  "hover-focus",
  "pointer-follow",
  "pointer-proximity",
  "drag",
  "inertia",
  "modal-transition",
  "page-transition"
]);
const allowedEvidence = new Set(["observed", "fitted", "unknown"]);
const allowedConfidence = new Set(["high", "medium", "low"]);
const allowedReducedStrategies = new Set(["show-final-state", "shorten", "replace", "disable"]);
const allowedAcceptance = new Set(["pending", "pass", "fail", "skipped"]);
const allowedLayoutModes = new Set(["normal-flow", "sticky", "pinned", "fixed", "translated-track"]);

function usage() {
  console.log(`Usage:
  node motion-spec.mjs init <output.json> [--name <name>] [--reference <url>]
  node motion-spec.mjs validate <motion-spec.json>
  node motion-spec.mjs summary <motion-spec.json>`);
}

function valueAfter(args, flag) {
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  if (!args[index + 1] || args[index + 1].startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return args[index + 1];
}

async function readJson(filePath) {
  const source = await readFile(filePath, "utf8");
  try {
    return JSON.parse(source);
  } catch (error) {
    throw new Error(`Invalid JSON in ${filePath}: ${error.message}`);
  }
}

async function assertMissing(filePath) {
  try {
    await access(filePath, fsConstants.F_OK);
    throw new Error(`Refusing to overwrite existing file: ${filePath}`);
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
}

async function initialize(filePath, args) {
  const resolved = path.resolve(filePath);
  await assertMissing(resolved);
  const spec = await readJson(templatePath);
  spec.project.name = valueAfter(args, "--name") ?? spec.project.name;
  spec.project.referenceUrl = valueAfter(args, "--reference") ?? spec.project.referenceUrl;
  spec.project.auditedAt = new Date().toISOString();
  await mkdir(path.dirname(resolved), { recursive: true });
  await writeFile(resolved, `${JSON.stringify(spec, null, 2)}\n`, "utf8");
  console.log(`Created ${resolved}`);
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateSpec(spec) {
  const issues = [];
  const add = (severity, field, message) => issues.push({ severity, field, message });
  const error = (field, message) => add("error", field, message);
  const warn = (field, message) => add("warning", field, message);

  if (!isObject(spec)) {
    error("$", "The root value must be an object.");
    return issues;
  }
  if (spec.schemaVersion !== 1) error("schemaVersion", "Expected schemaVersion 1.");
  if (!isObject(spec.project)) error("project", "Project metadata is required.");
  if (!isNonEmptyString(spec.project?.name)) error("project.name", "Project name is required.");

  const viewports = spec.project?.viewports;
  if (!Array.isArray(viewports) || viewports.length === 0) {
    error("project.viewports", "At least one viewport is required.");
  } else {
    const viewportIds = new Set();
    viewports.forEach((viewport, index) => {
      const field = `project.viewports[${index}]`;
      if (!isNonEmptyString(viewport?.id)) error(`${field}.id`, "Viewport id is required.");
      else if (viewportIds.has(viewport.id)) error(`${field}.id`, `Duplicate viewport id: ${viewport.id}`);
      else viewportIds.add(viewport.id);
      for (const key of ["width", "height", "dpr"]) {
        if (typeof viewport?.[key] !== "number" || viewport[key] <= 0) error(`${field}.${key}`, "Must be a positive number.");
      }
      if (viewport?.tested !== true) warn(`${field}.tested`, "Viewport is not marked as tested.");
    });
  }

  if (!isObject(spec.runtime)) error("runtime", "Runtime policy is required.");
  const rootReduced = spec.runtime?.reducedMotion;
  if (!isObject(rootReduced)) error("runtime.reducedMotion", "Reduced-motion policy is required.");
  else {
    if (!allowedReducedStrategies.has(rootReduced.strategy)) error("runtime.reducedMotion.strategy", "Unknown reduced-motion strategy.");
    if (rootReduced.tested !== true) warn("runtime.reducedMotion.tested", "Reduced motion is not marked as tested.");
  }

  if (!Array.isArray(spec.scenes) || spec.scenes.length === 0) error("scenes", "At least one visual scene is required.");
  if (spec.globalEffects !== undefined && !Array.isArray(spec.globalEffects)) error("globalEffects", "Must be an array.");

  const sceneIds = new Set();
  const effectIds = new Set();
  const effects = [];

  (spec.scenes ?? []).forEach((scene, sceneIndex) => {
    const field = `scenes[${sceneIndex}]`;
    if (!isNonEmptyString(scene?.id)) error(`${field}.id`, "Scene id is required.");
    else if (!/^[a-z0-9][a-z0-9-]*$/.test(scene.id)) error(`${field}.id`, "Use lowercase kebab-case.");
    else if (sceneIds.has(scene.id)) error(`${field}.id`, `Duplicate scene id: ${scene.id}`);
    else sceneIds.add(scene.id);
    if (!isNonEmptyString(scene?.label)) error(`${field}.label`, "Scene label is required.");
    if (!isObject(scene?.layout)) error(`${field}.layout`, "Layout record is required.");
    else if (!allowedLayoutModes.has(scene.layout.mode)) error(`${field}.layout.mode`, "Unknown layout mode.");
    if (!Array.isArray(scene?.effects)) error(`${field}.effects`, "Effects must be an array.");
    else scene.effects.forEach((effect, effectIndex) => effects.push({ effect, field: `${field}.effects[${effectIndex}]` }));
  });
  (spec.globalEffects ?? []).forEach((effect, effectIndex) => effects.push({ effect, field: `globalEffects[${effectIndex}]` }));

  effects.forEach(({ effect, field }) => {
    if (!isObject(effect)) {
      error(field, "Effect must be an object.");
      return;
    }
    if (!isNonEmptyString(effect.id)) error(`${field}.id`, "Effect id is required.");
    else if (!/^[a-z0-9][a-z0-9-]*$/.test(effect.id)) error(`${field}.id`, "Use lowercase kebab-case.");
    else if (effectIds.has(effect.id)) error(`${field}.id`, `Duplicate effect id: ${effect.id}`);
    else effectIds.add(effect.id);
    if (!isNonEmptyString(effect.label)) error(`${field}.label`, "Effect label is required.");
    if (!isNonEmptyString(effect.target)) error(`${field}.target`, "Target is required.");
    else if (effect.target.includes("replace-me")) warn(`${field}.target`, "Replace the starter target.");
    if (!isNonEmptyString(effect.family)) error(`${field}.family`, "Effect family is required.");
    if (!allowedDrivers.has(effect.driver)) error(`${field}.driver`, `Unknown driver: ${effect.driver}`);

    if (!isObject(effect.playback)) error(`${field}.playback`, "Playback semantics are required.");
    if (!isObject(effect.timing)) error(`${field}.timing`, "Timing is required.");
    else {
      for (const key of ["durationMs", "delayMs", "staggerMs"]) {
        const value = effect.timing[key];
        if (value !== null && value !== undefined && (typeof value !== "number" || value < 0 || !Number.isFinite(value))) {
          error(`${field}.timing.${key}`, "Must be a finite non-negative number or null.");
        }
      }
    }

    if (effect.driver === "scroll-scrub") {
      if (!isObject(effect.trigger)) error(`${field}.trigger`, "Scroll scrub requires a trigger object.");
      else {
        if (!isNonEmptyString(effect.trigger.start)) warn(`${field}.trigger.start`, "Scroll start remains unknown.");
        if (!isNonEmptyString(effect.trigger.end)) warn(`${field}.trigger.end`, "Scroll end remains unknown.");
      }
    }
    if (["drag", "inertia", "pointer-follow", "pointer-proximity"].includes(effect.driver) && !isObject(effect.parameters)) {
      error(`${field}.parameters`, `${effect.driver} requires a parameters object.`);
    }

    if (!isObject(effect.reducedMotion)) error(`${field}.reducedMotion`, "Every effect needs a reduced-motion policy.");
    else if (!allowedReducedStrategies.has(effect.reducedMotion.strategy)) error(`${field}.reducedMotion.strategy`, "Unknown reduced-motion strategy.");

    if (!isObject(effect.editor)) error(`${field}.editor`, "Every effect needs an editor registration.");
    else if (effect.editor.enabled === true && (!Array.isArray(effect.editor.controls) || effect.editor.controls.length === 0)) {
      error(`${field}.editor.controls`, "An editor-enabled effect needs at least one control.");
    }

    const evidence = effect.evidence;
    if (!isObject(evidence)) error(`${field}.evidence`, "Evidence record is required.");
    else {
      if (!allowedEvidence.has(evidence.status)) error(`${field}.evidence.status`, "Use observed, fitted, or unknown.");
      if (!allowedConfidence.has(evidence.confidence)) error(`${field}.evidence.confidence`, "Use high, medium, or low.");
      if (evidence.status === "observed" && (!Array.isArray(evidence.observations) || evidence.observations.length === 0)) {
        error(`${field}.evidence.observations`, "Observed evidence needs at least one observation.");
      }
      if (evidence.status === "fitted") {
        if (!Array.isArray(evidence.basis) || evidence.basis.length === 0) error(`${field}.evidence.basis`, "Fitted evidence needs a basis.");
        if (!evidence.tolerance) error(`${field}.evidence.tolerance`, "Fitted evidence needs a tolerance.");
      }
      if (evidence.status === "unknown" && (!Array.isArray(evidence.unknowns) || evidence.unknowns.length === 0)) {
        error(`${field}.evidence.unknowns`, "Unknown evidence needs a reason or unknown item.");
      }
    }
  });

  if (!Array.isArray(spec.acceptance) || spec.acceptance.length === 0) {
    error("acceptance", "At least one acceptance check is required.");
  } else {
    const acceptanceIds = new Set();
    spec.acceptance.forEach((item, index) => {
      const field = `acceptance[${index}]`;
      if (!isNonEmptyString(item?.id)) error(`${field}.id`, "Acceptance id is required.");
      else if (acceptanceIds.has(item.id)) error(`${field}.id`, `Duplicate acceptance id: ${item.id}`);
      else acceptanceIds.add(item.id);
      if (!isNonEmptyString(item?.description)) error(`${field}.description`, "Acceptance description is required.");
      if (!allowedAcceptance.has(item?.status)) error(`${field}.status`, "Use pending, pass, fail, or skipped.");
      if (item?.status === "pass" && (!Array.isArray(item.evidence) || item.evidence.length === 0)) {
        error(`${field}.evidence`, "A passed check needs evidence.");
      }
    });
  }

  return issues;
}

function printIssues(issues) {
  for (const issue of issues) {
    console.log(`${issue.severity.toUpperCase()} ${issue.field}: ${issue.message}`);
  }
  const errors = issues.filter((issue) => issue.severity === "error").length;
  const warnings = issues.filter((issue) => issue.severity === "warning").length;
  console.log(`${errors} error(s), ${warnings} warning(s)`);
  return errors;
}

async function validate(filePath) {
  const resolved = path.resolve(filePath);
  const spec = await readJson(resolved);
  const errors = printIssues(validateSpec(spec));
  if (errors > 0) process.exitCode = 1;
  else console.log(`Valid motion spec: ${resolved}`);
}

async function summarize(filePath) {
  const resolved = path.resolve(filePath);
  const spec = await readJson(resolved);
  const issues = validateSpec(spec);
  const effects = [
    ...(spec.scenes ?? []).flatMap((scene) => scene.effects ?? []),
    ...(spec.globalEffects ?? [])
  ];
  const countBy = (values) => values.reduce((counts, value) => {
    const key = value ?? "missing";
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
  const summary = {
    file: resolved,
    schemaVersion: spec.schemaVersion,
    scenes: spec.scenes?.length ?? 0,
    effects: effects.length,
    evidence: countBy(effects.map((effect) => effect.evidence?.status)),
    drivers: countBy(effects.map((effect) => effect.driver)),
    testedViewports: (spec.project?.viewports ?? []).filter((viewport) => viewport.tested).map((viewport) => viewport.id),
    acceptance: countBy((spec.acceptance ?? []).map((item) => item.status)),
    validation: {
      errors: issues.filter((issue) => issue.severity === "error").length,
      warnings: issues.filter((issue) => issue.severity === "warning").length
    }
  };
  console.log(JSON.stringify(summary, null, 2));
  if (summary.validation.errors > 0) process.exitCode = 1;
}

async function main() {
  const [, , command, filePath, ...args] = process.argv;
  if (!command || !filePath || !["init", "validate", "summary"].includes(command)) {
    usage();
    process.exitCode = 1;
    return;
  }
  if (!filePath.endsWith(".json")) throw new Error("Motion spec path must end in .json.");
  if (command === "init") await initialize(filePath, args);
  if (command === "validate") await validate(filePath);
  if (command === "summary") await summarize(filePath);
}

main().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
});
