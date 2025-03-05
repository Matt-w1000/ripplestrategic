"use client"

import React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedChildren({
  children,
  className = "",
  staggerDelay = 0.1,
}: AnimatedSectionProps & { staggerDelay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * staggerDelay,
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    }),
  }

  return (
    <motion.div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <motion.div custom={i} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

