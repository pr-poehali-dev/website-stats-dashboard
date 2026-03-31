import { useState } from "react";
import Icon from "@/components/ui/icon";
import SiteCard from "@/components/SiteCard";
import { mockSites, categories } from "@/data/sites";

const sortOptions = [
  { value: "rank", label: "По рейтингу" },
  { value: "visits", label: "По переходам" },
  { value: "views", label: "По просмотрам" },
  { value: "rating", label: "По оценке" },
];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("rank");

  const filtered = mockSites
    .filter((s) => activeCategory === "Все" || s.category === activeCategory)
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "visits") return b.visits - a.visits;
      if (sort === "views") return b.views - a.views;
      if (sort === "rating") return b.rating - a.rating;
      return a.rank - b.rank;
    });

  return (
    <div className="py-10">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Каталог</span>
          </div>
          <h1 className="font-display font-black text-4xl text-foreground mb-2">Все сайты</h1>
          <p className="text-muted-foreground">Найдено {filtered.length} сайтов</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-border shadow-card p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по названию или описанию..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-blue"
                    : "bg-muted text-muted-foreground hover:bg-secondary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((site, i) => (
              <div key={site.id} className={`stagger-${Math.min(i + 1, 6)}`}>
                <SiteCard site={site} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Icon name="SearchX" size={28} className="text-muted-foreground" />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground text-sm">Попробуйте изменить запрос или категорию</p>
          </div>
        )}
      </div>
    </div>
  );
}
