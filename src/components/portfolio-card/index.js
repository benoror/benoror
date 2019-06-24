import React from "react"
import Card from "card-vibes"
import styles from "./styles.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

const PortfolioCard = ({ card: { title, url, description, role, links } }) => {
  return (
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
          <h4> {title} </h4>
        </div>
        <div className={`${styles.back} ${styles.side}`}>
          <h4>
            <a href={url}>{title}</a>
          </h4>
          <div className={styles.role}>{role}</div>
          <p>{description}</p>
          <div className={styles.links}>
            <a href={url}>
              <FontAwesomeIcon icon={faLink} />
            </a>
            {links && links.github && (
              <a href={links.github}>
                <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PortfolioCard
