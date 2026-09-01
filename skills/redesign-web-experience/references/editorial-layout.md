# Editorial Layout

Use this reference when reorganizing existing content into an editorial website system. Preserve the product task, then redesign how the story is paced, contrasted, and revealed.

## Contents

- [Start from content roles](#start-from-content-roles)
- [Build the hierarchy before motion](#build-the-hierarchy-before-motion)
- [Use the editorial layout grammar](#use-the-editorial-layout-grammar)
- [Protect the login task island](#protect-the-login-task-island)
- [Recompose patterns instead of copying sections](#recompose-patterns-instead-of-copying-sections)
- [Verify the editorial system](#verify-the-editorial-system)

## Start from content roles

Assign one primary role to every section before choosing a layout. Split sections that try to perform several roles at once.

| Content role | Required user outcome | Prefer | Avoid |
| --- | --- | --- | --- |
| Promise | Make the audience feel recognized | One emotional headline, one supporting sentence, one visual thesis | Feature lists and legal details in the hero |
| Orient | Explain where the user is and what the product does | Eyebrow, short description, stable navigation | Abstract copy without a product name |
| Explore | Invite comparison among capabilities | Repeated rows, active states, preview media | Equal visual emphasis on every detail |
| Explain | Show how a capability works | Sticky visual plus progressive copy, or a clear two-column scene | Multiple unrelated animations in one viewport |
| Prove | Build trust with evidence | Product UI, verified numbers, recognizable outcomes | Invented metrics or decorative pseudo-data |
| Convert | Give one clear next action | Stable task island, strong CTA, friction-reducing microcopy | Moving form controls or competing CTAs |
| Comply | Communicate legal, privacy, and safety information | Plain hierarchy, readable contrast, persistent access | Emotional rewriting, masking, or timed disappearance |

For the Creator Center login experience, map the existing content as follows:

| Existing content | Role | Emotional job | Recommended layout |
| --- | --- | --- | --- |
| “让热爱被看见 / 让创作更有价值” | Promise | Recognition and possibility | Giant two-line headline beside or over controlled media |
| Login card | Convert | Safety and certainty | Stable foreground island with no scroll-dependent geometry |
| AI 工坊、AI 分身、随变、世界书 | Explore + Explain | Curiosity and agency | Dual-state capability list plus one changing preview |
| 发布管理、数据分析、商单变现 | Explain + Prove | Control and confidence | Sticky product frame with progressive outcome copy |
| 机构服务权益 | Explore + Prove | Trust and scale | Calm grid or accordion; reveal detail on explicit intent |
| Footer agreements and records | Comply | Closure and legitimacy | Plain legal footer after any expressive sequence |

## Build the hierarchy before motion

1. Write the section's promise in one sentence.
2. Reduce the visible hierarchy to headline, mechanism, evidence, and action.
3. Lock intentional Chinese line breaks before measuring type or motion.
4. Give the headline the largest scale only when it carries the section's emotional thesis.
5. Keep mechanism copy narrower and calmer than the headline.
6. Place evidence close to the claim it supports.
7. Keep the login card, QR code, input fields, errors, agreements, and primary submit action inside a stable task island.
8. Verify the static page with all animation disabled before adding motion.

Do not make every heading giant. Alternate high-density and low-density screens so scale remains meaningful.

## Use the editorial layout grammar

### Giant type plus media

Use giant type to declare a belief, not to label a utility. Let media supply atmosphere or consequence while copy supplies meaning. Keep one clear focal relationship:

| Composition | Use when | Creator Center example | Guardrail |
| --- | --- | --- | --- |
| Type over full media | The promise must feel immersive | Hero promise over creator-world imagery | Protect contrast with a controlled wash |
| Type beside media | Login must remain immediately usable | Promise on the left, stable login island on the right | Never let media movement shift the form |
| Type crossing a split | Two ideas must converge | “创作” and “被看见” meeting at a chapter transition | Use once or twice, not in every chapter |
| Cropped type behind media | The brand needs editorial tension | Supporting campaign word behind a capability image | Keep essential copy in the foreground |

### Asymmetric editorial grid

Use a four-column or twelve-column base, then create contrast through span, alignment, and whitespace. Keep metadata compact and body copy narrow. Align repeated modules to shared columns even when their visual sizes differ.

Expose these layout values in an editor:

| Parameter | Suggested control | Required variants |
| --- | --- | --- |
| Grid columns and gutter | Preset plus numeric gutter | Desktop, tablet, mobile |
| Section height | `auto`, viewport multiple, or minimum height | Never force mobile to inherit desktop height |
| Content span | Start column and column span | Clamp to readable width |
| Media ratio | Aspect-ratio preset | Provide natural-ratio fallback |
| Media focal point | X/Y percentage | Preserve faces, QR codes, and UI labels |
| Headline width | Character or pixel max | Recheck after Chinese copy edits |
| Headline line breaks | Locked lines or automatic wrap | Store explicit mobile line breaks |
| Alignment | Start, center, end, split | Mirror deliberately, not automatically |
| Sticky range | Start, end, and release spacing | Disable or shorten on touch devices |
| Layer order | Semantic layer names | Keep task and compliance layers above decoration |

### Split-screen chapter

Use a split screen when two simultaneous ideas must remain legible: emotion and mechanism, story and product UI, or promise and action. Assign each side a fixed job. Do not use a split merely because the viewport is wide.

For the login hero, keep the login island independent from the media wrapper. Animate media, masks, and headline wrappers; do not animate the form's containing block after it settles.

### Sticky visual with progressive copy

Use a sticky visual when several pieces of copy explain one system. Keep the visual stable and change only the active state. Give each state enough dwell time to read. Let navigation controls move the scroll position or select the same state directly.

On mobile, replace long sticky chapters with one of these modes:

- stack cards in normal flow;
- use a short snap carousel with visible position;
- keep the visual above the active copy without pinning;
- let users tap tabs without forcing scroll travel.

## Protect the login task island

Mark the login panel and its descendants as a motion-safe zone. Apply these rules:

- Preserve the approved component geometry, field order, QR size, identity switch, and agreement copy.
- Animate only the panel entrance, identity-state background, submit feedback, and explicit tab transitions.
- Keep input labels, caret position, validation messages, QR pixels, and legal links free of blur, parallax, clipping, or continuous motion.
- Keep the panel usable on the first meaningful paint. Do not wait for a loader or scroll checkpoint.
- Keep the primary login CTA visually stable. Reserve expressive orbit, distortion, or cursor effects for secondary exploratory actions.
- Preserve focus order and visible focus independently of the visual composition.

## Recompose patterns instead of copying sections

Treat `http://localhost:3000/#top` as a verified internal pattern library. Read [current-pattern-library.md](current-pattern-library.md) before selecting its patterns. Transfer the behavioral idea and parameter contract; rewrite the content, geometry, and sequencing for the Creator Center.

If a desired behavior comes from an external reference site, invoke sibling `$recreate-web-motion` first. Import its `observed` or tested `fitted` behavior into this redesign; do not convert an `unknown` reference value into a design fact.

If a layout requires named text motion, invoke sibling `$animate-text`. Preserve its `whole`, `per-character`, `per-word`, or `per-line` target and use the exact JSON contract when exact behavior matters. Keep typography and page layout owned by this redesign skill.

## Verify the editorial system

- Read every section without animation and confirm the narrative still works.
- View the page at one desktop, one narrow desktop, one tablet, and one mobile width.
- Check deliberate line breaks after every copy change.
- Confirm that sticky, absolute, and clipped elements use the intended containing block.
- Confirm that no section height exists only to compensate for broken positioning.
- Confirm that visual rhythm alternates density, scale, and whitespace.
- Confirm that the login task remains reachable, stable, and dominant.
- Confirm that compliance content remains plain, readable, and complete.
