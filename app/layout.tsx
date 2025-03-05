import type React from "react"
import "./globals.css"
import { Mulish } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "Ripple Strategic - Chief of Digital Experience Officer (CDEO) as a service",
  description:
    "Many businesses lack C-Level digital experience, so CTOs or CMOs have to steer the digital roadmap without the time or skills. Let Ripple set your digital program up for success.",
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-16x16-oI632VF5NcDJAnAO222GiCQVgH2Gu2.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-32x32-6vD1u2X5Ump6ajsBlmwaKXCUNW4TCw.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-touch-icon-yRGhJDPwtrFOB8Tcin9qPW5Wbp6bWB.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={mulish.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'