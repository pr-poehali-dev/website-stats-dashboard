"""
API для каталога сайтов: список, добавление, статистика, модерация.
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

SCHEMA = "t_p60960229_website_stats_dashbo"

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def ok(data, status=200):
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(data, default=str)}


def err(msg, status=400):
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps({"error": msg})}


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    qs = event.get("queryStringParameters") or {}
    path = event.get("path", "/")

    # POST /sites — добавить сайт
    if method == "POST" and "/submit" in path:
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        url = body.get("url", "").strip()
        description = body.get("description", "").strip()
        screenshot_url = body.get("screenshot_url", "")
        category_id = body.get("category_id")
        owner_email = body.get("owner_email", "").strip()

        if not name or not url:
            return err("Название и URL обязательны")

        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(
            f"INSERT INTO {SCHEMA}.sites (name, url, description, screenshot_url, category_id, owner_email) VALUES (%s,%s,%s,%s,%s,%s) RETURNING id, name, status",
            (name, url, description, screenshot_url, category_id, owner_email)
        )
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return ok({"success": True, "site": dict(row)}, 201)

    # PUT /sites/approve?id=X — одобрить сайт
    if method == "PUT" and "/approve" in path:
        site_id = qs.get("id")
        if not site_id:
            return err("id обязателен")
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"UPDATE {SCHEMA}.sites SET status='approved', updated_at=NOW() WHERE id=%s RETURNING id, name, status", (site_id,))
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return ok(dict(row) if row else {"error": "not found"})

    # PUT /sites/reject?id=X — отклонить
    if method == "PUT" and "/reject" in path:
        site_id = qs.get("id")
        if not site_id:
            return err("id обязателен")
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"UPDATE {SCHEMA}.sites SET status='rejected', updated_at=NOW() WHERE id=%s RETURNING id, name, status", (site_id,))
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return ok(dict(row) if row else {"error": "not found"})

    # GET /sites/stats?id=X — статистика сайта за 30 дней
    if method == "GET" and "/stats" in path:
        site_id = qs.get("id")
        if not site_id:
            return err("id обязателен")
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(
            f"SELECT stat_date, visits, views FROM {SCHEMA}.site_stats WHERE site_id=%s ORDER BY stat_date DESC LIMIT 30",
            (site_id,)
        )
        rows = [dict(r) for r in cur.fetchall()]
        cur.execute(f"SELECT * FROM {SCHEMA}.sites WHERE id=%s", (site_id,))
        site = cur.fetchone()
        cur.close()
        conn.close()
        return ok({"site": dict(site) if site else None, "stats": rows})

    # GET /sites/categories — список категорий
    if method == "GET" and "/categories" in path:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT id, name, slug FROM {SCHEMA}.categories ORDER BY name")
        rows = [dict(r) for r in cur.fetchall()]
        cur.close()
        conn.close()
        return ok(rows)

    # GET /sites/pending — сайты на модерации
    if method == "GET" and "/pending" in path:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(
            f"SELECT s.*, c.name as category_name FROM {SCHEMA}.sites s LEFT JOIN {SCHEMA}.categories c ON s.category_id=c.id WHERE s.status='pending' ORDER BY s.created_at DESC"
        )
        rows = [dict(r) for r in cur.fetchall()]
        cur.close()
        conn.close()
        return ok(rows)

    # GET / — каталог сайтов
    category = qs.get("category", "")
    sort = qs.get("sort", "visits")
    search = qs.get("search", "")
    limit = int(qs.get("limit", 50))

    order = "s.total_visits DESC"
    if sort == "views":
        order = "s.total_views DESC"
    elif sort == "rating":
        order = "s.rating DESC"
    elif sort == "new":
        order = "s.created_at DESC"

    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    if category and search:
        cur.execute(
            f"SELECT s.*, c.name as category_name FROM {SCHEMA}.sites s LEFT JOIN {SCHEMA}.categories c ON s.category_id=c.id WHERE s.status='approved' AND c.slug=%s AND (s.name ILIKE %s OR s.description ILIKE %s) ORDER BY {order} LIMIT %s",
            (category, f"%{search}%", f"%{search}%", limit)
        )
    elif category:
        cur.execute(
            f"SELECT s.*, c.name as category_name FROM {SCHEMA}.sites s LEFT JOIN {SCHEMA}.categories c ON s.category_id=c.id WHERE s.status='approved' AND c.slug=%s ORDER BY {order} LIMIT %s",
            (category, limit)
        )
    elif search:
        cur.execute(
            f"SELECT s.*, c.name as category_name FROM {SCHEMA}.sites s LEFT JOIN {SCHEMA}.categories c ON s.category_id=c.id WHERE s.status='approved' AND (s.name ILIKE %s OR s.description ILIKE %s) ORDER BY {order} LIMIT %s",
            (f"%{search}%", f"%{search}%", limit)
        )
    else:
        cur.execute(
            f"SELECT s.*, c.name as category_name FROM {SCHEMA}.sites s LEFT JOIN {SCHEMA}.categories c ON s.category_id=c.id WHERE s.status='approved' ORDER BY {order} LIMIT %s",
            (limit,)
        )

    rows = [dict(r) for r in cur.fetchall()]
    # add rank
    for i, r in enumerate(rows):
        r["rank"] = i + 1
    cur.close()
    conn.close()
    return ok(rows)
