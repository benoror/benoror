export type FeedPlatform =
  | "x"
  | "bluesky"
  | "bear"
  | "linkedin"
  | "notes"
  | "medium"
  | "blogger"
  | "stackoverflow"
  | "gist"
  | "github"
  | "podcast"
  | "spotify"
  | "apple_podcasts"
  | "youtube"
  | "unknown"

export type FeedPlatformInput = {
  platform?: string
  sourceId?: string
  sourceName?: string
  url?: string
  sourceUrl?: string
}

const PLATFORM_ALIASES: Record<string, FeedPlatform> = {
  x: "x",
  twitter: "x",
  x_posts: "x",
  bluesky: "bluesky",
  bluesky_posts: "bluesky",
  bear: "bear",
  bear_blog: "bear",
  blog: "bear",
  linkedin: "linkedin",
  linkedin_posts: "linkedin",
  notes: "notes",
  obsidian: "notes",
  obsidian_notes: "notes",
  medium: "medium",
  blogger: "blogger",
  blogspot: "blogger",
  stack_overflow: "stackoverflow",
  stackoverflow: "stackoverflow",
  gist: "gist",
  gists: "gist",
  gist_starred_own: "gist",
  github: "github",
  podcast: "podcast",
  spotify: "spotify",
  apple: "apple_podcasts",
  apple_podcasts: "apple_podcasts",
  youtube: "youtube",
}

const normalizePlatformHint = (value: string | undefined): FeedPlatform | undefined => {
  if (!value) return undefined
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
  return PLATFORM_ALIASES[normalized]
}

const getHostname = (value: string | undefined): string | undefined => {
  if (!value) return undefined

  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
    return new URL(withProtocol).hostname.toLowerCase().replace(/^www\./, "")
  } catch {
    return undefined
  }
}

const platformFromHostname = (hostname: string | undefined): FeedPlatform | undefined => {
  if (!hostname) return undefined
  if (hostname === "x.com" || hostname === "twitter.com") return "x"
  if (hostname === "bsky.app") return "bluesky"
  if (hostname === "bearblog.dev" || hostname.endsWith(".bearblog.dev")) return "bear"
  if (hostname === "linkedin.com" || hostname.endsWith(".linkedin.com")) return "linkedin"
  if (hostname === "notes.benoror.com") return "notes"
  if (hostname === "medium.com" || hostname.endsWith(".medium.com")) return "medium"
  if (hostname === "blogger.com" || hostname.endsWith(".blogger.com") || hostname.endsWith(".blogspot.com")) {
    return "blogger"
  }
  if (hostname === "stackoverflow.com" || hostname.endsWith(".stackoverflow.com")) return "stackoverflow"
  if (hostname === "gist.github.com") return "gist"
  if (hostname === "github.com" || hostname.endsWith(".github.com")) return "github"
  if (hostname === "podcasters.spotify.com" || hostname === "anchor.fm") return "podcast"
  if (hostname === "open.spotify.com") return "spotify"
  if (hostname === "podcasts.apple.com") return "apple_podcasts"
  if (hostname === "youtube.com" || hostname.endsWith(".youtube.com") || hostname === "youtu.be") return "youtube"
  return undefined
}

export const detectFeedPlatform = ({
  platform,
  sourceId,
  sourceName,
  url,
  sourceUrl,
}: FeedPlatformInput): FeedPlatform =>
  normalizePlatformHint(platform) ??
  normalizePlatformHint(sourceId) ??
  platformFromHostname(getHostname(url)) ??
  platformFromHostname(getHostname(sourceUrl)) ??
  normalizePlatformHint(sourceName) ??
  "unknown"

export const PLATFORM_LABELS: Record<FeedPlatform, string> = {
  x: "X",
  bluesky: "Bluesky",
  bear: "Bear Blog",
  linkedin: "LinkedIn",
  notes: "Notes",
  medium: "Medium",
  blogger: "Blogger",
  stackoverflow: "Stack Overflow",
  gist: "GitHub Gist",
  github: "GitHub",
  podcast: "Podcast",
  spotify: "Spotify",
  apple_podcasts: "Apple Podcasts",
  youtube: "YouTube",
  unknown: "External link",
}

export const getFeedPlatformLabel = (input: FeedPlatformInput): string => PLATFORM_LABELS[detectFeedPlatform(input)]

export const getFeedPlatformDescriptor = (input: FeedPlatformInput): { platform: FeedPlatform; label: string } => {
  const platform = detectFeedPlatform(input)
  return {
    platform,
    label: platform === "unknown" ? input.sourceName || PLATFORM_LABELS.unknown : PLATFORM_LABELS[platform],
  }
}
