import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LightbulbIcon, BarChart3Icon, ArrowRightIcon } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-mulish">
      {/* Navigation */}
      <nav className="pt-[60px] p-4 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-start">
          <div className="flex gap-6">
            <a href="#" className="text-sm hover:text-gray-300">
              About
            </a>
            <a href="#" className="text-sm hover:text-gray-300">
              Services
            </a>
            <a href="#" className="text-sm hover:text-gray-300">
              Work
            </a>
          </div>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ripple%20logo-ORO2VrcZdnS4M37xx5B15D9wyGvCxf.svg"
            alt="Ripple Logo"
            width={186}
            height={136}
            className="h-[136px] w-auto mx-auto"
          />
          <Button variant="outline" className="text-black border-white hover:bg-white hover:text-black">
            Contact
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-8">
          Ripple Strategic - Chief Digital Experience Officer (CDEO) as a Service
        </h1>
        <p className="text-gray-400 max-w-xl mb-12">
          Integrating as a consultant with your structure. Ripple helps you validate and calibrate your strategy.
        </p>
        <div className="flex gap-8">
          <div className="text-sm">01 Strategy</div>
          <div className="text-sm">02 Delivery</div>
          <div className="text-sm">03 Measurement</div>
        </div>
      </section>

      {/* What is Ripple Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">What is Ripple?</h2>
          <p className="text-gray-400">
            Ripple is that key balance between strategy, management and real-world delivery. From our key tools, Vision
            Map through to our unique Ripple Effect, we help you validate and calibrate your digital product strategy.
          </p>
        </div>
        <div className="bg-gray-900 rounded-lg"></div>
      </section>

      {/* The Ripple Effect */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-zinc-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-8">The Ripple Effect</h2>
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center shrink-0">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <p>Got a big digital initiative or need and want to validate it?</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center shrink-0">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <p>Need to get tighter synchronisation between strategy and delivery?</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center shrink-0">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <p>Need to find a way to measure initiative ROI with simple and clear data insights?</p>
            </div>
          </div>
          <p className="text-center italic text-lg mt-12">
            The Ripple effect - when initiatives flow effectively from the first big idea outwards to achieve great user
            experiences and ROI.
          </p>
        </div>
      </section>

      {/* 3 Focuses Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold mb-12">3 focuses, 1 holistic view</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <LightbulbIcon className="w-8 h-8" />
            <h3 className="font-bold">01 Strategy</h3>
            <p className="text-gray-400">
              Does your roadmap align with your values, business and customer needs? We help you validate and calibrate
              your current planning strategy.
            </p>
          </div>
          <div className="space-y-4">
            <ArrowRightIcon className="w-8 h-8" />
            <h3 className="font-bold">02 Delivery</h3>
            <p className="text-gray-400">
              Is your team plan right and will it succeed? We help you validate and calibrate the systems needed to
              deliver your digital product strategy.
            </p>
          </div>
          <div className="space-y-4">
            <BarChart3Icon className="w-8 h-8" />
            <h3 className="font-bold">03 Measurement</h3>
            <p className="text-gray-400">
              Have you set the right measurement parameters to track success? We help you validate and calibrate your
              KPIs and success metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold mb-8">Get in touch</h2>
        <form className="max-w-xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Name" className="bg-zinc-900 border-zinc-800" />
            <Input placeholder="Email" className="bg-zinc-900 border-zinc-800" />
          </div>
          <Textarea placeholder="Message" className="bg-zinc-900 border-zinc-800 min-h-[120px]" />
          <Button className="bg-white text-black hover:bg-gray-200">Send message</Button>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ripple%20logo-ORO2VrcZdnS4M37xx5B15D9wyGvCxf.svg"
              alt="Ripple Logo"
              width={120}
              height={30}
              className="w-[120px]"
            />
            <div className="flex gap-6">
              <a href="#" className="text-sm hover:text-gray-300">
                About
              </a>
              <a href="#" className="text-sm hover:text-gray-300">
                Services
              </a>
              <a href="#" className="text-sm hover:text-gray-300">
                Work
              </a>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-8">© 2024 Ripple. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

