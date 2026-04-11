import type { IResumeVariantDefinition } from '../schema.js';
import { getBaseVariantCompany, getBaseVariantRole, getBaseVariantSkill } from './utils.js';

const apptegy = getBaseVariantCompany('Apptegy');
const healthTree = getBaseVariantCompany('HealthTree');
const ecaresoft = getBaseVariantCompany('Ecaresoft');
const baseql = getBaseVariantCompany('BaseQL');
const apptegyVpRole = getBaseVariantRole(apptegy, 0);
const apptegyLeadRole = getBaseVariantRole(apptegy, 1);
const healthTreeCtoRole = getBaseVariantRole(healthTree, 0);
const ecaresoftIntlCtoRole = getBaseVariantRole(ecaresoft, 0);
const ecaresoftNimboCtoRole = getBaseVariantRole(ecaresoft, 1);
const baseqlFounderRole = getBaseVariantRole(baseql, 0);

export const recruitedgeGlobalVariant: IResumeVariantDefinition = {
  slug: 'recruitedge-global',
  label: 'AI Leadership Mandates',
  metadata: {
    title: 'Ben Orozco - AI Leadership Resume',
    description: 'Tailored resume and cover letter for Director of AI Engineering and VP Engineering AI Product opportunities.',
  },
  resume: {
    about: {
      header: 'VP Engineering / Director of AI Engineering · Technical Generalist · AI Product Strategy',
      about_me: 'Executive-level engineering leader with a hands-on software foundation and repeated experience owning product, engineering, architecture, and AI strategy in SaaS environments. Built and led organizations from early-stage startup teams to 140+ engineers, partnered closely with CTOs, CEOs, product, and go-to-market leaders, and stayed close to delivery, architecture, and quality with a strong generalist mindset. Particularly relevant for senior AI engineering leadership roles: AI-first product architecture, agentic workflow enablement, globally distributed team leadership, and measurable business impact across high-growth environments including 10MM+ end users, Series-C scale execution, 100MM+ ARR context, and practical AI adoption that improved productivity by 10% while reducing code review time by 60%.',
    },
    companies: [
      {
        ...apptegy,
        description: 'High-growth SaaS platform serving 6,000+ school districts and 10MM+ users across the U.S. and Canada. Executive leadership scope spanning product delivery, engineering scale, architecture evolution, and AI enablement during scale-up toward Series-C and 100MM+ ARR.',
        roles: [
          {
            ...apptegyVpRole,
            description: 'Executive engineering leader owning organizational scale, delivery quality, architecture direction, and AI enablement across a distributed engineering organization in a high-growth SaaS environment.',
            achievements: [
              {
                description: 'Helped hire, shape, and lead an engineering organization of 140+ engineers across multiple regions, strengthening manager quality, team health, and delivery performance.',
              },
              {
                description: 'Partnered on organizational restructuring, planning frameworks, and operating rhythms as the company matured toward Series-C scale and 100MM+ ARR complexity.',
              },
              {
                description: 'Led AI enablement initiatives across engineering, driving adoption of tools such as [Cursor](#ai-tools), [Claude](#ai-tools), [CodeRabbit](#ai-tools), and [Gemini](#ai-tools), resulting in a 10% productivity increase and 60% reduction in code review time.',
              },
              {
                description: 'Sponsored and shipped high-impact platform and product initiatives with consistent cadence, reliability, and scalability for millions of end users.',
              },
              {
                description: 'Advocated architecture simplification and cost reduction by evolving a gRPC-based microservices landscape and internal frameworks around clearer domain boundaries and more sustainable delivery.',
              },
            ],
          },
          {
            ...apptegyLeadRole,
            description: 'Technical leadership role spanning platform architecture, infrastructure, product delivery, and team growth during rapid company expansion from roughly 500 to 2,000+ districts.',
            achievements: [
              {
                description: 'Led platform and infrastructure engineering across internal and customer-facing products, combining hands-on development with architecture leadership and delivery ownership.',
              },
              {
                description: 'Built and scaled core services including identity, alerting, translation, data pipelines, forms, learning management, and real-time communication capabilities.',
              },
              {
                description: 'Drove engineering quality through architecture reviews, code reviews, testing discipline, and team mentorship across a growing organization.',
              },
              {
                description: 'Owned delivery across AWS, Kubernetes, CI/CD, and release management for a service-oriented platform supporting large-scale usage.',
              },
              {
                description: 'Interviewed and onboarded backend and full-stack engineers while partnering closely with product on sequencing and agile execution.',
              },
            ],
          },
        ],
      },
      {
        ...healthTree,
        description: 'Mission-driven health technology platform for cancer patients and caregivers. CTO role combining product strategy, engineering execution, team formation, and operational maturity.',
        roles: [
          {
            ...healthTreeCtoRole,
            description: 'CTO responsible for engineering leadership, product execution, hiring, and technical strategy across web, mobile, APIs, and data workflows.',
            achievements: [
              {
                description: 'Built the engineering team, delivery processes, and technical operating model across backend APIs, React-based clients, and data-oriented systems.',
              },
              {
                description: 'Defined technology strategy and architecture aligned with product vision, balancing delivery speed, reliability, and user impact.',
              },
              {
                description: 'Introduced DevOps, CI/CD, analytics, and support tooling that improved release quality, customer insight, and operational visibility.',
              },
              {
                description: 'Established product development workflows and coaching practices that improved team execution, quality, and cross-functional collaboration.',
              },
              {
                description: 'Recruited and retained strong engineers in a competitive U.S. market while keeping the team aligned to mission and outcomes.',
              },
            ],
          },
        ],
      },
      {
        ...ecaresoft,
        description: 'Healthcare SaaS and hospital systems business operating across Latin America and the Middle East. Executive scope across international expansion, product development, engineering, and operations.',
        roles: [
          {
            ...ecaresoftIntlCtoRole,
            description: 'CTO role focused on technology strategy, software delivery, operations, and cross-functional alignment as the business expanded into new international markets.',
            achievements: [
              {
                description: 'Owned technology strategy and architecture decisions supporting expansion into Argentina and the Middle East, including APIs, microservices, and serverless capabilities.',
              },
              {
                description: 'Improved availability and resilience through stronger cloud architecture, CI/CD, automated testing, containerization, and DevOps practices.',
              },
              {
                description: 'Aligned product development, operations, and performance management using SCRUM, Kanban, OKRs, reviews, and one-on-one coaching.',
              },
              {
                description: 'Worked closely with Product, Sales, and Support leadership to align roadmap priorities, customer feedback, and execution against business goals.',
              },
            ],
          },
          {
            ...ecaresoftNimboCtoRole,
            description: 'CTO for Nimbo, leading product and platform scale from MVP to product-market fit across physicians and clinics in Latin America.',
            achievements: [
              {
                description: 'Scaled the platform to thousands of MAUs and growing ARR by aligning engineering execution with product quality and user experience.',
              },
              {
                description: 'Defined system architecture and launched reliable APIs, microservices, and supporting infrastructure across Ruby, Java, PostgreSQL, Redis, and Sidekiq.',
              },
              {
                description: 'Delivered specialized capabilities including drug interaction workflows, full-text search, and a machine learning prediction and classification service in [Python](#backend-other) and [Tensorflow](#ai-product-features).',
              },
              {
                description: 'Improved team effectiveness through better recruiting, coaching, and lean product delivery practices.',
              },
            ],
          },
        ],
      },
      {
        ...baseql,
        description: 'Founder-led SaaS product turning cloud data sources into a GraphQL access layer; built from zero to acquisition.',
        roles: [
          {
            ...baseqlFounderRole,
            description: 'Founder and product builder responsible for end-to-end strategy, architecture, product execution, and shipping until acquisition.',
            achievements: [
              {
                description: 'Built and launched the product hands-on across backend, frontend, infrastructure, and product decisions using [Node.js](#javascript), [React.js](#react), [Next.js](#next.js), and [Tailwind CSS](#react).',
              },
              {
                description: 'Took the company from side project to successful acquisition, demonstrating founder-level ownership and execution speed.',
              },
            ],
          },
        ],
      },
    ],
    skills: [
      {
        ...getBaseVariantSkill('leadership'),
        description: 'Executive-level engineering leadership across product, engineering, architecture, hiring, and AI strategy. Experienced scaling organizations from early-stage teams to 140+ engineers while staying hands-on where needed with a practical generalist orientation.',
      },
      {
        ...getBaseVariantSkill('product'),
        description: 'Product-minded technical leadership with ownership of roadmap trade-offs, delivery strategy, UX quality, and business outcomes in SaaS and platform environments.',
      },
      {
        ...getBaseVariantSkill('ai'),
        order: 3,
        level: 85,
        description: 'AI engineering leadership spanning AI-first product architecture, practical AI adoption, agentic workflows, internal enablement, and production-oriented experimentation.',
      },
      {
        ...getBaseVariantSkill('backend'),
        order: 4,
        description: 'Strong backend and platform foundation across APIs, distributed systems, service architecture, integrations, and scalable cloud systems used as the backbone for product and AI delivery.',
      },
      {
        ...getBaseVariantSkill('frontend'),
        order: 5,
        description: 'Frontend and product-surface experience across React, Next.js, TypeScript, and UX-sensitive delivery, useful when AI products need fast iteration across the full stack.',
      },
      {
        ...getBaseVariantSkill('devops'),
        order: 6,
        description: 'Infrastructure and delivery leadership across CI/CD, cloud architecture, Kubernetes, observability, and operational reliability in growing organizations.',
      },
    ],
  },
  coverLetter: {
    title: 'Ben Orozco - Cover Letter for AI Leadership Roles',
    targetRole: 'Director of AI Engineering / VP of Engineering (AI Products)',
    recipient: 'Hiring stakeholders',
    date: 'April 2026',
    greeting: 'Dear hiring team,',
    paragraphs: [
      'Thank you for sharing the Director of AI Engineering and VP of Engineering (AI Products) mandates. I prepared this tailored version of my resume to more clearly reflect the areas your team highlighted: executive leadership scope, measurable AI-first product impact, team scale, and strategic business contribution.',
      'My background is strongest at the intersection of engineering leadership, product strategy, and hands-on technical execution. Most recently at Apptegy, I helped shape and lead an organization of 140+ engineers, supported scale-up execution toward Series-C and 100MM+ ARR complexity, and led AI enablement efforts that improved engineering productivity by 10% and reduced code review time by 60%. Across HealthTree and Ecaresoft, I operated in CTO roles spanning product direction, architecture, hiring, delivery systems, and cross-functional execution in high-growth environments.',
      'What I believe aligns especially well with your mandates is the combination of executive scope, builder mentality, and a technical generalist approach: I have led teams, managers, and cross-functional initiatives while still contributing directly to architecture, platform evolution, AI workflows, and product delivery. That mix has been especially valuable in ambiguous, fast-moving SaaS environments where organizations need both strategic leadership and technical depth.',
      'I would be glad to continue the conversation and provide any additional context that helps position my profile for the current searches. Thank you again for the opportunity and for the thoughtful feedback on how to strengthen alignment.',
    ],
    closing: 'Best regards,',
    signature: 'Ben Orozco',
    summary: 'Tailored cover letter focused on Director of AI Engineering and VP of Engineering (AI Products) opportunities.',
  },
};
