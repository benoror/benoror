import type { IResumeVariantDefinition } from '../schema.js';
import { getBaseVariantCompany, getBaseVariantRole, getBaseVariantSkill } from './utils.js';

const trivelta = getBaseVariantCompany('Trivelta');
const apptegy = getBaseVariantCompany('Apptegy');
const ecaresoft = getBaseVariantCompany('Ecaresoft');
const healthTree = getBaseVariantCompany('HealthTree');
const brokerlit = getBaseVariantCompany('Brokerlit');
const baseql = getBaseVariantCompany('BaseQL');

const triveltaLeadRole = getBaseVariantRole(trivelta, 0);
const apptegyVpRole = getBaseVariantRole(apptegy, 0);
const apptegyLeadRole = getBaseVariantRole(apptegy, 1);
const ecaresoftIntlCtoRole = getBaseVariantRole(ecaresoft, 0);
const ecaresoftNimboCtoRole = getBaseVariantRole(ecaresoft, 1);
const ecaresoftNebulaLeadRole = getBaseVariantRole(ecaresoft, 2);
const healthTreeCtoRole = getBaseVariantRole(healthTree, 0);
const brokerlitFounderRole = getBaseVariantRole(brokerlit, 0);
const baseqlFounderRole = getBaseVariantRole(baseql, 0);

export const saleshoodTechLeadVariant: IResumeVariantDefinition = {
  slug: 'saleshood-tech-lead',
  label: 'Tech Lead · Full-Stack / Backend',
  metadata: {
    title: 'Ben Orozco - Senior Full-Stack Engineer / Tech Lead',
    description:
      'Tailored resume and cover letter for a hands-on senior full-stack / tech lead role focused on Rails-depth backend systems, search and content processing, and AI-assisted product work.',
  },
  resume: {
    about: {
      header: 'Senior Full-Stack Engineer · Hands-on Tech Lead · Ruby on Rails / React / TypeScript',
      about_me:
        'Hands-on senior engineer and tech lead with 15+ years building and operating web applications across U.S. and LatAm startups. Strongest on the backend — [Ruby on Rails](#ruby-on-rails), [PostgreSQL](#databases), APIs, [Sidekiq](#ruby-on-rails) background processing, and production reliability — with enough [React](#react)/[TypeScript](#typescript) range to ship full-stack product features end to end. I have led teams and complex workstreams from design through production while staying close to architecture, code reviews, and mentoring. Relevant depth in search and retrieval ([Solr](#backend-other), [OpenSearch](#backend-other)), content and translation pipelines, integrations, and practical [AI-assisted product](#ai) and engineering workflows. Looking for a role where technical leadership still means writing code and raising the bar for a team.',
    },
    companies: [
      {
        ...trivelta,
        description:
          'B2B iGaming technology provider. Current hands-on tech lead role: architecture, delivery, mentoring, and day-to-day coding across legacy and greenfield platforms — including search-backed analytics on OpenSearch.',
        roles: [
          {
            ...triveltaLeadRole,
            description:
              'Hands-on platform team lead for player account management: setting technical direction, sequencing delivery, mentoring engineers, and writing the code for operator-facing admin tooling and analytics.',
            achievements: [
              {
                description:
                  'Architecting and building the admin backend in [FastAPI](#backend-other)/[Python](#backend-other) with DDD bounded contexts and typed [Pydantic](#backend-other) contracts, deployed on [AWS](#aws) serverless ([Lambda](#serverless-aws), [DynamoDB](#serverless-aws), [Athena](#backend-other), [OpenSearch](#backend-other), [Cognito](#serverless-aws), [EventBridge](#aws)) with a [React](#react) admin UI.',
              },
              {
                description:
                  'Shipping the backoffice in vertical slices, including reporting with parallel cross-store analytics enrichment and tenant-aware currency translation, replacing Tableau views with in-product dashboards operators use daily.',
              },
              {
                description:
                  'Owning delivery across a legacy platform and its greenfield replacement at the same time — keeping production healthy while migrating behind feature flags.',
              },
              {
                description:
                  'Raising engineering quality through design reviews, RFD/PRD planning, [code reviews](#technical-leadership), [testing](#ruby-on-rails), [CI/CD](#devops-other), and trunk-based development.',
              },
              {
                description:
                  'Partnering with product and engineering leadership to translate goals into milestones, ownership, and tradeoffs, and standardizing practical [AI workflows](#ai-workflows) across the team.',
              },
            ],
          },
        ],
      },
      {
        ...apptegy,
        description:
          'EdTech SaaS serving 6,000+ school districts and 10MM+ users. Strongest Rails/full-stack evidence at scale: APIs, Sidekiq background jobs, content/translation services, integrations, and hands-on technical leadership during rapid growth.',
        roles: [
          {
            ...apptegyVpRole,
            description:
              'Engineering leadership that stayed close to architecture, delivery quality, and practical AI enablement as the org matured — useful context for mentoring and technical judgment, not a pivot into pure people management.',
            achievements: [
              {
                description:
                  'Led AI enablement across engineering, driving practical adoption of [Cursor](#ai-tools), [Claude](#ai-tools), [CodeRabbit](#ai-tools), and [Gemini](#ai-tools), improving productivity by 10% and cutting code review time by 60%.',
              },
              {
                description:
                  'Sponsored architecture simplification and cost reduction across a gRPC microservices landscape, pushing clearer domain boundaries and delivery ergonomics.',
              },
              {
                description:
                  'Coached engineers and managers, ran interview loops, and helped the organization grow while keeping quality and cadence on products used by millions of end users.',
              },
            ],
          },
          {
            ...apptegyLeadRole,
            description:
              'Hands-on lead for platform and product engineering while the company scaled from ~500 to 2,000+ school districts: architecture, implementation, mentoring, and delivery of backend-heavy services.',
            achievements: [
              {
                description:
                  'Built platform services and APIs in [Ruby on Rails](#ruby-on-rails) and [PostgreSQL](#databases) for web and mobile clients, with [Sidekiq](#ruby-on-rails) handling hundreds of thousands of background jobs a day.',
              },
              {
                description:
                  'Led greenfield outpost services: an [OAuth2](#apis)/[OpenID Connect](#apis) identity provider for SSO across the product suite; a multi-channel notification relay (SMS, voice/TTS, push, email) that scaled from tens to thousands of messages per minute; plus forms/surveys, ETL, translation, LMS, and real-time chat.',
              },
              {
                description:
                  'Owned reliability and release practices across [AWS](#aws), [Kubernetes](#kubernetes), and [CI/CD](#devops-other), and raised the bar through architecture reviews, peer review, and unit testing.',
              },
              {
                description:
                  'Worked as scrum master with Product, interviewed full-stack candidates, and onboarded engineers while staying in the codebase.',
              },
            ],
          },
        ],
      },
      {
        ...ecaresoft,
        description:
          'EHR and hospital systems for clinics and hospitals in Latin America and the Middle East. Direct evidence of Rails backends, Sidekiq, full-text search on Solr, ML/Python services, Elixir, and content-adjacent product work.',
        roles: [
          {
            ...ecaresoftNimboCtoRole,
            description:
              'Led product and engineering for Nimbo, a cloud EHR and practice-management app, from MVP to product-market fit — coding daily on backend systems that clinicians used every day.',
            achievements: [
              {
                description:
                  'Built fault-tolerant APIs and services in [Ruby](#ruby-on-rails), [Java](#backend-other), [PostgreSQL](#databases), [Redis](#databases), and [Sidekiq](#ruby-on-rails), with an [Ember.js](#frontend-other) frontend.',
              },
              {
                description:
                  'Delivered specialized backends: full-text search on [Apache Solr](#backend-other), a drug-interactions service on Wolters Kluwer Medi-Span®, and a prediction/classification service in [Python](#backend-other) and [Tensorflow](#ai-product-features).',
              },
              {
                description:
                  'Established coding, review, and testing practices, and balanced quality with speed while recruiting and coaching the team.',
              },
            ],
          },
          {
            ...ecaresoftNebulaLeadRole,
            description:
              'Tech lead bootstrapping a claims-management system: hands-on full-stack delivery and a domain-driven microservices architecture.',
            achievements: [
              {
                description:
                  'Built the product in [Elixir](#backend-other)/[Phoenix](#backend-other) on the backend and [Ember.js](#frontend-other) on the frontend, with [Docker](#docker) on [AWS Elastic Beanstalk](#aws).',
              },
              {
                description:
                  'Applied [Domain-Driven Design](#technical-leadership) with bounded contexts to keep a complex domain shippable.',
              },
            ],
          },
          {
            ...ecaresoftIntlCtoRole,
            description:
              'Technology strategy and delivery as the business entered Argentina and the Middle East, partnering closely with Product, Sales, and Support.',
            achievements: [
              {
                description:
                  'Launched internationalization for new markets through APIs, microservices, and serverless functions.',
              },
              {
                description:
                  'Improved availability and resilience with containerization, elastic infrastructure, automated testing, and CI/CD.',
              },
            ],
          },
        ],
      },
      {
        ...healthTree,
        description:
          'Healthcare platform for cancer patients and caregivers. Small-team CTO role with daily Rails and React coding, observability, and lean delivery.',
        roles: [
          {
            ...healthTreeCtoRole,
            description:
              'CTO of a small team, coding daily on web and mobile products while setting architecture, quality bar, and delivery process.',
            achievements: [
              {
                description:
                  'Hands-on across backend APIs in [Ruby on Rails](#ruby-on-rails), [React.js](#react) clients, and data pipelines, including code review and testing.',
              },
              {
                description:
                  'Built the feedback loop between product and patients using [Metabase](#devops-other), [Sentry](#devops-other), and [Intercom](#product).',
              },
              {
                description:
                  'Automated the product lifecycle through DevOps and CI/CD, and stood up a lean [Kanban](#product) delivery process from scratch.',
              },
            ],
          },
        ],
      },
      {
        ...brokerlit,
        description:
          'Real estate SaaS (MLS, CMS, CRM). Side venture shipping the whole Rails + React/TypeScript stack with a very small team.',
        roles: [
          {
            ...brokerlitFounderRole,
            description: 'Technical co-founder shipping the product across backend, frontend, and infrastructure.',
            achievements: [
              {
                description:
                  'Built the platform hands-on in [Ruby on Rails](#ruby-on-rails), [TypeScript](#typescript), [React.js](#react), and [Next.js](#next.js).',
              },
              {
                description:
                  'Ran infrastructure on [Fly.io](#devops-other) and [Vercel](#next.js), keeping operations cheap and the iteration loop short.',
              },
            ],
          },
        ],
      },
      {
        ...baseql,
        description:
          'GraphQL access point for cloud data (Airtable & Google Sheets), built as a bootstrapped side project. 🎯 **Acquired in 2024**',
        roles: [
          {
            ...baseqlFounderRole,
            description: 'Founder who built, launched, supported, and sold the product without outside funding.',
            achievements: [
              {
                description:
                  'Full-stack [Node.js](#javascript), [React.js](#react), and [Next.js](#next.js) development, from the API layer to the marketing site.',
              },
              {
                description: 'Took it from side project to acquisition in 2024.',
              },
            ],
          },
        ],
      },
    ],
    skills: [
      {
        ...getBaseVariantSkill('backend'),
        order: 1,
        description:
          'Primary depth: [Ruby on Rails](#ruby-on-rails) applications, [PostgreSQL](#databases) schema design and query optimization, REST/GraphQL APIs, [Sidekiq](#ruby-on-rails) background processing, search ([Solr](#backend-other), [OpenSearch](#backend-other)), and comparable server-side work in [Python](#backend-other) and [Elixir](#backend-other).',
      },
      {
        ...getBaseVariantSkill('frontend'),
        order: 2,
        description:
          'Modern frontend range across [React](#react), [TypeScript](#typescript), and [Next.js](#next.js) — enough to ship full-stack product features and review UI work with judgment.',
      },
      {
        ...getBaseVariantSkill('leadership'),
        order: 3,
        description:
          'Hands-on technical leadership: planning and estimation, architecture ownership, design and code reviews, mentoring, and helping other engineers succeed — without needing a pure people-management seat.',
      },
      {
        ...getBaseVariantSkill('ai'),
        order: 4,
        level: 85,
        description:
          'Production-minded AI work: team enablement for [AI tools](#ai-tools), agentic [workflows](#ai-workflows), and shipped AI product features including chatbots, RAG, and evaluation-oriented iteration.',
      },
      {
        ...getBaseVariantSkill('devops'),
        order: 5,
        description:
          'Operating what I ship: [AWS](#aws), [Docker](#docker), [Kubernetes](#kubernetes), CI/CD, observability, and production troubleshooting for distributed systems.',
      },
      {
        ...getBaseVariantSkill('product'),
        order: 6,
        description:
          'Translating product goals into technical plans, milestones, and ownership; partnering with Product, QA, and DevOps on tradeoffs and delivery risk.',
      },
    ],
  },
  coverLetter: {
    title: 'Ben Orozco - Cover Letter for SalesHood',
    targetCompany: 'SalesHood',
    targetRole: 'Senior Full-Stack Engineer / Tech Lead',
    recipient: 'SalesHood hiring team',
    greeting: 'Dear SalesHood team,',
    paragraphs: [
      'I am applying for the Senior Full-Stack Engineer / Tech Lead role because it matches how I actually like to work: stay in the codebase, own architecture and delivery for hard backend systems, and raise the bar for a team without becoming a pure people manager. I am based in Monterrey and have spent most of my career building SaaS products remotely with U.S. companies from LatAm — the working setup is familiar, not an adjustment.',
      'The stack and problem space line up cleanly. At Apptegy I was a hands-on lead building Ruby on Rails platform services and APIs on PostgreSQL, with Sidekiq processing hundreds of thousands of jobs a day, plus translation and content-adjacent services, integrations, and production reliability on AWS and Kubernetes. Earlier at Ecaresoft I shipped full-text search on Solr, background-heavy Rails services, a Python/ML classification service, and an Elixir/Phoenix product as tech lead. Today at Trivelta I am again a hands-on platform lead — writing code daily in Python/FastAPI and React, owning delivery across legacy and greenfield systems, including OpenSearch-backed analytics — while mentoring engineers and partnering with product on sequencing and tradeoffs.',
      'I have also led larger engineering organizations, including AI enablement that improved productivity by 10% and cut code review time by 60%. That experience is useful here for judgment, mentoring, and guiding AI-assisted product work — but I am deliberately looking for a tech lead seat that stays close to search, retrieval, content processing, and production systems, not another VP-of-everything role.',
      'If you want someone who can design the plan, write the critical path, review the rest, and help the team ship search and AI-assisted capabilities with production discipline, I would be glad to talk.',
    ],
    closing: 'Best regards,',
    signature: 'Ben Orozco',
    summary:
      'Tailored cover letter for SalesHood emphasizing hands-on tech leadership, Rails/backend depth, search and background processing, React/TypeScript full-stack range, and LatAm remote fit.',
  },
};
