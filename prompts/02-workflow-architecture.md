# 02 — Workflow Architecture

**Inputs:** `clients/{{client}}/discovery.md`, relevant `patterns/*`, `ghl-docs/`.

**Goal:** produce a complete design for one workflow using `templates/workflow-design-template.md`.

## Process
1. Pick the workflow to design (from the discovery's top-3 list).
2. Check `patterns/` — is there a canonical pattern that fits? If yes, start from it and note divergences. If no, design from scratch.
3. Copy `templates/workflow-design-template.md` to `clients/{{client}}/workflows/{{workflow-slug}}.md`.
4. Fill every section. Leave no `{{placeholder}}` behind.
5. For any AI-agent steps, also create a file in `clients/{{client}}/agents/` from `templates/ai-agent-design-template.md`.
6. Verify each step is something GHL can actually do — cross-check `ghl-docs/`. If a step needs an integration GHL doesn't natively support, call it out.

## Quality bar before moving to step 03
- Triggers and entry conditions are unambiguous.
- Every branch has a defined exit.
- Quiet-hours / compliance considerations addressed.
- Re-entry behavior defined.
- Metrics named with concrete measurement source.
