module.exports = {
  siteMetadata: {
    title: `Ben Orozco`,
    description: `CTO - Maker - Full Stack Web Developer - Open Source & Crypto Enthusiast`,
    author: `@benoror`,
    name: "Ben Orozco",
    nickname: "Ben",
    fullname: "Benjamin Orozco Rios",
    email: "benoror@gmail.com",
    website: "http://www.benoror.com",
    social: [
      {
        name: "email",
        description: "Email",
        url: "mailto:benoror+website@gmail.com",
      },
      {
        name: "github",
        description: "Code",
        url: "https://github.com/benoror",
      },
      {
        name: "medium",
        description: "Blog",
        url: "http://blog.benoror.com",
      },
      {
        name: "twitter",
        description: "Twitter",
        url: "https://twitter.com/benoror",
      },
      {
        name: "angellist",
        description: "Angel List",
        url: "https://angel.co/benoror",
      },
      {
        name: "producthunt",
        description: "Product Hunt",
        url: "https://www.producthunt.com/@benoror/made",
      },
      {
        name: "stackoverflow",
        description: "Stack Overflow",
        url: "http://stackoverflow.com/cv/benoror",
      },
      {
        name: "livecoding",
        description: "LiveCoding.TV",
        url: "https://www.livecoding.tv/benoror/",
      },
      {
        name: "google",
        description: "Google+",
        url: "https://plus.google.com/102367030438008357979",
      },
      {
        name: "instagram",
        description: "Instagram",
        url: "https://www.instagram.com/benoror/",
      },
      {
        name: "skype",
        description: "Skype",
        url: "skype:benoror86",
      },
      {
        name: "linkedin",
        description: "LinkedIn",
        url: "https://www.linkedin.com/in/benoror",
      },
      {
        name: "goodreads",
        description: "Goodreads",
        url: "https://www.goodreads.com/benoror",
      },
      {
        name: "meetup",
        description: "Meetup",
        url: "https://www.meetup.com/members/185141289",
      },
      {
        name: "blogger",
        description: "Blogger (Old Blog)",
        url: "http://old-blog.benoror.com",
      },
    ],
    portfolio: [
      {
        title: "💼 Work",
        cards: [
          {
            title: "HealthTree",
            url: "https://www.healthtree.org",
            description:
              "modern healthcare platform for helping Multiple Myeloma patients to find their best treatment options, with a mission to accelerate finding the cure for this type of cancer",
            links: {
              github: "https://github.com/HealthTree/ ",
            },
          },
          {
            title: "Nimbo",
            url: "https://www.nimbo-x.com/",
          },
          {
            title: "Nebula",
            url: "https://www.usenebula.com/",
          },
          {
            title: "Panax.io",
            url: "http://panax.io/",
            links: {
              github: "https://github.com/panaxit",
            },
          },
        ],
      },
      {
        title: "👷‍♂️ Maker & Open Source",
        cards: [
          {
            title: "Sundly",
            url: "https://sundly.co/",
            description:
              "💛 Encrypted & decentralized personal health records. Built on Blockstack and powered by Blockchain",
            links: {
              github: "https://github.com/Sundly/sundly",
            },
          },
          {
            title: "better-npm-run",
            url: "https://npmjs.org/package/better-npm-run",
            description: "🏃‍♂️ A better NPM scripts runner!",
            links: {
              github: "https://github.com/benoror/better-npm-run",
            },
          },
          {
            title: "Awesome Product Development",
            url: "https://github.com/benoror/product-development",
            description:
              "📓General styleguides & documentation for modern product development",
            links: {
              github: "https://github.com/benoror/product-development",
            },
          },
          {
            title: "Laystack",
            url: "https://laystack.com/",
            description: "Docs Templating API for your App",
          },
          {
            title: "Taxi Driver",
            url: "https://github.com/benoror/taxi-driver",
            description:
              "🚖 A flexible & international Tax Engine Microservice",
            links: {
              github: "https://github.com/benoror/taxi-driver",
            },
          },
          {
            title: "Procevi",
            url: "http://www.procevi.com/",
            description:
              "Construction & real-estate ERP software & marketing website",
            links: {
              github: "https://github.com/Procevi",
            },
          },
          {
            title: "CotizaHoy",
            url: "http://www.cotizahoy.com",
            description: "B2B quotation platform for manufacturing industry",
            links: {
              github: "https://github.com/cotizahoy",
            },
          },
          {
            title: "Personal Website",
            url: "https://www.benoror.com",
            description: "The website you're looking at!",
            links: {
              github: "https://github.com/benoror/benoror.github.io",
            },
          },
        ],
      },
      { title: "🗣 Talks", cards: [] },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/benoror-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
