# Content Integrity and Emotional Copy

Use this reference to upgrade the expression of existing content without changing its truth. Separate what the product **is**, what the page **must communicate**, and how the user should **feel while acting**.

## Build a content evidence ledger first

Inventory every meaningful string before rewriting. Include headings, labels, placeholders, helper text, tabs, agreements, errors, QR instructions, alt text, and dynamic states.

Use this ledger:

| ID | Current content | Role | Source | Truth status | Required action | Proposed content | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `login-title` | Exact existing text | Promise / task / proof / instruction / legal / feedback | File + selector or product document | `existing`, `verified`, `framing`, `unknown` | `keep`, `rewrite`, `merge`, `move`, `remove` | Draft or `TBD` | Dependency and risk |

Apply truth statuses consistently:

- Mark `existing` when the claim or instruction already appears in the working product. Preserve its meaning; existence alone does not prove that it is current.
- Mark `verified` only when a named repository source, approved document, or user confirmation supports it.
- Mark `framing` for emotional language that makes no measurable claim, such as “进入创作状态”.
- Mark `unknown` when the wording implies a capability, result, number, ranking, audience scale, or policy that has no source.

Do not promote `unknown` content into final copy. Request verification or rewrite it as non-claiming framing.

## Protect the content contract

Treat these as immutable unless the user explicitly authorizes a product change:

- Authentication methods, tab meanings, input requirements, country code behavior, QR instructions, submit behavior, and recovery paths.
- Consent, privacy, terms, age, security, and other legal wording.
- Error meaning, validation timing, disabled states, loading states, and success confirmation.
- Product names, capability boundaries, eligibility, pricing, dates, numbers, and external links.
- Accessibility names and instructions needed to complete the task.

Allow creative transformation in hierarchy, grouping, cadence, line breaks, tone, supporting framing, and the relationship between narrative and utility copy.

Record every removal. State where its meaning moved or why it is no longer needed. Do not silently erase low-emphasis legal or recovery content during visual cleanup.

## Rewrite in two passes

### Pass 1: Preserve semantic payload

Reduce each source string to a plain meaning statement:

> **Who** needs to know **what**, at **which moment**, to make **which decision or action**?

Keep nouns, verbs, conditions, consequences, and required next steps. Remove duplication only after confirming that another visible element carries the same meaning.

### Pass 2: Add emotional framing

Choose one emotional job per string:

| Emotional job | Use when | Writing move |
| --- | --- | --- |
| Invite | The user has not committed | Use a direct, low-pressure verb and a concrete destination |
| Reassure | The user hesitates or sees risk | Explain what happens next or what remains under their control |
| Energize | The user understands the task | Add rhythm, contrast, or a vivid but non-factual image |
| Orient | The path has several modes or steps | Name the current mode, expected input, and next state |
| Recover | Something failed | State what happened, what stayed safe, and the next available action |
| Confirm | An action succeeded | Name the completed action and the new state |

Do not ask one sentence to promise, explain, prove, and instruct at the same time. Split roles across display copy, support copy, and utility copy.

## Use a Chinese copy hierarchy

Assign each layer a distinct job:

| Layer | Target | Guidance |
| --- | --- | --- |
| Display line | 4–12 Chinese characters when possible | Express one memorable idea; avoid commas that create four equal clauses |
| Supporting sentence | 16–40 characters | Connect the idea to an existing product truth or task |
| CTA | 2–8 characters | Use an action users can predict: “登录”, “获取验证码”, “扫码登录” |
| Helper text | One action per sentence | State format, timing, fallback, or consequence plainly |
| Legal/consent | Preserve approved meaning | Improve layout before rewriting substance |
| Error | Problem + recovery | Avoid blame, jokes, and vague “出错了” messages |

Prefer concrete verbs and user-visible outcomes. Use rhythm through short/long sentence contrast, repeated syntax, deliberate pauses, and meaningful line breaks. Keep metaphor in the narrative layer; keep controls literal.

Avoid empty elevation words such as “赋能”, “生态”, “无限可能”, “颠覆”, and “重塑” unless the surrounding sentence names a concrete mechanism or verified outcome.

## Apply the transformation ladder

Stop at the lowest level that solves the problem:

1. **Clarify** — shorten syntax and make the next action explicit.
2. **Reframe** — change the point of view while preserving the fact.
3. **Sequence** — distribute content across an emotional arc or interaction.
4. **Dramatize** — use typography, reveal, or spatial contrast to emphasize a verified idea.
5. **Add** — introduce new content only when its factual basis is documented or it is clearly non-claiming framing.

Do not use “dramatize” to compensate for weak or unknown content.

## Example: creator login page

Treat this as a method example. Verify the actual source strings before using any draft.

| Source role | Safe transformation | Why it remains truthful |
| --- | --- | --- |
| Existing product name + login title | Display: “进入创中” / Utility heading: “登录创中” | Changes emotional framing while preserving the literal task nearby |
| Existing QR mode | Tab: “扫码登录” / Helper: “打开对应 App 扫码” only if the source names that app | Keeps the action concrete; app identity still requires verification |
| Existing phone mode | Tab: “手机号登录” / CTA: “获取验证码” | Preserves mode and predictable action |
| Existing agreement | Keep approved legal wording; increase spacing and link clarity | Improves presentation, not legal meaning |
| Generic failure | “暂时无法登录，请稍后重试” only if retry is valid; otherwise name the supported recovery path | Couples failure with a real next step |
| Narrative framing | “先登录，再把想法带进来” | Expresses a moment and action without claiming a product result |

Keep “登录创中” as accessible or utility text even when an expressive display line leads the scene. Do not force users to infer that the page is a login experience from metaphor alone.

Mark these as `unknown` until verified:

- “千万创作者都在这里” or any user count.
- “一键生成”, “立刻变现”, “让每条内容都爆” or guaranteed outcomes.
- “行业第一”, “最懂创作者”, “全网最快” or comparative rankings.
- Named capabilities absent from the current product or repository.
- Security, privacy, data retention, or eligibility promises not present in approved policy.

## Couple copy to layout and motion

Design the sentence and its behavior together:

- Preserve a complete semantic string in the DOM or an accessible equivalent when visually splitting characters or lines.
- Choose line breaks by meaning. Do not split a verb from its object or a condition from its consequence merely to balance a composition.
- Use character-level motion for short display text only. Use word-, phrase-, or line-level reveals for explanatory Chinese copy.
- Let punctuation influence timing: pause after a full clause, not after every character equally.
- Keep form labels, placeholders, legal text, errors, and recovery messages immediately readable. Do not animate them through a long reveal.
- Change copy on interaction only when the state truly changes. Do not rotate different promises merely to create movement.
- Reserve scroll-linked copy replacement for optional narrative content. Keep instructions stable while the user is acting.
- Ensure reduced motion reveals the final copy without delay and without changing reading order.

Use this motion-copy mapping:

| Copy role | Recommended behavior | Avoid |
| --- | --- | --- |
| Hero display | Masked line reveal, short character rise, or scroll scale handoff | Typewriter on long Chinese text |
| Narrative statement | Phrase/line reveal tied to syntax | Uniform per-character wave across a paragraph |
| Capability label | Active-state change with adjacent persistent explanation | Hover-only definition |
| Proof/fact | Stable entrance and long dwell | Counting animation that changes or obscures the value |
| CTA | Immediate hover/focus feedback | Moving target, delayed label, playful ambiguity |
| Error/helper/legal | No entrance dependency | Scrub, marquee, blur, or disappearing copy |

## Resolve copy conflicts explicitly

When a creative idea conflicts with product clarity, choose in this order:

1. Preserve legal and safety meaning.
2. Preserve task completion and recovery.
3. Preserve verified product truth.
4. Preserve content hierarchy.
5. Preserve emotional tone.
6. Preserve visual or motion novelty.

Document the losing idea and the reason. Do not quietly weaken the first three layers.

## Anti-goals

- Do not write a new brand story before inventorying the current one.
- Do not turn emotional tone into unsupported success, scale, speed, income, or exclusivity claims.
- Do not replace literal login instructions with poetry.
- Do not “simplify” by deleting consent, error, help, or recovery information.
- Do not use one slogan as a substitute for proof.
- Do not copy the wording of a reference website just because its layout or motion is useful.
- Do not hide uncertainty. Mark it `unknown` and keep it out of production copy.
- Do not animate text in a way that changes its semantic order or delays task completion.
- Do not preserve awkward source copy verbatim when its meaning can be expressed more clearly and safely.

## Review checklist

Before implementation, confirm:

- Every current string has a ledger entry or an explicit exclusion reason.
- Every factual addition names its evidence source.
- Every rewrite preserves actors, conditions, consequences, and next actions.
- Every deleted item has a meaning destination or approved deletion reason.
- The display line, utility heading, CTA, helper text, and legal copy have distinct jobs.
- The user can identify the page and complete login without waiting for animation.
- Errors explain a real recovery path.
- Chinese line breaks follow meaning and remain stable at target widths.
- Motion and reduced-motion modes expose the same final content.
- No claim depends on a reference site's copy or on an unverified assumption.

Return unresolved claims as a short verification queue with the proposed owner/source. Do not fill gaps with plausible-sounding copy.
