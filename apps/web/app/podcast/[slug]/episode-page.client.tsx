"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CirclePlay,
  Podcast as PodcastIcon,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import OutrunGrid from "@/components/outrun-hero-background";
import { useAppTheme } from "@/hooks/use-app-theme";
import {
  getPodcastEpisodePath,
  type PodcastEpisode,
} from "@/lib/podcast";
import { getClasses } from "../podcast-page.theme";

type EpisodeNavigationItem = Pick<PodcastEpisode, "slug" | "title">;

type EpisodePageClientProps = {
  episode: PodcastEpisode;
  previousEpisode?: EpisodeNavigationItem;
  nextEpisode?: EpisodeNavigationItem;
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

export function EpisodePageClient({
  episode,
  previousEpisode,
  nextEpisode,
}: EpisodePageClientProps) {
  const { themeKind } = useAppTheme();
  const classes = getClasses(themeKind);
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
            icon: PodcastIcon,
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
    <main className={`min-h-screen flex flex-col ${classes.page}`}>
      {classes.showOutrunGrid && <OutrunGrid />}
      <Navbar />

      <section className="pt-24 flex-1">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
          <div className={`${classes.panel} space-y-10`}>
            <Link
              href="/podcast"
              className={`inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 ${classes.link}`}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to all episodes
            </Link>

            <article className="space-y-10">
              <header className="space-y-5">
                <div
                  className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${classes.meta}`}
                >
                  <span className="font-semibold">
                    Episode {episode.episodeNumber}
                  </span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={episode.publishedAt}>
                    {dateFormatter.format(new Date(episode.publishedAt))}
                  </time>
                  {episode.duration ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{episode.duration.replace(/^00:/, "")}</span>
                    </>
                  ) : null}
                </div>
                <h1
                  className={`max-w-5xl text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl ${classes.heading} ${classes.headingAccent}`}
                >
                  {episode.title}
                </h1>
                <div className="flex flex-wrap gap-2.5">
                  {episodeLinks.map((link) => (
                    <PlatformLink
                      key={link.label}
                      {...link}
                      classes={classes}
                    />
                  ))}
                </div>
              </header>

              <section className="space-y-4">
                <h2
                  className={`text-2xl font-semibold tracking-tight ${classes.heading}`}
                >
                  Show notes
                </h2>
                <p
                  className={`max-w-5xl text-lg leading-relaxed ${classes.body}`}
                >
                  {episode.description}
                </p>
              </section>

              {episode.youtubeEmbedUrl || episode.spotifyEmbedUrl ? (
                <section className="space-y-6" aria-label="Episode players">
                  {episode.youtubeEmbedUrl ? (
                    <iframe
                      src={episode.youtubeEmbedUrl}
                      title={`${episode.title} on YouTube`}
                      width="100%"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="aspect-video w-full rounded-2xl border-0"
                    />
                  ) : null}
                  {episode.spotifyEmbedUrl ? (
                    <iframe
                      src={episode.spotifyEmbedUrl}
                      title={`${episode.title} on Spotify`}
                      width="100%"
                      height="352"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="w-full rounded-2xl border-0"
                    />
                  ) : null}
                </section>
              ) : null}
            </article>

            <nav
              aria-label="Episode navigation"
              className={`grid gap-3 border-t pt-6 sm:grid-cols-2 ${classes.meta}`}
            >
              <div>
                {previousEpisode ? (
                  <Link
                    href={getPodcastEpisodePath(previousEpisode.slug)}
                    className={`group inline-flex items-start gap-2 text-left ${classes.link}`}
                  >
                    <ArrowLeft
                      className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-xs uppercase tracking-wider">
                        Previous episode
                      </span>
                      <span className="font-medium">{previousEpisode.title}</span>
                    </span>
                  </Link>
                ) : null}
              </div>
              <div className="sm:text-right">
                {nextEpisode ? (
                  <Link
                    href={getPodcastEpisodePath(nextEpisode.slug)}
                    className={`group inline-flex items-start gap-2 text-left sm:text-right ${classes.link}`}
                  >
                    <span>
                      <span className="block text-xs uppercase tracking-wider">
                        Next episode
                      </span>
                      <span className="font-medium">{nextEpisode.title}</span>
                    </span>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                ) : null}
              </div>
            </nav>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
