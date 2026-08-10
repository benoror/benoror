---
title: "Unit Testing React Components"
tags:
  - wiki
  - sources
sources:
  - "[[Unit Testing React Components]]"
domains: [coding, skills]
date: "2026-07-17T06:23:28.637Z"
created: "2026-07-17T06:23:28.637Z"
---

# Unit Testing React Components

## Takeaways
- Eric Elliott on **TDD for React**: unit tests reduce bug density, improve architecture/API design, and give fast file-save feedback—but UI components are harder than pure functions.
- **Test-first** unlocks the real benefits; tinkering then testing forfeits architecture and DX gains from TDD discipline.
- Favor **pure components** (same props → same render, no side effects); wrap with container components for state and side effects.
- Isolate **business rules in pure reducers**; isolate **side effects in containers**—classic container/presentational split for testability.
- **RITEway** framework (Tape wrapper): `render-component` + Cheerio selections on static markup for simple, readable component tests.

## Notes
2019 JavaScript Scene article; patterns predate React Testing Library dominance but pure/container split remains valid. Connects to Simon Willison's red/green TDD for agents.

## Open questions
- When to prefer RTL/user-event style tests over RITEway static markup for current React work?
