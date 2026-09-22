import { IEducationEntry, ILanguageEntry, IResumeAbout, IResumeDocument, ISkill } from './schema.js';
import { gmailAlias } from '@workspace/utils/email';
import { PERSONAL } from '../shared/profile/index.js';
import { APPTEGY, BASEQL, BROKERLIT, COTIZAHOY, ECARESOFT, HEALTHTREE, NICMX, OPERIT, PANAX, SAP, TRIVELTA } from './roles.js';

const ABOUT: IResumeAbout = {
  name: PERSONAL.short_name,
  header: 'Hands-on Engineering Executive · VP Engineering / CTO · Product and Platform Builder',
  location: 'Monterrey, MX 🇲🇽',
  public_email: gmailAlias(PERSONAL.private_email, 'cv'),
  about_me: `Hands-on VP of Engineering and CTO with 15+ years building SaaS products and engineering organizations across the U.S. and Latin America. Led distributed organizations of 140+ engineers through hiring, manager development, performance management, organizational design, roadmap execution, and architectural change. Retain deep technical range across backend systems, cloud infrastructure, frontend delivery, product development, and AI. Currently lead three Backoffice teams while remaining directly involved in architecture and selected platform initiatives. Best suited to roles that require executive judgment, strong engineering management, and enough technical depth to challenge decisions and contribute when needed.`
};

const COMPANIES = [
  {
    name: 'Trivelta',
    url: 'https://trivelta.com/',
    location: 'Boston, MA 🇺🇸',
    startDate: 'Jan 2026',
    endDate: 'Present',
    description: 'B2B iGaming technology provider.',
    roles: TRIVELTA
  },
  {
    name: 'Apptegy',
    url: 'https://www.apptegy.com',
    location: 'Little Rock, AR 🇺🇸',
    remote: true,
    startDate: 'Mar 2020',
    endDate: 'Nov 2025',
    description: 'EdTech SaaS platform serving 6,000+ school districts and more than 10 million active users across the U.S. and Canada.',
    roles: APPTEGY,
  },
  {
    name: 'Brokerlit',
    url: 'https://www.brokerlit.com',
    location: 'Monterrey, MX 🇲🇽',
    startDate: '2023',
    endDate: 'Present',
    description: 'Real estate SaaS combining MLS, CMS, and CRM workflows for property management and inbound lead generation.',
    roles: BROKERLIT,
  },
  {
    name: 'BaseQL',
    url: 'https://www.baseql.com',
    location: 'Miami, FL 🇺🇸',
    startDate: '2020',
    endDate: '2024',
    description: `GraphQL access layer for cloud data in Airtable and Google Sheets. **Acquired in 2024.**`,
    roles: BASEQL,
  },
  {
    name: 'HealthTree',
    url: 'https://www.healthtree.org',
    location: 'Salt Lake City, UT 🇺🇸',
    startDate: 'Jan 2019',
    endDate: 'Mar 2020',
    description: 'Healthcare platform helping cancer patients, families, and caregivers identify treatment options and accelerate research.',
    roles: HEALTHTREE,
  },
  {
    name: 'Ecaresoft',
    url: 'https://www.ecaresoft.com',
    location: 'Austin, TX 🇺🇸',
    startDate: '2016',
    endDate: '2019',
    description: 'EHR and hospital information systems for healthcare providers in Latin America and the Middle East.',
    roles: ECARESOFT,
  },
  {
    short: true,
    name: 'Panax',
    url: 'https://panax.io',
    location: 'San Luis Potosi, MX 🇲🇽',
    startDate: '2014',
    endDate: '2016',
    description: 'Low-code tool for building business applications.',
    roles: PANAX,
  },
  {
    short: true,
    name: 'OperIT',
    url: 'https://www.servicesinit.com',
    location: 'San Luis Potosi, MX 🇲🇽',
    startDate: '2014',
    endDate: '2014',
    description: 'IT nearshoring consultancy services for U.S. companies',
    roles: OPERIT,
  },
  {
    short: true,
    name: 'SAP',
    url: 'https://www.sap.com',
    location: 'Walldorf, DE 🇩🇪',
    startDate: '2013',
    endDate: '2014',
    description: 'World\'s largest company of ERP software',
    roles: SAP,
  },
  {
    short: true,
    name: 'CotizaHoy',
    url: 'https://www.cotizahoy.com',
    location: 'San Luis Potosi, MX 🇲🇽',
    startDate: '2010',
    endDate: '2013',
    description: 'B2B startup for car manufacturing industry',
    roles: COTIZAHOY,
  },
  {
    short: true,
    name: 'NIC Mexico',
    url: 'https://www.nicmexico.mx',
    location: 'Monterrey, MX 🇲🇽',
    startDate: '2008',
    endDate: '2009',
    description: 'NIC organization for .mx top-level domains',
    roles: NICMX,
  },
];

const SKILLS: ISkill[] = [{
  name: 'Leadership',
  slug: 'leadership',
  order: 1,
  since: 2016,
  level: 100,
  description: 'Executive and technical leadership across organization design, team formation, talent development, strategy, architecture, and delivery.',
  subSkills: [{
    name: 'Technical Leadership',
    slug: 'technical-leadership',
    description: 'Technical direction from architecture and design review through sequencing, delivery quality, and engineer development.',
    subSkills: [
      { name: 'Project scope and sequencing' },
      { name: 'Delivery management' },
      { name: 'Ownership and accountability' },
      { name: 'System design and architecture' },
      { name: 'Code reviews' },
      { name: 'Mentoring and coaching' },
      { name: 'Agile methodologies' },
      { name: 'Roadmap planning' },
    ],
  }, {
    name: 'Strategic Planning',
    slug: 'strategic-planning',
    description: 'Pragmatic planning across product and engineering: tooling strategy, architecture choices, and execution plans tied to business outcomes.',
    subSkills: [
      { name: 'Tooling and AI enablement' },
      { name: 'Vendor and cost management' },
      { name: 'Build-versus-buy decisions' },
      { name: 'Team composition and organization design' },
      { name: 'Architecture and design reviews' },
      { name: 'RFC/RFD technical documentation' },
      { name: 'Product and Engineering alignment' },
      { name: 'Resource allocation' },
    ],
  }, {
    name: 'People Management',
    slug: 'management',
    description: 'Manager and engineer development through coaching, feedback, performance management, and clear accountability.',
    subSkills: [
      { name: 'Mentorship' },
      { name: 'Coaching' },
      { name: 'Performance reviews' },
      { name: 'Performance management' },
      { name: 'Conflict resolution' },
    ],
  }, {
    name: 'Recruitment',
    slug: 'recruitment',
    description: 'Built hiring processes, interview loops, and technical assessments while coaching interviewers and onboarding new hires.',
    subSkills: [
      { name: 'Talent sourcing' },
      { name: 'Hiring manager' },
      { name: 'Interviewing' },
      { name: 'Technical screening scripts/challenges' },
      { name: 'Interviewer coaching' },
      { name: 'Recruitment process' },
    ],
  }],
}, {
  name: 'Backend',
  slug: 'backend',
  order: 3,
  since: 2010,
  level: 100,
  description: 'Primary technical depth in backend systems, APIs, integrations, data access, background processing, and production performance.',
  subSkills: [{
    name: 'Ruby on Rails',
    slug: 'ruby-on-rails',
    description: 'Ruby on Rails experience since 2013 across APIs, admin platforms, integrations, high-traffic applications, and database-intensive systems.',
    subSkills: [
      { name: 'Rails 7' },
      { name: 'Sidekiq', description: 'Built Sidekiq workloads processing hundreds of thousands of jobs per day.' },
      { name: 'TDD' },
      { name: 'RSpec', description: 'Structured, maintainable test suites using clear contexts and reusable abstractions.' },
      { name: 'Capybara' },
    ],
  }, {
    name: 'Developing APIs',
    slug: 'apis',
    description: 'API design and delivery since 2015 across Rails and other backend frameworks.',
    subSkills: [
      { name: 'REST API' },
      { name: 'GraphQL' },
    ],
  }, {
    name: 'Serverless on AWS',
    slug: 'serverless-aws',
    description: 'Built backend services on AWS serverless stack for scalable, low-ops delivery.',
    subSkills: [
      { name: 'Python on AWS Lambda' },
      { name: 'DynamoDB' },
      { name: 'Amplify' },
      { name: 'Cognito' },
    ],
  }, {
    name: 'Databases',
    slug: 'databases',
    description: 'Relational and NoSQL data modeling, query analysis, and performance optimization for production systems.',
    subSkills: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'Redis' },
      { name: 'NoSQL' },
    ],
  }, {
    name: 'API integrations',
    slug: 'integrations',
    description: 'Internal and external integrations serving web, mobile, and service-to-service clients.',
    subSkills: [
      { name: 'REST' },
      { name: 'GraphQL' },
    ],
  }, {
    name: 'Other',
    slug: 'backend-other',
    description: 'Additional backend languages and infrastructure selected according to product and operational constraints.',
    subSkills: [
      { name: 'Node.js' },
      { name: 'Python' },
      { name: 'Kafka'},
      { name: 'Rust' },
      { name: 'Elixir' },
      { name: 'Shell' },
      { name: 'Search engines: Elasticsearch, Solr'},
      { name: 'Git'},
    ],
  }],
}, {
  name: 'Frontend',
  slug: 'frontend',
  order: 4,
  since: 2018,
  level: 90,
  description: 'Full-stack product delivery across modern web applications, admin tools, and server-rendered interfaces.',
  subSkills: [{
    name: 'React',
    slug: 'react',
    description: 'React experience since 2018 across single-page applications, server rendering, testing, and design systems.',
    subSkills: [
      { name: 'React Testing Library' },
      { name: 'Playwright' },
      { name: 'Storybook' },
      { name: 'Redux' },
      { name: 'Tailwind CSS' },
      { name: 'React Query' },
    ],
  }, {
    name: 'TypeScript',
    slug: 'typescript',
    description: 'Type-safe frontend and full-stack application development with TypeScript.',
    subSkills: [
    ],
  }, {
    name: 'JavaScript',
    slug: 'javascript',
    description: 'JavaScript experience from browser applications through Node.js services and modern TypeScript stacks.',
    subSkills: [
      { name: 'Node.js' },
      { name: 'Jest' },
    ],
  }, {
    name: 'Next.js',
    slug: 'next.js',
    description: 'Next.js applications using TypeScript, server rendering, authentication, and Vercel delivery.',
    subSkills: [
      { name: 'NextAuth' },
      { name: 'Vercel', url: 'https://vercel.com' },
    ],
  }, {
    name: 'Other',
    slug: 'frontend-other',
    description: '',
    subSkills: [
      { name: 'Hotwire and Stimulus'},
      { name: 'React Native' },
      { name: 'TailwindCSS' },
    ],
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
    description: 'Production systems on AWS across compute, storage, databases, serverless workloads, and Kubernetes.',
    subSkills: [
      { name: 'EKS' },
      { name: 'S3' },
      { name: 'EC2' },
      { name: 'RDS' },
      { name: 'Lambda' },
    ],
  }, {
    name: 'Docker',
    slug: 'docker',
    description: 'Containerized development and production workloads.',
    subSkills: [
    ],
  }, {
    name: 'Kubernetes',
    slug: 'kubernetes',
    description: 'Built and operated Kubernetes environments using GitOps practices.',
    subSkills: [
      { name: 'GitOPS - ArgoCD' },
      { name: 'Kustomize' },
      { name: 'Helm' },
    ],
  }, {
    name: 'Other',
    slug: 'devops-other',
    description: 'Infrastructure, deployment pipelines, observability, and production operations.',
    subSkills: [
      { name: 'Greenfield infrastructure setup' },
      { name: 'Terraform' },
      { name: 'CI/CD' },
      { name: 'CDN' },
      { name: 'Observability' },
      { name: 'Distributed systems' },
      { name: 'Cloudflare' },
      { name: 'Fly.io', url: 'https://fly.io' },
    ],
  }],
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
  ],
}, {
  name: 'AI',
  slug: 'ai',
  order: 6,
  since: 2023,
  level: 75,
  description: 'AI-assisted engineering, team enablement, and AI product development grounded in evaluation, security, reliability, and production constraints.',
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
    ],
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
    ],
  }, {
    name: 'Workflows',
    slug: 'ai-workflows',
    subSkills: [
      { name: 'Plan-first for complex tasks' },
      { name: 'Parallel exploration and execution' },
      { name: 'Verification-first loops (tests, checks, review)' },
      { name: 'Learn from mistakes via docs/rules updates' },
      { name: 'Automating repeatable workflows (skills/commands)' },
    ],
  }, {
    name: 'AI product features',
    slug: 'ai-product-features',
    subSkills: [
      { name: 'Chatbots' },
      { name: 'RAGs (Pinecone, pgvector)' },
      { name: 'Context tuning and prompt refinement' },
      { name: 'Security and privacy guardrails' },
    ],
  }],
}];

const EDUCATION: IEducationEntry[] = [{
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
}];

const LANGUAGES: ILanguageEntry[] = [
  { name: '🇪🇸 Spanish', level: 100, proficiency: 'Native' },
  { name: '🇬🇧 English', level: 100, proficiency: 'Fluent' },
  { name: '🇩🇪 German', level: 25, proficiency: 'Basic' },
];

export const BASE_RESUME_DOCUMENT: IResumeDocument = {
  about: ABOUT,
  companies: COMPANIES,
  skills: SKILLS,
  education: EDUCATION,
  languages: LANGUAGES,
};

export { ABOUT, COMPANIES, SKILLS, EDUCATION, LANGUAGES };
