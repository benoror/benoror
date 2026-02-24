import { gmailAlias } from '@workspace/utils/email';

export const PERSONAL = {
  full_name: "Benjamin Orozco Rios",
  short_name: 'Ben Orozco',
  private_email: 'benoror@gmail.com',
}

export const LINKS = {
  website_url: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.benoror.com",
  resume_url: process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://resume.benoror.com",
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