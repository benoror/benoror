# Manual social posts

`social-posts.json` is the hand-curated source for the LinkedIn and X entries in
the activity feed. Keep items newest first and use this stable key order so
weekly updates remain easy to review:

```json
{
  "date": "YYYY-MM-DD",
  "platform": "x",
  "url": "https://x.com/…",
  "title": "Post text or a concise title",
  "alsoOn": ["https://www.linkedin.com/…"]
}
```

- `platform` must be `"x"` or `"linkedin"`.
- `url` is the canonical post URL.
- `alsoOn` lists URLs where the same post also appeared; use `[]` when empty.
- `featured: true` (optional, after `alsoOn`) pins an X post as its own feed
  item. Omit the key otherwise.
- Every URL must be absolute HTTP(S), and every title must be non-empty.

The activity feed shows long-form work: blog, notes, LinkedIn and the other
non-social sources. When a post went out on both LinkedIn and X, the LinkedIn
URL is the item's `url` and the X URL goes in `alsoOn`. X and Bluesky posts are
never the main link unless featured; X items without `featured` stay here as a
record but are not rendered as their own feed rows.

The typed loader in `social-posts.ts` validates the complete file, unique
canonical URLs, and newest-first ordering. The data package build executes the
loader and fails if an item is malformed.
