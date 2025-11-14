import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Moon, Sun, LogOut, User, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark')
  const [showMenu, setShowMenu] = useState(false)

  const handleThemeToggle = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newTheme)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Clínica Patinhas</h1>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleThemeToggle}
            className="p-2 hover:bg-muted rounded-lg transition"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition"
            >
              <Menu size={20} />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                <div className="p-4 border-b border-border">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    navigate('/profile')
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-muted text-left"
                >
                  <User size={18} /> Perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-destructive/10 text-destructive text-left"
                >
                  <LogOut size={18} /> Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
