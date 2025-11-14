"use client"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { LoginModal } from "@/components/login-modal"
import { HomePage } from "@/components/pages/home-page"
import { PatientsPage } from "@/components/pages/patients-page"
import { AppointmentsPage } from "@/components/pages/appointments-page"
import { ProfilePage } from "@/components/pages/profile-page"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const [loggedInUser, setLoggedInUser] = useState<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleLogin = (email: string, password: string) => {
    if (email && password) {
      setIsLoggedIn(true)
      setLoggedInUser({ email, name: email.split("@")[0] })
      setShowLoginModal(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoggedInUser(null)
    setCurrentPage("home")
  }

  const handleInteraction = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true)
    }
  }

  useEffect(() => {
    if (isLoggedIn || currentPage === "home") return

    const handleAnyInteraction = (e: Event) => {
      const target = e.target as HTMLElement
      
      if (
        target.closest('[data-allow-interaction]') ||
        target.closest('[role="dialog"]') ||
        target.closest('.modal')
      ) {
        return
      }

      if (!isLoggedIn && currentPage !== "home") {
        e.preventDefault()
        e.stopPropagation()
        setShowLoginModal(true)
      }
    }

    const mainElement = containerRef.current
    if (!mainElement) return

    mainElement.addEventListener('click', handleAnyInteraction, true)
    mainElement.addEventListener('input', handleAnyInteraction, true)
    mainElement.addEventListener('change', handleAnyInteraction, true)
    mainElement.addEventListener('submit', handleAnyInteraction, true)

    return () => {
      mainElement.removeEventListener('click', handleAnyInteraction, true)
      mainElement.removeEventListener('input', handleAnyInteraction, true)
      mainElement.removeEventListener('change', handleAnyInteraction, true)
      mainElement.removeEventListener('submit', handleAnyInteraction, true)
    }
  }, [isLoggedIn, currentPage])

  return (
    <>
      <Header 
        onLogout={handleLogout} 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        isLoggedIn={isLoggedIn} 
      />
      <main className="flex-1 overflow-auto" ref={containerRef}>
        {currentPage === "home" && (
          <HomePage 
            onNavigate={setCurrentPage} 
            isAuthenticated={isLoggedIn}
            onShowLogin={() => setShowLoginModal(true)}
          />
        )}
        {currentPage === "patients" && <PatientsPage isLoggedIn={isLoggedIn} onRequireLogin={handleInteraction} />}
        {currentPage === "appointments" && (
          <AppointmentsPage isLoggedIn={isLoggedIn} onRequireLogin={handleInteraction} />
        )}
        {currentPage === "profile" && (
          <ProfilePage 
            user={loggedInUser} 
            isLoggedIn={isLoggedIn} 
            onRequireLogin={handleInteraction}
          />
        )}
      </main>
      {showLoginModal && <LoginModal onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />}
    </>
  )
}
