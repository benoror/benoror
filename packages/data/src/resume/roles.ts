import { IRole } from './schema.js';

export const TRIVELTA: IRole[] = [
  {
    title: 'Engineering Manager, Backoffice',
    location: 'Monterrey, MX 🇲🇽',
    startDate: 'Sep 2026',
    endDate: 'Present',
    description: 'Promoted to lead three Backoffice engineering teams: PAM (player account management), TCM (Trivelta Client Management), and Data Engineering. Retain fractional responsibility as PAM Tech Lead and developer for selected platform initiatives.',
    achievements: [
      {
        description: 'Lead a 10-person Backoffice engineering group, with five direct reports (two Tech Leads and three Engineers) and five additional Engineers managed through the team leads.'
      }, {
        description: 'Own cross-team priorities, roadmap execution, delivery, and technical alignment across PAM, TCM, and Data Engineering.'
      }, {
        description: 'Remain hands-on as fractional PAM Tech Lead and developer for high-leverage work involving [ClickHouse](#backend-other), a secure MCP connector, and migration to [Amazon EKS](#kubernetes).'
      }, {
        hidden: true,
        description: 'Designing and building a read-only MCP connector for [Trivelta PAM](https://trivelta.com/pam): a curated, permission-bound tool surface over PAM analytics so authorized admins can analyze operator data through standard AI clients without privilege gain beyond existing RBAC, product gates, and audit posture.'
      }, {
        description: 'Shape the product and technical direction for a greenfield, AI-enabled support product tailored to iGaming operators; development has not yet started.'
      },
    ],
    skills: [
      { name: 'Engineering Management', slug: 'management' },
      { name: 'Technical Leadership', slug: 'technical-leadership' },
      { name: 'People Management', slug: 'management' },
      { name: 'Delivery Management', slug: 'technical-leadership' },
      { name: 'Architecture', slug: 'technical-leadership' },
      { name: 'ClickHouse', slug: 'backend-other' },
      { name: 'MCP', slug: 'multi-agent-orchestration' },
      { name: 'Amazon EKS', slug: 'kubernetes' },
      { name: 'AI Product Development', slug: 'ai-product-features' },
    ]
  },
  {
    title: 'Lead Software Engineer (Platform Team Lead)',
    location: 'Monterrey, MX 🇲🇽',
    startDate: 'Jan 2026',
    endDate: 'Aug 2026',
    description: 'Led the PAM platform team across legacy and greenfield systems, combining hands-on development, architecture, delivery, and engineer development.',
    achievements: [
      {
        description: 'Architected and built PAM admin capabilities in [Python](#backend-other)/[FastAPI](#backend-other), using typed contracts and domain boundaries across legacy and greenfield systems on AWS.'
      }, {
        description: 'Delivered operator-facing reporting with cross-store analytics enrichment and tenant-aware currency translation, replacing legacy Tableau views with in-product dashboards.'
      }, {
        description: 'Raised engineering quality through architecture and design reviews, RFD/PRD planning, code review, testing, CI/CD, feature-flagged releases, and trunk-based development.'
      }, {
        description: 'Partnered with Product and Engineering leadership to scope and sequence roadmap initiatives against business value, technical constraints, and delivery risk.'
      }, {
        description: 'Established practical AI-assisted engineering workflows, including tool guidance, agent rules, documentation, and repeatable automation.'
      }, {
        description: 'Helped build the Monterrey engineering team through international hiring, technical interviews, coaching, and performance management.'
      },
    ],
    skills: [
      { name: 'Technical Leadership', slug: 'technical-leadership' },
      { name: 'Architecture', slug: 'technical-leadership' },
      { name: 'Domain-Driven Design', slug: 'technical-leadership' },
      { name: 'Delivery management', slug: 'technical-leadership' },
      { name: 'Hiring manager', slug: 'recruitment' },
      { name: 'People management', slug: 'management' },
      { name: 'Python', slug: 'backend-other' },
      { name: 'FastAPI', slug: 'backend-other' },
      { name: 'AWS Serverless', slug: 'serverless-aws' },
      { name: 'AI enablement', slug: 'ai' },
    ]
  }
]

export const APPTEGY: IRole[] = [
  {
    title: 'VP of Engineering',
    location: 'Monterrey, MX 🇲🇽',
    startDate: 'Apr 2021',
    endDate: 'Nov 2025',
    description: 'Led engineering through high-growth scale, combining organization design, talent development, delivery systems, technical strategy, and cross-functional execution.',
    achievements: [
      {
        description: 'Helped hire, organize, and lead 140+ engineers across the U.S. and Mexico, developing managers and engineers through coaching, feedback, performance management, and clear accountability.'
      }, {
        description: 'Restructured teams and introduced planning and delivery systems as the company matured toward Series C and more than $100M ARR.'
      }, {
        description: 'Led organization-wide AI enablement with practical guidance for [Cursor](#ai-tools), [Claude](#ai-tools), [CodeRabbit](#ai-tools), and [Gemini](#ai-tools), increasing productivity by 10% and reducing code-review time by 60%.'
      }, {
        description: 'Partnered with Product and executive leadership on priorities, organizational design, delivery risk, and architecture decisions for products serving millions of users.'
      }, {
        description: 'Drove cost reduction and simplification across a gRPC microservices architecture and internal frameworks by clarifying domain boundaries and reducing unnecessary complexity.'
      },
    ],
    skills: [
      { name: 'Leadership', slug: 'leadership' },
      { name: 'Management', slug: 'management' },
      { name: 'Hiring', slug: 'recruitment' },
      { name: 'Mentoring', slug: 'management' },
      { name: 'Agile', slug: 'technical-leadership' },
      { name: 'Architecture', slug: 'technical-leadership' },
    ]
  },
  {
    title: 'Lead Software Engineer',
    location: 'Monterrey, MX 🇲🇽',
    startDate: 'Mar 2020',
    endDate: 'Apr 2021',
    description: 'Led platform and infrastructure work as Apptegy grew from roughly 500 to more than 2,000 school districts, combining architecture, hands-on development, delivery, and team leadership.',
    achievements: [
      {
        description: 'Built Thrillshare platform services and APIs in [Ruby on Rails](#ruby-on-rails) for Vue.js, iOS, and Android clients, with [Sidekiq](#ruby-on-rails) handling high-volume background work.'
      }, {
        description: 'Established architecture, code-review, and testing practices that raised engineering quality across teams.'
      }, {
        description: 'Designed and shipped shared platform services:',
        subAchievements: [{
          description: 'Built an AuthN/Z identity provider using [OAuth2](#apis) and [OpenID Connect](#apis), enabling SSO and user management across Apptegy products as thousands of new users entered the platform.'
        }, {
          description: 'Scaled school-district alerts from tens to thousands of notifications per minute through a multi-channel, multi-provider, multilingual relay service.'
        }, {
          description: 'Led shared services for forms and surveys, ETL, translation, email campaigns, learning management, and horizontally scalable real-time messaging.'
        }]
      }, {
        description: 'Owned CI/CD and production releases across [AWS](#aws) and [Kubernetes](#kubernetes), improving deployment consistency and operational reliability.'
      }, {
        description: 'Partnered with Product to sequence delivery, interviewed backend and full-stack candidates, and onboarded new engineers.'
      }],
      skills: [
        { name: 'Technical Leadership', slug: 'technical-leadership' },
        { name: 'Agile', slug: 'technical-leadership' },
        { name: 'System Design', slug: 'technical-leadership' },
        { name: 'Architecture', slug: 'technical-leadership' },
        { name: 'Code Review', slug: 'technical-leadership' },
        { name: 'Unit Testing', slug: 'ruby-on-rails' },
      ]
  }
]

export const BROKERLIT: IRole[] = [
  {
    title: 'Technical Co-Founder',
    description: 'Built and operated a real estate SaaS platform with a lean team.',
    achievements: [{
      description: 'Built the platform in [Ruby on Rails](#ruby-on-rails), [TypeScript](#typescript), [React](#react), and [Next.js](#next.js).'
    }, {
      description: 'Operated lean production infrastructure on [Fly.io](#devops-other) and [Vercel](#next.js).'
    }],
    skills: []
  }
]

export const BASEQL: IRole[] = [
  {
    title: 'Founder',
    description: 'Built, operated, and sold a bootstrapped GraphQL SaaS product.',
    achievements: [{
      description: 'Built the product across [Node.js](#javascript), [React](#react), [Next.js](#next.js), and Tailwind CSS.'
    }, {
      description: 'Owned production infrastructure and data operations on AWS and [MongoDB](#databases) through acquisition in 2024.'
    }],
    skills: []
  }
]

export const HEALTHTREE: IRole[] = [
  {
    title: 'CTO',
    description: 'Led technology and product delivery for web and mobile platforms helping cancer patients identify treatment options.',
    achievements: [{
      description: 'Built the engineering team and delivery practices while contributing directly to [Ruby on Rails](#ruby-on-rails) APIs, [React](#react) clients, data pipelines, code review, and testing.'
    }, {
      description: 'Automated build, test, and deployment workflows through CI/CD.'
    }, {
      description: 'Introduced [Metabase](#devops-other), [Sentry](#devops-other), and [Intercom](#product) to make product usage, incidents, and customer feedback visible.'
    }, {
      description: 'Established a Kanban product-development process to prioritize work and track delivery.'
    }, {
      description: 'Improved engineering quality through technical leadership, mentoring, code review, and testing.'
    }, {
      description: 'Defined technology strategy and software architecture aligned with the product vision.'
    }, {
      description: 'Recruited and retained engineers in a competitive U.S. market.'
    }],
    skills: [
      // { name: 'Ownership' },
      // { name: 'System Design' },
    ]
  }
]

export const ECARESOFT: IRole[] = [
  {
    title: 'CTO',
    location: 'Monterrey, MX 🇲🇽',
    startDate: 'Jan 2018',
    endDate: 'Jan 2019',
    description: 'Led technology strategy, engineering, and operations during expansion into Argentina and the Middle East. Unified product teams and partnered with Product, Sales, and Support.',
    achievements: [{
      description: 'Defined technology strategy and software architecture for international expansion.',
      subAchievements: [{
        description: 'Launched internationalization for new markets through APIs, microservices, and serverless functions.'
      }, {
        description: 'Improved availability and resilience through elastic infrastructure, containers, automated testing, and CI/CD.'
      }]
    }, {
      description: 'Improved product development and engineering operations.',
      subAchievements: [{
        description: 'Improved roadmap prioritization and delivery visibility through Scrum and [Kanban](#product).'
      }, {
        description: 'Introduced [Metabase](#devops-other), [Sentry](#devops-other), and [Intercom](#product) to connect usage, incidents, and customer feedback to product decisions.'
      }, {
        description: 'Established OKRs, performance reviews, and one-on-ones to improve accountability and engineer development.'
      }, {
        description: 'Recruited and retained engineers during international growth.'
      }]
    }],
    skills: [
      // { name: 'Ownership' },
      // { name: 'System Design' },
    ]
  },
  {
    title: 'CTO',
    project: 'Nimbo',
    projectUrl: 'https://www.nimbo-x.com',
    location: 'Monterrey, MX 🇲🇽',
    startDate: 'Feb 2016',
    endDate: 'Jan 2019',
    description: 'Scaled an EHR and practice-management product from MVP to product-market fit, thousands of monthly active users, and growing ARR in the Latin American physician market.',
    achievements: [{
      description: 'Established development, code-review, and testing practices for [Ruby on Rails](#ruby-on-rails) APIs and [Ember.js](#frontend-other) clients.'
    }, {
      description: 'Defined the architecture and launched fault-tolerant APIs and services using [Ruby](#ruby-on-rails), [PostgreSQL](#databases), [Redis](#databases), and [Sidekiq](#ruby-on-rails).',
      subAchievements: [{
        description: 'Built a drug-interaction service using Wolters Kluwer Medi-Span data.'
      }, {
        description: 'Built a prediction and classification service using [Python](#backend-other) and TensorFlow.'
      }, {
        description: 'Built full-text search using [Apache Solr](#backend-other).'
      }]
    }, {
      description: 'Implemented production infrastructure and CI/CD.'
    }, {
      description: 'Balanced quality and delivery speed through recruiting, coaching, and engineering management.'
    }, {
      description: 'Introduced [Kanban](#product) to improve product flow and prioritization.'
    }],
    skills: [
      // { name: 'Ownership' },
      // { name: 'System Design' },
    ]
  },
  {
    title: 'Tech Lead',
    project: 'Nebula',
    projectUrl: 'https://www.usenebula.com',
    location: 'Monterrey, MX 🇲🇽',
    startDate: 'Oct 2017',
    endDate: 'Jul 2018',
    description: 'Bootstrapped a claims-management product for the Latin American insurance market and defined its domain-driven service architecture.',
    achievements: [{
      description: 'Built the product with [Elixir/Phoenix](#backend-other) and [Ember.js](#frontend-other).'
    }, {
      description: 'Established bounded contexts using [Domain-Driven Design](#technical-leadership).'
    }, {
      description: 'Deployed containerized workloads on [AWS Elastic Beanstalk](#aws).'
    }],
    skills: [
      // { name: 'Ownership' },
      // { name: 'System Design' },
    ]
  }
]

export const PANAX: IRole[] = [
  {
    title: 'Full Stack Developer',
    location: '',
    startDate: '2014',
    endDate: '2016',
    description: 'Launched an MVP for a no-code internal-applications platform using [Node.js](#javascript), Express, [SQL Server](#databases), and [AngularJS](#frontend-other).',
    achievements: [],
    skills: []
  }
]

export const OPERIT: IRole[] = [
  {
    title: 'Software Consultant',
    location: '',
    startDate: '2014',
    endDate: '2014',
    description: 'Designed ETL, analytics, and business-intelligence workflows and maintained existing software.',
    achievements: [],
    skills: []
  }
]

export const SAP: IRole[] = [
  {
    title: 'Software Engineering Intern',
    location: '',
    startDate: '2013',
    endDate: '2014',
    description: 'Practiced test-driven development for enterprise SaaS product lines using [JavaScript](#javascript) and Jasmine.',
    achievements: [],
    skills: []
  }
]

export const COTIZAHOY: IRole[] = [
  {
    title: 'Technical Co-Founder',
    location: '',
    startDate: '2010',
    endDate: '2013',
    description: 'Launched a B2B SaaS marketplace built with [Ruby on Rails](#ruby-on-rails), [PostgreSQL](#databases), and Heroku.',
    achievements: [],
    skills: []
  }
]

export const NICMX: IRole[] = [
  {
    title: 'Software Development Intern',
    location: '',
    startDate: '2008',
    endDate: '2009',
    description: 'Developed internal and customer applications using PHP, Java, and PL/SQL.',
    achievements: [],
    skills: []
  }
]