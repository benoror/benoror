import type { Metadata } from "next"
import { getAggregatedFeed } from "@/lib/feed"
import { FeedPageClient } from "./feed-page.client"

export const metadata: Metadata = {
  title: "Feed | Ben Orozco",
  description: "Aggregated personal feed from blog posts, social updates, podcasts, and gists.",
}

export const dynamic = "force-dynamic"

const ITEMS_PER_PAGE = 10

type FeedPageProps = {
  searchParams?: Promise<{
    page?: string
  }>
}

const toPositiveInt = (value: string | undefined): number | null => {
  if (!value) return null
  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed) || parsed < 1) return null
  return parsed
}

export default async function FeedPage({ searchParams }: FeedPageProps) {
  const feed = await getAggregatedFeed()
  const resolvedSearchParams = await searchParams
  const requestedPage = toPositiveInt(resolvedSearchParams?.page) ?? 1
  const totalPages = Math.max(1, Math.ceil(feed.items.length / ITEMS_PER_PAGE))
  const currentPage = Math.min(requestedPage, totalPages)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  return (
    <FeedPageClient
      feed={{
        ...feed,
        items: feed.items.slice(startIndex, endIndex),
      }}
      pagination={{
        currentPage,
        totalPages,
        itemsPerPage: ITEMS_PER_PAGE,
        totalItems: feed.items.length,
      }}
    />
  )
}
