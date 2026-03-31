import { useState, useEffect, useCallback } from "react";

const API_URL = "https://functions.poehali.dev/63735f45-e027-42a3-a8bc-4010e98e1158";

export interface SiteFromApi {
  id: number;
  rank: number;
  name: string;
  url: string;
  description: string;
  screenshot_url: string;
  category_name: string;
  total_visits: number;
  total_views: number;
  rating: number;
  verified: boolean;
  status: string;
  owner_email: string;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface StatPoint {
  stat_date: string;
  visits: number;
  views: number;
}

function toSiteCard(s: SiteFromApi) {
  return {
    id: s.id,
    rank: s.rank,
    name: s.name,
    url: s.url,
    description: s.description,
    screenshot: s.screenshot_url,
    category: s.category_name || "Другое",
    visits: s.total_visits,
    views: s.total_views,
    rating: Number(s.rating),
    verified: s.verified,
  };
}

export function useSites(params?: { category?: string; sort?: string; search?: string }) {
  const [sites, setSites] = useState<ReturnType<typeof toSiteCard>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSites = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (params?.category) qs.set("category", params.category);
      if (params?.sort) qs.set("sort", params.sort);
      if (params?.search) qs.set("search", params.search);
      const res = await fetch(`${API_URL}?${qs}`);
      const data = await res.json();
      setSites((data as SiteFromApi[]).map(toSiteCard));
    } catch {
      setError("Ошибка загрузки каталога");
    } finally {
      setLoading(false);
    }
  }, [params?.category, params?.sort, params?.search]);

  useEffect(() => { fetchSites(); }, [fetchSites]);

  return { sites, loading, error, refetch: fetchSites };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  return categories;
}

export function useSiteStats(id: string | undefined) {
  const [site, setSite] = useState<SiteFromApi | null>(null);
  const [stats, setStats] = useState<StatPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_URL}/stats?id=${id}`)
      .then((r) => r.json())
      .then((data) => {
        setSite(data.site);
        setStats((data.stats as StatPoint[]).reverse());
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { site, stats, loading };
}

export async function submitSite(payload: {
  name: string; url: string; description: string;
  screenshot_url: string; category_id: number | null; owner_email: string;
}) {
  const res = await fetch(`${API_URL}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function getPendingSites(): Promise<SiteFromApi[]> {
  const res = await fetch(`${API_URL}/pending`);
  return res.json();
}

export async function approveSite(id: number) {
  const res = await fetch(`${API_URL}/approve?id=${id}`, { method: "PUT" });
  return res.json();
}

export async function rejectSite(id: number) {
  const res = await fetch(`${API_URL}/reject?id=${id}`, { method: "PUT" });
  return res.json();
}
