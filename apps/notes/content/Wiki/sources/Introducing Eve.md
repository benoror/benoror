---
title: "Introducing Eve"
tags:
  - wiki
  - sources
sources:
  - "[[Introducing Eve]]"
domains: [agentic, coding]
date: "2026-07-17T06:23:00.315Z"
created: "2026-07-17T06:23:00.315Z"
---

# Introducing Eve

## Takeaways

- **Eve** (Vercel, open source) is an agent framework with production primitives built in: durable execution, sandboxed compute, HITL approvals, subagents, evals, tracing, channels, schedules.
- Design thesis: an agent is a **readable directory** — `agent.ts`, `instructions.md`, `tools/`, `skills/`, `subagents/`, `channels/`, `schedules/` each describe one concern.
- Positions itself as **Next.js for agents** — stop hand-rolling the same plumbing per agent; provider fallbacks via AI Gateway.
- `defineAgent({ model })` + markdown instructions = minimal bootstrap; tools are TypeScript files; skills are knowledge markdown separate from tools.
- Supports Slack channels, cron schedules, and delegation to subagents — aimed at data/analyst and ops agents running in production.
- Vercel dogfoods Eve for internal agents — framework + hosting story similar to their web stack.

## Notes

Production-grade agent framework alternative to ad-hoc Claude Code / MCP setups — relevant when ObsidianOS skills need durable cloud execution beyond local vault agents.

## Open questions

- Does Eve's directory-as-agent model map to ObsidianOS skill folders, or is local markdown + MCP sufficient for Ben's use case?
