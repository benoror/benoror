import { gmailAlias } from '@workspace/utils/email';
import type { FeedSource, LinkEntry } from './schema.js';
import { SOCIAL_POSTS } from './social-posts.js';

const isProductionDeployment =
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL === "1" ||
  process.env.VERCEL_ENV === "production" ||
  process.env.DEPLOYMENT_ENV === "production";

export const PERSONAL = {
  full_name: "Benjamin Orozco Rios",
  short_name: 'Ben Orozco',
  private_email: 'benoror@gmail.com',
};

export const LINKS = {
  website: {
    url: isProductionDeployment ? "https://www.benoror.com" : "http://localhost:3000",
    legend: "Website",
  },
  portfolio: {
    url: isProductionDeployment ? "https://portfolio.benoror.com" : "http://localhost:3000/portfolio",
    legend: "Portfolio",
  },
  resume: {
    url: isProductionDeployment ? "https://resume.benoror.com" : "http://localhost:3001",
    legend: "Resume",
  },
  cv: {
    url: isProductionDeployment ? "https://cv.benoror.com" : "http://localhost:3001",
    legend: "CV",
  },
  resume_pdf: {
    url: isProductionDeployment
      ? "https://resume.benoror.com/Ben%20Orozco%20-%20Resume.pdf"
      : "http://localhost:3001/Ben%20Orozco%20-%20Resume.pdf",
    legend: "Resume (PDF)",
  },
  resume_markdown: {
    url: isProductionDeployment ? "https://resume.benoror.com/resume.md" : "http://localhost:3001/resume.md",
    legend: "Resume (Markdown)",
  },
  notes: {
    url: isProductionDeployment ? "https://notes.benoror.com" : "http://localhost:3002",
    legend: "Obsidian Notes",
  },
  blog: {
    url: "https://blog.benoror.com",
    legend: "Blog",
  },
  bear_blog: {
    url: "https://benoror.bearblog.dev",
  },
  feed: {
    url: isProductionDeployment ? "https://feed.benoror.com/feed.rss" : "http://localhost:3000/feed.rss",
    legend: "RSS Feed",
  },
  feed_page: {
    url: isProductionDeployment ? "https://feed.benoror.com" : "http://localhost:3000/feed",
    legend: "Activity Feed",
  },
  dotfiles: {
    url: "https://dotfiles.benoror.com",
    legend: "Dotfiles",
  },
  github: {
    url: "https://github.com/benoror",
    legend: "GitHub",
  },
  twitter: {
    url: "https://twitter.com/benoror",
    legend: "X / Twitter",
  },
  linkedin: {
    url: "https://linkedin.com/in/benoror",
    legend: "LinkedIn",
  },
  instagram: {
    url: "https://instagram.com/benoror",
  },
  bluesky: {
    url: "https://bsky.app/profile/benoror.bsky.social",
    legend: "Bluesky",
  },
  goodreads: {
    url: "https://goodreads.com/benoror",
  },
  medium: {
    url: "https://benoror.medium.com",
  },
  blogspot: {
    url: "https://benjiorozco.blogspot.com",
  },
  pop_podcast: {
    url: isProductionDeployment
      ? "https://podcast.benoror.com"
      : "http://localhost:3000/podcast",
    legend: "Pursuit of Polymathy Podcast",
  },
  product_hunt: {
    url: "https://producthunt.com/@benoror",
  },
  stack_overflow: {
    url: "https://stackoverflow.com/users/171809/ben-orozco",
  },
} satisfies Record<string, LinkEntry>;

export const FEED_SOURCES: FeedSource[] = [
  {
    id: "bear_blog",
    name: "Blog",
    site_url: LINKS.bear_blog.url,
    rss_url: "https://benoror.bearblog.dev/feed/?type=rss",
    status: "active",
  },
  {
    id: "notes",
    name: "Obsidian Notes",
    site_url: LINKS.notes.url,
    rss_url: `${LINKS.notes.url}/index.xml`,
    status: "active",
    note: "Quartz RSS feed for published notes.",
  },
  {
    id: "medium",
    name: "Medium",
    site_url: LINKS.medium.url,
    rss_url: "https://medium.com/feed/@benoror",
    status: "active",
  },
  {
    id: "blogger",
    name: "Blogger",
    site_url: LINKS.blogspot.url,
    rss_url: "https://benjiorozco.blogspot.com/feeds/posts/default?alt=rss",
    status: "active",
  },
  {
    id: "gist_starred_own",
    name: "Gists",
    site_url: "https://gist.github.com/benoror/starred",
    rss_url: "https://gist.github.com/benoror/starred.atom",
    status: "active",
    note: "Filtered to entries authored under the benoror namespace.",
  },
  {
    id: "x_posts",
    name: "X",
    site_url: "https://x.com/benoror",
    manual_items: SOCIAL_POSTS.filter((post) => post.platform === "x"),
    status: "manual",
    note: "Hand-curated posts; X does not provide an official public RSS for this feed.",
  },
  {
    id: "bluesky_posts",
    name: "Bluesky",
    site_url: LINKS.bluesky.url,
    status: "active",
    note: "Public author feed from Bluesky API (excluding replies and reposts).",
  },
  {
    id: "linkedin_posts",
    name: "LinkedIn",
    site_url: LINKS.linkedin.url,
    manual_items: SOCIAL_POSTS.filter((post) => post.platform === "linkedin"),
    status: "manual",
    note: "Hand-curated posts; LinkedIn does not provide an official public RSS endpoint for member posts.",
  },
  {
    id: "stack_overflow",
    name: "Stack Overflow",
    site_url: "https://stackoverflow.com/users/171809/ben-orozco?tab=questions&sort=votes",
    rss_url: "https://stackoverflow.com/feeds/user/171809",
    status: "active",
    note: "Public Stack Overflow user feed (recent activity).",
  },
  {
    id: "pocketcasts_starred",
    name: "Pocket Casts Starred",
    site_url: "https://pocketcasts.com/starred",
    status: "private",
    note: "Pocket Casts starred items are account-scoped and not publicly exposed via RSS.",
  },
];

export const HOME = {
  title: PERSONAL.short_name,
  header: "Technologist, Software Engineer & Entrepreneur",
  public_email: "hello@benoror.com",
  about_me: "I've spent 15+ years building software products and the teams behind them, from bootstrapped startups to growth-stage platforms. As VP of Engineering at Apptegy I helped scale a distributed org of 140+ engineers across the US and Mexico through Series C and led the org-wide rollout of AI-assisted engineering. Earlier, I served as CTO at HealthTree and Ecaresoft (Nimbo) and founded BaseQL, a developer tool acquired in 2024. Today I lead engineering teams while staying hands-on with code and architecture around agentic workflows, Ruby on Rails, TypeScript, and Python on AWS and Kubernetes.",
};

export const SKILLS = [
  { name: 'Technical Leadership', slug: 'technical-leadership' },
  { name: 'Management', slug: 'management' },
  { name: 'AI-Assisted Engineering', slug: 'ai-tools' },
  { name: 'Agentic Workflows', slug: 'multi-agent-orchestration' },
  { name: 'Full-stack Development', slug: 'backend' },
  { name: 'Systems Design', slug: 'technical-leadership' },
  { name: 'Backend Architecture', slug: 'backend' },
  { name: 'Frontend UI/UX', slug: 'frontend' },
  { name: 'Product & UX', slug: 'product' },
  { name: 'DevOps Infrastructure', slug: 'devops' },
];

export const INTERESTS = [
  "Building & Shipping Products",
  "Software Engineering Craft",
  "Engineering Leadership & Culture",
  "Startups and Entrepreneurship",
  "Artificial Intelligence",
  "Open Source & Dev Tools",
  "Books, Podcasts & Writing",
  "Crypto & Decentralized Systems",
  "Science, Sci-Fi, and History",
  "Technology, Business & Economics",
];

export { SOCIAL_POSTS, type FeedSource, type LinkEntry };
export type { SocialPost, SocialPostPlatform } from "./schema.js";
