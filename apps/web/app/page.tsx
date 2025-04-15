import Navbar from "@/components/navbar"
import Hero from "@/components/home/hero"
import About from "@/components/home/about"
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
