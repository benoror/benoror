import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Avatar from "../components/avatar"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Avatar style={{ maxWidth: `256px`, marginBottom: `1.45rem` }} />
      <h1>Hi, I'm Ben</h1>
      <p style={{ fontSize: "1.2rem" }}>
        <em>Healthtech – Full Stack Dev – Open Source & Crypto Enthusiast</em>
      </p>
    </div>
  </Layout>
)

export default IndexPage
