import type { IResumeVariantDefinition } from '../schema.js';
import { getBaseVariantCompany, getBaseVariantRole, getBaseVariantSkill } from './utils.js';

const apptegy = getBaseVariantCompany('Apptegy');
const brokerlit = getBaseVariantCompany('Brokerlit');
const baseql = getBaseVariantCompany('BaseQL');
const ecaresoft = getBaseVariantCompany('Ecaresoft');
const apptegyVpRole = getBaseVariantRole(apptegy, 0);
const apptegyLeadRole = getBaseVariantRole(apptegy, 1);
const brokerlitFounderRole = getBaseVariantRole(brokerlit, 0);
const baseqlFounderRole = getBaseVariantRole(baseql, 0);
const ecaresoftIntlCtoRole = getBaseVariantRole(ecaresoft, 0);
const ecaresoftNimboCtoRole = getBaseVariantRole(ecaresoft, 1);

export const fleetioLeverageVariant: IResumeVariantDefinition = {
  slug: 'fleetio-leverage',
  label: 'Leverage Platform',
  metadata: {
    title: 'Ben Orozco',
    description: 'Tailored resume and cover letter for a staff-level leverage, internal tooling, and AI systems role.',
  },
  sections: {
    coreSkills: false,
  },
  resume: {
    about: {
      header: 'Technical Generalist · Platform Engineering · AI Systems & Workflows',
      about_me: 'Hands-on technical generalist with a background spanning engineering leadership, platform architecture, product thinking, and full-stack delivery across SaaS environments. Built platform engineering, systems and leverage that make other teams more effective. Across product and platform roles, I have built APIs, integrations, auth systems, internal platforms, CI/CD workflows, and AI-enabled engineering practices while staying close to usability, adoption, and business impact. I am especially energized by ambiguous, cross-functional problems where the right outcome is not a single feature, but a leverage layer that connects knowledge, workflows, and tools into something other people can extend and rely on.',
    },
    companies: [
      {
        ...apptegy,
        description: 'High-growth SaaS platform serving 6,000+ school districts and 10MM+ users across the U.S. and Canada. Strong fit for leverage-style work across internal platforms, identity, integrations, delivery systems, and AI enablement at scale.',
        roles: [
          {
            ...apptegyVpRole,
            description: 'Engineering leadership role with continued hands-on influence across AI enablement, platform quality, architecture simplification, and systems that improved developer effectiveness across a distributed organization.',
            achievements: [
              {
                description: 'Led AI enablement efforts across engineering, driving practical adoption of tools such as [Cursor](#ai-tools), [Claude](#ai-tools), [CodeRabbit](#ai-tools), and [Gemini](#ai-tools), which improved productivity by 10% and reduced code review time by 60%.',
              },
              {
                description: 'Sponsored and shipped high-impact platform and product work with strong reliability and scalability expectations for millions of end users.',
              },
              {
                description: 'Advocated architecture simplification and cost reduction by evolving a gRPC-based microservices landscape and internal frameworks around clearer domain boundaries and better delivery ergonomics.',
              },
            ],
          },
          {
            ...apptegyLeadRole,
            description: 'Hands-on platform and infrastructure leadership role focused on service architecture, identity, integrations, internal tooling, and scaling foundations during rapid company growth.',
            achievements: [
              {
                description: 'Led platform and infrastructure engineering across internal and customer-facing products, combining architecture leadership with direct implementation.',
              },
              {
                description: 'Built an AuthN/Z identity provider based on [OAuth2](#apis) and [OpenID Connect](#apis) to support SSO and user management across existing and newer products.',
              },
              {
                description: 'Built and scaled core services including alerts, translation, ETL/data pipelines, forms, learning management, and real-time messaging capabilities.',
              },
              {
                description: 'Owned delivery across AWS, Kubernetes, CI/CD, and release management for a service-oriented platform operating at meaningful scale.',
              },
            ],
          },
        ],
      },
      {
        ...brokerlit,
        description: 'Real estate SaaS spanning MLS, CMS, and CRM workflows. Useful evidence of fast-moving, full-stack product work with direct ownership over internal and external tools.',
        roles: [
          {
            ...brokerlitFounderRole,
            description: 'Technical co-founder role focused on shipping product quickly across backend, frontend, and infrastructure while working closely with actual user workflows.',
            achievements: [
              {
                description: 'Built the platform hands-on in [Ruby on Rails](#ruby-on-rails), [TypeScript](#typescript), [React.js](#react), and [Next.js](#next.js).',
              },
              {
                description: 'Owned infrastructure and developer workflow decisions using [Fly.io](#devops-other) and [Vercel](#next.js), keeping the product simple to ship and iterate.',
              },
            ],
          },
        ],
      },
      {
        ...baseql,
        description: 'Founder-led SaaS product turning cloud data sources into a GraphQL access layer; highly relevant to context layers, structured access to data, and enabling users with better interfaces over distributed systems.',
        roles: [
          {
            ...baseqlFounderRole,
            description: 'Founder and product builder responsible for end-to-end strategy, architecture, full-stack implementation, and shipping until acquisition.',
            achievements: [
              {
                description: 'Built a product centered on structured access to cloud data, solving the problem of turning messy underlying systems into a cleaner developer and user interface.',
              },
              {
                description: 'Shipped hands-on across [Node.js](#javascript), [React.js](#react), [Next.js](#next.js), APIs, and infrastructure, balancing product usability with technical depth.',
              },
              {
                description: 'Took the company from side project to successful acquisition, demonstrating ownership, speed, and practical product sense.',
              },
            ],
          },
        ],
      },
      {
        ...ecaresoft,
        description: 'Healthcare SaaS and hospital systems business across Latin America and the Middle East. Strong evidence of APIs, microservices, internal process design, product collaboration, and operating in ambiguity.',
        roles: [
          {
            ...ecaresoftIntlCtoRole,
            description: 'CTO role spanning technology strategy, software delivery, operations, and cross-functional alignment as the business expanded into new international markets.',
            achievements: [
              {
                description: 'Owned architecture and delivery decisions for APIs, microservices, and serverless capabilities supporting international expansion.',
              },
              {
                description: 'Improved availability and resilience through stronger cloud architecture, CI/CD, automated testing, containerization, and DevOps practices.',
              },
              {
                description: 'Worked closely with Product, Sales, and Support leadership to align priorities, execution, and operational feedback loops.',
              },
            ],
          },
          {
            ...ecaresoftNimboCtoRole,
            description: 'CTO for Nimbo, leading product and platform scale from MVP to product-market fit across physicians and clinics in Latin America.',
            achievements: [
              {
                description: 'Defined system architecture and launched reliable APIs, microservices, and supporting infrastructure across Ruby, Java, PostgreSQL, Redis, and Sidekiq.',
              },
              {
                description: 'Delivered specialized capabilities including a machine learning prediction and classification service in [Python](#backend-other) and [Tensorflow](#ai-product-features).',
              },
              {
                description: 'Improved team effectiveness through better recruiting, coaching, and lean product delivery practices.',
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
        description: 'Strong backend and integration foundation across APIs, auth, structured data access, service architecture, and systems that connect other systems together reliably.',
      },
      {
        ...getBaseVariantSkill('ai'),
        order: 2,
        level: 85,
        description: 'AI leverage work spanning AI-assisted engineering, internal enablement, agent workflows, context-layer thinking, and production-oriented adoption of AI tools.',
      },
      {
        ...getBaseVariantSkill('devops'),
        order: 3,
        description: 'Infrastructure and delivery experience across CI/CD, cloud architecture, Kubernetes, observability, and developer workflow reliability.',
      },
      {
        ...getBaseVariantSkill('frontend'),
        order: 4,
        description: 'Full-stack capability across React, Next.js, TypeScript, and UX-sensitive delivery for internal tools and product surfaces that need real adoption.',
      },
      {
        ...getBaseVariantSkill('leadership'),
        order: 5,
        description: 'Technical leadership focused on architecture, standards, cross-functional execution, and helping teams move faster through better systems rather than heavier process.',
      },
      {
        ...getBaseVariantSkill('product'),
        order: 6,
        description: 'Product-minded approach to internal tooling: talk to users, reduce friction, care about adoption, and build leverage that improves how people actually work.',
      },
    ],
  },
  coverLetter: {
    title: 'Ben Orozco - Cover Letter for Fleetio Leverage',
    targetCompany: 'Fleetio',
    targetRole: 'Staff Software Engineer, Leverage',
    recipient: 'Fleetio hiring team',
    greeting: 'Dear Fleetio hiring team,',
    paragraphs: [
      'The Leverage role immediately stood out to me because it sits at an intersection I care deeply about: internal developer effectiveness, product-minded tooling, and AI systems that become genuinely useful once they are connected to the right company context. I especially like that this is not a blank-slate “AI initiative,” but a chance to build the enterprise capabilities that help an existing ecosystem of internal tools scale with better identity, governance, and structured access to knowledge.',
      'Over the past 10 months, I have built a strong muscle around agentic workflows and AI-assisted engineering, learning directly where the tooling creates real leverage and where it can introduce noise, slop, or avoidable tech debt if not grounded in the right systems and practices. My background is a strong fit for that kind of work. At Apptegy, I led AI enablement efforts across engineering that improved productivity by 10% and reduced code review time by 60%, while also working on platform architecture, delivery quality, and systems at meaningful scale. Earlier there, I led platform and infrastructure work that included building an OAuth2 / OpenID Connect identity layer for SSO and user management, along with services for alerts, ETL, translation, and other integration-heavy workflows. Across BaseQL, Brokerlit, and Ecaresoft, I have repeatedly worked on APIs, structured access layers, microservices, internal process design, and full-stack product delivery in ambiguous environments.',
      'What I would bring to Fleetio is a technical generalist profile with strong backend depth, full-stack range, and a product-first mindset for internal tools. I like talking to users before over-designing systems, and I care a lot about adoption, not just shipping. That makes the Leverage mandate especially compelling: the work is not only to build connectors and context layers, but to create leverage that other teams across engineering, product, design, and operations will actually use.',
      'I’m also genuinely aligned with the engineering philosophy Fleetio describes around momentum, ownership, product focus, knowledge, and defaulting to action. That combination matches how I like to work. And since careful reading matters here too: coffee. I’d welcome the opportunity to talk further about how I could help shape the Leverage team as its founding engineer.',
    ],
    closing: 'Best regards,',
    signature: 'Ben Orozco',
    summary: 'Tailored cover letter for Fleetio focused on the Leverage team, AI knowledge infrastructure, internal tooling, integrations, auth, and product-minded developer effectiveness.',
  },
};
