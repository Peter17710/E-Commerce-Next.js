"use client"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // ✅ check saved preference on mount
    const saved = localStorage.getItem("theme")
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    }
  }, [])

  function toggleDarkMode() {
    if (isDark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="relative w-14 h-7 rounded-full transition-colors duration-500 focus:outline-none"
      style={{ background: isDark ? "#6366f1" : "#e2e8f0" }}
      aria-label="Toggle dark mode"
    >
      {/* Track icons */}
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-yellow-400 transition-opacity duration-300"
        style={{ opacity: isDark ? 0 : 1 }}>
        <Sun size={14} />
      </span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-white transition-opacity duration-300"
        style={{ opacity: isDark ? 1 : 0 }}>
        <Moon size={14} />
      </span>

      {/* Thumb */}
      <span
        className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-500 flex items-center justify-center"
        style={{ transform: isDark ? "translateX(28px)" : "translateX(0px)" }}
      >
        {isDark
          ? <Moon size={13} className="text-indigo-500" />
          : <Sun size={13} className="text-yellow-400" />
        }
      </span>
    </button>
  )
}