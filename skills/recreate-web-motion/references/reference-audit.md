# Reference-site motion audit

Use this procedure to turn a live reference into reproducible evidence without changing external state.

## Contents

1. Audit setup
2. Screen map
3. Observation passes
4. Evidence grades
5. Effect record
6. Sampling and tolerances
7. Completion gate

## 1. Audit setup

Record these facts before judging motion:

- URL and audit date;
- viewport width, height, DPR, input type, and browser;
- logged-in/logged-out state;
- font, image, video, lazy-loading, and loader readiness;
- page scroll height and each visual section's top/height;
- desktop, mobile, touch, and reduced-motion ranges actually tested.

Use read-only interactions. Do not submit forms, publish, buy, change account data, or trigger other external mutations just to observe a public page.

Wait for geometry-affecting assets to stabilize. A late font or image can shift triggers enough to produce a false timing diagnosis.

## 2. Screen map

Divide the page by visual scenes, not merely by DOM `section` tags. Assign stable IDs such as `s01-hero`, `s02-manifesto`, and `s03-cases`.

For every scene record:

- document range;
- normal flow, sticky, pin, fixed, or translated track;
- height, min-height, containing block, overflow, and media frame;
- fixed layers shared across scenes;
- entry and exit neighbors;
- desktop/mobile structural differences.

Layout is part of motion. If an absolutely positioned child is unexpectedly tall, identify its containing block before changing animation durations or outer section height.

## 3. Observation passes

### Static pass

Scroll once without hovering. Record layout, visual hierarchy, masks, background changes, fixed chrome, media, and sections that occupy more than one viewport.

### Scroll pass

Run slow, normal, and fast scrolls. For every visible effect sample:

1. before trigger;
2. 25% progress;
3. 50% progress;
4. 75% progress;
5. completed state;
6. reverse at 50%;
7. reverse before trigger.

Determine whether behavior is:

- progress-bound `scroll-scrub`;
- trigger-bound `scroll-play`;
- one-shot reveal;
- reversible;
- reset on exit;
- an independent time loop merely seen during scrolling.

Refresh at a deep scroll position and use anchor/deep links when available. Initial states must be correct without first scrolling from the top.

### Hover, focus, and pointer pass

For each card, row, button, media zone, cursor zone, and dot field:

- enter from outside and from an edge;
- move inside slowly and quickly;
- leave and re-enter rapidly;
- switch directly to a sibling target;
- use keyboard focus;
- test touch/tap fallback.

Record masks, radius, color, copy/media swaps, pointer damping, magnetic pull, proximity radius, delay, and cleanup after leave.

### Drag and inertia pass

Test short drag, long drag, slow drag, fast flick, both directions, both boundaries, overscroll resistance, re-grab during coasting, and release near a boundary.

Keep drag distance separate from inertial distance. Sample release at `0, 50, 100, 200, 400, 800, 1600ms` and at final settle.

### Overlay and transition pass

Cover loader, menu, modal, case detail, route transition, close, Escape, browser back, rapid repeated click, and interruption. Record scroll lock, focus movement, layer order, internal overlay scrolling, close timing, and cleanup.

### Loop pass

Observe at least two full cycles. Record phase order, hold, gap, replacement rule, random delay, offscreen policy, and interruption behavior.

## 4. Evidence grades

### `observed`

Use only for behavior or values directly measured from page state, computed style, geometry, scroll position, or a repeatable time series.

Required evidence includes at least one of:

- scrollY plus target rectangle;
- computed transform, opacity, filter, or clip-path;
- timestamped samples;
- precise interaction reproduction steps.

An observed visual endpoint does not prove the source GSAP configuration or animation library.

A user-reported symptom is valuable input, but it is not agent-observed evidence until verified through an artifact, recording, or read-only inspection. Preserve the report in the observation notes and identify its source; do not silently upgrade it to `observed`.

### `fitted`

Use when exact source parameters are unavailable and an implementation value is fitted from multiple observations.

Require at least two useful reference samples or checkpoints. A requested effect name, common industry default, or designer preference alone is only an implementation proposal; keep the reference evidence `unknown` until comparison data exists.

Record:

- proposal;
- observations used as basis;
- confidence;
- tolerance;
- alternatives that remain visually indistinguishable.

Call it a fitted, estimated, or proposed value. Never call it the original value.

### `unknown`

Use when the behavior could not be triggered, measured, separated from another effect, or distinguished between plausible implementations.

Record:

- reason;
- impact on fidelity;
- next step;
- safe fallback.

Never silently fill an unknown with a fashionable default.

## 5. Effect record

Each effect in `motion-spec.json` must answer:

- What is the target?
- What drives it?
- What are forward, reverse, re-entry, and repeat semantics?
- What are the from/to or intermediate keyframes?
- What starts and ends it?
- What are duration, delay, stagger, easing, and scrub?
- What changes on mobile and touch?
- What happens under reduced motion?
- Which editor controls own the behavior?
- Which values are observed, fitted, or unknown?

Example evidence block:

```json
{
  "status": "fitted",
  "confidence": "medium",
  "observations": [],
  "basis": [
    "At 120ms, the mask covered about 74% of the media",
    "At 470ms, the mask covered about 18%",
    "The visual state settled near 1170ms"
  ],
  "tolerance": "duration ±100ms; mask progress ±5%",
  "unknowns": ["Original easing curve and trigger syntax"]
}
```

## 6. Sampling and tolerances

Default time samples:

```text
0 / 80 / 160 / 320 / 640 / 1000 / 1600ms
```

Default scroll samples:

```text
before / 25% / 50% / 75% / after / reverse 50% / reverse before
```

Default initial fit tolerances, unless the project defines stricter ones:

- trigger location: `≤24px` or `≤3vh`;
- key property progress: `≤5%`;
- hover timing: `≤80ms` or `≤10%`;
- inertia settle: `≤120ms`;
- inertia distance: `≤10%`;
- pinned element position: no visible jump at entry/exit.

Tolerance is an acceptance target, not evidence that a source parameter is known.

## 7. Completion gate

Do not finish the audit until:

- every screen records whether scroll, reverse, hover, focus, click, drag, loop, and transition behavior exists;
- every scroll effect has a reverse result;
- every interactive card has a leave/close result;
- every draggable region has inertia and boundary results;
- desktop, mobile, touch, and reduced-motion coverage is explicit;
- verified behavior, fitted proposals, unknown parameters, untested ranges, and deliberate deviations are listed separately;
- media sources and usage are documented.

The hard rule is: reproduction may be incomplete, but unobserved, unmeasured, or fitted behavior must never be described as the reference site's exact implementation.
