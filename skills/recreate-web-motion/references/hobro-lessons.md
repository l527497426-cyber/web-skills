# Lessons from the originating Hobro study

This playbook came from rebuilding a motion-heavy studio site as a local editor. Use these lessons as concrete failure prevention, not as source parameters for another site.

## What changed the quality

### Motion is a driven system

The first weak interpretation treated motion as decoration: elements faded and moved when sections became visible. The stronger interpretation classified each behavior by its driver:

- time sequence for loader, hero, logo, and word loops;
- scroll scrub for progress-bound titles, masks, dots, and parallax;
- scroll play for reveals and footer choreography;
- hover/focus state for feature rows and CTAs;
- RAF-driven pointer follow and proximity;
- drag plus release physics for the team track;
- state-machine transitions for sheets and capability overlays.

That distinction determines trigger geometry, reverse behavior, cleanup, editor parameters, and testing.

### Each element needs causal timing

A single section-level trigger made later cards move too early. The reliable pattern was one scene boundary for shared defaults plus element-level triggers and overrides for actual arrival timing.

### Smooth scrolling must share a clock

The study synchronized Lenis scroll events with ScrollTrigger updates and drove Lenis from a single RAF. Loader and modal locks stopped and restarted the same instance. This prevented the DOM scroll position and animation engine from disagreeing.

### Media belongs inside motion wrappers

Real editorial images were added without rebuilding the motion geometry. Stable wrappers owned clip, transform, and aspect ratio; images owned cover/crop, saturation, and color wash. This kept replacement media from changing trigger layout.

## The important layout bug

A featured media block appeared several screens tall. The tempting response was to reduce the outer cases section's large `min-height`, but that section genuinely needed its height for a long case grid.

The actual cause was containing-block selection:

- the featured child was absolutely positioned;
- its intended parent was not positioned;
- the child therefore used a much taller ancestor as its containing block;
- its percentage height stretched across multiple screens.

The fix was to give the intended featured section a positioning context and explicit height. The lesson is to inspect containing blocks, percentage-height ancestry, overflow, and layout bounds before tuning animation values.

## Useful implementation patterns

The originating runtime used:

- a typed scene model with enabled, mode, start, end, scrub, duration, stagger, pin, and reverse;
- nearest `[data-scene]` inheritance plus element-level start/end/duration/stagger overrides;
- `gsap.context` and `gsap.matchMedia` cleanup;
- a ResizeObserver-triggered refresh;
- pointer refs for cursor/follow motion rather than React state per frame;
- pointer capture, measured velocity, friction, boundary resistance, and settle threshold for drag inertia;
- content-visible fallbacks when an effect was disabled;
- local editor persistence, JSON export, bilingual chrome, and stable internal keys.

These are patterns, not a mandate to use the same library or constants.

## Known limitations that became new requirements

The first editor exposed scene-level timing and effect toggles, but several important values remained hard-coded. A complete future editor must make these independent where relevant:

- case clip direction and progress geometry;
- pointer cursor and following-media damping;
- proximity radius/falloff/amplitude;
- inertia friction, boundary damping, and settle threshold;
- popup open and close curves/durations;
- mobile pin distance and active-step calculation;
- per-title offsets and per-effect scrub;
- loader curtain phase timing;
- automatic-loop hold and gap.

One global motion-scale slider is useful for tuning but cannot replace those controls.

## Runtime gaps to avoid repeating

- Do not rebuild Lenis and all ScrollTriggers on every continuous editor input.
- Do not let a scene scrub value accidentally override an effect-specific scrub.
- Validate ScrollTrigger start/end strings and fail to a visible state.
- Catch dynamic import/setup errors; initial hidden split text must not remain hidden.
- Do not keep page-level 420/500ms intervals if isolated timelines/components can own the loop.
- Do not run a permanent pointer RAF when pointer effects are off.
- Debounce ResizeObserver refreshes.
- Enforce reduced motion in JavaScript, not only CSS.
- Remove or scope `will-change` on large character sets.
- Couple close state to actual animation completion or one shared duration.
- Add focus trapping and opener focus restoration to overlays.
- Reset derived text/media state together with configuration.

## Evidence discipline

The study recorded several working easing and timing values, but unless the reference source or measurement confirms them, they remain fitted implementation defaults. Reuse their design role, not their claimed provenance:

- a strongly decelerating brand/hero ease;
- a symmetric ease-in-out for case/fresh transitions;
- a dedicated popup curve;
- linear easing for true scrub tracks;
- stepped easing only for intentionally discrete typewriter/count behavior.

When adapting these ideas to another reference, measure again and label the result `observed`, `fitted`, or `unknown`.
