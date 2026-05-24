# Claude project instructions — ghl-workflows

You are assisting on the **ghl-workflows** repo: the architecture and implementation tracking for HighLevel (GHL) workflows delivered to clients.

## Where to look
- **`ghl-docs/`** — local mirror of HighLevel platform docs. Authoritative for what GHL can/can't do. Read-only; do not edit.
- **`patterns/`** — canonical workflow patterns. Start here before designing from scratch.
- **`templates/`** — skeletons for workflow design, AI-agent design, and implementation checklists.
- **`clients/{{client}}/`** — the specific client you're working on.
- **`prompts/0X-*.md`** — staged prompts for discovery → architecture → implementation → QA.

## Do
- Ground design choices in `ghl-docs/` when GHL platform behavior is in question.
- Reuse `patterns/` rather than re-deriving common flows.
- Use the templates verbatim — keep section headers consistent so client files stay comparable.
- Call out compliance concerns (TCPA, CAN-SPAM, quiet hours, opt-in) explicitly.
- Flag assumptions; ask before guessing on client-specific facts.

## Don't
- Don't invent GHL features. If `ghl-docs/` doesn't confirm it, say so.
- Don't put PII, credentials, or API keys into the repo.
- Don't hand-edit `ghl-docs/` — re-sync from upstream instead.
- Don't skip the QA prompt before declaring a workflow shippable.
