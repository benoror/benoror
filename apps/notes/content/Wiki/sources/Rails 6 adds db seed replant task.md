---
title: "Rails 6 adds db seed replant task"
tags: [wiki, sources]
sources: ["[[Rails 6 adds db seed replant task]]"]
domains: [coding]
date: "2026-07-17T06:23:08.182Z"
created: "2026-07-17T06:23:08.182Z"
---

# Rails 6 adds db:seed:replant task

## Takeaways

- **`rails db:seed:replant`** (Rails 6+): truncates all tables for the **current environment**, then loads `db/seeds.rb`.
- **Replaces awkward workflow:** `db:setup` rebuilds test + development and re-seeds — overkill when you only want fresh dev/staging seed data.
- **Safety:** runs `db:check_protected_environments` — aborts in production unless `DISABLE_DATABASE_ENVIRONMENT_CHECK=1`.
- **Sequence:** `db:load_config` → `db:truncate_all` → `db:seed` (with migration checks).

## Notes

Saeloun blog walkthrough of [Rails PR #34779](https://github.com/rails/rails/pull/34779/). Handy for local dev when seed data or corrupted dev DB needs a clean slate without full schema rebuild.

## Open questions

- `db:seed:replant` vs. `db:reset` / `db:drop db:create db:migrate db:seed` — when to prefer each?
