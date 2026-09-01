# web-skills

个人网站设计与前端实现技能库。

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

## Codex 中调用

将 `skills/recreate-web-motion` 复制到个人技能目录：

```bash
mkdir -p ~/.codex/skills
cp -R skills/recreate-web-motion ~/.codex/skills/recreate-web-motion
```

或者放到目标仓库的 `.agents/skills/recreate-web-motion`。重新打开任务后即可调用：

```text
$recreate-web-motion 帮我逐屏审计这个参考站，并把动态效果做成可编辑的本地版本。
```

技能自带 `motion-spec.json` 模板以及初始化、校验、汇总工具，不依赖项目框架。
