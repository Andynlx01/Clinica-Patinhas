import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Moon, Sun, LogOut, User, Menu } from "lucide-react";

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/home")}
          className="hover:opacity-80 transition"
          aria-label="Ir para a página inicial"
        >
          <h1 className="text-2xl font-bold text-primary">Clínica Patinhas</h1>
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition"
            aria-label="Alternar tema claro/escuro"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 flex items-center gap-2 rounded-lg hover:bg-muted transition"
              aria-label="Abrir menu do usuário"
              aria-expanded={menuOpen}
              aria-controls="user-menu"
            >
              <Menu size={20} />
            </button>
            {menuOpen && (
              <div
                id="user-menu"
                className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50"
                role="menu"
              >
                <div className="p-4 border-b border-border">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-muted"
                  role="menuitem"
                >
                  <User size={18} /> Perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-destructive/10 text-destructive"
                  role="menuitem"
                >
                  <LogOut size={18} /> Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
