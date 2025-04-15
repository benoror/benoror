"use client"

import type { PortfolioItem } from "@workspace/data/portfolio"
import PortfolioCard from "./portfolio-card"

interface PortfolioGridProps {
  items: PortfolioItem[]
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  )
}

