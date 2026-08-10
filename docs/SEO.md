# SEO — state, decisions, and what's next

Working notes for the SEO effort on sunleadsai.com. Written so a new session
(or a new person) can pick this up without re-deriving anything.

Last updated: 2026-08-05

---

## The goal

Get sunleadsai.com found in organic search by solar company owners, and convert
that traffic into booked strategy calls.

## The single most important fact

**As of 2026-08-05, none of the site's pages are indexed by Google.** All four
URLs return "URL is not on Google" in Search Console. This is not a ranking
problem — the pages are absent from the index entirely.

That reframes priorities: the first job was fixing indexability, not
optimization. That work is done (see below) but **not yet deployed**.

---

## Diagnosis

Run `python3 scripts/seo/audit.py sunleadsai.com` to reproduce the crawl
findings at any time.

### Why nothing was indexed

Two causes compounding:

1. **No canonical tags anywhere on the site.** Google had to guess which
   hostname was authoritative.
2. **The apex issues a 307 (temporary) redirect to www.** Google does not
   transfer canonical status across a temporary redirect, so it kept
   `sunleadsai.com` as canonical — the host that serves no content — while the
   host that does serve content, `www.sunleadsai.com`, was reported as
   "Duplicate without user-selected canonical."

Search Console confirmed exactly this. The phrase "without user-selected
canonical" literally means "you didn't tell us, so we picked."

### Other findings from the crawl

| Finding | Severity | Fixed in code? |
| --- | --- | --- |
| `/robots.txt` returned 404 | critical | yes |
| `/sitemap.xml` returned 404 | critical | yes |
| apex → www is 307, not 308 | critical | **no — Vercel setting** |
| No canonical URL on any page | warning | yes |
| No Open Graph or Twitter tags | warning | yes |
| No JSON-LD structured data | warning | yes |
| Meta description 201 chars (limit ~160) | warning | yes |
| Same description on `/`, `/privacy`, `/terms` | warning | yes |
| `/contact` title only 24 chars | warning | yes |
| `/contact` is 82 words | warning | no — needs content |

The duplicate description happened because `/privacy` and `/terms` set only a
`title`, so they inherited the root layout's `description` verbatim.

---

## What was built

Branch `claude/seo-foundation`, five commits, all build-verified against
Next 16.2.1.

```
src/app/robots.ts              generated /robots.txt
src/app/sitemap.ts             generated /sitemap.xml
src/app/opengraph-image.tsx    OG card rendered at request time via next/og
src/app/twitter-image.tsx      separate convention; X ignores opengraph-image
src/components/JsonLd.tsx      JSON-LD renderer with XSS escaping
src/lib/seo/config.ts          single source of truth for SEO constants
src/lib/seo/metadata.ts        pageMetadata() helper for subpages
src/lib/seo/schema.ts          Organization / WebSite / VideoObject builders
src/lib/seo/og-template.tsx    shared OG card renderer
public/logo.svg                Organization logo
scripts/seo/audit.py           stdlib-only crawler
scripts/seo/report.py          Slack Block Kit reporter
.github/workflows/seo-report.yml  daily crawl, notifies only on change
```

### Decisions worth not re-litigating

**Canonical host is `www`, not the apex.** Google currently prefers the apex,
but nothing is indexed under it, so there is no accumulated authority to
preserve. `www` already serves the content, so making it canonical is one
Vercel setting rather than a reconfiguration. Either host is defensible; what
matters is that the redirect and the canonical tags agree, which today they
do not.

**No `FAQPage` schema**, despite the site having an FAQ component. Google
deprecated FAQ rich results in May 2026 and finished removing reporting that
August. The markup is still valid schema.org but earns zero SERP treatment.

**No `Service` schema.** Not in Google's rich-results gallery at all.

**No `SoftwareApplication` schema.** Its rich result requires
`offers.price` *and* `aggregateRating`. Self-marking a rating while also
serving `Organization` markup violates Google's self-serving review policy.
Revisit once ratings exist on G2 or Capterra and can be cited as third-party.

**No `llms.txt`.** Google confirmed it does not support it and has no plans to.
Across a 90-day window of 500M AI-bot visits, 408 requests targeted it. It is
useful for developer docs consumed by coding agents, not for search.

**OG images are generated, not committed.** `next/og` renders them at request
time from the palette in `v2.css`, so the card cannot drift from the site.
Note that `src/components/Nav.tsx` uses a different, greener palette — it is
imported nowhere and does not reflect the shipped design.

**`images` is deliberately absent** from the `openGraph`/`twitter` objects in
`layout.tsx` and `pageMetadata()`. An explicit `images` key wins over the
`opengraph-image.tsx` file convention, which would defeat the generation.

**Metadata merging in Next is shallow.** A page defining any `openGraph` key
replaces the parent's entire `openGraph` object. That is why subpages route
through `pageMetadata()` instead of setting fields ad hoc — otherwise they
advertise the homepage's `og:url` as their own.

---

## Outstanding actions

Ordered by what unblocks the most.

1. **Deploy `claude/seo-foundation`.** Everything else is downstream.
2. **Vercel → Project → Settings → Domains:** set `www.sunleadsai.com` as
   primary so the apex redirect becomes 308. Verify with
   `curl -sSI https://sunleadsai.com | grep -iE '^(HTTP|location)'`.
3. **GitHub → Settings → Secrets and variables → Actions:** add
   `SLACK_WEBHOOK_URL` so the daily report can post.
4. **Search Console → Sitemaps:** submit `sitemap.xml`. Only after step 1 —
   submitting before the file exists logs a failure.
5. **Search Console → URL Inspection:** request indexing on all four URLs
   again. The earlier requests were made against the broken state.

---

## Roadmap

### The real constraint

The site has four pages, none of them targeting anything people search. No
amount of technical SEO changes that. Ranking requires pages that answer
queries, and those do not exist yet.

### Fastest-ranking work, in order

1. **Comparison and alternative pages** — `/vs/[competitor]`,
   `/[competitor]-alternative`. Near-zero competition, searchers are in-market,
   converts far better than blog traffic. Typically 2–4 weeks to rank.
2. **YouTube.** The channel is `@sunleadsai` and the homepage VSL
   (`1S1jJ-kWA1k`, "How solar companies lose 40–60% of paid leads") is already
   public. In Ahrefs' 75,000-brand analysis, YouTube presence was the strongest
   single predictor of visibility in AI search — stronger than any on-site
   factor. More videos is the highest-leverage work available.
3. **Directory listings** — G2, Capterra, Clutch. They rank for category terms
   far faster than a new domain can, and they unlock third-party ratings, which
   in turn unlock `SoftwareApplication` schema.
4. **Bottom-funnel money pages** — "AI appointment setting for solar",
   "solar lead qualification software". Low volume, low competition.
5. **Long-tail informational content.** Slowest, largest ceiling. Do not start
   here; most SEO programs do and quit before it compounds.

### Timeline expectations

Say these plainly rather than implying speed that is not available:

| Work | Time to effect |
| --- | --- |
| Technical fixes | days — indexing only, not rankings |
| Brand terms ("sunleads ai") | 1–4 weeks |
| Long-tail, low competition | 1–3 months |
| Competitive commercial terms | 6–12+ months |

SEO is a slow, compounding, high-intent channel here. The total addressable
search volume in this niche is small — likely a few hundred searches per month
across all relevant terms. That can still be worth it given the deal size, but
it will not be a traffic firehose, and paid plus outbound will produce leads
faster in the near term.

---

## Monitoring

`.github/workflows/seo-report.yml` runs `scripts/seo/report.py` daily, crawls
the live site, diffs against `.github/seo-state.json`, and posts to Slack only
when the issue set changes. Mondays post regardless, so a quiet week stays
distinguishable from a job that silently stopped working.

Search Console data cannot be read automatically — there is no connector. Note
also that GSC does not backfill: it began collecting the day the property was
verified (2026-08-05), so meaningful query data starts roughly 2 weeks after
that, and trend data around 4 weeks.

The `seo-growth` skill in `~/.claude/skills/` holds the general methodology
(technical reference, content strategy, conversion patterns) if available in
the environment. `scripts/seo/audit.py` here is a copy of its crawler and is
the authoritative version for this repo.
