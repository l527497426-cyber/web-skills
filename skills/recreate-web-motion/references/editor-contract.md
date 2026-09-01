# Motion editor contract

Use this reference when building customization controls around a motion-heavy site.

## Contents

1. Data ownership
2. Required controls
3. Special-effect parameters
4. Registry completeness
5. Validation and persistence
6. Editing lifecycle
7. Editor acceptance

## 1. Data ownership

Keep these domains separate:

```text
schemaVersion
project/reference evidence
design tokens
content and media
global runtime
scenes
effect instances
responsive overrides
reduced-motion policies
editor preferences
```

Do not use a single flat component state once effects become independently editable. Store time in milliseconds in exported configuration and convert at adapter boundaries.

Every effect instance needs:

- stable ID and label;
- target/selector registration;
- family and driver;
- enabled state;
- parameters;
- desktop/mobile/touch overrides;
- disabled final state;
- reduced-motion strategy;
- evidence status and unknowns.

Store suggested implementation defaults in parameters or presets, not as evidence. A preset can be usable while the corresponding reference duration/easing remains `unknown`.

## 2. Required controls

### Global runtime

- smooth scroll enabled;
- smoothing/lerp;
- optional global speed/amplitude preset;
- reduced-motion preview;
- breakpoint preview;
- debug markers/grid;
- replay loader/page sequence.

A global amplitude is a convenience, not a substitute for individual parameters.

### Scene

- enabled;
- driver: scrub or play where applicable;
- trigger target;
- start and end;
- scrub lag;
- duration, delay, stagger, easing;
- pin and pin distance/spacing;
- forward/reverse/re-entry actions;
- desktop/mobile override;
- replay/focus in preview.

### Content and media

- text without destroying split-token identity;
- media enabled/source/alt;
- stable frame/aspect ratio;
- crop, focal point, wash, saturation;
- source/provenance note where needed.

Changing media must not replace or remove the motion wrapper.

## 3. Special-effect parameters

Expose meaningful values instead of only toggles.

| Effect | Minimum useful controls |
|---|---|
| loader | minimum duration, curtain count/origin, stagger, progress style, replay |
| split text | unit, effect family, y/x/blur, duration, stagger, order, easing |
| clip reveal | direction/origin, from/to mask, duration or scrub, title sync |
| pointer cursor | rest/active size, damping, trail, blend mode, labels |
| follow media | delay, damping, x/y offset, enter scale/skew, source |
| proximity | radius, amplitude, falloff, axis, return duration |
| drag | ratio, bounds, resistance, axis lock |
| inertia | velocity multiplier, friction, edge damping, settle, snap |
| pin scene | target, start, distance/end, spacing, active-step calculation |
| CTA orbit | arc count, rotation, spread, enter/leave duration, opacity |
| modal/sheet | direction, offset/mask, open/close duration, curve, backdrop, lock |
| sequence | item selector/order, delay, stagger, duration, re-entry |
| time loop | phase order, hold, gap, repeat, random delay, offscreen policy |

If a value remains hard-coded, label it as a non-editable design constant with a reason.

## 4. Registry completeness

Maintain one registry row per rendered effect:

```text
rendered target ↔ config entry ↔ editor group ↔ runtime adapter
                ↔ disabled final state ↔ responsive policy
                ↔ reduced-motion policy ↔ QA case
```

Add an automated contract check when practical. It should find:

- rendered effect IDs without configuration;
- configuration without a runtime target;
- special effects without editor controls;
- enabled effects without disabled final state;
- effects without reduced-motion policy;
- stale scene or selector registrations.

## 5. Validation and persistence

### Validation

- validate IDs and uniqueness;
- validate start/end syntax through an allowlist or parser plus safe fallback;
- bound durations, delays, scrub, damping, radius, friction, and scale;
- reject `NaN`, infinity, negative time, impossible ranges, and missing targets;
- warn when a scrub effect lacks an end or when a fitted effect lacks tolerance;
- show errors beside controls and keep the last valid runtime value.

### Persistence

Include `schemaVersion`. Parse local storage or imports defensively. Merge known defaults, ignore unknown stale fields, and migrate older versions explicitly.

Support:

- local autosave;
- reset to named defaults;
- JSON export;
- JSON import with validation and preview;
- optional shareable preset files;
- editor language preference when bilingual UI is useful.

Do not save derived runtime handles, DOM geometry, or active animation objects.

## 6. Editing lifecycle

Classify edits:

- `style-only`: CSS variables update directly;
- `timeline-value`: update/restart affected timeline;
- `structural`: rebuild one scene/effect;
- `runtime`: rebuild scroll driver or breakpoint runtime.

Debounce structural/runtime edits. Do not destroy Lenis and every trigger on each slider event.

After editor width/content/media changes:

1. settle layout;
2. refresh only affected geometry when possible;
3. preserve current scroll position and modal state;
4. ensure inline styles from the previous configuration do not survive incorrectly.

Preview controls should provide:

- focus/jump to scene;
- replay scene;
- scrub preview;
- desktop/mobile/reduced preview;
- disable/enable comparison;
- reference notes and evidence status.

## 7. Editor acceptance

- Reset restores configuration and derived text/media state.
- Export then import produces the same behavior and values.
- Invalid input cannot hide content or crash the runtime.
- Repeated editing does not increase trigger/listener/RAF counts.
- Closing/opening the panel refreshes geometry without jumping.
- Disabled effects show complete static content.
- Every special effect can be located from the editor by name.
- Mobile/touch and reduced-motion strategies are visible, not implicit.
- Chinese/English chrome, if present, changes labels without changing internal stable keys.
