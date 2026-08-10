---
title: "AGENTS.md outperforms skills in our agent evals"
tags:
  - wiki
  - sources
sources:
  - "[[AGENTS.md outperforms skills in our agent evals]]"
domains: [agentic, coding]
date: "2026-07-17T06:22:38.011Z"
created: "2026-07-17T06:22:38.011Z"
includeInRss: false
---

# AGENTS.md outperforms skills in our agent evals

## Takeaways
- Vercel evals on Next.js 16 APIs: an ~8KB compressed docs index in `AGENTS.md` hit **100%** pass rate; skills capped at **79%** even with explicit "use the skill" instructions.
- Skills were **not invoked in 56%** of cases—same as no-docs baseline (53%)—agents often ignore available tools.
- Explicit trigger wording in `AGENTS.md` raised skill usage to 95%+ and pass rate to 79%, but phrasing was fragile; small wording changes shifted behavior dramatically.
- Persistent root context (`AGENTS.md` / `CLAUDE.md`) beats on-demand skill loading when framework APIs are stale vs. model training data.
- Version-matched doc indexes solve both "model suggests too-new APIs" and "model falls back to old patterns."

## Notes
Validates this vault's AGENTS.md + rules architecture over stuffing everything into skills—keep durable, always-on context tight and version-aligned.

## Open questions
- What is the right size/compression tradeoff for vault AGENTS.md as skills multiply?
