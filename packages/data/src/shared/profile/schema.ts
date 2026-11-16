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
};

export type LinkEntry = {
  url: string;
  legend?: string;
};
