import { IRole } from '@workspace/data/types/resume';

export const APPTEGY: IRole[] = [
  {
    title: 'VP of Engineering',
    location: 'Monterrey, NL 🇲🇽',
    startDate: 'Apr 2021 ',
    endDate: 'Present',
    description: 'Scaling and shipping a suite of products used by 10MM\'s of users with quality and cadence goals in a high-growth Series-B EdTech startup. Help forming & leading a team of 120+ Engineers by building a high-performance yet thoughtful engineering culture. Enabler for growth & learning, facilitating continuous improvement and seek of excellence.',
    achievements: [],
    skills: [
      { name: 'Leadership' },
      { name: 'Management' },
      { name: 'Hiring' },
      { name: 'Mentoring' },
      { name: 'Agile' },
      { name: 'Architecture' },
    ]
  },
  {
    title: 'Lead Software Engineer',
    remote: true,
    location: 'Monterrey, NL 🇲🇽',
    startDate: 'Mar 2020',
    endDate: 'Abr 2021',
    description: 'Member of Platform & Infrastructure team working on new and existing products, building internal & user-facing components on top of a service oriented architecture.',
    achievements: [
      {
        description: 'Advocate best design, architecture, coding practices, peer reviewing & unit testing across the Engineering organization'
      }, {
        description: 'Scrum master working with Product team following Agile methodologies.'
      }, {
        description: 'Interview backend & full-stack candidates while onboarding 10\'s of new hires.'
      }, {
        description: 'Hands-on development of Thrillshare platform and APIs mainly in [Ruby on Rails](#ruby-on-rails), supporting Vue.js & Mobile (iOS & Android) clients.'
      }, {
        description: 'Supporting Micro-services built with [Ruby](#ruby), [Roda](#roda) micro-framework & [Sidekiq](#sidekiq): Analytics, Data Management, Translations, Learning Management System.'
      }, {
        description: 'Developed greenfield Ruby on Rails outpost services following SOA (service-oriented architecture):',
        subAchievements: [{
          description: 'Auth: AuthN/Z identity provider based on [OAuth2](#oauth2) & [OpenID Connect](#openid-connect) standards to support SSO (Single Sign-on) and User Management across all Apptegy\'s products',
        }, {
          description: 'Alerts: Multi-channel (SMS/Voice/TTS/Push), multi-provider (Twilio, Sendgrid, Facebook, Twitter) & multi-language relay service for school district notifications'
        }]
      }, {
        description: 'DevOps, CI/CD and release managment deploying in [AWS](#aws): [EC2](#ec2), [ELB](#elb), [EKS](#eks), [RDS](#rds), [S3](#s3) clusters using [Capistrano](#capistrano) & [Kubernetes](#kubernetes)'
      }],
      skills: [
        { name: 'Technical Leadership' },
        { name: 'Agile' },
        { name: 'System Design' },
        { name: 'Architecture' },
        { name: 'Code Review' },
        { name: 'Unit Testing' },
      ]
  }
]

export const HEALTHTREE: IRole[] = [
  {
    title: 'CTO',
    description: 'Developed web & mobile platforms for cancer patients to find their best treatment options.',
    achievements: [{
      description: 'Put together development team and processes for backend APIs in [Ruby on Rails](#ruby-on-rails) & , data pipelines & frontend clients by hands-on programming, code reviewing & testing.'
    }, {
      description: 'Automated products lifecycle via DevOps & Continuous Integration/Delivery pipelines.'
    }, {
      description: 'Increased customer feedback awareness and success metrics by creating support & analytics infrastructure in: [Metabase](#metabase) [Sentry](#sentry) [Intercom](#intercom)'
    }, {
      description: 'Created a product development pipeline from scratch to priotitize and measure performance using Agile [Kanban](#kanban) methodology in [Trello](#trello)'
    }, {
      description: 'Decreased bugs and improved overall quality via technical leadership & mentoring to achieve continuous improvement as a team'
    }, {
      description: 'Defined a Technology Strategy and Software Architecture aligned with product vision'
    }, {
      description: 'Recruited and retained top talent in a competitive U.S. market'
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
    location: 'Monterrey, NL 🇲🇽',
    startDate: 'Jan 2018',
    endDate: 'Jan 2019',
    description: 'Lead technology strategy, software development and operations to get to new SaaS markets in Argentina and Middle-East. Merged all product teams under a single organization culture. Worked closely with Product, Sales & Support organizations.',
    achievements: [{
      description: 'Technology strategy and software architecture',
      subAchievements: [{
        description: 'Succesfully launched internationalization for new markets via APIs, Microservices and serverless Lambda functions using.'
      }, {
        description: 'Achieved high availability and resilience cloud architecture by relying on DevOps, elastic infrastructure, containerization, automated testing and CI/CD pipelines for continuous quality and delivery with.'
      }]
    }, {
      description: 'Product development and operations',
      subAchievements: [{
        description: 'Improved roadmap priorization and improved performance measurement of dev teams by adopting [SCRUM](#scrum) & [Kanban](#kanban) Agile software development methodologies'
      }, {
        description: 'Increased customer feedback awareness and success metrics by creating support & analytics infrastructure in: [Metabase](#metabase) [Sentry](#sentry) [Intercom](#intercom)'
      }, {
        description: 'Achieved continuous improvement via OKRs, Performance Reviews and One-on-ones'
      }, {
        description: 'Recruited and succesfully retained top talent that added value to the company'
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
    location: 'Monterrey, NL 🇲🇽',
    startDate: 'Feb 2016',
    endDate: 'Jan 2019',
    description: 'Scaled EHR practice management app from MVP to product/market fit, thousands of MAUs and increasing ARR by providing the best user experience for LatAm physicians market.',
    achievements: [{
      description: 'Established development processes for coding, reviewing & testing backend APIs and frontend clients'
    }, {
      description: 'Defined Software Architecture and launched fault-tolerant APIs and microservices in [Ruby on Rails](#ruby-on-rails), [PostgreSQL](#psql), [Redis](#redis) and [Sidekiq](#sidekiq) for background processing',
      subAchievements: [{
        description: 'Drugs interactions [Java](#java) service based on Wolters Kluwer\'s Medi-Span®'
      }, {
        description: 'Machine Learning prediction & classification service based on [Python](#python) & [Tensorflow](#Tensorflow)'
      }, {
        description: 'Full-text search service based on [Apache Solr](#apache-solr)'
      }]
    }, {
      description: 'Implemented DevOps and continuous integration/delivery to production'
    }, {
      description: 'Reached balance between quality & speed by improving recruiting, management & coaching of development team'
    }, {
      description: 'Achieved Lean product development by relying on [Kanban](#kanban) methodology'
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
    location: 'Monterrey, NL 🇲🇽',
    startDate: 'Oct 2017',
    endDate: 'Jul 2018',
    description: 'Bootstraped a claims management system for the insurance industry in LatAm by working on technical development and defining a Domain-driven microservices architecture',
    achievements: [{
      description: 'Full-stack development using [Elixir](#elixir)/[Phoenix](#phoenix) for Backend and [Ember.js](#ember.js) for Frontend',
    }, {
      description: '[Domain-driven Design](#ddd) architecture using Bounded Contexts',
    }, {
      description: 'DevOps infrastructure using [Docker](#docker) containers on [AWS](#aws): [Elastic Beanstalk](#ebs)`',
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
    description: 'Launched an MVP of No-Code tool for internal business applications by defining a Client-server architecture using: `[Node.js](#node.js) / [Express](#express) [SQL Server](#sql-server) [Angular.js](#angular.js)',
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
    description: 'Define and execute ETL, Analytics and Business Intelligence processes and maintenance of existing software',
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
    description: 'Test-driven development for Supportability & SaaS enterprise product lines using [JavaScript](#javascript) and [Jasmine](#jasmine)',
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
    description: 'Launched SaaS/Marketplace developed in [Ruby on Rails](#ruby-on-rails) [PostgreSQL](#psql) [Heroku](#heroku)',
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
    description: 'Developed internal and customer apps in PHP Java and PL/SQL',
    achievements: [],
    skills: []
  }
]