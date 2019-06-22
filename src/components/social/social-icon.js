import React from "react"
import styles from "./styles.module.css"

const SocialIcon = ({ item }) => {
  const { url, name, description } = item

  return (
    <div style={{ position: "relative" }}>
      <a href={url}>
        <img
          className={styles.socialIcon}
          alt={description}
          title={description}
          src={require(`./images/${name}.png`)}
        />
      </a>
    </div>
  )
}

export default SocialIcon
