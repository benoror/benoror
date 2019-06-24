import React from "react"
import Card from "card-vibes"
import styles from "./styles.module.css"

const PortfolioCards = ({ cards }) => {
  return (
    <div className={styles.container}>
      {cards.map(({ title, url, description, links }) => (
        <Card
          className={styles.card}
          ontouchstart="this.classList.toggle('hover');"
        >
          <div className={styles.flipper}>
            <div className={`${styles.front} ${styles.side}`}>
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
              <p> </p>
            </div>
            <div className={`${styles.back} ${styles.side}`}>
              <h4>
                <a href={url}>{title}</a>
              </h4>
              <p>{description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default PortfolioCards
