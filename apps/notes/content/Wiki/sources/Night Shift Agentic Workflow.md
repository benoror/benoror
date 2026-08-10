---
title: "Night Shift Agentic Workflow"
tags: [wiki, sources]
sources: ["[[Night Shift Agentic Workflow]]"]
domains: [agentic, coding]
date: "2026-07-17T06:22:49.512Z"
created: "2026-07-17T06:22:49.512Z"
includeInRss: false
---

# Night Shift Agentic Workflow

## Takeaways

- **Day shift / night shift split:** Human time is for specs, architecture, and thinking; agents run autonomously overnight on completed specs while you sleep.
- **Specs are for you, not the agent:** Detailed `./Specs` docs organize your thinking (edge cases, design); `draft-*` specs are ignored. Small `@AGENTS.md` router points agents to workflow/docs/skills.
- **Night loop is heavily automated:** Prep (clean tree, fix tests) → pick bugs/features → test-first → multi-persona review agents (`REVIEW_PERSONAS.md`) → implement with strict lint/types → full suite → commit with changelog → loop until done.
- **Morning review, not babysitting:** Review stacked commits, fix docs/workflow when agents err (postmortem the *process*, not just the code), manual-test for gaps in understanding.
- **Feedback loop is the product:** Burn tokens on validations and review steps so humans never catch obvious issues; constant doc/workflow improvement amortizes over the project.
- **Results:** ~5× faster, better quality, less context-switching, more fun — agents idle during the day, human idle at night.

## Notes

Jamon Holmgren's answer to agentic burnout: treat human attention as scarce and agent tokens as abundant. Key anti-patterns avoided: reading agent plans, prompt-and-reprompt loops, babysitting idle agents. Uses `@AGENT_LOOP.md` to kick off overnight work with Claude Code, Cursor, or Codex. Companion piece: [The eight best ways I've improved my AI agent's code](https://jamon.dev/8ways).

## Open questions

- How portable is the multi-persona review loop (`REVIEW_PERSONAS.md`) to smaller codebases or solo projects?
- Stacked commits + stacked PRs: best practice for teams vs. solo?
