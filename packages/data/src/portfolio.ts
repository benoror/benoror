export type PortfolioItem = {
  id: string
  title: string
  category: string
  description: string
  image: string
  icon?: string
  techStack: string[]
  url?: string
  links?: {
    github?: string
    video?: string
    other?: string
  }
  role: string
  section: "projects" | "publications" | "talks"
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "baseql",
    title: "BaseQL",
    section: "projects",
    category: "SaaS",
    role: "👷‍♂️ Maker",
    url: "https://www.baseql.com/",
    image: "/images/portfolio/baseql.avif",
    icon: "/images/portfolio/icons/BaseQL.png",
    description:
      "A single GraphQL access point to all your cloud Data from Airtable & Google Sheets",
    techStack: ["GraphQL", "React", "Node", "MongoDB", "AWS"],
    links: {
      github: "https://github.com/BaseQL",
      video: "https://youtu.be/l92O7tqq0iw",
      other: "https://docs.baseql.com",
    },
  },
  {
    id: "nimbo-x",
    title: "Nimbo",
    section: "projects",
    category: "SaaS",
    role: "💻 Software Development",
    url: "https://www.nimbo-x.com/",
    image: "/images/portfolio/nimbo-x.png",
    icon: "/images/portfolio/icons/Nimbo.png",
    description:
      "EHR SaaS product focused in providing the best physician experience for LatAm market",
    techStack: ["Rails", "Ember.js", "Heroku", "PostgreSQL"],
    links: {
      github: "https://github.com/ecaresoft"
    }
  },
  {
    id: "healthtree",
    title: "HealthTree",
    section: "projects",
    category: "SaaS",
    role: "💻 Software Development",
    url: "https://www.healthtree.org",
    image: "/images/portfolio/healthtree.png",
    icon: "/images/portfolio/icons/HealthTree.png",
    description:
      "Healthcare platform for helping cancer patients to find their best treatment options",
    techStack: ["Rails", "React", "Heroku", "PostgreSQL", "AWS"],
    links: {
      github: "https://github.com/HealthTree",
    },
  },
  {
    id: "nebula",
    title: "Nebula",
    section: "projects",
    category: "SaaS",
    role: "🚧 Software Architect",
    url: "https://www.usenebula.com/",
    image: "/images/portfolio/nebula.png",
    icon: "/images/portfolio/icons/Nebula.png",
    description:
      "Electronic claim management solution for health networks and insurance companies",
    techStack: ["Elixir/Phoenix", "Ember.js", "AWS", "PostgreSQL"],
  },
  {
    id: "gbadev",
    title: "GBA Dev",
    section: "projects",
    category: "Gaming",
    role: "👷‍♂️ Maker",
    image: "/images/portfolio/%40rkanoid.gif",
    icon: "/images/portfolio/icons/GBA Dev.png",
    url: "https://github.com/benoror/gbadev",
    description:
      "Homebrew Game Boy Advance Game Development (circa. 2001)",
      techStack: ["C/GCC", "ASM"],
  },
  {
    id: "taxi-driver",
    title: "Taxi Driver",
    section: "projects",
    category: "Open Source",
    role: "💻 Software Development",
    url: "https://github.com/benoror/taxi-driver",
    image: "/images/portfolio/taxi-driver.png",
    icon: "/images/portfolio/icons/Taxi Driver.png",
    description: "🚖 A flexible & international Tax Engine Microservice",
    techStack: ["Node.js", "Micro", "LowDB"],
    links: {
      github: "https://github.com/benoror/taxi-driver",
      other: "https://slides.com/benoror/taxi-driver",
    },
  },
  {
    id: "sundly", 
    title: "Sundly",
    section: "projects",
    category: "Crypto",
    role: "👷‍♂️ Maker",
    url: "https://sundly.github.io/",
    image: "/images/portfolio/sundly.png",
    icon: "/images/portfolio/icons/Sundly.png",
    description:
      "💛 Encrypted & decentralized personal health records. Built on Blockstack and powered by Blockchain",
    links: {
      github: "https://github.com/Sundly/sundly",
    },
    techStack: ["Node.js", "React", "Blockstack"],
  },
  {
    id: "panax",
    title: "Panax.io",
    section: "projects",
    category: "SaaS",
    role: "💻 Software Development",
    url: "http://panax.io/",
    image: "/images/portfolio/panax.png",
    icon: "/images/portfolio/icons/Panax.io.png",
    techStack: ["Node.js", "AngularJS", "SQLServer", "XML/XSLT"],
    description:
      "Development tool for quickly bootstraping full-stack applications",
    links: {
      github: "https://github.com/panaxit",
      video: "https://youtu.be/dcenGE9HMZg"
    },
  },
  {
    id: "ember-postgrest-dynamic-ui",
    title: "ember-postgrest-dynamic-ui",
    section: "projects",
    category: "🧪 Experiment",
    role: "💻 Software Development",
    url: "https://github.com/benoror/ember-postgrest-dynamic-ui",
    image: "/images/portfolio/ember-postgrest-dynamic-ui.png",
    icon: "/images/portfolio/icons/ember-postgrest-dynamic-ui.png",
    techStack: ["Ember.js", "PostgREST", "PostgreSQL"],
    description: "Dynamic UI powered by PostgREST and Ember Formly",
    links: {
      github: "https://github.com/benoror/ember-postgrest-dynamic-ui",
      video: "https://www.youtube.com/watch?v=BJz3ROHPwKU",
    },
  },
  {
    id: "better-npm-run",
    title: "better-npm-run",
    section: "projects",
    category: "Open Source",
    role: "💻 Software Development",
    url: "https://npmjs.org/package/better-npm-run",
    image: "/images/portfolio/better-npm-run.png",
    icon: "/images/portfolio/icons/better-npm-run.png",
    description: "🏃‍♂️ A better NPM scripts runner!",
    links: {
      github: "https://github.com/benoror/better-npm-run",
    },
    techStack: ["Node.js", "npm"],
  },
  {
    id: "laystack",
    title: "Laystack",
    section: "projects",
    category: "🧪 Experiment",
    role: "👷‍♂️ Maker",
    url: "https://benoror.github.io/laystack-landing",
    image: "/images/portfolio/laystack.png",
    icon: "/images/portfolio/icons/Laystack.png",
    description: "Docs Templating API for your App",
    techStack: ["Node.js", "React"],
  },
  {
    id: "cotizahoy",
    title: "CotizaHoy",
    section: "projects",
    category: "SaaS",
    role: "👷‍♂️ Technical Co-Founder",
    url: "http://www.cotizahoy.com",
    image: "/images/portfolio/cotizahoy.png",
    icon: "/images/portfolio/icons/CotizaHoy.png",
    description: "B2B quotation platform for manufacturing industry",
    links: {
      github: "https://github.com/cotizahoy",
    },
    techStack: ["Ruby on Rails", "JQuery"],
  },
  // {
  //   title: "Low-code: Airtable-Node-Ember",
  //   url: "https://github.com/benoror/ember-airtable",
  //   description: "🥞 A low-code stack for quickly prototyping apps with Airtable, Node & Ember",
  //   role: "🤩 Open source",
  //   links: {
  //     github: "https://github.com/benoror/ember-airtable",
  //     other: "https://medium.com/the-backlog-by-ecaresoft/creating-a-serverless-web-app-with-node-js-ember-js-and-paas-services-hyperdev-surge-sh-8e3ebe263a76",
  //   },
  // },
  // {
  //   title: "Awesome Product Development",
  //   url: "https://github.com/benoror/product-development",
  //   description:
  //     "📓General styleguides & documentation for modern product development",
  //   role: "👷‍♂️ Maker",
  //   links: {
  //     github: "https://github.com/benoror/product-development",
  //   },
  // },
  // {
  //   title: "Procevi",
  //   url: "http://www.procevi.com/",
  //   description:
  //     "Construction & real-estate ERP software & marketing website",
  //   role: "👷‍♂️ Co-Founder",
  //   links: {
  //     github: "https://github.com/Procevi",
  //   },
  // },
]
