# Creative Direction for Existing Pages

Use this reference when an existing page needs a stronger idea, emotional arc, editorial layout, and motion system. Treat the current page as source material with real obligations. Redesign how the content is experienced; do not invent a different product.

## Start from the experience problem

Write the design problem in one sentence before proposing a style:

> Help **[audience]** move from **[starting feeling]** to **[desired feeling]** while completing **[primary task]**, using **[existing product truth]** as the narrative anchor.

Name three kinds of constraints separately:

| Constraint | Capture | Example for a login page |
| --- | --- | --- |
| Immutable | Flows, claims, legal copy, required controls | QR/phone login, agreement, help, error states |
| Flexible | Hierarchy, wording, grouping, visual order | Hero framing, section sequence, label placement |
| Exploratory | Mood, typography, spatial composition, motion grammar | Oversized type, pinned story, masked reveals |

Do not use mood words alone as direction. Convert each mood into observable rules for type, space, color, imagery, interaction, and timing.

## Audit the local motion idea library

Inspect the current local reference at `http://localhost:3000/#top` or its source project when available. Record its display patterns as reusable grammar, not as a theme to copy wholesale.

| Local idea | Experience role | Safe adaptation | Avoid |
| --- | --- | --- | --- |
| Staged navigation entrance | Establish hierarchy and arrival | Reveal brand, primary task, then secondary navigation | Holding login controls off-screen until the sequence ends |
| Oversized hero type with scroll scale/translation | Create a memorable opening and spatial handoff | Let one short promise become the visual anchor; reduce it as utility content takes focus | Applying character animation to long paragraphs |
| Split-text manifesto reveal | Turn a statement into a paced thought | Reveal one meaningful phrase or line at a time | Generic stagger with no relationship to syntax |
| Pinned capability list with active-state changes | Explain several benefits without a long static list | Pin the narrative column while the login panel remains usable | Trapping scroll, excessive pin distance, mobile dead space |
| Hover-following detail panel | Reward exploration and connect label to proof | Use for optional creator capabilities or examples below the primary task | Making essential login information hover-only |
| Asymmetric cards with mask/clip reveal | Add editorial rhythm and controlled surprise | Present proof, tools, or creator scenarios with varied scale | Using arbitrary card sizes that imply false priority |
| Opposing horizontal title lines | Create tension, convergence, or chapter transition | Bring two complementary ideas together at a section threshold | Marquee motion without narrative meaning |
| Draggable horizontal rail | Make optional people, works, or examples tactile | Use after the core action, with buttons/keyboard fallback | Replacing readable vertical content on mobile |
| Expanding CTA arcs and contextual cursor | Give a decisive action a tactile payoff | Reserve for one major non-form CTA; keep the native pointer path functional | Custom cursor on touch, form fields, or accessibility-critical controls |
| Sequenced footer/contact reveal | Resolve the story and invite the next action | Close with a concise promise, contact path, and support links | Treating the footer as another full hero |
| Grain, color wash, slow media breathing | Add atmosphere without narrative cost | Keep amplitude subtle and independently switchable | Continuous high-contrast motion behind input fields |

For every borrowed idea, write its **source pattern**, **new content role**, **trigger**, **mobile mode**, **reduced-motion mode**, and **editor parameters**. Reject any pattern that has only a visual description.

## Define the emotional curve

Choose four to six emotional beats. Tie each beat to content evidence and an interaction change.

| Beat | User question | Content job | Visual/motion response |
| --- | --- | --- | --- |
| Recognition | “Is this meant for me?” | Name the user and context clearly | Immediate readable promise; restrained arrival |
| Curiosity | “What becomes possible here?” | Reframe existing benefits as a vivid invitation | One expressive type or spatial transition |
| Orientation | “How does this work?” | Organize capabilities, methods, or next steps | Scroll-linked progression or active-state handoff |
| Confidence | “Can I trust and use it?” | Show verified proof, clear rules, and support | Stable rhythm; less motion; facts stay visible |
| Readiness | “What should I do now?” | Remove hesitation around the primary action | Increase contrast and reduce surrounding activity |
| Completion | “Did it work?” | Confirm progress or explain recovery | Fast, local feedback; never decorative delay |

Keep a login page's functional layer available from the first meaningful paint. Let the narrative layer deepen the invitation around it, not block it.

## Generate distinct directions

Produce two or three directions only when the brief contains a real structural or narrative fork. When the user has already chosen the story and pattern constraints, produce one recommended direction plus a rejected-pattern list. Make alternatives structurally different, not merely different color palettes.

Fill this canvas for each direction:

| Field | Required decision |
| --- | --- |
| Name | Use a memorable working title, not a style label |
| Concept sentence | State the transformation and why it fits the existing content |
| Emotional curve | List the ordered beats and where the primary action becomes dominant |
| Anchor content | Name the existing sentence, fact, or task that drives the concept |
| Editorial grammar | Define grid, scale contrast, whitespace, alignment, repetition, and interruptions |
| Typography | Assign display, narrative, utility, and legal roles |
| Display devices | Choose at most three primary devices: pinning, mask reveal, spatial type, active panel, rail, etc. |
| Motion grammar | Define enter, scroll, hover/focus, feedback, ambient, and exit behavior |
| Functional contract | State what must remain continuously usable |
| Responsive translation | Explain how composition changes below tablet and mobile breakpoints |
| Risks | Name comprehension, performance, accessibility, and implementation risks |
| Editor surface | List the few parameters a user should be able to tune |

Score each direction only when the score is backed by inspected content, product evidence, or research. Otherwise use `high`, `medium`, or `low` with a short rationale. Do not output decimal scores that imply unsupported precision.

When evidence exists, use this 1–5 rubric:

| Criterion | Weight | Reject when |
| --- | ---: | --- |
| Product truth | 25% | The concept depends on an unverified claim |
| Task clarity | 20% | The main action becomes harder to find or use |
| Emotional coherence | 15% | Motion, words, and layout tell different stories |
| Distinctiveness | 15% | It could belong to any brand or product |
| Responsive viability | 10% | Mobile requires deleting the core idea |
| Accessibility | 10% | Meaning depends on motion, hover, or custom cursor |
| Buildability | 5% | The proposed runtime cannot fail open |

Select one direction explicitly. Preserve useful ideas from rejected directions in a parking-lot list; do not silently combine all of them.

## Compose the page as scenes

Map existing content into scenes after choosing a direction:

| Scene | Content role | Desired feeling | Layout device | Motion role | Persistent task |
| --- | --- | --- | --- | --- | --- |
| Arrival | Promise + identity | Recognition | Large type against a quiet field | Orient | Login panel visible or one clear jump to it |
| Invitation | Existing benefit reframed | Curiosity | Editorial offset or controlled overlap | Reveal | Primary action remains reachable |
| Explanation | Capabilities or process | Orientation | Pinned list or progressive chapters | Connect | No scroll trap |
| Proof | Verified examples or rules | Confidence | Stable asymmetric grid | Reveal | Support and legal access remain clear |
| Decision | Login/CTA and reassurance | Readiness | Reduced visual competition | Feedback | Inputs, QR, tabs, and errors work normally |
| Resolution | Support/contact | Completion | Concise closing composition | Reward | Recovery path remains visible |

Allow scenes to be compact. Do not add sections merely to create scroll distance.

## Example: redesign a creator login page

Use only content verified in the existing page. The following is a structural example, not approved product copy.

**Direction: “进入创作状态”**

- Anchor the first screen on the existing login task and the verified product name.
- Frame the surrounding story as a transition from “准备进入” to “开始创作”; treat this as emotional framing, not a product capability claim.
- Keep the QR/phone tabs, agreement, help, errors, and submit behavior intact.
- Borrow the local oversized-type handoff for one short line such as “进入创中”; let it settle as the login panel gains emphasis.
- Adapt the pinned capability pattern only if verified capabilities already exist. Keep the panel fixed or immediately reachable while the story progresses.
- Use the hover-follow panel only for optional capability explanation, and reproduce the same information on focus and tap.
- Reduce ambient media movement when an input is focused. Disable custom cursor treatment over all form controls.
- Collapse the scroll narrative into stacked, fully readable blocks on mobile; do not preserve desktop pin distances mechanically.

Mark “让灵感被看见”, “下一次爆款”, user counts, earning outcomes, speed claims, and platform rankings as unverified unless a source in the repository proves them.

## Parameterize the idea, not every pixel

Expose controls that preserve the direction's integrity:

| Layer | Useful parameters |
| --- | --- |
| Narrative | Scene order, optional scene visibility, anchor copy selection |
| Typography | Display scale, line break strategy, tracking, contrast ratio between roles |
| Scroll | Trigger start/end, scrub strength, pin duration, reverse behavior |
| Reveal | Mask direction, distance, duration, stagger unit, easing |
| Interaction | Hover/focus panel offset, rail drag, CTA response strength |
| Atmosphere | Color wash, grain, breathing amplitude, media opacity |
| Safety | Reduced-motion policy, mobile pin policy, input-focus quiet mode |

Constrain parameter ranges. Let controls tune a coherent system; do not turn the editor into an unbounded animation console.

## Anti-goals

- Do not start with a visual trend and force existing content into it.
- Do not clone the local reference's colors, wording, and section order when only its motion grammar is relevant.
- Do not convert every section into a pinned or scrubbed scene.
- Do not hide meaning behind hover, drag, custom cursor, or a completed animation.
- Do not lengthen the page to make the motion look impressive.
- Do not let a cinematic intro delay login, consent, recovery, or error handling.
- Do not present alternative directions that differ only in palette or image choice.
- Do not merge directions without naming the resulting concept and resolving conflicts.

## Deliverable template

Return the creative decision in this order:

1. State the existing task and immutable contract.
2. List the local/reference ideas inspected and the roles worth reusing.
3. Summarize two or three directions with scores.
4. Name the selected direction and explain the selection.
5. Show the emotional curve and scene map.
6. Map every reused interaction to content, mobile, reduced motion, and editor controls.
7. List rejected ideas and why they were rejected.
8. Identify unknowns that require verification before copy or implementation.

Do not begin production implementation until the selected direction can be explained without referring only to aesthetic adjectives.
