import type { IResumeVariantDefinition } from '../schema.js';
import { getBaseVariantCompany, getBaseVariantRole, getBaseVariantSkill } from './utils.js';

const apptegy = getBaseVariantCompany('Apptegy');
const trivelta = getBaseVariantCompany('Trivelta');
const brokerlit = getBaseVariantCompany('Brokerlit');
const ecaresoft = getBaseVariantCompany('Ecaresoft');
const healthTree = getBaseVariantCompany('HealthTree');
const baseql = getBaseVariantCompany('BaseQL');

const apptegyVpRole = getBaseVariantRole(apptegy, 0);
const apptegyLeadRole = getBaseVariantRole(apptegy, 1);
const triveltaLeadRole = getBaseVariantRole(trivelta, 0);
const brokerlitFounderRole = getBaseVariantRole(brokerlit, 0);
const ecaresoftIntlCtoRole = getBaseVariantRole(ecaresoft, 0);
const ecaresoftNimboCtoRole = getBaseVariantRole(ecaresoft, 1);
const healthTreeCtoRole = getBaseVariantRole(healthTree, 0);
const baseqlFounderRole = getBaseVariantRole(baseql, 0);

export const revunCtoVariant: IResumeVariantDefinition = {
  slug: 'revun-cto',
  label: 'CTO / Head of Engineering · Property Ops SaaS',
  metadata: {
    title: 'Ben Orozco - CTO / Head of Engineering',
    description:
      'Tailored resume and cover letter for a CTO / Head of Engineering role owning architecture, launch readiness, remote engineering, cost control, and multi-role operational SaaS.',
  },
  resume: {
    about: {
      header: 'CTO / Head of Engineering · SaaS Platform Ownership · Architecture & Launch Readiness',
      about_me:
        'Hands-on CTO and VP of Engineering with 15+ years shipping and operating multi-role SaaS platforms — CRM and workflow systems, communications, reporting, identity/RBAC, integrations, and AI-assisted product work. I have led remote engineering orgs up to 140+ people, inherited messy systems, simplified architecture to cut cost and risk, and stayed close enough to the codebase to challenge weak technical decisions. Comfortable owning the full stack of accountability: technical roadmap, engineering standards, CI/CD and launch readiness, vendor and cloud spend, and explaining trade-offs clearly to non-technical leadership. Direct experience in real estate technology through Brokerlit (MLS, CMS, CRM), plus deep operational-software work across EdTech and healthcare platforms with admins, staff, customers, and partner roles.',
    },
    companies: [
      {
        ...apptegy,
        description:
          'High-growth EdTech SaaS serving 6,000+ school districts and 10MM+ users. Closest evidence of VP-level ownership across architecture, remote engineering leadership, cost control, AI enablement, multi-channel integrations, and multi-role product systems at scale.',
        roles: [
          {
            ...apptegyVpRole,
            endDate: 'Nov 2025',
            description:
              'VP of Engineering owning technical direction, org health, delivery systems, and architecture quality as the company scaled toward Series-C and 100MM+ ARR complexity.',
            achievements: [
              {
                description:
                  'Helped hire, form, and lead a remote engineering organization of 140+ engineers across the U.S. and Mexico — coaching managers and ICs, running performance systems, and keeping ownership culture intact through growth.',
              },
              {
                description:
                  'Drove architecture simplification and meaningful cost reduction across a gRPC microservices landscape and in-house frameworks, pushing clearer domain boundaries and more sustainable delivery.',
              },
              {
                description:
                  'Partnered with product and company leadership on roadmap sequencing, org design, and execution risk — translating technical debt, launch blockers, and trade-offs into plain business terms.',
              },
              {
                description:
                  'Led practical AI enablement across engineering ([Cursor](#ai-tools), [Claude](#ai-tools), [CodeRabbit](#ai-tools), [Gemini](#ai-tools)), improving productivity by 10% and cutting code review time by 60% while keeping quality and privacy discipline.',
              },
            ],
          },
          {
            ...apptegyLeadRole,
            description:
              'Hands-on platform lead during rapid growth from ~500 to 2,000+ school districts: CRM-adjacent workflows, identity/RBAC foundations, notifications, integrations, and delivery controls.',
            achievements: [
              {
                description:
                  'Built an AuthN/Z identity provider on [OAuth2](#apis) and [OpenID Connect](#apis) for SSO and user management across a growing multi-product suite with thousands of new users flowing in continuously.',
              },
              {
                description:
                  'Designed and shipped a multi-channel alerting relay (SMS, voice/TTS, push, email, social) with provider adapters, retries, webhooks, and async analytics — scaling from tens to thousands of notifications per minute under crisis load.',
              },
              {
                description:
                  'Led platform services for forms/surveys, ETL, translation, LMS, and real-time messaging in [Ruby on Rails](#ruby-on-rails)/[PostgreSQL](#databases) with [Sidekiq](#ruby-on-rails) handling hundreds of thousands of background jobs a day.',
              },
              {
                description:
                  'Owned reliability and release practices across [AWS](#aws), [Kubernetes](#kubernetes), and [CI/CD](#devops-other), and raised the bar through architecture reviews, testing, and mentoring.',
              },
            ],
          },
        ],
      },
      {
        ...brokerlit,
        description:
          'Real estate SaaS spanning MLS, CMS, and CRM for brokers — direct property-tech and multi-workflow product ownership. Strongest niche signal for property operations platforms.',
        roles: [
          {
            ...brokerlitFounderRole,
            description:
              'Technical co-founder owning product architecture and full-stack delivery for broker-facing property and lead workflows.',
            achievements: [
              {
                description:
                  'Built the platform end to end in [Ruby on Rails](#ruby-on-rails), [TypeScript](#typescript), [React.js](#react), and [Next.js](#next.js) — listings, CRM/lead capture, and content workflows for brokers.',
              },
              {
                description:
                  'Ran lean infrastructure on [Fly.io](#devops-other) and [Vercel](#next.js), making build-versus-buy and cost decisions with a very small team.',
              },
            ],
          },
        ],
      },
      {
        ...trivelta,
        description:
          'B2B platform company. Current hands-on technical lead role proving I still evaluate systems, write critical path code, and raise engineering quality while managing a distributed team.',
        roles: [
          {
            ...triveltaLeadRole,
            description:
              'Platform team lead owning architecture and delivery across a legacy system and its greenfield replacement — exactly the inherit-and-improve pattern this role requires.',
            achievements: [
              {
                description:
                  'Architecting and building the admin backend in [FastAPI](#backend-other)/[Python](#backend-other) with DDD bounded contexts, deployed on [AWS](#aws) serverless with [OpenSearch](#backend-other)-backed analytics and a [React](#react) UI.',
              },
              {
                description:
                  'Keeping production healthy on the legacy path while migrating behind feature flags — sequencing debt payoff against business delivery without freezing the roadmap.',
              },
              {
                description:
                  'Established design reviews, RFD/PRD planning, [code reviews](#technical-leadership), testing, [CI/CD](#devops-other), and trunk-based development; standardized practical [AI workflows](#ai-workflows) for the team.',
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
        ...ecaresoft,
        description:
          'EHR and hospital systems for clinics and hospitals across Latin America and the Middle East. Multi-role operational software (physicians, clinic staff, admins) with CTO ownership from MVP through international expansion.',
        roles: [
          {
            ...ecaresoftNimboCtoRole,
            description:
              'CTO for Nimbo, taking a cloud EHR and practice-management product from MVP to product-market fit with thousands of monthly active clinical users.',
            achievements: [
              {
                description:
                  'Owned end-to-end clinical and practice workflows — scheduling, records, billing — with fault-tolerant APIs in [Ruby](#ruby-on-rails), [PostgreSQL](#databases), [Redis](#databases), and [Sidekiq](#ruby-on-rails).',
              },
              {
                description:
                  'Shipped supporting services for full-text search ([Solr](#backend-other)), drug interactions, and ML classification in [Python](#backend-other), while establishing coding, review, and testing standards.',
              },
              {
                description:
                  'Balanced quality and speed through recruiting, coaching, and lean [Kanban](#product) delivery in a market with dated incumbent software.',
              },
            ],
          },
          {
            ...ecaresoftIntlCtoRole,
            description:
              'CTO for the wider portfolio: technology strategy, delivery, and cross-functional alignment as the business entered Argentina and the Middle East.',
            achievements: [
              {
                description:
                  'Launched internationalization through APIs, microservices, and serverless functions; improved availability with containers, automated testing, and CI/CD.',
              },
              {
                description:
                  'Worked directly with Product, Sales, and Support to turn customer feedback into sequenced roadmap decisions, including joining customer conversations first-hand.',
              },
            ],
          },
        ],
      },
      {
        ...healthTree,
        description:
          'Patient-facing healthcare platform. Small-team CTO role combining architecture ownership, engineering standards, and launch/delivery discipline.',
        roles: [
          {
            ...healthTreeCtoRole,
            description:
              'CTO of a small team: coding daily while defining architecture, quality bar, observability, and delivery process from scratch.',
            achievements: [
              {
                description:
                  'Built backend APIs in [Ruby on Rails](#ruby-on-rails) and [React.js](#react) clients, with review, testing, and CI/CD as non-negotiable defaults.',
              },
              {
                description:
                  'Stood up [Metabase](#devops-other), [Sentry](#devops-other), and [Intercom](#product) so product decisions followed real usage and incidents were visible.',
              },
              {
                description:
                  'Recruited and retained engineers in a competitive U.S. market while keeping a small team shipping.',
              },
            ],
          },
        ],
      },
      {
        ...baseql,
        description:
          'GraphQL access layer for cloud data. Founder-led SaaS through acquisition — ownership of architecture, cost, support, and whether the product was actually ready.',
        roles: [
          {
            ...baseqlFounderRole,
            description:
              'Founder who built, operated, supported, and sold the product without outside funding.',
            achievements: [
              {
                description:
                  'Full-stack ownership across [Node.js](#javascript), [React.js](#react), and [Next.js](#next.js), including infrastructure and customer-facing support loops.',
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
        ...getBaseVariantSkill('leadership'),
        order: 1,
        description:
          'CTO / VP-level ownership: technical direction, remote team leadership, engineering standards, roadmap sequencing, budget and vendor judgment, and clear communication of risk to non-technical leadership.',
      },
      {
        ...getBaseVariantSkill('backend'),
        order: 2,
        description:
          'Backend architecture depth: [Ruby on Rails](#ruby-on-rails), [PostgreSQL](#databases), APIs, AuthN/Z and multi-tenant access patterns, background processing, integrations with retries/webhooks, and comparable work in [Python](#backend-other)/[Node.js](#javascript).',
      },
      {
        ...getBaseVariantSkill('product'),
        order: 3,
        description:
          'Operational SaaS product sense: CRM and workflow systems, multi-role portals, notifications, reporting, and translating incomplete workflows into a realistic launch plan.',
      },
      {
        ...getBaseVariantSkill('ai'),
        order: 4,
        level: 85,
        description:
          'AI as an engineering and product concern: team enablement, agentic workflows, RAG/chat features, evaluation and cost control, and privacy-conscious production use — not demos for demos\' sake.',
      },
      {
        ...getBaseVariantSkill('devops'),
        order: 5,
        description:
          'Launch readiness and operations: [AWS](#aws), [Kubernetes](#kubernetes), CI/CD, observability, incident response, and infrastructure choices that stay affordable for the stage of the company.',
      },
      {
        ...getBaseVariantSkill('frontend'),
        order: 6,
        description:
          'Enough [React](#react)/[TypeScript](#typescript) range to review UI architecture, staff dashboards, and portal UX with judgment — not only to delegate them.',
      },
    ],
  },
  coverLetter: {
    title: 'Ben Orozco - Cover Letter for Revun',
    targetCompany: 'Revun',
    targetRole: 'CTO / Head of Engineering',
    recipient: 'Revun hiring team',
    greeting: 'Dear Revun team,',
    paragraphs: [
      'Revun is trying to replace a fragmented property-operations stack with one system of record — leasing, payments, maintenance, compliance, communications, accounting, and AI automation across owners, tenants, vendors, and staff. That is not a feature list to me; it is the hard kind of multi-role operational SaaS I have spent my career building and leading. I am applying for the CTO / Head of Engineering role because you need someone who can inherit what exists, challenge weak decisions, and drive a realistic path to stable launch — not someone who only wants to write greenfield code or only wants to manage people.',
      'Most recently as VP of Engineering at Apptegy, I helped lead a remote organization of 140+ engineers across the U.S. and Mexico through Series-C scale. That work was equal parts architecture, execution, and cost discipline: simplifying a gRPC microservices landscape, raising delivery standards, and translating technical risk into language non-technical leadership could act on. Earlier there as a hands-on lead, I built the foundations this kind of platform lives on — OAuth2/OIDC identity across products, multi-channel notification relays with provider adapters, retries, webhooks and analytics, plus workflow-heavy services for forms, translation, and messaging on Rails and PostgreSQL.',
      'The property-tech angle is not abstract either. I am technical co-founder of Brokerlit, a real estate SaaS covering MLS, CMS, and CRM workflows for brokers — listings, lead capture, and the day-to-day operational surface area of a property business. Across Ecaresoft and HealthTree as CTO, I owned multi-role healthcare platforms from MVP to product-market fit and international expansion, including the messy inheritance work of legacy systems, incomplete workflows, and teams that needed clearer standards. Today at Trivelta I am again hands-on: evaluating legacy versus greenfield paths, writing critical backend code, and coaching a distributed team while keeping production shipping.',
      'On AI, I treat it as an engineering system with cost, privacy, evaluation, and measurable value — the same way I led org-wide enablement that improved productivity by 10% and cut review time by 60%. I would expect to apply that lens to Revun\'s automation for triage, documents, communications, and reporting rather than bolting on another chatbot. If you want a technical leader who can audit the stack, set the roadmap, lead remote engineers, control spend, and stay close enough to the architecture to say no when needed, I would be glad to talk.',
    ],
    closing: 'Best regards,',
    signature: 'Ben Orozco',
    summary:
      'Tailored cover letter for Revun CTO / Head of Engineering focused on platform inheritance and launch readiness, multi-role SaaS leadership, real estate tech via Brokerlit, remote org leadership, architecture/cost control, and practical AI.',
  },
};
