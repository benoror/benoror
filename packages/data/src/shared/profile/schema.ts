export type FeedSourceStatus = "active" | "manual" | "private";

export type FeedSource = {
  id: string;
  name: string;
  site_url: string;
  rss_url?: string;
  manual_items?: SocialPost[];
  status: FeedSourceStatus;
  note?: string;
};

export type SocialPostPlatform = "x" | "linkedin";

export type SocialPost = {
  date: string;
  platform: SocialPostPlatform;
  url: string;
  title: string;
  alsoOn: string[];
  /** Pins a social post as its own feed item. Only `true` is allowed. */
  featured?: true;
};

export type LinkEntry = {
  url: string;
  legend?: string;
};
