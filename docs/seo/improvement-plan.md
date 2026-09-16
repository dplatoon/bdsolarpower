# BD Solar Power — SEO Improvement Plan

**Date:** 15 September 2026 · **Site:** bdsolarpower.com · **Audit score:** 75/100
**Sources used:** full code review, fresh `dist/` build (15 Sep 2026 21:52 UTC), live HTTP checks (headers, status codes, served HTML).

> **Research limitation:** search-engine scraping (Google/Bing/DDG) is blocked from this container, so live ranking/competitor data could not be pulled. Anything competitive below is a hypothesis to verify — §2 includes a ready-made checklist for when GSC / Ahrefs MCP access is available. Everything else is verified.

---

## 1. Verified baseline (what we know)

### Working well
- Build-time prerendering of all public routes (25 HTML files incl. all 18 posts + `404.html`), one clean head-tag set per page.
- `robots.txt` allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot…), disallows `/auth`, `/my-dashboard`; sitemap declared.
- `llms.txt` with key facts + page index; git-derived sitemap `lastmod`; canonical handling via `slug ?? id`.
- Rich schema graph (Organization, WebSite, ImageObject, WebPage, BreadcrumbList, Article, Product, Service, FAQ); HSTS enabled; http→apex 301; hashed assets `max-age=1y, immutable`.

### Verified problems (live)

| # | Problem | Evidence | Class |
|---|---------|----------|-------|
| P1 | Any unknown URL returns **HTTP 200 with the homepage** (canonical `/`) — a soft-404 factory. `/blog/17` and `/blog/18` (pre-slug URLs) hit this too. | `curl /this-page-does-not-exist… → 200`, canonical `https://bdsolarpower.com/` | Critical |
| P2 | `/blog` serves **0 crawlable `<a href>` links** to posts (cards are `<button onClick>`); every post is discoverable only via sitemap. | live HTML grep: `unique /blog links: 0` | High |
| P3 | Blog `og:image` is **relative** (`/assets/hero-1-….jpg`) → broken social previews; posts 16–18 fall back to a third-party Lovable preview asset. | live `/blog/1` HTML | High |
| P4 | HTML served with `cache-control: no-cache, must-revalidate, max-age=0` (no edge caching; TTFB/CWV cost). | live headers | High (host) |
| P5 | Content freshness: "2025" in titles/excerpts; `/blog` H1 says 2025 while its title says 2026; avg depth ≈ 500 words (9,051/18 posts). | source + `wc -w` | High |
| P6 | Single 1.3 MB JS bundle (360 KB gz), no route splitting; render-blocking Google Fonts CSS. | `dist/assets/index-*.js` | Medium |
| P7 | Only 2/18 posts have `seoTitle`/`seoDescription`; generic bylines ("Policy Analyst") weaken E-E-A-T; `dateModified` always = published. | source | Medium |
| P8 | Breadcrumb names for posts are slug-transform / bare numbers, not titles. | `SEO.tsx` auto-breadcrumb | Low |
| P9 | `www` → apex uses **302** (should be 301). | live headers | Low (host) |
| P10 | Dead/duplicate sources: `src/Index.tsx`, `src/blogPosts.ts`, `src/blogPostContent.ts`; unused `keywords` / `includeLocalBusiness` props; hardcoded `/blog/16` link. | grep | Low |

### Content inventory (18 posts, by cluster)
- **Cost:** 1 (2025 guide — stale), 3 (ROI), 17 (2026 cost breakdown — slugged, good)
- **Policy/incentives:** 2 (3000 MW), 5 (net metering), 16 (Tk 10.50 incentive)
- **Financial:** 3, 10 (financing 2025 — stale)
- **Comparisons:** 4 (top 10 — stale), 8 (mono vs poly), 15 (vs generator)
- **Location:** 11 (Dhaka guide)
- **Commercial/B2B:** 6 (factory case study), 12 (industrial), 14 (hospital)
- **Technical/maintenance:** 7, 9, 13, 18 (why systems fail — slugged, good)

---

## 2. Research to complete before Phase 3 (content)

Run these when GSC/Ahrefs access exists; record for each: our position, top 3 competitors, SERP features present.

| Target query | Intent | Existing asset | Action |
|---|---|---|---|
| solar panel price in bangladesh | Commercial | #1, #17 | Refresh + expand #17 into pillar |
| 3kw / 5kw / 10kw solar system price bangladesh | Commercial | — | **New size pages** (1 per size) |
| net metering bangladesh / how to apply | Informational | #5 | Add application walkthrough + QAPage |
| solar panel price in dhaka / chattogram / sylhet | Local commercial | #11 | Add 3 city pages (≥60% unique each; cap ≤30 total) |
| solar inverter price in bangladesh | Commercial | — | New page |
| solar battery price in bangladesh | Commercial | — | New page |
| solar panel installment / loan bangladesh | Commercial | #10 | Refresh 2025→2026 + EMI table |
| tk 10.50 rooftop solar incentive | Informational | #16 | Keep fresh; date-stamp |
| best solar company in bangladesh | Commercial | #4 | Refresh; add methodology (E-E-A-T) |
| commercial / industrial solar bangladesh | B2B commercial | #6, #12 | Add ROI/PPA landing page |
| why solar systems fail bangladesh | Informational | #18 | Expand; add checklist asset |
| solar panel maintenance bangladesh | Informational | #7 | Expand 500→1,200 words |

**Competitor set (to confirm — do not treat as verified):** identify top 3 BD solar sites ranking for the first five queries; record content depth, schema types, publishing cadence, GBP presence.

---

## 3. The plan

### Phase 1 — Stop the bleeding (week 1) — quick wins, code-only — ✅ **COMPLETE (15 Sep 2026)**

All seven tasks shipped and verified in a clean production build: 27 pages prerendered (0 skipped), 18 crawlable links from `/blog` (was 0), legacy `/blog/17` & `/blog/18` now render with canonical → slug, OG images absolute (blog heroes + on-domain 1200×630 default), 18/18 posts have `seoTitle`/`seoDescription`, logo 544 KB → 30 KB, `article:modified_time` emitted for refreshed posts. **Deployed to production 16 Sep 2026** — live checks pass (deployment `09f870ad…`). Detail table below is kept for reference.

| Task | Where | Effort | Impact | Done when |
|---|---|---|---|---|
| 1.1 Blog cards → real links (`<Button asChild><Link to={slug ?? id}>`) | `src/components/BlogPostCard.tsx`, `src/pages/BlogPost.tsx` (related posts) | 1h | High | `curl /blog` shows 18 `<a href="/blog/…">` |
| 1.2 Prerender legacy numeric URLs of slugged posts (`/blog/17`, `/blog/18`) with canonical → slug URL | `scripts/prerender.mjs` | 1h | High | POST P1 no longer serves homepage for those two URLs |
| 1.3 Absolute OG/Twitter images + on-domain 1200×630 default (`/og/default.jpg`), add `og:image:width/height/alt` | `src/pages/BlogPost.tsx`, `src/components/SEO.tsx`, `index.html` | 2h | High | live `/blog/1` og:image starts `https://bdsolarpower.com` |
| 1.4 Year sweep: 2025→2026 in titles/excerpts/H1/keywords; fix `/blog` H1 vs title mismatch | `src/data/blogPosts.ts`, `src/pages/Blog.tsx` | 2h | High | no "2025" left in titles/H1s |
| 1.5 `seoTitle`/`seoDescription` for the 16 posts missing them (≤60 / ≤160 chars) | `src/data/blogPosts.ts` | 3h | Medium | every post has both fields |
| 1.6 Compress `logo.png` 544 KB → <50 KB | `public/logo.png` | 15m | Medium | file size verified |
| 1.7 Type the "updated" pipeline: real `dateModified` + `article:modified_time` meta | `SEO.tsx`, `BlogPost.tsx` | 1h | Medium | refreshed posts show newer modified date |

### Phase 2 — Technical & measurement (weeks 2–4) — ✅ code complete (16 Sep 2026)

Shipped: route-level code-splitting (lazy routes + vendor pinning), streamed SSR prerender (`renderToPipeableStream` — Suspense-safe for lazy routes), non-blocking font load, GA4 SPA page views + `generate_lead` on the quote form, robust shared blog parser for sitemap/prerender, author bios in pages + Article schema (E-E-A-T), dead-code cleanup, push-to-deploy hosting configs (`public/_headers`, `public/_redirects`) and the GSC checklist (`gsc-setup.md`).
Verified: `tsc` clean · 27 pages prerendered (0 skipped) · 21 blog pages · 18 crawlable links · **initial JS ≈ 152 KB gz sitewide (was 360 KB)**.
**Live in production 16 Sep 2026** (deployment `4b025407…`), including a follow-up fix making the Article JSON-LD image absolute (`cd173ae`).
Still open: hosting migration decision (§2.3), GSC baseline capture (user-side), and the homepage `SolarDataDashboard` chunk (~109 KB gz) as a future lazy-load candidate.

| Task | Where | Effort | Impact | Notes |
|---|---|---|---|---|
| 2.1 Route code-splitting: `React.lazy` for Dashboard/AITools/Investors/Learn/Blog + `manualChunks` vendor split | `src/App.tsx`, `vite.config.ts` | 4–6h | High | Target initial JS < 180 KB gz |
| 2.2 Non-blocking fonts (preload + `font-display: swap`, or self-host subset) | `index.html` | 1h | Medium |
| 2.3 **Hosting config (decision point):** serve `404.html` with a real 404 status; 301 (not 302) for `www`; edge caching for HTML (`s-maxage` + `stale-while-revalidate`); confirm brotli | Lovable support ticket **or** migrate to Cloudflare Pages / Vercel | 2h request / 1–2d migrate | High | P1, P4, P9 all live here. Cloudflare Pages serves `404.html` automatically and supports `_headers`/`_redirects` |
| 2.4 GSC setup: confirm verification, submit sitemap, capture baseline (impressions, clicks, indexed pages, coverage) | external | 1h | High | Owner has the verification meta already |
| 2.5 GA4 conversion events: quote form, calculator completion | `src/components/ContactForm.tsx`, tools | 3h | Medium | enables organic→lead reporting |
| 2.6 Prerender robustness: replace fragile `id` + newline + `slug` regex with a shared JSON manifest exported from blog data | `scripts/*.mjs` | 2h | Medium | prevents silent misses on data edits |
| 2.7 E-E-A-T plumbing: author bio pages + `Person` schema, "Updated <date>" display | `src/components/SEO.tsx`, new author page | 4h | Medium |
| 2.8 Breadcrumbs use real post titles | `src/pages/BlogPost.tsx` | 1h | Low |
| 2.9 Cleanup: delete dead `src/Index.tsx`, `src/blogPosts.ts`, `src/blogPostContent.ts`; remove dead props; de-hardcode `/blog/16` | various | 1h | Low |

### Phase 3 — Content engine (months 2–3)

1. **Pillar builds** (priority order): 5kW price page → 3kW/10kW → inverter price → battery price → net-metering application guide → commercial/PPA landing page → city pages (Dhaka deep-dive first, then 3 more).
2. **Refresh program:** expand 5 thin posts to 1,200+ words (7, 9, 13, 15, 10); quarterly year-sweep; add price-update timestamps to all pricing content.
3. **Internal linking rules:** posts link to parent pillar; pillars link to tools; every new page linked from an existing page (no orphans); breadcrumbs always titled.
4. **Cadence:** 2 new/refreshed pages per month minimum; one "money page" per month.

### Phase 4 — Off-site, local & AI search (month 3+)

- **Local:** Google Business Profile (Mymensingh + service areas), NAP consistency, BD business-directory citations, review collection flow on the quote form.
- **Linkable asset:** publish a quarterly **"Bangladesh Solar Price Index"** using the data already powering `/dashboard` + `/investors` — original data is the most realistic link magnet here; pitch to BD tech/energy press and forums.
- **GEO/AI search:** keep `llms.txt` current (add blog index + latest price facts quarterly), use QAPage for genuine Q&A, keep statistics date-stamped — AI answers favour fresh, citable numbers.
- **Video/social:** YouTube walkthroughs embedded with transcripts support both E-E-A-T and AI citation.

---

## 4. Scorecard & targets (90 days)

| Metric | Baseline | Target |
|---|---|---|
| Audit score | 75/100 | ≥ 88 |
| Crawlable blog links from `/blog` | 0 | 18+ |
| Initial JS (gzip) | 360 KB | < 180 KB |
| Soft-404 (unknown URL = 200 homepage) | yes | fixed (or documented workaround) |
| Posts with unique SEO title + description | 2/18 | 18/18 |
| GSC indexed pages | (capture in 2.4) | all prerendered pages |
| ≥1 page in top-10 for target queries | unknown | 3+ queries |

## 5. Risks & constraints

- **Hosting control is the biggest unknown.** If Lovable cannot set 404 status / redirects / cache headers, the plan's P1/P4/P9 fixes require a host migration (site is static — migration is low-risk, ~1–2 days).
- **Content depth requires writer time**; the 500-word average can only be fixed with substantive editing, not automation.
- **Search-access gap:** until GSC/Ahrefs is connected, competitor and ranking judgments are hypotheses.

## 6. Immediate next step

Execute **Phase 1 (1.1–1.7)** — all code-only, all verifiable, roughly one working day — then open the hosting conversation (2.3) and GSC baseline (2.4) in parallel.
