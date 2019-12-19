import React from "react"
import Card from "card-vibes"
import styles from "./styles.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink, faFilePowerpoint } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

const faIconsMap = {
  github: faGithub,
  slides: faFilePowerpoint,
}

const PortfolioCard = ({ card: { title, url, description, role, links } }) => {
  return (
    <Card
      className={styles.card}
      onTouchStart="this.classList.toggle('hover');"
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
            {links && Object.keys(links).map(key => !!links[key] && (
              <a key={key} href={links[key]}>
                <FontAwesomeIcon icon={faIconsMap[key]} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PortfolioCard
