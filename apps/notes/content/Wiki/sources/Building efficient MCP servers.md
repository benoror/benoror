---
title: "Building efficient MCP servers"
tags:
  - wiki
  - sources
sources:
  - "[[Building efficient MCP servers]]"
domains: [agentic, coding]
date: "2026-07-17T06:23:01.815Z"
created: "2026-07-17T06:23:01.815Z"
includeInRss: false
---

# Building efficient MCP servers

## Takeaways
- MCP standardizes AI model integrations; Vercel's open-source MCP adapter targets Next.js/Nuxt/SvelteKit deploys (Zapier, Composio, Solana examples).
- Original spec: stdio (local) + SSE (remote); SSE keeps persistent idle connections—poor fit at scale even with fluid compute.
- March 2025 spec adds **Streamable HTTP** as recommended transport, replacing SSE for efficiency; adoption lag on clients and servers.
- Vercel adapter supports both Streamable HTTP and SSE for transitional compatibility.
- Production MCP growth exposes transport and scaling as first-class design choices, not afterthoughts.

## Notes
Directly relevant to Raindrop/QMD MCP setup in `.cursor/mcp.json`—transport choice affects reliability and cost for vault agent tooling.

## Open questions
- Should vault MCP servers prefer Streamable HTTP now despite mixed client support?
