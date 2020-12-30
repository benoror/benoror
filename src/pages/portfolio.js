import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PortfolioCard from "../components/portfolio-card"

const Portfolio = () => {
  return (
    <StaticQuery
      query={graphql`
        query PortfolioQuery {
          site {
            siteMetadata {
              portfolio {
                title
                url
                description
                role
                links {
                  github
                  slides
                  video
                  blogpost
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {portfolio.sort(() => Math.random() - 0.5).map((card, index) => (
              <PortfolioCard key={index} card={card} />
            ))}
          </div>
        </Layout>
      )}
    />
  )
}

export default Portfolio
