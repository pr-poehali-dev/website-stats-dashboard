import { useState } from "react";
import Icon from "@/components/ui/icon";
import SiteCard from "@/components/SiteCard";
import { useSites, useCategories } from "@/hooks/useSitesApi";

const sortOptions = [
  { value: "visits", label: "По переходам" },
  { value: "views", label: "По просмотрам" },
  { value: "rating", label: "По оценке" },
  { value: "new", label: "Новые" },
];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState("visits");

  const apiCategories = useCategories();
  const { sites, loading } = useSites({ category: activeCategory, sort, search });

  const handleSearch = () => setSearch(searchInput);

  return (
    <div className="py-10">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Каталог</span>
          </div>
          <h1 className="font-display font-black text-4xl text-foreground mb-2">Все сайты</h1>
          <p className="text-muted-foreground">
            {loading ? "Загрузка..." : `Найдено ${sites.length} сайтов`}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-card p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Поиск по названию или описанию..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition-all"
            >
              Найти
            </button>
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
            <button
              onClick={() => setActiveCategory("")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === "" ? "bg-primary text-white shadow-blue" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-primary"
              }`}
            >
              Все
            </button>
            {apiCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.slug ? "bg-primary text-white shadow-blue" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-primary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border shadow-card overflow-hidden animate-pulse">
                <div className="aspect-video bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : sites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site, i) => (
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
