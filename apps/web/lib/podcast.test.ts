import assert from "node:assert/strict";
import { test } from "node:test";
import {
  cleanPodcastText,
  EPISODE_LINKS,
  getPodcastEpisodeAnchorId,
  getPodcastEpisodePath,
  getPodcastEpisodeSlug,
  getPodcastEpisodeUrl,
  getYouTubeEmbedUrl,
  PODCAST_CANONICAL_URL,
  PODCAST_RSS_URL,
} from "./podcast.ts";

test("cleans RSS markup and unsupported dash punctuation", () => {
  assert.equal(
    cleanPodcastText("<p>Good views &amp; scale—together.</p>"),
    "Good views & scale, together.",
  );
});

test("keeps the canonical page and RSS feed on their intended hosts", () => {
  assert.equal(PODCAST_CANONICAL_URL, "https://benoror.com/podcast");
  assert.equal(PODCAST_RSS_URL, "https://anchor.fm/s/fd81326c/podcast/rss");
});

test("builds stable episode anchors and readable canonical paths", () => {
  assert.equal(getPodcastEpisodeAnchorId("4"), "episode-4");
  const slug = getPodcastEpisodeSlug(
    "One Map of Reality: What a 109M-Parameter JEPA Says About Scale",
  );
  assert.equal(
    slug,
    "one-map-of-reality-what-a-109m-parameter-jepa-says-about-scale",
  );
  assert.equal(
    getPodcastEpisodePath(slug),
    "/podcast/one-map-of-reality-what-a-109m-parameter-jepa-says-about-scale",
  );
  assert.equal(
    getPodcastEpisodeUrl(slug),
    "https://benoror.com/podcast/one-map-of-reality-what-a-109m-parameter-jepa-says-about-scale",
  );
});

test("includes the current episode links", () => {
  assert.equal(
    EPISODE_LINKS["4"]?.apple,
    "https://podcasts.apple.com/us/podcast/one-map-of-reality-what-a-109m-parameter-jepa/id6837809487?i=1000803903114",
  );
  assert.equal(
    EPISODE_LINKS["4"]?.youtube,
    "https://www.youtube.com/watch?v=fHO1ReeWkG0",
  );
  assert.equal(
    EPISODE_LINKS["4"]?.spotify,
    "https://open.spotify.com/episode/7AvcXS8fxzQRlrOg4saRIx",
  );
  assert.deepEqual(Object.keys(EPISODE_LINKS).sort(), ["1", "2", "3", "4"]);
});

test("builds privacy-friendly YouTube embed URLs from episode links", () => {
  assert.equal(
    getYouTubeEmbedUrl(EPISODE_LINKS["4"]?.youtube),
    "https://www.youtube-nocookie.com/embed/fHO1ReeWkG0",
  );
  assert.equal(getYouTubeEmbedUrl(), undefined);
});
