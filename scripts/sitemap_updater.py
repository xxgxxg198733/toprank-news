#!/usr/bin/env python3
"""Sitemap updater — regenerates sitemap.xml for a site after new articles are added."""

from datetime import datetime
from pathlib import Path

from config import BASE, SITES


def update_sitemap(site_key):
    """Regenerate sitemap.xml for a site based on all .html files present."""
    site_config = SITES[site_key]
    site_dir = BASE / site_config["folder"]
    domain = site_config["domain"]
    today = datetime.now().strftime("%Y-%m-%d")

    html_files = sorted(site_dir.glob("*.html"))

    urls = []
    for f in html_files:
        filename = f.name
        # Determine priority
        if filename == "index.html":
            priority = "1.0"
        elif filename.startswith("category-"):
            priority = "0.8"
        else:
            priority = "0.6"

        urls.append(f"""  <url>
    <loc>https://{domain}/{filename}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>{priority}</priority>
  </url>""")

    sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(urls)}
</urlset>
"""

    sitemap_path = site_dir / "sitemap.xml"
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(sitemap)

    print(f"  ✅ {site_config['name']}: {len(urls)} URLs in sitemap.xml")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Sitemap Updater")
    parser.add_argument("--site", default="all",
                        choices=["all", "viralnow", "weirdworld", "toprank"])
    args = parser.parse_args()

    targets = list(SITES.keys()) if args.site == "all" else [args.site]
    for site_key in targets:
        update_sitemap(site_key)
