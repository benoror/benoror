import { PERSONAL } from '@workspace/data/personal';
import { IRole, ISkill } from '@workspace/data/types/resume';
import { gmailAlias } from '@workspace/utils/email';

export const ABOUT = {
  name: PERSONAL.short_name,
  header: 'Lead Software Engineer - Full Stack Developer', // ToDo: FSDev not here, in roles. Alt. Software Engieneering Leader
  public_email: gmailAlias(PERSONAL.private_email, 'cv'),
  about_me: `VP Eng & CTO of SaaS startups with 100k's of users in U.S. & LATAM. Software engineer specialized in full stack web development and leading technical teams. Passionate about building end-to-end & customer-driven software products, mentoring engineers and leveraging technology to tackle real-world challenges.`
}

export const EDUCATION = [{
  institution: 'Hochschule Offenburg',
  institutionUrl: 'https://www.hs-offenburg.de/',
  location: 'Offenburg, Germany',
  title: 'MBA International Business Consulting',
  description: 'University of Applied Sciences Offenburg',
  startDate: 'Oct 2012',
  endDate: 'Feb 2014',
}, {
  institution: 'ITESM Monterrey',
  institutionUrl: 'https://tec.mx/en',
  location: 'Monterrey, Mexico',
  title: 'BS Computer Science and Technology',
  description: 'Monterrey Institute of Technology and Higher Education',
  startDate: 'Aug 2005',
  endDate: 'Dec 2009',
}]

export const LANGUAGES = [
  { name: '🇪🇸 Spanish', level: 100, proficiency: 'Native' },
  { name: '🇬🇧 English', level: 100, proficiency: 'Fluent' },
  { name: '🇩🇪 German', level: 25, proficiency: 'Basic' },
]

export const ROLES: IRole[] = [
  {
    title: 'VP of Engineering',
    company: 'Apptegy',
    companyUrl: 'https://www.apptegy.com/',
    location: 'Monterrey, NL 🇲🇽',
    startDate: 'Apr 2021 ',
    endDate: 'Present',
    description: 'Scaling and shipping a suite of products used by 3,000+ school districts in the US with quality and cadence goals in a high-growth Series-B EdTech startup. Help forming & leading a team of 120+ Engineers by building a high-performance yet thoughtful engineering culture. Enabler for growth & learning, facilitating continuous improvement and seek of excellence.',
    achievements: []
  },
  {
    title: 'Lead Software Engineer',
    company: 'Apptegy',
    companyUrl: 'https://www.apptegy.com/',
    location: 'Little Rock, AK 🇺🇸 / Remote 🌐',
    startDate: 'Mar 2020',
    endDate: 'Abr 2021',
    description: 'Member of Platform & Infrastructure team working on new and existing products, building internal & user-facing components on top of a service oriented architecture.',
    achievements: [
      {
        achievement: 'Advocate best design, architecture, coding practices, peer reviewing & unit testing across the Engineering organization'
      }, {
        achievement: 'Scrum master working with Product team following Agile methodologies.'
      }, {
        achievement: 'Interview backend & full-stack candidates while onboarding 10\'s of new hires.'
      }, {
        achievement: 'Hands-on development of Thrillshare platform and APIs mainly in `Ruby on Rails`, supporting Vue.js & Mobile (iOS & Android) clients.'
      }, {
        achievement: 'Supporting Micro-services built with `Ruby`, `Roda` micro-framework & `Sidekiq`: Analytics, Data Management, Translations, Learning Management System.'
      }, {
        achievement: 'Developed greenfield Ruby on Rails outpost services following SOA (service-oriented architecture):',
        subAchievements: [{
          achievement: 'Auth: AuthN/Z identity provider based on `OAuth2` & `OpenID Connect` standards to support SSO (Single Sign-on) and User Management across all Apptegy\'s products',
        }, {
          achievement: 'Alerts: Multi-channel (SMS/Voice/TTS/Push), multi-provider (Twilio, Sendgrid, Facebook, Twitter) & multi-language relay service for school district notifications'
        }]
      }, {
        achievement: 'DevOps, CI/CD and release managment deploying in `AWS: EC2, ELB, EKS, RDS, S3` clusters using `Capistrano` & `Kubernetes`'
      }]
  },
  {
    title: 'CTO',
    company: 'HealthTree',
    companyUrl: 'https://healthtree.org',
    location: 'Salt Lake City, UT 🇺🇸',
    startDate: 'Jan 2019',
    endDate: 'Mar 2020',
    description: 'Developed a Healthcare platform for cancer patients to find their best treatment options, with the mission of accelerating the finding of a cure.',
    achievements: [{
      achievement: 'Put together development team and processes for backend APIs, data pipelines & frontend clients by hands-on programming, code reviewing & testing.'
    }, {
      achievement: 'Automated products lifecycle via DevOps & Continuous Integration/Delivery pipelines.'
    }, {
      achievement: 'Increased customer feedback awareness and success metrics by creating support & analytics infrastructure in: `Metabase` `Sentry` `Intercom`'
    }, {
      achievement: 'Created a product development pipeline from scratch to priotitize and measure performance using Agile `Kanban` methodology in `Trello`'
    }, {
      achievement: 'Decreased bugs and improved overall quality via technical leadership & mentoring to achieve continuous improvement as a team'
    }, {
      achievement: 'Defined a Technology Strategy and Software Architecture aligned with product vision'
    }, {
      achievement: 'Recruited and retained top talent in a competitive U.S. market'
    }]
  },
  {
    title: 'CTO',
    company: '',
    companyUrl: '',
    location: 'Monterrey, NL 🇲🇽 / Austin, TX 🇺🇸',
    startDate: 'Jan 2018',
    endDate: 'Jan 2019',
    description: 'Lead technology strategy, software development and operations to get to new SaaS markets in Argentina and Middle-East. Merged all product teams under a single organization culture. Worked closely with Product, Sales & Support organizations.',
    achievements: [{
      achievement: 'Technology strategy and software architecture',
      subAchievements: [{
        achievement: 'Succesfully launched internationalization for new markets via APIs, Microservices and serverless Lambda functions using.'
      }, {
        achievement: 'Achieved high availability and resilience cloud architecture by relying on DevOps, elastic infrastructure, containerization, automated testing and CI/CD pipelines for continuous quality and delivery with.'
      }]
    }, {
      achievement: 'Product development and operations',
      subAchievements: [{
        achievement: 'Improved roadmap priorization and improved performance measurement of dev teams by adopting `SCRUM` & `Kanban` Agile software development methodologies'
      }, {
        achievement: 'Increased customer feedback awareness and success metrics by creating support & analytics infrastructure in: `Metabase` `Sentry` `Intercom`'
      }, {
        achievement: 'Achieved continuous improvement via OKRs, Performance Reviews and One-on-ones'
      }, {
        achievement: 'Recruited and succesfully retained top talent that added value to the company'
      }]
    }]
  },
  {
    title: 'CTO',
    company: 'Nimbo',
    companyUrl: 'http://www.nimbo-x.com/',
    location: 'Monterrey, NL 🇲🇽',
    startDate: 'Feb 2016',
    endDate: 'Jan 2019',
    description: 'Scaled EHR practice management app from MVP to product/market fit, thousands of MAUs and increasing ARR by providing the best user experience for LatAm physicians market.',
    achievements: [{
      achievement: 'Established development processes for coding, reviewing & testing backend APIs and frontend clients'
    }, {
      achievement: 'Defined Software Architecture and launched fault-tolerant APIs and microservices',
      subAchievements: [{
        achievement: 'Drugs interactions `Java` service based on Wolters Kluwer\'s Medi-Span®'
      }, {
        achievement: 'Machine Learning prediction & classification service based on `Python` & `Tensorflow`'
      }, {
        achievement: 'Full-text search service based on `Apache Solr`'
      }]
    }, {
      achievement: 'Implemented DevOps and continuous integration/delivery to production'
    }, {
      achievement: 'Reached balance between quality & speed by improving recruiting, management & coaching of development team'
    }, {
      achievement: 'Achieved Lean product development by relying on `Kanban` methodology'
    }]
  },
  {
    title: 'Tech Lead',
    company: 'Nebula',
    companyUrl: 'https://www.usenebula.com/',
    location: 'Monterrey, NL 🇲🇽',
    startDate: 'Oct 2017',
    endDate: 'Jul 2018',
    description: 'Bootstraped a claims management system for the insurance industry in LatAm by working on technical development and defining a Domain-driven microservices architecture',
    achievements: [{
      achievement: 'Full-stack development using `Elixir/Phoenix` for Backend and `Ember.js` for Frontend',
    }, {
      achievement: '`Domain-driven Design` architecture using Bounded Contexts',
    }, {
      achievement: 'DevOps infrastructure using `Docker` containers on `AWS: Elastic Beanstalk`',
    }]
  },
  {
    title: 'Full Stack Developer',
    company: 'Panax.io',
    companyUrl: 'http://panax.io/',
    location: '',
    startDate: '2014',
    endDate: '2016',
    description: 'Launched an MVP of No-Code tool for internal business applications by defining a Client-server architecture using: `Node.js / Express` `SQL Server` `Angular.js`',
    achievements: []
  },
  {
    title: 'Software Consultant',
    company: 'OperIT',
    companyUrl: 'http://www.servicesinit.com/',
    location: '',
    startDate: '2014',
    endDate: '2014',
    description: 'Technical consultancy with U.S. companies to define and execute ETL, Analytics and Business Intelligence processes and maintenance of existing software',
    achievements: []
  },
  {
    title: 'Software Engineering Intern',
    company: 'SAP',
    companyUrl: 'http://www.sap.com/',
    location: '',
    startDate: '2013',
    endDate: '2014',
    description: 'Test-driven development for Supportability & SaaS enterprise product lines using `JavaScript` and `Jasmine`',
    achievements: []
  },
  {
    title: 'Technical Co-Founder',
    company: 'CotizaHoy',
    companyUrl: 'http://www.cotizahoy.com/',
    location: '',
    startDate: '2010',
    endDate: '2013',
    description: 'Launched B2B startup for car manufacturing industry developed in `Ruby on Rails` `PostgreSQL` `Heroku`',
    achievements: []
  },
  {
    title: 'Software Development Intern',
    company: 'NIC Mexico',
    companyUrl: 'http://www.nicmexico.mx/',
    location: '',
    startDate: '2008',
    endDate: '2009',
    description: 'Developed internal and customer apps in PHP Java and PL/SQL',
    achievements: []
  }
]

export const SKILLS: ISkill[] = [{
  name: 'Leadership',
  since: 2016,
  level: 85,
  description: 'I have been in leadership roles for several years, overseeing multiple projects and teams.',
  subSkills: [{
    name: 'Technical Leadership',
    since: 2016,
    description: 'I have served as a technical lead for multiple projects over several years, directing their technical direction. This included code reviews, pair programming, and mentoring. Additionally, I oversaw project quality and managed technical debt. I also acted as the primary point of contact for clients alongside the Project Manager.',
    subSkills: [
      { name: 'Ownership' },
      { name: 'System Design' },
      { name: 'Architecture' },
      { name: 'Code reviews' },
      { name: 'Agile' },
      { name: 'Roadmaps' },
    ]
  }, {
    name: 'Management',
    since: 2017,
    description: 'As a mid-level manager, I was responsible for overseeing a group of developers, guiding their career paths, and fostering their professional growth.',
    subSkills: [
      { name: 'Mentorship' },
      { name: 'Performance reviews' },
      { name: 'Conflict resolution' },
    ]
  }, {
    name: 'Recruitment',
    since: 2016,
    description: 'I have been involved in the recruitment process for several years, conducting interviews. I have also been responsible for improving and unifying recruitment process.',
    subSkills: [
      { name: 'Talent sourcing' },
      { name: 'Interviewing' },
      { name: 'Recruitment process' },
    ]
  }]
}, {
  name: 'Backend',
  since: 2010,
  level: 100,
  description: 'Backend development is my primary area of expertise, and I have created multiple applications, APIs, and integrations.',
  subSkills: [{
    name: 'Ruby on Rails',
    since: 2013,
    description: 'I have worked with Ruby on Rails since 2013, building and maintaining numerous applications. Including those with large databases where efficient SQL queries are crucial. My experience includes implementing APIs, admin panels, integrating APIs, and optimising high-traffic applications.',
    subSkills: [
      { name: 'Rails 7' },
      { name: 'Sidekiq', description: "I have implemented Sidekiq clusters handling hundreds of thousands of jobs a day." },
      { name: 'TDD' },
      { name: 'RSpec', description: "I write well-structured, easy-to-read and performant tests using contexts and abstractions." },
      { name: 'Capybara' },
    ],
  }, {
    name: 'Developing APIs',
    since: 2015,
    description: "Since 2015, I have been developing APIs. I've built multiple applications using Ruby on Rails as well as other frameworks.",
    subSkills: [
      { name: 'REST API' },
      { name: 'GraphQL' },
    ]
  }, {
    name: 'Databases',
    since: 2010,
    description: 'I have worked with many different kinds of databases. Most Ruby on Rails performance issues stem from inefficient database queries. I have extensive experience in identifying and optimizing these issues.',
    subSkills: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'Redis' },
      { name: 'NoSQL' },
    ]
  }, {
    name: 'API integrations',
    since: 2010,
    description: 'I developed multiple APIs that were consumed by frontend, mobile apps and other services.',
    subSkills: [
      { name: 'REST' },
      { name: 'GraphQL' },
    ]
  }, {
    name: 'Other',
    description: 'I like experimenting with different technologies and frameworks to find the best tool for the job.',
    subSkills: [
      { name: 'Node.js' },
      { name: 'Python' },
      { name: 'Kafka'},
      { name: 'Rust' },
      { name: 'Elixir' },
      { name: 'Shell' },
      { name: 'Search engines - ElasticSearch, Solr'},
      { name: 'Git'},
    ]
  }],
}, {
  name: 'Frontend',
  since: 2018,
  level: 75,
  description: 'I have been working with React since 2018. Created multiple applications and websites.',
  subSkills: [{
    name: 'React',
    since: 2018,
    description: 'I have been working with React since 2018. I have created several applications using React. SPA applications with SSR.',
    subSkills: [
      { name: 'React Testing Library' },
      { name: 'Playwright' },
      { name: 'Storybook' },
      { name: 'Redux' },
      { name: 'Tailwind CSS' },
      { name: 'React Query' },
    ]
  }, {
    name: 'Typescript',
    since: 2022,
    description: 'I created a complex frontend application using Typescript and Next.js. I use Typescript in all my javascript projects.',
    subSkills: [
    ]
  }, {
    name: 'Javascript',
    since: 2010,
    description: 'Javascript was always a part of my work. From simple jQuery scripts, through ES6, to using it with Typescript in Next.js applications and Express.js APIs.',
    subSkills: [
      { name: 'Node.js' },
      { name: 'Jest' },
    ]
  }, {
    name: 'Next.js',
    since: 2022,
    description: 'I created a complex frontend application using Next.js and Typescript. Next.js is my go to framework for frontend applications.',
    subSkills: [
      { name: 'NextAuth' },
      { name: 'Vercel' },
    ]
  }, {
    name: 'Other',
    description: '',
    subSkills: [
      { name: 'Hotwire & Stimulus'},
      { name: 'React Native' },
      { name: 'TailwindCSS' },
    ]
  }],
}, {
  name: 'DevOps',
  level: 80,
  since: 2019,
  description: 'I have been working with DevOps since 2019. Creating CI/CD pipelines and managing Kubernetes clusters.',
  subSkills: [{
    name: 'AWS',
    since: 2016,
    description: "I've hosted websites and Kuberentes clusters using AWS",
    subSkills: [
      { name: 'EKS' },
      { name: 'S3' },
      { name: 'EC2' },
      { name: 'RDS' },
      { name: 'Lambda' },
      { name: 'Cloudflare' },
    ]
  }, {
    name: 'Docker',
    since: 2016,
    description: "I use Docker on a daily basis in development and production environments.",
    subSkills: [
    ]
  }, {
    name: 'Kubernetes',
    since: 2019,
    description: 'I have set up and maintained multiple Kubernetes clusters from scratch utilizing GitOps principles.',
    subSkills: [
      { name: 'GitOPS - ArgoCD' },
      { name: 'Kustomize' },
      { name: 'Helm' },
    ]
  }, {
    name: 'Other',
    description: 'I managed servers and used deployment tools since I started programming',
    subSkills: [
      { name: 'Terraform' },
      { name: 'CI/CD' },
      { name: 'CDN' },
      { name: 'Observability' },
      { name: 'Distributed systems' },
    ]
  }]
}]