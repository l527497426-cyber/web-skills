#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const templatePath = path.resolve(scriptDirectory, "../assets/experience-blueprint.template.json");

const pageTypes = new Set(["auth", "landing", "brand", "product", "marketing", "other"]);
const auditStates = new Set(["uninspected", "inspected", "verified"]);
const deliveryStates = new Set(["proposal", "approved", "implemented", "verified"]);
const preserveKinds = new Set(["fact", "flow", "route", "integration", "legal", "asset", "binding", "state"]);
const verificationStates = new Set(["pending", "verified", "unknown"]);
const contentDispositions = new Set(["keep", "rewrite", "merge", "split", "remove"]);
const decisionLabels = new Set(["preserved", "reframed", "invented", "omitted", "deferred"]);
const truthStates = new Set(["existing", "verified", "framing", "unknown"]);
const claimStates = new Set(["source-backed", "user-approved-new", "unverified"]);
const directionStates = new Set(["proposal", "approved"]);
const sceneRoles = new Set(["orient", "tension", "promise", "proof", "interaction", "conversion", "closure"]);
const evidenceStates = new Set(["observed", "fitted", "unknown"]);
const adoptionStates = new Set(["adopt", "adapt", "reject", "new"]);
const patternDecisionStates = new Set(["keep", "conditional", "exclude"]);
const projectDecisionStates = new Set(["proposal", "approved", "implemented", "verified"]);
const parameterOrigins = new Set(["current-library-preset", "measured", "project-proposal", "approved"]);
const originKinds = new Set(["project-original", "motion-spec-import", "named-preset"]);
const reducedStrategies = new Set(["show-final-state", "shorten", "replace", "disable"]);
const acceptanceCategories = new Set(["content", "visual", "motion", "functional", "responsive", "a11y", "performance"]);
const acceptanceStates = new Set(["pending", "passed", "failed", "blocked"]);
const evidenceTypes = new Set(["test", "screenshot", "recording", "code", "manual", "command", "report", "log"]);
const implementationNamespaces = {
  routes: ["id", "path", "route", "ref", "name"],
  files: ["id", "path", "file", "ref", "name"],
  preservedBindings: ["id", "binding", "ref", "name"],
  components: ["id", "component", "ref", "name"],
  stateOwnership: ["id", "state", "ref", "name"],
  integrationInterfaces: ["id", "interface", "ref", "name"],
  featureFlags: ["id", "flag", "ref", "name"]
};
const authAcceptanceRequirements = new Map([
  ["qa-auth-labels", "a11y"],
  ["qa-auth-errors", "functional"],
  ["qa-auth-focus", "a11y"],
  ["qa-auth-keyboard", "a11y"],
  ["qa-auth-autofill", "functional"]
]);

function usage() {
  console.log(`Usage:
  node experience-blueprint.mjs init <output.json> [--name <name>] [--page-type <type>] [--source <path>]
  node experience-blueprint.mjs validate <experience-blueprint.json>
  node experience-blueprint.mjs trace <experience-blueprint.json> [--allow-invalid]
  node experience-blueprint.mjs summary <experience-blueprint.json> [--allow-invalid]`);
}

function parseOptions(args, valueFlags = new Set(), booleanFlags = new Set()) {
  const options = new Map();
  for (let index = 0; index < args.length; index += 1) {
    const flag = args[index];
    if (!valueFlags.has(flag) && !booleanFlags.has(flag)) throw new Error(`Unknown option: ${flag}`);
    if (options.has(flag)) throw new Error(`Duplicate option: ${flag}`);
    if (booleanFlags.has(flag)) {
      options.set(flag, true);
      continue;
    }
    const value = args[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value.`);
    options.set(flag, value);
    index += 1;
  }
  return options;
}

async function readJson(filePath) {
  const source = await readFile(filePath, "utf8");
  try {
    return JSON.parse(source);
  } catch (error) {
    throw new Error(`Invalid JSON in ${filePath}: ${error.message}`);
  }
}

async function initialize(filePath, args) {
  const resolved = path.resolve(filePath);
  const options = parseOptions(args, new Set(["--name", "--page-type", "--source"]));
  const blueprint = await readJson(templatePath);
  const name = options.get("--name");
  const pageType = options.get("--page-type");
  const source = options.get("--source");
  if (pageType && !pageTypes.has(pageType)) {
    throw new Error(`Unknown page type: ${pageType}. Use ${[...pageTypes].join(", ")}.`);
  }
  if (name) blueprint.project.name = name;
  if (pageType) blueprint.project.pageType = pageType;
  if (source) blueprint.project.sourcePaths = [source];
  if (blueprint.project.pageType === "auth") {
    blueprint.acceptance.push(
      {
        id: "qa-auth-labels",
        category: "a11y",
        criterion: "Every authentication control has a persistent visible label or accessible name.",
        status: "pending",
        evidence: []
      },
      {
        id: "qa-auth-errors",
        category: "functional",
        criterion: "Validation and server errors remain visible, specific, recoverable, and announced accessibly.",
        status: "pending",
        evidence: []
      },
      {
        id: "qa-auth-focus",
        category: "a11y",
        criterion: "Focus remains visible and returns to a logical control after authentication state changes.",
        status: "pending",
        evidence: []
      },
      {
        id: "qa-auth-keyboard",
        category: "a11y",
        criterion: "Keyboard navigation and Tab order complete every authentication path without motion interference.",
        status: "pending",
        evidence: []
      },
      {
        id: "qa-auth-autofill",
        category: "functional",
        criterion: "Autocomplete, browser autofill, and password-manager behavior remain compatible with the form.",
        status: "pending",
        evidence: []
      }
    );
  }
  const issues = validateBlueprint(blueprint);
  const errors = issues.filter((item) => item.severity === "error");
  if (errors.length > 0) {
    printIssues(issues);
    throw new Error("Refusing to create a blueprint from an invalid bundled template.");
  }
  await mkdir(path.dirname(resolved), { recursive: true });
  try {
    await writeFile(resolved, `${JSON.stringify(blueprint, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
  } catch (error) {
    if (error.code === "EEXIST") throw new Error(`Refusing to overwrite existing file: ${resolved}`);
    throw error;
  }
  console.log(`Created ${resolved}`);
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isString(value) {
  return typeof value === "string";
}

function isNonEmptyString(value) {
  return isString(value) && value.trim().length > 0;
}

function isId(value) {
  return isNonEmptyString(value) && /^[a-z0-9][a-z0-9-]*$/.test(value);
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function isNonEmptyObject(value) {
  return isObject(value) && Object.keys(value).length > 0;
}

function hasMeaningfulValue(value) {
  if (isNonEmptyString(value)) return true;
  if (isBoolean(value)) return true;
  if (typeof value === "number" && Number.isFinite(value)) return true;
  if (Array.isArray(value)) return value.some(hasMeaningfulValue);
  if (isObject(value)) return Object.values(value).some(hasMeaningfulValue);
  return false;
}

function isMeaningfulObject(value) {
  return isNonEmptyObject(value) && hasMeaningfulValue(value);
}

function isMeaningfulItem(value) {
  return isNonEmptyString(value) || isMeaningfulObject(value);
}

function isPlaceholder(value) {
  return isString(value) && /\[replace-me\]/i.test(value);
}

function isEvidenceItem(value) {
  if (!isNonEmptyObject(value)) return false;
  return evidenceTypes.has(value.type) && isNonEmptyString(value.ref) && !isPlaceholder(value.ref);
}

function referenceEvidenceOf(value) {
  if (!isObject(value)) return undefined;
  return value.referenceEvidence ?? value.sourceEvidence;
}

function implementationItemRefs(item, keys) {
  if (isNonEmptyString(item)) return [item.trim()];
  if (!isObject(item)) return [];
  return [...new Set(keys.filter((key) => isNonEmptyString(item[key])).map((key) => item[key].trim()))];
}

function collectImplementationRefs(implementation, error) {
  const refs = new Set();
  const owners = new Map();
  for (const [namespace, keys] of Object.entries(implementationNamespaces)) {
    asArray(implementation?.[namespace]).forEach((item, index) => {
      const field = `implementation.${namespace}[${index}]`;
      const itemRefs = implementationItemRefs(item, keys);
      if (itemRefs.length === 0) return;
      const location = `${namespace}[${index}]`;
      itemRefs.forEach((ref) => {
        const previous = owners.get(ref);
        if (previous && previous !== location) {
          error(field, `Implementation reference "${ref}" conflicts with ${previous}. Use globally unique references.`);
        } else {
          owners.set(ref, location);
          refs.add(ref);
        }
      });
    });
  }
  return { refs, owners };
}

function validateBlueprint(blueprint) {
  const issues = [];
  const add = (severity, field, message) => issues.push({ severity, field, message });
  const error = (field, message) => add("error", field, message);
  const warn = (field, message) => add("warning", field, message);
  const validateStringArray = (value, field, { nonEmpty = false } = {}) => {
    if (!Array.isArray(value)) {
      error(field, "Use an array of non-empty strings.");
      return [];
    }
    const seen = new Set();
    value.forEach((item, index) => {
      if (!isNonEmptyString(item)) {
        error(`${field}[${index}]`, "Use a non-empty string.");
        return;
      }
      const normalized = item.trim();
      if (seen.has(normalized)) error(`${field}[${index}]`, `Duplicate reference or value: ${normalized}`);
      else seen.add(normalized);
    });
    if (nonEmpty && value.length === 0) error(field, "At least one item is required.");
    return value;
  };
  const validateMeaningfulArray = (value, field) => {
    if (!Array.isArray(value)) {
      error(field, "Use an array.");
      return [];
    }
    value.forEach((item, index) => {
      if (!isMeaningfulItem(item)) error(`${field}[${index}]`, "Use a non-empty string or non-empty object.");
    });
    return value;
  };
  const validateObjectArray = (value, field) => {
    if (!Array.isArray(value)) {
      error(field, "Use an array of objects.");
      return [];
    }
    value.forEach((item, index) => {
      if (!isObject(item)) error(`${field}[${index}]`, "Use an object.");
    });
    return value;
  };
  const validateReferenceEvidence = (holder, field) => {
    if (!isObject(holder)) return undefined;
    const hasCanonical = Object.prototype.hasOwnProperty.call(holder, "referenceEvidence");
    const hasLegacy = Object.prototype.hasOwnProperty.call(holder, "sourceEvidence");
    if (hasCanonical && hasLegacy && holder.referenceEvidence !== holder.sourceEvidence) {
      error(`${field}.referenceEvidence`, "referenceEvidence conflicts with deprecated sourceEvidence.");
    }
    if (hasLegacy) warn(`${field}.sourceEvidence`, "sourceEvidence is deprecated; migrate it to referenceEvidence.");
    const evidence = referenceEvidenceOf(holder);
    if (!evidenceStates.has(evidence)) error(`${field}.referenceEvidence`, "Use observed, fitted, or unknown.");
    return evidence;
  };

  if (!isObject(blueprint)) {
    error("$", "The root value must be an object.");
    return issues;
  }
  if (blueprint.schemaVersion !== 1) error("schemaVersion", "Expected schemaVersion 1.");
  if (!isObject(blueprint.project)) error("project", "Project metadata is required.");
  if (!isNonEmptyString(blueprint.project?.name)) error("project.name", "Project name is required.");
  if (blueprint.project?.mode !== "existing-page-redesign") {
    error("project.mode", "Expected existing-page-redesign; this blueprint is not for a blank-slate build or fidelity clone.");
  }
  if (!auditStates.has(blueprint.project?.auditStatus)) error("project.auditStatus", "Use uninspected, inspected, or verified.");
  if (blueprint.project?.auditStatus === "uninspected") warn("project.auditStatus", "The blueprint is provisional until the actual implementation is inspected.");
  if (!deliveryStates.has(blueprint.project?.deliveryStatus)) {
    error("project.deliveryStatus", "Use proposal, approved, implemented, or verified.");
  }
  if (!pageTypes.has(blueprint.project?.pageType)) error("project.pageType", "Unknown page type.");
  const sourcePaths = validateStringArray(blueprint.project?.sourcePaths, "project.sourcePaths");
  const targetRoutes = validateStringArray(blueprint.project?.targetRoutes, "project.targetRoutes");
  if (sourcePaths.length === 0) warn("project.sourcePaths", "No existing source path is recorded.");
  if (targetRoutes.length === 0) warn("project.targetRoutes", "No target route is recorded.");
  if (!isBoolean(blueprint.project?.localOnly)) error("project.localOnly", "Use a boolean.");
  if (["inspected", "verified"].includes(blueprint.project?.auditStatus)) {
    sourcePaths.forEach((item, index) => {
      if (isPlaceholder(item)) error(`project.sourcePaths[${index}]`, "Replace placeholder paths before marking the audit inspected or verified.");
    });
  }
  if (["approved", "implemented", "verified"].includes(blueprint.project?.deliveryStatus)) {
    targetRoutes.forEach((item, index) => {
      if (isPlaceholder(item)) error(`project.targetRoutes[${index}]`, "Replace placeholder routes before approving or delivering the redesign.");
    });
  }

  const viewports = validateObjectArray(blueprint.project?.viewports, "project.viewports");
  if (Array.isArray(blueprint.project?.viewports) && viewports.length === 0) error("project.viewports", "At least one viewport is required.");
  const viewportIds = new Set();
  viewports.forEach((viewport, index) => {
    const field = `project.viewports[${index}]`;
    if (!isObject(viewport)) return;
    if (!isId(viewport?.id)) error(`${field}.id`, "Use a unique lowercase kebab-case id.");
    else if (viewportIds.has(viewport.id)) error(`${field}.id`, `Duplicate viewport id: ${viewport.id}`);
    else viewportIds.add(viewport.id);
    for (const key of ["width", "height"]) {
      if (typeof viewport[key] !== "number" || !Number.isFinite(viewport[key]) || viewport[key] <= 0) error(`${field}.${key}`, "Use a finite positive number.");
    }
    if (!isNonEmptyString(viewport.input)) error(`${field}.input`, "Record the input mode.");
    if (!isBoolean(viewport.tested)) error(`${field}.tested`, "Use a boolean.");
    else if (!viewport.tested) warn(`${field}.tested`, "Viewport is not marked as tested.");
  });

  if (!isObject(blueprint.brief)) error("brief", "A brief is required.");
  if (!isNonEmptyString(blueprint.brief?.experienceThesis)) warn("brief.experienceThesis", "Add one testable experience thesis before selecting a direction.");
  const audiences = validateMeaningfulArray(blueprint.brief?.audiences, "brief.audiences");
  const businessGoals = validateMeaningfulArray(blueprint.brief?.businessGoals, "brief.businessGoals");
  validateStringArray(blueprint.brief?.desiredEmotions, "brief.desiredEmotions");
  validateStringArray(blueprint.brief?.antiGoals, "brief.antiGoals");
  if (audiences.length === 0) warn("brief.audiences", "Record at least one audience.");
  if (businessGoals.length === 0) warn("brief.businessGoals", "Record the business goal that the redesign must serve.");
  if (!isObject(blueprint.brief?.primaryAction)) error("brief.primaryAction", "Primary action metadata is required.");
  else {
    if (!isNonEmptyString(blueprint.brief.primaryAction.label)) warn("brief.primaryAction.label", "Record the visible primary action label.");
    if (!isNonEmptyString(blueprint.brief.primaryAction.target)) warn("brief.primaryAction.target", "Record a route, selector, or flow id for the primary action.");
  }

  if (!isObject(blueprint.preservationContract)) error("preservationContract", "A preservation contract is required.");
  const preserveItems = validateObjectArray(blueprint.preservationContract?.mustPreserve, "preservationContract.mustPreserve");
  if (Array.isArray(blueprint.preservationContract?.mustPreserve) && preserveItems.length === 0) {
    error("preservationContract.mustPreserve", "Record at least one product fact, flow, route, binding, or legal constraint.");
  }
  for (const key of ["mayTransform", "mustNotInvent", "functionalFlows"]) {
    validateMeaningfulArray(blueprint.preservationContract?.[key], `preservationContract.${key}`);
  }

  const preserveIds = new Set();
  preserveItems.forEach((item, index) => {
    const field = `preservationContract.mustPreserve[${index}]`;
    if (!isObject(item)) return;
    if (!isId(item?.id)) error(`${field}.id`, "Use a unique lowercase kebab-case id.");
    else if (preserveIds.has(item.id)) error(`${field}.id`, `Duplicate preservation id: ${item.id}`);
    else preserveIds.add(item.id);
    if (!preserveKinds.has(item?.kind)) error(`${field}.kind`, "Unknown preservation kind.");
    if (!isNonEmptyString(item?.label)) error(`${field}.label`, "Describe the preserved contract.");
    if (!isNonEmptyString(item?.sourceRef)) error(`${field}.sourceRef`, "Point to the current source or evidence.");
    if (!verificationStates.has(item?.verification)) error(`${field}.verification`, "Use pending, verified, or unknown.");
    if (item?.verification === "verified" && isPlaceholder(item.sourceRef)) {
      error(`${field}.sourceRef`, "Verified preservation requires a non-placeholder source reference.");
    }
    const sceneRefs = validateStringArray(item.sceneIds, `${field}.sceneIds`);
    const codeRefs = validateStringArray(item.implementationRefs, `${field}.implementationRefs`);
    if (sceneRefs.length + codeRefs.length === 0) {
      warn(field, "Connect the preserved item to at least one scene or implementation reference.");
    }
  });

  const content = validateObjectArray(blueprint.contentInventory, "contentInventory");
  if (Array.isArray(blueprint.contentInventory) && content.length === 0) error("contentInventory", "Inventory the existing content before redesigning it.");
  const contentIds = new Set();
  content.forEach((item, index) => {
    const field = `contentInventory[${index}]`;
    if (!isObject(item)) return;
    if (!isId(item?.id)) error(`${field}.id`, "Use a unique lowercase kebab-case id.");
    else if (contentIds.has(item.id)) error(`${field}.id`, `Duplicate content id: ${item.id}`);
    else contentIds.add(item.id);
    const itemSourceRefs = validateStringArray(item.sourceRefs, `${field}.sourceRefs`);
    if (itemSourceRefs.length === 0) error(`${field}.sourceRefs`, "Trace the item to existing source content.");
    const hasPlaceholderSource = itemSourceRefs.some(isPlaceholder);
    if (!isNonEmptyString(item?.kind)) error(`${field}.kind`, "Content kind is required.");
    if (!isNonEmptyString(item?.role)) error(`${field}.role`, "Content role is required.");
    if (!truthStates.has(item?.truthStatus)) error(`${field}.truthStatus`, "Use existing, verified, framing, or unknown.");
    if (!contentDispositions.has(item?.disposition)) error(`${field}.disposition`, "Unknown content disposition.");
    if (!decisionLabels.has(item?.decisionLabel)) error(`${field}.decisionLabel`, "Use preserved, reframed, invented, omitted, or deferred.");
    if (!claimStates.has(item?.claimStatus)) error(`${field}.claimStatus`, "Unknown claim status.");
    validateMeaningfulArray(item.factualClaims, `${field}.factualClaims`);
    const itemSceneIds = validateStringArray(item.sceneIds, `${field}.sceneIds`);
    if (item?.disposition === "remove") {
      if (!isNonEmptyString(item?.rationale)) error(`${field}.rationale`, "Every removal needs a rationale.");
      if (itemSceneIds.length > 0) warn(`${field}.sceneIds`, "Removed content normally should not be assigned to a scene.");
      if (!["omitted", "deferred"].includes(item?.decisionLabel)) error(`${field}.decisionLabel`, "Removed content must be labeled omitted or deferred.");
    } else {
      if (!isString(item?.original)) error(`${field}.original`, "Preserve the original wording, including an empty string when intentional.");
      if (!isString(item?.finalText)) error(`${field}.finalText`, "Record the current proposed or final wording.");
      if (itemSceneIds.length === 0) error(`${field}.sceneIds`, "Kept or transformed content must appear in at least one scene.");
      if (item?.decisionLabel === "omitted") error(`${field}.decisionLabel`, "Only removed content may be labeled omitted.");
    }
    if (item?.decisionLabel === "invented" && item?.claimStatus !== "user-approved-new" && asArray(item?.factualClaims).length > 0) {
      error(`${field}.claimStatus`, "Invented factual claims require explicit user approval.");
    }
    if (item?.claimStatus === "unverified" && asArray(item?.factualClaims).length > 0) {
      warn(`${field}.factualClaims`, "Do not ship unverified factual claims as product copy.");
    }
    if (item?.truthStatus === "unknown" && item?.claimStatus === "source-backed") {
      error(`${field}.claimStatus`, "Unknown source truth cannot be source-backed without additional evidence.");
    }
    if (["existing", "verified"].includes(item?.truthStatus) && (hasPlaceholderSource || isPlaceholder(item.original))) {
      error(`${field}.truthStatus`, "Existing or verified content requires non-placeholder source evidence and original text.");
    }
    if (item?.claimStatus === "source-backed" && hasPlaceholderSource) {
      error(`${field}.claimStatus`, "Source-backed content requires non-placeholder source references.");
    }
    if (item?.decisionLabel === "preserved" && (hasPlaceholderSource || isPlaceholder(item.finalText))) {
      error(`${field}.decisionLabel`, "Preserved content cannot rely on placeholder source or final text.");
    }
  });

  if (!isObject(blueprint.creativeDirection)) error("creativeDirection", "Creative direction is required.");
  if (!directionStates.has(blueprint.creativeDirection?.status)) error("creativeDirection.status", "Use proposal or approved.");
  if (blueprint.creativeDirection?.status === "approved" && !isNonEmptyString(blueprint.creativeDirection?.chosenDirection)) {
    error("creativeDirection.chosenDirection", "An approved direction must name the chosen direction.");
  }
  if (!isNonEmptyString(blueprint.creativeDirection?.chosenDirection)) warn("creativeDirection.chosenDirection", "No direction is selected yet.");
  validateStringArray(blueprint.creativeDirection?.experiencePrinciples, "creativeDirection.experiencePrinciples");
  validateMeaningfulArray(blueprint.creativeDirection?.emotionalArc, "creativeDirection.emotionalArc");
  validateMeaningfulArray(blueprint.creativeDirection?.alternatives, "creativeDirection.alternatives");
  if (!isObject(blueprint.creativeDirection?.tone)) error("creativeDirection.tone", "Use a tone object.");
  else {
    validateStringArray(blueprint.creativeDirection.tone.traits, "creativeDirection.tone.traits");
    validateStringArray(blueprint.creativeDirection.tone.antiTraits, "creativeDirection.tone.antiTraits");
  }
  if (blueprint.creativeDirection?.visualLanguage !== null && !isNonEmptyString(blueprint.creativeDirection?.visualLanguage)) {
    error("creativeDirection.visualLanguage", "Use null or a non-empty string.");
  }

  const scenes = validateObjectArray(blueprint.scenes, "scenes");
  if (Array.isArray(blueprint.scenes) && scenes.length === 0) error("scenes", "At least one scene is required.");
  const sceneIds = new Set();
  scenes.forEach((scene, index) => {
    const field = `scenes[${index}]`;
    if (!isObject(scene)) return;
    if (!isId(scene?.id)) error(`${field}.id`, "Use a unique lowercase kebab-case id.");
    else if (sceneIds.has(scene.id)) error(`${field}.id`, `Duplicate scene id: ${scene.id}`);
    else sceneIds.add(scene.id);
    if (!isNonEmptyString(scene?.label)) error(`${field}.label`, "Scene label is required.");
    if (!sceneRoles.has(scene?.role)) error(`${field}.role`, "Unknown scene role.");
    const sceneContentRefs = validateStringArray(scene.contentRefs, `${field}.contentRefs`);
    if (sceneContentRefs.length === 0) error(`${field}.contentRefs`, "Connect the scene to source content.");
    if (!isObject(scene?.userOutcome)) error(`${field}.userOutcome`, "Record what the user sees, understands, feels, and does.");
    else for (const key of ["sees", "understands", "feels", "does"]) {
      if (!isNonEmptyString(scene.userOutcome[key])) error(`${field}.userOutcome.${key}`, "Use a concrete outcome.");
    }
    if (!isObject(scene?.layout)) error(`${field}.layout`, "Scene layout is required.");
    else {
      for (const key of ["pattern", "grid", "focus"]) if (!isNonEmptyString(scene.layout[key])) error(`${field}.layout.${key}`, "Describe the layout decision.");
      for (const key of ["density", "mediaRole"]) if (!isNonEmptyString(scene.layout[key])) error(`${field}.layout.${key}`, "Describe this layout property.");
      if (!isObject(scene.layout.breakpoints)) error(`${field}.layout.breakpoints`, "Record desktop, tablet, and mobile composition.");
      else for (const key of ["desktop", "tablet", "mobile"]) {
        if (!isNonEmptyString(scene.layout.breakpoints[key])) error(`${field}.layout.breakpoints.${key}`, "Describe this breakpoint composition.");
      }
    }
    validateMeaningfulArray(scene.hierarchy, `${field}.hierarchy`);
    validateStringArray(scene.motionRefs, `${field}.motionRefs`);
    validateStringArray(scene.implementationRefs, `${field}.implementationRefs`);
  });

  const imports = validateObjectArray(blueprint.motionImports, "motionImports");
  const importIds = new Set();
  const importById = new Map();
  imports.forEach((item, index) => {
    const field = `motionImports[${index}]`;
    if (!isObject(item)) return;
    if (!isId(item?.id)) error(`${field}.id`, "Use a unique lowercase kebab-case id.");
    else if (importIds.has(item.id)) error(`${field}.id`, `Duplicate motion import id: ${item.id}`);
    else {
      importIds.add(item.id);
      importById.set(item.id, item);
    }
    if (!isNonEmptyString(item?.sourceSkill)) error(`${field}.sourceSkill`, "Record the source skill or system.");
    if (!isNonEmptyString(item?.artifact)) error(`${field}.artifact`, "Record the source artifact.");
    if (!isNonEmptyString(item?.sourceEffectId)) error(`${field}.sourceEffectId`, "Keep the source effect id traceable.");
    const importEvidence = validateReferenceEvidence(item, field);
    if (importEvidence !== "unknown" && (isPlaceholder(item.artifact) || isPlaceholder(item.sourceEffectId))) {
      error(field, "Observed or fitted imports require non-placeholder artifact and sourceEffectId values.");
    }
    if (!adoptionStates.has(item?.adoption)) error(`${field}.adoption`, "Use adopt, adapt, reject, or new.");
    if (!projectDecisionStates.has(item?.projectDecisionStatus)) error(`${field}.projectDecisionStatus`, "Unknown project decision status.");
    if (!isNonEmptyString(item?.semanticIntent)) error(`${field}.semanticIntent`, "Explain what product meaning the imported behavior serves.");
  });

  const effects = validateObjectArray(blueprint.motionEffects, "motionEffects");
  const effectIds = new Set();
  const propertyOwners = new Map();
  effects.forEach((effect, index) => {
    const field = `motionEffects[${index}]`;
    if (!isObject(effect)) return;
    if (!isId(effect?.id)) error(`${field}.id`, "Use a unique lowercase kebab-case id.");
    else if (effectIds.has(effect.id)) error(`${field}.id`, `Duplicate motion effect id: ${effect.id}`);
    else effectIds.add(effect.id);
    if (!isNonEmptyString(effect?.sceneId)) error(`${field}.sceneId`, "Connect the effect to one scene.");
    if (!isNonEmptyString(effect?.intent)) error(`${field}.intent`, "Explain the narrative intent.");
    if (!isNonEmptyString(effect?.target)) error(`${field}.target`, "Record the target selector or component id.");
    if (!isNonEmptyString(effect?.family)) error(`${field}.family`, "Motion family is required.");
    if (!isNonEmptyString(effect?.driver)) error(`${field}.driver`, "Motion driver is required.");
    if (!isNonEmptyString(effect?.owner)) error(`${field}.owner`, "Assign one runtime owner such as CSS, WAAPI, GSAP, Motion, RAF, or component state.");
    const properties = validateStringArray(effect.properties, `${field}.properties`);
    if (properties.length === 0) error(`${field}.properties`, "List at least one exact property owned by this effect.");
    const localProperties = new Set();
    properties.forEach((property, propertyIndex) => {
      if (!isNonEmptyString(property)) return;
      const normalized = property.trim().toLowerCase();
      if (localProperties.has(normalized)) error(`${field}.properties[${propertyIndex}]`, `Duplicate owned property: ${property}`);
      else localProperties.add(normalized);
    });
    if (!isMeaningfulItem(effect?.trigger)) error(`${field}.trigger`, "Describe the start, end, event, and re-entry rule.");
    const cleanupIsValid = isNonEmptyString(effect?.cleanup)
      || isMeaningfulObject(effect?.cleanup)
      || (Array.isArray(effect?.cleanup) && effect.cleanup.length > 0 && effect.cleanup.every(isNonEmptyString));
    if (!cleanupIsValid) error(`${field}.cleanup`, "Record at least one concrete listener, observer, RAF, timer, timeline, or media teardown path.");
    if (!isObject(effect?.origin) || !originKinds.has(effect.origin.kind)) error(`${field}.origin`, "Record a valid motion origin.");
    let effectReferenceEvidence;
    if (effect?.origin?.kind === "motion-spec-import") {
      if (!isNonEmptyString(effect.importRef)) error(`${field}.importRef`, "Imported motion must reference a motionImports entry.");
      if (!isNonEmptyString(effect.origin.artifact)) error(`${field}.origin.artifact`, "Imported motion needs the source artifact.");
      if (!isNonEmptyString(effect.origin.sourceEffectId)) error(`${field}.origin.sourceEffectId`, "Imported motion needs the source effect id.");
      effectReferenceEvidence = validateReferenceEvidence(effect.origin, `${field}.origin`);
      if (effectReferenceEvidence !== "unknown" && (isPlaceholder(effect.origin.artifact) || isPlaceholder(effect.origin.sourceEffectId))) {
        error(`${field}.origin`, "Observed or fitted imported motion requires non-placeholder source metadata.");
      }
    } else if (effect?.origin?.kind === "named-preset") {
      if (!isNonEmptyString(effect.origin.presetId)) error(`${field}.origin.presetId`, "Named preset motion needs a stable presetId.");
      if (!isNonEmptyString(effect.origin.source)) error(`${field}.origin.source`, "Named preset motion needs a traceable preset source.");
      if (Object.prototype.hasOwnProperty.call(effect, "importRef")) error(`${field}.importRef`, "named-preset effects must not use a motion import reference.");
    } else if (effect?.origin?.kind === "project-original") {
      if (Object.prototype.hasOwnProperty.call(effect, "importRef")) error(`${field}.importRef`, "project-original effects must not use a motion import reference.");
      for (const key of ["artifact", "sourceEffectId", "referenceEvidence", "sourceEvidence", "presetId"]) {
        if (Object.prototype.hasOwnProperty.call(effect.origin, key)) error(`${field}.origin.${key}`, `project-original effects must not declare ${key}.`);
      }
    }
    if (!adoptionStates.has(effect?.adoption)) error(`${field}.adoption`, "Use adopt, adapt, reject, or new.");
    if (!projectDecisionStates.has(effect?.projectDecisionStatus)) error(`${field}.projectDecisionStatus`, "Unknown project decision status.");
    if (!parameterOrigins.has(effect?.parameterOrigin)) error(`${field}.parameterOrigin`, "Use current-library-preset, measured, project-proposal, or approved.");
    if (effectReferenceEvidence === "unknown" && effect?.parameterOrigin === "measured") {
      error(`${field}.parameterOrigin`, "Unknown reference evidence cannot produce measured parameters.");
    }
    if (!isMeaningfulObject(effect?.parameters)) error(`${field}.parameters`, "Use an object with at least one meaningful editable parameter.");
    if (!isMeaningfulObject(effect?.finalState)) error(`${field}.finalState`, "Define an object with at least one meaningful readable final state.");
    if (!isObject(effect?.responsive)) error(`${field}.responsive`, "Define desktop and touch behavior.");
    else for (const key of ["desktop", "touch"]) if (!isNonEmptyString(effect.responsive[key])) error(`${field}.responsive.${key}`, "Describe this input policy.");
    if (!isObject(effect?.reducedMotion) || !reducedStrategies.has(effect.reducedMotion.strategy)) {
      error(`${field}.reducedMotion`, "Use show-final-state, shorten, replace, or disable.");
    }
    if (!isNonEmptyString(effect?.fallback)) error(`${field}.fallback`, "Describe the dependency or runtime failure state.");
    if (!isMeaningfulObject(effect?.performanceBudget)) error(`${field}.performanceBudget`, "Record a performance budget with at least one meaningful limit or strategy.");
    validateStringArray(effect.implementationRefs, `${field}.implementationRefs`);
    if (["implemented", "verified"].includes(effect?.projectDecisionStatus) && asArray(effect?.implementationRefs).length === 0) {
      error(`${field}.implementationRefs`, "Implemented motion must point to code.");
    }
    if (effect.adoption !== "reject" && isNonEmptyString(effect.target)) {
      localProperties.forEach((property) => {
        const ownershipKey = `${effect.target.trim()}\u0000${property}`;
        const previous = propertyOwners.get(ownershipKey);
        if (previous) {
          error(`${field}.properties`, `Target/property is already owned by ${previous.id} (${previous.owner}); use a wrapper or one composed owner.`);
        } else {
          propertyOwners.set(ownershipKey, { id: effect.id ?? field, owner: effect.owner ?? "unknown" });
        }
      });
    }
  });

  const patternDecisions = validateObjectArray(blueprint.patternDecisions, "patternDecisions");
  const patternIds = new Set();
  patternDecisions.forEach((item, index) => {
    const field = `patternDecisions[${index}]`;
    if (!isObject(item)) return;
    if (!isId(item?.patternId)) error(`${field}.patternId`, "Use a unique lowercase kebab-case pattern id.");
    else if (patternIds.has(item.patternId)) error(`${field}.patternId`, `Duplicate pattern id: ${item.patternId}`);
    else patternIds.add(item.patternId);
    if (!isNonEmptyString(item?.source)) error(`${field}.source`, "Record the internal library or external evidence source.");
    if (!isNonEmptyString(item?.contentRole)) error(`${field}.contentRole`, "Map the pattern to a content role.");
    if (!patternDecisionStates.has(item?.decision)) error(`${field}.decision`, "Use keep, conditional, or exclude.");
    for (const key of ["desktop", "touch", "reducedMotion"]) if (!isNonEmptyString(item?.[key])) error(`${field}.${key}`, "Describe this mode.");
    if (!parameterOrigins.has(item?.parameterOrigin)) error(`${field}.parameterOrigin`, "Declare where the parameters come from.");
    if (!projectDecisionStates.has(item?.projectDecisionStatus)) error(`${field}.projectDecisionStatus`, "Unknown project decision status.");
  });

  if (!isObject(blueprint.designSystem)) error("designSystem", "A design system object is required.");
  else {
    if (blueprint.designSystem.tokensFile !== null && !isNonEmptyString(blueprint.designSystem.tokensFile)) {
      error("designSystem.tokensFile", "Use null or a non-empty string.");
    }
    if (!isObject(blueprint.designSystem.typeRoles)) error("designSystem.typeRoles", "Use an object.");
    if (!Array.isArray(blueprint.designSystem.spacingScale)) error("designSystem.spacingScale", "Use an array.");
    else blueprint.designSystem.spacingScale.forEach((item, index) => {
      const valid = isNonEmptyString(item) || (typeof item === "number" && Number.isFinite(item) && item >= 0);
      if (!valid) error(`designSystem.spacingScale[${index}]`, "Use a non-empty token or finite non-negative number.");
    });
    if (!isNonEmptyString(blueprint.designSystem.motionIntensity)) error("designSystem.motionIntensity", "Describe the motion intensity.");
    validateMeaningfulArray(blueprint.designSystem.safeZones, "designSystem.safeZones");
  }

  if (!isObject(blueprint.implementation)) error("implementation", "An implementation object is required.");
  for (const [namespace, keys] of Object.entries(implementationNamespaces)) {
    const items = blueprint.implementation?.[namespace];
    if (!Array.isArray(items)) {
      error(`implementation.${namespace}`, "Use an array.");
      continue;
    }
    items.forEach((item, index) => {
      const field = `implementation.${namespace}[${index}]`;
      if (!isNonEmptyString(item) && !isObject(item)) {
        error(field, "Use a non-empty string or an object with a stable reference.");
        return;
      }
      if (isObject(item)) {
        keys.forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(item, key) && !isNonEmptyString(item[key])) {
            error(`${field}.${key}`, "Use a non-empty string when this reference field is present.");
          }
        });
        if (implementationItemRefs(item, keys).length === 0) error(field, `Include at least one stable reference field: ${keys.join(", ")}.`);
      }
    });
  }
  if (!isObject(blueprint.implementation?.editor)) error("implementation.editor", "Use an editor configuration object.");
  else {
    if (!isBoolean(blueprint.implementation.editor.required)) error("implementation.editor.required", "Use a boolean.");
    if (!Number.isInteger(blueprint.implementation.editor.schemaVersion) || blueprint.implementation.editor.schemaVersion < 1) {
      error("implementation.editor.schemaVersion", "Use a positive integer.");
    }
    if (!isBoolean(blueprint.implementation.editor.importExport)) error("implementation.editor.importExport", "Use a boolean.");
    const persistence = blueprint.implementation.editor.persistence;
    if (persistence !== null && !isNonEmptyString(persistence) && !isNonEmptyObject(persistence)) {
      error("implementation.editor.persistence", "Use null, a non-empty string, or a non-empty object.");
    }
  }
  if (blueprint.implementation?.framework !== null && !isNonEmptyString(blueprint.implementation?.framework)) {
    error("implementation.framework", "Use null or a non-empty string.");
  }
  const { refs: implementationRefs } = collectImplementationRefs(blueprint.implementation, error);

  preserveItems.forEach((item, index) => {
    if (!isObject(item)) return;
    asArray(item.sceneIds).forEach((id) => {
      if (!sceneIds.has(id)) error(`preservationContract.mustPreserve[${index}].sceneIds`, `Unknown scene reference: ${id}`);
    });
    asArray(item.implementationRefs).forEach((id) => {
      if (!implementationRefs.has(id)) error(`preservationContract.mustPreserve[${index}].implementationRefs`, `Unknown implementation reference: ${id}`);
    });
  });
  content.forEach((item, index) => {
    if (!isObject(item)) return;
    asArray(item.sceneIds).forEach((id) => {
      if (!sceneIds.has(id)) error(`contentInventory[${index}].sceneIds`, `Unknown scene reference: ${id}`);
    });
  });
  scenes.forEach((scene, index) => {
    if (!isObject(scene)) return;
    asArray(scene.contentRefs).forEach((id) => {
      if (!contentIds.has(id)) error(`scenes[${index}].contentRefs`, `Unknown content reference: ${id}`);
    });
    asArray(scene.motionRefs).forEach((id) => {
      if (!effectIds.has(id)) error(`scenes[${index}].motionRefs`, `Unknown motion effect reference: ${id}`);
    });
    asArray(scene.implementationRefs).forEach((id) => {
      if (!implementationRefs.has(id)) error(`scenes[${index}].implementationRefs`, `Unknown implementation reference: ${id}`);
    });
  });
  effects.forEach((effect, index) => {
    if (!isObject(effect)) return;
    if (isNonEmptyString(effect?.sceneId) && !sceneIds.has(effect.sceneId)) error(`motionEffects[${index}].sceneId`, `Unknown scene reference: ${effect.sceneId}`);
    if (isNonEmptyString(effect?.importRef) && !importIds.has(effect.importRef)) error(`motionEffects[${index}].importRef`, `Unknown motion import reference: ${effect.importRef}`);
    if (effect.origin?.kind === "motion-spec-import" && isNonEmptyString(effect.importRef) && importById.has(effect.importRef)) {
      const sourceImport = importById.get(effect.importRef);
      if (effect.origin.artifact !== sourceImport.artifact) {
        error(`motionEffects[${index}].origin.artifact`, `Must match motionImports entry ${effect.importRef}.`);
      }
      if (effect.origin.sourceEffectId !== sourceImport.sourceEffectId) {
        error(`motionEffects[${index}].origin.sourceEffectId`, `Must match motionImports entry ${effect.importRef}.`);
      }
      if (referenceEvidenceOf(effect.origin) !== referenceEvidenceOf(sourceImport)) {
        error(`motionEffects[${index}].origin.referenceEvidence`, `Must match motionImports entry ${effect.importRef}.`);
      }
      if (sourceImport.adoption === "reject" && effect.adoption !== "reject") {
        error(`motionEffects[${index}].adoption`, `Cannot activate motion import ${effect.importRef} because that import is marked reject.`);
      }
    }
    asArray(effect?.implementationRefs).forEach((id) => {
      if (!implementationRefs.has(id)) error(`motionEffects[${index}].implementationRefs`, `Unknown implementation reference: ${id}`);
    });
  });

  const acceptance = validateObjectArray(blueprint.acceptance, "acceptance");
  if (Array.isArray(blueprint.acceptance) && acceptance.length === 0) error("acceptance", "At least one acceptance criterion is required.");
  const acceptanceIds = new Set();
  const acceptanceById = new Map();
  acceptance.forEach((item, index) => {
    const field = `acceptance[${index}]`;
    if (!isObject(item)) return;
    if (!isId(item?.id)) error(`${field}.id`, "Use a unique lowercase kebab-case id.");
    else if (acceptanceIds.has(item.id)) error(`${field}.id`, `Duplicate acceptance id: ${item.id}`);
    else {
      acceptanceIds.add(item.id);
      acceptanceById.set(item.id, { item, index });
    }
    if (!acceptanceCategories.has(item?.category)) error(`${field}.category`, "Unknown acceptance category.");
    if (!isNonEmptyString(item?.criterion)) error(`${field}.criterion`, "Write a testable criterion.");
    if (!acceptanceStates.has(item?.status)) error(`${field}.status`, "Use pending, passed, failed, or blocked.");
    let validEvidenceCount = 0;
    if (!Array.isArray(item?.evidence)) error(`${field}.evidence`, "Use an evidence array.");
    else item.evidence.forEach((evidence, evidenceIndex) => {
      if (!isEvidenceItem(evidence)) {
        error(`${field}.evidence[${evidenceIndex}]`, `Use an object with a supported evidence type (${[...evidenceTypes].join(", ")}) and non-empty ref.`);
      }
      else validEvidenceCount += 1;
    });
    if (["passed", "failed"].includes(item?.status) && validEvidenceCount === 0) {
      error(`${field}.evidence`, `A ${item.status} criterion needs at least one valid evidence item.`);
    }
  });

  if (blueprint.project?.pageType === "auth") {
    authAcceptanceRequirements.forEach((category, id) => {
      const entry = acceptanceById.get(id);
      if (!entry) {
        error("acceptance", `Auth blueprints require canonical criterion ${id}.`);
      } else if (entry.item.category !== category) {
        error(`acceptance[${entry.index}].category`, `${id} must use category ${category}.`);
      }
    });
  }

  for (const key of ["decisions", "unknowns", "deviations"]) {
    validateMeaningfulArray(blueprint[key], key);
  }

  if (blueprint.project?.auditStatus === "verified") {
    if (sourcePaths.length === 0) error("project.sourcePaths", "A verified audit needs at least one inspected source path.");
    preserveItems.forEach((item, index) => {
      if (!isObject(item)) return;
      if (item.verification !== "verified") {
        error(`preservationContract.mustPreserve[${index}].verification`, "Every preserved contract must be verified before auditStatus can be verified.");
      }
      if (isPlaceholder(item.sourceRef)) error(`preservationContract.mustPreserve[${index}].sourceRef`, "Replace placeholder evidence before verification.");
    });
    content.forEach((item, index) => {
      if (!isObject(item)) return;
      if (item.truthStatus === "unknown") error(`contentInventory[${index}].truthStatus`, "Verified audits cannot retain unknown source truth.");
      if (item.claimStatus === "unverified") error(`contentInventory[${index}].claimStatus`, "Verified audits cannot retain unverified claims.");
      if (asArray(item.sourceRefs).some(isPlaceholder)) error(`contentInventory[${index}].sourceRefs`, "Replace placeholder source references before verification.");
      if (isPlaceholder(item.original)) error(`contentInventory[${index}].original`, "Replace placeholder source content before audit verification.");
    });
  }

  if (blueprint.project?.deliveryStatus === "verified") {
    if (blueprint.project?.auditStatus !== "verified") error("project.deliveryStatus", "A verified delivery requires auditStatus verified first.");
    if (targetRoutes.length === 0) error("project.targetRoutes", "A verified delivery needs at least one target route.");
    viewports.forEach((viewport, index) => {
      if (isObject(viewport) && viewport.tested !== true) error(`project.viewports[${index}].tested`, "Every target viewport must be tested before deliveryStatus can be verified.");
    });
    content.forEach((item, index) => {
      if (!isObject(item)) return;
      if (item.decisionLabel === "deferred") error(`contentInventory[${index}].decisionLabel`, "Verified delivery cannot retain deferred content decisions.");
      if (isPlaceholder(item.finalText)) error(`contentInventory[${index}].finalText`, "Replace placeholder final text before delivery verification.");
    });
    acceptance.forEach((item, index) => {
      if (isObject(item) && item.status !== "passed") {
        error(`acceptance[${index}].status`, "Every acceptance criterion must pass with structured evidence before deliveryStatus can be verified.");
      }
    });
  }

  return issues;
}

function printIssues(issues) {
  if (issues.length === 0) {
    console.log("Blueprint is valid with no warnings.");
    return;
  }
  issues.forEach((item) => console.log(`${item.severity.toUpperCase()} ${item.field}: ${item.message}`));
  const errors = issues.filter((item) => item.severity === "error").length;
  const warnings = issues.filter((item) => item.severity === "warning").length;
  console.log(`\n${errors} error(s), ${warnings} warning(s).`);
}

function summarize(blueprint, issues) {
  const root = isObject(blueprint) ? blueprint : {};
  const counts = (items, key) => asArray(items).reduce((result, item) => {
    const value = item?.[key] ?? "unset";
    result[value] = (result[value] ?? 0) + 1;
    return result;
  }, {});
  const testedViewports = asArray(root.project?.viewports).filter((item) => isObject(item) && item.tested === true).length;
  console.log(`Project: ${root.project?.name ?? "Unnamed"}`);
  const auditStatus = root.project?.auditStatus ?? "unknown";
  const deliveryStatus = root.project?.deliveryStatus ?? "unknown";
  console.log(`Page type: ${root.project?.pageType ?? "unknown"}; audit: ${auditStatus}${auditStatus === "uninspected" ? " (provisional)" : ""}; delivery: ${deliveryStatus}`);
  console.log(`Viewports tested: ${testedViewports}/${asArray(root.project?.viewports).length}`);
  console.log(`Experience thesis: ${root.brief?.experienceThesis ?? "unset"}`);
  console.log(`Direction: ${root.creativeDirection?.chosenDirection ?? "unselected"} (${root.creativeDirection?.status ?? "unset"})`);
  console.log(`Preservation: ${JSON.stringify(counts(root.preservationContract?.mustPreserve, "verification"))}`);
  console.log(`Content: ${JSON.stringify(counts(root.contentInventory, "decisionLabel"))}`);
  console.log(`Scenes: ${JSON.stringify(counts(root.scenes, "role"))}`);
  console.log(`Motion imports: ${JSON.stringify(counts(root.motionImports, "projectDecisionStatus"))}`);
  console.log(`Motion effects: ${JSON.stringify(counts(root.motionEffects, "projectDecisionStatus"))}`);
  console.log(`Pattern decisions: ${JSON.stringify(counts(root.patternDecisions, "decision"))}`);
  console.log(`Acceptance: ${JSON.stringify(counts(root.acceptance, "status"))}`);
  const implementationCounts = Object.fromEntries(Object.keys(implementationNamespaces).map((key) => [key, asArray(root.implementation?.[key]).length]));
  console.log(`Implementation: ${JSON.stringify(implementationCounts)}`);
  console.log(`Unknowns: ${asArray(root.unknowns).length}; deviations: ${asArray(root.deviations).length}`);
  console.log(`Validation: ${issues.filter((item) => item.severity === "error").length} error(s), ${issues.filter((item) => item.severity === "warning").length} warning(s)`);
}

function trace(blueprint, issues) {
  const root = isObject(blueprint) ? blueprint : {};
  const objectItems = (value) => asArray(value).filter(isObject);
  const safeId = (item, index, prefix) => isNonEmptyString(item?.id) ? item.id : `?<invalid-${prefix}-${index}>`;
  const list = (value) => asArray(value).filter(isNonEmptyString);
  const scenes = objectItems(root.scenes);
  const content = objectItems(root.contentInventory);
  const effects = objectItems(root.motionEffects);
  const imports = objectItems(root.motionImports);
  const sceneById = new Map(scenes.filter((item) => isNonEmptyString(item.id)).map((item) => [item.id, item]));
  const contentById = new Map(content.filter((item) => isNonEmptyString(item.id)).map((item) => [item.id, item]));
  const effectById = new Map(effects.filter((item) => isNonEmptyString(item.id)).map((item) => [item.id, item]));
  const importById = new Map(imports.filter((item) => isNonEmptyString(item.id)).map((item) => [item.id, item]));
  const { refs: implementationRefs } = collectImplementationRefs(root.implementation, () => {});
  const resolved = (refs, registry) => list(refs).map((id) => registry.has(id) ? id : `?${id}`).join(", ") || "—";

  console.log(`PROJECT TRACE\n- ${root.project?.name ?? "Unnamed"}: type=${root.project?.pageType ?? "unknown"}; audit=${root.project?.auditStatus ?? "unknown"}; delivery=${root.project?.deliveryStatus ?? "unknown"}; localOnly=${String(root.project?.localOnly ?? "unknown")}`);
  console.log(`- validation=${issues.filter((item) => item.severity === "error").length} error(s)/${issues.filter((item) => item.severity === "warning").length} warning(s); sources=${list(root.project?.sourcePaths).join(", ") || "—"}; routes=${list(root.project?.targetRoutes).join(", ") || "—"}`);

  console.log("\nPRESERVATION TRACE");
  objectItems(root.preservationContract?.mustPreserve).forEach((item, index) => {
    const sceneRefs = resolved(item.sceneIds, sceneById);
    const codeRefs = list(item.implementationRefs).map((id) => implementationRefs.has(id) ? id : `?${id}`).join(", ") || "—";
    console.log(`- ${safeId(item, index, "preserve")}: ${item.verification ?? "unknown"}; source=${item.sourceRef ?? "—"}; scenes=${sceneRefs}; implementation=${codeRefs}`);
  });

  console.log("\nCONTENT TRACE");
  content.forEach((item, index) => {
    const sceneRefs = resolved(item.sceneIds, sceneById);
    console.log(`- ${safeId(item, index, "content")}: truth=${item.truthStatus ?? "unknown"}; decision=${item.decisionLabel ?? "unknown"}/${item.disposition ?? "unknown"}; claim=${item.claimStatus ?? "unknown"} -> ${sceneRefs}`);
  });

  console.log("\nSCENE TRACE");
  scenes.forEach((scene, index) => {
    const contentRefs = resolved(scene.contentRefs, contentById);
    const motionRefs = list(scene.motionRefs).map((id) => effectById.has(id) ? `${id}:${effectById.get(id).family ?? "unknown"}` : `?${id}`).join(", ") || "static";
    const codeRefs = list(scene.implementationRefs).map((id) => implementationRefs.has(id) ? id : `?${id}`).join(", ") || "—";
    console.log(`- ${safeId(scene, index, "scene")} [${scene.role ?? "unknown"}]: content=${contentRefs}; motion=${motionRefs}; implementation=${codeRefs}`);
  });

  console.log("\nMOTION IMPORT TRACE");
  imports.forEach((item, index) => {
    console.log(`- ${safeId(item, index, "import")}: ${item.artifact ?? "—"}#${item.sourceEffectId ?? "—"} (${referenceEvidenceOf(item) ?? "unknown"}) -> ${item.adoption ?? "unknown"}/${item.projectDecisionStatus ?? "unknown"}`);
  });

  console.log("\nMOTION EFFECT TRACE");
  effects.forEach((effect, index) => {
    const originObject = isObject(effect.origin) ? effect.origin : {};
    const origin = originObject.kind === "motion-spec-import"
      ? `${originObject.artifact ?? "—"}#${originObject.sourceEffectId ?? "—"} (${referenceEvidenceOf(originObject) ?? "unknown"}); import=${importById.has(effect.importRef) ? effect.importRef : `?${effect.importRef ?? "missing"}`}`
      : originObject.kind === "named-preset"
        ? `named-preset:${originObject.presetId ?? "?missing"}`
        : originObject.kind ?? "unknown";
    const codeRefs = list(effect.implementationRefs).map((id) => implementationRefs.has(id) ? id : `?${id}`).join(", ") || "—";
    console.log(`- ${safeId(effect, index, "effect")}: ${origin} -> ${effect.adoption ?? "unknown"}/${effect.projectDecisionStatus ?? "unknown"}; scene=${sceneById.has(effect.sceneId) ? effect.sceneId : `?${effect.sceneId ?? "missing"}`}; owner=${effect.owner ?? "unknown"}; properties=${list(effect.properties).join(", ") || "—"}; cleanup=${isMeaningfulItem(effect.cleanup) || Array.isArray(effect.cleanup) ? "declared" : "missing"}; implementation=${codeRefs}`);
  });

  console.log("\nPATTERN TRACE");
  objectItems(root.patternDecisions).forEach((item, index) => {
    const id = isNonEmptyString(item.patternId) ? item.patternId : `?<invalid-pattern-${index}>`;
    console.log(`- ${id}: ${item.source ?? "—"} -> ${item.contentRole ?? "—"}; ${item.decision ?? "unknown"}/${item.projectDecisionStatus ?? "unknown"}`);
  });

  console.log("\nIMPLEMENTATION TRACE");
  Object.entries(implementationNamespaces).forEach(([namespace, keys]) => {
    const entries = asArray(root.implementation?.[namespace]).flatMap((item) => implementationItemRefs(item, keys));
    console.log(`- ${namespace}: ${entries.join(", ") || "—"}`);
  });

  console.log("\nACCEPTANCE TRACE");
  objectItems(root.acceptance).forEach((item, index) => {
    const validEvidence = asArray(item.evidence).filter(isEvidenceItem).length;
    console.log(`- ${safeId(item, index, "acceptance")} [${item.category ?? "unknown"}]: ${item.status ?? "unknown"}; evidence=${validEvidence}`);
  });
  console.log(`\nOPEN ITEMS\n- decisions=${asArray(root.decisions).length}; unknowns=${asArray(root.unknowns).length}; deviations=${asArray(root.deviations).length}`);
}

async function main() {
  const [, , command, filePath, ...args] = process.argv;
  if (!command || !filePath || !["init", "validate", "trace", "summary"].includes(command)) {
    usage();
    process.exitCode = 1;
    return;
  }
  if (command === "init") {
    await initialize(filePath, args);
    return;
  }
  const options = command === "validate"
    ? parseOptions(args)
    : parseOptions(args, new Set(), new Set(["--allow-invalid"]));
  const blueprint = await readJson(path.resolve(filePath));
  const issues = validateBlueprint(blueprint);
  if (command === "validate") {
    printIssues(issues);
    if (issues.some((item) => item.severity === "error")) process.exitCode = 1;
    return;
  }
  const hasErrors = issues.some((item) => item.severity === "error");
  if (hasErrors) {
    printIssues(issues);
    if (!options.get("--allow-invalid")) {
      process.exitCode = 1;
      return;
    }
    console.log("\nContinuing because --allow-invalid was provided.\n");
  }
  if (command === "trace") trace(blueprint, issues);
  if (command === "summary") summarize(blueprint, issues);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
