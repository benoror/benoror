"use client"

import type { PortfolioItem } from "@workspace/data/portfolio"
import PortfolioCard from "./portfolio-card"

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  )
}
