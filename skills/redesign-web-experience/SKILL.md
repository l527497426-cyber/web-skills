---
name: redesign-web-experience
description: Transform an existing login page, landing page, product page, or brand page into an emotionally resonant, editorially composed, motion-led web experience while preserving product facts, functional flows, and maintainable code. Use when Codex is asked to upgrade an existing page's 展示形式、情感化文案、信息层级、编辑式排版、视觉节奏、动态叙事 or frontend implementation; reuse motion and layout ideas from a reference or from $recreate-web-motion without faithfully cloning its visual identity; or handle requests such as 登录页整体升级、已有页面创意改版、品牌化重构、文案排版动效一体化, and creative direction to code. Do not use as the primary skill for reference-accurate reproduction or blank-slate brand creation.
---

# Redesign Web Experience

Reframe an existing page as one coherent content, copy, layout, motion, and implementation system. Treat the current product as source material and a functional contract—not as a layout that must be cosmetically reskinned.

The normal input is an existing prototype, local website, or current production page. Rebuild its existing content and working presentation as needed, then rewrite, extend, reorder, and upgrade the copy, editorial layout, visual hierarchy, motion, scroll mechanics, interactions, and responsive behavior as one new experience.

## Non-negotiable contract

- Preserve product truth, core tasks, routes, integrations, legal language, analytics, accessibility semantics, and working user changes unless removal is explicitly approved.
- Separate facts from framing. Rewrite emotion and hierarchy freely; never invent capabilities, results, testimonials, metrics, awards, guarantees, or social proof.
- Make every old-to-new content decision traceable as `preserved`, `reframed`, `invented`, `omitted`, or `deferred`. Explain every omission and every invention.
- When the actual page has not been inspected, mark the blueprint `provisional`. Only user-stated behavior may be labeled existing; treat all other product and authentication states as `unknown` or conditionally applicable.
- Track source understanding and redesign completion separately: `project.auditStatus` describes inspection of the existing page, while `project.deliveryStatus` describes the proposed, approved, implemented, or verified redesign. A completed source audit must not imply that the redesign has shipped.
- Define what the user should see, understand, feel, and do in each scene before choosing a visual effect.
- Establish the readable, responsive static final state before adding motion.
- Give each target property one motion owner. Split layout, scroll, interaction, and media transforms across wrappers when necessary.
- Give each scene one primary motion idea and at most one supporting interaction. Motion must clarify reveal, transition, focus, causality, feedback, or spatial navigation.
- Label every numeric motion or geometry value as `current-library-preset`, `measured`, `project-proposal`, or `approved`. Never present an attractive default as a recovered or approved value.
- Keep forms and primary actions usable immediately. Animation failure, missing media, reduced motion, touch input, or low performance must not block the task.
- Recompose mobile intentionally; do not shrink the desktop sequence or preserve long pins by default.
- Keep local-only work local when requested. Do not deploy or publish without separate authority.

## Choose the workflow

- For a strategy, critique, or creative direction request, execute Phases 0–5 and deliver the blueprint without changing code.
- For an implementation request, execute all phases and verify the real rendered flow.
- For an existing partial redesign, audit the current implementation first and preserve useful ideas before proposing replacements.
- When the user says “复刻、照着做、重建” about their own existing prototype but also asks to rewrite, expand, reorganize, or upgrade it, keep `$redesign-web-experience` as the primary skill. The prototype is the product source, not a donor site whose identity must be copied.
- Only when fidelity to a separate donor/reference site is the acceptance criterion—such as external-site 1:1 parity, original behavior recovery, or parameter matching—stop this workflow and explicitly hand the primary task to `$recreate-web-motion`. Do not begin copy, editorial-layout, or creative-direction phases before the reference audit exists.
- For a reference-assisted redesign, use `$recreate-web-motion` Phases 0–2 to produce evidence, then adapt its behavior through this skill. Import motion grammar, not the reference's brand, content, or private assets.
- After parity is implemented and verified, return to `$redesign-web-experience` only when the user asks to migrate the verified motion grammar into an existing product or brand.
- For a blank-slate brand identity with no existing facts or product surface, establish the missing brand strategy first; this skill is not the primary discovery framework.

## Phase 0: Freeze the current product contract

1. Inspect repository instructions, dirty files, page routes, stack, content sources, media, tests, and active runtime.
2. Identify the canonical current page. Distinguish production logic from prototypes, variants, demo stubs, and stale experiments.
3. Do not assume that forms, pricing, security claims, analytics, integrations, or common product states exist. Freeze and verify them only when source or user evidence establishes them.
4. Capture the baseline at representative desktop, tablet, and mobile sizes when visual changes are in scope.
5. Inventory:
   - product names, claims, numbers, proof, and legal text;
   - primary and secondary audiences;
   - forms, authentication, errors, loading, success, and empty states;
   - routes, selectors, data attributes, API/data bindings, analytics, and third-party integrations;
   - existing creative ideas worth preserving;
   - known defects, motion conflicts, and performance costs.
6. Classify constraints as `mustPreserve`, `mayTransform`, or `mustNotInvent`.
7. For auth work, read [references/auth-page-guardrails.md](references/auth-page-guardrails.md) completely.
8. Create the working contract when the task is substantial:

   ```bash
   node <skill-dir>/scripts/experience-blueprint.mjs init ./experience-blueprint.json --name "Project name" --page-type auth --source "./src"
   ```

Resolve `<skill-dir>` to the directory containing this `SKILL.md`.

## Phase 1: Build the content truth map

Read [references/content-integrity-and-copy.md](references/content-integrity-and-copy.md) completely before rewriting copy.

1. Give every content item a stable ID and source reference.
2. Assign its role: identity, promise, mechanism, proof, feature, action, reassurance, help, legal, or navigation.
3. Choose `keep`, `rewrite`, `merge`, `split`, or `remove`. A removal needs a rationale; a rewrite needs an original-to-final mapping.
4. Mark claims as `source-backed`, `user-approved-new`, or `unverified`. Do not ship `unverified` claims as facts.
5. Turn disconnected modules into a user journey. For a creator product, a useful arc may be inspiration → making → being seen → understanding performance → sustained growth.
6. Decide how multiple audiences share or branch the story. Do not leave one audience with only a cosmetic tab change while the body tells another audience's story.

## Phase 2: Establish the creative direction

Read [references/creative-direction.md](references/creative-direction.md) completely when the desired style or emotional outcome is not already precise.

1. Write one testable `experienceThesis`, for example: “Turn a functional sign-in into the moment a creator re-enters creative momentum.”
2. Define desired emotions, anti-emotions, brand traits, anti-traits, and the emotional curve from arrival to action.
3. Produce two or three compact directions only when there is a material structural or narrative fork. When the user already specifies the narrative and pattern constraints, propose one coherent direction plus a rejected-pattern list. Do not invent decimal scores without research or measured evidence.
4. Recommend one direction and continue with a reversible proposal unless the choice would materially change product scope.
5. Record project decisions as `proposal`, `approved`, `implemented`, or `verified`. Reference evidence never auto-approves a design for this product.

## Phase 3: Upgrade copy as a system

1. Build the information ladder: what this is → why it matters now → what changes for the user → why to believe it → what to do next.
2. Write a complete set, not isolated slogans: hero promise, mechanism line, scene transitions, section titles, supporting copy, proof labels, CTA, reassurance, help, and state microcopy.
3. Use emotional language to make an existing truth felt. Keep product names, mechanisms, limits, errors, legal language, and safety instructions precise.
4. Preserve short line shapes and semantic grouping when the chosen motion splits by line, word, or character.
5. Show important rewrites as `original → proposed → reason → evidence` so the user can approve the framing without losing traceability.

## Phase 4: Compose editorial scenes

Read [references/editorial-layout.md](references/editorial-layout.md) completely whenever hierarchy or layout changes.

1. Replace the old block list with scenes whose roles are `orient`, `tension`, `promise`, `proof`, `interaction`, `conversion`, or `closure`.
2. For each scene, declare:
   - source content and intended meaning;
   - what the user sees, understands, feels, and does;
   - focal element and hierarchy;
   - grid, type roles, line length, density, whitespace, and media role;
   - desktop, tablet, touch, and reduced-motion composition;
   - transition relationship to the previous and next scene.
3. Use contrast intentionally: dense versus sparse, static versus moving, dark versus light, monumental type versus precise utility text.
4. Keep geometry honest. Long scroll, sticky stages, and fixed media require a narrative reason and a defined release point.
5. For the proven ideas extracted from the current Hobro/North/Form study, read [references/current-pattern-library.md](references/current-pattern-library.md) completely. Reuse patterns as ingredients and remap them to product content; do not copy the original page order.

## Phase 5: Compose motion as narrative

Read [references/motion-as-narrative.md](references/motion-as-narrative.md) completely before assigning effects.

1. Specify every effect as:

   ```text
   content meaning → intended feeling → driver → visual behavior → parameters
   → final static state → touch policy → reduced-motion policy → fallback
   ```

2. Choose behavior components such as `MaskedTextReveal`, `ClipMediaReveal`, `StickyStateStory`, `StateSwap`, `PointerPreview`, `LayerTransition`, or `InertiaTrack`; do not inherit a reference site's section names or DOM structure.
3. Use `$animate-text` for a named text effect when available. Keep the exact split unit and layout-aware build; do not replace a line build with a generic stagger.
4. When importing a reference effect, preserve its source artifact/effect ID and evidence status, then separately record `adopt`, `adapt`, or `reject` and the project decision status.
5. Carry both evidence dimensions from the handoff: `referenceEvidence: observed | fitted | unknown` and `parameterOrigin: measured | current-library-preset | project-proposal | approved`. Never convert `unknown` reference evidence into `measured`.
6. Record each reused pattern with `patternId`, source, content role, decision, desktop, touch, reduced motion, parameter origin, and project decision status.
7. Apply an explicit budget:
   - auth task island: at most one short state transition;
   - hero: one primary system plus one supporting system;
   - content scene: one scroll behavior plus one local interaction;
   - continuous ambient loops: at most one visible at a time.
8. Exclude loaders, pointer effects, blur, clipping, transform ownership, and scroll interception from form safe zones.

For a fidelity-clone request, respond with this explicit handoff before stopping:

```text
Primary skill: $recreate-web-motion
Reason: the request asks for reference-accurate, screen-by-screen reproduction.
Return path: after parity verification, use $redesign-web-experience to adapt
the verified patterns to an existing brand without copying its identity.
```

## Phase 6: Implement without regressing the product

Read [references/existing-product-integration.md](references/existing-product-integration.md) completely before editing production code.

1. Preserve the current stack and working backend unless the task requires an architectural change.
2. Implement in this order: contracts and tests → semantic content → static responsive layout → design tokens/components → primary motion → local interactions → reduced/failure states → optional editor.
3. Separate content data, scene/layout configuration, motion configuration, runtime ownership, and editor persistence.
4. Define component boundaries, state ownership, and integration interfaces before implementation. Authentication state remains owned by the existing auth system; the narrative layer may subscribe to approved state but must not take over validation, submission, secrets, or redirects.
5. Keep state flow one-way: existing product state → read-only presentation adapter → presentation state → motion runtime. Never let the motion runtime write authentication, form, route, business-data, or analytics state.
6. Preserve selectors and bindings or migrate them deliberately with tests. Never infer that a demo submit handler is production authentication.
7. Initialize geometry-dependent motion after fonts and media settle; refresh on meaningful layout changes; clean up RAFs, observers, timers, listeners, pointer capture, and animation instances.
8. Keep core content visible before the motion runtime initializes and after any dependency failure.
9. If an editor is requested, expose content versions, layout templates, typography, media crop, scene geometry, motion parameters, interaction physics, device variants, reduced-motion behavior, presets, import/export, schema version, and migrations. Do not reduce special effects to a toggle plus one global amplitude slider.

## Phase 7: Verify the whole experience

Read [references/qa-matrix.md](references/qa-matrix.md) completely before declaring completion.

1. Validate the blueprint throughout implementation:

   ```bash
   node <skill-dir>/scripts/experience-blueprint.mjs validate ./experience-blueprint.json
   node <skill-dir>/scripts/experience-blueprint.mjs trace ./experience-blueprint.json
   node <skill-dir>/scripts/experience-blueprint.mjs summary ./experience-blueprint.json
   ```

2. Run repository tests, type checks, lint, build, and representative browser flows in proportion to risk.
3. Verify content truth, hierarchy, emotional arc, task completion, responsive recomposition, keyboard/focus, contrast, reduced motion, fast and reverse scroll, interrupted transitions, deep-link refresh, media failure, and runtime cleanup.
4. Test real auth and form states when available: autofill, validation, server error, loading, success, password manager, QR expiry/refresh, identity/method switch, legal links, and focus restoration.
5. Compare the rendered result with the blueprint. Record unknowns, deviations, untested ranges, and proposals awaiting approval. Set `project.deliveryStatus` to `verified` only after every acceptance criterion passes with evidence.

## Delivery contract

Lead with the working outcome. Include:

- the experience thesis and selected direction;
- both the source-audit status and redesign-delivery status; describe an uninspected blueprint as provisional;
- content-integrity status; use `provisional / not yet auditable` until the original-to-proposed map is complete;
- preserved flows/facts and the most important content transformations;
- the scene and motion grammar implemented;
- a compact effect/behavior/parameter-origin/approval-status table, including for strategy-only work;
- planned component boundaries, state ownership, and integration interfaces for strategy-only work;
- paths changed and local URL or run command when relevant;
- tests, viewports, input modes, and real states actually verified;
- unverified claims, unresolved creative decisions, deviations, and performance risks;
- whether mobile, reduced motion, failure fallback, accessibility, and editor import/export passed.

Do not call a creative proposal approved, an implementation verified, or a demo authentication flow production-ready without evidence.

## Resource routing

- [references/creative-direction.md](references/creative-direction.md): read for experience thesis, emotional arc, concept options, and direction selection.
- [references/content-integrity-and-copy.md](references/content-integrity-and-copy.md): always read before copy transformation or content removal.
- [references/editorial-layout.md](references/editorial-layout.md): read for grids, typography, hierarchy, density, rhythm, and responsive recomposition.
- [references/motion-as-narrative.md](references/motion-as-narrative.md): read for semantic motion assignment, budgets, reference adaptation, and text-motion coordination.
- [references/current-pattern-library.md](references/current-pattern-library.md): read when reusing the current Hobro/North/Form study's proven display and motion ideas.
- [references/existing-product-integration.md](references/existing-product-integration.md): read before changing existing application code.
- [references/auth-page-guardrails.md](references/auth-page-guardrails.md): always read for login, registration, recovery, verification, or identity flows.
- [references/qa-matrix.md](references/qa-matrix.md): read before completion claims.
- [assets/experience-blueprint.template.json](assets/experience-blueprint.template.json): copy for a traceable creative and implementation contract.
- `scripts/experience-blueprint.mjs`: initialize, validate, trace, and summarize blueprints with Node.js 18+.
