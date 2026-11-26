import type { Metadata } from "next";
import {
  PODCAST_CANONICAL_URL,
  PODCAST_COVER_FALLBACK,
  PODCAST_PLATFORMS,
  PODCAST_RSS_URL,
  getPodcast,
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

export default async function PodcastPage() {
  const podcast = await getPodcast();

  return <PodcastPageClient podcast={podcast} platforms={PODCAST_PLATFORMS} />;
}
