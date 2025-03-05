"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LightbulbIcon, BarChart3Icon, ArrowRightIcon } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useTheme } from "next-themes"
import { AnimatedSection, AnimatedChildren } from "@/components/animated-section"
import { NavLink } from "@/components/nav-link"
import { useActiveSection } from "@/lib/use-active-section"
import { LinkedInIcon } from "@/components/linkedin-icon"
import { PhoneIcon, MailIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Add these imports at the top
import { MenuIcon } from "@/components/menu-icon"

// Add this type definition before the Page component
type FormErrors = {
  name: string
  phone: string
  organisation: string
  email: string
  message: string
}

// ... (keep existing imports and initial code)

export default function Page() {
  // ... (keep existing state and refs)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { theme } = useTheme()
  const backgroundRef = useRef<HTMLDivElement>(null)
  const footerBackgroundRef = useRef<HTMLDivElement>(null)
  const activeSection = useActiveSection()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#leadership", label: "Leadership" },
    { href: "#experience", label: "Experience" },
  ]

  const backgroundImage =
    theme === "light"
      ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero3Light%20top-DxViQhaucIzpGcGAsKByWUtslVlNjz.png"
      : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero3Dark%20Top-3nkfK0jlk4rj1cMlD5ATVKxCrpEBkC.png"

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const progress = scrollTop / (documentHeight - windowHeight)
      setScrollProgress(progress)

      // Check if we've scrolled to the logo
      const logoElement = document.getElementById("logo")
      if (logoElement) {
        const logoPosition = logoElement.getBoundingClientRect().top + window.scrollY
        const scrollThreshold = window.innerHeight * 0.1 // 10% of viewport height
        setIsScrolled(window.scrollY > scrollThreshold)
      }

      // Parallax effect for top background with enhanced upward movement
      if (backgroundRef.current) {
        // Increased parallax effect from -0.05 to -0.25 for more noticeable upward movement
        const topParallax = scrollTop * -0.25
        const fadeProgress = Math.min(scrollTop / (windowHeight * 0.8), 1) // Increased fade threshold
        const opacity = Math.max(0, 1 - fadeProgress)
        backgroundRef.current.style.transform = `translate3d(0, ${topParallax}px, 0)`
        backgroundRef.current.style.opacity = opacity.toString()
      }

      // Footer background - fade in only
      if (footerBackgroundRef.current) {
        const opacity = Math.max(0, Math.min(1, (progress - 0.5) * 2))
        footerBackgroundRef.current.style.opacity = opacity.toString()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest(".md\\:hidden")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMenuOpen])

  // Add these inside the Page component, before the return statement
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    organisation: "",
    email: "",
    message: "",
  })

  const [touchedFields, setTouchedFields] = useState({
    name: false,
    phone: false,
    organisation: false,
    email: false,
    message: false,
  })

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    phone: "",
    organisation: "",
    email: "",
    message: "",
  })

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "This field is required" : ""
      case "phone":
        return value.trim() === "" ? "This field is required" : ""
      case "organisation":
        return value.trim() === "" ? "This field is required" : ""
      case "email":
        return value.trim() === ""
          ? "This field is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? "Please enter a valid email address"
            : ""
      case "message":
        return value.trim() === "" ? "This field is required" : ""
      default:
        return ""
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setTouchedFields((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, formData[name as keyof typeof formData]) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Touch all fields to show errors
    const allTouched = Object.keys(touchedFields).reduce(
      (acc, key) => ({
        ...acc,
        [key]: true,
      }),
      {},
    )
    setTouchedFields(allTouched)

    // Validate all fields
    const newErrors = Object.keys(formData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: validateField(key, formData[key as keyof typeof formData]),
      }),
      {} as FormErrors,
    )
    setErrors(newErrors)

    // Check if there are any errors
    if (Object.values(newErrors).every((error) => error === "")) {
      // Submit form
      console.log("Form submitted:", formData)
    }
  }

  return (
    <main className="min-h-screen w-full text-black dark:text-white overflow-x-hidden bg-white dark:bg-nightshift antialiased relative">
      {/* Keep background divs and header as is */}
      {/* Top Background Image Container */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 z-0 transition-transform duration-1000 ease-out will-change-transform bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center top",
          backgroundSize: "cover",
          transform: "translateZ(0)", // Hardware acceleration
        }}
      />

      {/* Footer Background Image Container */}
      <div
        className="fixed inset-0 z-0 opacity-0 transition-all duration-1000 ease-out will-change-transform overflow-hidden"
        ref={footerBackgroundRef}
      >
        <Image
          src={
            theme === "light"
              ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Footer3Light-0O4V8vpLgJn2GbdnhlpuBKlELCUJEj.png"
              : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Footer3Dark-M8ffggATtoNwsqwsPW11gWc0bwE8NH.png"
          }
          alt="Footer Background"
          fill
          className="object-cover object-bottom transition-opacity duration-500"
          sizes="100vw"
          priority
          quality={100}
        />
      </div>

      <div className="relative z-10">
        {/* Keep navigation and hero section as is */}
        {/* Navigation */}

        {/* Navigation Layout */}
        <nav className="fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div
              className={`transition-all duration-300 ease-in-out transform rounded-full pl-3 pr-3 py-2.5 flex items-center justify-between ${
                isScrolled ? "bg-[#CCCED5]/80 dark:bg-[#363D48]/50 backdrop-blur-md" : "bg-transparent backdrop-blur-0"
              }`}
            >
              {/* Left Side: Mobile Menu + Logo Space */}
              <div className="flex items-center">
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-full bg-black/8 dark:bg-white/8 text-nightshift dark:text-white hover:bg-nightshift/5 dark:hover:bg-white/5 w-10 h-10 p-2 group transition-colors"
                  >
                    <MenuIcon className="h-6 w-6" isOpen={isMenuOpen} />
                    <span className="sr-only">Toggle menu</span>
                  </Button>

                  {/* Mobile Menu Dropdown */}
                  {isMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 py-4 bg-white dark:bg-nightshift rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
                      {navigationItems.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className={`block px-6 py-3 text-sm transition-colors ${
                            activeSection === item.href.replace("#", "")
                              ? "text-nightshift dark:text-white bg-gray-100 dark:bg-white/10"
                              : "text-nightshift/60 dark:text-white/60 hover:text-nightshift hover:bg-gray-50 dark:hover:text-white dark:hover:bg-white/5"
                          }`}
                          onClick={(e) => {
                            e.preventDefault()
                            const element = document.getElementById(item.href.replace("#", ""))
                            if (element) {
                              window.scrollTo({
                                top: element.offsetTop - 128, // Consistent 128px offset
                                behavior: "smooth",
                              })
                            }
                            setIsMenuOpen(false)
                          }}
                        >
                          {item.label}
                        </a>
                      ))}
                      <div className="px-4 pt-4">
                        <Button
                          onClick={() => {
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                            setIsMenuOpen(false)
                          }}
                          className="w-full rounded-full bg-nightshift text-white dark:bg-white dark:text-black hover:bg-nightshift/80 hover:text-white dark:hover:bg-gray-200 dark:hover:text-black text-sm font-semibold py-3"
                        >
                          Contact
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Logo - Show only when scrolled */}
                <div
                  className={`flex items-center cursor-pointer transition-all duration-300 ease-in-out ${
                    isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ripple%20logo%20horizontal-TFyOKnkbx7sUiCWqXgsdUrqTExJhPo.svg"
                    alt="Ripple Logo"
                    width={200}
                    height={50}
                    className="h-9 w-auto theme-logo ml-3"
                  />
                </div>
              </div>

              {/* Center: Navigation */}
              <div className="hidden md:flex flex-1 items-center justify-center mx-auto">
                <nav className="flex items-center space-x-2">
                  {navigationItems.map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      isActive={activeSection === item.href.replace("#", "")}
                      className="text-nightshift/80 dark:text-white/80"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Right Side: Theme Toggle + Contact Button */}
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-full bg-nightshift text-white dark:bg-white dark:text-black hover:bg-nightshift/80 hover:text-white dark:hover:bg-gray-200 dark:hover:text-black text-base font-semibold"
                >
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div>
          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-8 pt-32 sm:pt-40 pb-16 sm:pb-24 flex flex-col items-center justify-center">
            <Image
              id="logo"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ripple%20logo-ORO2VrcZdnS4M37xx5B15D9wyGvCxf.svg"
              alt="Ripple Logo"
              width={160}
              height={117}
              className="h-[117px] w-auto theme-logo mb-8 sm:mb-12"
              priority
            />
            <h1 className="text-h1-mobile sm:text-h1-sm md:text-h1-md xl:text-h1-xl font-extrabold max-w-4xl mb-6 sm:mb-8 text-center leading-tight tracking-[-0.03em]">
              <span className="text-daybreak-light dark:text-daybreak">Ripple Strategic</span>
              <br />
              Chief Digital Experience Officer (CDEO) as a Service
            </h1>
            <p className="text-gray-800 dark:text-gray-200 max-w-4xl mb-8 sm:mb-12 text-[18px] lg:text-xl xl:text-[1.3rem] text-center">
              Integrating as a consultant with your structure, Ripple helps you validate and calibrate your:
            </p>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 max-w-4xl w-full justify-between">
              <div className="text-left sm:text-left flex-1">
                <div className="border-t-[1.5px] border-daybreak-light dark:border-daybreak mb-2 mx-auto sm:mx-0 w-[100%]"></div>
                <h3 className="text-lg sm:text-base lg:text-lg xl:text-xl font-extrabold leading-tight uppercase">
                  <span className="text-daybreak-light dark:text-daybreak">01</span> Strategy
                </h3>
              </div>
              <div className="text-left sm:text-left flex-1">
                <div className="border-t-[1.5px] border-daybreak-light dark:border-daybreak mb-2 mx-auto sm:mx-0 w-[100%]"></div>
                <h3 className="text-lg sm:text-base lg:text-xl xl:text-xl font-extrabold leading-tight uppercase">
                  <span className="text-daybreak-light dark:text-daybreak">02</span> Delivery
                </h3>
              </div>
              <div className="text-left sm:text-left flex-1">
                <div className="border-t-[1.5px] border-daybreak-light dark:border-daybreak mb-2 mx-auto sm:mx-0 w-[100%]"></div>
                <h3 className="text-lg sm:text-base lg:text-xl xl:text-xl font-extrabold leading-tight uppercase">
                  <span className="text-daybreak-light dark:text-daybreak">03</span> Measurement
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* What is Ripple Section */}
        {/* Remove this entire section */}
        {/* The Ripple Effect */}
        <AnimatedSection>
          <section id="about" className="scroll-mt-32 max-w-7xl mx-auto px-8 py-20">
            <div className="rounded-[8px] overflow-hidden relative bg-gray-100 dark:bg-zinc-900">
              <div className="p-6 sm:p-16">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gradient%20bg-VuV86yOVJVwLTRSS28Jecs3NFkTdoM.png"
                    alt="Gradient background"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <AnimatedChildren className="relative z-10 max-w-[700px] mx-auto" staggerDelay={0.2}>
                  <h2 className="pt-4 text-h2-mobile sm:text-h2-sm md:text-h2-md xl:text-h2-xl font-bold mb-6 sm:mb-8 text-white text-left tracking-[-0.03em]">
                    The Ripple Effect
                  </h2>
                  <div className="w-full h-[1.5px] bg-white/25 mb-8"></div>
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 36 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                      >
                        <path
                          d="M18.1138 0.537144C27.993 0.541583 36 8.55127 36 18.4311C36 23.3685 34.0003 27.8388 30.7667 31.0764L30.7668 31.0762C27.5083 34.4477 22.9455 36.541 17.894 36.541C8.0114 36.541 0 28.5296 0 18.647C0 13.5974 2.09164 9.03633 5.45581 5.78291L5.46081 5.77809C8.68103 2.54064 13.139 0.537109 18.0649 0.537109H18.1165H18.1138L18.1138 0.537144ZM18.1138 33.9392C26.6787 33.9392 33.6219 26.996 33.6219 18.4311C33.6219 9.86623 26.6787 2.92302 18.1138 2.92302C9.54892 2.92302 2.60571 9.86623 2.60571 18.4311C2.61567 26.992 9.55291 33.9293 18.1128 33.9392H18.1138ZM15.0758 26.1947L8.15679 19.2741L9.84284 17.5882L15.0759 22.8211L26.3849 11.5121L28.0708 13.1981L15.0758 26.1947Z"
                          className="fill-white dark:fill-white"
                        />
                      </svg>
                      <p className="font-light leading-relaxed text-[18px] lg:text-xl xl:text-[1.3rem] text-white/90">
                        Got a big digital initiative in mind and want to validate it?
                      </p>
                    </div>
                    <div className="w-full h-[1.5px] bg-white/25"></div>
                    <div className="flex items-start gap-4">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 36 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                      >
                        <path
                          d="M18.1138 0.537144C27.993 0.541583 36 8.55127 36 18.4311C36 23.3685 34.0003 27.8388 30.7667 31.0764L30.7668 31.0762C27.5083 34.4477 22.9455 36.541 17.894 36.541C8.0114 36.541 0 28.5296 0 18.647C0 13.5974 2.09164 9.03633 5.45581 5.78291L5.46081 5.77809C8.68103 2.54064 13.139 0.537109 18.0649 0.537109H18.1165H18.1138L18.1138 0.537144ZM18.1138 33.9392C26.6787 33.9392 33.6219 26.996 33.6219 18.4311C33.6219 9.86623 26.6787 2.92302 18.1138 2.92302C9.54892 2.92302 2.60571 9.86623 2.60571 18.4311C2.61567 26.992 9.55291 33.9293 18.1128 33.9392H18.1138ZM15.0758 26.1947L8.15679 19.2741L9.84284 17.5882L15.0759 22.8211L26.3849 11.5121L28.0708 13.1981L15.0758 26.1947Z"
                          className="fill-white dark:fill-white"
                        />
                      </svg>
                      <p className="font-light leading-relaxed text-[18px] lg:text-xl xl:text-[1.3rem] text-white/90">
                        Want to get tighter synchronisation between strategy and delivery?
                      </p>
                    </div>
                    <div className="w-full h-[1.5px] bg-white/25"></div>
                    <div className="flex items-start gap-4">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 36 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                      >
                        <path
                          d="M18.1138 0.537144C27.993 0.541583 36 8.55127 36 18.4311C36 23.3685 34.0003 27.8388 30.7667 31.0764L30.7668 31.0762C27.5083 34.4477 22.9455 36.541 17.894 36.541C8.0114 36.541 0 28.5296 0 18.647C0 13.5974 2.09164 9.03633 5.45581 5.78291L5.46081 5.77809C8.68103 2.54064 13.139 0.537109 18.0649 0.537109H18.1165H18.1138L18.1138 0.537144ZM18.1138 33.9392C26.6787 33.9392 33.6219 26.996 33.6219 18.4311C33.6219 9.86623 26.6787 2.92302 18.1138 2.92302C9.54892 2.92302 2.60571 9.86623 2.60571 18.4311C2.61567 26.992 9.55291 33.9293 18.1128 33.9392H18.1138ZM15.0758 26.1947L8.15679 19.2741L9.84284 17.5882L15.0759 22.8211L26.3849 11.5121L28.0708 13.1981L15.0758 26.1947Z"
                          className="fill-white dark:fill-white"
                        />
                      </svg>
                      <p className="font-light leading-relaxed text-[18px] lg:text-xl xl:text-[1.3rem] text-white/90">
                        Want to find a way to enhance initiative ROI, with simple and clear data insights?
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-[1.5px] bg-white/25 mb-8"></div>
                  <p className="font-light leading-relaxed text-[18px] lg:text-xl xl:text-[1.3rem] text-white/90 mb-16">
                    Ripple's unique Chief of Digital Experience Officer (CDEO) as a service, provides a fresh and
                    unbiased perspective, appraising your program from strategy down. Ripple helps you validate what's
                    going well and provides recommendations on how to better calibrate your approach and synchronise
                    strategy, project setup, execution and measurement.
                  </p>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-16">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Video%20%281%29-5cz7LHKWPnLKvhP4X5kbSRnYO6DyF0.png"
                      alt="The Ripple Effect - Stuart Gonsal"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-nightshift dark:border-l-daybreak border-b-[10px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-center italic text-quote-mobile sm:text-quote-sm md:text-quote-md xl:text-quote-xl mb-16 font-light text-white max-w-[500px] mx-auto">
                    The Ripple effect - when initiatives flow effectively from the first big idea outwards to achieve
                    great user experiences and ROI.
                  </blockquote>
                </AnimatedChildren>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* 3 Focuses Section */}
        <AnimatedSection>
          <section id="services" className="scroll-mt-32 max-w-7xl mx-auto px-8 py-20">
            <h2 className="text-h2-mobile sm:text-h2-sm md:text-h2-md xl:text-h2-xl font-bold mb-6 sm:mb-8 tracking-[-0.03em]">
              <span className="text-daybreak-light dark:text-daybreak">Three focuses, </span>
              <span className="text-nightshift dark:text-white">one holistic view</span>
            </h2>
            <AnimatedChildren className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" staggerDelay={0.2}>
              <div className="flex flex-col h-full">
                <div className="space-y-4 flex-grow pb-8">
                  <LightbulbIcon className="w-8 h-8" />
                  <h3 className="text-xl sm:text-lg lg:text-xl xl:text-2xl font-black leading-tight uppercase">
                    <span className="text-daybreak-light dark:text-daybreak">01</span> Strategy
                  </h3>
                  <p className="text-gray-600 dark:text-white font-light leading-relaxed text-[18px] lg:text-xl xl:text-[1.3rem]">
                    Does your roadmap align with your values, business and customer needs? We help you validate and
                    calibrate your current planning strategy.
                  </p>
                </div>
                <div className="border-t-[1.5px] border-daybreak-light dark:border-daybreak w-[100%]"></div>
              </div>
              <div className="flex flex-col h-full">
                <div className="border-t-[1.5px] border-daybreak-light dark:border-daybreak w-[100%]"></div>
              </div>
              <div className="flex flex-col h-full">
                <div className="space-y-4 flex-grow pb-8">
                  <ArrowRightIcon className="w-8 h-8" />
                  <h3 className="text-xl sm:text-lg lg:text-xl xl:text-2xl font-black leading-tight uppercase">
                    <span className="text-daybreak-light dark:text-daybreak">02</span> Delivery
                  </h3>
                  <p className="text-gray-600 dark:text-white font-light leading-relaxed text-[18px] lg:text-xl xl:text-[1.3rem]">
                    Is your team plan right and will it succeed? We help you validate and calibrate the systems needed
                    to deliver your digital product strategy.
                  </p>
                </div>
                <div className="border-t-[1.5px] border-daybreak-light dark:border-daybreak w-[100%]"></div>
              </div>
              <div className="flex flex-col h-full">
                <div className="space-y-4 flex-grow pb-8">
                  <BarChart3Icon className="w-8 h-8" />
                  <h3 className="text-xl sm:text-lg lg:text-xl xl:text-2xl font-black leading-tight uppercase">
                    <span className="text-daybreak-light dark:text-daybreak">03</span> Measurement
                  </h3>
                  <p className="text-gray-600 dark:text-white font-light leading-relaxed text-[18px] lg:text-xl xl:text-[1.3rem]">
                    Have you set the right measurement parameters to track success? We help you validate and calibrate
                    your KPIs and success metrics.
                  </p>
                </div>
                <div className="border-t-[1.5px] border-daybreak-light dark:border-daybreak w-[100%]"></div>
              </div>
            </AnimatedChildren>
          </section>
        </AnimatedSection>

        {/* Who is Ripple? Section */}
        <AnimatedSection>
          <section id="leadership" className="scroll-mt-32 max-w-7xl mx-auto px-8 py-20">
            <div className="rounded-[8px] overflow-hidden relative bg-gray-100 dark:bg-zinc-900">
              <div className="p-6 sm:p-16">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gradient%20bg-VuV86yOVJVwLTRSS28Jecs3NFkTdoM.png"
                    alt="Gradient background"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative z-10">
                  <h2 className="pt-4 text-h2-mobile sm:text-h2-sm md:text-h2-md xl:text-h2-xl font-bold mb-6 sm:mb-8 text-white text-left tracking-[-0.03em]">
                    Who is Ripple?
                  </h2>
                  <div className="w-full h-[1.5px] bg-white/25 mb-8"></div>
                  <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                    <div>
                      <div className="space-y-6">
                        <p className="font-light leading-relaxed text-[18px] lg:text-xl xl:text-[1.3rem] text-white/90">
                          Ripple is led by Stuart Gonsal, an industry leader with 20+ years' experience. Stuart founded,
                          ran and sold an award-winning digital agency, led large-scale corporate ANZ practices and
                          innovation labs for Swinburne and UTS. He has consulted with Accenture, Woolworths, Deloitte,
                          and EnergyAustralia, delivering 200+ successful projects. Stuart also advises industry through
                          steering committees, public speaking and authoring.
                        </p>
                      </div>
                    </div>
                    <div className="relative aspect-square w-full max-w-[300px] mx-auto">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Stuart%20Gonsal-7zyEnvq3OcERK4dEoeiKrsP0xVugo3.png"
                        alt="Stuart Gonsal, Director & Founder of Ripple Strategic"
                        fill
                        className="object-cover rounded-full border-4 border-white"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                  </div>
                  <div className="w-full h-[1.5px] bg-white/25 mb-8"></div>
                  <blockquote className="text-center italic text-quote-mobile sm:text-quote-sm md:text-quote-md xl:text-quote-xl mb-6 font-light leading-relaxed text-white max-w-[700px] mx-auto">
                    "Ripple can complement your C-suite team, providing validation and refinement of your
                    customer-facing digital strategy, and helping you assess and overcome common challenges when
                    transitioning strategy to execution and measurement."
                  </blockquote>
                  <p className="pb-4 text-center font-bold text-[16px] lg:text-xl xl:text-[1.3rem] text-white/90">
                    Stuart Gonsal: Director & Founder
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Logo Wall */}
        <AnimatedSection>
          <section className="scroll-mt-32 max-w-7xl mx-auto px-8 py-20">
            <div id="experience" className="scroll-mt-32">
              {" "}
              {/* Add this wrapper div with scroll-mt */}
              <h2 className="text-h2-mobile sm:text-h2-sm md:text-h2-md xl:text-h2-xl font-bold mb-6 sm:mb-8 text-daybreak-light dark:text-daybreak tracking-[-0.03em]">
                Extensive Experience
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1 items-center">
                {[
                  {
                    name: "Energy Australia",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Energy%20Australia-tixjXZV3IQHaAKJ7U9UBYu37De5126.png",
                  },
                  {
                    name: "Vic Government",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vic%20Government-ykl8v9D6gRjGzJqoULHXys8Hg6frm4.png",
                  },
                  {
                    name: "Sydney Water",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sydney%20Water-eFo55wOtbElfeioLc4N3NRFZCeA8Pu.png",
                  },
                  {
                    name: "DXC Technology",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DXC%20Technology-CLXO7VjJ9AR5LRI2ZXMKYduWvWIPXB.png",
                  },
                  {
                    name: "Headspace",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Headspace-qksM2RQFp7TLmYtAIH2immGdSlmOyc.png",
                  },
                  {
                    name: "Accenture",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Accenture-xJ4tdkbHT4aJP6JwJy8eV7nLc9qJrC.png",
                  },
                  {
                    name: "Channel 7",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Channel%207-TnFGHe2zxX5OHJuzgeANAHvLJ5SvdL.png",
                  },
                  {
                    name: "Autobarn",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Autobarn-b5ZfC5tP2BdbkLfGaA3DxxT8sTb8nj.png",
                  },
                  {
                    name: "Ian Potter Foundation",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ian%20Potter%20Foundation-Inrtv8sxpEudpzS4yohVlHnTghPJW8.png",
                  },
                  {
                    name: "University of Canberra",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Canberra%20University-gRuXA9hNNAulblspLgzDKo5QT8PqQT.png",
                  },
                  {
                    name: "Woolworths",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Woolworths-DfQqYWAnh5tPm3YfKhW3SbKdLAUyxE.png",
                  },
                  {
                    name: "DFAT",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DFAT-NEyYLyWKaPsJN8NAMdn7bV5SNoMUlE.png",
                  },
                  {
                    name: "Open Universities",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Open%20Universities-YyWs7ZQMRwUHhnzGJKNiZEh0rFB820.png",
                  },
                  {
                    name: "Cancer Institute NSW",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cancer%20Institute%20NSW-ydZwiJsnUoUm44hGDOcqW9wfCrYE3y.png",
                  },
                  {
                    name: "Publicis Sapient",
                    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Publicis%20Sapient-5ESUpUIUYDhf4uCbgq4GTwC22k4lSW.png",
                  },
                ].map((company) => (
                  <div key={company.name} className="relative rounded-[6px] bg-black/10 dark:bg-white/10">
                    <div className="p-4 w-full flex items-center justify-center">
                      <Image
                        src={company.url || "/placeholder.svg"}
                        alt={company.name}
                        width={120}
                        height={60}
                        className="max-w-full h-auto invert dark:invert-0"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Contact Form */}
        <AnimatedSection>
          <section id="contact" className="scroll-mt-32 max-w-7xl mx-auto px-8 py-20 flex flex-col items-center">
            <h2 className="text-h2-mobile sm:text-h2-sm md:text-h2-md xl:text-[56px] font-bold mb-8 text-daybreak-light dark:text-daybreak tracking-[-0.03em]">
              Get in touch
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-8 text-gray-900 dark:text-white">
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                <a href="tel:+61409465282" className="hover:text-nightshift dark:hover:text-daybreak transition-colors">
                  +61 409 465 282
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="w-4 h-4" />
                <a
                  href="mailto:stuart@ripplestrategic.com.au"
                  className="hover:text-nightshift dark:hover:text-daybreak transition-colors"
                >
                  stuart@ripplestrategic.com.au
                </a>
              </div>
            </div>
            <form className="max-w-3xl space-y-8 w-full" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4">
                <div className="space-y-2">
                  <Input
                    name="name"
                    placeholder="Name"
                    className="rounded-[6px] bg-white dark:bg-white/20 border-gray-400 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-700 dark:placeholder:text-gray-300 h-14 text-lg"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {touchedFields.name && errors.name && (
                    <p className="text-base text-red-600 dark:text-red-400 font-medium">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    className="rounded-[6px] bg-white dark:bg-white/20 border-gray-400 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-700 dark:placeholder:text-gray-300 h-14 text-lg"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {touchedFields.phone && errors.phone && (
                    <p className="text-base text-red-600 dark:text-red-400 font-medium">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4">
                <div className="space-y-2">
                  <Input
                    name="organisation"
                    placeholder="Organisation"
                    className="rounded-[6px] bg-white dark:bg-white/20 border-gray-400 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-700 dark:placeholder:text-gray-300 h-14 text-lg"
                    value={formData.organisation}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {touchedFields.organisation && errors.organisation && (
                    <p className="text-base text-red-600 dark:text-red-400 font-medium">{errors.organisation}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="rounded-[6px] bg-white dark:bg-white/20 border-gray-400 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-700 dark:placeholder:text-gray-300 h-14 text-lg"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {touchedFields.email && errors.email && (
                    <p className="text-base text-red-600 dark:text-red-400 font-medium">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Textarea
                  name="message"
                  placeholder="Message"
                  className="rounded-[6px] bg-white dark:bg-white/20 border-gray-400 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-700 dark:placeholder:text-gray-300 min-h-[160px] text-lg"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                {touchedFields.message && errors.message && (
                  <p className="text-base text-red-600 dark:text-red-400 font-medium">{errors.message}</p>
                )}
              </div>
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  className="rounded-full bg-nightshift text-white dark:bg-white dark:text-nightshift hover:bg-nightshift/90 hover:text-white dark:hover:bg-white/90 dark:hover:text-nightshift w-full sm:w-auto text-lg font-semibold border-none px-12 h-14"
                >
                  Send message
                </Button>
              </div>
            </form>
          </section>
        </AnimatedSection>

        {/* Footer */}
        <footer>
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex flex-col items-center gap-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ripple%20logo-ORO2VrcZdnS4M37xx5B15D9wyGvCxf.svg"
                alt="Ripple Logo"
                width={120}
                height={30}
                className="w-[120px] theme-logo mb-4"
              />
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <a
                  href="https://linkedin.com/in/stuartgonsal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-white/90 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 text-nightshift dark:text-white transition-colors"
                >
                  <LinkedInIcon className="w-5 h-5" />
                  <span className="text-sm font-semibold">Stuart Gonsal</span>
                </a>
                <a
                  href="https://linkedin.com/company/ripple-strategic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-white/90 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 text-nightshift dark:text-white transition-colors"
                >
                  <LinkedInIcon className="w-5 h-5" />
                  <span className="text-sm font-semibold">Ripple Strategic</span>
                </a>
              </div>
              <p className="max-w-[850px] text-center text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                Ripple is an Australian consultancy offering C-level strategic digital experience advice as a service.
                From our first touch, strategy, systems and processes are calibrated to flow through to outcomes that
                serve and delight your end customers. The Ripple effect.
              </p>
              <p className="max-w-[850px] text-center text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                We acknowledge the Traditional Custodians of the land on which we live and work, and pay our respects to
                their Elders past, present and emerging.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Ripple Strategic. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

