export type FeedSourceStatus = "active" | "manual" | "private";

export type FeedSource = {
  id: string;
  name: string;
  site_url: string;
  rss_url?: string;
  status: FeedSourceStatus;
  note?: string;
};

export type LinkEntry = {
  url: string;
  legend?: string;
};
