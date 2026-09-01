# Motion systems and parameter models

Use this reference to classify behavior before choosing an animation API.

## Contents

1. System model
2. Driver families
3. Family parameter contracts
4. Text motion
5. Layout and media rules
6. Selection rules
7. Failure patterns

## 1. System model

Describe every effect across five axes:

1. `driver`: what advances or changes the effect;
2. `target`: which stable wrapper or rendered units move;
3. `geometry`: the containing block, mask, pin range, or bounds it depends on;
4. `playback`: forward, reverse, re-entry, repeat, interruption, and completion;
5. `policy`: desktop/mobile/touch/reduced-motion/disabled behavior.

Do not begin with a library name. A correct behavioral contract can be implemented in multiple stacks; a library choice cannot recover missing behavior.

## 2. Driver families

| Driver | Progress source | Typical use | Critical questions |
|---|---|---|---|
| `load` | elapsed time after readiness | loader, hero, nav | minimum wait, readiness, scroll lock, replay |
| `time-loop` | repeating timeline | logo morph, word swap, ambient pulse | full phase order, hold, gap, pause/offscreen |
| `scroll-scrub` | normalized scroll progress | parallax, masks, split text, horizontal titles | trigger geometry, linearity, reverse |
| `scroll-play` | scroll crossing triggers a time animation | reveals, section titles, footer sequences | toggle actions, re-entry, interruption |
| `hover-focus` | discrete UI state | cards, rows, CTA, media swap | delay, sibling handoff, focus/touch parity |
| `pointer-follow` | pointer target plus damping | custom cursor, following media | damping, offset, frame loop, inactive state |
| `pointer-proximity` | distance field | magnetic lines, nearby particles | radius, falloff, max deformation, reset |
| `drag` | pointer displacement | tracks, cards, character reorder | capture, ratio, axis lock, bounds |
| `inertia` | release velocity integrated over time | draggable galleries | friction, resistance, settle, re-grab |
| `modal-transition` | finite state machine | sheets, decks, menus | opening/closing states, lock, focus, cleanup |
| `page-transition` | navigation state | route curtains, shared media | old/new ordering, history, scroll restoration |

Do not classify an effect as scroll-driven just because it was visible while scrolling.

## 3. Family parameter contracts

### Load and hero

Expose or document:

- readiness condition and minimum duration;
- curtain count, origin, order, duration, easing, and stagger;
- progress behavior and whether it reflects real loading;
- hero target split, delay, duration, stagger, and finish state;
- navigation sequence;
- scroll lock and replay semantics;
- failure timeout and reduced-motion substitution.

### Scroll scrub

Expose or document:

- trigger element;
- `start` and `end` geometry;
- smoothing/scrub lag;
- keyframes and interpolation;
- pin, pin spacing, anticipate-pin, and refresh dependencies;
- forward and reverse behavior;
- breakpoint overrides.

Use a separate trigger per element unless the reference demonstrates a shared progress track. Long section-level triggers make elements animate too early and hide causal errors.

### Scroll play

Expose or document:

- start boundary;
- duration, delay, stagger, easing;
- toggle/re-entry policy;
- whether reverse begins on leave-back or another boundary;
- interruption behavior.

`play reverse play reverse` is not interchangeable with `play none none reverse`. Write the four boundary actions explicitly.

### Clip and mask reveal

Expose or document:

- mask type: inset, polygon, scale, overflow wrapper, or shader;
- origin/direction;
- initial and final geometry;
- title/media synchronization;
- border-radius interaction;
- browser fallback;
- mobile final-state fallback.

For direction variants, animate one progress variable and let CSS derive the polygon/inset when that keeps code simpler and editor values stable.

### Hover and focus

Model states such as `idle`, `pending`, `active`, and `leaving`. Expose:

- enter/leave delay;
- background expansion origin;
- text exit/enter offsets;
- media source and follow offset;
- duration/easing for each layer;
- radius/scale/color change;
- focus and touch equivalent;
- cancellation when moving directly to a sibling.

### Pointer follow and cursor

Use a RAF-owned target/current model:

```text
current += (target - current) × damping
```

Expose independent values for cursor damping, following-media damping, offset, size states, trail, visibility, and touch policy. Disable the RAF when neither cursor nor following media is active.

### Pointer proximity

Map distance to a normalized influence:

```text
influence = clamp(1 - distance / radius, 0, 1)
value = rest + easing(influence) × amplitude
```

Expose radius, amplitude, falloff/easing, axis, max value, and return duration. Always reset affected nodes on leave, blur, and unmount.

### Drag and inertia

Track pointer velocity in `px/ms`, not distance per arbitrary event. Expose:

- drag ratio;
- bounds and how they are measured;
- overscroll resistance;
- velocity multiplier;
- friction per frame or time-normalized decay;
- edge damping/bounce;
- settle threshold;
- snap points and spring if present;
- touch-action and axis lock.

Cancel coasting on a new pointer down. Clamp to final bounds at settle. Recompute bounds after responsive/layout changes.

### Pin and sticky scenes

Choose CSS sticky or animation-library pinning deliberately. Do not stack a tall sticky layout and automatic pin spacing without accounting for both scroll distances.

Expose:

- pin target;
- start and distance/end;
- pin spacing;
- active-item calculation;
- mobile viewport-unit policy;
- entry/exit handoff.

### Modal and page transitions

Use explicit states:

```text
closed → opening → open → closing → closed
```

Expose overlay direction, mask/translation, duration, easing, backdrop, content stagger, scroll lock, focus trap/restore, close synchronization, and interruption/repeated-click policy. Listen for completion or share one authoritative duration; do not duplicate an unrelated timeout.

## 4. Text motion

Declare the target split:

- `whole` for compact labels and focus changes;
- `per-character` for expressive display headings;
- `per-word` for phrase rhythm and readable stagger;
- `per-line` for editorial paragraphs.

Useful families:

- character: soft blur in, character rise, typewriter, top/down letters;
- word: crossfade, spring scale, shared-axis, blur out, kinetic builds;
- line: mask reveal, line-by-line slide;
- whole: micro scale, shimmer, fade-through, focus blur, shared-axis depth;
- layout-aware: center word build, shared slide, pushed line stack.

Preserve the application's text. Sample copy is never permission to overwrite product copy.

At minimum specify:

- split target and tokenization;
- enter/exit duration, delay, easing, and stagger;
- from/to opacity, x/y/z, scale, rotation, blur, and spacing;
- stagger order: normal, reverse, center-out, or edges-in;
- replacement ordering and overlap;
- complete playback loop when the reference loops.

Use `$animate-text` when available for exact portable contracts. Layout-aware kinetic builds need their renderer algorithm and cannot be reduced to generic split-and-stagger.

## 5. Layout and media rules

- Set a stable position context for absolutely positioned motion layers.
- Fix media aspect ratio or dimensions before measuring scroll triggers.
- Put masks and transforms on a wrapper; keep the image responsible for `cover`, crop, saturation, and color wash.
- Avoid using a large `min-height` to hide a containing-block bug.
- Recalculate after fonts, editor width, image source, content length, and breakpoint changes.
- Treat overflow clipping as a deliberate effect boundary, not a global patch.
- Keep animation geometry separate from decorative color/texture layers.

## 6. Selection rules

1. Use CSS transitions/keyframes for small bounded states and simple loops.
2. Use WAAPI for explicit keyframes without a framework dependency.
3. Use Motion/Framer Motion for component-state choreography and presence transitions in React.
4. Use GSAP ScrollTrigger for complex scrub, pinning, multi-property timelines, and cross-browser imperative control.
5. Add Lenis or another smooth-scroll driver only when the feel is part of the requested behavior.
6. Use one engine as the owner of each property. Avoid CSS and JS simultaneously animating the same transform.
7. Prefer transform and opacity; use clip-path and filter selectively after profiling.
8. Make the configuration authoritative; do not spread editable constants through CSS and event handlers.

## 7. Failure patterns

- Converting every effect into a generic reveal.
- Making every scene scrubbed.
- Using one trigger for a whole multi-screen section.
- Claiming source parameters from visual similarity.
- Rebuilding the smooth-scroll instance on every slider input.
- Leaving initial CSS opacity at zero when a dynamic import fails.
- Running permanent pointer RAFs and page-level intervals while effects are disabled.
- Refreshing ScrollTrigger on every ResizeObserver callback without debounce.
- Depending only on CSS for reduced motion while JS pinning and smooth scrolling continue.
- Leaving `will-change` on hundreds of character nodes permanently.
- Replacing media outside the motion wrapper and changing measured geometry.
- Synchronizing close state with a copied timeout rather than the transition lifecycle.
