# Motion QA matrix

Use this matrix before claiming a motion reproduction or editor is complete.

## Contents

1. Test environments
2. Behavioral matrix
3. Editor/runtime stability
4. Accessibility and performance
5. Acceptance report

## 1. Test environments

Record exact tested values:

- desktop viewport and DPR;
- mobile viewport and DPR;
- mouse/trackpad/touch input;
- normal and reduced motion;
- initial top load and deep-scroll refresh;
- browser and date;
- reference and implementation builds.

Use the same viewports and scroll checkpoints for reference and implementation comparisons.

## 2. Behavioral matrix

| Family | Required actions | Required values | Pass condition |
|---|---|---|---|
| load/hero | first load, cached load, replay, minimum delay, failure | readiness, lock, phase order, duration | no blank frame; lock releases; final state stable |
| scroll reveal | slow/normal/fast down, reverse, re-entry, deep refresh | start/end, from/to, scrub, reverse | trigger error within agreed tolerance; no hidden content |
| scrub | stop at 25/50/75%, reverse same points | property progress, smoothing | motion stops with scroll; reverse matches |
| scroll play | cross each boundary both directions, interrupt | four toggle actions, duration | playback/re-entry equals contract |
| pin/sticky | traverse full range and reverse | start/end, placeholder, target position | no entry/exit jump or double spacing |
| hover/focus | edge/center enter, sibling switch, leave, rapid repeat, keyboard | delays, mask, color, radius, media | no stale or stuck state; focus equivalent exists |
| pointer follow | approach, cross, leave, idle, resize | damping, offset, size/trail | settles and resets; loop disables when unused |
| proximity | multi-direction approach, pass through, leave | radius, falloff, amplitude | influence range and peak match; full reset |
| drag | short/long/slow/fast, both directions, boundaries | ratio, bounds, resistance | follows pointer and can re-grab |
| inertia | slow/fast flick, both directions, near boundary | velocity, distance, settle, snap | distance/settle within tolerance; no endless coast |
| modal | open, close, Escape, rapid repeat, internal scroll | curve, duration, lock, focus | no background scroll or stale layer; focus restored |
| page transition | link, back, refresh, deep link | old/new ordering, loader, scroll | no blank/stale frame or scroll pollution |
| loop | observe two cycles, interrupt, leave viewport | phases, hold, gap, repeat | no duplicate enter or visible jump |
| mobile/touch | touch scroll, tap alternative, rotation/resize | breakpoint overrides | essential content and controls remain usable |
| reduced motion | load, scroll, modal, drag alternative | disable/shorten/final strategy | no smooth scroll/pin/infinite motion; all content visible |

Default fit tolerances when no stricter target exists:

- trigger: `≤24px` or `≤3vh`;
- keyframe progress: `≤5%`;
- timed hover/transition: `≤80ms` or `≤10%`;
- inertia settle: `≤120ms`;
- inertia distance: `≤10%`.

These tolerances judge the reproduction; they do not turn fitted parameters into observed source values.

## 3. Editor/runtime stability

Test at least:

1. change each representative control;
2. make 20 repeated timeline/scene edits;
3. open/close the editor repeatedly;
4. reset;
5. export, reload, and import;
6. import invalid/outdated configuration;
7. disable every effect family;
8. switch breakpoint and reduced-motion preview.

Pass conditions:

- trigger/timeline/listener/observer/RAF counts return to baseline;
- scroll position does not jump unexpectedly;
- current modal/drag state is reconciled safely;
- no stale inline transforms remain after breakpoint or disable;
- invalid values keep the last valid runtime state and surface an error;
- reset covers derived text/media state, not only the config object;
- exported configuration includes schema version and all effect parameters.

## 4. Accessibility and performance

Accessibility checks:

- keyboard focus reaches every interactive target;
- hover information has focus/tap/static access;
- overlays trap and restore focus;
- Escape works;
- custom cursor never replaces a necessary native affordance on touch;
- reduced motion is honored in JavaScript and CSS;
- animation is not required to reveal essential content;
- media has appropriate alternative text.

Performance checks:

- pointer/scroll movement does not trigger root React re-render per frame;
- images reserve layout space;
- no permanent `will-change` across large split-text collections;
- no refresh storm from ResizeObserver;
- no duplicate intervals or animation loops;
- target devices maintain acceptable frame pacing;
- filter, blend, clip-path, and fixed layers are profiled where heavy.

Code checks:

- lint/type/unit tests pass;
- production build passes;
- runtime setup has cleanup and failure fallback;
- disabled/reduced states are covered by tests;
- editor config validation and migration are covered;
- reference-media provenance is recorded.

## 5. Acceptance report

Deliver a compact table:

| Scope | Status | Evidence | Remaining gap |
|---|---|---|---|
| desktop scroll | pass/fail/unknown | viewport and checkpoints | exact unknown |
| reverse/re-entry | pass/fail/unknown | actions tested | gap |
| hover/pointer | pass/fail/unknown | targets tested | gap |
| drag/inertia | pass/fail/unknown | samples | gap |
| overlays | pass/fail/unknown | cases | gap |
| mobile/touch | pass/fail/unknown | viewport | gap |
| reduced motion | pass/fail/unknown | setting | gap |
| editor round-trip | pass/fail/unknown | export/import | gap |
| lifecycle/performance | pass/fail/unknown | counts/profile | gap |

Also report counts of `observed`, `fitted`, and `unknown` effects from the motion spec. Do not use “1:1” if any material screen, reverse state, breakpoint, or transition is unknown or untested.
