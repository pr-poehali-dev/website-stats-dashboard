import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { submitSite, useCategories } from "@/hooks/useSitesApi";

export default function ProfilePage() {
  const [tab, setTab] = useState<"sites" | "add">("sites");
  const [form, setForm] = useState({ name: "", url: "", description: "", category_id: 1, owner_email: "" });
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const apiCategories = useCategories();

  const tabs = [
    { key: "sites", label: "Мои сайты", icon: "Globe" },
    { key: "add", label: "Добавить сайт", icon: "Plus" },
  ];

  const handleSubmit = async () => {
    if (!form.name || !form.url) return;
    setSubmitting(true);
    await submitSite({
      name: form.name,
      url: form.url,
      description: form.description,
      screenshot_url: screenshot || "",
      category_id: form.category_id,
      owner_email: form.owner_email,
    });
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: "", url: "", description: "", category_id: 1, owner_email: "" });
    setScreenshot(null);
  };

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
                  0 сайтов
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
            <div className="text-center py-12 bg-white rounded-2xl border border-border shadow-card">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Icon name="Globe" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="font-bold text-base text-foreground mb-2">У вас пока нет сайтов</h3>
              <p className="text-sm text-muted-foreground mb-4">Добавьте первый сайт в каталог</p>
              <button onClick={() => setTab("add")} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl shadow-blue hover:bg-blue-700 transition-all">
                <Icon name="Plus" size={15} />
                Добавить сайт
              </button>
            </div>

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

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3">
                <Icon name="CheckCircle2" size={20} className="text-green-500 shrink-0" />
                <div>
                  <div className="font-semibold text-green-700 text-sm">Заявка отправлена!</div>
                  <div className="text-xs text-green-600">Сайт будет проверен модераторами в течение 24 часов.</div>
                </div>
                <button onClick={() => setSubmitted(false)} className="ml-auto text-green-400 hover:text-green-600">
                  <Icon name="X" size={14} />
                </button>
              </div>
            )}
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
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm cursor-pointer"
                >
                  {apiCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Ваш email *</label>
                <input
                  type="email"
                  value={form.owner_email}
                  onChange={(e) => setForm({ ...form, owner_email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
              <Icon name="AlertCircle" size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">
                После отправки ваш сайт будет проверен модераторами в течение 24 часов. Убедитесь, что сайт соответствует правилам каталога.
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                disabled={submitting || !form.name || !form.url}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-xl shadow-blue hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name={submitting ? "Loader2" : "Send"} size={16} className={submitting ? "animate-spin" : ""} />
                {submitting ? "Отправляем..." : "Отправить на модерацию"}
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