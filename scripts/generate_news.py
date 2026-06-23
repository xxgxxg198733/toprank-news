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
    from config import SITES, BASE
    from article_builder import build_full_page, write_article, _get_image_url
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

SYSTEM_PROMPT = f"""You are a passionate writer for TopRank, a website where real people share honest rankings, thoughtful comparisons, and useful recommendations. Today is {datetime.now().strftime('%B %d, %Y')} ({datetime.now().strftime('%A')}).

Write 10 articles based on REAL current events and trends happening now. CRITICAL: You MUST distribute articles across ALL 8 categories — at least 1 article per category. Each article must reference actual people, companies, products, studies, or news from the past few days. Nothing generic or made up.

Category distribution (10 total, at least 1 per category): top-10, vs-battle, tech, food, travel, movies, health, general. Each article must be AT LEAST 1000 words of body text.

═══════════════════════════════════════
WRITING STYLE — READ THIS CAREFULLY
═══════════════════════════════════════

You are a HUMAN writer, not a corporate bot. Write like you're telling a friend about something interesting you just learned:

• Use a conversational, warm tone. Short sentences mixed with longer ones. Like how people actually talk.
• Share your honest opinion. Say what you really think — if something is overhyped, say so. If you're genuinely impressed, let it show.
• Include personal touches: "I've been following this story for a while and..." or "Honestly, I didn't expect this to work, but..." or "Here's what nobody's talking about..."
• Use contractions (don't, I've, it's, they're, that's).
• Avoid ALL corporate/PR speak. Never say: "in today's fast-paced world", "it's worth noting", "as we can see", "in conclusion", "moreover", "furthermore", "it is important to understand".
• BANNED WORDS AND PHRASES — NEVER use these, they immediately mark you as AI: "game-changer", "groundbreaking", "iconic", "vibrant", "cutting-edge", "state-of-the-art", "bustling", "nestled", "dive into", "deep dive", "let's explore", "unpack", "delving into", "in the realm of", "embark on", "fast-forward to", "in the world of", "testament to", "speaks volumes", "whether you're a", "look no further", "without further ado", "buckle up", "read on", "so there you have it", "picture this", "needless to say", "it goes without saying", "at the end of the day", "one thing is clear".
• Don't sound like a Wikipedia article. Sound like a smart friend who reads a lot.
• Vary your sentence structure. Don't start every paragraph the same way.
• Occasionally ask rhetorical questions. "But does it actually work? I looked into it."
• Be specific. Instead of "many people", say "over 2 million users". Instead of "recently", say "last Tuesday".

═══════════════════════════════════════
FORMAT REQUIREMENTS
═══════════════════════════════════════

• Each article must be AT LEAST 1500 words. Not 1200, not 1400 — 1500 minimum. 1800-2500 is even better.
• Use <h2>Section Title</h2> for subheadings (5-8 per article). Make subheadings interesting, not generic.
• Use <p> for paragraphs. Vary paragraph length — some 2-3 sentences, some 5-6.
• Every article needs a strong opening that hooks the reader in the first 2 sentences.
• Every article needs a satisfying closing — not "in conclusion", but a memorable final thought.

═══════════════════════════════════════
CATEGORIES — Include ALL 8 categories, 1-2 articles each
═══════════════════════════════════════

- top-10: Rankings and best-of lists. Don't just list things — explain WHY each pick matters. Share your disagreements with popular opinion.
- vs-battle: Head-to-head comparisons. Pick a clear winner and defend your choice with real reasoning, not just spec sheets.
- tech: Gadgets, apps, AI, science. Cut through the hype. What actually matters to regular people?
- food: Food trends, restaurants, cooking. Talk about taste, experience, culture — not just trends.
- travel: Destinations, travel tips. Share the stuff guidebooks miss. The real experience.
- movies: Films, streaming, TV. Review like a movie fan, not a critic. Was it actually fun to watch?
- health: Health research, fitness. Be evidence-based but relatable. No scare tactics, no miracle cures.
- general: Interesting news, culture, weird stories. The kind of article you'd send to a group chat.

═══════════════════════════════════════
OUTPUT FORMAT
═══════════════════════════════════════

Output a JSON array with exactly 10 objects. Each object must have:

  "title": A headline that makes someone want to click. Not clickbait — intriguing but honest. 50-90 characters.
  "category": One of [top-10, vs-battle, tech, food, travel, movies, health, general]
  "excerpt": A teaser that sounds like a person wrote it, max 155 characters. Don't stuff keywords.
  "image_keywords": 2-4 specific English words for finding a relevant photo. Be specific: "santorini sunset caldera" not "travel greece"
  "body_html": Full article as HTML. <h2> for headings, <p> for paragraphs. 1500+ words.

Output ONLY the raw JSON array. No markdown fences, no explanation text."""

AUTHOR_NAMES = [
    "Michael Chen", "Sarah Mitchell", "James Rodriguez", "Emily Watson",
    "David Kim", "Jessica Thompson", "Robert Martinez", "Amanda Brooks",
    "Christopher Lee", "Lauren Davis", "Daniel Wilson", "Rachel Greene",
    "Matthew Anderson", "Nicole Barnes", "Andrew Foster", "Megan O'Brien",
    "Joshua Reed", "Samantha Cole", "Ryan Cooper", "Hannah Powell"
]



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
                max_tokens=40000,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": "Write 10 in-depth articles covering ALL 8 categories. At least 1 article per category. 1000+ words each. Output as a JSON array."},
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

    # 6. Per-category sections: auto-populate 10 latest articles each
    content = _update_category_section(content, "AUTO_CARDS_VS", ["vs-battle"], 10)
    content = _update_category_section(content, "AUTO_CARDS_TECH", ["tech"], 10)
    content = _update_category_section(content, "AUTO_CARDS_MT", ["movies", "travel"], 10)

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"  📌 Updated index.html: hero, side, ticker, cards, hotlist, category sections")


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
    """Replace content after AUTO_CARDS marker for the card-sm section.
    Also appends links to older articles so past content stays discoverable."""
    marker = "<!-- AUTO_CARDS -->"
    if marker not in content:
        print(f"  ⚠️  AUTO_CARDS marker not found")
        return content

    # Build cards for all 10 new articles
    cards_html = "\n".join(_build_card_sm(a) for a in articles)

    # Find older generated articles (DeepSeek articles from previous runs)
    older_links = _build_older_articles_links(articles)

    # Replace from AUTO_CARDS to the closing </div> of scroll-row
    marker_pos = content.index(marker)
    after_marker = content[marker_pos + len(marker):]
    section_end = after_marker.index("</div></section>")
    before = content[:marker_pos + len(marker)]
    after = content[marker_pos + len(marker) + section_end:]

    # Remove ALL existing "Previous Stories" sections from the rest of the page
    # to prevent duplication (they get re-added below if there are older links)
    import re
    prev_stories_pattern = re.compile(
        r'<section class="section-row"><div class="section-row-head"><h2>📚 Previous Stories</h2></div><div class="scroll-row">.*?</div>\s*</div></section>',
        re.DOTALL
    )
    after = prev_stories_pattern.sub('', after)

    # Insert new cards + older article links
    new_content = "\n" + cards_html + older_links + "\n"
    return before + new_content + after


def _build_older_articles_links(new_articles, max_show=20):
    """Build HTML links to older articles that aren't in the current batch.
    Extracts real og:image from each article for proper thumbnails."""
    new_slugs = {a["slug"] for a in new_articles}
    older = []

    for f in sorted(SITE_DIR.glob("*.html"), key=lambda p: p.stat().st_mtime, reverse=True):
        if f.name in ("index.html", "about.html", "contact.html", "privacy.html",
                       "terms.html", "article.html", "robots.txt"):
            continue
        if f.name.startswith("category-"):
            continue
        slug = f.stem
        if slug in new_slugs:
            continue

        # Extract title and image from the actual article file
        try:
            html = f.read_text(encoding="utf-8")
            title_m = re.search(r'<title>(.*?)\s*\|\s*TopRank</title>', html)
            title = title_m.group(1).strip() if title_m else slug.replace("-", " ").title()
            img_m = re.search(r'<meta property="og:image" content="([^"]*)"', html)
            image_url = img_m.group(1) if img_m else ""
        except Exception:
            title = slug.replace("-", " ").title()
            image_url = ""

        older.append((slug, title, image_url))
        if len(older) >= max_show:
            break

    if not older:
        return ""

    items = ""
    for slug, title, image_url in older:
        if image_url:
            # Use real image from the article
            thumb_html = f'<img src="{image_url}" alt="{title[:50]}" loading="lazy" onerror="this.onerror=null;this.parentElement.innerHTML=\'<div class=archive-thumb>📰</div>\'">'
        else:
            thumb_html = '<div class="archive-thumb">📰</div>'
        items += f'<a href="{slug}.html" class="card-sm card-sm--archive"><div class="thumb">{thumb_html}</div><div class="info"><span class="cat">Previous</span><h3>{title[:80]}</h3><span class="st">Read more →</span></div></a>\n'

    return (
        '\n</div></section>\n'
        '<section class="section-row">'
        '<div class="section-row-head"><h2>📚 Previous Stories</h2></div>'
        f'<div class="scroll-row">\n{items}</div>'
    )


def _build_hero_main(article):
    """Build the hero main HTML block."""
    a = article
    img_url = _get_image_url(a, "large", (800, 450))
    onerror_keyword = a["image_keywords"].split(",")[0] if "," in a["image_keywords"] else a["image_keywords"]
    return (
        f'<a href="{a["slug"]}.html" class="hero-main">\n'
        f'<img src="{img_url}" alt="{a["title"][:50]}" '
        f'onerror="this.onerror=null;this.src=\'https://loremflickr.com/800/450/{onerror_keyword}\'">\n'
        f'<div class="hero-overlay"><span class="tag">{a["category_emoji"]} {a["category_name"]}</span>'
        f'<h1>{a["title"]}</h1>'
        f'<div class="meta">{a["read_time_minutes"]} min read</div></div>'
        f'</a>'
    )


def _build_hero_side(articles):
    """Build the hero side list (4 items)."""
    items = []
    for i, a in enumerate(articles):
        cat_label = a["category_emoji"] + " " + a["category_name"]
        
        img_url = _get_image_url(a, "small", (200, 130))
        onerror_keyword = a["image_keywords"].split(",")[0] if "," in a["image_keywords"] else a["image_keywords"]
        items.append(
            f'<a href="{a["slug"]}.html" class="hero-side-item">'
            f'<div class="hero-side-thumb"><img src="{img_url}" alt="{a["title"][:30]}" '
            f'onerror="this.onerror=null;this.src=\'https://loremflickr.com/200/130/{onerror_keyword}\'"></div>'
            f'<div class="hero-side-info"><span class="cat">{cat_label}</span>'
            f'<div class="ttl">{a["title"]}</div></div></a>'
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

    img_url = _get_image_url(a, "small", (400, 250))
    onerror_keyword = a["image_keywords"].split(",")[0] if "," in a["image_keywords"] else a["image_keywords"]
    return (
        f'<a href="{a["slug"]}.html" class="card-sm">'
        f'<div class="thumb"><img src="{img_url}" '
        f'alt="{a["title"][:50]}" loading="lazy" '
        f'onerror="this.onerror=null;this.src=\'https://loremflickr.com/400/250/{onerror_keyword}\'">'
        f'</div>'
        f'<div class="info"><span class="cat">{a["category_name"]}</span>'
        f'<h3>{a["title"][:80]}{"..." if len(a["title"]) > 80 else ""}</h3>'
        f'<span class="st">Read more →</span></div>'
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


def _update_category_section(content, marker, category_keys, count=10):
    """Auto-populate category section with the most recent articles from given categories."""
    import re as _re

    # Scan all existing article HTML files for category info
    site_dir = SITE_DIR
    cat_articles = []

    for f in sorted(site_dir.glob("*.html"), key=lambda p: p.stat().st_mtime, reverse=True):
        if f.name in ("index.html", "about.html", "contact.html", "privacy.html",
                       "terms.html", "article.html"):
            continue
        if f.name.startswith("category-"):
            continue

        try:
            html = f.read_text(encoding="utf-8")
            # Extract category from breadcrumb or meta
            cat_m = _re.search(r"category-(\w+)\.html", html)
            article_cat = cat_m.group(1).replace("-", " ") if cat_m else "general"

            # Map category filename to key
            cat_map = {
                "top 10": "top-10", "vs battle": "vs-battle", "tech": "tech",
                "movies": "movies", "travel": "travel", "food": "food",
                "health": "health", "general": "general", "reviews": "general",
                "roundups": "general",
            }
            article_cat_key = cat_map.get(article_cat.lower().strip(), "general")

            if article_cat_key in category_keys:
                title_m = _re.search(r"<title>(.*?)\s*\|\s*TopRank</title>", html)
                title = title_m.group(1).strip() if title_m else f.stem.replace("-", " ").title()
                img_m = _re.search(r'<meta property="og:image" content="([^"]*)"', html)
                image_url = img_m.group(1) if img_m else ""
                slug = f.stem
                cat_articles.append({"slug": slug, "title": title, "image_url": image_url})
        except Exception:
            continue

        if len(cat_articles) >= count:
            break

    if not cat_articles:
        return content

    cards = []
    for a in cat_articles[:count]:
        img = a["image_url"] if a["image_url"] else "https://loremflickr.com/400/250/news"
        title_display = a["title"][:70] + "..." if len(a["title"]) > 70 else a["title"]
        cards.append(
            f'<a href="{a["slug"]}.html" class="card-sm">'
            f'<div class="thumb"><img src="{img}" alt="{a["title"][:50]}" loading="lazy" '
            f'onerror="this.onerror=null;this.src=\'https://loremflickr.com/400/250/{a["slug"][:20].replace("-","+")}\'">'
            f'</div>'
            f'<div class="info"><span class="cat">{category_keys[0].replace("-"," ").title()}</span>'
            f'<h3>{title_display}</h3>'
            f'<span class="st">Read more →</span></div>'
            f'</a>'
        )

    # Replace content between marker and closing </div> of scroll-row
    marker_tag = f"<!-- {marker} -->"
    if marker_tag not in content:
        print(f"  ⚠️  Marker {marker} not found in index.html")
        return content

    marker_pos = content.index(marker_tag)
    after = content[marker_pos + len(marker_tag):]
    # Find the closing </div> of the scroll-row (next </div></section>)
    section_end = after.index("</div></section>")
    before = content[:marker_pos + len(marker_tag)]
    after_section = after[section_end:]

    new_content = before + "\n" + "\n".join(cards) + "\n" + after_section
    print(f"  📌 Category section [{marker}]: {len(cards)} articles from {category_keys}")
    return new_content


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
    print(f"   Target: 10 articles (1+ per category)")
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
