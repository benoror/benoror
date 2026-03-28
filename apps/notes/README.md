# Notes (Flowershow)

This workspace uses Flowershow directly, instead of a custom Next.js renderer.

Markdown content is published via the official `publish` CLI against the `content` folder.

## 1) Select what to publish from vaults

1. Copy config:
   - `cp apps/notes/vaults.config.example.json apps/notes/vaults.config.json`
2. Set absolute vault paths and selected `entries`.
3. Sync selected markdown:
   - `pnpm --filter notes sync:vaults`

Synced files are copied into `apps/notes/content/<vault-name>/...`.

## 2) Publish with Flowershow CLI

1. Login:
   - `pnpm --filter notes publish:login`
2. Check auth:
   - `pnpm --filter notes publish:status`
3. First publish:
   - `pnpm --filter notes publish:new`
4. Sync updates:
   - `pnpm --filter notes publish:sync`

## Frontmatter rule

Use `publish: true` in notes you want publicly synced and published.
