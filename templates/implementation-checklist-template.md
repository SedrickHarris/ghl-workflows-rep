# Implementation Checklist: {{Workflow Name}}

## Pre-build
- [ ] Custom fields exist (list them):
- [ ] Tags created (list them):
- [ ] Required integrations connected (calendars, payment, phone numbers, email domains):
- [ ] Sending numbers / domains warmed and verified:
- [ ] Opt-in / consent language reviewed:

## Build
- [ ] Workflow created in GHL with correct trigger
- [ ] Entry conditions / filters configured
- [ ] Each step matches design doc (copy, timing, branches)
- [ ] Wait steps respect quiet hours / business hours
- [ ] Exit conditions configured (removal triggers, goal events)
- [ ] AI agent step(s) configured per `ai-agent-design-template.md`

## Test
- [ ] Walk a test contact through the happy path
- [ ] Test each branch / edge case from design doc
- [ ] Verify field/tag updates fire as expected
- [ ] Verify reply handling and stop-words
- [ ] Verify no double-entry on rapid re-trigger

## Go-live
- [ ] Workflow published
- [ ] Existing matching contacts handled (backfilled or excluded — decision recorded)
- [ ] Owner notified
- [ ] Monitoring window agreed (first 24h / first 100 entries)

## Post-launch
- [ ] First-24h spot-check completed
- [ ] KPI dashboard / report wired up
- [ ] Issues log opened in `clients/{{client}}/issues.md`
