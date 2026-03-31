"""
Seed: наполнение базы демо-данными (вызывается один раз).
"""
import json
import os
import psycopg2

SCHEMA = "t_p60960229_website_stats_dashbo"

CORS = {"Access-Control-Allow-Origin": "*"}

SITES = [
    ("TechHub Россия", "https://example.com", "Крупнейший портал о технологиях, гаджетах и инновациях.", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=338&fit=crop", 1, True, 4.9, 1240000, 4800000),
    ("Бизнес Инсайдер RU", "https://example.com", "Аналитика бизнеса, инвестиции, стартапы и предпринимательство.", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=338&fit=crop", 2, True, 4.8, 980000, 3200000),
    ("КиноЗал", "https://example.com", "Онлайн-кинотеатр с тысячами фильмов и сериалов в HD качестве.", "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=338&fit=crop", 3, True, 4.7, 870000, 5100000),
    ("ОбразоЦентр", "https://example.com", "Онлайн-образование: курсы, вебинары, сертификаты от ведущих вузов.", "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=338&fit=crop", 4, False, 4.6, 650000, 2100000),
    ("ЗдравМедиа", "https://example.com", "Медицинский портал: симптомы, лечение, здоровый образ жизни.", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=338&fit=crop", 5, True, 4.5, 540000, 1800000),
    ("ДизайнПортал", "https://example.com", "Лучшие работы дизайнеров, вдохновение и шаблоны.", "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=338&fit=crop", 6, False, 4.4, 420000, 1500000),
]


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    inserted_sites = 0
    for name, url, desc, screenshot, cat_id, verified, rating, visits, views in SITES:
        cur.execute(
            f"SELECT id FROM {SCHEMA}.sites WHERE name=%s", (name,)
        )
        if cur.fetchone():
            continue
        cur.execute(
            f"INSERT INTO {SCHEMA}.sites (name, url, description, screenshot_url, category_id, status, verified, rating, total_visits, total_views) VALUES (%s,%s,%s,%s,%s,'approved',%s,%s,%s,%s) RETURNING id",
            (name, url, desc, screenshot, cat_id, verified, rating, visits, views)
        )
        site_id = cur.fetchone()[0]
        inserted_sites += 1

        for day in range(30):
            v = int(visits / 365 + (day * 50))
            vw = int(views / 365 + (day * 150))
            cur.execute(
                f"INSERT INTO {SCHEMA}.site_stats (site_id, stat_date, visits, views) VALUES (%s, CURRENT_DATE - %s, %s, %s) ON CONFLICT DO NOTHING",
                (site_id, day, v, vw)
            )

    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"ok": True, "inserted_sites": inserted_sites})
    }
