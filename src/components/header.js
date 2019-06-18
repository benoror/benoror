import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#333`,
      marginBottom: `1.5rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <div style={{ textAlign: "right", color: "#ddd" }}>
        <Link to="/" style={{ color: `white` }}>
          Home
        </Link>
        &nbsp;&ndash;&nbsp;
        <a href="http://resume.benoror.com/" style={{ color: `white` }}>
          Resumé
        </a>
        &nbsp;&ndash;&nbsp;
        <a href="http://blog.benoror.com" style={{ color: `white` }}>
          Blog
        </a>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
