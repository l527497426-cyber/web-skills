# Current Pattern Library

Treat `http://localhost:3000/#top` and its local implementation as a verified internal creative asset library. Reuse its mature ideas by content role. Do not copy its section order, placeholder brand, or agency copy into the Creator Center.

Use these decision labels:

- **保留**: Make the pattern part of the default redesign language.
- **条件复用**: Use it only when the mapped content role and interaction conditions are present.
- **不适用**: Exclude it from the Creator Center login experience by default.

The listed values are current library presets, not recovered parameters from an external reference.

## Contents

- [Pattern decision matrix](#pattern-decision-matrix)
- [Baseline motion tokens](#baseline-motion-tokens)
- [Giant headline plus media](#1-giant-headline-plus-media--保留)
- [Text reveal](#2-per-character-per-word-and-per-line-reveal--保留)
- [Editorial information grid](#3-editorial-information-grid--保留)
- [Proximity dot field](#4-proximity-dot-field--条件复用)
- [Dual-state capability list](#5-dual-state-capability-list--保留)
- [Directional clip and popup](#6-directional-case-clip-and-hover-popup--条件复用)
- [Core Vision split scene](#7-core-vision-split-scene--保留)
- [Inertial rail](#8-team-style-inertial-rail--条件复用)
- [Footer sequence](#9-footer-sequence--条件复用)
- [Dual-lag cursor](#10-dual-lag-custom-cursor--不适用)
- [Pattern ledger](#select-patterns-through-one-practical-ledger)

## Pattern decision matrix

| Pattern | Decision | Best content role | Creator Center adaptation | Login task island |
| --- | --- | --- | --- | --- |
| Giant headline + media | 保留 | Promise | Build the hero around “让热爱被看见 / 让创作更有价值” | Keep media behind or beside the stable form |
| Per-line / per-word reveal | 保留 | Promise, explain | Reveal Chinese emotional headlines by line or phrase | Allow only the surrounding promise, not fields |
| Editorial information grid | 保留 | Orient, prove, comply | Organize product mechanisms, evidence, and institutional rights | Use a calm internal grid; preserve field order |
| Proximity dot field | 条件复用 | Explore | Represent creator ideas, ecosystem nodes, or inspiration topics | Exclude from QR, inputs, agreements, and submit |
| Dual-state capability list | 保留 | Explore + explain | Map AI 工坊、AI 分身、随变、世界书 to active previews | Keep outside the authentication panel |
| Directional case clip | 条件复用 | Explain, prove | Reveal product screens or creator outcomes directionally | Never clip QR codes, inputs, errors, or legal text |
| Hover case popup | 条件复用 | Deep explore | Open a capability detail or example gallery on explicit intent | Do not turn login into a decorative case popup |
| Core Vision split scene | 保留 | Manifesto, transition | Build a creator-belief chapter between capability and operations content | Keep the form outside the split animation |
| Inertial team rail | 条件复用 | Explore many items | Recast as templates, inspiration, or creator examples | Do not use for login methods or core navigation |
| Footer sequence | 条件复用 | Closure | Sequence a final invitation, then leave legal records static | Keep agreements and records immediately readable |
| Dual-lag custom cursor | 不适用 | Campaign exploration | Exclude from the default Creator Center login experience | Never replace the native cursor in authentication |
| Curtain loader | 不适用 | Campaign ritual | Remove; make login available immediately | Never block the task for a decorative intro |
| Hero character drag | 不适用 | Experimental typography | Remove; preserve the promise text | Never make task copy draggable |
| Orbital CTA Hover | 条件复用 | Secondary convert | Use only on an exploratory “了解更多” action | Keep primary login CTA stable |

## Baseline motion tokens

Start from these current-library values only when the selected pattern needs them. Expose them in the editor and tune them against the redesigned content.

| Token | Current preset | Use | Do not assume |
| --- | --- | --- | --- |
| Branding easing | `cubic-bezier(0,0,.1,1)` | Strong settling entrances | That it suits every micro-interaction |
| Editorial clip easing | `cubic-bezier(.785,.135,.15,.86)` | Directional media and large spatial changes | That it is an external reference's source curve |
| Tooltip easing | `cubic-bezier(.5,0,.05,1)` | Elastic discovery cards | That it belongs near form controls |
| Popup easing | `cubic-bezier(.34,0,.3,1)` | Full-screen or large layer transitions | That a login panel needs the full amplitude |
| Generic reveal offset | `65px` | Long editorial copy entrance | That mobile should inherit it |
| Split-text offset | `112%` | Masked word or line reveal | That every Chinese character should animate |
| Pointer damping | `0.15` | Desktop preview following | That continuous RAF is acceptable offscreen |
| Feature Hover delay | `200ms` | Prevent accidental preview changes | That Hover is the only selection input |
| Drag friction | `0.94` | Inertial rail coast | That touch devices need scripted inertia |
| Boundary resistance | `0.25` | Elastic overscroll | That native scroll should be replaced |
| Boundary velocity loss | `0.75` | Rail edge settling | That it works for every rail width |
| Settle threshold | `0.18` | Stop the inertia RAF | That reduced motion may still run it |

## 1. Giant headline plus media — 保留

| Instruction | Apply it |
| --- | --- |
| Map the role | Use it only for the page promise or a major manifesto statement. |
| Adapt the content | Set the Creator Center hero to “让热爱被看见 / 让创作更有价值”; keep product orientation in the eyebrow and supporting line. |
| Build the layout | Separate the media wrapper, headline wrapper, and login task island. Preserve intentional Chinese line breaks. |
| Expose parameters | Control headline scale, tracking, line height, max width, media crop, focal point, wash, media drift, and load/scroll relationship. |
| Protect login | Keep form geometry independent from headline and media transforms. Keep QR contrast unaffected by overlays. |
| Adapt mobile | Reduce the headline scale, use a poster or sparse sequence, and stack the login island in normal flow. |
| Reduce motion | Show the final media and complete headline immediately; remove parallax and breathing. |

Use one dominant media system. If the hero already uses a scroll frame sequence, do not add a loader, strong pointer parallax, breathing zoom, and draggable characters at the same time.

## 2. Per-character, per-word, and per-line reveal — 保留

| Instruction | Apply it |
| --- | --- |
| Choose granularity | Prefer per-line for the hero and per-word for chapter headlines. Reserve per-character for short expressive labels. |
| Preserve semantics | Keep one complete accessible label and hide visual fragments from assistive technology. |
| Expose parameters | Control target granularity, Y offset, opacity, blur, duration, stagger, easing, start, reverse, and line-break policy. |
| Protect login | Do not split input labels, placeholders, errors, agreements, QR instructions, or submit text. |
| Adapt mobile | Reduce stagger and offset; preserve approved mobile line breaks. |
| Reduce motion | Render the complete text without masks, stagger, blur, or delayed visibility. |

Invoke sibling `$animate-text` for a named effect or exact JSON contract. Do not recreate its catalog in this file. Preserve its `whole`, `per-character`, `per-word`, or `per-line` target exactly.

## 3. Editorial information grid — 保留

| Instruction | Apply it |
| --- | --- |
| Map the role | Use the grid to orient, compare, prove, or close; do not use it merely to fill space. |
| Adapt the content | Organize AI capability labels, operations mechanisms, verified evidence, institution rights, and legal records by hierarchy. |
| Expose parameters | Control columns, gutters, spans, row rhythm, borders, density, alignment, metadata scale, and mobile order. |
| Protect login | Preserve the identity switch, QR/phone columns, field order, and agreement position. |
| Adapt mobile | Collapse by content priority rather than DOM appearance; keep tap targets at least 44px. |
| Reduce motion | Keep the grid static and complete. |

Alternate dense grid screens with quieter emotional screens. Do not make every chapter a dashboard.

## 4. Proximity dot field — 条件复用

| Instruction | Apply it |
| --- | --- |
| Map the role | Use it only to express many ideas converging into one creator system, or to explore labeled inspiration topics. |
| Provide meaning | Give every interactive node a label and provide a non-canvas summary list. |
| Expose parameters | Control node count, source spread, convergence range, radius, Hover scale, tooltip size, delay, easing, and color. |
| Protect login | Place it outside the login panel and disable pointer capture near the panel edge. |
| Adapt mobile | Replace it with a small labeled grid or tap list; never depend on Hover. |
| Reduce motion | Show nodes in their final positions with labels available. |

Do not use decorative unlabeled nodes as product proof. Do not let tooltip cards cover the primary CTA.

## 5. Dual-state capability list — 保留

The verified pattern swaps a calm top state for a high-contrast active state and can attach a pointer-follow media preview.

| Instruction | Apply it |
| --- | --- |
| Map the role | Use one row per AI capability or operations outcome. |
| Adapt the content | Keep the product name stable; rotate or reveal outcome words such as “好玩法”“另一个你”“持续生长”. |
| Unify state | Make Hover, focus, click, tap, and scroll progression update one active index. |
| Expose parameters | Control active background, text swap, preview media, Hover delay, enter/exit duration, preview offset, pointer damping, and active dwell. |
| Protect login | Keep the list outside the form. Do not make login identities behave like promotional capability rows. |
| Adapt mobile | Use pinned progression only when the chapter is short; otherwise use visible tabs or stacked cards. Hide pointer-follow media. |
| Reduce motion | Show one selected state and let controls switch instantly. |

Prevent a delayed Hover timer from overriding a later click or keyboard selection. Cancel timers on exit and teardown.

## 6. Directional case clip and Hover popup — 条件复用

| Instruction | Apply it |
| --- | --- |
| Map the role | Use directional clip for product screenshots, creator examples, or evidence cards. Use a popup only when detail deserves a separate task. |
| Adapt the content | Replace agency cases with AI demonstrations, publishing flows, analytics states, or creator outcomes. |
| Expose parameters | Control clip origin, direction, start/end, scrub lag, image scale, radius, popup curve, duration, gallery behavior, and close timing. |
| Protect login | Never clip or transform QR pixels, fields, errors, agreements, or the primary login action. Do not scroll-lock the page merely to explain login. |
| Adapt mobile | Replace large clips with opacity/translate; use an accessible sheet only for explicit detail. |
| Reduce motion | Display the complete media; open and close the detail without travel. |

Manage popup focus, Escape, scroll lock, return focus, and repeated open/close. Keep editorial media inside a stable clip wrapper so media replacement does not alter trigger geometry.

## 7. Core Vision split scene — 保留

| Instruction | Apply it |
| --- | --- |
| Map the role | Use it for a creator manifesto or the transition from creative possibility to operational support. |
| Adapt the content | Pair an emotional belief such as “每一个念头，都值得继续生长” with concise platform commitment copy. |
| Build the layout | Assign media or color field to one layer, manifesto type to another, and supporting copy to a stable grid below or beside it. |
| Expose parameters | Control split ratio, panel direction, media focal point, title scale, title travel, copy width, scene height, start/end, and wash. |
| Protect login | Do not place the active form inside the split, clip, or scrubbed layer. |
| Adapt mobile | Stack media, headline, and copy in normal flow; shorten the scene substantially. |
| Reduce motion | Show the settled split composition or a simple stacked version. |

Use this as a breathing point. Do not combine it with dense capability controls in the same viewport.

## 8. Team-style inertial rail — 条件复用

| Instruction | Apply it |
| --- | --- |
| Map the role | Recast the rail as templates, inspiration, creator examples, or a browsable content collection. |
| Preserve utility | Provide labels, direct links, keyboard access, and a native-scroll fallback. |
| Expose parameters | Control item width, gap, bounds, initial offset, friction, boundary resistance, velocity loss, settle threshold, and snap behavior. |
| Protect login | Never use it for login methods, identity choice, agreements, or navigation required to authenticate. |
| Adapt mobile | Prefer native `overflow-x:auto` with scroll snap; remove scripted pointer inertia. |
| Reduce motion | Keep native horizontal scrolling and remove coast or elastic resistance. |

Do not add the rail unless the content genuinely benefits from browsing more items than fit onscreen.

## 9. Footer sequence — 条件复用

| Instruction | Apply it |
| --- | --- |
| Map the role | Use it to transition from inspiration to a final invitation, then conclude with compliance. |
| Adapt the content | Sequence one emotional closing line and one CTA before the existing agreements and records. |
| Expose parameters | Control line offset, duration, stagger, icon direction, sequence gap, replay policy, and trigger threshold. |
| Protect compliance | Keep policy links, company records, report contacts, and addresses visible and static. |
| Adapt mobile | Use one short line reveal; remove opposing icon travel. |
| Reduce motion | Render the final invitation and all legal content immediately. |

Do not make users wait for the legal footer to become readable.

## 10. Dual-lag custom cursor — 不适用

The verified pattern uses a damped circular cursor, enlarges on interactive targets, and becomes a labeled pill over an expressive CTA. Exclude it from the default Creator Center login experience.

| Instruction | Apply it |
| --- | --- |
| Preserve native interaction | Keep the system cursor over the login panel, navigation, form controls, QR instructions, and legal links. |
| Avoid false feedback | Do not let a decorative cursor imply clickability or replace visible focus. |
| Keep parameters documented | If a future campaign mode explicitly enables it, expose cursor size, active size, pill size, damping, label, blend mode, and safe-zone selectors. |
| Adapt mobile | Disable it entirely for coarse pointers. |
| Reduce motion | Disable it entirely. |

Do not run an always-on cursor RAF when the cursor is disabled, offscreen, or the document is hidden.

## Select patterns through one practical ledger

Create this table before implementation and keep it with the redesign notes:

| Scene | Content role | Pattern ID | Source | Decision | Reason | Desktop | Touch | Reduced motion | Parameter origin | Project status | Login-safe |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hero | Promise | `giant-headline-media` | Current internal library | 保留 | Turn the existing promise into the visual thesis | Scroll media + line reveal | Poster + line reveal | Static poster | `current-library-preset` | `proposal` | Yes, with separate wrappers |
| AI creation | Explore | `dual-state-capabilities` | Current internal library | 保留 | Let users compare four capabilities | Hover/focus/click | Tap tabs | Instant state | `project-proposal` | `proposal` | Outside panel |
| Operations | Explain | `directional-product-reveal` | Current internal library | 条件复用 | Reveal verified product states | Scroll play | Short fade | Static image | `project-proposal` | `proposal` | Outside panel |
| Login | Convert | `curtain-loader` | Current internal library | 不适用 | It delays the task | Disabled | Disabled | Disabled | `current-library-preset` | `approved` | No |

If a selected pattern comes from a new external reference, invoke `$recreate-web-motion`, grade the evidence, and record the source. If it is a named text effect, invoke `$animate-text` and reference the selected spec id. For all other cases, treat this file as the internal pattern source and redesign its expression around the current content.
