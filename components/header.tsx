"use client"

import { Moon, Sun, LogOut, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface HeaderProps {
  onLogout: () => void
  currentPage: string
  onNavigate: (page: string) => void
  isLoggedIn: boolean
}

export function Header({ onLogout, currentPage, onNavigate, isLoggedIn }: HeaderProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
    if (newTheme) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <header className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => onNavigate("home")} className="hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Clinica Patinhas
            </h1>
          </button>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => onNavigate("patients")}
              className={`font-medium transition-colors ${
                currentPage === "patients" ? "text-primary" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              Pacientes
            </button>
            <button
              onClick={() => onNavigate("appointments")}
              className={`font-medium transition-colors ${
                currentPage === "appointments" ? "text-primary" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              Consultas
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-primary hover:bg-primary/10">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          {isLoggedIn && (
            <>
              <Button 
                variant="ghost" 
                onClick={() => onNavigate("profile")}
                className={`flex items-center gap-2 ${currentPage === "profile" ? "text-primary bg-primary/10" : "text-foreground/60 hover:text-foreground"}`}
              >
                <User size={20} />
              </Button>
              <Button variant="outline" onClick={onLogout} className="flex items-center gap-2 bg-transparent">
                <LogOut size={18} />
                Sair
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
