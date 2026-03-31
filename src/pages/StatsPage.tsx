import { useParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { mockSites } from "@/data/sites";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell, Legend,
} from "recharts";

const visitData = [
  { day: "Пн", visits: 12400, views: 38000 },
  { day: "Вт", visits: 15200, views: 44000 },
  { day: "Ср", visits: 18900, views: 52000 },
  { day: "Чт", visits: 14300, views: 41000 },
  { day: "Пт", visits: 22100, views: 67000 },
  { day: "Сб", visits: 19800, views: 58000 },
  { day: "Вс", visits: 16500, views: 49000 },
];

const monthData = [
  { month: "Янв", visits: 320000 },
  { month: "Фев", visits: 410000 },
  { month: "Мар", visits: 390000 },
  { month: "Апр", visits: 480000 },
  { month: "Май", visits: 520000 },
  { month: "Июн", visits: 610000 },
];

const sourceData = [
  { name: "Поиск", value: 42, color: "#2563EB" },
  { name: "Прямые", value: 28, color: "#3B82F6" },
  { name: "Соцсети", value: 18, color: "#60A5FA" },
  { name: "Ссылки", value: 12, color: "#93C5FD" },
];

function StatCard({ label, value, change, icon, color }: { label: string; value: string; change: string; icon: string; color: string }) {
  const isPositive = change.startsWith("+");
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center`}>
          <Icon name={icon} size={20} className="text-white" />
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
          {change}
        </span>
      </div>
      <div className="font-display font-black text-2xl text-foreground mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export default function StatsPage() {
  const { id } = useParams();
  const site = mockSites.find((s) => s.id === Number(id)) || mockSites[0];

  return (
    <div className="py-10">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Статистика</span>
            </div>
            <h1 className="font-display font-black text-3xl text-foreground">{site.name}</h1>
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mt-1">
              <Icon name="ExternalLink" size={13} />
              {site.url}
            </a>
          </div>
          <div className="flex gap-2">
            {["7 дней", "30 дней", "3 месяца", "Год"].map((p) => (
              <button key={p} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${p === "7 дней" ? "bg-primary text-white shadow-blue" : "bg-white border border-border text-muted-foreground hover:text-foreground"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Переходов" value="119.2K" change="+12.4%" icon="MousePointerClick" color="gradient-blue" />
          <StatCard label="Просмотров" value="349.0K" change="+8.7%" icon="Eye" color="bg-violet-500" />
          <StatCard label="Уникальных" value="84.3K" change="+15.2%" icon="Users" color="bg-emerald-500" />
          <StatCard label="Место в топе" value={`#${site.rank}`} change="+2" icon="TrendingUp" color="bg-amber-500" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Area Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-card p-6">
            <h3 className="font-bold text-base text-foreground mb-6">Трафик за неделю</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={visitData}>
                <defs>
                  <linearGradient id="visitsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(v: number, n: string) => [`${v.toLocaleString()}`, n === "visits" ? "Переходов" : "Просмотров"]} contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} />
                <Area type="monotone" dataKey="views" stroke="#60A5FA" strokeWidth={2} fill="url(#viewsGrad)" />
                <Area type="monotone" dataKey="visits" stroke="#2563EB" strokeWidth={2.5} fill="url(#visitsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-6">
            <h3 className="font-bold text-base text-foreground mb-6">Источники трафика</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, "Доля"]} contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {sourceData.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-2xl border border-border shadow-card p-6 mb-6">
          <h3 className="font-bold text-base text-foreground mb-6">Переходы по месяцам</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthData} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => [v.toLocaleString(), "Переходов"]} contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} cursor={{ fill: "rgba(37,99,235,0.04)" }} />
              <Bar dataKey="visits" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Counter code */}
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-100 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center shrink-0 shadow-blue">
              <Icon name="Code2" size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-foreground mb-1">Код счётчика</h3>
              <p className="text-sm text-muted-foreground mb-3">Вставьте этот код на все страницы вашего сайта перед закрывающим тегом &lt;/body&gt;</p>
              <div className="bg-foreground rounded-xl p-4 font-mono text-xs text-green-400 relative overflow-x-auto">
                <pre>{`<!-- ТОПСайт счётчик —— ID: ${site.id} -->
<script src="https://topsait.ru/counter.js?id=${site.id}"></script>`}</pre>
                <button className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Icon name="Copy" size={13} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
