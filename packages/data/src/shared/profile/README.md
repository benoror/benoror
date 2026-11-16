# Manual social posts

`social-posts.json` is the hand-curated source for the X and LinkedIn entries in
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
- Every URL must be absolute HTTP(S), and every title must be non-empty.

The typed loader in `social-posts.ts` validates the complete file, unique
canonical URLs, and newest-first ordering. The data package build executes the
loader and fails if an item is malformed.
