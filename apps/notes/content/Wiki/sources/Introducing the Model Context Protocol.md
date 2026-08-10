---
title: "Introducing the Model Context Protocol"
tags:
  - wiki
  - sources
sources:
  - "[[Introducing the Model Context Protocol]]"
domains: [agentic]
date: "2026-07-17T06:23:04.285Z"
created: "2026-07-17T06:23:04.285Z"
---

# Introducing the Model Context Protocol

## Takeaways

- **MCP** (Anthropic, open standard) connects AI assistants to data sources — repos, business tools, dev environments — via a universal protocol instead of bespoke integrations per source.
- Architecture: **MCP servers** expose data; **MCP clients** (AI apps) connect — secure, two-way connections at scale.
- Launch included spec + SDKs, Claude Desktop local server support, and open-source pre-built servers (Google Drive, Slack, GitHub, Git, Postgres, Puppeteer).
- Addresses model isolation behind silos — every new data source no longer requires a custom one-off implementation.
- Early adopters: Block, Apollo; dev tools (Zed, Replit, Codeium, Sourcegraph) integrating for richer coding context.
- Claude 3.5 Sonnet can rapidly scaffold MCP server implementations for org-specific datasets.

## Notes

Foundational protocol for this vault's MCP setup (QMD, Raindrop) — the plumbing layer ObsidianOS assumes when skills say "agent-agnostic MCP client."

## Open questions

- Which additional MCP servers (Gmail beyond gws CLI, Calendar) would most reduce ObsidianOS skill friction?
