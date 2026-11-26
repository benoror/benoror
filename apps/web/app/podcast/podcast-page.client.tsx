"use client";

import Image from "next/image";
import {
  CirclePlay,
  Headphones,
  Music2,
  Podcast,
  Rss,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import OutrunGrid from "@/components/outrun-hero-background";
import { useAppTheme } from "@/hooks/use-app-theme";
import type { Podcast as PodcastData } from "@/lib/podcast";
import { getClasses } from "./podcast-page.theme";

type PodcastPlatforms = {
  spotify: string;
  apple: string;
  youtube: string;
  pocketCasts: string;
  rss: string;
};

type ListenLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "America/Los_Angeles",
});

function PlatformLink({
  href,
  label,
  icon: Icon,
  classes,
}: ListenLink & { classes: ReturnType<typeof getClasses> }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 ${classes.chip} ${classes.linkFocus}`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}

export function PodcastPageClient({
  podcast,
  platforms,
}: {
  podcast: PodcastData;
  platforms: PodcastPlatforms;
}) {
  const { themeKind } = useAppTheme();
  const classes = getClasses(themeKind);
  const listenLinks: ListenLink[] = [
    { label: "Spotify", href: platforms.spotify, icon: CirclePlay },
    { label: "Apple Podcasts", href: platforms.apple, icon: Podcast },
    { label: "YouTube", href: platforms.youtube, icon: Youtube },
    { label: "Pocket Casts", href: platforms.pocketCasts, icon: Headphones },
    { label: "RSS", href: platforms.rss, icon: Rss },
  ];

  return (
    <main className={`min-h-screen flex flex-col ${classes.page}`}>
      {classes.showOutrunGrid && <OutrunGrid />}
      <Navbar />

      <section className="pt-24 flex-1">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
          <div className={`${classes.panel} space-y-14 md:space-y-20`}>
            <div className="grid items-center gap-10 md:grid-cols-[minmax(240px,360px)_1fr] md:gap-14">
              <Image
                src={podcast.coverImage}
                alt="Pursuit of Polymathy podcast cover"
                width={700}
                height={700}
                priority
                className={`aspect-square w-full max-w-[360px] justify-self-center rounded-3xl object-cover ring-1 ${classes.coverRing}`}
              />

              <div className="space-y-6">
                <p
                  className={`text-sm font-semibold uppercase tracking-[0.2em] ${classes.meta}`}
                >
                  A podcast by Ben Orozco
                </p>
                <div className="space-y-4">
                  <h1
                    className={`text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl ${classes.heading} ${classes.headingAccent}`}
                  >
                    {podcast.title}
                  </h1>
                  <p
                    className={`max-w-3xl text-lg leading-relaxed md:text-xl ${classes.body}`}
                  >
                    Ideas at the intersections of software engineering,
                    startups, science, technology, economics, crypto, politics,
                    and history.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2
                    className={`text-sm font-semibold uppercase tracking-wider ${classes.meta}`}
                  >
                    Listen on
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {listenLinks.map((link) => (
                      <PlatformLink
                        key={link.label}
                        {...link}
                        classes={classes}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-end justify-between gap-4">
                <div className="space-y-2">
                  <p
                    className={`text-sm font-semibold uppercase tracking-[0.2em] ${classes.meta}`}
                  >
                    Season one
                  </p>
                  <h2
                    className={`text-3xl font-bold tracking-tight md:text-4xl ${classes.heading}`}
                  >
                    Episodes
                  </h2>
                </div>
                <Music2
                  className={`hidden h-8 w-8 sm:block ${classes.meta}`}
                  aria-hidden="true"
                />
              </div>

              <ol className="space-y-6">
                {podcast.episodes.map((episode) => {
                  const episodeLinks: ListenLink[] = [
                    ...(episode.links.spotify
                      ? [
                          {
                            label: "Spotify",
                            href: episode.links.spotify,
                            icon: CirclePlay,
                          },
                        ]
                      : []),
                    ...(episode.links.apple
                      ? [
                          {
                            label: "Apple Podcasts",
                            href: episode.links.apple,
                            icon: Podcast,
                          },
                        ]
                      : []),
                    ...(episode.links.youtube
                      ? [
                          {
                            label: "YouTube",
                            href: episode.links.youtube,
                            icon: Youtube,
                          },
                        ]
                      : []),
                  ];

                  return (
                    <li
                      key={episode.id}
                      className={`rounded-2xl border p-5 backdrop-blur-md sm:p-7 ${classes.card}`}
                    >
                      <article className="space-y-5">
                        <div className="space-y-3">
                          <div
                            className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${classes.meta}`}
                          >
                            <span className="font-semibold">
                              Episode {episode.episodeNumber}
                            </span>
                            <span aria-hidden="true">·</span>
                            <time dateTime={episode.publishedAt}>
                              {dateFormatter.format(
                                new Date(episode.publishedAt),
                              )}
                            </time>
                            {episode.duration ? (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>
                                  {episode.duration.replace(/^00:/, "")}
                                </span>
                              </>
                            ) : null}
                          </div>
                          <h3
                            className={`text-2xl font-semibold leading-tight tracking-tight ${classes.heading}`}
                          >
                            {episode.title}
                          </h3>
                          <p className={`leading-relaxed ${classes.body}`}>
                            {episode.description}
                          </p>
                        </div>

                        {episodeLinks.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {episodeLinks.map((link) => (
                              <PlatformLink
                                key={link.label}
                                {...link}
                                classes={classes}
                              />
                            ))}
                          </div>
                        ) : null}

                        {episode.youtubeEmbedUrl ||
                        episode.spotifyEmbedUrl ? (
                          <div className="grid items-start gap-3 md:grid-cols-[minmax(240px,36%)_1fr]">
                            {episode.youtubeEmbedUrl ? (
                              <iframe
                                src={episode.youtubeEmbedUrl}
                                title={`${episode.title} on YouTube`}
                                width="100%"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                                className="aspect-video w-full rounded-xl border-0"
                              />
                            ) : null}
                            {episode.spotifyEmbedUrl ? (
                              <iframe
                                src={episode.spotifyEmbedUrl}
                                title={`${episode.title} on Spotify`}
                                width="100%"
                                height="152"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                className="rounded-xl border-0"
                              />
                            ) : null}
                          </div>
                        ) : null}
                      </article>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
