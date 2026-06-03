#!/usr/bin/env python3
"""
generate_news.py — Claude API-powered hot news generator for TopRank.

Replaces the RSS+template pipeline with AI-generated content.
Run by GitHub Actions 3x daily (8AM/12PM/7PM Beijing time).

Pipeline:
  1. Call Claude API to generate 10 current hot news articles (structured JSON)
  2. Build full HTML pages for each article using existing article_builder
  3. Update index.html sections (hero, cards, ticker, sidebar, trending)
  4. Regenerate sitemap.xml
  5. Clean up old auto-generated articles (>90 days)

Usage:
  python scripts/generate_news.py
  python scripts/generate_news.py --dry-run
"""

import argparse
import json
import random
import re
import sys
import time
from datetime import datetime
from pathlib import Path

# Import from local scripts directory (self-contained for GitHub Actions)
SCRIPTS_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS_DIR))

try:
    from config import SITES, BASE, BADGES
    from article_builder import build_full_page, write_article
    from sitemap_updater import update_sitemap
    print("✅ All local modules imported successfully")
except ImportError as e:
    print(f"❌ Import error: {e}")
    print(f"   sys.path: {sys.path[:3]}")
    print(f"   SCRIPTS_DIR: {SCRIPTS_DIR}")
    print(f"   Files in SCRIPTS_DIR: {list(SCRIPTS_DIR.glob('*.py'))}")
    sys.exit(1)

SITE_KEY = "toprank"
SITE_CONFIG = SITES[SITE_KEY]
SITE_DIR = BASE / SITE_CONFIG["folder"]

# --- Image Search (Pexels API) ---

def fetch_real_images(articles):
    """Fetch real images from Pexels API for each article. Falls back to loremflickr."""
    import requests
    api_key = os.environ.get("PEXELS_API_KEY", "")
    if not api_key:
        print("  ⚠️  PEXELS_API_KEY not set, using placeholder images")
        return

    for i, article in enumerate(articles):
        keywords = article.get("image_keywords", "news")
        # Use the first keyword for better search results
        query = keywords.split(",")[0].strip()
        try:
            resp = requests.get(
                "https://api.pexels.com/v1/search",
                headers={"Authorization": api_key},
                params={"query": query, "per_page": 1, "orientation": "landscape", "size": "large"},
                timeout=10,
            )
            if resp.status_code == 200:
                data = resp.json()
                if data.get("photos"):
                    photo = data["photos"][0]
                    article["image_url"] = photo["src"]["large"]       # 1200px+
                    article["image_medium"] = photo["src"]["medium"]    # 700px+
                    article["image_small"] = photo["src"]["small"]      # 400px+
                    article["image_photographer"] = photo["photographer"]
                    article["image_pexels_url"] = photo["url"]
                    print(f"  🖼️  [{i+1}] {query} → {photo['photographer']}")
                    time.sleep(0.3)  # Rate limit: ~3 req/sec for free tier
                    continue
            print(f"  ⚠️  [{i+1}] No image found for '{query}', using placeholder")
        except Exception as e:
            print(f"  ⚠️  [{i+1}] Image search failed: {e}")

# --- DeepSeek API ---

SYSTEM_PROMPT = f"""You are a senior news editor for TopRank (top.zicisi.fun), a popular ranking and trending news site.
Today's date: {datetime.now().strftime('%B %d, %Y')} ({datetime.now().strftime('%A')}).

Generate 10 REAL, CURRENT global hot news stories for today. Each must be based on real events/trends from the past 24-48 hours. The stories must be:

- FACTUAL: Reference real events, companies, people, or studies. Include specific names, numbers, locations.
- FRESH: From the last 1-2 days. Mention dates if relevant.
- DIVERSE: Mix of categories — at least 3 different categories from the list below.
- READABLE: Written in an engaging, journalistic style. 400-600 words each.
- STRUCTURED: Use "## Section Title" for H2 subheadings within the body (3-4 per article).

Categories to choose from (use the category KEY):
- top-10: Top 10 rankings, best-of lists, countdowns
- vs-battle: Head-to-head comparisons, versus battles
- tech: Technology, gadgets, AI, apps, science discoveries
- food: Food trends, restaurant news, culinary discoveries
- travel: Travel destinations, tourism news, hidden gems
- movies: Film industry, streaming, box office, TV shows
- health: Health research, fitness trends, medical breakthroughs
- general: Breaking news, viral stories, weird/strange events, interesting stories

For each article, output a JSON object with these EXACT fields:
  "title": SEO-optimized headline (60-100 chars), catchy and clickable
  "category": one of [top-10, vs-battle, tech, food, travel, movies, health, general]
  "excerpt": SEO meta description (max 160 chars), compelling summary
  "image_keywords": 2-4 comma-separated English words for stock photo search (e.g. "tesla,cybertruck,ev")
  "body_html": Full article body as HTML. Use <p>paragraphs</p> and <h2>Section headings</h2>. 6-10 paragraphs total, 400-600 words.

Output as a valid JSON array with 10 objects. No markdown formatting, no code fences, just the raw JSON array.
Important: Generate content based on REAL current events, not generic or fictional stories."""


def call_claude_api(dry_run=False):
    """Call Claude API to generate 10 hot news articles. Returns list of dicts."""
    if dry_run:
        print("🔍 DRY RUN: Would call DeepSeek API for 10 hot news articles")
        return _sample_articles()

    from openai import OpenAI
    api_key = os.environ.get("DEEPSEEK_API_KEY", "")
    if not api_key:
        print("❌ DEEPSEEK_API_KEY environment variable not set")
        sys.exit(1)

    client = OpenAI(api_key=api_key, base_url="https://api.deepseek.com")

    max_retries = 3
    for attempt in range(max_retries):
        try:
            print(f"🤖 Calling DeepSeek API (attempt {attempt + 1})...")
            response = client.chat.completions.create(
                model="deepseek-chat",
                max_tokens=16000,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": "Generate 10 hot news articles for today. Output as a JSON array."},
                ],
                temperature=0.9,
            )

            text = response.choices[0].message.content
            print(f"✅ DeepSeek API response received ({len(text)} chars)")

            return _parse_articles(text)

        except Exception as e:
            print(f"⚠️  Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                wait = (attempt + 1) * 10
                print(f"   Retrying in {wait}s...")
                time.sleep(wait)
            else:
                print("❌ All retries exhausted. Exiting.")
                sys.exit(1)


def _parse_articles(text):
    """Parse Claude's JSON response into article dicts."""
    # Strip markdown code fences if present
    text = text.strip()
    if text.startswith("```json"):
        text = text[7:]
    elif text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
    text = text.strip()

    try:
        articles = json.loads(text)
    except json.JSONDecodeError:
        # Try to find JSON array in text
        match = re.search(r'\[.*\]', text, re.DOTALL)
        if match:
            articles = json.loads(match.group())
        else:
            print("❌ Could not parse JSON from Claude response")
            print(f"First 500 chars: {text[:500]}")
            sys.exit(1)

    if not isinstance(articles, list):
        print("❌ Expected JSON array, got something else")
        sys.exit(1)

    print(f"📊 Parsed {len(articles)} articles from response")
    return articles


# --- Article Processing ---

def build_toprank_article(data):
    """Convert Claude API JSON into the format expected by article_builder."""
    import os

    title = data.get("title", "Untitled").strip()
    category_key = data.get("category", "general").strip().lower()
    excerpt = data.get("excerpt", "").strip()
    image_keywords = data.get("image_keywords", "news,trending").strip()
    body_html = data.get("body_html", "").strip()

    # Default body if empty
    if not body_html:
        body_html = f"<p>{excerpt or 'Read the full story for all the details.'}</p>"

    # Map category key to site config categories
    cat_info = SITE_CONFIG["categories"].get(
        category_key,
        {"name": "General", "emoji": "📰", "file": "index.html"}
    )

    # Generate slug from title
    slug = _generate_slug(title)
    now = datetime.now()
    date_str = now.strftime("%B %d, %Y")
    date_iso = now.strftime("%Y-%m-%d")

    # Count words
    text_only = re.sub(r'<[^>]+>', '', body_html)
    word_count = len(text_only.split())
    read_time = max(1, round(word_count / 200))

    return {
        "title": title,
        "slug": slug,
        "excerpt": excerpt or title,
        "body_html": body_html,
        "image_keywords": image_keywords,
        "word_count": word_count,
        "read_time_minutes": read_time,
        "date": date_str,
        "date_iso": date_iso,
        "category_name": cat_info["name"],
        "category_emoji": cat_info["emoji"],
        "category_file": cat_info["file"],
        "category_key": category_key,
        "url_hash": f"claude-{slug}-{date_iso}",
    }


def _generate_slug(title):
    """Generate a URL-friendly slug from a title."""
    slug = title.lower().strip()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug[:80].strip('-')

    # Check for collisions and append number if needed
    site_dir = SITE_DIR
    base_slug = slug
    counter = 2
    while (site_dir / f"{slug}.html").exists():
        slug = f"{base_slug}-{counter}"
        counter += 1
        if counter > 20:
            slug = f"{base_slug}-{random.randint(100, 999)}"
            break

    return slug


# --- Index.html Updates ---

def update_index_sections(articles):
    """Update all dynamic sections of index.html with new articles."""
    index_path = SITE_DIR / "index.html"
    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Hero main (article #1)
    content = _replace_between_markers(
        content, "HERO_MAIN_START", "HERO_MAIN_END",
        _build_hero_main(articles[0])
    )

    # 2. Hero side (articles #2-#5)
    content = _replace_between_markers(
        content, "HERO_SIDE_START", "HERO_SIDE_END",
        _build_hero_side(articles[1:5])
    )

    # 3. Trending ticker (all 10)
    content = _replace_between_markers(
        content, "TRENDING_START", "TRENDING_END",
        _build_trending_ticker(articles)
    )

    # 4. AUTO_CARDS (all 10 as card-sm elements)
    content = _replace_auto_cards(content, articles)

    # 5. Sidebar hotlist (top 8)
    content = _replace_between_markers(
        content, "HOTLIST_START", "HOTLIST_END",
        _build_hotlist(articles[:8])
    )

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"  📌 Updated index.html: hero, side, ticker, cards, hotlist")


def _replace_between_markers(content, start_marker, end_marker, new_html):
    """Replace content between <!-- START --> and <!-- END --> markers."""
    start_tag = f"<!-- {start_marker} -->"
    end_tag = f"<!-- {end_marker} -->"

    pattern = re.compile(
        re.escape(start_tag) + r'.*?' + re.escape(end_tag),
        re.DOTALL
    )

    replacement = start_tag + "\n" + new_html + "\n" + end_tag
    if pattern.search(content):
        return pattern.sub(replacement, content, count=1)

    print(f"  ⚠️  Markers {start_marker}/{end_marker} not found, skipping")
    return content


def _replace_auto_cards(content, articles):
    """Replace content after AUTO_CARDS marker for the card-sm section."""
    marker = "<!-- AUTO_CARDS -->"
    if marker not in content:
        print(f"  ⚠️  AUTO_CARDS marker not found")
        return content

    # Build cards for all 10 articles
    cards_html = "\n".join(_build_card_sm(a) for a in articles)

    # We want to replace from AUTO_CARDS to the closing </div> of the scroll-row
    # Find the marker position
    marker_pos = content.index(marker)
    # Find the next </div> after the marker that closes scroll-row
    # We look for the pattern: marker ... cards ... </div>
    after_marker = content[marker_pos + len(marker):]

    # Find the closing </div> that ends the scroll-row
    # The structure is: <!-- AUTO_CARDS -->\n<a ...>\n<a ...>\n<a ...>\n<a ...>\n</div>
    # We need to replace everything between marker and the </div> before </section>
    # Use a simpler approach: find the next </div> after marker that is followed by </section>

    # Pattern: after marker, there are some cards, then </div></section>
    section_end = after_marker.index("</div></section>")
    # The content to replace is from marker_end to section_end
    before = content[:marker_pos + len(marker)]
    after = content[marker_pos + len(marker) + section_end:]

    return before + "\n" + cards_html + "\n" + after


def _build_hero_main(article):
    """Build the hero main HTML block."""
    a = article
    return (
        f'<a href="{a["slug"]}.html" class="hero-main">\n'
        f'<img src="https://loremflickr.com/800/450/{a["image_keywords"]}" alt="{a["title"][:50]}" '
        f'onerror="this.src=\'https://loremflickr.com/800/450/{a["image_keywords"].split(",")[0] if "," in a["image_keywords"] else a["image_keywords"]}\'">\n'
        f'<div class="hero-overlay"><span class="tag">{a["category_emoji"]} {a["category_name"]}</span>'
        f'<h1>{a["title"]}</h1>'
        f'<div class="meta">{a.get("views", random.randint(100000, 900000)):,} views · {a["read_time_minutes"]} min read</div></div>'
        f'</a>'
    )


def _build_hero_side(articles):
    """Build the hero side list (4 items)."""
    items = []
    categories = [
        ("⚔️ VS Battle", 289000), ("🏅 Top 10", 789000),
        ("💪 Health", 453000), ("📱 Tech", 521000),
    ]
    for i, a in enumerate(articles):
        cat_label = a["category_emoji"] + " " + a["category_name"]
        views = random.randint(120000, 900000)
        items.append(
            f'<a href="{a["slug"]}.html" class="hero-side-item">'
            f'<div class="hero-side-thumb"><img src="https://loremflickr.com/200/130/{a["image_keywords"]}" alt="{a["title"][:30]}" '
            f'onerror="this.src=\'https://loremflickr.com/200/130/{a["image_keywords"].split(",")[0] if "," in a["image_keywords"] else a["image_keywords"]}\'"></div>'
            f'<div class="hero-side-info"><span class="cat">{cat_label}</span>'
            f'<div class="ttl">{a["title"]}</div><div class="st">{views:,} views</div></div></a>'
        )
    return "\n".join(items)


def _build_trending_ticker(articles):
    """Build the trending ticker links."""
    emojis = ["🌶️", "🚗", "💰", "💪", "📱", "🎬", "✈️", "🍽️", "🤖", "🔥"]
    items = []
    for i, a in enumerate(articles):
        emoji = emojis[i % len(emojis)]
        items.append(f'<a href="{a["slug"]}.html">{emoji} {a["title"]}</a>')
    return "\n".join(items)


def _build_card_sm(article):
    """Build a card-sm element for the index page."""
    a = article
    views = random.randint(80000, 600000)
    badge_class, badge_text = random.choice(BADGES)
    badge_html = f'<span class="badge-sm">{badge_text}</span>' if badge_text else ""
    return (
        f'<a href="{a["slug"]}.html" class="card-sm">'
        f'<div class="thumb"><img src="https://loremflickr.com/400/250/{a["image_keywords"]}?r={random.randint(10000,99999)}" '
        f'alt="{a["title"][:50]}" loading="lazy" '
        f'onerror="this.onerror=null;this.src=\'https://loremflickr.com/400/250/{a["image_keywords"].split(",")[0] if "," in a["image_keywords"] else a["image_keywords"]}\'">'
        f'{badge_html}'
        f'</div>'
        f'<div class="info"><span class="cat">{a["category_name"]}</span>'
        f'<h3>{a["title"][:80]}{"..." if len(a["title"]) > 80 else ""}</h3>'
        f'<span class="st">{views:,} views</span></div>'
        f'</a>'
    )


def _build_hotlist(articles):
    """Build the sidebar hotlist HTML."""
    items = []
    for i, a in enumerate(articles):
        rank_class = f" rank-{i+1}" if i < 3 else ""
        items.append(
            f'<li><span class="rank{rank_class}">{i+1}</span>'
            f'<a href="{a["slug"]}.html">{a["title"][:70]}</a></li>'
        )
    return "\n".join(items)


# --- Cleanup ---

def cleanup_old_articles(max_days=90):
    """Remove auto-generated article files older than max_days.
    Only removes files matching article-YYYY-MM-DD-NN.html pattern."""
    cutoff = datetime.now().timestamp() - (max_days * 86400)
    pattern = re.compile(r'^article-\d{4}-\d{2}-\d{2}-\d{2}\.html$')
    removed = 0

    for f in SITE_DIR.glob("article-*.html"):
        if pattern.match(f.name) and f.stat().st_mtime < cutoff:
            f.unlink()
            removed += 1
            print(f"  🗑️  Removed old article: {f.name}")

    if removed > 0:
        print(f"  🧹 Cleaned up {removed} old articles (> {max_days} days)")


# --- Main ---

def main(dry_run=False):
    """Run the full news generation pipeline."""
    print("=" * 60)
    print(f"🚀 TopRank News Generator — {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"   Site: {SITE_CONFIG['name']} ({SITE_CONFIG['domain']})")
    print(f"   Target: 10 articles")
    print(f"   Dry run: {dry_run}")
    print("=" * 60)

    # Step 1: Generate content via Claude API
    raw_articles = call_claude_api(dry_run=dry_run)

    if not raw_articles:
        print("❌ No articles generated. Exiting.")
        return

    # Step 2: Process articles
    articles = []
    for i, raw in enumerate(raw_articles[:10]):
        try:
            article = build_toprank_article(raw)
            articles.append(article)
            print(f"  📰 [{article['category_emoji']} {article['category_name']}] {article['title'][:70]}")
            print(f"     → {article['slug']}.html ({article['word_count']} words)")
        except Exception as e:
            print(f"  ❌ Error processing article {i+1}: {e}")

    if not articles:
        print("❌ All articles failed processing. Exiting.")
        return

    print(f"\n✅ Generated {len(articles)} articles")

    if dry_run:
        print("🔍 DRY RUN: No files written. Would have created:")
        for a in articles:
            print(f"   → {a['slug']}.html")
        return

    # Step 2.5: Fetch real images
    print(f"\n🖼️  Fetching real images...")
    try:
        fetch_real_images(articles)
    except Exception as e:
        print(f"  ⚠️  Image fetch failed, using placeholders: {e}")

    # Step 3: Build article HTML files
    print(f"\n📄 Building HTML pages...")
    for article in articles:
        try:
            filepath = write_article(article, SITE_KEY)
            print(f"  ✅ {filepath.name}")
        except Exception as e:
            print(f"  ❌ Failed to write {article['slug']}.html: {e}")

    # Step 4: Update index.html
    print(f"\n🔄 Updating index.html...")
    try:
        update_index_sections(articles)
    except Exception as e:
        print(f"  ❌ Failed to update index.html: {e}")

    # Step 5: Update sitemap
    print(f"\n🗺️  Updating sitemap.xml...")
    try:
        update_sitemap(SITE_KEY)
    except Exception as e:
        print(f"  ❌ Failed to update sitemap: {e}")

    # Step 6: Cleanup old articles
    print(f"\n🧹 Cleaning up old articles...")
    try:
        cleanup_old_articles(max_days=90)
    except Exception as e:
        print(f"  ❌ Cleanup failed: {e}")

    print(f"\n✅ Done at {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"   {len(articles)} articles generated for {SITE_CONFIG['name']}")


def _sample_articles():
    """Return sample articles for dry-run testing."""
    return [
        {
            "title": f"Sample Article {i}: This is a test headline for dry run purposes",
            "category": random.choice(["tech", "food", "travel", "health", "movies", "general", "top-10", "vs-battle"]),
            "excerpt": f"Sample excerpt for article {i} — a brief summary of what this article covers.",
            "image_keywords": random.choice(["ai,technology", "food,cuisine", "travel,destination", "health,fitness", "movie,cinema", "news,trending"]),
            "body_html": "<p>This is a sample paragraph for testing purposes.</p>" + "<h2>Section Title</h2><p>Another paragraph with sample content.</p>" * 3,
        }
        for i in range(1, 11)
    ]


if __name__ == "__main__":
    import os
    parser = argparse.ArgumentParser(description="TopRank News Generator")
    parser.add_argument("--dry-run", action="store_true",
                        help="Preview only — don't write files")
    args = parser.parse_args()

    main(dry_run=args.dry_run)
