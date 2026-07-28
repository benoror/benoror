import type { IResumeVariantDefinition } from '../schema.js';
import { getBaseVariantCompany, getBaseVariantRole, getBaseVariantSkill } from './utils.js';

const trivelta = getBaseVariantCompany('Trivelta');
const apptegy = getBaseVariantCompany('Apptegy');
const brokerlit = getBaseVariantCompany('Brokerlit');
const baseql = getBaseVariantCompany('BaseQL');
const healthTree = getBaseVariantCompany('HealthTree');
const ecaresoft = getBaseVariantCompany('Ecaresoft');
const triveltaLeadRole = getBaseVariantRole(trivelta, 0);
const apptegyVpRole = getBaseVariantRole(apptegy, 0);
const apptegyLeadRole = getBaseVariantRole(apptegy, 1);
const brokerlitFounderRole = getBaseVariantRole(brokerlit, 0);
const baseqlFounderRole = getBaseVariantRole(baseql, 0);
const healthTreeCtoRole = getBaseVariantRole(healthTree, 0);
const ecaresoftIntlCtoRole = getBaseVariantRole(ecaresoft, 0);
const ecaresoftNimboCtoRole = getBaseVariantRole(ecaresoft, 1);

export const nextpatientStaffVariant: IResumeVariantDefinition = {
  slug: 'nextpatient-staff',
  label: 'Staff Engineer · Healthcare Product',
  metadata: {
    title: 'Ben Orozco - Staff Software Engineer',
    description: 'Tailored resume and cover letter for a staff-level, hands-on full-stack product role in healthcare software.',
  },
  resume: {
    about: {
      header: 'Staff Software Engineer · Full-Stack Product Builder · Python / JavaScript / PostgreSQL',
      about_me: 'Full-stack engineer and product builder with 15+ years shipping software in U.S. and LatAm startups, including four years in healthcare: EHR and practice-management systems used daily by physicians and clinic staff, and a patient-facing platform for cancer patients. I work end to end in [Python](#backend-other), [JavaScript/TypeScript](#typescript) and [PostgreSQL](#databases), plus the infrastructure underneath, and I do my best work owning a meaningful slice of product from the first customer conversation through production and iteration. I have also led engineering teams as VP and CTO, up to 140+ engineers, which shaped how I scope work, sequence delivery and review code, but building is still the part I want to spend my days on. Comfortable in ambiguity, opinionated about UX details, and hands-on with AI-assisted engineering and agentic workflows in everyday delivery.',
    },
    companies: [
      {
        ...trivelta,
        description: 'B2B iGaming technology provider. Current hands-on role building operator-facing product across a legacy platform and a greenfield replacement — closest evidence of day-to-day Python, React and product ownership.',
        roles: [
          {
            ...triveltaLeadRole,
            description: 'Hands-on technical lead for the player account management platform, building operator-facing admin tooling and analytics across a legacy system and its greenfield replacement.',
            achievements: [
              {
                description: 'Architecting and writing the admin backend in [FastAPI](#backend-other)/[Python](#backend-other) with DDD bounded contexts and typed [Pydantic](#backend-other) contracts, deployed on [AWS](#aws) serverless ([Lambda](#serverless-aws), [DynamoDB](#serverless-aws), [Athena](#backend-other), [OpenSearch](#backend-other), [Cognito](#serverless-aws), [EventBridge](#aws)) with a [React](#react) admin UI on top.',
              },
              {
                description: 'Shipping the backoffice in vertical slices, including reporting with parallel cross-store analytics enrichment and tenant-aware currency translation, replacing Tableau views with in-product dashboards operators actually use.',
              },
              {
                description: 'Working across a legacy platform and a new one at the same time, keeping the existing product healthy while the replacement is built and migrated behind feature flags.',
              },
              {
                description: 'Raising delivery quality through design reviews, RFD/PRD planning, [code reviews](#technical-leadership), [testing](#ruby-on-rails), [CI/CD](#devops-other) and trunk-based development.',
              },
              {
                description: 'Standardizing practical [AI workflows](#ai-workflows) for the team: agent rules and documentation, verification-first loops, and automation of repeatable engineering tasks.',
              },
            ],
          },
        ],
      },
      {
        ...apptegy,
        description: 'EdTech SaaS serving 6,000+ school districts and 10MM+ users. Evidence of scheduling, notification and integration-heavy product work at real scale, plus practical AI adoption across engineering.',
        roles: [
          {
            ...apptegyVpRole,
            description: 'Engineering leadership as the company scaled toward Series-C, staying close to architecture, delivery quality and hands-on AI enablement.',
            achievements: [
              {
                description: 'Led AI enablement across engineering, driving practical adoption of [Cursor](#ai-tools), [Claude](#ai-tools), [CodeRabbit](#ai-tools) and [Gemini](#ai-tools), which improved productivity by 10% and cut code review time by 60%.',
              },
              {
                description: 'Helped hire and lead an organization that grew to 140+ engineers across the U.S. and Mexico, running interview loops and coaching engineers and managers.',
              },
              {
                description: 'Drove simplification and cost reduction of a gRPC microservices landscape and in-house frameworks around clearer domain boundaries.',
              },
            ],
          },
          {
            ...apptegyLeadRole,
            description: 'Hands-on platform and product engineering during rapid growth from ~500 to 2,000+ school districts: service architecture, identity, notifications, integrations and delivery.',
            achievements: [
              {
                description: 'Built a multi-channel reminder and alerting service (SMS, voice/TTS, push, email) across [Twilio](#integrations), [Sendgrid](#integrations) and social providers, scaling from tens to thousands of notifications per minute in multiple languages.',
              },
              {
                description: 'Built platform services and APIs in [Ruby on Rails](#ruby-on-rails) and [PostgreSQL](#databases) supporting web and mobile clients, with [Sidekiq](#ruby-on-rails) handling hundreds of thousands of background jobs a day.',
              },
              {
                description: 'Built an identity provider on [OAuth2](#apis) and [OpenID Connect](#apis) for SSO and user management across a growing product suite with a constant inflow of thousands of new users.',
              },
              {
                description: 'Shipped a forms and surveys builder, an ETL pipeline revamp, a translation service and a horizontally scalable real-time chat system.',
              },
              {
                description: 'Owned deployment and reliability across [AWS](#aws), [Kubernetes](#kubernetes) and [CI/CD](#devops-other), and pushed testing and code review discipline across the team.',
              },
            ],
          },
        ],
      },
      {
        ...healthTree,
        description: 'Healthcare platform for cancer patients, their families and caregivers, with the mission of accelerating the finding of a cure. Patient-facing healthcare product built with a small team.',
        roles: [
          {
            ...healthTreeCtoRole,
            description: 'CTO of a small team, coding daily on web and mobile products that helped patients find their best treatment options.',
            achievements: [
              {
                description: 'Hands-on across backend APIs in [Ruby on Rails](#ruby-on-rails), [React.js](#react) clients and data pipelines, including code review and testing.',
              },
              {
                description: 'Built the feedback loop between product and patients using [Metabase](#devops-other), [Sentry](#devops-other) and [Intercom](#product), so decisions came from real usage instead of guesswork.',
              },
              {
                description: 'Automated the product lifecycle through DevOps and CI/CD pipelines, and set up a lean [Kanban](#product) delivery process from scratch.',
              },
              {
                description: 'Recruited and retained engineers in a competitive U.S. market while keeping a small team shipping.',
              },
            ],
          },
        ],
      },
      {
        ...ecaresoft,
        description: 'EHR and hospital information systems for clinics and hospitals in Latin America and the Middle East. Four years inside the software doctors and front-desk staff use all day.',
        roles: [
          {
            ...ecaresoftNimboCtoRole,
            description: 'Led product and engineering for Nimbo, a cloud EHR and practice-management app, from MVP to product-market fit with thousands of monthly active physicians and clinic staff.',
            achievements: [
              {
                description: 'Owned the patient and practice workflows end to end — scheduling, clinical records, billing — and learned how much of a clinic\'s day is spent on busywork that software should absorb.',
              },
              {
                description: 'Built fault-tolerant APIs and services in [Ruby](#ruby-on-rails), [Java](#backend-other), [PostgreSQL](#databases), [Redis](#databases) and [Sidekiq](#ruby-on-rails), with an [Ember.js](#frontend-other) frontend.',
              },
              {
                description: 'Delivered specialized capabilities: a drug interactions service on Wolters Kluwer\'s Medi-Span®, full-text search on [Apache Solr](#backend-other), and a prediction and classification service in [Python](#backend-other) and [Tensorflow](#ai-product-features).',
              },
              {
                description: 'Stayed close to physicians and clinic staff, treating UX quality as a product requirement rather than a nice-to-have in a market where the incumbent software was dated.',
              },
            ],
          },
          {
            ...ecaresoftIntlCtoRole,
            description: 'CTO for the wider product portfolio, leading technology strategy and delivery as the business entered Argentina and the Middle East.',
            achievements: [
              {
                description: 'Launched internationalization for new markets through APIs, microservices and serverless functions.',
              },
              {
                description: 'Improved availability and resilience with containerization, elastic infrastructure, automated testing and CI/CD.',
              },
              {
                description: 'Worked directly with Product, Sales and Support to turn customer feedback into roadmap decisions, including joining customer conversations to hear problems first-hand.',
              },
            ],
          },
        ],
      },
      {
        ...brokerlit,
        description: 'Real estate SaaS providing an MLS, CMS and CRM platform for brokers. Side venture built and run with a very small team, shipping the whole stack myself.',
        roles: [
          {
            ...brokerlitFounderRole,
            description: 'Technical co-founder shipping the entire product across backend, frontend and infrastructure.',
            achievements: [
              {
                description: 'Built the platform hands-on in [Ruby on Rails](#ruby-on-rails), [TypeScript](#typescript), [React.js](#react) and [Next.js](#next.js).',
              },
              {
                description: 'Ran infrastructure on [Fly.io](#devops-other) and [Vercel](#next.js), keeping operations cheap and the iteration loop short.',
              },
            ],
          },
        ],
      },
      {
        ...baseql,
        description: 'GraphQL access point for cloud data (Airtable & Google Sheets), built as a bootstrapped side project. 🎯 **Acquired in 2024**',
        roles: [
          {
            ...baseqlFounderRole,
            description: 'Founder who built, launched, supported and sold the product without outside funding.',
            achievements: [
              {
                description: 'Full-stack [Node.js](#javascript), [React.js](#react) and [Next.js](#next.js) development, from the API layer to the marketing site.',
              },
              {
                description: 'Handled support and customer conversations directly, which is where most of the roadmap came from.',
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
        description: 'Primary area of expertise: [Python](#backend-other) services, [Ruby on Rails](#ruby-on-rails) applications, REST and GraphQL APIs, background job processing, and [PostgreSQL](#databases) schema design and query optimization at production scale.',
      },
      {
        ...getBaseVariantSkill('frontend'),
        order: 2,
        description: 'Full-stack range across [React](#react), [Next.js](#next.js), [TypeScript](#typescript) and plain JavaScript, with enough design sense to care about how a screen feels to the person using it forty times a day.',
      },
      {
        ...getBaseVariantSkill('product'),
        order: 3,
        description: 'Product-minded engineering: talking to customers, scoping the smallest thing that solves the problem, and judging trade-offs by user and business outcomes rather than technical preference.',
      },
      {
        ...getBaseVariantSkill('ai'),
        order: 4,
        level: 85,
        description: 'Daily use of AI-assisted engineering and agentic workflows, plus shipped AI product features: chatbots, RAG, prompt and context tuning, and privacy guardrails.',
      },
      {
        ...getBaseVariantSkill('devops'),
        order: 5,
        description: 'Comfortable owning what I ship: [Linux](#devops-other), [Docker](#docker), [AWS](#aws), CI/CD, observability, and infrastructure that stays simple enough for a small team to run.',
      },
      {
        ...getBaseVariantSkill('leadership'),
        order: 6,
        description: 'Leadership experience applied as a senior IC: technical direction, architecture and code reviews, mentoring, and helping teammates ship without adding process weight.',
      },
    ],
  },
  coverLetter: {
    title: 'Ben Orozco - Cover Letter for NextPatient',
    targetCompany: 'NextPatient',
    targetRole: 'Staff Software Engineer',
    recipient: 'NextPatient hiring team',
    greeting: 'Dear NextPatient team,',
    paragraphs: [
      'I spent four years building the kind of software you are replacing. At Ecaresoft I led Nimbo, a cloud EHR and practice-management product for clinics in Latin America, and before that the wider hospital systems portfolio. I sat with physicians and front-desk staff, watched them fight fax machines and screens designed in 2004, and shipped scheduling, records and billing workflows against that reality. Your description of the doctor\'s office experience as "dated and terrible" is not a marketing line to me, it is what I saw every week.',
      'I am applying as an individual contributor on purpose. I have been a VP of Engineering and a CTO, most recently leading an organization that grew to 140+ engineers, and I am glad I did it. But the work I keep coming back to is owning a slice of product end to end: writing the code, talking to the people who use it, and staying accountable for whether it actually made their day better. Today I am a hands-on lead building a greenfield admin platform in Python and FastAPI with a React frontend, while keeping the legacy system it replaces alive — the same two-track reality I would expect at NextPatient.',
      'The rest of the fit is straightforward. Python, JavaScript and Postgres on Linux is the stack I have worked in for most of my career. I have built the notification layer you describe as interactive reminders: a multi-channel SMS, voice, push and email service on Twilio and Sendgrid that scaled from tens to thousands of messages per minute in multiple languages. I have run AI enablement for an engineering organization, where adoption of tools like Cursor and Claude improved productivity by 10% and cut code review time by 60%, and I use agentic workflows daily rather than as a demo. And I have started three companies, one of which I built alone and sold in 2024, so ambiguity and rapid change are the conditions I am used to, not an adjustment.',
      'What made me want to write this letter, though, was the "smaller by choice, self-funded" part. I have worked inside a VC-funded scale-up and seen how much energy goes toward the next round rather than the customer. A profitable 40-person company that is the top-rated product in its category is a much better place to do careful work that ships. I would be glad to talk about which slice of the product you need owned.',
    ],
    closing: 'Best regards,',
    signature: 'Ben Orozco',
    summary: 'Tailored cover letter for NextPatient focused on healthcare and EHR product experience, hands-on full-stack Python/JavaScript/Postgres work, and a deliberate move back to senior IC building.',
  },
};
