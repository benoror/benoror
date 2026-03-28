import { gmailAlias } from '@workspace/utils/email';
import type { FeedSource } from './types/feed.js';

export const PERSONAL = {
  full_name: "Benjamin Orozco Rios",
  short_name: 'Ben Orozco',
  private_email: 'benoror@gmail.com',
}

export const LINKS = {
  website_url: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.benoror.com",
  resume_url: process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://resume.benoror.com",
  feed_url: process.env.NODE_ENV === "development" ? "http://localhost:3000/feed.rss" : "https://www.benoror.com/feed.rss",
  github_url: "https://github.com/benoror",
  twitter_url: "https://twitter.com/benoror",
  linkedin_url: "https://linkedin.com/in/benoror",
  instagram_url: "https://instagram.com/benoror",
  goodreads_url: "https://goodreads.com/benoror",
  blog_url: "https://blog.benoror.com",
  bear_blog_url: "https://benoror.bearblog.dev",
  medium_url: "https://benoror.medium.com",
  blogspot_url: "https://benjiorozco.blogspot.com",
  pop_podcast_url: "https://benoror.bearblog.dev/pop-podcast",
  product_hunt_url: "https://producthunt.com/@benoror",
  stack_overflow_url: "https://stackoverflow.com/users/171809/ben-orozco",
}

export const FEED_SOURCES: FeedSource[] = [
  {
    id: "bear_blog",
    name: "Blog (Bear Blog)",
    site_url: LINKS.bear_blog_url,
    rss_url: "https://benoror.bearblog.dev/feed/?type=rss",
    status: "active",
  },
  {
    id: "medium",
    name: "Old Medium Blog (2016-2020)",
    site_url: LINKS.medium_url,
    rss_url: "https://medium.com/feed/@benoror",
    status: "active",
  },
  {
    id: "blogger",
    name: "Older Blogger Blog (2006-2016)",
    site_url: LINKS.blogspot_url,
    rss_url: "https://benjiorozco.blogspot.com/feeds/posts/default?alt=rss",
    status: "active",
  },
  {
    id: "gist_starred_own",
    name: "GitHub Gists (starred and authored by Ben)",
    site_url: "https://gist.github.com/benoror/starred",
    rss_url: "https://gist.github.com/benoror/starred.atom",
    status: "active",
    note: "Filtered to entries authored under the benoror namespace.",
  },
  {
    id: "x_likes_bookmarks",
    name: "X / Twitter (manual likes/bookmarks subset)",
    site_url: "https://x.com/benoror",
    status: "manual",
    note: "X does not provide an official public RSS for likes/bookmarks.",
  },
  {
    id: "linkedin_posts",
    name: "LinkedIn Posts (manual subset)",
    site_url: LINKS.linkedin_url,
    status: "manual",
    note: "LinkedIn does not provide an official public RSS endpoint for member posts.",
  },
  {
    id: "stack_overflow",
    name: "Stack Overflow Activity",
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
]

export const HOME = {
  title: PERSONAL.short_name,
  header: "Technologist, Software Engineer & Entrepreneur",
  public_email: gmailAlias(PERSONAL.private_email, 'homepage'),
  about_me: "I'm a Computer Science Engineer with a trajectory of building, working and growing Tech Startups, either bootstrapped, solo-maker and high-growth. I'm deeply passionate on making and launching software products, growing & leading engineering teams, and leveraging technology to tackle big real-world problems. I consider myself a technologist & pursuer of becoming a polymath in many areas I find interesting."
}

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
]

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
]