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
const triveltaLeadRole = getBaseVariantRole(trivelta, 0);
const ecaresoftIntlCtoRole = getBaseVariantRole(ecaresoft, 0);
const ecaresoftNimboCtoRole = getBaseVariantRole(ecaresoft, 1);
const healthTreeCtoRole = getBaseVariantRole(healthTree, 0);
const brokerlitFounderRole = getBaseVariantRole(brokerlit, 0);
const baseqlFounderRole = getBaseVariantRole(baseql, 0);

export const apptegyPlatformVariant: IResumeVariantDefinition = {
  slug: 'apptegy-platform',
  label: 'Platform / AI Engineer · Apptegy (return)',
  metadata: {
    title: 'Ben Orozco - Senior Full Stack Platform / AI Engineer',
    description:
      'Tailored resume and cover letter for returning to Apptegy — platform auth/identity foundations, hands-on coding (~80%), and agentic AI engineering depth.',
  },
  resume: {
    about: {
      header: 'Hands-on Platform & AI Engineer · Auth / Shared Systems · Agentic Engineering',
      about_me:
        'Hands-on senior engineer (~80% in the codebase) and former Apptegy platform lead / VP of Engineering. Deep experience building shared foundations multi-product teams depend on — authentication, identity, SSO, access control, and reusable platform services — plus recent leaps in agentic engineering and AI-assisted product work. Strongest on [Ruby on Rails](#ruby-on-rails), [PostgreSQL](#databases), APIs, and production reliability, with enough frontend range for full-stack platform surfaces (including Vue.js). I design systems other teams can adopt, raise standards through reviews and mentoring, and stay close enough to architecture and code to ship securely. Looking to contribute again where platform and AI engineering multiply the product ecosystem.',
    },
    companies: [
      {
        ...trivelta,
        description:
          'B2B platform company ([PAM](https://trivelta.com/pam)). Current seat is ~80% hands-on: platform architecture, MCP/AI connector work, AI-augmented support-product design, Cognito identity surfaces, and raising delivery quality for a distributed team.',
        roles: [
          {
            ...triveltaLeadRole,
            description:
              'Technical lead for the PAM platform team — ~80% hands-on across architecture, critical-path code, MCP/agentic AI product work, and operator-facing admin tooling on legacy and greenfield platforms.',
            achievements: [
              {
                description:
                  'Architecting and building the admin backend in [FastAPI](#backend-other)/[Python](#backend-other) with DDD bounded contexts, deployed on [AWS](#aws) serverless ([Lambda](#serverless-aws), [DynamoDB](#serverless-aws), [Cognito](#serverless-aws), [EventBridge](#aws)) with a [React](#react) admin UI.',
              },
              {
                description:
                  'Designing and building a read-only MCP connector for [Trivelta PAM](https://trivelta.com/pam): a curated, permission-bound analytics tool surface so authorized admins can use standard AI clients without privilege gain beyond existing Cognito auth, RBAC, product gates, and audit posture.',
              },
              {
                description:
                  'Leading early design for a PAM sub-product: AI-augmented operator support ticketing for iGaming (casino, sportsbook, prediction markets) — Zendesk-class workflows at higher volume, with agents, harnesses, evals, post-training/fine-tuning, RAGs, and knowledge bases grounded in the PAM MCP surface.',
              },
              {
                description:
                  'Driving agentic engineering and AI features hands-on (~80% in the codebase): [AI tool](#ai-tools) workflows, agent rules/docs, repeatable automation patterns, and shipping AI-assisted product capabilities on the critical path.',
              },
              {
                description:
                  'Keeping production healthy on the legacy path while migrating behind feature flags — progressive delivery and rollback-minded sequencing rather than big-bang cuts.',
              },
              {
                description:
                  'Established design reviews, RFD/PRD planning, [code reviews](#technical-leadership), testing, [CI/CD](#devops-other), and trunk-based development across the team.',
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
          'EdTech SaaS serving 6,000+ school districts and 10MM+ users. Closest evidence for return: built AuthN/Z and shared platform services hands-on, led org-wide AI enablement, and stayed close to architecture, security boundaries, and delivery systems through scale.',
        roles: [
          {
            ...apptegyLeadRole,
            description:
              'Hands-on lead for platform and infrastructure during rapid growth from ~500 to 2,000+ school districts: identity, shared services, Thrillshare APIs, and reliability patterns other product teams built on.',
            achievements: [
              {
                description:
                  'Built an AuthN/Z identity provider on [OAuth2](#apis) and [OpenID Connect](#apis) for SSO and user management across existing and newer products — designed for continuous inflow of thousands of new users and clear session/identity boundaries in a multi-tenant district context.',
              },
              {
                description:
                  'Hands-on development of Thrillshare platform and APIs in [Ruby on Rails](#ruby-on-rails)/[PostgreSQL](#databases), supporting Vue.js and mobile clients, with [Sidekiq](#ruby-on-rails) processing hundreds of thousands of background jobs a day.',
              },
              {
                description:
                  'Designed and shipped shared outpost services other teams relied on: multi-channel alerting (SMS/voice/TTS/push/email) that scaled from tens to thousands of notifications per minute; plus forms/surveys, ETL, translation, LMS, and real-time messaging.',
              },
              {
                description:
                  'Owned reliability and release practices across [AWS](#aws), [Kubernetes](#kubernetes), and [CI/CD](#devops-other) — Capistrano and EKS deployments, observability-minded operations, and safer rollouts under load.',
              },
              {
                description:
                  'Raised the bar across engineering through architecture and design reviews, peer review, unit testing, mentoring, interviewing, and onboarding while staying in the codebase.',
              },
            ],
          },
          {
            ...apptegyVpRole,
            endDate: 'Nov 2025',
            description:
              'VP of Engineering through Series-B scale-up toward Series-C complexity: org health, delivery systems, architecture quality, and org-wide AI enablement — useful judgment for platform and AI engineering seats, not a bid to return only as an executive.',
            achievements: [
              {
                description:
                  'Led practical AI enablement across engineering ([Cursor](#ai-tools), [Claude](#ai-tools), [CodeRabbit](#ai-tools), [Gemini](#ai-tools)), improving productivity by 10% and cutting code review time by 60% — early groundwork for how the org adopts AI seriously.',
              },
              {
                description:
                  'Helped hire, form, and lead a remote engineering organization of 140+ engineers across the U.S. and Mexico, building a high-performance yet thoughtful culture through coaching, performance systems, and continuous improvement.',
              },
              {
                description:
                  'Drove architecture simplification and cost reduction across a gRPC microservices landscape and in-house frameworks, pushing clearer DDD boundaries and more maintainable shared patterns.',
              },
              {
                description:
                  'Partnered with product and company leadership on roadmap sequencing, org design, and execution risk for platform-impacting work that crossed team boundaries.',
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
          'Platform backend depth: [Ruby on Rails](#ruby-on-rails), [PostgreSQL](#databases), AuthN/Z ([OAuth2](#apis)/[OIDC](#apis)), SSO, session and access boundaries, reusable APIs/services, and high-volume [Sidekiq](#ruby-on-rails) workloads.',
      },
      {
        ...getBaseVariantSkill('ai'),
        order: 2,
        level: 90,
        description:
          'Hands-on agentic engineering and AI product work: [AI tools](#ai-tools), multi-agent [workflows](#ai-workflows), team enablement, and shipping AI-assisted features with quality and security discipline — not demos for demos\' sake.',
      },
      {
        ...getBaseVariantSkill('leadership'),
        order: 3,
        description:
          'Hands-on technical leadership for shared systems: architecture ownership, design/code reviews, mentoring, cross-team platform decisions, and raising standards without losing proximity to the code.',
      },
      {
        ...getBaseVariantSkill('frontend'),
        order: 4,
        description:
          'Full-stack range for platform surfaces: Vue.js clients alongside [React](#react)/[TypeScript](#typescript) — enough to ship and review sign-in and shared UI flows with judgment.',
      },
      {
        ...getBaseVariantSkill('devops'),
        order: 5,
        description:
          'Operational mindset for platform work: [AWS](#aws), [Kubernetes](#kubernetes), CI/CD, observability, progressive delivery, and incident-aware rollout planning.',
      },
      {
        ...getBaseVariantSkill('product'),
        order: 6,
        description:
          'Translating cross-cutting platform and AI product needs into scoped plans — identity, entitlements, shared services, and AI features — in partnership with product and application teams.',
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
      'I am writing to put myself forward for the Senior Full Stack Platform Engineer role — and, more broadly, to reconnect. I spent nearly six years at Apptegy, first as a hands-on platform lead and later as VP of Engineering. I know the products, the multi-tenant district reality, and what it takes to ship shared foundations that other teams can trust. With some distance, I am clearer that I do my best work close to the code — and I would like to come back in a hands-on seat, whether that is platform engineering, AI engineering, or the overlap between the two.',
      'The Platform Engineer description maps directly to work I have already owned here. As Lead Software Engineer I built the AuthN/Z identity provider on OAuth2 and OpenID Connect for SSO and user management across the product suite, shipped Thrillshare platform APIs in Ruby on Rails for Vue.js and mobile clients, and led shared services for alerting, forms, ETL, translation, LMS, and real-time messaging. That was platform engineering in practice: secure sign-in and session boundaries, reusable services, AWS/Kubernetes operations, and patterns other engineers could build on.',
      'Since leaving I have stayed deeply hands-on — roughly 80% of my time in architecture and code. At Trivelta I lead the PAM platform team while building a read-only MCP connector so admins can analyze operator data through standard AI clients without bypassing existing auth, RBAC, or audit controls — and I am early-designing an AI-augmented support ticketing sub-product for iGaming operators (agents, harnesses, evals, RAGs, knowledge bases) on top of that surface. That builds on what I started as VP at Apptegy, when I led org-wide AI enablement that improved productivity by 10% and cut code review time by 60%. I care about AI that raises the floor for engineers and products — with security, quality, and judgment — not hype.',
      'If the Platform Engineer role is the right door, I am ready. If AI engineering or another hands-on seat is a better fit given my history and where Apptegy is investing now, I would welcome that conversation too. Either way, I would be glad to talk about how I can help again.',
    ],
    closing: 'Best regards,',
    signature: 'Ben Orozco',
    summary:
      'Returning-alumni cover letter for Apptegy: Platform Engineer as the concrete door, plus hands-on MCP/agentic AI work at Trivelta (PAM connector + AI support ticketing) and openness to AI Engineering or the best return path.',
  },
};
