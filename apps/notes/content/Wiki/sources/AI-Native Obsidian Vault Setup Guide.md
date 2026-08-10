---
title: "AI-Native Obsidian Vault Setup Guide"
tags:
  - wiki
  - sources
sources:
  - "[[AI-Native Obsidian Vault Setup Guide]]"
domains: [agentic, system]
date: "2026-07-17T06:22:40.514Z"
created: "2026-07-17T06:22:40.514Z"
includeInRss: false
---

# AI-Native Obsidian Vault Setup Guide

## Takeaways
- Structures vault as a **life OS**: numeric folder prefixes, periodics (daily/weekly/monthly/quarterly), entities (people, projects, areas), and automation scripts.
- Claude Code integration lives under `000 OS/Claude/` with commands, scripts (Bun/TS), and skills co-located with Obsidian templates.
- Dataview rollups and scripted week setup reduce manual dashboard maintenance; North Star + Dashboard anchor tactical vs. strategic views.
- Designed to be followable by humans or agents—explicit folder semantics and templates enable repeatable agent operations.
- Session logs (`210 AI Log/`) separate agent artifacts from durable knowledge notes.

## Notes
Reference architecture for comparing/evolving this vault's Daily/SoM/Projects/Logs layout and `.agents/skills` placement—many patterns align, others differ (KB routing, Raindrop external bookmarks).

## Open questions
- Which entity folders (People, Teams, Events) are worth adopting vs. overkill for a personal vault?
