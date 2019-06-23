import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Avatar from "../components/avatar"
import Social from "../components/social"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Avatar style={{ maxWidth: `256px`, marginBottom: `1.45rem` }} />
      <h1>👋 Hi, I'm Ben!</h1>
      <p style={{ fontSize: "1.2rem" }}>
        <em>
          Healthtech – Full Stack Web Developer – Open Source &amp; Crypto
          Enthusiast
        </em>
      </p>
      <h2>👀 Who?</h2>
      <Social />
    </div>
  </Layout>
)

export default IndexPage
