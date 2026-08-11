---
title: "Bitcoin A Peer-to-Peer Electronic Cash System"
tags:
  - wiki
  - sources
sources:
  - "[[Bitcoin A Peer-to-Peer Electronic Cash System]]"
domains: [crypto, reading]
date: "2026-07-17T06:22:54.997Z"
created: "2026-07-17T06:22:54.997Z"
includeInRss: false
---

# Bitcoin A Peer-to-Peer Electronic Cash System

## Takeaways
- Satoshi whitepaper (Genius annotated edition): peer-to-peer electronic cash without financial institutions as trusted third parties.
- Digital signatures alone insufficient if double-spending still requires a central authority.
- Solution: timestamp transactions into a hash-based proof-of-work chain; longest chain = sequence + majority CPU honesty assumption.
- Network is minimally structured—nodes broadcast on best effort, leave/rejoin freely, accept longest PoW chain as history.
- Annotated clipping preserves canonical definitions (double-spending, peer-to-peer network, longest-chain rule) with inline commentary links.

## Notes
Foundational crypto reading in vault's `crypto` domain—useful reference when evaluating trust-minimized systems, not agentic workflow per se.

## Open questions
- How do modern consensus models (PoS, L2) change the whitepaper's CPU-majority assumptions in practice?
