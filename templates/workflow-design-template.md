# Workflow Design: {{Workflow Name}}

> Copy this file into `clients/{{client}}/workflows/` and fill in.

## Goal
What outcome does this workflow drive? Tie to a metric (booked appointments, replies, revenue, etc.).

## Trigger
- **Event:** (e.g. New inbound SMS, Appointment booked, Tag added)
- **Source / integration:**
- **Entry conditions / filters:**

## Inputs
- Contact fields required:
- Custom fields required:
- Tags read:

## Decision logic
Describe the branches in plain English first, then enumerate:

| Branch | Condition | Next step |
|---|---|---|
|  |  |  |

## Actions
Ordered list of steps the workflow performs. For each: action type, payload/copy, timing, recipient.

## Exit conditions
- Successful exit:
- Removal conditions (e.g. unsubscribe, opportunity won, tag added):

## Edge cases
- After-hours / quiet-hour handling:
- Reply during sequence:
- Reschedule / cancellation:
- Duplicate-entry prevention:

## Metrics
- Primary KPI:
- Secondary signals:
- How measured (where in GHL or downstream):

## Notes
Open questions, assumptions, follow-ups.
