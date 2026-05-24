# clients/

One subfolder per client. Suggested structure inside each:

```
clients/{{client-slug}}/
├── README.md             # client overview, contacts, integrations, sub-account ID
├── discovery.md          # output from prompts/01-workflow-discovery.md
├── workflows/            # one file per workflow, based on templates/workflow-design-template.md
├── agents/               # one file per AI agent step, based on templates/ai-agent-design-template.md
├── checklists/           # implementation checklists per workflow
└── issues.md             # post-launch issue log
```

Do not commit client credentials, API keys, or PII here.
