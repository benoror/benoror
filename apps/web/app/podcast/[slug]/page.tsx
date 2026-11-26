import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPodcast,
  getPodcastEpisodeUrl,
  PODCAST_RSS_URL,
} from "@/lib/podcast";
import { EpisodePageClient } from "./episode-page.client";

type EpisodePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 21_600;

export async function generateStaticParams() {
  const podcast = await getPodcast();
  return podcast.episodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({
  params,
}: EpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const podcast = await getPodcast();
  const episode = podcast.episodes.find((item) => item.slug === slug);

  if (!episode) {
    return {
      title: "Podcast episode not found | Ben Orozco",
    };
  }

  const canonicalUrl = getPodcastEpisodeUrl(episode.slug);
  const image = episode.image || podcast.coverImage;

  return {
    title: `${episode.title} | Pursuit of Polymathy`,
    description: episode.description,
    alternates: {
      canonical: canonicalUrl,
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
      type: "article",
      url: canonicalUrl,
      title: episode.title,
      description: episode.description,
      siteName: "Ben Orozco",
      publishedTime: episode.publishedAt,
      images: [
        {
          url: image,
          alt: `${episode.title} episode cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: episode.title,
      description: episode.description,
      images: [image],
    },
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const podcast = await getPodcast();
  const episodeIndex = podcast.episodes.findIndex(
    (episode) => episode.slug === slug,
  );

  if (episodeIndex < 0) {
    notFound();
  }

  const episode = podcast.episodes[episodeIndex];
  if (!episode) {
    notFound();
  }

  return (
    <EpisodePageClient
      episode={episode}
      previousEpisode={podcast.episodes[episodeIndex + 1]}
      nextEpisode={podcast.episodes[episodeIndex - 1]}
    />
  );
}
