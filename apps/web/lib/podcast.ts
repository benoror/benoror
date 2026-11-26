import Parser from "rss-parser";

export const PODCAST_RSS_URL = "https://anchor.fm/s/fd81326c/podcast/rss";
export const PODCAST_CANONICAL_URL = "https://benoror.com/podcast";
export const PODCAST_COVER_FALLBACK =
  "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/42431027/42431027-1731434150000-3ed7aee10bb11.jpg";

export const PODCAST_PLATFORMS = {
  spotify: "https://open.spotify.com/show/5B0ckD9rSjPQ95YP6sstWN",
  apple:
    "https://podcasts.apple.com/us/podcast/pursuit-of-polymathy/id6837809487",
  youtube: "https://www.youtube.com/playlist?list=PLI5et9ejV-eQ",
  pocketCasts: "https://pca.st/rjv6t0is",
  rss: PODCAST_RSS_URL,
} as const;

export type EpisodeLinks = {
  spotify?: string;
  apple?: string;
  youtube?: string;
};

export const EPISODE_LINKS: Record<string, EpisodeLinks> = {
  "4": {
    spotify: "https://open.spotify.com/episode/7AvcXS8fxzQRlrOg4saRIx",
    apple:
      "https://podcasts.apple.com/us/podcast/one-map-of-reality-what-a-109m-parameter-jepa/id6837809487?i=1000803903114",
    youtube: "https://www.youtube.com/watch?v=fHO1ReeWkG0",
  },
  "3": {
    spotify: "https://open.spotify.com/episode/4ENdO0XSL5K80DLaq0Qn01",
    apple:
      "https://podcasts.apple.com/us/podcast/from-action-games-to-surgical-precision/id6837809487?i=1000803336780",
    youtube: "https://www.youtube.com/watch?v=ijbARcR9FAk",
  },
  "2": {
    spotify: "https://open.spotify.com/episode/4FFoTsnkMXoqMpm4mtMm8q",
    apple:
      "https://podcasts.apple.com/us/podcast/a-bayesian-model-for-llm-reasoning-and-inference/id6837809487?i=1000803336463",
    youtube: "https://www.youtube.com/watch?v=iCVg3L5TC1g",
  },
  "1": {
    spotify: "https://open.spotify.com/episode/0YrULmW284O5FjwVutwkkC",
    apple:
      "https://podcasts.apple.com/us/podcast/lessons-from-naval-ravikant-for-software-engineering/id6837809487?i=1000803336751",
    youtube: "https://www.youtube.com/watch?v=Xbyd8QmQPbQ",
  },
};

type ItunesImage = {
  $?: {
    href?: string;
  };
};

type PodcastFeedItem = {
  episodeNumber?: string;
  duration?: string;
  itunesImage?: ItunesImage;
};

export type PodcastEpisode = {
  id: string;
  episodeNumber: string;
  title: string;
  description: string;
  publishedAt: string;
  duration?: string;
  image?: string;
  links: EpisodeLinks;
  spotifyEmbedUrl?: string;
  youtubeEmbedUrl?: string;
};

export type Podcast = {
  title: string;
  coverImage: string;
  episodes: PodcastEpisode[];
};

export const getPodcastEpisodeAnchorId = (episodeNumber: string) => {
  const normalizedEpisodeNumber = episodeNumber
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `episode-${normalizedEpisodeNumber}`;
};

export const getPodcastEpisodeUrl = (episodeNumber: string) =>
  `${PODCAST_CANONICAL_URL}#${getPodcastEpisodeAnchorId(episodeNumber)}`;

const parser = new Parser<Record<string, never>, PodcastFeedItem>({
  customFields: {
    item: [
      ["itunes:episode", "episodeNumber"],
      ["itunes:duration", "duration"],
      ["itunes:image", "itunesImage"],
    ],
  },
});

const decodeHtmlEntities = (value: string) =>
  value.replace(
    /&(#(\d+)|#x([\da-f]+)|amp|apos|quot|lt|gt);/gi,
    (entity, code, decimal, hexadecimal) => {
      if (decimal) return String.fromCodePoint(Number.parseInt(decimal, 10));
      if (hexadecimal)
        return String.fromCodePoint(Number.parseInt(hexadecimal, 16));

      const namedEntities: Record<string, string> = {
        amp: "&",
        apos: "'",
        quot: '"',
        lt: "<",
        gt: ">",
      };

      return namedEntities[code.toLowerCase()] ?? entity;
    },
  );

export const cleanPodcastText = (value: string) =>
  decodeHtmlEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replaceAll("—", ", ")
    .replaceAll("–", " - ")
    .replace(/\s+/g, " ")
    .trim();

const getSpotifyEmbedUrl = (spotifyUrl?: string) => {
  if (!spotifyUrl) return undefined;

  const episodeId = spotifyUrl.match(
    /open\.spotify\.com\/episode\/([^?]+)/,
  )?.[1];
  return episodeId
    ? `https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator`
    : undefined;
};

export const getYouTubeEmbedUrl = (youtubeUrl?: string) => {
  if (!youtubeUrl) return undefined;

  const videoId = new URL(youtubeUrl).searchParams.get("v");
  return videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}`
    : undefined;
};

export async function getPodcast(): Promise<Podcast> {
  const response = await fetch(PODCAST_RSS_URL, {
    headers: {
      "User-Agent": "benoror.com podcast page",
    },
    next: {
      revalidate: 21_600,
    },
  });

  if (!response.ok) {
    throw new Error(`Unable to load podcast RSS feed: ${response.status}`);
  }

  const feed = await parser.parseString(await response.text());
  const episodes = feed.items
    .map((item, index): PodcastEpisode | null => {
      if (!item.title || !item.pubDate) return null;

      const episodeNumber =
        item.episodeNumber?.trim() || String(feed.items.length - index);
      const links = {
        spotify: item.link,
        ...EPISODE_LINKS[episodeNumber],
      };

      return {
        id: item.guid || item.link || `${episodeNumber}-${item.title}`,
        episodeNumber,
        title: cleanPodcastText(item.title),
        description: cleanPodcastText(
          item.contentSnippet || item.content || "",
        ),
        publishedAt: new Date(item.pubDate).toISOString(),
        duration: item.duration?.trim(),
        image: item.itunesImage?.$?.href,
        links,
        spotifyEmbedUrl: getSpotifyEmbedUrl(links.spotify),
        youtubeEmbedUrl: getYouTubeEmbedUrl(links.youtube),
      };
    })
    .filter((episode): episode is PodcastEpisode => episode !== null)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

  return {
    title: cleanPodcastText(feed.title || "Pursuit of Polymathy"),
    coverImage: feed.itunes?.image || feed.image?.url || PODCAST_COVER_FALLBACK,
    episodes,
  };
}
