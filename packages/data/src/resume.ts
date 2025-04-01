import { ISkill } from '@workspace/data/types/resume';
import { gmailAlias } from '@workspace/utils/email';
import { PERSONAL } from '@workspace/data/personal';
import { APPTEGY, COTIZAHOY, ECARESOFT, HEALTHTREE, NICMX, OPERIT, PANAX, SAP } from '@workspace/data/resume/roles';

export const ABOUT = {
  name: PERSONAL.short_name,
  header: 'Lead Software Engineer - Full Stack Developer', // ToDo: FSDev not here, in roles. Alt. Software Engieneering Leader
  public_email: gmailAlias(PERSONAL.private_email, 'cv'),
  about_me: `VP Eng & CTO of SaaS startups in U.S. & LatAm. Software engineer specialized in leading technical teams and full stack development and. Passionate about building end-to-end & customer-driven software products, mentoring & growing engineering teams, and leveraging technology to tackle real-world challenges.`
}

export const COMPANIES = [
  {
    name: 'Apptegy',
    url: 'https://www.apptegy.com',
    location: 'Little Rock 🇺🇸',
    startDate: '2020',
    endDate: 'Present (5yr)',
    description: 'EdTech startup with 3,000+ school districts in the US.',
    roles: APPTEGY
  },
  {
    name: 'HealthTree',
    url: 'https://www.healthtree.org',
    location: 'Salt Lake City 🇺🇸',
    startDate: '2019',
    endDate: '2020',
    description: 'Healthcare platform for cancer patients, their families and caregivers, with the mission of accelerating the finding of a cure',
    roles: HEALTHTREE
  },
  {
    name: 'Ecaresoft',
    url: 'https://www.ecaresoft.com',
    location: 'Austin 🇺🇸',
    startDate: '2016',
    endDate: '2019',
    description: 'EHR & HIS systems for hospitals and clinics in Latin America and Middle East.',
    roles: ECARESOFT
  },
  {
    short: true,
    name: 'Panax',
    url: 'https://panax.io',
    location: 'San Luis Potosi 🇲🇽',
    startDate: '2014',
    endDate: '2016',
    description: 'Low-code tool for building business applications.',
    roles: PANAX
  },
  {
    short: true,
    name: 'OperIT',
    url: 'https://www.servicesinit.com',
    location: 'San Luis Potosi 🇲🇽',
    startDate: '2014',
    endDate: '2014',
    description: 'IT nearshoring consultancy services for U.S. companies',
    roles: OPERIT
  },
  {
    short: true,
    name: 'SAP',
    url: 'https://www.sap.com',
    location: 'Walldorf 🇩🇪',
    startDate: '2013',
    endDate: '2014',
    description: 'World\'s largest company of ERP software',
    roles: SAP
  },
  {
    short: true,
    name: 'CotizaHoy',
    url: 'https://www.cotizahoy.com',
    location: 'San Luis Potosi 🇲🇽',
    startDate: '2010',
    endDate: '2013',
    description: 'B2B startup for car manufacturing industry',
    roles: COTIZAHOY
  },
  {
    short: true,
    name: 'NIC Mexico',
    url: 'https://www.nicmexico.mx',
    location: 'Monterrey 🇲🇽',
    startDate: '2008',
    endDate: '2009',
    description: 'NIC organization for .mx top-level domains',
    roles: NICMX
  }
]

export const SKILLS: ISkill[] = [{
  name: 'Leadership',
  slug: 'leadership',
  since: 2016,
  level: 100,
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
    slug: 'management',
    since: 2017,
    description: 'As a mid-level manager, I was responsible for overseeing a group of developers, guiding their career paths, and fostering their professional growth.',
    subSkills: [
      { name: 'Mentorship' },
      { name: 'Performance reviews' },
      { name: 'Conflict resolution' },
    ]
  }, {
    name: 'Recruitment',
    slug: 'recruitment',
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
  slug: 'backend',
  since: 2010,
  level: 100,
  description: 'Backend development is my primary area of expertise, and I have created multiple applications, APIs, and integrations.',
  subSkills: [{
    name: 'Ruby on Rails',
    slug: 'ruby-on-rails',
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
    slug: 'apis',
    since: 2015,
    description: "Since 2015, I have been developing APIs. I've built multiple applications using Ruby on Rails as well as other frameworks.",
    subSkills: [
      { name: 'REST API' },
      { name: 'GraphQL' },
    ]
  }, {
    name: 'Databases',
    slug: 'databases',
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
    slug: 'integrations',
    since: 2010,
    description: 'I developed multiple APIs that were consumed by frontend, mobile apps and other services.',
    subSkills: [
      { name: 'REST' },
      { name: 'GraphQL' },
    ]
  }, {
    name: 'Other',
    slug: 'backend-other',
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
  slug: 'frontend',
  since: 2018,
  level: 90,
  description: 'I have been working with React since 2018. Created multiple applications and websites.',
  subSkills: [{
    name: 'React',
    slug: 'react',
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
    slug: 'typescript',
    since: 2022,
    description: 'I created a complex frontend application using Typescript and Next.js. I use Typescript in all my javascript projects.',
    subSkills: [
    ]
  }, {
    name: 'Javascript',
    slug: 'javascript',
    since: 2010,
    description: 'Javascript was always a part of my work. From simple jQuery scripts, through ES6, to using it with Typescript in Next.js applications and Express.js APIs.',
    subSkills: [
      { name: 'Node.js' },
      { name: 'Jest' },
    ]
  }, {
    name: 'Next.js',
    slug: 'next.js',
    since: 2022,
    description: 'I created a complex frontend application using Next.js and Typescript. Next.js is my go to framework for frontend applications.',
    subSkills: [
      { name: 'NextAuth' },
      { name: 'Vercel' },
    ]
  }, {
    name: 'Other',
    slug: 'frontend-other',
    description: '',
    subSkills: [
      { name: 'Hotwire & Stimulus'},
      { name: 'React Native' },
      { name: 'TailwindCSS' },
    ]
  }],
}, {
  name: 'DevOps',
  slug: 'devops',
  level: 80,
  since: 2019,
  description: 'I have been working with DevOps since 2019. Creating CI/CD pipelines and managing Kubernetes clusters.',
  subSkills: [{
    name: 'AWS',
    slug: 'aws',
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
    slug: 'docker',
    since: 2016,
    description: "I use Docker on a daily basis in development and production environments.",
    subSkills: [
    ]
  }, {
    name: 'Kubernetes',
    slug: 'kubernetes',
    since: 2019,
    description: 'I have set up and maintained multiple Kubernetes clusters from scratch utilizing GitOps principles.',
    subSkills: [
      { name: 'GitOPS - ArgoCD' },
      { name: 'Kustomize' },
      { name: 'Helm' },
    ]
  }, {
    name: 'Other',
    slug: 'devops-other',
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