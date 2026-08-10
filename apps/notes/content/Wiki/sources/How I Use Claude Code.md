---
title: "How I Use Claude Code"
tags:
  - wiki
  - sources
sources:
  - "[[How I Use Claude Code]]"
domains: [agentic, coding]
date: "2026-07-17T06:22:51.495Z"
created: "2026-07-17T06:22:51.495Z"
---

# How I Use Claude Code

## Takeaways

- Core rule: **never let Claude write code until a written plan is reviewed and approved** — separates architecture judgment from execution and cuts wasted tokens.
- Workflow: **Research → Plan → Annotate (1–6×) → Todo list → Implement → Feedback**; research and plans persist as markdown artifacts, not chat-only summaries.
- Use emphatic language ("deeply," "intricacies") so the agent skims less; `research.md` is the review surface for catching wrong mental models before planning.
- The **annotation cycle** treats `plan.md` as shared mutable state — inline notes in your editor beat steering through chat; always guard with "don't implement yet."
- Prefer custom `.md` plan files over built-in plan mode; paste reference implementations from open source when designing contained features.
- Biggest failure mode is code that works in isolation but breaks surrounding systems — deep research prevents ignoring caches, ORM conventions, and existing logic.

## Notes

Boris Tane's research-plan-implement discipline is the strongest non-trivial AI coding workflow in the batch — maps cleanly onto ObsidianOS project work and multi-file vault changes.

## Open questions

- Should ObsidianOS adopt a standard `research.md` / `plan.md` pattern for Projects/ changes?
