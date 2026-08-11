---
title: "Rails Dockerfile Best Practices Part 1 Image Slimming"
tags: [wiki, sources]
sources: ["[[Rails Dockerfile Best Practices Part 1 Image Slimming]]"]
domains: [coding]
date: "2026-07-17T06:23:10.620Z"
created: "2026-07-17T06:23:10.620Z"
includeInRss: false
---

# Rails Dockerfile Best Practices Part 1: Image Slimming

## Takeaways

- **Series goal:** line-by-line walkthrough of Rails 7.1+ default `Dockerfile` — Part 1 covers **image size reduction** only.
- **Why slim images:** faster builds/deploys/CI, lower registry storage and bandwidth, faster startup, smaller attack surface (fewer packages).
- **Inspect tools:** `docker images` for size; `docker history` for per-layer breakdown — layers are immutable filesystem deltas from each Dockerfile instruction.
- **Typical Rails image bloat sources:** Ruby base, apt packages, `bundle` copy, app copy — example kamal-dashboard ~619MB before optimization.
- **Base image choice matters:** `ruby:$VERSION-slim` vs full Debian; multi-stage builds separate build deps from runtime (previewed in series).

## Notes

Igor Aleksandrov (igor.works). Cites DHH cloud-exit cost savings as motivation for caring about image size at scale. Practical for Kamal/Dockerized Rails deployments.

## Open questions

- Slim image vs. debuggability tradeoffs in production incident response?
- Alpine vs debian-slim for Rails (musl/gem native extension issues)?
