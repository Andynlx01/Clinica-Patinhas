import { useState } from 'react'

export default function SettingsPage() {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark')

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newTheme)
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Configurações</h1>

      <div className="bg-card p-6 rounded-lg border border-border max-w-md space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Modo Escuro</p>
            <p className="text-sm text-muted-foreground">Ativar tema escuro</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition ${
              isDark ? 'bg-primary' : 'bg-border'
            }`}
          >
            <div
              className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                isDark ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        <div className="border-t border-border pt-6">
          <p className="font-semibold mb-2">Informações do Sistema</p>
          <p className="text-sm text-muted-foreground">Versão 1.0.0</p>
        </div>
      </div>
    </div>
  )
}
