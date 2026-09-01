# web-skills

个人网站设计、动态研究与前端落地技能库。

## Skills

### `recreate-web-motion`

逐屏审计、复刻并参数化参考网站的动态体验，覆盖：

- Loader、Hero 与文字动画
- Scroll scrub / play、pin / sticky 与方向裁切
- Hover、Focus、光标跟随与近场响应
- Drag、惯性、边界阻尼与弹层/页面转场
- 响应式、触摸端与 reduced-motion
- 可编辑参数模型、JSON 导入导出和完整验收矩阵
- `observed / fitted / unknown` 证据分级，禁止静默编造参考站参数

技能入口：[skills/recreate-web-motion/SKILL.md](skills/recreate-web-motion/SKILL.md)

### `redesign-web-experience`

基于已有页面做创意重构，而不是从零空想或照着参考站复刻，覆盖：

- 冻结产品事实、登录流程、路由、埋点、法务和交互契约
- 把现有内容重组为完整的用户旅程与情绪曲线
- 情感化中文文案升级，同时保留原文映射和事实证据
- 编辑式网格、字体层级、留白、密度与响应式重排
- 把动效绑定到内容意义、用户感受和场景职责
- 复用当前 Hobro / North/Form 实验中的成熟展示与动态原语
- 将 `$recreate-web-motion` 的审计结果转译成原创品牌体验
- 代码落地、登录安全区、移动端、无障碍、性能与完整验收
- `experience-blueprint.json` 初始化、校验、追踪和汇总工具

技能入口：[skills/redesign-web-experience/SKILL.md](skills/redesign-web-experience/SKILL.md)

两者的分工：

- 以自己的现有原型或当前网站为母版，保留并重建已有内容，同时重写、扩展和整体升级文案、排版、动效、滚动与实现时，使用 `redesign-web-experience`；即使口头上说“复刻这个原型”，也仍属于它。
- 只有当验收标准是对另一个外部参考站逐屏 1:1 还原、恢复其原始行为或匹配参数时，才使用 `recreate-web-motion`。
- 同时需要时，先用 `recreate-web-motion` 产出外部参考的动效证据，再用 `redesign-web-experience` 完成语义重映射和产品落地。

## 一键安装

安装到当前项目：

```bash
npx skills add l527497426-cyber/web-skills --skill recreate-web-motion -a codex -y
```

全局安装，在所有 Codex 项目中使用：

```bash
npx skills add l527497426-cyber/web-skills --skill recreate-web-motion -a codex -g -y
```

安装“已有页面创意重构”Skill 到当前项目：

```bash
npx skills add l527497426-cyber/web-skills --skill redesign-web-experience -a codex -y
```

全局安装“已有页面创意重构”Skill：

```bash
npx skills add l527497426-cyber/web-skills --skill redesign-web-experience -a codex -g -y
```

一次安装两套 Skill：

```bash
npx skills add l527497426-cyber/web-skills --skill recreate-web-motion --skill redesign-web-experience -a codex -g -y
```

先查看仓库内可安装的技能：

```bash
npx skills add l527497426-cyber/web-skills --list
```

无需安装、只生成一次使用提示：

```bash
npx skills use l527497426-cyber/web-skills --skill recreate-web-motion
```

也可以生成创意重构 Skill 的一次性使用提示：

```bash
npx skills use l527497426-cyber/web-skills --skill redesign-web-experience
```

请使用空格形式 `--skill <skill-name>`，不要写成 `--skill=<skill-name>`。

## 手动安装

将需要的 Skill 复制到个人技能目录：

```bash
mkdir -p ~/.codex/skills
cp -R skills/recreate-web-motion ~/.codex/skills/recreate-web-motion
cp -R skills/redesign-web-experience ~/.codex/skills/redesign-web-experience
```

或者放到目标仓库的 `.agents/skills/<skill-name>`。

## Codex 中调用

安装后重新打开任务，即可调用：

```text
$recreate-web-motion 帮我逐屏审计这个参考站，并把动态效果做成可编辑的本地版本。
```

```text
$redesign-web-experience 保留这个登录页的业务事实和登录流程，结合现有优秀动效，把文案、排版、视觉层级和动态叙事整体升级并落地到代码。
```

两套技能分别自带 `motion-spec.json` 与 `experience-blueprint.json` 模板及配套工具，不依赖项目框架。
