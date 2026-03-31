import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/news", label: "Новости" },
  { href: "/contacts", label: "Контакты" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass shadow-nav">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 gradient-blue rounded-lg flex items-center justify-center shadow-blue group-hover:scale-105 transition-transform">
              <Icon name="BarChart3" size={16} className="text-white" />
            </div>
            <span className="font-display font-black text-xl text-foreground tracking-tight">
              ТОП<span className="text-primary">Сайт</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.href
                    ? "bg-primary text-white shadow-blue"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Войти
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-xl shadow-blue hover:shadow-card-hover hover:bg-blue-700 transition-all duration-200"
            >
              Регистрация
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} className="text-foreground" />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === link.href
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 py-2.5 text-center text-sm font-medium border border-border rounded-xl hover:bg-muted transition-colors"
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 py-2.5 text-center text-sm font-semibold bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Регистрация
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
