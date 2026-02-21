import { ISkill } from '@workspace/data/types/resume';
import { gmailAlias } from '@workspace/utils/email';
import { PERSONAL } from '@workspace/data/personal';
import { APPTEGY, BROKERLIT, BASEQL, COTIZAHOY, ECARESOFT, HEALTHTREE, NICMX, OPERIT, PANAX, SAP } from '@workspace/data/resume/roles';

export const ABOUT = {
  name: PERSONAL.short_name,
  header: 'Hands-on Engineering Leader · Full Stack Developer · Product Builder',
  location: 'Monterrey, MX 🇲🇽',
  public_email: gmailAlias(PERSONAL.private_email, 'cv'),
  about_me: `Hands-on VP Eng/CTO with strong software engineering roots and technical generalist mindset with a trajectory across U.S. & LatAm. Product-minded builder with startup DNA, shipping and scaling products and teams from 0 to 1 and 1 to 100, staying close to code, architecture, product, UI/UX design and delivery across backend, frontend, infrastructure and AI. Experienced hiring manager and technical leader with high energy, ownership thriving in ambiguity, execution speed and strategic leadership enabling engineering orgs with practical AI tooling across agentic workflows.` // Looking for the next big challenge at the intersection of enterprise software & AI.
}

export const COMPANIES = [
  {
    name: 'Apptegy',
    url: 'https://www.apptegy.com',
    location: 'Little Rock, AR 🇺🇸',
    remote: true,
    startDate: '2020',
    endDate: 'Present (5yr)',
    description: 'Industry-leading EdTech SaaS company with 6,000+ school districts in the US & Canada and 10MM+ of active users.',
    roles: APPTEGY
  },
  {
    name: 'Brokerlit',
    url: 'https://www.brokerlit.com',
    location: 'Monterrey, MX 🇲🇽',
    startDate: '2023',
    endDate: 'Present',
    description: 'Real Estate SaaS providing an MLS, CMS & CRM platform for brokers to manage their properties and inbound leads generation.',
    roles: BROKERLIT
  },
  {
    name: 'BaseQL',
    url: 'https://www.baseql.com',
    location: 'Miami, FL 🇺🇸',
    startDate: '2020',
    endDate: '2024',
    description: `GraphQL access point for your Cloud data (Airtable & Google Sheets). 🎯 **Acquired in 2024**`,
    roles: BASEQL
  },
  {
    name: 'HealthTree',
    url: 'https://www.healthtree.org',
    location: 'Salt Lake City, UT 🇺🇸',
    startDate: 'Jan 2019',
    endDate: 'Mar 2020',
    description: 'Healthcare platform for cancer patients, their families and caregivers, with the mission of accelerating the finding of a cure',
    roles: HEALTHTREE
  },
  {
    name: 'Ecaresoft',
    url: 'https://www.ecaresoft.com',
    location: 'Austin, TX 🇺🇸',
    startDate: '2016',
    endDate: '2019',
    description: 'EHR & HIS systems for hospitals and clinics in Latin America and Middle East.',
    roles: ECARESOFT
  },
  {
    short: true,
    name: 'Panax',
    url: 'https://panax.io',
    location: 'San Luis Potosi, MX 🇲🇽',
    startDate: '2014',
    endDate: '2016',
    description: 'Low-code tool for building business applications.',
    roles: PANAX
  },
  {
    short: true,
    name: 'OperIT',
    url: 'https://www.servicesinit.com',
    location: 'San Luis Potosi, MX 🇲🇽',
    startDate: '2014',
    endDate: '2014',
    description: 'IT nearshoring consultancy services for U.S. companies',
    roles: OPERIT
  },
  {
    short: true,
    name: 'SAP',
    url: 'https://www.sap.com',
    location: 'Walldorf, DE 🇩🇪',
    startDate: '2013',
    endDate: '2014',
    description: 'World\'s largest company of ERP software',
    roles: SAP
  },
  {
    short: true,
    name: 'CotizaHoy',
    url: 'https://www.cotizahoy.com',
    location: 'San Luis Potosi, MX 🇲🇽',
    startDate: '2010',
    endDate: '2013',
    description: 'B2B startup for car manufacturing industry',
    roles: COTIZAHOY
  },
  {
    short: true,
    name: 'NIC Mexico',
    url: 'https://www.nicmexico.mx',
    location: 'Monterrey, MX 🇲🇽',
    startDate: '2008',
    endDate: '2009',
    description: 'NIC organization for .mx top-level domains',
    roles: NICMX
  }
]

export const SKILLS: ISkill[] = [{
  name: 'Leadership',
  slug: 'leadership',
  order: 1,
  since: 2016,
  level: 100,
  description: 'Hands-on technical leader and generalist: building teams, shipping products, and scaling delivery. Comfortable wearing multiple hats — from strategy & hiring to architecture & building',
  subSkills: [{
    name: 'Technical Leadership',
    slug: 'technical-leadership',
    description: 'Leading engineering teams end-to-end: technical direction, execution scope, sequencing, delivery quality, and mentoring.',
    subSkills: [
      { name: 'Project scope & sequencing' },
      { name: 'Delivery management' },
      { name: 'Ownership & Accountability' },
      { name: 'System Design Architecture' },
      { name: 'Code reviews' },
      { name: 'Mentoring & Coaching' },
      { name: 'Agile Methodologies' },
      { name: 'Roadmaps Planning' },
    ]
  }, {
    name: 'Strategic Planning',
    slug: 'strategic-planning',
    description: 'Pragmatic planning across product and engineering: tooling strategy, architecture choices, and execution plans tied to business outcomes.',
    subSkills: [
      { name: 'Tooling & AI enablement' },
      { name: 'Vendor & cost management' },
      { name: 'Buy vs Build decisions' },
      { name: 'Team composition & org design' },
      { name: 'Architecture & design reviews' },
      { name: 'RFC/RFD technical documentation' },
      { name: 'Product + Engineering leadership alignment' },
      { name: 'Resource allocation' },
    ]
  }, {
    name: 'People Management',
    slug: 'management',
    description: 'VP-level people-first team & manager development: coaching, performance, feedback, and building healthy high-output teams.',
    subSkills: [
      { name: 'Mentorship' },
      { name: 'Coaching' },
      { name: 'Performance reviews' },
      { name: 'Performance management' },
      { name: 'Conflict resolution' },
    ]
  }, {
    name: 'Recruitment',
    slug: 'recruitment',
    description: 'Hiring manager experience: building interview loops, running technical screens, and coaching interviewers/candidates.',
    subSkills: [
      { name: 'Talent sourcing' },
      { name: 'Hiring manager' },
      { name: 'Interviewing' },
      { name: 'Technical screening scripts/challenges' },
      { name: 'Interviewer coaching' },
      { name: 'Recruitment process' },
    ]
  }]
}, {
  name: 'Backend',
  slug: 'backend',
  order: 3,
  since: 2010,
  level: 100,
  description: 'Backend development is my primary area of expertise, and I have created multiple applications, APIs, and integrations.',
  subSkills: [{
    name: 'Ruby on Rails',
    slug: 'ruby-on-rails',
    description: 'I have worked with Ruby on Rails since 2013, building and maintaining numerous applications. Including those with large databases where efficient SQL queries are crucial. My experience includes implementing APIs, admin panels, integrating APIs, and optimising high-traffic applications.',
    subSkills: [
      { name: 'Rails 7' },
      { name: 'Sidekiq', description: "I have implemented Sidekiq clusters handling hundreds of thousands of jobs a day." },
      { name: 'TDD' },
      { name: 'RSpec', description: "I write well-structured, easy-to-read and performant tests using contexts and abstractions." },
      { name: 'Capybara' },
    ],
  }, {
    name: 'Developing APIs',
    slug: 'apis',
    description: "Since 2015, I have been developing APIs. I've built multiple applications using Ruby on Rails as well as other frameworks.",
    subSkills: [
      { name: 'REST API' },
      { name: 'GraphQL' },
    ]
  }, {
    name: 'Serverless on AWS',
    slug: 'serverless-aws',
    description: 'Built backend services on AWS serverless stack for scalable, low-ops delivery.',
    subSkills: [
      { name: 'Python on AWS Lambda' },
      { name: 'DynamoDB' },
      { name: 'Amplify' },
      { name: 'Cognito' },
    ]
  }, {
    name: 'Databases',
    slug: 'databases',
    description: 'I have worked with many different kinds of databases. Most Ruby on Rails performance issues stem from inefficient database queries. I have extensive experience in identifying and optimizing these issues.',
    subSkills: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'Redis' },
      { name: 'NoSQL' },
    ]
  }, {
    name: 'API integrations',
    slug: 'integrations',
    description: 'I developed multiple APIs that were consumed by frontend, mobile apps and other services.',
    subSkills: [
      { name: 'REST' },
      { name: 'GraphQL' },
    ]
  }, {
    name: 'Other',
    slug: 'backend-other',
    description: 'I like experimenting with different technologies and frameworks to find the best tool for the job.',
    subSkills: [
      { name: 'Node.js' },
      { name: 'Python' },
      { name: 'Kafka'},
      { name: 'Rust' },
      { name: 'Elixir' },
      { name: 'Shell' },
      { name: 'Search engines - ElasticSearch, Solr'},
      { name: 'Git'},
    ]
  }],
}, {
  name: 'Frontend',
  slug: 'frontend',
  order: 4,
  since: 2018,
  level: 90,
  description: 'I have been working with React since 2018. Created multiple applications and websites.',
  subSkills: [{
    name: 'React',
    slug: 'react',
    description: 'I have been working with React since 2018. I have created several applications using React. SPA applications with SSR.',
    subSkills: [
      { name: 'React Testing Library' },
      { name: 'Playwright' },
      { name: 'Storybook' },
      { name: 'Redux' },
      { name: 'Tailwind CSS' },
      { name: 'React Query' },
    ]
  }, {
    name: 'Typescript',
    slug: 'typescript',
    description: 'I created a complex frontend application using Typescript and Next.js. I use Typescript in all my javascript projects.',
    subSkills: [
    ]
  }, {
    name: 'Javascript',
    slug: 'javascript',
    description: 'Javascript was always a part of my work. From simple jQuery scripts, through ES6, to using it with Typescript in Next.js applications and Express.js APIs.',
    subSkills: [
      { name: 'Node.js' },
      { name: 'Jest' },
    ]
  }, {
    name: 'Next.js',
    slug: 'next.js',
    description: 'I created a complex frontend application using Next.js and Typescript. Next.js is my go to framework for frontend applications.',
    subSkills: [
      { name: 'NextAuth' },
      { name: 'Vercel', url: 'https://vercel.com' },
    ]
  }, {
    name: 'Other',
    slug: 'frontend-other',
    description: '',
    subSkills: [
      { name: 'Hotwire & Stimulus'},
      { name: 'React Native' },
      { name: 'TailwindCSS' },
    ]
  }],
}, {
  name: 'DevOps',
  slug: 'devops',
  order: 5,
  level: 80,
  since: 2019,
  description: 'Building and evolving infrastructure from scratch: CI/CD, cloud environments, reliability, and developer workflows.',
  subSkills: [{
    name: 'AWS',
    slug: 'aws',
    description: "I've hosted websites and Kuberentes clusters using AWS",
    subSkills: [
      { name: 'EKS' },
      { name: 'S3' },
      { name: 'EC2' },
      { name: 'RDS' },
      { name: 'Lambda' },
      { name: 'Cloudflare' },
    ]
  }, {
    name: 'Docker',
    slug: 'docker',
    description: "I use Docker on a daily basis in development and production environments.",
    subSkills: [
    ]
  }, {
    name: 'Kubernetes',
    slug: 'kubernetes',
    description: 'I have set up and maintained multiple Kubernetes clusters from scratch utilizing GitOps principles.',
    subSkills: [
      { name: 'GitOPS - ArgoCD' },
      { name: 'Kustomize' },
      { name: 'Helm' },
    ]
  }, {
    name: 'Other',
    slug: 'devops-other',
    description: 'I have managed infrastructure and deployment pipelines since early in my career.',
    subSkills: [
      { name: 'Greenfield infrastructure setup' },
      { name: 'Terraform' },
      { name: 'CI/CD' },
      { name: 'CDN' },
      { name: 'Observability' },
      { name: 'Distributed systems' },
      { name: 'Fly.io', url: 'https://fly.io' },
    ]
  }]
}, {
  name: 'Product',
  slug: 'product',
  order: 2,
  since: 2016,
  level: 100,
  description: 'Product-minded engineering leadership: balancing UX, technical constraints, and business outcomes.',
  subSkills: [
    { name: 'Roadmap planning' },
    { name: 'Resource allocation' },
    { name: 'Design reviews' },
    { name: 'UI/UX assessment' },
    { name: 'Problem solving with business focus' },
    { name: 'Project management' },
  ]
}, {
  name: 'AI',
  slug: 'ai',
  order: 6,
  since: 2023,
  level: 75,
  description: 'Hands-on with AI-assisted engineering and AI product delivery: agent workflows, team adoption, and production-oriented experimentation.',
  subSkills: [{
    name: 'AI tools',
    slug: 'ai-tools',
    subSkills: [
      { name: 'Cursor / CLI', url: 'https://cursor.com' },
      { name: 'Claude / Code CLI', url: 'https://claude.ai' },
      { name: 'OpenCode', url: 'https://opencode.ai' },
      { name: 'OpenAI / API', url: 'https://openai.com' },
      { name: 'Gemini', url: 'https://gemini.google.com' },
      { name: 'CodeRabbit', url: 'https://coderabbit.ai' },
    ]
  }, {
    name: 'Multi-agent orchestration',
    slug: 'multi-agent-orchestration',
    subSkills: [
      { name: 'AGENTS.md / CLAUDE.md / .cursor/rules' },
      { name: 'Git worktrees' },
      { name: 'MCP / ACP' },
      { name: 'Agent Skills' },
      { name: 'Parallel agents' },
      { name: 'QMD workflows' },
    ]
  }, {
    name: 'Workflows',
    slug: 'ai-workflows',
    subSkills: [
      { name: 'Plan-first for complex tasks' },
      { name: 'Parallel exploration and execution' },
      { name: 'Verification-first loops (tests, checks, review)' },
      { name: 'Learn from mistakes via docs/rules updates' },
      { name: 'Automating repeatable workflows (skills/commands)' },
    ]
  }, {
    name: 'AI product features',
    slug: 'ai-product-features',
    subSkills: [
      { name: 'Chatbots' },
      { name: 'RAGs (Pinecone, pgvector)' },
      { name: 'Context tuning & prompt refinement' },
      { name: 'Security and privacy guardrails' },
    ]
  }]
}]

export const EDUCATION = [{
  institution: 'Hochschule Offenburg',
  institutionUrl: 'https://www.hs-offenburg.de/',
  location: 'Offenburg, Germany',
  title: 'MBA International Business Consulting',
  description: 'University of Applied Sciences Offenburg',
  startDate: 'Oct 2012',
  endDate: 'Feb 2014',
}, {
  institution: 'ITESM Monterrey',
  institutionUrl: 'https://tec.mx/en',
  location: 'Monterrey, Mexico',
  title: 'BS Computer Science and Technology',
  description: 'Monterrey Institute of Technology and Higher Education',
  startDate: 'Aug 2005',
  endDate: 'Dec 2009',
}]

export const LANGUAGES = [
  { name: '🇪🇸 Spanish', level: 100, proficiency: 'Native' },
  { name: '🇬🇧 English', level: 100, proficiency: 'Fluent' },
  { name: '🇩🇪 German', level: 25, proficiency: 'Basic' },
]