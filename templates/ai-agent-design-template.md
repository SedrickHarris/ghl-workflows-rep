# AI Agent Step: {{Agent Name}}

> For an AI step inside a workflow (e.g. conversational SMS reply, intent classifier, summarizer).

## Intent
One sentence: what is this agent responsible for?

## Inputs
- Contact fields:
- Conversation history (how much, source):
- Custom variables:

## System prompt
```
{{System prompt goes here}}
```

## User prompt template
```
{{User prompt template with {{variables}} marked}}
```

## Output
- **Format:** (plain text reply, JSON, tool call, structured field)
- **Schema (if structured):**
- **Where the output goes:** (sent as SMS, written to custom field, branches workflow, etc.)

## Guardrails
- Topics out of scope:
- Compliance constraints (TCPA, CAN-SPAM, HIPAA if applicable):
- Max length / tone:
- PII handling:

## Escalation / fallback
- When does this hand off to a human?
- What does the fallback message say if the model fails or output is invalid?

## Evaluation
- How will we know this agent is working? (Sample conversations to review, success rate metric, etc.)
