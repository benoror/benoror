---
title: LLM Wiki pattern
tags:
  - wiki
  - concepts
sources:
  - "[[Karpathy LLM Wiki]]"
  - "[[Building Your AI-Powered Second Brain Claude Code and Obsidian]]"
  - "[[AI-Native Obsidian Vault Setup Guide]]"
date: "2026-07-17T06:24:02.102Z"
created: "2026-07-17T06:24:02.102Z"
---

# LLM Wiki pattern

Compile-time knowledge vs retrieve-at-query-time (RAG). An agent maintains a persistent, interlinked markdown wiki between you and raw sources.

## Core claims

- **Raw is immutable** — clippings/sources are curated inputs; the wiki is the living artifact.
- **Schema disciplines the agent** — `AGENTS.md` / skills tell it how to ingest, query, and lint.
- **Bookkeeping is the bottleneck** — LLMs win because maintenance cost → ~0.
- **Answers compound** — good query results get filed back as wiki pages.

## Layers (this vault)

| Layer | Path |
| --- | --- |
| Raw | `Clippings/` (+ Raindrop) |
| Wiki | `Wiki/` |
| Schema | `AGENTS.md` + `.agents/skills/` |

## Ops

`/ingest` · `/vault-health wiki` · file durable chat answers via `/ingest answer`

## Open questions

- How aggressively to backlog-ingest vs domain-scoped compile?
- When does QMD replace `Wiki/index.md` as primary nav?
