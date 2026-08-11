---
title: "Here's how I use LLMs to help me write code"
tags:
  - wiki
  - sources
sources:
  - "[[Here's how I use LLMs to help me write code]]"
domains: [agentic, coding]
date: "2026-07-17T06:22:49.324Z"
created: "2026-07-17T06:22:49.324Z"
includeInRss: false
---

# Here's how I use LLMs to help me write code

## Takeaways

- LLM-assisted coding is **difficult and unintuitive** — treat models as an over-confident, fast pair programmer, not AGI; augment your skill, don't abdicate it.
- **Context is king**: most craft is managing what enters the conversation; reset threads when they go stale; prefer tools that expose context clearly.
- Account for **training cut-offs** when picking libraries; favor boring, stable, well-represented stacks or feed recent examples explicitly.
- Start projects by asking for **options and prototypes** before committing to an implementation path; iterate simple → sophisticated within one context.
- **Don't anthropomorphize failures** — note tasks models can't do; a stronger model is one that suddenly handles a previously impossible task.
- Provide full working examples in prompts; use conversation history deliberately; test and review everything the model produces.

## Notes

Simon Willison's foundational practitioner guide on LLM coding — sets expectations and patterns that complement Boris Tane's research-plan workflow and Matt Pocock's plan loop.

## Open questions

- Which of Willison's context-management habits should be encoded as vault agent rules vs left to session practice?
