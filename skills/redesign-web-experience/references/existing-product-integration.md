# Existing product integration

Use this reference whenever the redesign starts from an existing page, application, route, or prototype. Preserve the product before changing its presentation.

## Contents

1. Establish evidence
2. Freeze the product contract
3. Separate real logic from demo behavior
4. Preserve code-facing contracts
5. Use a supplied result as a pattern library
6. Assign one motion owner
7. Roll out progressively
8. Deliver integration evidence

## 1. Establish evidence

Inspect before proposing a direction:

- locate the actual route, entry file, runtime, styles, assets, state owners, network clients, analytics hooks, tests, and run commands;
- distinguish the current implementation from archived variants, experiments, exports, and screenshots;
- record dirty or untracked files and create a recoverable baseline before implementation;
- exercise every visible control and trace its event handler, state transition, side effect, failure path, and final destination;
- inspect desktop, compact desktop, mobile, touch, keyboard, reduced-motion, deep-link, and deep-scroll behavior;
- label each conclusion `observed`, `inferred`, or `unknown` and do not convert an inference into a product fact.

When source inspection is unavailable, label the entire blueprint `provisional`. Treat only behavior explicitly stated by the user as existing, keep other product states `unknown`, and defer the complete original-to-proposed content map.

Do not start with color, typography, or animation. Start with the page's job, audience, facts, and working behaviors.

## 2. Freeze the product contract

Create a contract ledger before editing:

| Item | Classification | Required evidence | Allowed action |
|---|---|---|---|
| Product names and capabilities | `locked` | source copy, product spec, or user confirmation | preserve exactly unless explicitly approved |
| Authentication, checkout, upload, or submission flow | `locked` | handler and end-to-end behavior | preserve state and side effects |
| Legal, privacy, consent, pricing, and regulatory text | `locked` | rendered source and destination | preserve text and working links |
| Analytics, experiments, feature flags, IDs, and test hooks | `contract` | source consumers | preserve or migrate with tests |
| Heading, transition sentence, benefit copy, and CTA tone | `rewritable` | product facts and audience goal | propose and implement a traceable rewrite |
| Layout wrappers and visual grouping | `replaceable` | responsive and interaction audit | change while preserving semantics and contracts |
| Decorative media and motion | `replaceable` | meaning, performance, and accessibility audit | replace when it improves the story |
| Unverified claims or behavior | `unknown` | unresolved | keep unchanged or stop and request evidence |

Record each changed item with its original value, proposed value, reason, owner, and approval status. Never silently remove a feature because it is hard to fit into the new composition.

For an authentication-oriented creator platform, freeze at minimum:

- creator and organization identity modes;
- QR, verification-code, and password paths;
- phone region, verification request, submission, agreement, privacy, and help actions;
- product taxonomy and descriptions for creation, operations, analytics, monetization, and organization services;
- footer agreements, licenses, reporting information, and company identity.

## 3. Separate real logic from demo behavior

Classify every consequential action as `real`, `demo`, or `unknown`.

Treat an action as `real` only when evidence shows the complete chain: validated input, service or backend call, pending state, success response, failure response, and destination or persisted state.

Treat an action as `demo` when it only:

- calls `preventDefault()`;
- changes button text or local classes;
- waits with a timer;
- renders placeholder data, a static QR image, or a fake success state;
- points legal or help links to `#`;
- lacks a service call, error path, or post-success destination.

Treat inaccessible services, missing environment configuration, and ambiguous handlers as `unknown`, not as working production behavior.

Apply these rules:

- preserve the visible demo behavior when the task is visual-only;
- label it clearly in the delivery report;
- do not invent authentication, payment, upload, analytics, or storage integration;
- do not send test credentials or external requests without explicit authority;
- keep a seam for the real handler instead of binding presentation code directly to a timer;
- make the static final state readable when the real dependency or animation runtime fails.

## 4. Preserve code-facing contracts

Treat selectors, attributes, events, and state keys as APIs when code consumes them.

Inventory at least:

| Contract | Examples | Preserve until migrated |
|---|---|---|
| DOM selectors | `.login-layer`, `.submit-login`, `.capability-panel` | handler lookup and animation targeting |
| Data attributes | `data-identity`, `data-method`, `data-story`, `data-ops-tab` | state mapping and synchronized scenes |
| ARIA and native semantics | `role`, `aria-selected`, `aria-expanded`, `hidden` | keyboard and assistive behavior |
| Global events and functions | custom events, editor hooks, runtime setters | module coordination |
| Persistence keys | local storage schema and version | existing user tuning and migration |
| Test and analytics hooks | test IDs, event names, experiment attributes | regression and measurement continuity |

Before renaming or restructuring a contract:

1. list every source consumer;
2. add or update an automated regression test;
3. introduce an adapter or migrate all consumers in one change;
4. verify the old and new state paths;
5. remove the old contract only after no consumer remains.

Keep content data, layout configuration, motion configuration, and runtime state separate. Do not encode product meaning only in class names or animation timelines.

Define ownership before implementation. A safe authentication composition resembles:

```text
ExperienceShell
├── NarrativeScenes
│   └── MotionRegistry
└── ExistingLoginTaskIsland
    └── ExistingAuthStateMachine
```

Keep authentication validation, submission, secrets, timers, server responses, and redirects inside `ExistingAuthStateMachine`. Let the narrative layer subscribe only to approved, non-secret presentation state such as the selected public identity mode; do not let it dispatch or synthesize authentication success.

Enforce one-way data flow:

```text
Existing Product State
        ↓ read-only presentation adapter
Presentation State
        ↓
Motion Runtime
```

Do not let `Motion Runtime` write authentication, form, route, business-data, persistence, or analytics state. Route real user actions back through existing product controls and handlers.

## 5. Use a supplied result as a pattern library

Treat a supplied running result, such as a localhost experience, as a library of presentation and motion patterns. Do not copy its entire page structure indiscriminately. Extract each pattern, name its purpose, and map it to existing content that can carry the same meaning.

For a creator-center login experience, use this mapping:

| Pattern-library mode | Suitable existing content | Integration rule | Never apply to |
|---|---|---|---|
| Shared sticky visual stage with scroll-scrubbed media | brand promise and the transition into creator capabilities | keep the login task island independently visible and interactive | form controls, QR code, consent links |
| Oversized editorial typography and asymmetric whitespace | hero promise, AI chapter title, operations chapter title, organization chapter title | preserve reading order and responsive line length | error messages and field labels |
| Per-line or per-word reveal | emotional headings, transition sentences, benefit statements | render readable final text before arming motion | passwords, codes, legal text |
| Masked media reveal or image handoff | AI capability imagery and nonessential product previews | animate a stable wrapper; reserve geometry | QR code and identity controls |
| Sticky story rail with discrete stops | AI Workshop, AI Avatar, Remix, and World Book capability sequence | keep click and native-scroll alternatives; release at both ends | login method selection |
| Pointer follow, proximity, fluid, or parallax field | decorative hero background and optional capability media | set `pointer-events:none`; disable for touch and reduced motion | any actionable authentication surface |
| Expanding editorial card or bounded zoom | creation/operations capability chapter | keep tab selection immediate; do not force users through it to log in | the login panel itself |
| Hover-follow preview or row emphasis | capability lists, operations cards, organization benefits | provide focus and tap equivalents | submit, agreement, help, and QR refresh actions |
| Popup or full-screen case transition | optional capability detail, not required for sign-in | preserve focus, Escape, history, and return position | core authentication completion |
| Calm static close | legal footer and compliance information | minimize motion and preserve exact content | — |

Use the login page as a layered composition:

1. keep authentication as the persistent task layer;
2. use the surrounding canvas to express aspiration and product narrative;
3. place immersive scroll chapters after, beside, or behind the task without delaying access to it;
4. let creator and organization content branch after identity selection when the supplied product supports both audiences;
5. keep every motion-library pattern removable without changing the login flow.

Do not use all available patterns. Select the smallest set that creates one coherent emotional rhythm.

## 6. Assign one motion owner

Create an effect registry before implementation:

| Field | Required value |
|---|---|
| `effectId` | stable unique ID |
| `target` | selector or component ref |
| `properties` | exact properties owned, such as `opacity`, `transform`, `clip-path` |
| `driver` | load, scroll-scrub, scroll-play, hover, pointer, drag, or state |
| `owner` | CSS, WAAPI, GSAP, Motion, RAF runtime, or component state |
| `trigger` | start, end, event, and re-entry rule |
| `finalState` | readable disabled/failure state |
| `responsive` | desktop, touch, and mobile policy |
| `cleanup` | listener, observer, RAF, timer, timeline, or media teardown |

Enforce these constraints:

- assign one owner to each target/property pair;
- animate a parent wrapper when a child needs an independent transform;
- compose transform channels through named CSS variables when multiple effects must contribute;
- never let CSS, WAAPI, GSAP, and RAF compete over the same `opacity` or `transform`;
- do not use a page-wide observer when element-level boundaries differ;
- cancel stale animations before starting a replacement;
- restore the final state on import failure, setup failure, disable, breakpoint change, and reduced motion;
- remove dead owners only after verifying that no fallback, breakpoint, or legacy route uses them.

## 7. Roll out progressively

Apply changes in this order:

1. capture screenshots, behavior recordings, contracts, and test results for the baseline;
2. make the complete static layout correct with motion disabled;
3. migrate content into structured data without changing behavior;
4. implement approved copy and information hierarchy;
5. implement responsive layout and authentication safe zones;
6. add one motion family at a time behind an effect flag or isolated registry entry;
7. run the functional and accessibility smoke matrix after each family;
8. profile before adding the next heavy canvas, filter, particle field, or frame sequence;
9. expose validated controls through the editor and add schema migration;
10. remove superseded CSS and runtime code only after parity tests pass.

Keep each stage independently shippable. Never require the final animation runtime to make essential content visible or core actions usable.

## 8. Deliver integration evidence

Report:

- the actual route and entry files changed;
- the frozen product-contract ledger;
- every real, demo, and unknown consequential action;
- migrated selectors, attributes, state keys, analytics, and tests;
- the pattern-library modes selected and the content mapped to each;
- the effect registry and owner count;
- functional, content, layout, motion, mobile, accessibility, and performance results;
- every simplification, unknown, untested range, and remaining legacy owner.
- `content integrity: provisional / not yet auditable` whenever the complete original-to-proposed map has not been built from inspected source.

Do not call the redesign complete while a core product flow is `unknown`, a login action is obstructed, or a material contract lacks regression evidence.
