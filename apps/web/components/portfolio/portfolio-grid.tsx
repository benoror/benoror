"use client"

import type { PortfolioItem } from "@/data/portfolio-data"
import PortfolioCard from "./portfolio-card"

interface PortfolioGridProps {
  items: PortfolioItem[]
  onItemClick: (item: PortfolioItem) => void
}

export default function PortfolioGrid({ items, onItemClick }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <PortfolioCard key={item.id} item={item} onClick={() => onItemClick(item)} />
      ))}
    </div>
  )
}

