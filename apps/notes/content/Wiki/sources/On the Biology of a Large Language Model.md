---
title: "On the Biology of a Large Language Model"
tags: [wiki, sources]
sources: ["[[On the Biology of a Large Language Model]]"]
domains: [agentic, reading]
date: "2026-07-17T06:22:55.289Z"
created: "2026-07-17T06:22:55.289Z"
includeInRss: false
---

# On the Biology of a Large Language Model

## Takeaways

- Anthropic **interpretability** paper applying a **biology metaphor** to LLMs: simple training algorithms produce complex internal mechanisms, much as evolution produces intricate organisms.
- Uses **circuit tracing** on **Claude 3.5 Haiku** to reverse-engineer internal computation — building on prior feature-discovery work (sparse autoencoders, monosemanticity, transcoders).
- **Features as cells:** interpretable concepts embedded in model activations are hypothesized as basic units of computation; understanding requires mapping how they interact, not just identifying them.
- **Why it matters:** as models grow more capable and deployed widely, black-box behavior is increasingly unsatisfactory for safety, alignment, and fitness-for-purpose assessment.
- **Scale note:** massive interactive publication (~2MB) with attribution graphs — treat as deep reference, not a single-session read.

## Notes

Companion to [Circuit Tracing: Revealing Computational Graphs in Language Models](https://transformer-circuits.pub/2025/attribution-graphs/methods.html). Part of the Transformer Circuits thread. Do not attempt to summarize the full paper here; use the clipping as a pointer and drill into specific circuits/mechanisms as needed.

## Open questions

- How much of Haiku's traced biology transfers to larger production models?
- Practical path from circuit-level insights to product-level safety guarantees?
