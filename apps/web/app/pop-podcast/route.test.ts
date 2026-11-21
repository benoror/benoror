import assert from "node:assert/strict";
import { test } from "node:test";
import { GET } from "./route.ts";

const PODCAST_PAGE_URL = "https://benoror.bearblog.dev/pop-podcast/";
const RSS_LINK =
  '<link rel="alternate" type="application/rss+xml" title="Pursuit of Polymathy" href="https://anchor.fm/s/fd81326c/podcast/rss">';

test("serves podcast discovery metadata and a browser redirect in a 200 HTML response", async () => {
  const response = GET();
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.equal(
    response.headers.get("content-type"),
    "text/html; charset=utf-8",
  );
  assert.ok(html.includes(RSS_LINK));
  assert.ok(html.includes(`<link rel="canonical" href="${PODCAST_PAGE_URL}">`));
  assert.ok(
    html.includes(`<meta property="og:url" content="${PODCAST_PAGE_URL}">`),
  );
  assert.ok(
    html.includes(
      `<meta http-equiv="refresh" content="0; url=${PODCAST_PAGE_URL}">`,
    ),
  );
  assert.ok(
    html.includes(`<a href="${PODCAST_PAGE_URL}">Pursuit of Polymathy</a>`),
  );
});
