import { useState } from "react";
import Icon from "@/components/ui/icon";
import { mockSites } from "@/data/sites";

type Status = "pending" | "approved" | "rejected";

interface AdminSite {
  id: number;
  name: string;
  url: string;
  description: string;
  screenshot: string;
  category: string;
  submittedBy: string;
  submittedAt: string;
  status: Status;
}

const initialSites: AdminSite[] = [
  ...mockSites.map((s) => ({
    id: s.id,
    name: s.name,
    url: s.url,
    description: s.description,
    screenshot: s.screenshot,
    category: s.category,
    submittedBy: "user@example.com",
    submittedAt: "2024-03-25",
    status: "approved" as Status,
  })),
  {
    id: 10,
    name: "НовыйСтартап.ру",
    url: "https://newstartup.ru",
    description: "Платформа для стартапов и инвесторов в России.",
    screenshot: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=338&fit=crop",
    category: "Бизнес",
    submittedBy: "startup@mail.ru",
    submittedAt: "2024-03-29",
    status: "pending" as Status,
  },
  {
    id: 11,
    name: "МузыкаОнлайн",
    url: "https://musiconline.ru",
    description: "Стриминг музыки с российскими исполнителями.",
    screenshot: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=338&fit=crop",
    category: "Развлечения",
    submittedBy: "music@yandex.ru",
    submittedAt: "2024-03-30",
    status: "pending" as Status,
  },
];

const statusLabels: Record<Status, { label: string; color: string }> = {
  pending: { label: "На проверке", color: "bg-amber-50 text-amber-600 border-amber-100" },
  approved: { label: "Одобрен", color: "bg-green-50 text-green-600 border-green-100" },
  rejected: { label: "Отклонён", color: "bg-red-50 text-red-500 border-red-100" },
};

const adminStats = [
  { label: "Всего сайтов", value: "12 400", icon: "Globe", color: "gradient-blue" },
  { label: "На модерации", value: "24", icon: "Clock", color: "bg-amber-500" },
  { label: "Пользователей", value: "34 200", icon: "Users", color: "bg-violet-500" },
  { label: "Переходов сегодня", value: "284K", icon: "TrendingUp", color: "bg-emerald-500" },
];

export default function AdminPage() {
  const [sites, setSites] = useState<AdminSite[]>(initialSites);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [activeTab, setActiveTab] = useState<"moderation" | "users" | "stats">("moderation");

  const filtered = sites.filter((s) => filter === "all" || s.status === filter);
  const pendingCount = sites.filter((s) => s.status === "pending").length;

  const approve = (id: number) => setSites((prev) => prev.map((s) => s.id === id ? { ...s, status: "approved" } : s));
  const reject = (id: number) => setSites((prev) => prev.map((s) => s.id === id ? { ...s, status: "rejected" } : s));

  return (
    <div className="py-10">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Система</span>
            </div>
            <h1 className="font-display font-black text-3xl text-foreground">Панель администратора</h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-100">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse-slow" />
            <span className="text-sm font-medium text-amber-700">{pendingCount} на модерации</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {adminStats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-border shadow-card p-5">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <Icon name={s.icon} size={18} className="text-white" />
              </div>
              <div className="font-display font-black text-2xl text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "moderation", label: "Модерация", icon: "Shield" },
            { key: "users", label: "Пользователи", icon: "Users" },
            { key: "stats", label: "Аналитика", icon: "BarChart2" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as "moderation" | "users" | "stats")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === t.key
                  ? "bg-primary text-white shadow-blue"
                  : "bg-white border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
              {t.key === "moderation" && pendingCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === "moderation" && (
          <>
            {/* Filter */}
            <div className="flex gap-2 mb-5">
              {(["all", "pending", "approved", "rejected"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filter === f
                      ? "bg-foreground text-white"
                      : "bg-white border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f === "all" ? "Все" : statusLabels[f].label}
                  <span className="ml-1.5 text-xs opacity-60">({f === "all" ? sites.length : sites.filter((s) => s.status === f).length})</span>
                </button>
              ))}
            </div>

            {/* Sites list */}
            <div className="space-y-4">
              {filtered.map((site) => (
                <div key={site.id} className="bg-white rounded-2xl border border-border shadow-card p-5 flex gap-4 animate-fade-in">
                  <img
                    src={site.screenshot}
                    alt={site.name}
                    className="w-32 h-18 object-cover rounded-xl shrink-0 w-32 h-[72px]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-base text-foreground">{site.name}</h3>
                        <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                          <Icon name="Link" size={11} />
                          {site.url}
                        </a>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${statusLabels[site.status].color}`}>
                        {statusLabels[site.status].label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-1">{site.description}</p>
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <span className="tag-badge">{site.category}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="User" size={11} />
                        {site.submittedBy}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="Calendar" size={11} />
                        {site.submittedAt}
                      </span>
                      {site.status === "pending" && (
                        <div className="flex gap-2 ml-auto">
                          <button
                            onClick={() => approve(site.id)}
                            className="flex items-center gap-1.5 px-4 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-xl hover:bg-green-600 transition-colors"
                          >
                            <Icon name="CheckCircle" size={13} />
                            Одобрить
                          </button>
                          <button
                            onClick={() => reject(site.id)}
                            className="flex items-center gap-1.5 px-4 py-1.5 bg-red-50 text-red-500 border border-red-100 text-xs font-semibold rounded-xl hover:bg-red-100 transition-colors"
                          >
                            <Icon name="XCircle" size={13} />
                            Отклонить
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-5 py-3.5 font-semibold text-foreground text-xs">Пользователь</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-foreground text-xs">Email</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-foreground text-xs">Сайтов</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-foreground text-xs">Дата регистрации</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-foreground text-xs">Статус</th>
                </tr>
              </thead>
              <tbody>
                {["Александр И.", "Мария С.", "Дмитрий К.", "Анна Р.", "Сергей Л."].map((name, i) => (
                  <tr key={name} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full gradient-blue flex items-center justify-center">
                          <Icon name="User" size={13} className="text-white" />
                        </div>
                        <span className="font-medium text-foreground">{name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">user{i + 1}@mail.ru</td>
                    <td className="px-5 py-4 font-semibold text-foreground">{i + 1}</td>
                    <td className="px-5 py-4 text-muted-foreground">2024-0{i + 1}-15</td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
                        Активен
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Переходов сегодня", value: "284 120", trend: "+18%", icon: "MousePointerClick" },
              { label: "Новых регистраций", value: "143", trend: "+7%", icon: "UserPlus" },
              { label: "Добавлено сайтов", value: "12", trend: "+2", icon: "Globe" },
              { label: "Одобрено заявок", value: "8", trend: "66%", icon: "CheckCircle" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl border border-border shadow-card p-6 flex items-center gap-5">
                <div className="w-14 h-14 gradient-blue rounded-2xl flex items-center justify-center shadow-blue shrink-0">
                  <Icon name={item.icon} size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-black text-3xl text-foreground">{item.value}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{item.label}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Icon name="TrendingUp" size={13} className="text-green-500" />
                    <span className="text-xs font-semibold text-green-500">{item.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
