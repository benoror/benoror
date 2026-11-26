import type { Metadata } from "next";
import {
  PODCAST_CANONICAL_URL,
  PODCAST_COVER_FALLBACK,
  PODCAST_PLATFORMS,
  PODCAST_RSS_URL,
  getPodcast,
  getPodcastEpisodeAnchorId,
  getPodcastEpisodePath,
} from "@/lib/podcast";
import { PodcastPageClient } from "./podcast-page.client";

const description =
  "Pursuit of Polymathy is Ben Orozco's podcast about ideas across software engineering, startups, science, technology, economics, and history.";

export const metadata: Metadata = {
  title: "Pursuit of Polymathy Podcast | Ben Orozco",
  description,
  alternates: {
    canonical: PODCAST_CANONICAL_URL,
    types: {
      "application/rss+xml": [
        {
          url: PODCAST_RSS_URL,
          title: "Pursuit of Polymathy",
        },
      ],
    },
  },
  openGraph: {
    type: "website",
    url: PODCAST_CANONICAL_URL,
    title: "Pursuit of Polymathy Podcast | Ben Orozco",
    description,
    siteName: "Ben Orozco",
    images: [
      {
        url: PODCAST_COVER_FALLBACK,
        width: 1400,
        height: 1400,
        alt: "Pursuit of Polymathy podcast cover",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Pursuit of Polymathy Podcast | Ben Orozco",
    description,
    images: [PODCAST_COVER_FALLBACK],
  },
};

export const revalidate = 21_600;

const EPISODES_PER_PAGE = 6;

type PodcastPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

const toPositiveInt = (value: string | undefined): number | null => {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return null;
  return parsed;
};

export default async function PodcastPage({
  searchParams,
}: PodcastPageProps) {
  const podcast = await getPodcast();
  const resolvedSearchParams = await searchParams;
  const requestedPage = toPositiveInt(resolvedSearchParams?.page) ?? 1;
  const totalPages = Math.max(
    1,
    Math.ceil(podcast.episodes.length / EPISODES_PER_PAGE),
  );
  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * EPISODES_PER_PAGE;
  const endIndex = startIndex + EPISODES_PER_PAGE;
  const legacyEpisodeLinks = Object.fromEntries(
    podcast.episodes.map((episode) => [
      getPodcastEpisodeAnchorId(episode.episodeNumber),
      getPodcastEpisodePath(episode.slug),
    ]),
  );

  return (
    <PodcastPageClient
      podcast={{
        ...podcast,
        episodes: podcast.episodes.slice(startIndex, endIndex),
      }}
      platforms={PODCAST_PLATFORMS}
      pagination={{
        currentPage,
        totalPages,
        totalItems: podcast.episodes.length,
      }}
      legacyEpisodeLinks={legacyEpisodeLinks}
    />
  );
}
