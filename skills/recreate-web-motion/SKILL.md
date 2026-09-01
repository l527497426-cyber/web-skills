---
name: recreate-web-motion
description: Audit, reproduce, implement, and parameterize motion-heavy websites as maintainable local experiences or live website editors. Use when Codex is asked to reference, clone, or recreate a site's scroll choreography, loaders, text motion, hover and cursor behavior, proximity effects, drag and inertia, pinned scenes, popups, page transitions, responsive motion, or reduced-motion fallbacks; when reviewing motion-parity gaps; or for requests such as 网站动效复刻、滚动交互复刻、逐屏动态审计、动效编辑器、motion parity, and scroll animation systems.
---

# Recreate Web Motion

Turn a motion reference into an evidence-backed, editable system. Treat the job as behavioral reconstruction, not as a collection of decorative fade-ins.

## Non-negotiable contract

- Reproduce the requested behavior and interaction model, not only the first static frame.
- Inspect every visual screen and every relevant interaction state before claiming completeness.
- Label reference knowledge as `observed`, `fitted`, or `unknown`. Never present a visual estimate as an original source parameter.
- Keep implementation proposals separate from evidence status. Without reference measurements, a suggested default remains a proposal and the reference value stays `unknown`; use `fitted` only after comparing against multiple observations.
- Report every deliberate simplification, untested range, and unavailable parameter. Partial fidelity is acceptable; silent reduction is not.
- Treat layout geometry, containing blocks, sticky/pin spacing, overflow, media aspect ratios, and section height as part of the motion system.
- Keep editorial media inside stable motion wrappers. Animate the wrapper or an explicit mask so changing an image does not change trigger geometry.
- Give every effect a disabled final state, responsive policy, cleanup path, and reduced-motion strategy. Content must remain visible when animation code fails.
- Keep local-only work local when requested. Do not deploy, publish, or send external writes without separate authority.
- Record source and usage provenance for downloaded media. Do not bundle reference-site assets into reusable templates.

## Choose the workflow

- For an audit or explanation, execute Phases 0–2 and deliver a motion spec plus gaps; do not modify the product.
- For a new reproduction, execute all phases in an isolated folder when isolation is requested.
- For an existing implementation, first compare current behavior against the reference, then change only verified gaps.
- For an editor, execute all phases and expose every special effect through the editor contract. A toggle alone is insufficient when the effect has meaningful tunable parameters.

## Phase 0: Establish scope and evidence

1. Inspect repository instructions, current structure, package versions, existing motion code, dirty files, and available test commands.
2. Record the reference URL, audit date, viewport, DPR, responsive targets, required pages, local-only/deployment constraint, and media permissions.
3. If a live reference is available, read [references/reference-audit.md](references/reference-audit.md) completely and perform a read-only audit.
4. Create a source-of-truth spec before implementation:

   ```bash
   node <skill-dir>/scripts/motion-spec.mjs init ./motion-spec.json --name "Project name" --reference "https://example.com"
   ```

5. Update the spec during observation and implementation. Validate it with:

   ```bash
   node <skill-dir>/scripts/motion-spec.mjs validate ./motion-spec.json
   ```

Resolve `<skill-dir>` to the directory containing this `SKILL.md`.

## Phase 1: Audit screen by screen

1. Make a layout-only pass. Divide the page into visual screens `S01`, `S02`, and so on; record section bounds, normal flow, sticky, pinned, fixed, and horizontally translated regions.
2. Make a scroll-only pass at slow, normal, and fast speed. Sample before, 25%, 50%, 75%, after, then reverse through the same range.
3. Determine the driver for each effect: load, time loop, scroll scrub, scroll play, hover/focus, pointer follow, proximity, drag, inertia, modal transition, or page transition.
4. Exercise every interactive target from enter to interruption to exit. Test rapid re-entry, keyboard focus, Escape, repeated open/close, and browser back where applicable.
5. Test mobile/touch and `prefers-reduced-motion`. Mark untested breakpoints as `unknown`.
6. Store observations, fitted proposals, tolerances, unknowns, and reproduction steps in `motion-spec.json`.

Do not infer a GSAP `start`, easing curve, duration, damping constant, or original library merely from a similar-looking result. Record the behavior first; fit an implementation parameter separately.

## Phase 2: Design the motion architecture

Read [references/motion-systems.md](references/motion-systems.md) completely before choosing mechanics.

1. Separate the system into:
   - layout and static final states;
   - scene/effect configuration;
   - scroll runtime;
   - time-based component state machines;
   - pointer and physics runtime;
   - modal/page transition state machines;
   - editor and persistence;
   - responsive and reduced-motion policies.
2. Choose the smallest capable engine per behavior. CSS/WAAPI suits bounded state changes; GSAP ScrollTrigger suits complex scrub and pinning; Motion suits React state choreography; smooth scrolling is optional, not a visual requirement.
3. Use one scene boundary plus element-level overrides. Do not force unrelated elements into one section-wide trigger or one giant timeline.
4. Distinguish `scroll-scrub` from `scroll-play`. Scrub follows progress and should usually use linear interpolation; play completes on its own and needs explicit re-entry/reverse semantics.
5. For text, preserve application copy and declare `whole`, `per-character`, `per-word`, or `per-line`. If `$animate-text` is available, use its exact contract for named effects. Never flatten a layout-aware kinetic build into a generic stagger.
6. Specify independent parameters for special effects. Avoid hiding cursor damping, inertia friction, clip direction, popup curves, or mobile pin distance behind a single global amplitude control.

## Phase 3: Implement safely

Read [references/implementation-stack.md](references/implementation-stack.md) completely when writing or changing production code.

1. Make the static final layout correct first, including fixed media frames and content-visible fallbacks.
2. Implement one motion family at a time in this order: load/hero, scroll scenes, hover/focus, pointer effects, drag/inertia, overlays/transitions, responsive/reduced motion.
3. Initialize scroll measurements only after fonts and geometry-affecting media settle. Refresh on meaningful layout changes with debounce.
4. Synchronize a smooth-scroll driver with the scroll animation engine through one coherent RAF/update model.
5. Keep pointer positions and physics values in refs or imperative state; do not re-render the page on every pointer frame.
6. Cancel timers, RAFs, observers, listeners, pointer capture, timelines, media queries, and smooth-scroll instances on teardown or rebuild.
7. When an effect is disabled or a dependency import fails, immediately set its targets to a readable final state.
8. Keep effect constants in the typed configuration or explicitly mark them as intentional non-editable design constants.

## Phase 4: Build the editor

Read [references/editor-contract.md](references/editor-contract.md) completely whenever the result includes an editor or customization panel.

1. Model global runtime, scenes, effects, responsive overrides, content/media, evidence, and schema version separately.
2. Expose per-scene `enabled`, driver/mode, start, end, scrub, duration, delay, stagger, easing, pin, reverse/re-entry, and breakpoint overrides where applicable.
3. Give each special effect its own meaningful controls: direction/origin, amplitude, damping, radius, friction, boundary resistance, settle threshold, hover delay, popup duration/curve, or sequence gap as relevant.
4. Validate trigger syntax and numeric ranges. Fail safely instead of allowing an invalid editor value to hide content.
5. Support preview/replay, local persistence, reset, JSON export/import, `schemaVersion`, and migrations. Debounce live edits that would rebuild the animation runtime.
6. Preserve a one-to-one registry among rendered effects, configuration entries, editor controls, disabled fallbacks, and reduced-motion policies.

## Phase 5: Verify the full behavior

Read [references/qa-matrix.md](references/qa-matrix.md) completely before declaring completion.

1. Run lint, type checks, unit tests, and production build in proportion to the project risk.
2. Verify the rendered experience at the target desktop and mobile sizes; do not rely on code inspection alone for motion parity.
3. Test forward, reverse, re-entry, deep-scroll refresh, fast scrolling, rapid hover, interrupted transitions, repeated editor changes, and reduced motion.
4. Confirm no duplicate ScrollTriggers, RAF loops, listeners, or observers accumulate after rebuilds.
5. Compare the implementation with the reference using the same checkpoints and tolerances recorded in the spec.
6. Re-run spec validation and summarize coverage:

   ```bash
   node <skill-dir>/scripts/motion-spec.mjs summary ./motion-spec.json
   ```

## Delivery contract

Lead with the working outcome. Include:

- the local URL or run command when local preview was requested;
- the skill/project paths changed;
- tests and viewport/interaction checks actually run;
- counts of `observed`, `fitted`, and `unknown` effects;
- all remaining deviations, unknown parameters, and untested ranges;
- whether reduced motion, mobile behavior, cleanup, persistence, and editor export/import passed.

Never call the result “1:1” while material `unknown` behaviors or untested screens remain.

## Resource routing

- [references/reference-audit.md](references/reference-audit.md): read for live-site observation, evidence grading, and audit handoff.
- [references/motion-systems.md](references/motion-systems.md): read for motion-family selection and parameter models.
- [references/implementation-stack.md](references/implementation-stack.md): read for CSS/WAAPI/Motion/GSAP/Lenis architecture and lifecycle rules.
- [references/editor-contract.md](references/editor-contract.md): read for editable schema, UI coverage, persistence, and migrations.
- [references/qa-matrix.md](references/qa-matrix.md): read for behavioral, responsive, accessibility, and performance acceptance.
- [references/hobro-lessons.md](references/hobro-lessons.md): read when diagnosing motion gaps or maintaining the example project that produced this playbook.
- [assets/motion-spec.template.json](assets/motion-spec.template.json): copy when a machine-readable audit and implementation contract is needed.
- `scripts/motion-spec.mjs`: initialize, validate, and summarize motion specs with Node.js 18+.
