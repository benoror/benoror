---
title: "Karpathy LLM Wiki"
tags:
  - wiki
  - sources
sources:
  - "[[Karpathy LLM Wiki]]"
domains: [system, agentic]
date: "2026-07-17T06:23:06.240Z"
created: "2026-07-17T06:23:06.240Z"
---

# Karpathy LLM Wiki

## Takeaways

- **LLM Wiki pattern**: instead of RAG-only retrieval, the LLM incrementally builds and maintains a **persistent, interlinked markdown wiki** between you and raw sources.
- Three layers: **raw sources** (immutable), **wiki** (LLM-owned summaries/entities/concepts), **schema** (`AGENTS.md` / `CLAUDE.md` conventions).
- Operations: **ingest** (read source → update many wiki pages), **query** (search wiki → synthesize → optionally file answer back), **lint** (contradictions, orphans, stale claims).
- Wiki is a **compounding artifact** — cross-references, contradictions, and synthesis accumulate; Obsidian is the IDE, LLM is the programmer, wiki is the codebase.
- Navigation via **`index.md`** (content catalog) and **`log.md`** (chronological append-only); optional CLI search (e.g. qmd) at scale.
- Humans source and ask questions; LLM does summarizing, cross-referencing, filing, and maintenance humans abandon.

## Notes

Direct architectural blueprint for this `Wiki/` folder and `/ingest` workflow — meta-source explaining why Ben is compiling Clippings into `Wiki/sources/`.

## Open questions

- When does this vault graduate from index-based navigation to mandatory qmd for wiki search?
