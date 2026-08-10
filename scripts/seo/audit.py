#!/usr/bin/env python3
"""
SEO audit crawler. Stdlib only - no pip install required.

Usage:
    python3 audit.py https://example.com                 # crawl + audit
    python3 audit.py https://example.com --max 50        # cap pages
    python3 audit.py https://example.com --json out.json # machine-readable

Checks per page: title, meta description, canonical, H1 count, word count,
Open Graph, Twitter card, JSON-LD schema, image alt text, internal/external
links, noindex directives, response time.

Site-level: robots.txt, sitemap.xml, apex/www redirect type, HTTPS.
"""

import argparse
import gzip
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import OrderedDict

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/122.0 Safari/537.36")

# Google truncates titles ~580px and descriptions ~920px; char counts are the
# practical proxy everyone uses.
TITLE_MIN, TITLE_MAX = 30, 60
DESC_MIN, DESC_MAX = 70, 160
THIN_CONTENT_WORDS = 300


class Fetch:
    """Fetch result. .ok is False when the request failed outright."""

    def __init__(self, url, status=0, body="", headers=None, elapsed=0.0, error=None):
        self.url = url
        self.status = status
        self.body = body
        self.headers = headers or {}
        self.elapsed = elapsed
        self.error = error

    @property
    def ok(self):
        return self.error is None and 200 <= self.status < 300


def fetch(url, timeout=20, follow=True):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    start = time.time()
    try:
        opener = urllib.request.build_opener()
        if not follow:
            opener = urllib.request.build_opener(NoRedirect)
        with opener.open(req, timeout=timeout) as resp:
            raw = resp.read()
            if resp.headers.get("Content-Encoding") == "gzip":
                raw = gzip.decompress(raw)
            body = raw.decode("utf-8", errors="replace")
            return Fetch(resp.geturl(), resp.status, body, dict(resp.headers),
                         time.time() - start)
    except urllib.error.HTTPError as e:
        # HTTPError is a valid response - we care about 3xx/4xx status codes.
        return Fetch(url, e.code, "", dict(e.headers or {}), time.time() - start)
    except Exception as e:
        return Fetch(url, 0, "", {}, time.time() - start, error=str(e))


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **kw):
        return None


def normalize(url):
    """Collapse trailing-slash variants so '/x' and '/x/' aren't crawled twice.
    The bare origin keeps its slash, since '' is not a valid path."""
    p = urllib.parse.urlparse(url)
    path = p.path.rstrip("/") or "/"
    return p._replace(path=path, fragment="", query="").geturl()


def strip_tags(html):
    html = re.sub(r"<(script|style|noscript)[^>]*>.*?</\1>", " ", html,
                  flags=re.S | re.I)
    return re.sub(r"<[^>]+>", " ", html)


def text_of(html):
    return re.sub(r"\s+", " ", strip_tags(html)).strip()


def attr(tag, name):
    m = re.search(rf'{name}\s*=\s*["\']([^"\']*)["\']', tag, re.I)
    return m.group(1) if m else None


def audit_page(url, f):
    """Extract SEO signals from one page. Returns (data, issues)."""
    issues = []
    html = f.body
    head = html[:html.find("</head>")] if "</head>" in html else html
    body_html = html[html.find("</head>"):] if "</head>" in html else html

    def add(sev, code, msg):
        issues.append({"severity": sev, "code": code, "message": msg})

    # --- title ---
    m = re.search(r"<title[^>]*>(.*?)</title>", head, re.S | re.I)
    title = text_of(m.group(1)) if m else None
    if not title:
        add("critical", "title-missing", "No <title> tag")
    elif len(title) > TITLE_MAX:
        add("warn", "title-long",
            f"Title {len(title)} chars (>{TITLE_MAX}) - will truncate in SERPs")
    elif len(title) < TITLE_MIN:
        add("warn", "title-short", f"Title only {len(title)} chars - wasting SERP space")

    # --- meta tags ---
    metas = re.findall(r"<meta[^>]*>", head, re.I)
    desc = og = tw = None
    robots_meta = None
    og_tags, tw_tags = set(), set()
    for tag in metas:
        name = (attr(tag, "name") or "").lower()
        prop = (attr(tag, "property") or "").lower()
        content = attr(tag, "content")
        if name == "description":
            desc = content
        elif name == "robots":
            robots_meta = (content or "").lower()
        elif prop.startswith("og:"):
            og_tags.add(prop)
            og = True
        elif name.startswith("twitter:"):
            tw_tags.add(name)
            tw = True

    if not desc:
        add("critical", "desc-missing", "No meta description - Google writes its own")
    elif len(desc) > DESC_MAX:
        add("warn", "desc-long", f"Meta description {len(desc)} chars (>{DESC_MAX})")
    elif len(desc) < DESC_MIN:
        add("info", "desc-short", f"Meta description only {len(desc)} chars")

    if robots_meta and "noindex" in robots_meta:
        add("critical", "noindex", "Page is set to noindex - excluded from Google")

    required_og = {"og:title", "og:description", "og:image", "og:url", "og:type"}
    if not og:
        add("warn", "og-missing", "No Open Graph tags - bare social share previews")
    else:
        missing = required_og - og_tags
        if missing:
            add("info", "og-incomplete", f"Missing OG tags: {', '.join(sorted(missing))}")
    if not tw:
        add("info", "twitter-missing", "No Twitter card tags")

    # --- canonical ---
    canon = None
    for tag in re.findall(r"<link[^>]*>", head, re.I):
        if (attr(tag, "rel") or "").lower() == "canonical":
            canon = attr(tag, "href")
    if not canon:
        add("warn", "canonical-missing", "No canonical URL - duplicate content risk")

    # --- headings ---
    h1s = [text_of(h) for h in re.findall(r"<h1[^>]*>(.*?)</h1>", html, re.S | re.I)]
    if not h1s:
        add("critical", "h1-missing", "No <h1> on page")
    elif len(h1s) > 1:
        add("warn", "h1-multiple", f"{len(h1s)} <h1> tags - should be exactly 1")
    h2s = [text_of(h) for h in re.findall(r"<h2[^>]*>(.*?)</h2>", html, re.S | re.I)]

    # --- structured data ---
    schema_types = []
    for block in re.findall(
            r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', html, re.S | re.I):
        try:
            data = json.loads(block.strip())
            for node in (data if isinstance(data, list) else [data]):
                if isinstance(node, dict):
                    t = node.get("@type")
                    schema_types.extend(t if isinstance(t, list) else [t])
                    for sub in node.get("@graph", []):
                        if isinstance(sub, dict) and sub.get("@type"):
                            st = sub["@type"]
                            schema_types.extend(st if isinstance(st, list) else [st])
        except json.JSONDecodeError:
            add("warn", "schema-invalid", "JSON-LD block failed to parse")
    schema_types = [s for s in schema_types if s]
    if not schema_types:
        add("warn", "schema-missing", "No JSON-LD structured data")

    # --- content depth ---
    words = len(text_of(body_html).split())
    if words < THIN_CONTENT_WORDS:
        add("warn", "thin-content",
            f"Only ~{words} words - thin for ranking purposes")

    # --- images ---
    imgs = re.findall(r"<img[^>]*>", html, re.I)
    no_alt = [i for i in imgs if attr(i, "alt") is None]
    if no_alt:
        add("warn", "img-alt", f"{len(no_alt)}/{len(imgs)} images missing alt text")

    # --- links ---
    host = urllib.parse.urlparse(url).netloc
    internal, external = set(), set()
    for a in re.findall(r'<a[^>]*href\s*=\s*["\']([^"\']+)["\']', html, re.I):
        if a.startswith(("mailto:", "tel:", "javascript:", "#")):
            continue
        full = urllib.parse.urljoin(url, a)
        p = urllib.parse.urlparse(full)
        if p.scheme not in ("http", "https"):
            continue
        clean = normalize(p._replace(fragment="", query="").geturl())
        if p.netloc == host:
            if not re.search(r"\.(css|js|woff2?|png|jpe?g|svg|ico|webp|xml|txt)$", p.path, re.I):
                internal.add(clean)
        else:
            external.add(clean)

    if f.elapsed > 2.0:
        add("warn", "slow", f"Response took {f.elapsed:.1f}s")

    return {
        "url": url,
        "status": f.status,
        "elapsed_s": round(f.elapsed, 2),
        "title": title,
        "title_len": len(title) if title else 0,
        "description": desc,
        "desc_len": len(desc) if desc else 0,
        "canonical": canon,
        "h1": h1s,
        "h2": h2s,
        "schema_types": sorted(set(schema_types)),
        "word_count": words,
        "images": len(imgs),
        "images_no_alt": len(no_alt),
        "internal_links": sorted(internal),
        "external_links": len(external),
        "og": sorted(og_tags),
        "issues": issues,
    }, internal


def site_checks(root):
    """Site-wide checks that aren't per-page."""
    out = {"issues": []}
    p = urllib.parse.urlparse(root)
    origin = f"{p.scheme}://{p.netloc}"

    def add(sev, code, msg):
        out["issues"].append({"severity": sev, "code": code, "message": msg})

    if p.scheme != "https":
        add("critical", "no-https", "Site is not served over HTTPS")

    r = fetch(f"{origin}/robots.txt")
    out["robots_txt"] = r.status
    if not r.ok:
        add("critical", "robots-missing", f"/robots.txt returned {r.status}")
    else:
        out["robots_body"] = r.body[:2000]
        if "sitemap:" not in r.body.lower():
            add("warn", "robots-no-sitemap", "robots.txt does not reference a sitemap")
        if re.search(r"^\s*disallow:\s*/\s*$", r.body, re.I | re.M):
            add("critical", "robots-blocks-all", "robots.txt has 'Disallow: /' - blocking crawlers")

    found_sitemap = None
    for path in ("/sitemap.xml", "/sitemap_index.xml", "/sitemap-index.xml"):
        s = fetch(f"{origin}{path}")
        if s.ok:
            found_sitemap = path
            out["sitemap_urls"] = len(re.findall(r"<loc>", s.body))
            break
    out["sitemap"] = found_sitemap
    if not found_sitemap:
        add("critical", "sitemap-missing", "No sitemap.xml found")

    # apex vs www: a permanent redirect (301/308) is required to consolidate
    # link equity. 302/307 are temporary and dilute it.
    bare = p.netloc[4:] if p.netloc.startswith("www.") else p.netloc
    for host in (bare, f"www.{bare}"):
        rr = fetch(f"{p.scheme}://{host}/", follow=False)
        if rr.status in (301, 302, 307, 308):
            loc = rr.headers.get("Location", "")
            out[f"redirect_{host}"] = f"{rr.status} -> {loc}"
            if rr.status in (302, 307):
                # Not merely an equity leak. Google does not transfer canonical
                # status across a temporary redirect, so the redirecting host
                # stays canonical while the target serves the content. Paired
                # with missing canonical tags, this is how a site ends up
                # indexed under the hostname that serves nothing.
                add("critical", "temp-redirect",
                    f"{host} uses {rr.status} (temporary) -> should be 301/308. "
                    "Google keeps the redirecting host canonical across a "
                    "temporary redirect, so the wrong hostname gets indexed.")
        elif rr.status:
            out[f"redirect_{host}"] = f"{rr.status} (no redirect)"
    return out


def crawl(root, max_pages):
    seen, queue, pages = set(), [normalize(root)], []
    while queue and len(pages) < max_pages:
        url = queue.pop(0)
        if url in seen:
            continue
        seen.add(url)
        f = fetch(url)
        if not f.ok:
            pages.append({"url": url, "status": f.status, "error": f.error,
                          "issues": [{"severity": "critical", "code": "unreachable",
                                      "message": f"HTTP {f.status}" + (f" / {f.error}" if f.error else "")}]})
            continue
        data, links = audit_page(url, f)
        pages.append(data)
        print(f"  [{len(pages):>3}] {f.status} {url}", file=sys.stderr)
        for link in sorted(links):
            if link not in seen and len(seen) + len(queue) < max_pages * 3:
                queue.append(link)
    return pages


def report(root, site, pages):
    lines = [f"# SEO Audit — {root}", ""]
    sev_rank = {"critical": 0, "warn": 1, "info": 2}

    all_issues = list(site["issues"])
    for pg in pages:
        for i in pg.get("issues", []):
            all_issues.append({**i, "url": pg["url"]})

    counts = {"critical": 0, "warn": 0, "info": 0}
    for i in all_issues:
        counts[i["severity"]] = counts.get(i["severity"], 0) + 1

    lines += [
        f"**Pages crawled:** {len(pages)}",
        f"**Issues:** {counts['critical']} critical · {counts['warn']} warnings · {counts['info']} info",
        "",
        "## Site-level",
        "",
        f"- robots.txt: `{site.get('robots_txt')}`",
        f"- sitemap: `{site.get('sitemap') or 'MISSING'}`"
        + (f" ({site['sitemap_urls']} URLs)" if site.get("sitemap_urls") else ""),
    ]
    for k, v in site.items():
        if k.startswith("redirect_"):
            lines.append(f"- {k.replace('redirect_', '')}: `{v}`")

    # Group issues by code so a problem on 40 pages is one line, not 40.
    lines += ["", "## Issues by type", ""]
    grouped = OrderedDict()
    for i in sorted(all_issues, key=lambda x: sev_rank.get(x["severity"], 3)):
        grouped.setdefault((i["severity"], i["code"], i["message"]), []).append(i.get("url"))
    for (sev, code, msg), urls in grouped.items():
        tag = {"critical": "🔴", "warn": "🟡", "info": "🔵"}[sev]
        real = [u for u in urls if u]
        scope = f" — {len(real)} page(s)" if real else " — site-wide"
        lines.append(f"- {tag} **{code}**{scope}: {msg}")
        for u in real[:5]:
            lines.append(f"    - {u}")
        if len(real) > 5:
            lines.append(f"    - …and {len(real) - 5} more")

    lines += ["", "## Page inventory", "",
              "| URL | Status | Title len | Desc len | H1 | Words | Schema |",
              "|---|---|---|---|---|---|---|"]
    for pg in pages:
        if pg.get("error") or pg.get("status", 0) >= 400:
            lines.append(f"| {pg['url']} | {pg.get('status')} | — | — | — | — | — |")
            continue
        lines.append(
            f"| {pg['url']} | {pg['status']} | {pg['title_len']} | {pg['desc_len']} "
            f"| {len(pg['h1'])} | {pg['word_count']} "
            f"| {', '.join(pg['schema_types']) or '—'} |")
    return "\n".join(lines)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--max", type=int, default=40, help="max pages to crawl")
    ap.add_argument("--json", help="also write raw JSON here")
    a = ap.parse_args()

    root = a.url if a.url.startswith("http") else f"https://{a.url}"
    # Normalize to the URL the server actually serves, so the crawler doesn't
    # treat the redirect target as an external host and stop after one page.
    head = fetch(root)
    if head.ok and head.url != root:
        print(f"Following redirect: {root} -> {head.url}", file=sys.stderr)
        root = head.url.rstrip("/")

    print(f"Crawling {root} (max {a.max})…", file=sys.stderr)
    site = site_checks(root)
    pages = crawl(root, a.max)
    out = report(root, site, pages)
    print(out)

    if a.json:
        with open(a.json, "w") as fh:
            json.dump({"root": root, "site": site, "pages": pages}, fh, indent=2)
        print(f"\nJSON -> {a.json}", file=sys.stderr)


if __name__ == "__main__":
    main()
