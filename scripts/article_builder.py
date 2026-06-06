#!/usr/bin/env python3
"""Article HTML builder — wraps rewritten content in full SEO-optimized HTML page."""

import json
import random
from pathlib import Path
from datetime import datetime

from config import BASE, SITES, NETWORK_SITES

# ═══════════════════════════ NETWORK DROPDOWN HTML ═══════════════════════════

def _network_dropdown(current_site):
    """Generate the 'Our Network' dropdown HTML."""
    items = []
    for key, site in NETWORK_SITES.items():
        if key != current_site:
            items.append(
                f'<a href="{site["url"]}">'
                f'<span class="network-dot" style="background:{site["color"]}"></span>'
                f'{site["name"]}</a>'
            )
    return ('<div class="network-dropdown">'
            '<button class="network-btn">📡 Our Network</button>'
            '<div class="network-menu">'
            + ''.join(items) +
            '</div></div>')

def _network_footer():
    """Generate footer network links."""
    items = []
    for key, site in NETWORK_SITES.items():
        items.append(f'<a href="{site["url"]}">{site["emoji"]} {site["name"]}</a>')
    return '<strong>🌐 Our Network:</strong>' + ''.join(items)

# ═══════════════════════════ HEAD TEMPLATE ═══════════════════════════

def _get_image_url(article, size="large", fallback_size=(1200, 630)):
    """Get real image URL if available, otherwise fall back to loremflickr."""
    if article.get("image_url"):
        # Pexels image available
        if size == "large":
            return article["image_url"]
        elif size == "medium":
            return article.get("image_medium", article["image_url"])
        elif size == "small":
            return article.get("image_small", article.get("image_medium", article["image_url"]))
    # Fallback to loremflickr
    keywords = article.get("image_keywords", "news")
    w, h = fallback_size
    return f"https://loremflickr.com/{w}/{h}/{keywords}"


def build_head(article, site_config):
    """Build the complete <head> section with all SEO meta tags."""
    title = article["title"]
    excerpt = article["excerpt"]
    domain = site_config["domain"]
    site_name = site_config["name"]
    date_iso = article["date_iso"]
    image_url = _get_image_url(article, "large", (1200, 630))

    jsonld = json.dumps({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": excerpt,
        "publisher": {"@type": "Organization", "name": site_name},
        "datePublished": date_iso,
        "author": {"@type": "Person", "name": f"{site_name} Editorial Team"},
        "wordCount": article.get("word_count", 500),
        "image": image_url,
    }, ensure_ascii=False)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="description" content="{excerpt}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{excerpt}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="{site_name}">
<meta property="og:image" content="{image_url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{excerpt}">
<title>{title} | {site_name}</title>
<link rel="stylesheet" href="style.css">

<script type="application/ld+json">{jsonld}</script>
</head>"""

# ═══════════════════════════ HEADER ═══════════════════════════

def build_header(article, site_config):
    """Build the site header with nav."""
    site_key = site_config.get("_key", "viralnow")
    logo = site_config["logo_html"]

    # Fixed nav links matching site structure
    nav_links = [
        'Top 10',
        'VS',
        'Roundups',
        'Reviews',
    ]
    nav_html = '<a href="index.html">Home</a>' + ''.join(
        f'<a href="category-{name.lower().replace(" ", "-")}.html">{name}</a>'
        for name in nav_links
    )

    return f"""<body>
<header class="site-header">
<div class="header-inner">
<a href="index.html" class="site-logo">{logo}</a>
<button class="menu-toggle" aria-label="Menu">☰</button>
<nav class="main-nav">
{nav_html}
{_network_dropdown(site_key)}
</nav>
</div>
</header>"""

# ═══════════════════════════ ARTICLE CONTENT ═══════════════════════════

def build_article_content(article, site_config):
    """Build the main article content area."""
    title = article["title"]
    cat_name = article.get("category_name", "General")
    cat_emoji = article.get("category_emoji", "📌")
    cat_file = article.get("category_file", "index.html")
    body_html = article["body_html"]
    image_keywords = article.get("image_keywords", "news")
    read_time = article.get("read_time_minutes", 3)
    avatar_bg = site_config["avatar_bg"]
    avatar_text = site_config["avatar_text"]
    date_str = article.get("date", datetime.now().strftime("%B %d, %Y"))

    # Split body at midpoint for natural content break
    parts = body_html.split('</p>')
    if len(parts) > 3:
        mid = len(parts) // 2
        body_first = '</p>'.join(parts[:mid]) + '</p>'
        body_second = '</p>'.join(parts[mid:])
    else:
        body_first = body_html
        body_second = ""

    # Truncate title for breadcrumb
    breadcrumb_title = title[:47] + '...' if len(title) > 50 else title

    return f"""<div class="page-layout">
<main class="content-area">

<nav class="breadcrumb" style="font-size:.8rem;color:var(--text-muted);margin-bottom:16px">
<a href="index.html">Home</a> › <a href="{cat_file}">{cat_name}</a> › {breadcrumb_title}
</nav>

<article>
<header class="article-header">
<span class="card-category" style="font-size:.85rem">{cat_emoji} {cat_name}</span>
<h1 class="article-title">{title}</h1>
<div class="article-meta">
<div style="width:36px;height:36px;border-radius:50%;background:{avatar_bg};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.8rem">{avatar_text}</div>
<span>By {site_config['name']} Team</span>
<span>·</span>
<span>{date_str}</span>
<span>·</span>
<span>{read_time} min read</span>
</div>
</header>

<div class="article-featured-image">
<img src="{_get_image_url(article, 'medium', (800, 450))}"
     alt="{title}" style="width:100%;height:100%;object-fit:cover" loading="eager"
     onerror="this.onerror=null;this.src='https://loremflickr.com/800/450/{image_keywords.split(",")[0] if "," in image_keywords else image_keywords}'">
</div>

<div class="article-content">
{body_first}
</div>

<div class="article-content">
{body_second}
</div>

<div class="share-bar">
<span style="font-weight:600;margin-right:8px">Share:</span>
<button class="share-btn share-twitter" data-platform="twitter">🐦 Twitter</button>
<button class="share-btn share-facebook" data-platform="facebook">📘 Facebook</button>
<button class="share-btn share-copy" data-platform="copy">📋 Copy Link</button>
</div>

<div class="author-box" style="margin-top:24px;padding:20px;background:var(--card);border-radius:8px;border:1px solid var(--border);display:flex;gap:16px;align-items:center">
<div style="width:56px;height:56px;border-radius:50%;background:{avatar_bg};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1.2rem;flex-shrink:0">{avatar_text}</div>
<div>
<strong style="font-size:.95rem">{site_config['name']} Team</strong>
<p style="font-size:.8rem;color:var(--text-secondary);margin:4px 0 0">
We spend hours researching and testing before we write anything. If something changes, we update the article.
<a href="about.html">About our process →</a>
</p>
</div>
</div>

</article>

</main>"""

# ═══════════════════════════ SIDEBAR ═══════════════════════════

def build_sidebar(article, site_config):
    """Build the sidebar with category nav, newsletter, and hotlist."""
    hot_title = site_config.get("hot_title", "🔥 Trending Now")
    hotlist = article.get("_hotlist_html", "")
    domain = site_config["domain"]

    if not hotlist:
        hotlist = "<ol><li><span class='rank rank-1'>1</span>Check back soon for trending stories</li></ol>"

    return f"""<aside class="sidebar">
<div class="sidebar-sticky">

<div class="sidebar-widget" style="background:var(--card);border-radius:8px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,.08)">
<h3 style="font-size:.95rem;font-weight:700;margin-bottom:10px">📂 Browse by Category</h3>
<ul style="list-style:none;padding:0;margin:0;font-size:.82rem;line-height:2">
<li><a href="category-top-10.html">🏅 Top 10</a></li>
<li><a href="category-vs-battle.html">⚔️ VS Battle</a></li>
<li><a href="category-tech.html">📱 Tech</a></li>
<li><a href="category-movies.html">🎬 Movies</a></li>
<li><a href="category-travel.html">✈️ Travel</a></li>
<li><a href="category-food.html">🍽️ Food</a></li>
<li><a href="category-health.html">💪 Health</a></li>
</ul>
</div>

<div class="sidebar-widget" style="background:var(--card);border-radius:8px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,.08);border-left:3px solid var(--primary)">
<h3 style="font-size:.95rem;font-weight:700;margin-bottom:8px">📬 Stay in the Loop</h3>
<p style="font-size:.78rem;color:var(--text-secondary);margin-bottom:10px">
Get our latest rankings and reviews delivered every week.
</p>
<form onsubmit="event.preventDefault();this.innerHTML='<p style=color:green>✓ Thanks for subscribing!</p>'" style="display:flex;gap:6px">
<input type="email" placeholder="Your email address" required style="flex:1;padding:8px;border:1px solid var(--border);border-radius:4px;font-size:.8rem">
<button type="submit" style="background:var(--primary);color:#fff;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;font-weight:600;font-size:.8rem">Subscribe</button>
</form>
</div>

<div class="sidebar-widget hotlist" style="background:var(--card);border-radius:8px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,.08)">
<h3 style="font-size:.95rem;font-weight:700;margin-bottom:8px">🔥 {hot_title}</h3>
{hotlist}
</div>

</div>
</aside>
</div>"""

# ═══════════════════════════ FOOTER ═══════════════════════════

def build_footer(article, site_config):
    """Build the full footer with network links, legal, cookie consent."""
    domain = site_config["domain"]

    return f"""<footer class="site-footer">
<div class="footer-inner">
<div class="footer-network">
{_network_footer()}
</div>
<div class="footer-links" style="text-align:center;margin:8px 0;font-size:.75rem">
<a href="about.html" style="color:var(--text-muted);margin:0 8px">About</a>
<a href="contact.html" style="color:var(--text-muted);margin:0 8px">Contact</a>
<a href="privacy.html" style="color:var(--text-muted);margin:0 8px">Privacy</a>
<a href="terms.html" style="color:var(--text-muted);margin:0 8px">Terms</a>
<a href="sitemap.xml" style="color:var(--text-muted);margin:0 8px">Sitemap</a>
</div>
<p class="footer-copy">
© 2026 {domain} — All rights reserved.
</p>
</div>
</footer>

<div id="cookie-consent" style="position:fixed;bottom:0;left:0;right:0;background:rgba(0,0,0,.9);color:#fff;padding:12px 20px;z-index:9999;display:flex;align-items:center;justify-content:center;gap:16px;font-size:.8rem;flex-wrap:wrap">
<span>🍪 We use cookies to remember your preferences and understand how you use our site. By continuing, you agree.</span>
<button onclick="document.getElementById('cookie-consent').style.display='none'" style="background:#fff;color:#000;border:none;padding:6px 16px;border-radius:4px;cursor:pointer;font-weight:600;white-space:nowrap">Accept</button>
<a href="privacy.html" style="color:#ccc;font-size:.75rem">Learn more</a>
</div>

<button class="back-to-top" aria-label="Back to top">↑</button>

<script src="script.js"></script>
</body></html>"""

# ═══════════════════════════ CARD HTML ═══════════════════════════

def build_card(article, site_config):
    """Build a homepage card for this article."""
    slug = article["slug"]
    title = article["title"]
    cat_emoji = article.get("category_emoji", "📌")
    cat_name = article.get("category_name", "General")
    excerpt = article.get("excerpt", "")
    image_keywords = article.get("image_keywords", "news")

    img_url = _get_image_url(article, 'small', (400, 250))
    onerror_keyword = image_keywords.split(",")[0] if "," in image_keywords else image_keywords
    return (
        f'<a href="{slug}.html" class="card-sm">'
        f'<div class="thumb">'
        f'<img src="{img_url}" '
        f'alt="{title[:50]}" loading="lazy" '
        f'onerror="this.onerror=null;this.src=\'https://loremflickr.com/400/250/{onerror_keyword}\'">'
        f'</div>'
        f'<div class="info"><span class="cat">{cat_name}</span>'
        f'<h3>{title[:80]}{"..." if len(title) > 80 else ""}</h3>'
        f'<span class="st">Read more →</span></div>'
        f'</a>'
    )

# ═══════════════════════════ FULL PAGE BUILDER ═══════════════════════════

def build_full_page(article, site_key):
    """Build a complete article HTML page and return the HTML string."""
    site_config = dict(SITES[site_key])
    site_config["_key"] = site_key

    head = build_head(article, site_config)
    header = build_header(article, site_config)
    content = build_article_content(article, site_config)
    sidebar = build_sidebar(article, site_config)
    footer = build_footer(article, site_config)

    return head + header + content + sidebar + footer

def write_article(article, site_key):
    """Build and write an article HTML file to the site directory.
    Returns the file path."""
    html = build_full_page(article, site_key)
    site_dir = BASE / SITES[site_key]["folder"]
    filepath = site_dir / f"{article['slug']}.html"

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html)

    return filepath

# ═══════════════════════════ INDEX INJECTION ═══════════════════════════

def inject_cards_to_index(site_key, cards_html):
    """Inject new article cards into the site's index.html at the AUTO_CARDS marker."""
    site_dir = BASE / SITES[site_key]["folder"]
    index_path = site_dir / "index.html"

    if not index_path.exists():
        print(f"  ⚠️  index.html not found for {site_key}")
        return False

    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()

    marker = "<!-- AUTO_CARDS -->"
    if marker in content:
        # Insert new cards at the marker position
        new_cards = '\n'.join(cards_html)
        content = content.replace(marker, marker + '\n' + new_cards)
    else:
        print(f"  ⚠️  AUTO_CARDS marker not found in {site_key}/index.html")
        return False

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(content)

    return True

# ═══════════════════════════ RELATED POSTS ═══════════════════════════

def find_related_articles(site_key, current_slug, count=4):
    """Find existing articles in the site directory for 'related posts' section."""
    site_dir = BASE / SITES[site_key]["folder"]
    existing = list(site_dir.glob("*.html"))

    articles = []
    for f in existing:
        if f.name in ("index.html", "article.html", "about.html", "contact.html",
                       "privacy.html", "terms.html", "category-"):
            continue
        # Extract title from filename
        slug = f.stem
        if slug == current_slug:
            continue
        title = slug.replace("-", " ").title()
        articles.append({"slug": slug, "title": title})

    random.shuffle(articles)
    return articles[:count]
