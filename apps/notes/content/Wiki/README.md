---
title: Wiki
tags:
  - moc
  - wiki
date: "2026-07-17T06:13:44.205Z"
created: "2026-07-17T06:13:44.205Z"
includeInRss: false
---

# Wiki

Agent-maintained **compile layer** (Karpathy [LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) pattern). You read it; agents write and update it via [/ingest](../.agents/skills/ingest/SKILL.md).

## Layers

| Layer | Path | Ownership |
| --- | --- | --- |
| **Raw** | `Clippings/` (+ Raindrop) | Immutable sources — clip once; do not rewrite bodies to “improve” them |
| **Wiki** | `Wiki/` | LLM-owned summaries, entities, concepts, syntheses |
| **Schema** | `AGENTS.md` + skills | Conventions and workflows |

Human homes (`Daily/`, `ToDos/`, `SoM/`, `Projects/`) stay human-intent. This folder is for **compounding synthesis**, not capture or kanban.

## Navigation

- [[index|Index]] — catalog of wiki pages (agents update on every ingest)
- [[log|Log]] — chronological ingest / query-file / lint entries

## Page types

| Type | Purpose | Typical path |
| --- | --- | --- |
| Source summary | One compiled take on a clipping | `Wiki/sources/…` |
| Entity | Person, product, company, tool | `Wiki/entities/…` |
| Concept | Idea, pattern, thesis | `Wiki/concepts/…` |
| Synthesis | Cross-cutting comparison or stance | `Wiki/` root or `Wiki/syntheses/…` |

Link back to raw with `[[Clipping Title]]` or `source:` frontmatter. Prefer wikilinks over duplicating long quotes.

## Operations

| Command | Role |
| --- | --- |
| `/ingest` | Compile a clipping (or durable answer) into wiki pages |
| `/kb-triage` | Ends with optional `/ingest` for clips created/touched this pass |
| `/vault-health wiki` | Lint for contradictions, stale claims, missing concept pages |
| `/qmd` | Search wiki + raw when answering; **file good answers back** into `Wiki/` |

## Filing answers back

When a chat produces a durable comparison, thesis, or decision — write or update a wiki page and append `Wiki/log.md`. Do not leave compounding insight only in transcript.

## Scope

Start small. Good first domains: career thesis, agentic/ObsidianOS thinking, research deep-dives. Do not mirror the entire vault here.
