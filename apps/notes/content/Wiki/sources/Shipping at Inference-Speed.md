---
title: "Shipping at Inference-Speed"
tags: [wiki, sources]
sources: ["[[Shipping at Inference-Speed]]"]
domains: [agentic, coding]
date: "2026-07-17T06:23:16.052Z"
created: "2026-07-17T06:23:16.052Z"
---

# Shipping at Inference-Speed

## Takeaways

- **Peter Steinberger (Dec 2025):** shipping speed now limited by **inference time + hard thinking** — most software is boring data-shuffling; start as CLI so agents can verify output.
- **GPT-5 / Codex unlock:** rarely reads code anymore — watches stream, knows architecture; important decisions are **language/ecosystem and dependencies** (TS web, Go CLI, Swift macOS/iOS).
- **Codex vs Opus:** Codex reads extensively before writing (slow start, fewer bad fixes); Opus eager on small edits, weaker on large refactors. **Plan mode** is a hack for older models — conversation + "build" replaces it.
- **Workflow:** 3–8 parallel projects, queue prompts in Codex, commit to main, cross-reference `../other-project`, docs in `docs/` + global `AGENTS.MD`, short prompts with screenshots for UI.
- **Oracle tool:** GPT-5 Pro CLI for stuck agents — less needed after GPT-5.2; **knowledge cutoff** (Aug vs Mar) matters for latest tools.
- **Engineer for agents:** codebases structured so agents work efficiently; "write docs to docs/*.md" and let model pick filenames.

## Notes

Follow-up to Oct 2025 "Just talk to it" post. VibeTunnel zig rewrite (5h, one shot) as concrete capability benchmark. Clawd/OpenClaw ecosystem context. Default model: `gpt-5.2-codex` high.

## Open questions

- Commit-to-main solo workflow — team adaptation patterns?
- When does not reading code become a liability for security/architecture debt?
