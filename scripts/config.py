#!/usr/bin/env python3
"""Configuration for TopRank — self-contained for GitHub Actions."""

from pathlib import Path

BASE = Path(__file__).resolve().parent.parent  # toprank/ repo root
SCRIPTS = BASE / "scripts"

# --- Site Config ---

SITES = {
    "toprank": {
        "name": "TopRank",
        "domain": "www.zicisi.fun",
        "folder": ".",  # repo root
        "logo_html": "Top<span>Rank</span>",
        "avatar_bg": "linear-gradient(135deg,#2563eb,#60a5fa)",
        "avatar_text": "TR",
        "primary_color": "#2563eb",
        "accent_color": "#60a5fa",
        "tagline": "Top 10 rankings, versus comparisons, expert roundups, and honest reviews.",
        "about_desc": "definitive, trustworthy, and useful",
        "about_mission": "a place where you get the best recommendations, backed by research and real data",
        "categories": {
            "top-10": {"name": "Top 10", "emoji": "🏅", "file": "category-top-10.html"},
            "vs-battle": {"name": "VS Battle", "emoji": "⚔️", "file": "category-vs-battle.html"},
            "tech": {"name": "Tech", "emoji": "📱", "file": "category-tech.html"},
            "movies": {"name": "Movies", "emoji": "🎬", "file": "category-movies.html"},
            "travel": {"name": "Travel", "emoji": "✈️", "file": "category-travel.html"},
            "food": {"name": "Food", "emoji": "🍽️", "file": "category-food.html"},
            "health": {"name": "Health", "emoji": "💪", "file": "category-health.html"},
            "general": {"name": "General", "emoji": "📰", "file": "index.html"},
        },
        "category_order": ["top-10", "vs-battle", "tech", "movies", "travel"],
        "hot_title": "🏆 Top Ranked",
    },
}

# --- Network cross-links ---

NETWORK_SITES = {
    "toprank": {"name": "TopRank", "url": "https://top.zicisi.fun", "color": "#2563eb", "emoji": "🔵"},
}

# --- Badges ---

BADGES = [
    ("hot", "Hot"), ("trending", "Trending"), ("hot", "Viral"),
    ("", "New"), ("trending", "Hot"), ("", "Fresh"),
    ("trending", "Viral"), ("hot", "Hot"), ("", "New"),
]


def get_site_dir(site_key):
    """Return the absolute path to a site's directory."""
    folder = SITES[site_key]["folder"]
    if folder == ".":
        return BASE
    return BASE / folder


def get_site_config(site_key):
    """Return full config dict for a site."""
    return SITES[site_key]
