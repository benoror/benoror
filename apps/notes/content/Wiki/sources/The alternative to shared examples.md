---
title: "The alternative to shared examples"
tags:
  - wiki
  - sources
sources:
  - "[[The alternative to shared examples]]"
domains: [coding]
date: "2026-07-17T06:23:12.905Z"
created: "2026-07-17T06:23:12.905Z"
---

# The alternative to shared examples

## Takeaways
- Argues against RSpec `shared_examples` for mix-ins in favor of **isolated contract-tests**—spec the mixin module directly, not via including classes.
- **Isolated testing**: test one file's contract without re-running lower layers (e.g. don't hit persistence when speccing a controller).
- Failures map 1:1 to source files; forces explicit thinking about scope, API, and contracts.
- For mix-ins, follow David Chelimsky's three concerns: at-mix-in-time logic, message-triggered behavior, and how including classes (K, L) assert wellformedness separately.
- Shared examples hide the mixin spec, add setup cost, and blur the link between `it` blocks and the code under test.

## Notes
Part 2 of epigene's series (pt1: case against shared examples). Practical Ruby/RSpec philosophy applicable beyond Rails—modular specs over DRY-at-all-costs in test suites.

## Open questions
- Does this pattern extend cleanly to JS/TS mixin patterns or composition hooks in React?
