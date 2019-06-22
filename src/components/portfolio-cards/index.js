import React from "react"

const PortfolioCards = ({ cards }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {cards.map(({ title, url }) => (
        <div class="w3-card">
          <p>{title}</p>
        </div>
      ))}
    </div>
  )
}

export default PortfolioCards
