# Redesign QA matrix

Use this matrix before claiming an existing web experience has been successfully redesigned. Verify the product, content, layout, motion, mobile behavior, accessibility, and performance as one system.

## Contents

1. Record the test envelope
2. Apply status and priority rules
3. Verify functional continuity
4. Verify content integrity
5. Verify layout and visual hierarchy
6. Verify motion and interaction
7. Verify mobile and touch
8. Verify accessibility
9. Verify performance and resilience
10. Produce the acceptance report

## 1. Record the test envelope

Record exact values before testing:

| Dimension | Required record |
|---|---|
| Build | commit or immutable snapshot, route, feature flags, editor preset |
| Browser | name, version, date, extensions that affect behavior |
| Desktop | viewport, DPR, mouse and trackpad |
| Compact desktop/tablet | viewport, DPR, input mode |
| Mobile | at least one narrow and one common viewport, DPR, real touch when possible |
| Accessibility | keyboard, screen reader, 200% zoom, reduced motion, increased text size |
| Network | normal, slow, offline, failed media/API |
| Entry | top load, reload, back/forward, deep link, deep-scroll refresh |
| Evidence | screenshot, recording, test output, DOM assertion, network trace, or profile |

Use the same content, viewport, and checkpoints when comparing the baseline, concept, and implementation.

## 2. Apply status and priority rules

Use only `pass`, `fail`, `unknown`, or `not-applicable`.

- Treat `P0` as a delivery blocker.
- Treat `P1` as required for a complete redesign claim.
- Treat `P2` as a documented quality improvement.
- Mark unexecuted checks `unknown`; never infer a pass from source inspection.
- Attach concrete evidence to every `pass`.
- Record an owner and follow-up for every `fail` or material `unknown`.

## 3. Verify functional continuity

| ID | Priority | Action | Pass condition |
|---|---:|---|---|
| F-01 | P0 | Inventory every consequential control before and after redesign | no control, state, side effect, destination, or recovery path disappears silently |
| F-02 | P0 | Classify each action as real, demo, or unknown | classification matches source evidence and delivery language |
| F-03 | P0 | Complete every real primary flow | validation, pending, success, error, and destination all work |
| F-04 | P0 | Exercise login identity and method switches | active state, fields, labels, focus, values, and destination stay correct |
| F-05 | P0 | Submit with valid, invalid, empty, repeated, slow, offline, and failed responses | one controlled request occurs and every state recovers |
| F-06 | P0 | Block media, canvas, WebGL, custom fonts, and motion imports | primary tasks remain visible and operable |
| F-07 | P0 | Open every legal, privacy, help, recovery, and consent link | real destination and browser behavior remain intact |
| F-08 | P1 | Exercise tabs, accordions, carousels, popups, and navigation | pointer, keyboard, focus, URL, history, and state stay synchronized |
| F-09 | P1 | Reload each meaningful state and use back/forward | no stale overlay, lost route, duplicate submission, or corrupted state |
| F-10 | P1 | Compare selectors, data attributes, events, persistence keys, tests, and analytics | every migration has a verified consumer update or adapter |
| F-11 | P1 | Disable each new presentation pattern independently | product behavior remains unchanged |
| F-12 | P2 | Exercise optional editor import, export, reset, and migration | valid state round-trips and invalid state fails safely |

## 4. Verify content integrity

| ID | Priority | Action | Pass condition |
|---|---:|---|---|
| C-01 | P0 | Compare product names, capabilities, eligibility, prices, numbers, and destinations with approved truth | no invented or altered product fact |
| C-02 | P0 | Compare legal, privacy, consent, regulatory, and company text | authorized meaning and links remain exact |
| C-03 | P1 | Map every original content block to keep, rewrite, merge, relocate, or approved removal | no silent content loss |
| C-04 | P1 | Read only headings and transition sentences in order | the page communicates one coherent narrative arc |
| C-05 | P1 | Read every section as its target audience | benefit, evidence, and next action are clear without motion |
| C-06 | P1 | Check creator and organization identity paths separately | each audience receives relevant content without a contradictory shared story |
| C-07 | P1 | Inspect rewritten emotional copy | tone improves specificity and feeling without hiding literal actions |
| C-08 | P1 | Remove animation and images | headings, body, labels, errors, and CTA still explain the product |
| C-09 | P2 | Check repetition, paragraph length, line breaks, and localized expansion | rhythm remains deliberate and text does not rely on forced visual symmetry |

## 5. Verify layout and visual hierarchy

| ID | Priority | Action | Pass condition |
|---|---:|---|---|
| L-01 | P0 | Inspect the primary task at every viewport before animation completes | task is visible, readable, unobstructed, and immediately operable |
| L-02 | P0 | Overlay login safe-zone bounds with all fixed, sticky, canvas, cursor, editor, and decorative layers | no overlap or pointer interception occurs |
| L-03 | P1 | Compare DOM reading order with visual order | hierarchy remains logical for keyboard and assistive technology |
| L-04 | P1 | Inspect 320px width, compact desktop, ultra-wide, landscape, and 200% zoom | no clipping, overlap, stranded controls, or horizontal page scroll |
| L-05 | P1 | Disable custom fonts and delay all images | reserved geometry prevents material layout shift |
| L-06 | P1 | Inspect heading scale, line length, whitespace, alignment axes, and section density | one primary focal point exists per screen |
| L-07 | P1 | Traverse every sticky or pinned section in both directions | containing blocks, section height, exit spacing, and following content remain correct |
| L-08 | P1 | Expand the longest tab, error, consent, and localized copy | containers grow without covering actions |
| L-09 | P2 | Compare approved screenshots at fixed checkpoints | visual deviations are intentional and documented |

## 6. Verify motion and interaction

| ID | Priority | Action | Pass condition |
|---|---:|---|---|
| M-01 | P0 | Load with motion runtime blocked | all essential content renders in its final readable state |
| M-02 | P0 | Enable reduced motion in OS and browser emulation | smooth scroll, long pins, scrubs, infinite motion, blur travel, and scroll capture are removed or reduced |
| M-03 | P0 | Focus and type inside login while scrolling and moving the pointer | no snap, auto-scroll, focus loss, parallax obstruction, or input delay occurs |
| M-04 | P1 | Audit the effect registry | each target/property pair has exactly one owner and one cleanup path |
| M-05 | P1 | Scroll slowly, normally, quickly, reverse, stop at 25/50/75%, and re-enter | scrub and play effects follow their declared semantics without hidden or stale state |
| M-06 | P1 | Deep-scroll refresh before and inside every scene | scene initializes to the correct state without replaying required prior chapters |
| M-07 | P1 | Interrupt entrances, exits, text swaps, popups, and card changes | stale timers and animations cancel and the latest state wins |
| M-08 | P1 | Rapidly hover, focus, tap, leave, and switch siblings | no flicker, stuck preview, duplicate media, or pointer-only information remains |
| M-09 | P1 | Traverse each sticky story rail at both ends | native scrolling releases predictably and cannot trap the user |
| M-10 | P1 | Map each selected pattern-library mode to its content role | every motion supports reveal, transition, focus, causality, feedback, or navigation rather than decoration alone |
| M-11 | P1 | Disable each heavy pattern separately | layout geometry and product behavior remain stable |
| M-12 | P1 | Switch breakpoint and motion preference during an active scene | inline state, listeners, RAFs, observers, and scroll locks reconcile safely |
| M-13 | P2 | Record two complete cycles of loops and ambient effects | no visible jump, drift, duplicate start, or attention theft occurs |

## 7. Verify mobile and touch

| ID | Priority | Action | Pass condition |
|---|---:|---|---|
| T-01 | P0 | Complete each primary task on a narrow touch viewport | no hover, precision pointer, or prior scroll chapter is required |
| T-02 | P0 | Open the virtual keyboard on every field and trigger an error | active field, error, submit, and recovery remain reachable |
| T-03 | P0 | Rotate during input, pending state, and an open overlay | state and focus survive without clipping or duplicate requests |
| T-04 | P1 | Test tap targets and spacing | controls meet at least 44 by 44 CSS pixels or the product's stricter standard |
| T-05 | P1 | Scroll through desktop-derived sticky and pinned chapters | mobile uses normal flow or a short touch-safe alternative without trapping |
| T-06 | P1 | Test safe-area insets, dynamic browser chrome, and `100dvh` changes | no primary control falls behind device or browser UI |
| T-07 | P1 | Test autofill, password manager, paste, and one-time-code suggestion | values enter the intended stable fields |
| T-08 | P1 | Test slow network and failed images | useful text and primary actions appear before optional media |
| T-09 | P1 | Test QR flow on mobile | a supported fallback replaces any impractical self-scan requirement |
| T-10 | P2 | Compare portrait and landscape art direction | composition remains intentional without copying desktop density |

## 8. Verify accessibility

| ID | Priority | Action | Pass condition |
|---|---:|---|---|
| A-01 | P0 | Complete all primary flows with keyboard only | logical order, activation, dismissal, and return focus work |
| A-02 | P0 | Inspect labels, names, roles, values, descriptions, and live regions | assistive output matches visible state and no required child sits under `aria-hidden` |
| A-03 | P0 | Trigger every validation, pending, QR, and submission state | status is announced once, associated correctly, and recoverable |
| A-04 | P1 | Test visible focus in every surface and background state | indicator remains visible and is not clipped by animation wrappers |
| A-05 | P1 | Test hover-only previews and disclosures with focus and tap | equivalent information and action exist |
| A-06 | P1 | Test overlays and dialogs | focus enters, stays when modal, Escape works when allowed, and focus returns |
| A-07 | P1 | Measure contrast for text, controls, focus, disabled, error, and autofill states | ratios meet the project's WCAG target |
| A-08 | P1 | Inspect heading hierarchy, landmarks, lists, tabs, and forms | semantics describe the redesigned information architecture |
| A-09 | P1 | Test 200% browser zoom and increased text size | content reflows without loss of function or meaning |
| A-10 | P1 | Pause or disable moving, blinking, and auto-updating content | users can stop nonessential motion and complete the task |

## 9. Verify performance and resilience

Use project-specific budgets when supplied. Otherwise start with LCP at or below 2.5 seconds, CLS at or below 0.1, and INP at or below 200 milliseconds at the agreed production percentile and test conditions.

| ID | Priority | Action | Pass condition |
|---|---:|---|---|
| P-01 | P0 | Profile first load with cold cache and optional media delayed | primary task becomes usable without waiting for frame sequences, canvas, particles, or below-fold media |
| P-02 | P0 | Force script, media, API, and font failures independently | failure opens to a readable, operable, truthfully labeled state |
| P-03 | P1 | Measure LCP, CLS, and INP under the agreed conditions | budgets pass or deviations receive explicit approval |
| P-04 | P1 | Record scroll, typing, tab switching, and animation frame pacing | no recurring long task or effect causes visible input or scroll degradation |
| P-05 | P1 | Count images, frame-sequence requests, particles, canvases, fixed layers, filters, and blend modes | every heavy resource has a visible purpose, activation boundary, and budget |
| P-06 | P1 | Leave and re-enter scenes repeatedly | listeners, observers, timers, RAFs, media, and WebGL resources return to baseline |
| P-07 | P1 | Resize repeatedly and change editor controls twenty times | no refresh storm, duplicate runtime, memory growth, or stale transform accumulates |
| P-08 | P1 | Inspect image dimensions, loading priority, decode, and aspect reservation | critical media loads first and decorative/below-fold media defers |
| P-09 | P1 | Idle offscreen and background the tab | infinite effects pause or substantially reduce work |
| P-10 | P1 | Test low-power/touch/reduced-motion policies | heavy effects disable without changing content or task geometry |
| P-11 | P2 | Build and inspect the production bundle | dead experiments, duplicate engines, and unused assets are removed or documented |

## 10. Produce the acceptance report

Deliver this summary:

| Scope | Status | Evidence | Remaining gap | Owner |
|---|---|---|---|---|
| Product functionality | pass/fail/unknown | flows and tests | exact gap | name |
| Real/demo classification | pass/fail/unknown | handler and network evidence | exact gap | name |
| Content truth | pass/fail/unknown | contract ledger | exact gap | name |
| Emotional narrative | pass/fail/unknown | copy map and review | exact gap | name |
| Layout and hierarchy | pass/fail/unknown | viewports and captures | exact gap | name |
| Authentication safe zone | pass/fail/unknown | overlap and interaction tests | exact gap | name |
| Motion and pattern mapping | pass/fail/unknown | effect registry and recordings | exact gap | name |
| Mobile and touch | pass/fail/unknown | devices and viewports | exact gap | name |
| Accessibility | pass/fail/unknown | keyboard, screen reader, contrast | exact gap | name |
| Performance and resilience | pass/fail/unknown | metrics and profiles | exact gap | name |

Also report:

- the count of `P0`, `P1`, and `P2` passes, failures, and unknowns;
- every retained legacy contract and motion owner;
- every selected and rejected pattern-library mode with its reason;
- every untested browser, viewport, assistive technology, device, and failure state;
- whether the login task remained operable before, during, and after all decorative motion.

Do not claim completion while any P0 item is `fail` or `unknown`, while core functionality is only a demo but presented as real, or while motion is required to reveal or operate essential content.
