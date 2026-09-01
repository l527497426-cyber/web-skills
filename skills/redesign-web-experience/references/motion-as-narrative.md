# Motion as Narrative

Use motion to explain a change in meaning, focus, or state. Do not add an effect until it can answer what content it strengthens and what the audience should feel.

## Contents

- [Write the narrative mapping first](#write-the-narrative-mapping-first)
- [Budget motion before implementation](#budget-motion-before-implementation)
- [Choose the correct driver](#choose-the-correct-driver)
- [Specify each scene semantically](#specify-each-scene-semantically)
- [Choreograph the Creator Center arc](#choreograph-the-creator-center-arc)
- [Sequence entrances and state changes](#sequence-entrances-and-state-changes)
- [Separate transform ownership](#separate-transform-ownership)
- [Use the sibling skills deliberately](#use-the-sibling-skills-deliberately)
- [Protect authentication and accessibility](#protect-authentication-and-accessibility)
- [Adapt for mobile and reduced motion](#adapt-for-mobile-and-reduced-motion)
- [Verify narrative motion](#verify-narrative-motion)

## Write the narrative mapping first

Complete this chain for every scene:

`content role -> intended emotion -> spatial gesture -> driver -> interruption behavior -> static fallback`

Reject an effect when any field remains empty.

| Content role | Intended emotion | Prefer this gesture | Prefer this driver |
| --- | --- | --- | --- |
| Promise | Recognition, anticipation | Line reveal, field expansion, restrained media drift | Load once, then low-frequency time loop |
| Explore | Curiosity, choice | Active-state swap, preview follow, clip reveal | Hover + focus + tap |
| Explain | Understanding, continuity | Sticky state progression, shared-axis transition | Scroll scrub or explicit selection |
| Prove | Trust, control | Stable UI, directional reveal, count or status resolve | Scroll play or direct state change |
| Convert | Safety, agency | Short entrance and immediate feedback | Explicit user action |
| Comply | Clarity | No expressive motion | Static |

## Budget motion before implementation

Enforce a motion budget instead of distributing effects evenly.

| Zone | Maximum active systems | Recommended behavior |
| --- | --- | --- |
| Login task island | 1 short state transition | Entrance, identity switch, submit feedback |
| Hero | 1 primary + 1 secondary | Scroll-linked media plus line reveal |
| Narrative chapter | 1 scroll system + 1 local interaction | Sticky progression plus active preview |
| Repeated cards | 1 effect on the active card | Clip or scale, not both plus parallax |
| Footer and compliance | 1 optional entrance sequence | Finish quickly and leave content static |

Subtract or merge existing effects before adding new ones. Audit timers, RAF loops, observers, ScrollTriggers, pointer handlers, and competing transforms. Assign one owner to every animated property.

## Choose the correct driver

| Driver | Choose it when | Required parameters | Required fallback |
| --- | --- | --- | --- |
| Load play | The first impression has a fixed order | Delay, duration, stagger, easing | Complete static state |
| Time loop | The loop communicates a living state | Period, dwell, phase, pause policy | One representative state |
| Scroll scrub | Progress itself carries meaning | Start, end, lag, distance, reverse | Midpoint or final state |
| Scroll play | Visibility should launch a complete action | Threshold, duration, re-entry, reverse | Visible final state |
| Hover/focus/tap | A target has discoverable secondary information | Delay, enter/exit timing, active state | Expanded or directly selectable state |
| Pointer follow | Spatial response supports exploration | Damping, max X/Y, return speed | Static media |
| Drag/inertia | Users need to browse an overflow collection | Friction, resistance, bounds, settle threshold | Native horizontal scroll |
| Modal/layer | The user intentionally enters another task | Open/close curve, focus behavior, scroll lock | In-flow or instantly visible panel |

Do not use scroll scrub for a conversion action. Do not use a time loop for instructions that must remain readable. Do not use Hover as the only access path.

## Specify each scene semantically

Store content and motion intent separately from engine syntax. Use a structure equivalent to:

```json
{
  "id": "creator-promise",
  "contentRole": "promise",
  "emotion": ["recognized", "hopeful"],
  "layout": "split-stage-with-login-island",
  "motion": {
    "primary": "scroll-linked-media",
    "secondary": "masked-line-reveal",
    "driver": "load-play",
    "parameterOrigin": "project-proposal",
    "durationMs": 760,
    "staggerMs": 90,
    "easing": "cubic-bezier(0.22,1,0.36,1)"
  },
  "excluded": ["curtain-loader", "character-drag", "custom-cursor"],
  "touch": { "primary": "static-poster", "secondary": "masked-line-reveal" },
  "reducedMotion": { "primary": "static-poster", "secondary": "none" }
}
```

Expose intent labels and `parameterOrigin` in the editor. Use only `current-library-preset`, `measured`, `project-proposal`, or `approved`. Keep raw GSAP start/end strings behind an advanced control and provide viewport-percentage controls for normal editing.

## Choreograph the Creator Center arc

| Chapter | Copy role | Emotional transition | Primary motion | Secondary motion |
| --- | --- | --- | --- | --- |
| Hero | “让热爱被看见 / 让创作更有价值” | Unknown visitor -> recognized creator | One media progression or calm parallax | Two-line mask reveal |
| Login | Enter the product | Anticipation -> certainty | Small panel settle | Explicit state feedback only |
| AI creation | Explain new possibility | Curiosity -> agency | Capability-state progression | Active media clip or shared-axis copy |
| Operations | Explain control | Complexity -> clarity | Sticky product state sequence | Calm copy reveal |
| Growth and value | Supply evidence | Effort -> confidence | Verified status or metric resolve | Restrained card emphasis |
| Institution services | Explain scale | Individual action -> coordinated growth | Accordion or grid selection | One detail reveal |
| Final action | Invite commitment | Understanding -> action | One-shot CTA entrance | No continuous decoration |

Preserve product names and factual mechanisms. Rewrite emotional headlines around user outcomes. Keep evidence literal; never invent numbers to make a proof scene animate.

## Sequence entrances and state changes

1. Reveal the context before the detail.
2. Let a headline settle before moving explanatory media.
3. Keep state-changing copy and media synchronized to one active index.
4. Provide dwell time after every change.
5. Reverse only when reverse motion helps users understand navigation.
6. Kill or settle interrupted tweens before starting a new state.
7. Leave the final content readable after the motion ends.

For repeated capability states, make click, focus, tap, and scroll update the same state machine. Do not maintain independent visual states for each input method.

## Separate transform ownership

Wrap elements by responsibility:

```text
layout wrapper
  scroll-motion wrapper
    interaction wrapper
      media element
```

Write layout placement on the layout wrapper, scrub transforms on the scroll wrapper, Hover or pointer transforms on the interaction wrapper, and crop or color treatment on the media element. Avoid multiple systems writing `transform` on one node.

Run smooth scroll, ScrollTrigger updates, pointer damping, and physics through a coherent lifecycle. Pause loops while offscreen or hidden. Clean up timers, RAFs, observers, pointer capture, and animation contexts when a scene is rebuilt.

## Use the sibling skills deliberately

### Invoke `$recreate-web-motion`

Invoke it when a motion behavior must be extracted from a live reference, recording, or existing donor implementation. Complete its observation and evidence grading before importing the behavior. Carry `observed`, `fitted`, and `unknown` status into the redesign notes. Treat `unknown` values as open design decisions, not recovered facts.

For a reference-accurate clone, stop this redesign workflow and explicitly hand the primary task to `$recreate-web-motion`. Return here only when the user asks to adapt verified motion grammar into an existing product or brand.

Carry both dimensions on return:

- `referenceEvidence`: `observed`, `fitted`, or `unknown`;
- `parameterOrigin`: `measured`, `current-library-preset`, `project-proposal`, or `approved`.

Never convert `unknown` reference evidence into `measured` parameter origin.

Do not invoke it merely to reuse the verified `localhost:3000` pattern library. Read [current-pattern-library.md](current-pattern-library.md) instead and adapt the pattern by content role.

### Invoke `$animate-text`

Invoke it when selecting or implementing a named text effect. Use its portable spec for adaptation and its exact effect recipe for exact reproduction. Preserve the specified target granularity. Prefer `per-line` or `per-word` for emotional Chinese headings; use `per-character` only when individual character rhythm carries meaning.

Keep the original page copy unless the redesign workflow explicitly approves a copy change. Keep screen-reader text intact when splitting visual text.

## Protect authentication and accessibility

- Mark the login panel, QR code, inputs, errors, agreements, and primary submit action as a motion-safe zone.
- Make the login usable before decorative media finishes loading.
- Keep field geometry, caret position, and validation placement stable.
- Announce submission and error states through accessible text rather than motion alone.
- Preserve visible focus and keyboard order through every active-state change.
- Give split text a complete accessible label and hide visual fragments from assistive technology.
- Disable custom cursors and pointer-only behavior for coarse pointers.
- Stop smooth scrolling, scrub timelines, frame sequences, parallax, inertia, and continuous loops at runtime for `prefers-reduced-motion`.
- Show meaningful static content when JavaScript, media, or an animation dependency fails.

## Adapt for mobile and reduced motion

| Desktop behavior | Touch replacement | Reduced-motion replacement |
| --- | --- | --- |
| Pointer-follow preview | Tap-selected inline preview | Static active preview |
| Long sticky chapter | Natural stack or short snap cards | Natural stack |
| Directional clip | Short opacity/translate reveal | Visible final image |
| Inertial drag | Native horizontal scroll with snap | Native scroll without momentum scripting |
| Custom cursor | Native cursor/touch feedback | Native cursor |
| Dense dot field | Small tap list or summary grid | Static labeled list |
| Frame sequence | Poster or sparse keyframes | Poster |
| Split-character wave | Line reveal | Static complete text |

## Verify narrative motion

- Explain the content role and intended emotion for every effect.
- Confirm that disabling an effect does not remove information.
- Test forward, reverse, rapid re-entry, keyboard focus, touch, and interrupted transitions.
- Verify that no two systems fight over the same property.
- Verify that the login remains usable during every hero and chapter state.
- Verify runtime reduced motion, not CSS duration alone.
- Verify one desktop and one mobile narrative from the first promise through the final action.
