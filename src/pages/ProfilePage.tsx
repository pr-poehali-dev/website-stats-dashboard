import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { mockSites } from "@/data/sites";

const userSites = mockSites.slice(0, 2);

export default function ProfilePage() {
  const [tab, setTab] = useState<"sites" | "add">("sites");
  const [form, setForm] = useState({ name: "", url: "", description: "", category: "Технологии" });
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const tabs = [
    { key: "sites", label: "Мои сайты", icon: "Globe" },
    { key: "add", label: "Добавить сайт", icon: "Plus" },
  ];

  return (
    <div className="py-10">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Profile header */}
        <div className="bg-white rounded-2xl border border-border shadow-card p-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl gradient-blue flex items-center justify-center shadow-blue">
              <Icon name="User" size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h1 className="font-display font-black text-2xl text-foreground">Александр Иванов</h1>
              <p className="text-muted-foreground text-sm">alex@example.com · Участник с января 2024</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="stat-chip bg-blue-50 text-primary">
                  <Icon name="Globe" size={11} />
                  {userSites.length} сайта
                </span>
                <span className="stat-chip bg-green-50 text-green-600">
                  <Icon name="BadgeCheck" size={11} />
                  Верифицирован
                </span>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium border border-border rounded-xl hover:bg-muted transition-colors">
              Редактировать
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as "sites" | "add")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === t.key
                  ? "bg-primary text-white shadow-blue"
                  : "bg-white border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* My sites */}
        {tab === "sites" && (
          <div className="space-y-4">
            {userSites.map((site) => (
              <div key={site.id} className="bg-white rounded-2xl border border-border shadow-card p-5 flex gap-4 card-hover">
                <img
                  src={site.screenshot}
                  alt={site.name}
                  className="w-28 h-16 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base text-foreground">{site.name}</h3>
                      <a href={site.url} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                        <Icon name="Link" size={11} />
                        {site.url}
                      </a>
                    </div>
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-50 text-green-600 font-medium shrink-0">
                      <Icon name="CheckCircle" size={11} />
                      Одобрен
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-1">{site.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="MousePointerClick" size={11} className="text-primary" />
                      {(site.visits / 1000).toFixed(0)}K переходов
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="Eye" size={11} className="text-primary" />
                      {(site.views / 1000).toFixed(0)}K просмотров
                    </span>
                    <Link to={`/stats/${site.id}`} className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-blue-700 ml-auto">
                      <Icon name="BarChart2" size={12} />
                      Статистика
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Counter block */}
            <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center shadow-blue">
                  <Icon name="Code2" size={17} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">Код счётчика для TechHub</h3>
                  <p className="text-xs text-muted-foreground">Вставьте перед &lt;/body&gt;</p>
                </div>
              </div>
              <div className="bg-foreground rounded-xl p-4 font-mono text-xs text-green-400 relative">
                <pre>{`<script src="https://topsait.ru/counter.js?id=1"></script>`}</pre>
                <button className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Icon name="Copy" size={12} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add site form */}
        {tab === "add" && (
          <div className="bg-white rounded-2xl border border-border shadow-card p-6">
            <h2 className="font-bold text-lg text-foreground mb-6">Добавить новый сайт</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">Скриншот сайта *</label>
                <div className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${screenshot ? "border-primary bg-blue-50" : "border-border hover:border-primary hover:bg-blue-50/50"}`}>
                  {screenshot ? (
                    <div className="relative">
                      <img src={screenshot} alt="preview" className="max-h-40 mx-auto rounded-xl" />
                      <button onClick={() => setScreenshot(null)} className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center">
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                        <Icon name="ImagePlus" size={22} className="text-primary" />
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">Загрузите скриншот</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG до 5 МБ · рекомендуется 1200×675</p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Название сайта *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Например: TechHub Россия"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">URL сайта *</label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">Описание *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Краткое описание вашего сайта (до 300 символов)..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Категория *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm cursor-pointer"
                >
                  {["Технологии", "Бизнес", "Развлечения", "Образование", "Здоровье", "Дизайн", "Медиа", "Спорт"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
              <Icon name="AlertCircle" size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">
                После отправки ваш сайт будет проверен модераторами в течение 24 часов. Убедитесь, что сайт соответствует правилам каталога.
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-xl shadow-blue hover:bg-blue-700 transition-all">
                <Icon name="Send" size={16} />
                Отправить на модерацию
              </button>
              <button onClick={() => setTab("sites")} className="px-6 py-3 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
