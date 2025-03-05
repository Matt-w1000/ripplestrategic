import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ripple Strategic - Chief of Digital Experience Officer (CDEO) as a service",
    short_name: "Ripple",
    description:
      "Many businesses lack C-Level digital experience, so CTOs or CMOs have to steer the digital roadmap without the time or skills. Let Ripple set your digital program up for success.",
    start_url: "/",
    display: "standalone",
    background_color: "#08132D",
    theme_color: "#08132D",
    icons: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/android-chrome-192x192-tVueV1tBUy3hEd8g2FIQx0DD0qBh0c.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/android-chrome-512x512-bKbw1h27heMZVtLNeuC6jaoJmNUnKL.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

