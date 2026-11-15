"use client"

import type { PortfolioItem } from "@workspace/data/web/portfolio"
import PortfolioCard from "./portfolio-card"

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
      {items.map((item, index) => (
        <PortfolioCard key={item.id} item={item} prioritizeImage={index === 0} />
      ))}
    </div>
  )
}
