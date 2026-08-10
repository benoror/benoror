---
title: "Beyond the Prompt: Claude Code"
tags:
  - wiki
  - sources
sources:
  - "[[Beyond the Prompt: Claude Code]]"
domains: [agentic, skills]
date: "2026-07-17T06:22:44.207Z"
created: "2026-07-17T06:22:44.207Z"
---

# Beyond the Prompt: Claude Code

## Takeaways
- Core Boris principle: **give Claude a verification loop** (tests, linters, runnable checks)—claimed 2–3× quality vs. human-only feedback.
- Workflow: explore → plan (Plan mode) → code; use a second session to review plans as staff engineer without implementation bias.
- Reference with `@files` and pipe logs—exact context beats vague descriptions; delegate like an engineer, not pair-program line by line.
- On mistakes: "Update CLAUDE.md so you don't repeat this"—Claude is strong at self-authored rules that compound over time.
- `.claude/` holds skills, subagents, plugins; underused commands (`/goal`, `/insights`) and MCP wiring separate casual from power users.

## Notes
High-signal playbook for tuning this vault's Claude Code + skills setup—especially verification hooks and CLAUDE.md feedback loops.

## Open questions
- Which verification patterns (tests vs. skill dry-runs) fit markdown vault changes best?
