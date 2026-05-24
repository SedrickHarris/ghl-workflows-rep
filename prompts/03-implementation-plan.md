# 03 — Implementation Plan

**Inputs:** completed workflow design in `clients/{{client}}/workflows/{{workflow-slug}}.md`.

**Goal:** produce a buildable checklist using `templates/implementation-checklist-template.md`.

## Process
1. Copy `templates/implementation-checklist-template.md` to `clients/{{client}}/checklists/{{workflow-slug}}.md`.
2. Fill **Pre-build** by walking the design doc and listing every custom field, tag, integration, and number/domain it depends on. For each, note whether it exists today or needs to be created.
3. Fill **Build** with concrete steps in the order they'll be executed in the GHL UI.
4. Fill **Test** with explicit test contacts/scenarios that exercise each branch and edge case from the design.
5. Fill **Go-live** with the backfill decision (do existing matching contacts get pulled in, or are they excluded?).
6. Fill **Post-launch** with the monitoring window and KPI source.

## Quality bar before moving to step 04
- Every dependency has a concrete "exists / create" status.
- Test plan covers every branch in the design.
- Backfill decision is recorded with reasoning.
