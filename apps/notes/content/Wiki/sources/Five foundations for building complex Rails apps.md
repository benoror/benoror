---
title: "Five foundations for building complex Rails apps"
tags:
  - wiki
  - sources
sources:
  - "[[Five foundations for building complex Rails apps]]"
domains: [coding]
date: "2026-07-17T06:23:05.840Z"
created: "2026-07-17T06:23:05.840Z"
includeInRss: false
---

# Five foundations for building complex Rails apps

## Takeaways
- Vanilla Rails suffices until ~100–150k LOC; beyond that, maintainability needs new technical *and* mental foundations.
- **Domain-Driven Design** first—prioritize business understanding over Jira-as-truth; shifts engineers toward purposeful modeling.
- **Mutation testing** validates test quality on complex logic—not widespread in Ruby but strong signal for critical paths.
- **Event sourcing** and **CQRS** appear as layers for apps that must mirror business growth and auditability.
- **AI** listed as fifth foundation—tooling to navigate complexity, not a replacement for DDD discipline.

## Notes
Career/coding reference for large Rails systems; indirect for vault ops unless building Rails-based agent backends.

## Open questions
- Where is the complexity threshold where DDD pays off in smaller greenfield apps?
