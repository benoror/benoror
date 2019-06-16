import React from "react"
import { StaticQuery, graphql } from "gatsby"
import SocialIcon from "./social-icon"

const Social = () => {
  return (
    <StaticQuery
      query={graphql`
        query SocialQuery {
          site {
            siteMetadata {
              social {
                url
                name
                description
              }
            }
          }
        }
      `}
      render={({
        site: {
          siteMetadata: { social },
        },
      }) => (
        <div style={{ display: "flex", height: "110px" }}>
          {social.map((item, index) => (
            <SocialIcon item={item} key={index} />
          ))}
        </div>
      )}
    />
  )
}

export default Social
