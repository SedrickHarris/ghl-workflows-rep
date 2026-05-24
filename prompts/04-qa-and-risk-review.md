# 04 — QA & Risk Review

**Inputs:** design (`clients/{{client}}/workflows/{{workflow-slug}}.md`) + implementation plan (`clients/{{client}}/checklists/{{workflow-slug}}.md`).

**Goal:** find what's wrong before it ships.

## Review against the design
- Does every step in the checklist map to a step in the design? (And vice versa — no orphans.)
- Are all branches in the design covered by a test in the checklist?
- Is the backfill decision safe? (Will any existing contact get spammed?)

## Compliance review
- **TCPA / SMS:** opt-in collected? STOP/HELP language present? Quiet hours respected?
- **CAN-SPAM / email:** physical address on emails? One-click unsubscribe?
- **Industry-specific:** HIPAA / financial / legal restrictions if applicable?
- **Platform TOS:** review-request flow doesn't gate or incentivize positive reviews?

## Operational risk
- What happens if the AI step fails or returns garbage? Is there a fallback?
- What happens if an integration (calendar, phone, email) is down?
- Is there a kill-switch (a tag or status that immediately removes contacts)?
- Can the workflow be re-entered safely on repeat triggers, or is there a cooldown?
- Could two workflows fire for the same contact and collide?

## Deliverability
- Is the sending number / domain warmed? Reputation acceptable?
- First-send volume reasonable, or do we need to ramp?

## Output
A short risk list at the bottom of the checklist file:
- **Blockers** (must fix before shipping)
- **Watch-outs** (ship but monitor)
- **Future improvements**
