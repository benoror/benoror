---
title: AGENTS.md vs skills
tags:
  - wiki
  - concepts
sources:
  - "[[AGENTS.md outperforms skills in our agent evals]]"
  - "[[My AGENTS.md file for building plans you actually read]]"
  - "[[This is a sample AGENTS.md file from my classes]]"
  - "[[assignment1-basics CLAUDE.md at main]]"
  - "[[Beyond the Prompt Claude Code]]"
date: "2026-07-17T06:24:05.136Z"
created: "2026-07-17T06:24:05.136Z"
includeInRss: false
---

# AGENTS.md vs skills

**Always-on context** (`AGENTS.md` / `CLAUDE.md`) vs **on-demand playbooks** (skills).

## Takeaways

- Persistent agent files beat piles of skills when the eval is “does the agent follow house rules.”
- Skills shine for multi-step workflows with tools and confirmation gates (`/clip`, `/ingest`, `/kb-triage`).
- Readable plans > opaque tool dumps — AGENTS.md should stay skim-friendly.
- Academic/guardrail AGENTS.md patterns: agent as TA, not silent homework solver.

## Vault stance

This vault uses both: root `AGENTS.md` for layout/conventions; `.agents/skills/*` for operations. Prefer skills for sequenced work; keep AGENTS short.
