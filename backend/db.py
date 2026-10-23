import json
import sqlite3
from datetime import date, datetime, timedelta
import os
from pathlib import Path

DB_PATH = Path("/tmp/learnai.db") if os.getenv("VERCEL") else Path(__file__).with_name("learnai.db")


def _conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with _conn() as c:
        c.execute("""CREATE TABLE IF NOT EXISTS sessions (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            subtitle TEXT,
            goal TEXT,
            lesson TEXT NOT NULL,
            understanding INTEGER,          -- filled by teach-back later
            created_at TEXT NOT NULL)""")


def save_lesson(lesson: dict, goal: str):
    with _conn() as c:
        c.execute(
            "INSERT INTO sessions (id, title, subtitle, goal, lesson, created_at) "
            "VALUES (?, ?, ?, ?, ?, ?)",
            (lesson["id"], lesson["title"], lesson.get("subtitle"), goal,
             json.dumps(lesson), datetime.now().isoformat(timespec="seconds")),
        )


def get_lesson(sid: str):
    with _conn() as c:
        row = c.execute("SELECT lesson FROM sessions WHERE id = ?", (sid,)).fetchone()
    return json.loads(row["lesson"]) if row else None


def _label(dt: datetime) -> str:
    d, today = dt.date(), date.today()
    if d == today:
        return "Today"
    if d == today - timedelta(days=1):
        return "Yesterday"
    return "Previous"


def _time(dt: datetime, label: str) -> str:
    return dt.strftime("%H:%M") if label != "Previous" else dt.strftime("%d %b")


def list_sessions():
    """Same shape as the old mock chatGroups: [{label, items:[{id,title,time}]}]"""
    with _conn() as c:
        rows = c.execute("SELECT id, title, created_at FROM sessions "
                         "ORDER BY created_at DESC").fetchall()
    groups = {}
    for r in rows:
        dt = datetime.fromisoformat(r["created_at"])
        label = _label(dt)
        groups.setdefault(label, []).append(
            {"id": r["id"], "title": r["title"], "time": _time(dt, label)})
    return [{"label": l, "items": groups[l]}
            for l in ("Today", "Yesterday", "Previous") if l in groups]


def list_history(limit: int = 20):
    with _conn() as c:
        rows = c.execute("SELECT id, title, understanding, created_at FROM sessions "
                         "ORDER BY created_at DESC LIMIT ?", (limit,)).fetchall()
    out = []
    for r in rows:
        dt = datetime.fromisoformat(r["created_at"])
        u = r["understanding"]
        review = ("Not assessed" if u is None
                  else "Needs review" if u < 70 else "Good")
        out.append({"id": r["id"], "topic": r["title"], "date": _label(dt),
                    "understanding": u or 0, "review": review})
    return out

def set_understanding(sid: str, score: int):
    with _conn() as c:
        c.execute("UPDATE sessions SET understanding = ? WHERE id = ?", (score, sid))