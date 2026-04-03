import { portfolioItems } from "@workspace/data/portfolio"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PortfolioClientTabs from "./portfolio-client-tabs" // New client component

export default function PortfolioPage() {
  const projects = portfolioItems.filter((item) => item.section === "projects")
  const publications = portfolioItems.filter((item) => item.section === "publications")
  const talks = portfolioItems.filter((item) => item.section === "talks")

  return (
    <main className="min-h-screen flex flex-col"> {/* Classes handled by client component now */}
      <Navbar />
      <PortfolioClientTabs projects={projects} publications={publications} talks={talks} />
      <Footer />
    </main>
  )
}
