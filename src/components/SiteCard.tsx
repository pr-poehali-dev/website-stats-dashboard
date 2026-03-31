import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export interface Site {
  id: number;
  rank: number;
  name: string;
  url: string;
  description: string;
  screenshot: string;
  category: string;
  visits: number;
  views: number;
  rating: number;
  verified: boolean;
}

interface SiteCardProps {
  site: Site;
}

function formatNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return String(n);
}

const rankColors = [
  "bg-yellow-100 text-yellow-700 border-yellow-200",
  "bg-slate-100 text-slate-600 border-slate-200",
  "bg-orange-100 text-orange-600 border-orange-200",
];

export default function SiteCard({ site }: SiteCardProps) {
  const rankClass = site.rank <= 3
    ? rankColors[site.rank - 1]
    : "bg-muted text-muted-foreground border-border";

  return (
    <div className="bg-white rounded-2xl border border-border shadow-card card-hover overflow-hidden group animate-fade-in">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={site.screenshot}
          alt={site.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`rank-badge text-xs font-bold border ${rankClass}`}>
            #{site.rank}
          </span>
        </div>
        {site.verified && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
              <Icon name="BadgeCheck" size={11} />
              Верифицирован
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-bold text-base text-foreground leading-tight group-hover:text-primary transition-colors">
              {site.name}
            </h3>
            <span className="tag-badge mt-1 inline-block">{site.category}</span>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <Icon name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-foreground">{site.rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {site.description}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
              <Icon name="MousePointerClick" size={11} className="text-primary" />
            </div>
            <span className="font-semibold text-foreground">{formatNum(site.visits)}</span>
            <span>переходов</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
              <Icon name="Eye" size={11} className="text-primary" />
            </div>
            <span className="font-semibold text-foreground">{formatNum(site.views)}</span>
            <span>просмотров</span>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-blue hover:shadow-card-hover"
          >
            <Icon name="ExternalLink" size={14} />
            Перейти
          </a>
          <Link
            to={`/stats/${site.id}`}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-secondary text-primary text-sm font-semibold rounded-xl hover:bg-blue-100 transition-all"
          >
            <Icon name="BarChart2" size={14} />
            Статистика
          </Link>
        </div>
      </div>
    </div>
  );
}
