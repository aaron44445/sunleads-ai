#!/usr/bin/env python3
"""
Weekly SEO report -> Slack.

Crawls the live site, compares against the previous run, and posts a summary
to a Slack incoming webhook. Stdlib only, so CI needs no pip install.

Usage:
    SLACK_WEBHOOK_URL=... python3 report.py https://www.sunleadsai.com

    --state PATH   previous run's JSON, for week-over-week diffing
    --dry-run      print the payload instead of posting
"""

import argparse
import json
import os
import sys
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from audit import crawl, fetch, normalize, site_checks  # noqa: E402

SEV_EMOJI = {"critical": "🔴", "warn": "🟡", "info": "🔵"}


def collect(root, max_pages):
    head = fetch(root)
    if head.ok and normalize(head.url) != normalize(root):
        root = normalize(head.url)
    site = site_checks(root)
    pages = crawl(root, max_pages)
    return root, site, pages


def flatten_issues(site, pages):
    out = [dict(i, url=None) for i in site["issues"]]
    for pg in pages:
        for i in pg.get("issues", []):
            out.append(dict(i, url=pg["url"]))
    return out


def diff(prev, curr):
    """Return (fixed, introduced) as sorted lists of "code @ url" keys."""
    if not prev:
        return [], []

    def keys(issues):
        return {f"{i['code']} @ {i.get('url') or 'site-wide'}" for i in issues}

    p, c = keys(prev), keys(curr)
    return sorted(p - c), sorted(c - p)


def build_blocks(root, site, pages, issues, fixed, introduced, had_prev):
    counts = {"critical": 0, "warn": 0, "info": 0}
    for i in issues:
        counts[i["severity"]] = counts.get(i["severity"], 0) + 1

    reachable = [p for p in pages if not p.get("error") and p.get("status", 0) < 400]

    blocks = [
        {"type": "header",
         "text": {"type": "plain_text", "text": "Weekly SEO Report"}},
        {"type": "section", "fields": [
            {"type": "mrkdwn", "text": f"*Site*\n{root}"},
            {"type": "mrkdwn", "text": f"*Pages crawled*\n{len(pages)}"},
            {"type": "mrkdwn",
             "text": f"*Issues*\n🔴 {counts['critical']}  🟡 {counts['warn']}  🔵 {counts['info']}"},
            {"type": "mrkdwn",
             "text": f"*Sitemap*\n{site.get('sitemap') or '❌ missing'}"},
        ]},
    ]

    if had_prev:
        change = []
        if fixed:
            change.append(f"✅ *Fixed since last run ({len(fixed)})*\n" +
                          "\n".join(f"• {k}" for k in fixed[:8]))
        if introduced:
            change.append(f"⚠️ *New since last run ({len(introduced)})*\n" +
                          "\n".join(f"• {k}" for k in introduced[:8]))
        if not change:
            change.append("_No change since last run._")
        blocks.append({"type": "section",
                       "text": {"type": "mrkdwn", "text": "\n\n".join(change)}})
    else:
        blocks.append({"type": "context", "elements": [
            {"type": "mrkdwn",
             "text": "_First run — no previous state to compare against._"}]})

    # Group so one problem across N pages is one line, not N.
    grouped = {}
    for i in issues:
        grouped.setdefault((i["severity"], i["code"], i["message"]), []).append(i["url"])

    order = {"critical": 0, "warn": 1, "info": 2}
    top = sorted(grouped.items(), key=lambda kv: order.get(kv[0][0], 3))[:10]
    if top:
        lines = []
        for (sev, code, msg), urls in top:
            real = [u for u in urls if u]
            scope = f"{len(real)} page(s)" if real else "site-wide"
            lines.append(f"{SEV_EMOJI[sev]} *{code}* ({scope}) — {msg}")
        blocks.append({"type": "section",
                       "text": {"type": "mrkdwn",
                                "text": "*Open issues*\n" + "\n".join(lines)}})

    slow = [p for p in reachable if p.get("elapsed_s", 0) > 2.0]
    if slow:
        blocks.append({"type": "context", "elements": [
            {"type": "mrkdwn",
             "text": f"⏱ {len(slow)} page(s) responded slower than 2s"}]})

    return blocks


def post(webhook, payload):
    req = urllib.request.Request(
        webhook,
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return resp.read().decode()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--max", type=int, default=40)
    ap.add_argument("--state", default="seo-state.json")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument(
        "--only-on-change",
        action="store_true",
        help="Post only when the issue set differs from the previous run. Lets "
             "the job run daily for fast signal without a daily notification.",
    )
    ap.add_argument(
        "--weekly-digest",
        action="store_true",
        help="Post even with no change (pair with --only-on-change on one "
             "scheduled run per week, so silence never means 'job is broken').",
    )
    a = ap.parse_args()

    webhook = os.environ.get("SLACK_WEBHOOK_URL")
    if not webhook and not a.dry_run:
        sys.exit("SLACK_WEBHOOK_URL is not set")

    prev = None
    if os.path.exists(a.state):
        try:
            with open(a.state) as fh:
                prev = json.load(fh).get("issues")
        except (json.JSONDecodeError, OSError) as e:
            print(f"Could not read previous state: {e}", file=sys.stderr)

    root, site, pages = collect(a.url, a.max)
    issues = flatten_issues(site, pages)
    fixed, introduced = diff(prev, issues)

    changed = bool(fixed or introduced)
    first_run = prev is None

    # Always write state, even when staying silent — otherwise a change would
    # be re-reported on every subsequent run.
    with open(a.state, "w") as fh:
        json.dump({"root": root, "issues": issues}, fh, indent=2)

    if a.only_on_change and not changed and not first_run and not a.weekly_digest:
        print("No change since last run; not posting.")
        return

    payload = {
        "text": f"SEO report for {root}",  # notification fallback
        "blocks": build_blocks(root, site, pages, issues, fixed, introduced,
                               not first_run),
    }

    if a.dry_run:
        print(json.dumps(payload, indent=2))
    else:
        print(post(webhook, payload))


if __name__ == "__main__":
    main()
