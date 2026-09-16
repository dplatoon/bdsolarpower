# Content Brief — 5kW Solar System Price in Bangladesh (Pillar)

**Status:** ready to write · **Priority:** High — first page of the Phase 3 cluster
**Proposed URL:** `/solar-system-prices/5kw` (hub: `/solar-system-prices`, spokes: 3kW / 10kW to follow)
**Format:** Pillar landing page, not a blog post · **Target length:** 1,300–1,600 words

---

## 1. Target keywords

| Type | Keyword | Intent |
|---|---|---|
| **Primary** | 5kw solar system price in bangladesh | Commercial |
| Secondary | 5kw solar panel price in bangladesh | Commercial |
| Secondary | 5kw solar system for home bangladesh | Commercial |
| Secondary | 5kw on-grid solar system price bd | Commercial |
| Secondary | 5kw solar system payback period bangladesh | Informational (commercial) |
| Long-tail | how much does a 5kw solar system cost in bangladesh 2026 | Commercial |
| Long-tail | 5kw solar system monthly bill savings bangladesh | Informational |
| Question | is 5kw solar system enough for a home in bangladesh | Informational |
| Question | 5kw solar system price with battery in bangladesh | Commercial |

## 2. Search intent

Commercial investigation trending transactional: users want **current BDT price ranges, what's included, and payback math**, then request a quote. SERP is a mix of installer service pages, price-list articles and calculators — all beatable on freshness (dated tables) and local specificity (BPDB net metering, Tk 10.50 incentive, heat derating).

## 3. Competitor check (complete manually — SERP tools unavailable in this workspace)

For each of the top 3 results for the primary keyword, record:

- [ ] URL and site type (installer / blog / marketplace)
- [ ] Price ranges quoted (low–high BDT) and whether dated
- [ ] Word count and last-updated date
- [ ] Schema types used
- [ ] Weaknesses to exploit: no dated table, no component breakdown, no incentive math, no financing, stale prices

## 4. Outline

**H1:** 5kW Solar System Price in Bangladesh (2026)

- **H2 Quick answer** — price table by system type, "Updated September 2026"
  - H3 On-grid vs hybrid vs off-grid (BDT ranges — reconcile with homepage claim "from BDT 275,000")
  - H3 What's included: panels, inverter, mounting, cabling, installation, net metering support
  - H3 What changes the price: component tier, panel type, battery, roof structure, cable runs, meter/net metering work
- **H2 Monthly savings and payback**
  - H3 Bill-offset example (state assumptions: consumption, tariff; show the math)
  - H3 Payback period and 25-year returns
  - H3 Earn from surplus: Tk 10.50/unit incentive (link to the incentive post)
- **H2 Is 5kW right for your home?** — load checklist, ~roof area needed, single/two-phase notes
- **H2 What you get at each budget tier** — economy / standard / premium component sets
- **H2 Financing and EMI** — bank loan & EMI ranges (link financing post)
- **H2 Net metering for a 5kW system** — eligibility, documents, step summary (link the net metering post)
- **H2 Get an exact quote** — CTA block → `#contact` form (WhatsApp)
- **H2 FAQ** — 5–7 genuine questions, answer in visible text (schema: QAPage only for real user Q&A)

## 5. E-E-A-T requirements

- Named author (use the `authors.ts` pattern) + "reviewed by [installation team lead]"
- 2–4 photos from **own installations** (descriptive alt text, e.g. "5kW rooftop array on a tin-roof home in Mymensingh")
- Cite: BPDB net metering rules, SREDA guidance, 1% import duty, Tk 10.50 incentive deadline (28 Feb 2027) — link primary sources
- Price methodology note: "Ranges compiled from installer and supplier quotes across Bangladesh · updated [Month Year]" + visible last-updated date
- Never guarantee AI Overview inclusion or exact savings; label estimates as estimates

## 6. Internal links

**From (add links on these pages → to the new pillar):**
- Homepage — a "system sizes" strip or hero link (replace/extend the `/blog/16` banner row)
- `/blog/solar-system-cost-bangladesh-2026` (cost breakdown → size deep-dive)
- `/blog/1` (panel price guide)

**To (the pillar links out to):**
- `/ai-tools` — savings calculator (primary tool CTA)
- `/blog/16` — Tk 10.50 incentive details
- `/blog/5` — net metering policy guide
- `/blog/10` — financing options
- `/#contact` — quote form
- Future spokes: 3kW, 10kW (add "other system sizes" block once built)

## 7. Schema recommendations

- `Product` ("5kW Solar System Bangladesh") + `offers` → `AggregateOffer` (lowPrice/highPrice in BDT, `priceValidUntil`, availability) — reconcile numbers with the homepage Product schema (currently shows 275,000)
- `BreadcrumbList`: Home → Solar System Prices → 5kW
- **No FAQPage** (Google retired FAQ rich results, May 2026). Use `QAPage` only if the FAQ genuinely represents user-submitted Q&A.
- Keep the static Organization/WebSite graph references intact (`@id` links)

## 8. Success metrics

- Primary: top-10 for "5kw solar system price in bangladesh" within 90 days of indexing
- `generate_lead` events from this page (GA4) — track as the page's conversion goal
- Impressions/CTR via GSC; rich-result eligibility (Product/Offer)
- Leading indicator: clicks from `/blog/17` + homepage "system sizes" links

## 9. Implementation notes (dev)

- Add route in `src/App.tsx` + route list in `scripts/prerender.mjs` (prerender must emit this page)
- Meta: title ≤60 chars — "5kW Solar System Price in Bangladesh (2026)"; description with a price range + CTA
- Dedicated 1200×630 OG image (price-table teaser); reference `/og/5kw.jpg`
- Add to `public/sitemap.xml` generator pages list with a sensible priority (0.9) and git-based lastmod
- Refresh cadence: update price table + visible "Updated" date **monthly**

---

## Queue — next briefs (in order)

1. 3kW & 10kW price pages (clone this structure, same hub)
2. Solar inverter price in Bangladesh
3. Solar battery price in Bangladesh
4. Net metering application guide (upgrade blog/5; documents + step-by-step + QAPage)
5. Dhaka solar installation guide refresh (expand blog/11 with area tables)
