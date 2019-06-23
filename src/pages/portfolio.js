import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PortfolioCards from "../components/portfolio-cards"

const Portfolio = () => {
  return (
    <StaticQuery
      query={graphql`
        query PortfolioQuery {
          site {
            siteMetadata {
              portfolio {
                title
                cards {
                  title
                  url
                  description
                  links {
                    github
                  }
                }
              }
            }
          }
        }
      `}
      render={({
        site: {
          siteMetadata: { portfolio },
        },
      }) => (
        <Layout>
          <SEO title="Portfolio" />
          <h1>Portfolio</h1>
          {portfolio.map((item, index) => (
            <div key={index}>
              <h2>{item.title}</h2>
              <PortfolioCards cards={item.cards} />
            </div>
          ))}
        </Layout>
      )}
    />
  )
}

export default Portfolio
