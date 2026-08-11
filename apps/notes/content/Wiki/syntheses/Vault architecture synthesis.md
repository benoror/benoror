---
title: Vault architecture synthesis
tags:
  - wiki
  - syntheses
sources:
  - "[[Karpathy LLM Wiki]]"
  - "[[Building Your AI-Powered Second Brain Claude Code and Obsidian]]"
  - "[[AI-Native Obsidian Vault Setup Guide]]"
  - "[[How I use Obsidian — Steph Ango]]"
date: "2026-07-17T06:24:38.388Z"
created: "2026-07-17T06:24:38.388Z"
includeInRss: false
---

# Vault architecture synthesis

How this personal vault maps intentionality + Karpathy compile layer.

## Homes

| Surface | Role |
| --- | --- |
| Daily / staging | Capture & bulk dumps |
| ToDos / SoM / Projects | Human action & evaluation & build docs |
| Clippings / Raindrop | Raw |
| Wiki | Agent-compiled synthesis |
| `.agents/` | Skills, rules, memory, logs |

## Design bets

1. Don’t LLM-own Daily/ToDos/SoM.
2. Don’t treat Clippings as the wiki.
3. Skills encode ops; Wiki accumulates judgment.
4. Lowercase `staging/` signals process scaffolding.

## Status (2026-07-17)

Initial ingest: all 64 clippings → `Wiki/sources/*` + core concepts/entities. Backlog detection in `/vault-health` still to harden.
