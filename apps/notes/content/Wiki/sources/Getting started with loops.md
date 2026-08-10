---
title: "Getting started with loops"
tags:
  - wiki
  - sources
sources:
  - "[[Getting started with loops]]"
domains: [agentic, skills]
date: "2026-07-17T06:22:47.480Z"
created: "2026-07-17T06:22:47.480Z"
includeInRss: false
---

# Getting started with loops

## Takeaways

- Claude Code defines **loops** as agents repeating work cycles until a stop condition is met — not every task needs a complex loop; start simple.
- **Turn-based loops** (each user prompt) are the default agentic loop; encode manual verification steps in `SKILL.md` so the agent can self-check end-to-end.
- **Goal-based loops** (`/goal`) extend iteration with explicit, ideally deterministic success criteria and turn caps — e.g. Lighthouse score thresholds or tests passing.
- **Time-based loops** (`/loop`, `/schedule`) suit recurring or externally-triggered work like PR monitoring, Slack summaries, or CI fixes.
- **Proactive loops** compose schedule + goal + skills + auto mode for long-running streams (bug triage, dependency upgrades) without a human in real time.
- Manage token cost by matching loop type to task, capping turns, and routing judgment calls to capable models while using smaller models for routine steps.

## Notes

Canonical taxonomy from the Claude Code team for designing agent loops — directly relevant to ObsidianOS skills and vault agent workflows that need verification and recurring automation.

## Open questions

- Which vault skills (e.g. `/vault-health`, `/kb-triage`) benefit from `/goal` vs turn-based loops with encoded verification?
