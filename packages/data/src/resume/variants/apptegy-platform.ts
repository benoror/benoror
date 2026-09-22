import type { IResumeVariantDefinition } from '../schema.js';
import { getBaseVariantCompany, getBaseVariantRole, getBaseVariantSkill } from './utils.js';

const apptegy = getBaseVariantCompany('Apptegy');
const trivelta = getBaseVariantCompany('Trivelta');
const ecaresoft = getBaseVariantCompany('Ecaresoft');
const healthTree = getBaseVariantCompany('HealthTree');
const brokerlit = getBaseVariantCompany('Brokerlit');
const baseql = getBaseVariantCompany('BaseQL');

const apptegyVpRole = getBaseVariantRole(apptegy, 0);
const apptegyLeadRole = getBaseVariantRole(apptegy, 1);
const triveltaManagerRole = getBaseVariantRole(trivelta, 0);
const triveltaLeadRole = getBaseVariantRole(trivelta, 1);
const ecaresoftIntlCtoRole = getBaseVariantRole(ecaresoft, 0);
const ecaresoftNimboCtoRole = getBaseVariantRole(ecaresoft, 1);
const healthTreeCtoRole = getBaseVariantRole(healthTree, 0);
const brokerlitFounderRole = getBaseVariantRole(brokerlit, 0);
const baseqlFounderRole = getBaseVariantRole(baseql, 0);

export const apptegyPlatformVariant: IResumeVariantDefinition = {
  slug: 'apptegy-platform',
  label: 'Senior / Staff Platform and AI Engineer · Apptegy',
  metadata: {
    title: 'Ben Orozco - Senior / Staff Platform and AI Engineer',
    description:
      'Tailored resume and cover letter for returning to Apptegy — platform auth/identity foundations, current Backoffice engineering leadership, and hands-on agentic AI engineering depth.',
  },
  resume: {
    about: {
      header: 'Senior / Staff Platform and AI Engineer · Identity · Shared Systems · Agentic Engineering',
      about_me:
        'Senior platform and AI engineer with unusually broad leadership experience, including nearly six years at Apptegy as a platform lead and VP of Engineering. Built authentication, identity, SSO, access controls, APIs, and shared services used across a multi-product SaaS platform. Now lead three Backoffice teams while retaining fractional responsibility for architecture and high-leverage work in MCP, data infrastructure, Kubernetes, and AI-assisted products. Bring staff-level technical judgment plus experience hiring, coaching, managing performance, setting standards, and aligning work across teams. Seeking a hands-on role where platform engineering and AI improve the leverage of the wider product organization.',
    },
    companies: [
      {
        ...trivelta,
        description:
          'B2B iGaming technology company. Lead three Backoffice teams while retaining fractional technical ownership of PAM platform, data, infrastructure, MCP, and AI-product initiatives.',
        roles: [
          {
            ...triveltaManagerRole,
            description:
              'Lead PAM, TCM, and Data Engineering while remaining a fractional PAM Tech Lead and developer for selected platform and AI initiatives.',
            achievements: [
              {
                description:
                  'Lead a 10-person Backoffice group, with five direct reports (two Tech Leads and three Engineers) and five additional Engineers managed through the team leads.',
              },
              {
                description:
                  'Own cross-team priorities, roadmap execution, delivery, and technical alignment across PAM, TCM (Trivelta Client Management), and Data Engineering.',
              },
              {
                description:
                  'Remain hands-on with PAM data infrastructure in [ClickHouse](#backend-other), migration to [Amazon EKS](#kubernetes), and a secure, read-only MCP connector.',
              },
              {
                description:
                  'Design and build the PAM MCP connector as a curated analytics surface that preserves Cognito authentication, RBAC, product gates, data boundaries, and audit controls.',
              },
              {
                description:
                  'Shape a greenfield AI-enabled support product for iGaming operators, exploring agents, harnesses, evals, RAG, knowledge bases, and model adaptation on top of the PAM MCP surface; development has not yet started.',
              },
            ],
          },
          {
            ...triveltaLeadRole,
            description:
              'Hands-on technical lead for the PAM platform team, owning architecture, critical-path code, and operator-facing admin tooling across legacy and greenfield platforms.',
            achievements: [
              {
                description:
                  'Architected and built PAM admin capabilities in [Python](#backend-other)/[FastAPI](#backend-other), using typed contracts and domain boundaries across legacy and greenfield systems on AWS.',
              },
              {
                description:
                  'Drove agentic engineering and AI feature work hands-on: [AI tool](#ai-tools) workflows, agent rules/docs, repeatable automation patterns, and AI-assisted product capabilities on the critical path.',
              },
              {
                description:
                  'Kept the legacy platform stable while moving capabilities behind feature flags, enabling progressive delivery and practical rollback paths.',
              },
              {
                description:
                  'Established design reviews, RFD/PRD planning, code review, testing, CI/CD, and trunk-based development across the team.',
              },
              {
                description:
                  'Helped build and organize the Monterrey engineering team through international hiring, interviewing, coaching, and performance management.',
              },
            ],
          },
        ],
      },
      {
        ...apptegy,
        description:
          'EdTech SaaS serving 6,000+ school districts and more than 10 million users. Built core identity and shared platform services, then led engineering through organizational and architectural scale.',
        roles: [
          {
            ...apptegyLeadRole,
            description:
              'Led platform and infrastructure work as Apptegy grew from roughly 500 to more than 2,000 school districts, combining hands-on development, architecture, delivery, and engineer development.',
            achievements: [
              {
                description:
                  'Built an AuthN/Z identity provider using [OAuth2](#apis) and [OpenID Connect](#apis), enabling SSO, user management, and clear identity boundaries across a multi-tenant product suite.',
              },
              {
                description:
                  'Built Thrillshare platform services and APIs in [Ruby on Rails](#ruby-on-rails) and [PostgreSQL](#databases) for Vue.js and mobile clients, with [Sidekiq](#ruby-on-rails) processing hundreds of thousands of jobs per day.',
              },
              {
                description:
                  'Designed shared services other product teams depended on, including alerting that scaled from tens to thousands of notifications per minute, forms and surveys, ETL, translation, learning, and real-time messaging.',
              },
              {
                description:
                  'Owned CI/CD and production releases across [AWS](#aws) and [Kubernetes](#kubernetes), improving deployment consistency and operational reliability.',
              },
              {
                description:
                  'Raised technical standards through architecture and design reviews, code review, testing, mentoring, interviewing, and onboarding.',
              },
            ],
          },
          {
            ...apptegyVpRole,
            endDate: 'Nov 2025',
            description:
              'Led engineering through high-growth scale, using deep platform context to guide organization design, talent development, delivery systems, architecture strategy, and AI adoption.',
            achievements: [
              {
                description:
                  'Helped hire, organize, and lead 140+ engineers across the U.S. and Mexico, developing managers and engineers through coaching, feedback, performance management, and clear accountability.',
              },
              {
                description:
                  'Restructured teams and introduced planning and delivery systems as the company matured toward Series C and more than $100M ARR.',
              },
              {
                description:
                  'Drove cost reduction and simplification across a gRPC microservices architecture and internal frameworks by clarifying domain boundaries and reducing unnecessary complexity.',
              },
              {
                description:
                  'Led practical AI enablement across engineering, increasing productivity by 10% and reducing code-review time by 60% while establishing guidance for quality and responsible adoption.',
              },
              {
                description:
                  'Partnered with Product and executive leadership on priorities, organizational design, delivery risk, and architecture decisions that crossed team boundaries.',
              },
            ],
          },
        ],
      },
      {
        ...ecaresoft,
        description:
          'Multi-tenant healthcare SaaS. CTO and tech-lead evidence for shared services, APIs, and operational platforms with clear access and domain boundaries.',
        roles: [
          {
            ...ecaresoftNimboCtoRole,
            description:
              'CTO for Nimbo: took a cloud EHR/practice-management product from MVP to product-market fit with thousands of MAUs.',
            achievements: [
              {
                description:
                  'Defined architecture and fault-tolerant APIs in [Ruby](#ruby-on-rails), [PostgreSQL](#databases), [Redis](#databases), and [Sidekiq](#ruby-on-rails), plus supporting services for search and integrations.',
              },
              {
                description:
                  'Established coding, review, testing, and CI/CD standards so shared backend work stayed maintainable as the product scaled.',
              },
            ],
          },
          {
            ...ecaresoftIntlCtoRole,
            description:
              'CTO for the wider portfolio: technology strategy and delivery as the business entered new markets.',
            achievements: [
              {
                description:
                  'Launched internationalization through APIs, microservices, and serverless functions; improved availability with containers, automated testing, and CI/CD.',
              },
            ],
          },
        ],
      },
      {
        ...healthTree,
        description:
          'Patient-facing healthcare platform. Small-team CTO role combining architecture ownership, observability, and delivery discipline.',
        roles: [
          {
            ...healthTreeCtoRole,
            description:
              'CTO of a small team: coding daily while defining architecture, quality bar, and observability from scratch.',
            achievements: [
              {
                description:
                  'Built backend APIs in [Ruby on Rails](#ruby-on-rails) and [React.js](#react) clients, with review, testing, and CI/CD as defaults.',
              },
              {
                description:
                  'Stood up [Metabase](#devops-other), [Sentry](#devops-other), and [Intercom](#product) so incidents and usage stayed visible.',
              },
            ],
          },
        ],
      },
      {
        ...brokerlit,
        description:
          'Real estate SaaS (MLS, CMS, CRM). Founder-level full-stack ownership of multi-workflow product surfaces.',
        roles: [
          {
            ...brokerlitFounderRole,
            description:
              'Technical co-founder owning product architecture and full-stack delivery.',
            achievements: [
              {
                description:
                  'Built the platform in [Ruby on Rails](#ruby-on-rails), [TypeScript](#typescript), [React.js](#react), and [Next.js](#next.js).',
              },
            ],
          },
        ],
      },
      {
        ...baseql,
        description:
          'GraphQL access layer for cloud data. Founder-led SaaS through acquisition.',
        roles: [
          {
            ...baseqlFounderRole,
            description: 'Founder who built, operated, and sold the product.',
            achievements: [
              {
                description:
                  'Full-stack ownership across [Node.js](#javascript), [React.js](#react), and [Next.js](#next.js); acquired in 2024.',
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
          'Platform backend depth across [Ruby on Rails](#ruby-on-rails), [PostgreSQL](#databases), OAuth2/OIDC, SSO, identity and access boundaries, reusable services, and high-volume background workloads.',
      },
      {
        ...getBaseVariantSkill('ai'),
        order: 2,
        level: 90,
        description:
          'Agentic engineering and AI product development with MCP, RAG, agents, harnesses, evals, knowledge bases, and engineering-team enablement. Emphasis on authorization, data boundaries, verification, reliability, and human oversight.',
      },
      {
        ...getBaseVariantSkill('leadership'),
        order: 3,
        description:
          'Technical and organizational influence through architecture and design reviews, roadmap decisions, engineering standards, hiring, mentoring, coaching, performance management, and cross-team alignment.',
      },
      {
        ...getBaseVariantSkill('frontend'),
        order: 4,
        description:
          'Full-stack range across Vue.js, [React](#react), and [TypeScript](#typescript) for sign-in flows, admin tools, and shared product surfaces.',
      },
      {
        ...getBaseVariantSkill('devops'),
        order: 5,
        description:
          'Production operations across [AWS](#aws), [Kubernetes](#kubernetes), CI/CD, observability, progressive delivery, rollback planning, and distributed systems.',
      },
      {
        ...getBaseVariantSkill('product'),
        order: 6,
        description:
          'Translate cross-cutting platform and AI needs into scoped plans with Product and application teams, balancing user value, security, technical constraints, and delivery risk.',
      },
    ],
  },
  coverLetter: {
    title: 'Ben Orozco - Cover Letter for Apptegy',
    targetCompany: 'Apptegy',
    targetRole: 'Senior Full Stack Platform Engineer',
    recipient: 'Apptegy hiring team',
    greeting: 'Dear Apptegy team,',
    paragraphs: [
      'I am interested in returning to Apptegy as a hands-on platform or AI engineer. During nearly six years there, I moved from platform lead to VP of Engineering because I could combine technical depth with the ability to develop engineers, teams, and systems. That leadership experience now makes me more effective in a senior or staff-level engineering role: I can own difficult platform work, raise standards around it, and help other teams succeed.',
      'The Platform Engineer role matches work I know well. I built Apptegy\'s OAuth2/OIDC identity provider for SSO and user management across products, developed Rails APIs for Vue.js and mobile clients, and led shared services for alerts, forms, ETL, translation, learning, and real-time messaging. The work required secure identity boundaries, reliable operations on AWS and Kubernetes, and interfaces that product teams could adopt without rebuilding the same foundations.',
      'My current work continues that path. At Trivelta, I lead PAM, TCM, and Data Engineering while remaining a fractional PAM Tech Lead and developer for ClickHouse, an EKS migration, and a permission-bound MCP analytics surface. I am also shaping an AI-enabled support product whose architecture is still exploratory, with attention to agents, evals, RAG, access controls, and human oversight. The role combines direct technical contribution with the hiring, coaching, performance management, roadmap judgment, and cross-team influence I developed at Apptegy.',
      'I would welcome a conversation about the Platform Engineer opening or another hands-on platform or AI role where this combination would be useful.',
    ],
    closing: 'Best regards,',
    signature: 'Ben Orozco',
    summary:
      'Returning-alumni cover letter positioning platform and AI engineering as the primary path, with prior Apptegy leadership presented as a multiplier for hands-on impact.',
  },
};
