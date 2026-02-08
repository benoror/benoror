export type PortfolioItem = {
  id: string
  title: string
  category: string
  description: string
  circa?: string
  images: string[]
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

export const projectsItems: PortfolioItem[] = [
  {
    id: "gpg-nvim",
    title: "gpg.nvim",
    section: "projects",
    category: "Open Source",
    role: "👷‍♂️ Maker",
    url: "https://github.com/benoror/gpg.nvim",
    images: ["/images/portfolio/gpg.nvim.gif"],
    description: "Editing GPG encrypted files symmetrically in NeoVIM",
    techStack: ["Lua", "Neovim", "GPG"],
    links: {
      github: "https://github.com/benoror/gpg.nvim",
    },
    circa: "2025",
    icon: "/images/portfolio/icons/nvim.png",
  },
  {
    id: "baseql",
    title: "BaseQL",
    section: "projects",
    category: "SaaS",
    role: "👷‍♂️ Maker",
    circa: "2020",
    url: "https://www.baseql.com/",
    images: ["/images/portfolio/baseql.avif"],
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
    id: "healthtree",
    title: "HealthTree",
    section: "projects",
    category: "SaaS",
    role: "💻 Software Development",
    circa: "2019",
    url: "https://www.healthtree.org",
    images: ["/images/portfolio/healthtree.png"],
    icon: "/images/portfolio/icons/HealthTree.png",
    description:
      "Healthcare platform for helping cancer patients to find their best treatment options",
    techStack: ["Rails", "React", "Heroku", "PostgreSQL", "AWS"],
    links: {
      github: "https://github.com/HealthTree",
    },
  },
  {
    id: "nimbo-x",
    title: "Nimbo",
    section: "projects",
    category: "SaaS",
    role: "💻 Software Development",
    circa: "2016",
    url: "https://www.nimbo-x.com/",
    images: ["/images/portfolio/nimbo-x.png"],
    icon: "/images/portfolio/icons/Nimbo.png",
    description:
      "EHR SaaS product focused in providing the best physician experience for LatAm market",
    techStack: ["Rails", "Ember.js", "Heroku", "PostgreSQL"],
    links: {
      github: "https://github.com/ecaresoft"
    }
  },
  {
    id: "nebula",
    title: "Nebula",
    section: "projects",
    category: "SaaS",
    role: "🚧 Software Architect",
    circa: "2018",
    url: "https://www.usenebula.com/",
    images: ["/images/portfolio/nebula.png"],
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
    circa: "2001",
    images: ["/images/portfolio/%40rkanoid.gif"],
    icon: "/images/portfolio/icons/GBA Dev.png",
    url: "https://github.com/benoror/gbadev",
    description:
      "Homebrew Game Boy Advance Game Development",
    techStack: ["C/GCC", "ASM"],
  },
  {
    id: "taxi-driver",
    title: "Taxi Driver",
    section: "projects",
    category: "Open Source",
    role: "💻 Software Development",
    circa: "2019",
    url: "https://github.com/benoror/taxi-driver",
    images: ["/images/portfolio/taxi-driver.png"],
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
    circa: "2019",
    url: "https://sundly.github.io/",
    images: ["/images/portfolio/sundly.png"],
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
    circa: "2015",
    images: ["/images/portfolio/panax.png"],
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
    circa: "2016",
    url: "https://github.com/benoror/ember-postgrest-dynamic-ui",
    images: ["/images/portfolio/ember-postgrest-dynamic-ui.png"],
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
    circa: "2016",
    url: "https://npmjs.org/package/better-npm-run",
    images: ["/images/portfolio/better-npm-run.png"],
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
    circa: "2020",
    url: "https://benoror.github.io/laystack-landing",
    images: ["/images/portfolio/laystack.png"],
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
    circa: "2012",
    url: "http://www.cotizahoy.com",
    images: ["/images/portfolio/cotizahoy.png"],
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

export const talksItems: PortfolioItem[] = [
  {
    id: "rotary-crypto",
    title: "Cryptocurrency, Blockchain & Digital Assets",
    section: "talks",
    category: "Talk",
    role: "🎙️ Expositor",
    circa: "2023",
    url: "https://slides.com/benoror/cryptomonedasrotary",
    links: {
      other: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7097279672626864128/",
    },
    description: "Talk at Rotary Club about the basics of cryptocurrency, blockchain and digital assets",
    images: [
      "/images/portfolio/rotary1.png",
      "/images/portfolio/rotary2.jpg",
      "/images/portfolio/rotary3.jpg",
    ],
    icon: "/images/portfolio/icons/rotary.png",
    techStack: ["Cryptocurrency", "Blockchain", "Digital Assets"],
  },
  {
    id: "fiets",
    title: "FIETS Expo",
    section: "talks",
    category: "Talk",
    role: "🎙️ Expositor",
    circa: "2018",
    url: "https://docs.google.com/presentation/d/1FXGuXHmGeYZS_PDIT9KlvQVDfr6AhLkifOqBvlaoXw8/edit?usp=sharing",
    links: {
      video: "https://youtu.be/OJasOQlvGYs",
    },
    description: "The impact of the Software evolution in Healthcare - FIETS 2018 (Feria Internacional de Estrategias y Tecnologías para la Salud)",
    icon: "/images/portfolio/icons/fiets.jpg",
    techStack: ["Healthcare", "Technology", "Software"],
    images: [
      "/images/portfolio/fiets1.png",
      "/images/portfolio/fiets2.jpg",
      "/images/portfolio/fiets3.png",
    ],
  },
  /*
    ECS Hack Week - 2018
      Building decentralized apps with Blockstack<
      https://docs.google.com/presentation/d/1y3mQibLNdGeQsAWcNJAYusNreznbPwYd0Tk7lnudY94/edit?usp=sharing
      https://youtu.be/YoYJ6-mudtk
    ECS Hack Week - 2017
      Blockchains & Ethereum: Beyond Bitcoin
      https://slides.com/benoror/hw2017-blockchain
    GraphQL: R.I.P. REST?
      https://slides.com/benoror/hw2017-graphql
    Ember Mty Meetup - 2016
      https://www.meetup.com/Ember-MTY/
      Ember Data Overview - https://slides.com/benoror/ember-data
      https://www.youtube.com/watch?v=gl45TXtd5wI
  */
]

export const publicationsItems: PortfolioItem[] = [
  {
    id: "mba-thesis",
    title: "Balanced Scorecard in SAP BO Design Studio & HANA",
    section: "publications",
    category: "Master Thesis",
    role: "🎓 MBA",
    circa: "2014",
    url: "https://drive.google.com/file/d/0B3AnMIJ-uw0-anRrUW01VEFKWlU/view?usp=sharing",
    images: ["/images/portfolio/mba-thesis.png"],
    icon: "/images/portfolio/icons/mba-thesis.jpeg",
    description: "Design and Implementation of a Balanced Scorecard in SAP BusinessObjects Design Studio and SAP HANA",
    techStack: ["SAP", "HANA", "BO"],
  },
  /*
    Award - 2010
      INPOJUVE Government Entrepreneurship Contest
    Expositor - 2009
      ITESM Entrepreneurship Forum
    Coordinator - 2009
      SISCTI Computer Science Symposium Registration System
    Participation - 2006
      ACM Programming Contest
  */
 {
  id: "conthackto-2",
  title: "Linux Assembler II: Shellcodes",
  section: "publications",
  category: "Magazine Article",
  role: "📝 Writer",
  circa: "2005",
  url: "https://github.com/benoror/conthackto/blob/master/contHACKto%20No3%20Ene%202006%20-%20Creaci%C3%B3n%20de%20Shellcodes%20bajo%20Linux.pdf",
  description: "How to create Shellcodes using Sysclls for fun & profit",
  images: ["/images/portfolio/conthackto-2.png"],
  icon: "/images/portfolio/icons/conthackto.jpg",
  techStack: ["Linux", "Assembler"],
 },
 {
  id: "conthackto-1",
  title: "Linux Assembler I: Syscalls",
  section: "publications",
  category: "Magazine Article",
  role: "📝 Writer",
  circa: "2005",
  url: "https://github.com/benoror/conthackto/blob/master/Conthackto_Num1_PDF/8-9%20LINUX.pdf",
  description: "How to use Syscalls under Linux",
  images: ["/images/portfolio/conthackto-1.png"],
  icon: "/images/portfolio/icons/conthackto.jpg",
  techStack: ["Linux", "Assembler"],
 },
]


export const portfolioItems: PortfolioItem[] = [
  ...projectsItems,
  ...publicationsItems,
  ...talksItems,
]