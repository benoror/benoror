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
