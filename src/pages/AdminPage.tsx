import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { getPendingSites, approveSite, rejectSite, SiteFromApi } from "@/hooks/useSitesApi";

type Status = "pending" | "approved" | "rejected";

const statusLabels: Record<Status, { label: string; color: string }> = {
  pending: { label: "На проверке", color: "bg-amber-50 text-amber-600 border-amber-100" },
  approved: { label: "Одобрен", color: "bg-green-50 text-green-600 border-green-100" },
  rejected: { label: "Отклонён", color: "bg-red-50 text-red-500 border-red-100" },
};

export default function AdminPage() {
  const [sites, setSites] = useState<SiteFromApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"moderation" | "stats">("moderation");
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    getPendingSites().then((data) => {
      setSites(data);
      setLoading(false);
    });
  }, []);

  const handleApprove = async (id: number) => {
    setProcessingId(id);
    await approveSite(id);
    setSites((prev) => prev.filter((s) => s.id !== id));
    setProcessingId(null);
  };

  const handleReject = async (id: number) => {
    setProcessingId(id);
    await rejectSite(id);
    setSites((prev) => prev.filter((s) => s.id !== id));
    setProcessingId(null);
  };

  return (
    <div className="py-10">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Панель администратора</span>
          </div>
          <h1 className="font-display font-black text-4xl text-foreground">Управление каталогом</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: "moderation", label: "Модерация", icon: "ClipboardCheck" },
            { id: "stats", label: "Статистика", icon: "BarChart2" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "moderation" | "stats")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id ? "bg-primary text-white shadow-blue" : "bg-white border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={tab.icon} size={15} />
              {tab.label}
              {tab.id === "moderation" && sites.length > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === "moderation" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-600"}`}>
                  {sites.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === "moderation" && (
          <div>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-border p-5 animate-pulse">
                    <div className="flex gap-4">
                      <div className="w-32 h-20 bg-muted rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-1/3" />
                        <div className="h-3 bg-muted rounded w-full" />
                        <div className="h-3 bg-muted rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sites.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle2" size={28} className="text-green-500" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">Все сайты проверены</h3>
                <p className="text-muted-foreground text-sm">Новых заявок на модерацию нет</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sites.map((site) => (
                  <div key={site.id} className="bg-white rounded-2xl border border-border shadow-card p-5 flex flex-col sm:flex-row gap-4 items-start animate-fade-in">
                    <div className="w-full sm:w-40 shrink-0 aspect-video rounded-xl overflow-hidden bg-muted">
                      {site.screenshot_url && (
                        <img src={site.screenshot_url} alt={site.name} className="w-full h-full object-cover" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="font-bold text-base text-foreground">{site.name}</h3>
                        <span className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full border ${statusLabels[site.status as Status]?.color}`}>
                          {statusLabels[site.status as Status]?.label}
                        </span>
                      </div>
                      <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mb-2">
                        <Icon name="ExternalLink" size={12} />
                        {site.url}
                      </a>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{site.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Mail" size={11} />
                          {site.owner_email || "—"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={11} />
                          {new Date(site.created_at).toLocaleDateString("ru")}
                        </span>
                        {site.category_name && (
                          <span className="px-2 py-0.5 bg-secondary text-primary rounded-full font-medium">{site.category_name}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleApprove(site.id)}
                        disabled={processingId === site.id}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-xl hover:bg-green-600 transition-all disabled:opacity-50"
                      >
                        <Icon name="Check" size={14} />
                        Одобрить
                      </button>
                      <button
                        onClick={() => handleReject(site.id)}
                        disabled={processingId === site.id}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border border-red-200 text-red-500 text-sm font-semibold rounded-xl hover:bg-red-50 transition-all disabled:opacity-50"
                      >
                        <Icon name="X" size={14} />
                        Отклонить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "stats" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Сайтов в каталоге", icon: "Globe", value: "6", color: "gradient-blue" },
              { label: "На модерации", icon: "Clock", value: String(sites.length), color: "bg-amber-500" },
              { label: "Категорий", icon: "LayoutGrid", value: "8", color: "bg-violet-500" },
              { label: "Одобрено", icon: "CheckCircle2", value: "6", color: "bg-emerald-500" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-border shadow-card p-5">
                <div className={`w-11 h-11 rounded-xl ${s.color} flex items-center justify-center mb-4`}>
                  <Icon name={s.icon} size={20} className="text-white" />
                </div>
                <div className="font-display font-black text-2xl text-foreground mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
