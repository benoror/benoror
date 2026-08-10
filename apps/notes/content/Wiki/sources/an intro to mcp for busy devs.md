---
title: "an intro to mcp for busy devs"
tags:
  - wiki
  - sources
sources:
  - "[[an intro to mcp for busy devs]]"
domains: [agentic]
date: "2026-07-17T06:23:35.024Z"
created: "2026-07-17T06:23:35.024Z"
---

# an intro to mcp for busy devs

## Takeaways
- Allen Thomas TL;DR: **MCP server : LLM :: LSP : text editor**; MCP is "ODBC for AI"—one protocol instead of per-LLM tool connectors.
- Motivating example: Claude can't answer Pokémon #1000 without tools despite knowledge cutoff; **PokéAPI MCP** gives live lookup.
- Practical setup: Python + `uv` (prefer `brew install uv` over install script for Claude Desktop PATH), `mcp[cli]`, httpx, **FastMCP** decorator for tools.
- Walkthrough builds async PokéAPI fetch helper and `@mcp.tool()` handlers; demonstrates why external data needs structured tool access.

## Notes
Accessible hands-on MCP primer; good onboarding doc alongside Kent Dodds EpicAI MCP focus and vault `.cursor/mcp.json` (QMD, Raindrop) setup.

## Open questions
- Any vault-specific MCP servers worth a similar "busy dev" walkthrough (e.g. vault-health, kb-triage)?
