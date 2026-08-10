---
title: "Cursor agent best practices"
tags:
  - wiki
  - sources
sources:
  - "[[Cursor agent best practices]]"
domains: [agentic, coding]
date: "2026-07-17T06:23:04.962Z"
created: "2026-07-17T06:23:04.962Z"
---

# Cursor agent best practices

## Takeaways
- Agent harness = **instructions** (rules/prompts) + **tools** (edit, search, terminal) + **model**; Cursor tunes per-model behavior from evals.
- **Plan before code**—UChicago study: experienced devs plan more; Plan Mode researches, clarifies, drafts reviewable markdown plans.
- Save plans to `.cursor/plans/` for team docs and resumable work; edit plans directly before execution.
- Context management matters: long threads degrade; start fresh sessions for new tasks; use `@` references over pasted blobs.
- Review agent output like a PR—rules, hooks, and linters extend the verification loop beyond the model.

## Notes
Cursor-side counterpart to Claude Code + AGENTS.md guidance in this vault—Plan Mode and rules align with commit/skill conventions already in use.

## Open questions
- How should vault `.cursor/rules` split always-on vs. path-scoped rules as the wiki grows?
