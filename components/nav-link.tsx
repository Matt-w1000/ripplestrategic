"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
  className?: string
}

export function NavLink({ href, children, isActive, className }: NavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "relative px-3 py-1.5 rounded-full text-lg font-semibold transition-all duration-200",
        "hover:bg-nightshift/5 dark:hover:bg-white/5",
        "hover:text-nightshift dark:hover:text-white",
        isActive && "bg-nightshift/10 dark:bg-white/10",
        isActive ? "text-nightshift dark:text-white" : "text-nightshift/80 dark:text-white/80",
        className,
      )}
    >
      {children}
    </a>
  )
}

