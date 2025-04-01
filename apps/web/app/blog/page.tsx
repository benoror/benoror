import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Blog() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="pt-24 flex-1">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">Blog</h1>
          <p className="text-xl text-muted-foreground mb-12">Coming soon! Check back later for my blog posts.</p>
        </div>
      </section>
      <Footer />
    </main>
  )
}

