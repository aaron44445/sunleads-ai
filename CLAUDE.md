@AGENTS.md

## SEO work

`docs/SEO.md` holds the state of the SEO effort — what the crawl and Search
Console found, what shipped, which schema types were deliberately rejected and
why, and what is still outstanding. Read it before touching anything under
`src/lib/seo/`, `src/app/robots.ts`, `src/app/sitemap.ts`,
`src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx`, or `scripts/seo/`,
and update it when the situation changes.

It is a pointer rather than an `@` import on purpose: it is long, and most
sessions here will not be about SEO.
