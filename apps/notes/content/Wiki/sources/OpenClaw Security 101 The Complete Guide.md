---
title: "OpenClaw Security 101 The Complete Guide"
tags: [wiki, sources]
sources: ["[[OpenClaw Security 101: The Complete Guide]]"]
domains: [agentic, system]
date: "2026-07-17T06:23:00.957Z"
created: "2026-07-17T06:23:00.957Z"
includeInRss: false
---

# OpenClaw Security 101: The Complete Guide

## Takeaways

- OpenClaw can run commands, read files, send messages, and call APIs — **compromise = full account takeover** (keys, prompt injection, data exfiltration).
- **13-step checklist** (~30 min, beginner-friendly) by ex-Cisco engineer Johann Sathianathen:
  1. Separate machine (VPS or spare hardware — not your daily driver)
  2. Never run as root — dedicated `openclaw` user
  3. Change default port
  4. Tailscale for private network access
  5. SSH keys + Fail2ban
  6. UFW firewall
  7. Allowlist messaging users
  8. Bot self-security audit
  9. Real-time alerts
  10. DMs only (no public channels)
  11. Docker sandbox for subagents
  12. Daily security audit cron
  13. Keep OpenClaw updated
- **Mental model:** give the AI its own room — isolation limits blast radius if something goes wrong.
- Guide includes optional "let OpenClaw set this up for you" bootstrap path.

## Notes

Essential companion to OpenClaw adoption. Stuck? paste errors into Claude with context that you're following Johann's guide. Links AI Operators community and expert setup services at end.

## Open questions

- Minimum viable security for local Mac Mini vs. cloud VPS?
- Docker subagent sandbox vs. full Omnibox-style OS sandboxing?
