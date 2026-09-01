# Implementation stack and lifecycle

Use this reference when translating a motion spec into code.

## Contents

1. Stack choice
2. Suggested architecture
3. Scroll runtime
4. Component and pointer runtimes
5. Overlays and state machines
6. Responsive and reduced motion
7. Fail-open behavior
8. Performance and debugging

## 1. Stack choice

Honor an explicitly requested library. Otherwise choose by behavior:

| Need | Preferred starting point |
|---|---|
| simple hover, state, or ambient loop | CSS transitions/keyframes |
| explicit framework-neutral keyframes | WAAPI |
| React enter/exit and layout presence | Motion/Framer Motion |
| complex scroll scrub, pin, timelines | GSAP + ScrollTrigger |
| reference-specific smoothed wheel feel | Lenis plus one synchronized animation runtime |

Do not assert that the reference uses the same library unless source evidence confirms it.

## 2. Suggested architecture

Keep responsibilities separate:

```text
motion/
  schema.ts          typed configuration and migrations
  defaults.ts        named presets and final states
  registry.ts        one record per rendered effect
  scroll-runtime.ts  scroll triggers and pinning
  pointer-runtime.ts cursor, follow, proximity
  physics.ts         drag/inertia helpers
  reduced-motion.ts  media query and substitutions
components/
  MotionEditor.*     controls, import/export, validation
styles/
  tokens.css
  layout.css
  effects.css
  responsive.css
  reduced-motion.css
```

Adapt the structure to the existing project rather than forcing a new framework. Keep schema, runtime, UI, and static layout boundaries even when files differ.

## 3. Scroll runtime

### Scene inheritance

Give each visual section a stable scene key and let special elements override only the values they need:

```html
<section data-scene="manifesto">
  <h2 data-motion="split-text" data-motion-start="top 88%"></h2>
</section>
```

Resolve configuration as:

```text
global defaults → scene defaults → effect registration → element override → breakpoint override
```

### Scrub semantics

For progress-bound effects:

- define both start and end;
- use linear interpolation by default;
- make reverse behavior inherent to progress;
- use numeric scrub only for intentional lag;
- set `invalidateOnRefresh` when geometry can change.

For triggered time effects:

- define boundary actions explicitly;
- separate duration from scroll distance;
- determine replay and leave-back behavior;
- cancel or complete an interrupted animation consistently.

### GSAP lifecycle

When using GSAP in a component:

- dynamically import client-only packages if SSR requires it;
- register plugins once per runtime initialization;
- scope selectors with `gsap.context`;
- use `gsap.matchMedia` for breakpoint-owned triggers;
- store created triggers/timelines when they need targeted updates;
- revert contexts and media queries on teardown;
- set final visible states if setup throws.

Do not destroy and recreate the entire runtime for every editor keystroke. Separate structural changes from live numeric updates, or debounce a controlled rebuild.

### Lenis synchronization

Use one coherent update loop. A valid pattern is:

```text
lenis.on("scroll", ScrollTrigger.update)
requestAnimationFrame(time => {
  lenis.raf(time)
  request next frame
})
```

An alternative is a GSAP ticker adapter. Do not run two independent smooth-scroll clocks. Stop the driver during loader/modal locks and destroy it on teardown.

Refresh triggers after:

- fonts become ready;
- geometry-affecting media loads;
- editor width opens/closes;
- content or media frame changes;
- breakpoint transition;
- pin/sticky structure changes.

Debounce ResizeObserver-driven refreshes to avoid storms.

## 4. Component and pointer runtimes

### Hover/focus state

Use component or imperative state with cancelable delays. Clear enter timers on leave and clear leave timers on re-entry. Switching directly between siblings must not flash the shared floating media through an idle state unless the reference does so.

Provide `focus-visible` behavior and a tap alternative. Never make essential content hover-only.

### Pointer loops

Store target/current values in refs or mutable objects. Update DOM transforms inside one RAF loop. Start the loop only while a cursor/follow/proximity feature needs it and cancel it on teardown.

Use separate damping values for the cursor and following media. One shared coordinate can erase the layered lag that creates the intended feel.

### Proximity

Measure target geometry when layout changes, not on every node for every frame when avoidable. Reset transforms on pointer leave, blur, touch cancellation, and unmount.

### Drag and inertia

On pointer down:

- cancel existing inertia;
- capture the pointer;
- store start position, base transform, last position/time, and velocity.

On pointer move:

- update velocity from delta divided by elapsed time;
- apply axis lock and resistance;
- write transforms imperatively.

On release:

- release/correct pointer state;
- integrate velocity with friction;
- apply boundary damping or spring;
- stop at the settle threshold;
- clamp or snap to a valid final value.

Make friction time-aware when frame-rate variance matters. Re-grabbing during coast must immediately transfer ownership back to drag.

## 5. Overlays and state machines

Use `closed`, `opening`, `open`, and `closing` rather than a single boolean when close animation matters.

Required behaviors:

- prevent background scroll through the same authoritative lock used by the smooth-scroll driver;
- move focus into the overlay and restore it to the opener;
- support Escape and an accessible close control;
- keep overlay internal scroll independent;
- ignore or reconcile repeated open/close events during transition;
- release locks/listeners even if unmounted mid-transition;
- synchronize state with animation completion or one shared duration constant.

For page transitions, additionally define history/back behavior, old/new page ordering, loader reuse, deep-link initial state, and scroll restoration.

## 6. Responsive and reduced motion

Use breakpoint-owned runtimes rather than scattered width checks when structure changes. A match-media cleanup must kill its triggers and restore stable styles.

On touch/mobile:

- replace hover with tap/focus or show the information statically;
- disable custom cursor;
- preserve vertical scrolling through horizontal drag with appropriate `touch-action`;
- avoid sticky plus automatic pin-spacing duplication;
- compute distances from current viewport/layout rather than a desktop constant.

Under `prefers-reduced-motion`:

- disable smooth scroll, scrub, pin, parallax, infinite loops, and inertia when they are not essential;
- show final content states immediately;
- replace complex transitions with short opacity changes or no animation;
- preserve focus, modal, navigation, and drag alternatives;
- enforce the policy in JavaScript as well as CSS.

## 7. Fail-open behavior

Animation failure must not hide the website.

- Keep static markup in its readable final state by default when possible.
- Add a runtime-ready class only after setup succeeds, then enable hidden initial states.
- Catch dynamic import/setup failures and remove runtime-ready state.
- When an effect is disabled, set opacity, transform, mask, and pointer state to final values.
- Give images explicit dimensions/aspect ratio to prevent measurement drift.
- Avoid relying on animation callbacks for essential data loading or navigation.

## 8. Performance and debugging

Prefer transform and opacity. Profile filters, large clip paths, blend modes, fixed layers, and hundreds of split-text nodes.

Use `will-change` only near active motion and remove it afterward. Split text by the coarsest unit that preserves the design.

Debug geometry before easing:

1. target and trigger identity;
2. containing block and overflow;
3. element rectangle and section height;
4. start/end markers and pin spacing;
5. initial/final computed style;
6. progress at sampled scroll positions;
7. only then duration, easing, and polish.

Inspect runtime stability after repeated edits:

- ScrollTrigger count;
- active RAF loops;
- event listeners/observers;
- layout shift;
- long tasks and dropped frames;
- hidden content after dependency failure;
- stale inline styles after breakpoint changes.
