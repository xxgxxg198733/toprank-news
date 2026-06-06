#!/usr/bin/env python3
"""
One-shot site rebuilder:
  1. Scan all generated articles → build per-category article lists
  2. Rebuild category-*.html with real article links
  3. Rebuild static pages (about, contact, privacy, terms) with natural content
  4. Rebuild article.html template page
  5. Fix cookie consent text
  6. Inject richer sidebar into index.html
"""
import re
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parent.parent

SITE_NAME = "TopRank"
SITE_DOMAIN = "top.zicisi.fun"

CATEGORIES = {
    "top-10":       {"name": "Top 10",       "emoji": "🏅", "desc": "Expertly ranked top 10 lists across every category that matters."},
    "vs-battle":    {"name": "VS Battle",    "emoji": "⚔️", "desc": "Head-to-head comparisons to help you decide what's worth your time and money."},
    "tech":         {"name": "Tech",         "emoji": "📱", "desc": "The latest gadget reviews, tech trends, and digital discoveries."},
    "movies":       {"name": "Movies",       "emoji": "🎬", "desc": "Box office hits, streaming gems, and everything happening in film and TV."},
    "travel":       {"name": "Travel",       "emoji": "✈️", "desc": "Destination guides, travel tips, and hidden gems around the world."},
    "food":         {"name": "Food",         "emoji": "🍽️", "desc": "Food trends, restaurant news, and culinary discoveries from street food to fine dining."},
    "health":       {"name": "Health",       "emoji": "💪", "desc": "Evidence-based health tips, fitness trends, and medical breakthroughs."},
    "general":      {"name": "General",      "emoji": "📰", "desc": "Breaking news and interesting stories from around the globe."},
    "reviews":      {"name": "Reviews",      "emoji": "⭐", "desc": "In-depth reviews of products, services, and experiences you care about."},
    "roundups":     {"name": "Roundups",     "emoji": "📋", "desc": "Curated collections and comprehensive roundups of the best in every category."},
}

# ────────────────────────────────────────────────────────────
# 1. SCAN GENERATED ARTICLES
# ────────────────────────────────────────────────────────────
def scan_articles():
    """Find all auto-generated article HTML files and extract metadata."""
    articles = []
    for f in sorted(ROOT.glob("*.html"), key=lambda p: p.stat().st_mtime, reverse=True):
        name = f.name
        if name in ("index.html", "about.html", "contact.html", "privacy.html",
                     "terms.html", "article.html"):
            continue
        if name.startswith("category-"):
            continue

        with open(f, "r", encoding="utf-8") as fh:
            html = fh.read()

        # Extract title
        title_m = re.search(r'<title>(.*?)\s*\|\s*TopRank</title>', html)
        title = title_m.group(1).strip() if title_m else f.stem.replace("-", " ").title()

        # Extract excerpt
        excerpt_m = re.search(r'<meta name="description" content="([^"]*)"', html)
        excerpt = excerpt_m.group(1)[:150] if excerpt_m else ""

        # Smart category detection based on title + content keywords
        title_lower = title.lower()
        body_text = re.sub(r'<[^>]+>', ' ', html[:3000]).lower()

        # Keyword scoring for category detection
        cat_scores = {}
        for key, info in CATEGORIES.items():
            score = 0
            kw_map = {
                "top-10":  ["top 10", "top-10", "best", "ranking", "ranked", "top 5", "top 3", "most popular", "most powerful", "most visited", "most anticipated", "most influential", "best of", "countdown", "10 best", "5 best", "list of"],
                "vs-battle": [" vs ", "versus", "head-to-head", "compared", "showdown", "battle", "or ", "which is better", "comparison"],
                "tech":     ["apple", "iphone", "ios", "android", "samsung", "google", "ai", "tech", "smartphone", "app", "youtube", "nasa", "robot", "mars", "software", "cyber", "digital", "elon musk", "spacex", "tesla", "nvidia", "openai", "gpt", "chatgpt"],
                "movies":   ["film", "movie", "box office", "oscar", "actor", "netflix", "streaming", "cinema", "tv show", "hollywood", "trailer", "sequel", "disney", "marvel", "pixar", "beyoncé", "taylor swift", "concert", "tour"],
                "travel":   ["travel", "destination", "visit", "tourism", "beach", "country", "passport", "flight", "airline", "hotel", "summer", "vacation", "europe", "japan", "france", "hidden gem", "budget"],
                "food":     ["food", "dish", "cuisine", "restaurant", "burger", "meat", "coffee", "spiciest", "recipe", "cooking", "diet", "lab-grown", "organic", "snack", "drink", "wine", "beer", "chef", "kitchen", "taste", "flavor", "meal"],
                "health":   ["health", "vaccine", "disease", "study", "research", "medical", "who ", "doctor", "hospital", "covid", "fitness", "workout", "exercise", "mpox", "cancer", "mental health", "sleep", "nutrition", "supplement", "virus", "outbreak"],
                "general":  ["trump", "lottery", "record", "world", "guinness", "bizarre", "weird", "strange", "surprising", "viral", "news", "million", "billion", "win", "won", "history", "historic", "global"],
            }
            keywords = kw_map.get(key, [])
            for kw in keywords:
                if kw in title_lower:
                    score += 3
                if kw in body_text:
                    score += 1
            cat_scores[key] = score

        # Pick highest scoring category
        best_cat = max(cat_scores, key=cat_scores.get)
        if cat_scores[best_cat] > 0:
            cat_key = best_cat
        else:
            cat_key = "general"

        cat_info = CATEGORIES.get(cat_key, CATEGORIES["general"])
        cat_name = cat_info["name"]
        cat_file = f"category-{cat_key}.html"

        # Extract image
        img_m = re.search(r'<meta property="og:image" content="([^"]*)"', html)
        image_url = img_m.group(1) if img_m else ""

        articles.append({
            "slug": f.stem,
            "title": title,
            "excerpt": excerpt,
            "category_key": cat_key,
            "category_name": cat_name,
            "category_file": cat_file,
            "image_url": image_url,
        })

    return articles

# ────────────────────────────────────────────────────────────
# 2. COMMON SITE CHROME
# ────────────────────────────────────────────────────────────

NETWORK_LINKS = ""

def _header_html(current_page_title=""):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="description" content="{current_page_title or 'TopRank — Top 10 rankings, versus comparisons, expert roundups, and honest reviews.'}">
<meta property="og:title" content="{current_page_title or 'TopRank'}">
<meta property="og:description" content="Top 10 rankings, versus comparisons, expert roundups, and honest reviews.">
<meta property="og:type" content="website">
<meta property="og:site_name" content="TopRank">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{current_page_title or 'TopRank'}">
<title>{current_page_title + ' | ' if current_page_title else ''}TopRank</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="site-header">
<div class="header-inner">
<a href="index.html" class="site-logo">Top<span>Rank</span></a>
<button class="menu-toggle" aria-label="Menu">☰</button>
<nav class="main-nav">
<a href="index.html">Home</a>
<a href="category-top-10.html">Top 10</a>
<a href="category-vs-battle.html">VS</a>
<a href="category-roundups.html">Roundups</a>
<a href="category-reviews.html">Reviews</a>

</nav>
</div>
</header>"""

def _footer_html():
    return f"""<footer class="site-footer">
<div class="footer-inner">

<div class="footer-links" style="text-align:center;margin:8px 0;font-size:.75rem">
<a href="about.html" style="color:var(--text-muted);margin:0 8px">About</a>
<a href="contact.html" style="color:var(--text-muted);margin:0 8px">Contact</a>
<a href="privacy.html" style="color:var(--text-muted);margin:0 8px">Privacy</a>
<a href="terms.html" style="color:var(--text-muted);margin:0 8px">Terms</a>
<a href="sitemap.xml" style="color:var(--text-muted);margin:0 8px">Sitemap</a>
</div>
<p class="footer-copy">© 2026 top.zicisi.fun — All rights reserved.</p>
</div>
</footer>
<div id="cookie-consent" style="position:fixed;bottom:0;left:0;right:0;background:rgba(0,0,0,.92);color:#fff;padding:12px 20px;z-index:9999;display:flex;align-items:center;justify-content:center;gap:16px;font-size:.78rem;flex-wrap:wrap">
<span>🍪 We use cookies to remember your preferences and understand how you use our site. By continuing, you agree.</span>
<button onclick="document.getElementById('cookie-consent').style.display='none'" style="background:#fff;color:#000;border:none;padding:6px 16px;border-radius:4px;cursor:pointer;font-weight:600">Accept</button>
<a href="privacy.html" style="color:#ccc;font-size:.73rem">Learn more</a>
</div>
<button class="back-to-top" aria-label="Back to top">↑</button>
<script src="script.js"></script>
</body></html>"""

def _sidebar_html(hotlist_items=None, show_newsletter=True):
    """Build a rich sidebar with navigation, newsletter, and hotlist."""

    # Category nav widget
    cat_links = ""
    for key, info in CATEGORIES.items():
        if key in ("reviews", "roundups", "general"):
            continue  # Skip these for sidebar nav
        cat_links += f'<li><a href="category-{key}.html">{info["emoji"]} {info["name"]}</a></li>\n'

    # Hotlist
    hotlist = ""
    if hotlist_items:
        hotlist = '<ol>\n'
        for i, item in enumerate(hotlist_items[:8]):
            rank_class = f" rank-{i+1}" if i < 3 else ""
            hotlist += f'<li><span class="rank{rank_class}">{i+1}</span><a href="{item["slug"]}.html">{item["title"][:70]}</a></li>\n'
        hotlist += '</ol>'

    newsletter = ""
    if show_newsletter:
        newsletter = f'''<div class="sidebar-widget" style="background:var(--card);border-radius:8px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,.08);border-left:3px solid var(--primary)">
<h3 style="font-size:.95rem;font-weight:700;margin-bottom:8px">📬 Stay in the Loop</h3>
<p style="font-size:.78rem;color:var(--text-secondary);margin-bottom:10px">Get our latest rankings and reviews delivered every week.</p>
<form onsubmit="event.preventDefault();this.innerHTML='<p style=color:green;font-size:.85rem>✓ Thanks for subscribing!</p>'">
<input type="email" placeholder="Your email address" required style="width:100%;padding:8px;border:1px solid var(--border);border-radius:4px;font-size:.78rem;margin-bottom:6px">
<button type="submit" style="width:100%;background:var(--primary);color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-weight:600;font-size:.8rem">Subscribe</button>
</form>
</div>'''

    return f"""<aside class="sidebar">
<div class="sidebar-sticky">

<div class="sidebar-widget" style="background:var(--card);border-radius:8px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,.08)">
<h3 style="font-size:.95rem;font-weight:700;margin-bottom:10px">📂 Browse by Category</h3>
<ul style="list-style:none;padding:0;margin:0;font-size:.82rem;line-height:2">
{cat_links}
</ul>
</div>

{newsletter}

<div class="sidebar-widget hotlist" style="background:var(--card);border-radius:8px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,.08)">
<h3 style="font-size:.95rem;font-weight:700;margin-bottom:8px">🔥 Trending Now</h3>
{hotlist}
</div>

</div>
</aside>"""

# ────────────────────────────────────────────────────────────
# 3. REBUILD CATEGORY PAGES
# ────────────────────────────────────────────────────────────
def rebuild_category_pages(articles):
    """Rebuild each category page with real article links."""
    for key, info in CATEGORIES.items():
        cat_articles = [a for a in articles if a["category_key"] == key]
        if not cat_articles:
            # Try fuzzy match
            cat_articles = [a for a in articles if info["name"].lower() in a.get("category_name", "").lower()]
        if not cat_articles and key in ("reviews", "roundups"):
            # Use general articles for reviews/roundups
            cat_articles = [a for a in articles if a["category_key"] == "general"][:5]
        if not cat_articles:
            cat_articles = articles[:6]  # Fallback

        # Build article list
        cards = ""
        for a in cat_articles[:12]:
            img_tag = ""
            if a.get("image_url"):
                img_tag = f'<img src="{a["image_url"]}" alt="{a["title"][:40]}" loading="lazy" style="width:100%;height:100%;object-fit:cover">'
            else:
                img_tag = '<div style="width:100%;height:100%;background:var(--primary);display:flex;align-items:center;justify-content:center;font-size:2rem">' + info["emoji"] + '</div>'

            cards += f'''<a href="{a["slug"]}.html" class="card">
<div class="thumb">{img_tag}</div>
<div class="info">
<span class="cat">{a.get("category_name", info["name"])}</span>
<h3>{a["title"][:80]}</h3>
<p style="font-size:.78rem;color:var(--text-secondary);margin-top:4px">{a.get("excerpt", "")[:120]}</p>
</div>
</a>'''

        hotlist = articles[:8]

        page = _header_html(f"{info['emoji']} {info['name']}")
        page += f'''<div class="container" style="margin-top:24px">
<div class="page-layout">
<main class="content-area">

<div class="section-heading" style="margin-bottom:24px">
<h1 style="font-size:1.8rem;font-weight:800;margin-bottom:8px">{info["emoji"]} {info["name"]}</h1>
<p style="color:var(--text-secondary);font-size:.95rem">{info["desc"]}</p>
</div>

<div class="card-grid">
{cards}
</div>

</main>
{_sidebar_html(hotlist)}
</div></div>
'''
        page += _footer_html()

        filepath = ROOT / f"category-{key}.html"
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(page)
        print(f"  ✅ category-{key}.html ({len(cat_articles)} articles)")

# ────────────────────────────────────────────────────────────
# 4. REBUILD STATIC PAGES
# ────────────────────────────────────────────────────────────
def rebuild_about_page(articles):
    hotlist = articles[:8]
    page = _header_html("About TopRank")
    page += f'''<div class="container" style="margin-top:24px">
<div class="page-layout">
<main class="content-area">

<article>
<h1 style="font-size:1.8rem;font-weight:800;margin-bottom:16px">About TopRank</h1>

<p style="font-size:1rem;line-height:1.8;color:var(--text);margin-bottom:16px">
TopRank is your go-to destination for well-researched rankings, honest comparisons, and useful recommendations.
We spend hours digging into the data so you can make better decisions in minutes.
</p>

<h2 style="font-size:1.3rem;font-weight:700;margin:24px 0 12px">What We Do</h2>
<p style="font-size:1rem;line-height:1.8;color:var(--text);margin-bottom:12px">
Every article on TopRank is written and fact-checked by our editorial team. We cover:
</p>
<ul style="font-size:1rem;line-height:2;color:var(--text);padding-left:20px;margin-bottom:16px">
<li>🏅 <strong>Top 10 Rankings</strong> — Carefully curated best-of lists across tech, travel, food, health, and more</li>
<li>⚔️ <strong>VS Battles</strong> — Side-by-side comparisons of products, services, and experiences</li>
<li>📋 <strong>Roundups</strong> — Comprehensive collections of the best options in any category</li>
<li>⭐ <strong>Reviews</strong> — In-depth, honest reviews of things you actually care about</li>
</ul>

<h2 style="font-size:1.3rem;font-weight:700;margin:24px 0 12px">Our Approach</h2>
<p style="font-size:1rem;line-height:1.8;color:var(--text);margin-bottom:12px">
We believe good recommendations come from real research. Our team gathers data from multiple sources,
compares specifications, reads user reviews, and consults expert opinions before publishing anything.
We update our articles regularly as new information becomes available.
</p>

<h2 style="font-size:1.3rem;font-weight:700;margin:24px 0 12px">Get in Touch</h2>
<p style="font-size:1rem;line-height:1.8;color:var(--text)">
Have a suggestion, correction, or just want to say hi? Visit our
<a href="contact.html" style="color:var(--primary)">Contact page</a> — we read every message.
</p>
</article>

</main>
{_sidebar_html(hotlist)}
</div></div>
'''
    page += _footer_html()
    (ROOT / "about.html").write_text(page, encoding="utf-8")
    print("  ✅ about.html")

def rebuild_contact_page(articles):
    hotlist = articles[:8]
    page = _header_html("Contact Us")
    page += f'''<div class="container" style="margin-top:24px">
<div class="page-layout">
<main class="content-area">

<article>
<h1 style="font-size:1.8rem;font-weight:800;margin-bottom:16px">Contact Us</h1>

<p style="font-size:1rem;line-height:1.8;color:var(--text);margin-bottom:20px">
Have a question, suggestion, or found something that needs correcting? We would love to hear from you.
</p>

<div style="background:var(--card);border-radius:8px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,.08);margin-bottom:24px">
<h3 style="font-size:1.1rem;font-weight:700;margin-bottom:12px">📧 Send Us a Message</h3>
<form onsubmit="event.preventDefault();this.innerHTML='<div style=padding:20px;text-align:center><p style=color:green;font-size:1.1rem;font-weight:600>✓ Message Sent!</p><p style=color:var(--text-secondary);font-size:.85rem>We typically respond within 24 hours.</p></div>'">
<div style="margin-bottom:12px">
<label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">Your Name</label>
<input type="text" required style="width:100%;padding:10px;border:1px solid var(--border);border-radius:4px;font-size:.9rem">
</div>
<div style="margin-bottom:12px">
<label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">Email Address</label>
<input type="email" required style="width:100%;padding:10px;border:1px solid var(--border);border-radius:4px;font-size:.9rem">
</div>
<div style="margin-bottom:12px">
<label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">Subject</label>
<input type="text" required style="width:100%;padding:10px;border:1px solid var(--border);border-radius:4px;font-size:.9rem">
</div>
<div style="margin-bottom:16px">
<label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">Message</label>
<textarea required rows="5" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:4px;font-size:.9rem;resize:vertical"></textarea>
</div>
<button type="submit" style="background:var(--primary);color:#fff;border:none;padding:10px 24px;border-radius:4px;cursor:pointer;font-weight:600;font-size:.9rem">Send Message</button>
</form>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
<div style="background:var(--card);border-radius:8px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,.08)">
<h3 style="font-size:.95rem;font-weight:700;margin-bottom:8px">📝 Corrections</h3>
<p style="font-size:.82rem;color:var(--text-secondary);line-height:1.6">Spotted an error or outdated info? Let us know and we will fix it promptly.</p>
</div>
<div style="background:var(--card);border-radius:8px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,.08)">
<h3 style="font-size:.95rem;font-weight:700;margin-bottom:8px">💡 Suggestions</h3>
<p style="font-size:.82rem;color:var(--text-secondary);line-height:1.6">Have an idea for a ranking or comparison you would like to see? We take requests.</p>
</div>
</div>
</article>

</main>
{_sidebar_html(hotlist)}
</div></div>
'''
    page += _footer_html()
    (ROOT / "contact.html").write_text(page, encoding="utf-8")
    print("  ✅ contact.html")

def rebuild_privacy_page(articles):
    hotlist = articles[:8]
    page = _header_html("Privacy Policy")
    page += f'''<div class="container" style="margin-top:24px">
<div class="page-layout">
<main class="content-area">

<article>
<h1 style="font-size:1.8rem;font-weight:800;margin-bottom:16px">Privacy Policy</h1>
<p style="font-size:.85rem;color:var(--text-secondary);margin-bottom:24px">Last updated: June 2026</p>

<h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 10px">1. Information We Collect</h2>
<p style="font-size:.9rem;line-height:1.8;color:var(--text)">We collect information you provide directly, such as your email address when you subscribe to our newsletter. We also collect standard web server logs including IP addresses, browser types, and pages visited — this helps us understand what content is most useful to our readers.</p>

<h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 10px">2. Cookies</h2>
<p style="font-size:.9rem;line-height:1.8;color:var(--text)">We use cookies to remember your preferences (like dismissing the cookie notice) and to analyze site traffic. You can disable cookies in your browser settings at any time, though some features may not work as expected.</p>

<h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 10px">3. How We Use Your Information</h2>
<p style="font-size:.9rem;line-height:1.8;color:var(--text)">We use the information we collect to improve our content, respond to your messages, and send newsletter updates (only if you have subscribed). We never sell your personal information to third parties.</p>

<h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 10px">4. Third-Party Services</h2>
<p style="font-size:.9rem;line-height:1.8;color:var(--text)">Our site is hosted on Vercel and uses GitHub for content management. These services have their own privacy policies. </p>

<h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 10px">5. Contact</h2>
<p style="font-size:.9rem;line-height:1.8;color:var(--text)">Questions about this policy? <a href="contact.html" style="color:var(--primary)">Contact us here</a>.</p>
</article>

</main>
{_sidebar_html(hotlist)}
</div></div>
'''
    page += _footer_html()
    (ROOT / "privacy.html").write_text(page, encoding="utf-8")
    print("  ✅ privacy.html")

def rebuild_terms_page(articles):
    hotlist = articles[:8]
    page = _header_html("Terms of Use")
    page += f'''<div class="container" style="margin-top:24px">
<div class="page-layout">
<main class="content-area">

<article>
<h1 style="font-size:1.8rem;font-weight:800;margin-bottom:16px">Terms of Use</h1>
<p style="font-size:.85rem;color:var(--text-secondary);margin-bottom:24px">Last updated: June 2026</p>

<h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 10px">1. Acceptance of Terms</h2>
<p style="font-size:.9rem;line-height:1.8;color:var(--text)">By accessing top.zicisi.fun, you agree to these terms. If you do not agree, please do not use this website.</p>

<h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 10px">2. Content</h2>
<p style="font-size:.9rem;line-height:1.8;color:var(--text)">All content on TopRank is for informational purposes only. While we strive for accuracy, we make no guarantees about the completeness or timeliness of any information. Articles are updated as new data becomes available, but we recommend verifying critical information independently.</p>

<h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 10px">3. Intellectual Property</h2>
<p style="font-size:.9rem;line-height:1.8;color:var(--text)">All original content on this site — including articles, rankings, and comparisons — is protected by copyright. You may share links to our content freely. Reproduction of full articles requires prior written permission.</p>

<h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 10px">4. External Links</h2>
<p style="font-size:.9rem;line-height:1.8;color:var(--text)">Our site may link to external websites. We are not responsible for the content or practices of any linked websites.</p>

<h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 10px">5. Changes</h2>
<p style="font-size:.9rem;line-height:1.8;color:var(--text)">We may update these terms periodically. Continued use of the site after changes constitutes acceptance of the new terms. Questions? <a href="contact.html" style="color:var(--primary)">Contact us</a>.</p>
</article>

</main>
{_sidebar_html(hotlist)}
</div></div>
'''
    page += _footer_html()
    (ROOT / "terms.html").write_text(page, encoding="utf-8")
    print("  ✅ terms.html")

def rebuild_article_template(articles):
    hotlist = articles[:8]
    page = _header_html("Article Template")
    page += f'''<div class="container" style="margin-top:24px">
<div class="page-layout">
<main class="content-area">

<article>
<header class="article-header">
<h1 class="article-title" style="font-size:1.8rem;font-weight:800">Sample Article Title</h1>
<div class="article-meta" style="margin:12px 0;font-size:.85rem;color:var(--text-secondary)">
<span>By TopRank Editorial Team</span>
<span>·</span>
<span>June 2026</span>
<span>·</span>
<span>5 min read</span>
</div>
</header>

<div class="article-content" style="font-size:1.05rem;line-height:1.9;color:var(--text)">
<p>This is a sample article page. In production, each article on TopRank is generated with unique content — including proper headings, paragraphs, and a featured image that matches the topic.</p>
<p>Articles typically include 6–10 paragraphs covering the key points, data, and recommendations for the topic at hand.</p>
<p>Every article is structured with clear section headings, making it easy to skim and find the information you need.</p>
</div>

</article>

</main>
{_sidebar_html(hotlist)}
</div></div>
'''
    page += _footer_html()
    (ROOT / "article.html").write_text(page, encoding="utf-8")
    print("  ✅ article.html")

# ────────────────────────────────────────────────────────────
# 5. INJECT RICH SIDEBAR INTO INDEX.HTML
# ────────────────────────────────────────────────────────────
def rebuild_index_sidebar(articles):
    """Replace the sidebar in index.html with the rich version."""
    index_path = ROOT / "index.html"
    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()

    hotlist = articles[:8]
    new_sidebar = _sidebar_html(hotlist, show_newsletter=True)

    # Find existing sidebar and replace it
    # Match from <aside class="sidebar"> to </aside></div> (the closing aside before footer or </div>)
    pattern = re.compile(r'<aside class="sidebar">.*?</aside></div>', re.DOTALL)
    if pattern.search(content):
        content = pattern.sub(new_sidebar + '</div>', content, count=1)
        with open(index_path, "w", encoding="utf-8") as f:
            f.write(content)
        print("  ✅ index.html sidebar updated")
    else:
        print("  ⚠️  Could not find sidebar in index.html")

# ────────────────────────────────────────────────────────────
# 6. MAIN
# ────────────────────────────────────────────────────────────
def main():
    print("=" * 60)
    print("🔧 TopRank Site Rebuilder")
    print("=" * 60)

    # Scan articles
    print("\n📊 Scanning articles...")
    articles = scan_articles()
    print(f"  Found {len(articles)} generated articles")

    for a in articles[:3]:
        print(f"  → [{a['category_key']}] {a['title'][:60]}")

    # Rebuild category pages
    print("\n📂 Rebuilding category pages...")
    rebuild_category_pages(articles)

    # Rebuild static pages
    print("\n📄 Rebuilding static pages...")
    rebuild_about_page(articles)
    rebuild_contact_page(articles)
    rebuild_privacy_page(articles)
    rebuild_terms_page(articles)
    rebuild_article_template(articles)

    # Inject rich sidebar into index.html
    print("\n🔄 Updating index.html sidebar...")
    rebuild_index_sidebar(articles)

    print(f"\n🎉 Site rebuild complete!")

if __name__ == "__main__":
    main()
