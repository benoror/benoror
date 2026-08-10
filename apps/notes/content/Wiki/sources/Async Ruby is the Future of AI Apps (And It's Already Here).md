---
title: "Async Ruby is the Future of AI Apps (And It's Already Here)"
tags:
  - wiki
  - sources
sources:
  - "[[Async Ruby is the Future of AI Apps (And It's Already Here)]]"
domains: [agentic, coding]
date: "2026-07-17T06:22:43.021Z"
created: "2026-07-17T06:22:43.021Z"
---

# Async Ruby is the Future of AI Apps (And It's Already Here)

## Takeaways
- LLM apps need long-lived connections, token streaming, and many concurrent mostly-idle sessions—thread-based job queues (Sidekiq, SolidQueue) cause **slot starvation**.
- A single streaming job can hold a worker 30–60s while 99% idle; the 26th user waits on queue depth, not CPU.
- Async Ruby (`socketry/async`) lets existing synchronous code run under the fiber scheduler without rewriting the stack—unlike Python's asyncio migration pain.
- Resource multiplication (DB pool, stack memory, OS threads) scales badly for 1000 concurrent streams on thread pools.
- RubyLLM / Chat with Work are cited as real async-first LLM products built on this model.

## Notes
Relevant if building or evaluating Ruby backends for agent tooling; less direct for Obsidian vault work unless extending server-side automations.

## Open questions
- Does async Ruby beat job-queue + SSE/WebSocket fan-out for typical personal-agent workloads at small scale?
