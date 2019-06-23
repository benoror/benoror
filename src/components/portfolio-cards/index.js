import React from "react"
import Card from "card-vibes"
import styles from "./styles.module.css"

const PortfolioCards = ({ cards }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {cards.map(({ title, url, description, links }) => (
        <Card className={styles.card}>
          <a href={url}>
            <img
              alt={title}
              title={title}
              src={require(`./images/${title}.png`)}
            />
          </a>
          <h4>
            <a href={url}>{title}</a>
          </h4>
          <p>{description}</p>
        </Card>
      ))}
    </div>
  )
}

export default PortfolioCards
