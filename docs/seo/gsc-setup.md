# Google Search Console — setup & baseline checklist

The site already carries the GSC verification meta tag for property **bdsolarpower.com**. Run this once after the current deploy is live.

## 1. Confirm property & sitemap
1. Open GSC → `https://bdsolarpower.com/` property.
2. Sitemaps → submit `https://bdsolarpower.com/sitemap.xml` (24 URLs, git-derived lastmod).
3. URL Inspection → confirm `/`, `/blog`, `/blog/solar-system-cost-bangladesh-2026` are indexed.

## 2. Request re-indexing (post-Phase-1)
URL Inspection → Request Indexing for: `/blog`, `/blog/17` (legacy URL), both slugged posts, `/`, `/learn`.

## 3. Capture the baseline (record date + numbers)
| Metric | Where | Value |
|---|---|---|
| Impressions / clicks / CTR (28d) | Performance | |
| Indexed pages | Pages report | |
| Not-indexed reasons | Pages report | |
| Soft 404s | Pages report | |
| Core Web Vitals (mobile) | Experience | |
| Sitemap discovered URLs | Sitemaps | |

## 4. Watch items
- Coverage: legacy `/blog/17`, `/blog/18` should consolidate to slug URLs via canonical.
- FAQ results: Google retired FAQPage rich results May 2026 — info only, no action.
- After hosting migration (`hosting-migration.md`): re-submit the sitemap and re-check indexing for the new real-404 behaviour.

## 5. Conversions (GA4)
Events firing: `page_view` (SPA route changes) and `generate_lead` (quote form). Mark `generate_lead` as a **Key Event** in GA4 → Admin → Events.
