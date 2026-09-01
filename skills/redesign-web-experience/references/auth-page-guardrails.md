# Authentication page guardrails

Read this reference completely whenever a redesign includes login, registration, account recovery, identity selection, verification, consent, or an authentication-adjacent landing page.

## Contents

1. Protect the login task island
2. Preserve the authentication state machine
3. Support autofill and password managers
4. Control focus and keyboard behavior
5. Render validation and asynchronous states
6. Handle QR authentication
7. Preserve consent and legal access
8. Adapt safely to mobile
9. Enforce accessibility and security
10. Verify before delivery

## 1. Protect the login task island

Treat the authentication interface as a P0 task island inside the wider brand experience.

- render the task island in its usable final state on the first meaningful paint;
- keep identity selection, method selection, required fields, submit, help, and consent visible or reachable without completing a scroll scene;
- keep the task island outside scrubbed transforms, clip paths, masks, canvas compositing, pointer-follow layers, and long entrance timelines;
- reserve stable width, height, and safe-area spacing before fonts, images, QR data, and animation code load;
- keep decorative layers behind the task island and set noninteractive overlays to `pointer-events:none`;
- prevent sticky, fixed, editor, cursor, or particle layers from covering the task island at any viewport;
- keep a direct keyboard and screen-reader route from the page landmark to the first authentication control;
- limit optional task-island entrance motion to a short, interruptible transition and expose the final state immediately under reduced motion;
- keep login usable when JavaScript, WebGL, canvas, remote media, custom fonts, or the motion library fails;
- never auto-scroll, snap, or lock the wheel while a user is typing, selecting a method, reading an error, or completing consent.

Define a safe zone around the task island. Test it against animated backgrounds, transformed ancestors, browser zoom, virtual keyboards, notches, toolbars, editor panels, and long localized text.

## 2. Preserve the authentication state machine

Model authentication explicitly after inspecting the current implementation. Do not infer state from animation classes, common industry patterns, or the desired visual design.

Use this minimal chain for states that actually exist:

```text
identity -> method -> input -> validation -> pending -> success
                                      \-> recoverable error
                                      \-> terminal error
```

Apply these rules:

- preserve creator, organization, or other identity modes and their distinct destinations;
- preserve QR, verification-code, password, passkey, SSO, and recovery methods that actually exist;
- mark methods, timers, limits, lockouts, and recovery states `unknown` or `not-applicable` until source or user evidence confirms them;
- update `aria-selected`, `aria-expanded`, `hidden`, labels, and focus when a mode changes;
- retain compatible input values when switching methods and clear secrets only when security requires it;
- prevent repeated submissions while pending without disabling recovery or cancellation;
- preserve server errors until the user changes the relevant value or retries;
- restore the original control state after cancellation or failure;
- never represent a timer, local class change, or button-label change as successful authentication;
- keep demo behavior labeled and isolate it behind a replaceable handler.

Do not let emotional copy obscure the action. Keep button verbs, field labels, recovery links, and status messages literal.

## 3. Support autofill and password managers

Use native form semantics and stable DOM nodes.

- wrap related fields in a real `<form>` and support Enter submission;
- associate every input with a persistent `<label>`; do not rely on placeholder text;
- set an appropriate `name`, `type`, `inputmode`, and `autocomplete` value;
- use `autocomplete="tel"` for phone identifiers, `one-time-code` for verification codes, `current-password` for login passwords, and `new-password` only for account creation or reset;
- preserve input identity across visual transitions; do not remount or clone fields during animation;
- allow paste into password and one-time-code fields;
- avoid transformations that misplace browser autofill popovers;
- test browser-saved credentials, OS password managers, SMS code suggestions, and manual entry;
- never store phone numbers, passwords, verification codes, tokens, or QR secrets in local storage, editor state, analytics, URLs, or console output.

## 4. Control focus and keyboard behavior

- preserve a logical DOM and tab order independent of the visual grid;
- render a visible focus indicator with sufficient contrast on every interactive element;
- do not auto-focus after initial load when it would summon a mobile keyboard or interrupt assistive technology;
- move focus only after a user action or a clearly announced state transition;
- return focus to the trigger after closing an authentication dialog;
- trap focus only when the task island is a true modal and make Escape close it when dismissal is allowed;
- never use global motion-editor shortcuts that override common browser or assistive shortcuts while a form control is focused;
- pause scroll snapping and wheel interception while focus is inside the task island;
- keep identity tabs, login-method tabs, help, refresh, submit, and legal links operable with keyboard alone;
- preserve focus through pending, error, method switch, breakpoint change, and reduced-motion change.

## 5. Render validation and asynchronous states

For each field and submission state:

- validate at the appropriate moment; avoid announcing errors before the user has interacted;
- associate field errors with `aria-describedby` and set `aria-invalid="true"`;
- summarize submission errors in a focused or announced region when multiple fields fail;
- use text and iconography in addition to color;
- reserve enough error space or animate layout gently without moving the focused control offscreen;
- preserve the user's input after recoverable errors;
- expose pending state without replacing the button's accessible name with meaningless decoration;
- handle timeout, offline, rate limit, expired code, invalid code, wrong password, locked account, and service failure when each state exists or applies; do not add them to the preservation contract merely because they are common;
- prevent a success animation from running before the service confirms success;
- cancel timers, polling, and requests when the method changes or the component unmounts.

Keep error, pending, and success motion short and functional. Do not shake, blur, or move the whole task island.

## 6. Handle QR authentication

- determine whether the QR is real, static demo art, expired, loading, scanned, confirmed, or failed;
- never ship placeholder QR art as a working production credential;
- keep sufficient visual size, quiet zone, contrast, and image sharpness for scanning;
- do not distort, mask, rotate, blur, recolor, crop, or animate the QR image itself;
- show a visible loading state before QR data arrives;
- show expiration time and provide an explicit keyboard-operable refresh action;
- announce scanned, expired, refreshed, confirmed, and failed states without exposing secret data;
- provide plain-language scanning instructions and a non-QR fallback;
- pause replacement while a user is actively confirming on another device unless the authentication protocol requires refresh;
- test real-device scanning at target desktop brightness and responsive sizes.

Keep decorative motion outside the QR quiet zone.

## 7. Preserve consent and legal access

- keep agreement and privacy text readable at the minimum supported viewport and zoom;
- render each policy as a real link with its real destination;
- make consent state explicit when consent is required; do not imply consent through a decorative animation;
- do not preselect optional marketing consent;
- preserve link opening behavior, focus, browser history, and return state;
- distinguish account creation terms from sign-in notices;
- do not rewrite legal meaning for tone, brevity, or visual symmetry without authorized copy;
- keep legal text outside split-text, typewriter, marquee, mask, and scroll-reveal effects.

## 8. Adapt safely to mobile

- place the primary action and required fields above or immediately reachable with the virtual keyboard open;
- use `100dvh` or content-driven sizing rather than relying only on `100vh`;
- respect safe-area insets and browser chrome;
- keep touch targets at least 44 by 44 CSS pixels unless the product standard is stricter;
- prevent horizontal overflow at 320 CSS pixels and with 200% text zoom;
- keep the active input visible when validation, keyboard, or orientation changes layout;
- avoid fixed task-island heights that clip localized copy or errors;
- disable pointer-only and hover-only effects;
- replace long pinned stories with normal flow or a short tap-controlled alternative;
- test portrait, landscape, touch scrolling, back navigation, autofill, QR fallback, and slow network.

## 9. Enforce accessibility and security

- use native buttons, links, inputs, forms, headings, landmarks, and tab semantics before custom roles;
- keep visual order, DOM order, spoken labels, and status announcements consistent;
- ensure decorative canvas, particles, masks, and media are hidden from assistive technology;
- never combine `aria-hidden="true"` on a parent with a required live region or interactive child;
- honor reduced motion in CSS and JavaScript and stop infinite decorative motion;
- maintain readable contrast in default, hover, focus, disabled, error, and autofill states;
- avoid logging credentials, tokens, QR payloads, authentication responses, or personal data;
- preserve CSRF, rate-limit, anti-abuse, captcha, origin, cookie, and redirect safeguards already present;
- do not weaken browser security settings to make a visual prototype work;
- remove mock credentials and debug affordances before production delivery.

## 10. Verify before delivery

Block delivery when any P0 row fails or remains unknown:

| P0 case | Required pass condition |
|---|---|
| First render | all core authentication controls are readable and operable before decorative motion completes |
| Background failure | login remains usable with media, canvas, WebGL, and motion imports blocked |
| Identity and method switches | state, labels, focus, values, and destination remain correct |
| Keyboard and autofill | complete each supported method without a pointer |
| Validation | field and submission errors are visible, announced, recoverable, and input-preserving |
| Pending and repeat submit | one request occurs; state cannot get stuck |
| QR lifecycle | loading, scanning, expiration, refresh, confirmation, failure, and fallback work as applicable |
| Agreements | every required link and consent control works and retains meaning |
| Mobile keyboard | fields, active error, and submit remain reachable |
| Reduced motion | no scroll lock, long entrance, infinite motion, or hidden content remains |
| Security | no secret or personal authentication data leaks to storage, URL, analytics, or logs |
| Real versus demo | every consequential action is accurately labeled and reported |

Record the browser, viewport, input method, network condition, evidence, and unresolved production dependency for every case.
