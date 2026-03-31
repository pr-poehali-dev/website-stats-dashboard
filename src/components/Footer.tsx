import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-20">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 gradient-blue rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={16} className="text-white" />
              </div>
              <span className="font-display font-black text-xl tracking-tight">
                ТОП<span className="text-primary">Сайт</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Каталог лучших сайтов рунета с реальной статистикой и рейтингом посещаемости.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-xl bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-all">
                <Icon name="Send" size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-all">
                <Icon name="Globe" size={15} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Каталог</h4>
            <ul className="space-y-2.5">
              {["Все сайты", "Технологии", "Бизнес", "Медиа", "Образование", "Развлечения"].map((item) => (
                <li key={item}>
                  <Link to="/catalog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Сервис</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Новости", href: "/news" },
                { label: "Добавить сайт", href: "/profile" },
                { label: "Рекламодателям", href: "/contacts" },
                { label: "Контакты", href: "/contacts" },
                { label: "Правила", href: "/contacts" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Аккаунт</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Войти", href: "/login" },
                { label: "Регистрация", href: "/register" },
                { label: "Мой профиль", href: "/profile" },
                { label: "Статистика", href: "/stats" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 ТОПСайт. Все права защищены.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="Shield" size={12} />
            <span>Безопасный каталог сайтов</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
