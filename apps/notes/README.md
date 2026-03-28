# Notes (Quartz)

This workspace uses Quartz as the static-site generator.

Markdown content is built from the `content` folder.

## 1) Select what to publish from vaults

1. Copy config:
   - `cp apps/notes/vaults.config.example.json apps/notes/vaults.config.json`
2. Set absolute vault paths in `sources` (`name` + `path` per vault).
3. Sync markdown:
   - `pnpm --filter notes sync:vaults`

Sync behavior:

- Recursively traverses each configured vault.
- Syncs only notes with `publish: true` frontmatter.
- If no `date` is present, it auto-populates `date` using this priority: `date` (existing) -> `created` (frontmatter) -> source file `ctime`.
- If no `created` is present, it auto-populates `created` from source file `ctime` to preserve original file metadata in synced output.
- If `hidden: true` is present, the note is still generated and accessible by direct URL, but excluded from Quartz Explorer/index-based discovery.
- Folder hierarchy is preserved relative to the original vault path under `apps/notes/content/<vault-name>/...`.

## 2) Build and preview with Quartz

1. Install dependencies.
2. Start preview server:
   - `pnpm --filter notes dev`
3. Build static output:
   - `pnpm --filter notes build`

Quartz source is committed locally in `apps/notes/quartz` (standard Quartz project layout).
Dev server uses port `3002` (`wsPort` `3003`).

## Deploy on Vercel (dedicated Notes project)

Create a separate Vercel project for `apps/notes`:

1. Import the monorepo in Vercel.
2. Set **Framework Preset** to **Other**.
3. Set **Root Directory** to `apps/notes`.
4. Ensure URL rewriting is enabled via `apps/notes/vercel.json`:
   - `"cleanUrls": true` (so Quartz routes work without `.html` suffixes)
5. Keep default commands from `apps/notes/vercel.json`:
   - Install: `pnpm install --frozen-lockfile`
   - Build: `pnpm build`
   - Output directory: `public`
6. Set Node.js runtime to **22.x** (also declared in `apps/notes/package.json` engines).
7. (Optional) Add your custom domain (e.g. `notes.benoror.com`) in project domains.

Quartz note: sitemap/RSS generation depends on correct `baseUrl` configuration (`notes.benoror.com` is already set in `quartz.config.ts`).

This deploys Quartz as a static site from the generated `public/` output.

## 3) Install themes from quartz-themes

This app includes a wrapper for the official `quartz-themes` installer flow.

- Install/update a theme into `apps/notes/quartz/styles/themes`:
  - `pnpm --filter notes theme:install -- "catppuccin"`
  - `pnpm --filter notes theme:install -- "obsidian-nord"`

Notes:

- The wrapper downloads and runs the upstream `action.sh` from `quartz-themes` in `apps/notes`, so Quartz root detection works as intended.
- Upstream installer applies one theme package at a time. If you need mixed-mode setup (for example, light from one theme and dark from another), keep using Quartz tokens/overrides for the mode split.

## Discoverability outputs

The Notes site now emits machine-discovery assets by default:

- `sitemap.xml` and `index.xml` (RSS) via Quartz content index.
- `robots.txt`, `llms.txt`, and `agents.txt` at site root.
- Per-page Markdown mirror under `/md/<slug>.md`.
- A "Download Markdown" action on content pages that links to the mirrored `.md`.
- Canonical URL, robots meta (`noindex` for `hidden: true` pages), and JSON-LD schema metadata in page `<head>`.

## Upgrading Quartz

This app vendors Quartz core source in `apps/notes/quartz`, so upgrades are explicit:

1. Bump `quartz` dependency in `apps/notes/package.json`.
2. Replace `apps/notes/quartz` with the upgraded Quartz `quartz/` folder.
3. Review `quartz.config.ts` and `quartz.layout.ts` against upgrade notes.
4. Run `pnpm --filter notes build`.

Use Quartz's upgrade guide for version-specific migration steps.

## Frontmatter rule

Use `publish: true` in notes you want synced and published.

Optional fields:

- `hidden: true` to keep a page URL-accessible but out of Explorer/index-based listings.
- `date: "YYYY-MM-DD"` to explicitly control the note date (otherwise sync injects one).

## Requirements

Quartz v4 requires Node 22+, but this pinned setup currently works best on Node 22.x.

If your shell uses Node <22 or Node >=24, Quartz commands fail fast with a clear version error.
