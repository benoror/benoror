---
title: "a meta-harness for building and running AI agents"
tags: [wiki, sources]
sources: ["[[a meta-harness for building and running AI agents]]"]
domains: [agentic]
date: "2026-07-17T06:22:53.192Z"
created: "2026-07-17T06:22:53.192Z"
---

# Omnigent — meta-harness for AI agents

## Takeaways

- **Omnigent** (omnigent.ai) is an open-source **meta-harness**: a common layer over Claude Code, Codex, Pi, and custom agents — swap harnesses without rewriting.
- **Composition:** combine models, harnesses, and techniques; built-in agents **Polly** (coding orchestrator) and **Debby** (model debate); custom agents in YAML.
- **Governance:** contextual policies (spend caps, model routing, risk-based escalation); secure OS sandbox (**Omnibox**) for filesystem/network restrictions and credential brokering.
- **Architecture:** runner wraps agents in sandboxed sessions (local, Modal, or Daytona) → server adds policies + shared history → terminal, web, native/mobile apps, REST API.
- **Status:** alpha, built in the open.

## Notes

Addresses a gap above individual harnesses: multi-agent collaboration on the same live session from any device, with policy and sandboxing as first-class concerns. Install: `curl -fsSL https://omnigent.ai/install.sh | sh`.

## Open questions

- How does Omnigent compare to running Claude Code + custom MCP/policy layers directly?
- Production-readiness of alpha policies and Omnibox for YOLO-mode coding?
