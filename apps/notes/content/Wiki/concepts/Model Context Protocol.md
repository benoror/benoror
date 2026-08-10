---
title: Model Context Protocol
tags:
  - wiki
  - concepts
sources:
  - "[[Introducing the Model Context Protocol]]"
  - "[[an intro to mcp for busy devs]]"
  - "[[Building efficient MCP servers]]"
  - "[[Why we sunsetted mcpt]]"
date: "2026-07-17T06:24:09.525Z"
created: "2026-07-17T06:24:09.525Z"
---

# Model Context Protocol

Standard for connecting AI clients to tools and data (LSP/ODBC analogy).

## Takeaways

- MCP separates **client** (Cursor, Claude Desktop) from **server** (Gmail, Raindrop, QMD, filesystem).
- Prefer lean servers; streamable HTTP / efficient tool design matters at scale.
- Registries and product wrappers (e.g. mcpt) can die; the protocol and first-party servers matter more than meta-stores.
- Auth reality: Bearer tokens often beat broken OAuth redirects in IDE hosts.

## Vault usage

QMD + Raindrop via gitignored `.cursor/mcp.json`. Gmail stays CLI (`gws`), not MCP.
