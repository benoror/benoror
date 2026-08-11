---
title: "Introducing Moltworker: a self-hosted personal AI agent, minus the minis"
tags:
  - wiki
  - sources
sources:
  - "[[Introducing Moltworker: a self-hosted personal AI agent, minus the minis]]"
domains: [agentic, open-source]
date: "2026-07-17T06:23:03.178Z"
created: "2026-07-17T06:23:03.178Z"
includeInRss: false
---

# Introducing Moltworker: a self-hosted personal AI agent, minus the minis

## Takeaways

- **Moltworker** (Cloudflare) runs **OpenClaw** (formerly Moltbot/Clawdbot) on Workers + Sandbox SDK — self-hosted personal assistant without dedicated Mac mini hardware.
- OpenClaw is an open-source personal AI agent with chat-app integrations, remote control, and a growing skill/plugin ecosystem.
- Enabled by improving **Node.js compatibility** in Workers (native `node:fs`, etc.) — reduces hacks like memfs for packages such as Playwright.
- Middleware Worker + adapted scripts deploy Moltbot to Cloudflare's developer platform APIs securely online.
- Part of the same wave as local-first personal agents, but **edge-hosted** as an alternative to always-on home hardware.
- Editorial note: Moltbot was renamed OpenClaw as of Jan 2026.

## Notes

Cloudflare's answer to the OpenClaw/Mac mini trend — relevant if Ben wants a hosted personal agent without maintaining home infra; ties to OpenClaw skill ecosystem.

## Open questions

- Could ObsidianOS skills interoperate with OpenClaw/Moltworker, or stay vault-local only?
