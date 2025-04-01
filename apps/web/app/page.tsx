import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </main>
  )
}
