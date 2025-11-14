import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Calendar, Stethoscope, Wrench, Settings, Home } from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Pacientes', path: '/patients' },
  { icon: Calendar, label: 'Consultas', path: '/appointments' },
  { icon: Stethoscope, label: 'Veterinários', path: '/veterinarians' },
  { icon: Wrench, label: 'Serviços', path: '/services' },
  { icon: Settings, label: 'Configurações', path: '/settings' },
]

export default function Sidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-card border-r border-border transition-all duration-300`}>
      <div className="p-6 flex items-center justify-between">
        {isOpen && <h2 className="font-bold text-primary">Menu</h2>}
      </div>

      <nav className="space-y-2 px-3">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              location.pathname === path
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-foreground'
            }`}
          >
            <Icon size={20} />
            {isOpen && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 p-2 hover:bg-muted rounded-lg"
      >
        {isOpen ? '←' : '→'}
      </button>
    </aside>
  )
}
