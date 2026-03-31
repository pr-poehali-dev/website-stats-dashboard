import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteCard from "@/components/SiteCard";
import { mockNews } from "@/data/sites";
import { useSites } from "@/hooks/useSitesApi";

const stats = [
  { label: "Сайтов в каталоге", value: "12 400+", icon: "Globe" },
  { label: "Переходов в месяц", value: "8.4M", icon: "MousePointerClick" },
  { label: "Зарегистрированных", value: "34 200", icon: "Users" },
  { label: "Категорий", value: "48", icon: "LayoutGrid" },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const { sites, loading } = useSites({ sort: "visits" });

  return (
    <div>
      {/* HERO */}
      <section className="gradient-hero py-20 md:py-28 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(37,99,235,0.08)_0%,transparent_60%)]" />
        <div className="container max-w-7xl mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-card mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow" />
              <span className="text-sm font-medium text-muted-foreground">
                Обновляется в реальном времени
              </span>
            </div>
            <h1 className="font-display font-black text-5xl md:text-6xl text-foreground leading-tight mb-6 animate-slide-up">
              Каталог лучших<br />
              <span className="text-primary">сайтов рунета</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 animate-slide-up stagger-1">
              Реальная статистика переходов, объективный рейтинг и счётчик посещаемости
              для вашего сайта. Добавьте свой ресурс и начните расти.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up stagger-2">
              <Link
                to="/catalog"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-blue hover:shadow-card-hover hover:bg-blue-700 transition-all duration-300 text-base"
              >
                <Icon name="LayoutGrid" size={18} />
                Смотреть каталог
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 text-base"
              >
                <Icon name="Plus" size={18} />
                Добавить сайт
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-white border-y border-border">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={s.label} className={`flex flex-col items-center text-center animate-fade-in stagger-${i + 1}`}>
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-3">
                  <Icon name={s.icon} size={22} className="text-primary" />
                </div>
                <div className="font-display font-black text-2xl text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP SITES */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">Рейтинг</span>
              </div>
              <h2 className="font-display font-black text-3xl text-foreground">Топ сайтов сегодня</h2>
            </div>
            <Link to="/catalog" className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-blue-700 transition-colors">
              Все сайты
              <Icon name="ArrowRight" size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border shadow-card overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sites.slice(0, 6).map((site, i) => (
                <div key={site.id} className={`stagger-${i + 1}`}>
                  <SiteCard site={site} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white border-y border-border">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Как работает</span>
              <div className="w-1 h-6 bg-primary rounded-full" />
            </div>
            <h2 className="font-display font-black text-3xl text-foreground">Добавьте сайт за 3 шага</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "UserPlus",
                title: "Регистрация",
                desc: "Создайте аккаунт и заполните профиль владельца сайта. Это займёт меньше минуты.",
              },
              {
                step: "02",
                icon: "Upload",
                title: "Добавьте сайт",
                desc: "Загрузите скриншот, укажите название, описание и URL. Сайт пройдёт модерацию за 24 часа.",
              },
              {
                step: "03",
                icon: "Code2",
                title: "Установите счётчик",
                desc: "Получите уникальный код счётчика и вставьте на свой сайт для сбора статистики.",
              },
            ].map((item, i) => (
              <div key={item.step} className={`relative animate-fade-in stagger-${i + 1}`}>
                <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-b from-blue-50/80 to-white border border-border">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 gradient-blue rounded-2xl flex items-center justify-center shadow-blue">
                      <Icon name={item.icon} size={26} className="text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 font-display font-black text-xs bg-white border border-border rounded-full w-7 h-7 flex items-center justify-center text-muted-foreground">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <Icon name="ChevronRight" size={20} className="text-primary opacity-40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">Новости</span>
              </div>
              <h2 className="font-display font-black text-3xl text-foreground">Последние обновления</h2>
            </div>
            <Link to="/news" className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-blue-700 transition-colors">
              Все новости
              <Icon name="ArrowRight" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockNews.map((news, i) => (
              <Link
                key={news.id}
                to={`/news/${news.id}`}
                className={`bg-white rounded-2xl border border-border shadow-card card-hover overflow-hidden group animate-fade-in stagger-${i + 1}`}
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="tag-badge">{news.category}</span>
                    <span className="text-xs text-muted-foreground">{news.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{news.excerpt}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={12} />
                    {news.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <div className="p-10 rounded-3xl gradient-hero border border-blue-100">
            <h2 className="font-display font-black text-3xl md:text-4xl text-foreground mb-4">
              Готовы добавить свой сайт?
            </h2>
            <p className="text-muted-foreground mb-8">
              Тысячи пользователей уже отслеживают статистику на ТОПСайт. Присоединяйтесь бесплатно.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <Link
                to="/register"
                className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-blue hover:bg-blue-700 transition-all text-sm whitespace-nowrap"
              >
                Начать бесплатно
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}