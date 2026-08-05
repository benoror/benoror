import type { IResumeVariantDefinition } from '../schema.js';
import { getBaseVariantCompany, getBaseVariantRole, getBaseVariantSkill } from './utils.js';

const trivelta = getBaseVariantCompany('Trivelta');
const apptegy = getBaseVariantCompany('Apptegy');
const healthTree = getBaseVariantCompany('HealthTree');
const ecaresoft = getBaseVariantCompany('Ecaresoft');
const baseql = getBaseVariantCompany('BaseQL');
const triveltaLeadRole = getBaseVariantRole(trivelta, 0);
const apptegyVpRole = getBaseVariantRole(apptegy, 0);
const apptegyLeadRole = getBaseVariantRole(apptegy, 1);
const healthTreeCtoRole = getBaseVariantRole(healthTree, 0);
const ecaresoftNimboCtoRole = getBaseVariantRole(ecaresoft, 1);
const ecaresoftIntlCtoRole = getBaseVariantRole(ecaresoft, 0);
const baseqlFounderRole = getBaseVariantRole(baseql, 0);

export const fleetioEmGrowthVariant: IResumeVariantDefinition = {
  slug: 'fleetio-em-growth',
  label: 'Engineering Manager · Growth',
  metadata: {
    title: 'Ben Orozco - Engineering Manager, Growth',
    description:
      'Tailored resume and cover letter for an Engineering Manager role leading Growth engineering squads in B2B SaaS.',
  },
  sections: {
    coreSkills: false,
  },
  resume: {
    about: {
      header: 'Engineering Manager · Growth & Product Engineering · Rails / React SaaS',
      about_me:
        'Engineering manager and hands-on technical leader who measures teams by customer and business outcomes, not just features shipped. Led product and platform engineering in high-growth B2B SaaS—most recently helping scale Apptegy toward Series-C and 100MM+ ARR while hiring, coaching, and developing engineers across the U.S. and Mexico. Strong foundation in [Ruby on Rails](#ruby-on-rails) and [React](#react), comfortable partnering with Product, Design, and Analytics, and practiced at turning usage data, customer feedback, and feature-flagged delivery into clearer roadmap priorities. I care about engineering excellence and learning speed at the same time: quality systems, trustworthy instrumentation, and teams that can iterate without leaving a mess behind.',
    },
    companies: [
      {
        ...apptegy,
        description:
          'High-growth EdTech SaaS serving 6,000+ school districts and 10MM+ users. Closest evidence of people leadership, Rails/React product delivery, analytics-minded platform work, and cross-functional partnership in a scaled B2B environment.',
        roles: [
          {
            ...apptegyVpRole,
            endDate: 'Nov 2025',
            description:
              'Engineering leadership role focused on building high-performing teams, raising delivery quality, and aligning engineering execution with product and business outcomes during scale-up toward Series-C.',
            achievements: [
              {
                description:
                  'Helped hire, form, and lead an engineering organization of 140+ engineers across the U.S. and Mexico, with emphasis on coaching, performance conversations, manager development, and a culture of ownership.',
              },
              {
                description:
                  'Partnered with product and engineering leadership on roadmap sequencing, org design, and delivery systems as the company matured toward Series-C and 100MM+ ARR complexity.',
              },
              {
                description:
                  'Raised the bar for engineering excellence while protecting velocity: architecture simplification, clearer domain boundaries, and operating rhythms that helped teams ship reliably at scale.',
              },
              {
                description:
                  'Led practical AI enablement across engineering—[Cursor](#ai-tools), [Claude](#ai-tools), [CodeRabbit](#ai-tools), [Gemini](#ai-tools)—improving productivity by 10% and cutting code review time by 60%.',
              },
            ],
          },
          {
            ...apptegyLeadRole,
            description:
              'Hands-on engineering lead for platform and product work in [Ruby on Rails](#ruby-on-rails) and related services during rapid growth from ~500 to 2,000+ school districts.',
            achievements: [
              {
                description:
                  'Built and scaled product-facing services in [Ruby on Rails](#ruby-on-rails) supporting web and mobile clients, including analytics, data management, forms/surveys, email newsletters and marketing campaigns, and real-time messaging.',
              },
              {
                description:
                  'Shipped a multi-channel alerting service (SMS, voice/TTS, push, email) that scaled from tens to thousands of notifications per minute—work that sat directly on adoption and engagement workflows for school districts.',
              },
              {
                description:
                  'Implemented an AuthN/Z identity provider on [OAuth2](#apis) and [OpenID Connect](#apis) to support SSO and user management across a growing product suite with a constant inflow of thousands of new users.',
              },
              {
                description:
                  'Partnered closely with Product as scrum master and technical lead, sequencing work, reviewing code, and coaching engineers on quality, testing, and delivery discipline.',
              },
            ],
          },
        ],
      },
      {
        ...trivelta,
        description:
          'B2B technology provider. Current hands-on technical lead role with people management, analytics delivery, and feature-flagged product work—useful signal that I still operate close to code, data, and team health.',
        roles: [
          {
            ...triveltaLeadRole,
            description:
              'Technical lead for the player account management platform team: shipping operator-facing admin tooling and analytics while raising engineering quality across a distributed team.',
            achievements: [
              {
                description:
                  'Delivered in-product reporting and dashboards that replaced legacy Tableau views, with cross-store analytics enrichment so operators could act on usage and business data inside the product.',
              },
              {
                description:
                  'Improved delivery speed and quality through design reviews, RFD/PRD planning, [code reviews](#technical-leadership), testing, [CI/CD](#devops-other), feature-flagged rollouts, and trunk-based development.',
              },
              {
                description:
                  'Partnered with product and engineering leadership to scope and sequence roadmap work by business impact, technical risk, and execution constraints.',
              },
              {
                description:
                  'Helped build the Monterrey engineering team through international hiring, technical interviewing, coaching, and performance management.',
              },
            ],
          },
        ],
      },
      {
        ...healthTree,
        description:
          'Patient-facing healthcare platform. CTO role combining team building with product analytics and feedback loops tied to real usage.',
        roles: [
          {
            ...healthTreeCtoRole,
            description:
              'CTO for a small product engineering team, coding daily while creating the measurement and delivery systems the team needed to learn from customers.',
            achievements: [
              {
                description:
                  'Increased customer feedback awareness and success-metric visibility by standing up analytics and support infrastructure with [Metabase](#devops-other), [Sentry](#devops-other), and [Intercom](#product).',
              },
              {
                description:
                  'Built backend APIs in [Ruby on Rails](#ruby-on-rails), [React.js](#react) clients, and data pipelines while establishing review, testing, and CI/CD practices.',
              },
              {
                description:
                  'Created a lean product development pipeline from scratch using [Kanban](#product), prioritizing work against customer outcomes rather than activity.',
              },
              {
                description:
                  'Recruited and retained engineers in a competitive U.S. market while coaching for continuous improvement.',
              },
            ],
          },
        ],
      },
      {
        ...ecaresoft,
        description:
          'Healthcare SaaS across Latin America and the Middle East. Strong evidence of taking a product from MVP to product-market fit, growing usage, and aligning engineering with product and GTM partners.',
        roles: [
          {
            ...ecaresoftNimboCtoRole,
            description:
              'CTO for Nimbo, leading engineering and product execution from MVP to product-market fit with thousands of monthly active physicians and clinic staff.',
            achievements: [
              {
                description:
                  'Scaled the product toward thousands of MAUs and growing ARR by balancing UX quality, delivery speed, and technical foundations in a competitive market.',
              },
              {
                description:
                  'Established Rails/API and frontend delivery practices, then expanded into supporting services for search, clinical workflows, and ML-assisted prediction.',
              },
              {
                description:
                  'Improved team effectiveness through recruiting, coaching, and lean [Kanban](#product) product development.',
              },
            ],
          },
          {
            ...ecaresoftIntlCtoRole,
            description:
              'CTO for the wider portfolio, aligning technology strategy and delivery with Product, Sales, and Support as the business entered new markets.',
            achievements: [
              {
                description:
                  'Improved roadmap prioritization and team performance measurement by adopting SCRUM and Kanban, then reinforcing outcomes through OKRs, reviews, and one-on-ones.',
              },
              {
                description:
                  'Stood up analytics and customer-feedback infrastructure ([Metabase](#devops-other), [Sentry](#devops-other), [Intercom](#product)) so product decisions stayed connected to real usage.',
              },
              {
                description:
                  'Worked directly with Product, Sales, and Support to turn customer input into sequenced engineering work.',
              },
            ],
          },
        ],
      },
      {
        ...baseql,
        description:
          'Bootstrapped SaaS product turned cloud data sources into a GraphQL access layer. Founder-level ownership of activation, iteration, and customer conversations through acquisition.',
        roles: [
          {
            ...baseqlFounderRole,
            description:
              'Founder responsible for product, engineering, support, and growth decisions end to end until acquisition in 2024.',
            achievements: [
              {
                description:
                  'Built and shipped the product hands-on across [Node.js](#javascript), [React.js](#react), and [Next.js](#next.js), staying close to users and support conversations that shaped the roadmap.',
              },
              {
                description:
                  'Took the company from side project to successful acquisition, with direct ownership of whether the product was useful enough to retain and expand.',
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
          'Engineering management centered on hiring, coaching, performance, and team health. Experienced developing engineers and managers while keeping delivery accountable to customer and business outcomes.',
      },
      {
        ...getBaseVariantSkill('product'),
        order: 2,
        description:
          'Product-minded engineering leadership: roadmap trade-offs with Product and Design, usage-informed prioritization, and judging work by activation, adoption, and customer value rather than output alone.',
      },
      {
        ...getBaseVariantSkill('backend'),
        order: 3,
        description:
          'Deep [Ruby on Rails](#ruby-on-rails) and API background across B2B SaaS products, plus analytics-oriented services, background jobs, and the instrumentation needed to trust product decisions.',
      },
      {
        ...getBaseVariantSkill('frontend'),
        order: 4,
        description:
          'Product-surface experience in [React](#react), [TypeScript](#typescript), and related stacks—useful when growth work lives in onboarding, admin, and in-product conversion flows.',
      },
      {
        ...getBaseVariantSkill('devops'),
        order: 5,
        description:
          'Delivery systems that support safe iteration: CI/CD, feature-flagged rollouts, observability, and cloud infrastructure that lets teams move quickly without losing reliability.',
      },
      {
        ...getBaseVariantSkill('ai'),
        order: 6,
        level: 80,
        description:
          'Practical AI enablement for engineering teams—tooling adoption, workflow standards, and measurable improvements to productivity and review quality.',
      },
    ],
  },
  coverLetter: {
    title: 'Ben Orozco - Cover Letter for Fleetio Engineering Manager, Growth',
    targetCompany: 'Fleetio',
    targetRole: 'Engineering Manager, Growth',
    recipient: 'Fleetio hiring team',
    greeting: 'Dear Fleetio hiring team,',
    paragraphs: [
      'The Engineering Manager, Growth role is a strong fit for the kind of leadership I want to do next: building engineering teams whose success is measured in activation, adoption, and business impact, not just shipped features. Fleetio’s product-led growth mandate, Rails Foundation roots, and remote-friendly culture across the U.S., Canada, and Mexico all line up with how I have worked for years—close to product, close to the code, and serious about developing engineers.',
      'Most of my recent leadership experience was at Apptegy, a B2B SaaS platform that grew to 6,000+ school districts and 10MM+ users. As VP of Engineering I helped hire and lead an organization of 140+ engineers across both sides of the border, coached managers and ICs, and partnered with product leadership on sequencing and delivery through a Series-C scale-up. Earlier there as a hands-on lead, I built and scaled Rails services that sat on real customer journeys: identity and onboarding for thousands of new users, multi-channel alerts, analytics services, forms, and marketing campaign systems. That mix—people leadership plus Rails/React product depth—is the foundation I would bring to Growth 1 and Growth 2.',
      'I am deliberate about the experimentation side of this role. I have not spent my career inside a dedicated growth-org A/B factory, and I would rather say that plainly. What I have done repeatedly is build the conditions good growth engineering depends on: analytics and feedback loops with tools like Metabase, feature-flagged rollouts, product partnership that treats usage data as a first-class input, and coaching engineers to ship changes that are measurable and maintainable. At HealthTree and Ecaresoft I put those loops in place so roadmap decisions came from customer behavior instead of guesswork; at Trivelta I am still doing that hands-on with in-product analytics and flagged delivery while helping hire and develop the Monterrey team.',
      'I am looking for a seat where engineering is a strategic driver of growth, not a ticket queue. Leading two Growth squads against a shared mission—raising the quality bar while keeping learning loops fast—is exactly that. I would welcome a conversation about how I can help Fleetio turn experimentation and product insight into durable customer and revenue outcomes.',
    ],
    closing: 'Best regards,',
    signature: 'Ben Orozco',
    summary:
      'Tailored cover letter for Fleetio Engineering Manager, Growth—people leadership, Rails/React B2B SaaS, product analytics, and honest framing of experimentation experience.',
  },
};
