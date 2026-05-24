# ghl-workflows

HighLevel (GHL) workflow architecture and implementation repo.

This is where workflows are **designed, documented, and tracked** for delivery in HighLevel. It consumes upstream HighLevel platform documentation that lives in a separate `ghl-docs-watcher-repo` and mirrors it locally into `ghl-docs/`.

## Layout

| Folder | Purpose |
|---|---|
| `ghl-docs/` | Local mirror of `ghl-docs-watcher-repo/docs/`. Read-only; populated by `scripts/sync-ghl-docs.*`. Do not hand-edit. |
| `templates/` | Reusable skeletons for workflow design, AI-agent design, and implementation checklists. |
| `patterns/` | Canonical, reusable workflow patterns (missed-call text-back, appointment reminders, review requests, lead nurture). |
| `clients/` | One subfolder per client. Their discovery notes, designed workflows, and implementation tracking go here. |
| `prompts/` | Prompt library used to drive Claude through discovery → architecture → implementation → QA. |
| `scripts/` | Local utility scripts. Currently: docs-mirror sync (PowerShell + Bash). |

## Syncing GHL docs

Docs are sourced from a sibling repo, `ghl-docs-watcher-repo`. From this repo:

```powershell
# Windows
.\scripts\sync-ghl-docs.ps1
```

```bash
# macOS / Linux
./scripts/sync-ghl-docs.sh
```

Both scripts mirror `..\ghl-docs-watcher-repo\docs\` into `.\ghl-docs\`. Pass a different source path as the first argument if your layout differs.

## Workflow lifecycle

1. **Discovery** — `prompts/01-workflow-discovery.md`
2. **Architecture** — `prompts/02-workflow-architecture.md` + `templates/workflow-design-template.md`
3. **Implementation plan** — `prompts/03-implementation-plan.md` + `templates/implementation-checklist-template.md`
4. **QA & risk review** — `prompts/04-qa-and-risk-review.md`

Top-level Claude project instructions live in `prompts/claude-project-instructions.md`.
