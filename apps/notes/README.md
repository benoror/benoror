# Notes (Quartz)

This workspace uses Quartz as the static-site generator.

Markdown content is built from the `content` folder.

## 1) Select what to publish from vaults

1. Copy config:
   - `cp apps/notes/vaults.config.example.json apps/notes/vaults.config.json`
2. Set absolute vault paths and selected `entries`.
3. Sync selected markdown:
   - `pnpm --filter notes sync:vaults`

Synced files are copied into `apps/notes/content/<vault-name>/...`.

## 2) Build and preview with Quartz

1. Install dependencies.
2. Start preview server:
   - `pnpm --filter notes dev`
3. Build static output:
   - `pnpm --filter notes build`

Quartz source is committed locally in `apps/notes/quartz` (standard Quartz project layout).
Dev server uses port `3002` (`wsPort` `3003`).

## Upgrading Quartz

This app vendors Quartz core source in `apps/notes/quartz`, so upgrades are explicit:

1. Bump `quartz` dependency in `apps/notes/package.json`.
2. Replace `apps/notes/quartz` with the upgraded Quartz `quartz/` folder.
3. Review `quartz.config.ts` and `quartz.layout.ts` against upgrade notes.
4. Run `pnpm --filter notes build`.

Use Quartz's upgrade guide for version-specific migration steps.

## Frontmatter rule

Use `publish: true` in notes you want publicly synced and published.

## Requirements

Quartz v4 requires Node 22+, but this pinned setup currently works best on Node 22.x.

If your shell uses Node <22 or Node >=24, Quartz commands fail fast with a clear version error.
