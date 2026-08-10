---
title: "How to implement Stripe without going mad"
tags:
  - wiki
  - sources
sources:
  - "[[How to implement Stripe without going mad]]"
domains: [coding]
date: "2026-07-17T06:22:56.439Z"
created: "2026-07-17T06:22:56.439Z"
includeInRss: false
---

# How to implement Stripe without going mad

## Takeaways

- Stripe's core pain is **split brain**: purchase state lives in Stripe while your app tracks via webhooks — 258+ event types, unordered delivery, none fully trusted.
- Fix: one **`syncStripeDataToKV(customerId)`** function that always re-syncs full customer state from Stripe to KV — avoid partial webhook-driven state patches.
- **Create Stripe customer before checkout** and bind `customerId ↔ userId` in KV with `userId` in customer metadata — never start checkout ephemerally.
- Success route must trigger **sync on return**, then redirect; webhooks call the same sync function for all relevant events — single code path.
- Requires TypeScript backend, verified auth, and a KV store (e.g. Upstash Redis); Stripe still leaves tax, invoices, and edge cases as your problem.
- Skipping steps in the flow creates race conditions where Stripe shows failed payment but the app shows subscribed.

## Notes

Theo's battle-tested Stripe integration pattern — reference if ObsidianOS or any SaaS project adds billing; prioritizes correctness over webhook cleverness.

## Open questions

- Does ObsidianOS need payments at all, or is MIT/open-source sufficient for the foreseeable roadmap?
