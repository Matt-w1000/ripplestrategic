"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface AnimateOnScrollProps {
  children: React.ReactNode
  threshold?: number
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ children, threshold = 0.1 }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
        }
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -100px 0px", // Trigger animation slightly before the element is in view
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return (
    <div ref={ref} className="animate-on-scroll">
      {children}
    </div>
  )
}

