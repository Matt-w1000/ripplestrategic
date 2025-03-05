type MenuIconProps = {
  className?: string
  isOpen?: boolean
}

export function MenuIcon({ className = "h-6 w-6", isOpen = false }: MenuIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        className={`transition-all duration-300 origin-center ${
          isOpen ? "rotate-45" : "translate-y-[-4px] group-hover:translate-y-[-5px]"
        }`}
      />
      <line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        className={`transition-all duration-300 origin-center ${
          isOpen ? "-rotate-45" : "translate-y-[4px] group-hover:translate-y-[5px]"
        }`}
      />
    </svg>
  )
}

