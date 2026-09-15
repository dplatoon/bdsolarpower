---
name: seo
description: "Comprehensive SEO analysis for any website or business type. Use when the user mentions SEO, site audits, technical SEO, schema markup, Core Web Vitals, E-E-A-T, AI Overviews, GEO, sitemaps, robots.txt, backlinks, local SEO, hreflang or page speed, or asks to analyze a site, understand why a page is not ranking, check schema, or improve rankings. Covers full-site audits, single-page analysis, technical SEO (9 categories), schema markup, content quality, image SEO, XML sitemaps, GEO/AI search optimization, local SEO (GBP, citations, map pack), strategic planning, programmatic SEO, competitor pages, international SEO, Google API workflows (GSC, CrUX, GA4), backlinks, topic clustering, SXO, drift monitoring, and e-commerce SEO. Uses Ahrefs MCP for backlinks and keywords, SE Ranking MCP for AI Share-of-Voice, and Figma MCP for UX-SEO tasks when connected."
argument-hint: '<command> <url> — e.g. audit, page, technical, content, schema, geo, local, cluster, drift, ecommerce'
---

# SEO: Universal SEO Analysis Skill

**Source:** [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) (v2.2.4) — MIT License. Adapted for this VS Code workspace; MCP integrations are optional and used when connected in place of Python script execution.

Comprehensive SEO analysis across all industries (SaaS, local services, e-commerce, publishers, agencies).

Invoke as `/seo <command> <url>` (e.g. `/seo audit bdsolarpower.com`), or describe the task naturally — "audit my site", "why isn't my page ranking", "check my schema".

---

## Quick Command Reference

| Command | What it does |
|---------|--------------|
| `/seo audit <url>` | Full website audit — technical, content, schema, performance, GEO |
| `/seo page <url>` | Deep single-page analysis |
| `/seo technical <url>` | Technical SEO audit (9 categories) |
| `/seo content <url>` | E-E-A-T and content quality analysis |
| `/seo content-brief <topic>` | Detailed SEO content brief with keywords, outline, internal links |
| `/seo schema <url>` | Detect, validate, and generate Schema.org markup |
| `/seo sitemap <url>` | Analyze or generate XML sitemaps |
| `/seo images <url>` | Image SEO: alt text, file names, compression, SERP image signals |
| `/seo geo <url>` | AI Overviews / Generative Engine Optimization |
| `/seo local <url>` | Local SEO: GBP, NAP, citations, reviews, map pack |
| `/seo plan <business-type>` | Strategic SEO planning by industry |
| `/seo programmatic <url>` | Programmatic SEO analysis and planning |
| `/seo competitor-pages <url>` | Competitor comparison page generation |
| `/seo hreflang <url>` | Hreflang and international SEO audit |
| `/seo google <command> <url>` | Google SEO workflows: GSC, PageSpeed, CrUX, GA4 guidance |
| `/seo backlinks <url>` | Backlink profile analysis (Ahrefs MCP if connected) |
| `/seo cluster <keyword>` | SERP-based semantic clustering and content architecture |
| `/seo sxo <url>` | Search Experience Optimization: page-type, user stories, personas |
| `/seo drift <url>` | SEO drift analysis — identify ranking/traffic changes over time |
| `/seo ecommerce <url>` | E-commerce SEO: product schema, marketplace signals |
| `/seo seranking <command>` | AI Share-of-Voice via SE Ranking MCP (if connected) |
| `/seo ahrefs <command> <url>` | Backlinks, organic keywords, content data via Ahrefs MCP |

---

## Orchestration Logic

### Full Audit (`/seo audit <url>`)

1. **Detect business type** from the URL and any user context:
   - **SaaS**: pricing page, /features, /integrations, "free trial", "sign up"
   - **Local Service**: phone, address, "serving [city]", Google Maps → suggest `/seo local`
   - **E-commerce**: /products, /cart, "add to cart", product schema
   - **Publisher**: /blog, /articles, author pages, publication dates
   - **Agency**: /case-studies, /portfolio, /industries, client logos
2. **Analyze in parallel across all categories:**
   - Technical SEO (crawlability, indexability, redirects, HTTPS, hreflang, robots.txt)
   - Content Quality (E-E-A-T, QRG signals, thin content, readability)
   - Schema Markup (detection, validation, generation recommendations)
   - Sitemap (structure, coverage, XML formatting)
   - Core Web Vitals (LCP, INP, CLS — never FID, deprecated)
   - GEO / AI Search (llms.txt, AI crawler access, citability signals)
   - Images (alt text, filenames, compression, structured data)
   - On-Page SEO (title tags, meta descriptions, headings, internal links)
3. **Conditional analysis:**
   - Local business detected → run Local SEO module (GBP, NAP, citations, reviews)
   - Content strategy signals (blog, pillar pages) → run Topic Clustering module
   - E-commerce detected → run E-commerce SEO module
   - Ahrefs MCP connected → include backlink profile data
   - SE Ranking MCP connected → include AI Share-of-Voice data
4. **Synthesize** via PERCEIVE → ANALYZE → VALIDATE → ACT framework (see below)
5. **Output:** SEO Health Score (0–100), findings bucketed by priority, action plan with dependency sequencing
6. **Offer next steps:** suggest relevant sub-commands and report export options

---

## Synthesis Methodology (10-Principle Framework)

Every audit walks four phases before emitting the action plan:

- **PERCEIVE**: observe-external (what signals does the site send?) · observe-internal (what does the URL/code reveal?) · listen (what is the user's actual goal?)
- **ANALYZE**: think (what first principles apply?) · connect-lateral (cross-signal patterns) · connect-system (how do findings depend on each other?)
- **VALIDATE**: feel (does this recommendation pass the "so what?" test?) · accept (how would we know if this failed?)
- **ACT**: create (what should be built/changed?) · grow (what leading indicator can the user monitor?)

Each recommendation should carry:
- The first-principle observation it rests on (THINK)
- Its dependency on / unblock relationship to other recommendations (CONNECT-system)
- An explicit "how would we know this failed?" check (ACCEPT)
- A leading indicator to monitor without re-running the audit (GROW)

Narrower commands (`/seo schema`, `/seo images`, etc.) pass at least THINK + ACCEPT before emitting.

---

## Industry-Specific Analysis

### SaaS
- Focus: trial/signup conversion pages, feature/integration indexation, docs SEO, comparison keywords
- Schema: SoftwareApplication, FAQPage (QAPage for genuine Q&A), BreadcrumbList
- Content: Bottom-of-funnel alternative/competitor pages, use-case landing pages

### Local Service
- Focus: GBP completeness, NAP consistency across citations, review velocity, map pack signals
- Schema: LocalBusiness subtypes (Plumber, Dentist, Restaurant, etc.), Service, Review
- Content: City/service area pages (enforce 60%+ unique content; HARD STOP at 50+ location pages)

### E-commerce
- Focus: Product schema (Google Merchant Center requirements), category pages, faceted nav
- Schema: Product, Offer, AggregateRating, BreadcrumbList, ItemList
- Content: Buying guides, comparison pages, user-generated reviews

### Publisher
- Focus: E-E-A-T signals, author authority, freshness, internal linking architecture
- Schema: Article, NewsArticle, Person, Organization, BreadcrumbList
- Content: Pillar/cluster architecture, content refresh cadence

### Agency
- Focus: Case study indexation, service page authority, industry vertical landing pages
- Schema: Organization, Service, FAQPage/QAPage, BreadcrumbList
- Content: Results-focused case studies, industry-specific proof

---

## Quality Gates & Hard Rules

- **WARNING** at 30+ location pages (enforce 60%+ unique content per page)
- **HARD STOP** at 50+ location pages (require user justification before proceeding)
- **Never recommend HowTo schema** — deprecated September 2023
- **FAQ schema:** Google retired FAQPage rich results for ALL sites on May 7, 2026. Flag existing FAQPage at Info severity (not Critical); do not recommend removal; do not recommend new FAQPage for Google SERP benefit; use QAPage for genuine user Q&A only
- **Core Web Vitals:** Always use INP (Interaction to Next Paint), never FID (deprecated March 2024)
- **AI Overviews:** Do not guarantee AI Overview inclusion; frame as citability optimization

---

## SEO Health Score (0–100)

| Category | Weight |
|----------|--------|
| Technical SEO | 22% |
| Content Quality | 23% |
| On-Page SEO | 20% |
| Schema / Structured Data | 10% |
| Performance (Core Web Vitals) | 10% |
| AI Search Readiness (GEO) | 10% |
| Images | 5% |

**Priority Levels:**
- **Critical**: Blocks indexing or causes penalties → fix immediately
- **High**: Significantly impacts rankings → fix within 1 week
- **Medium**: Optimization opportunity → fix within 1 month
- **Low**: Nice to have → backlog

---

## MCP Integration Guide

These integrations are optional. Use the corresponding MCP server when connected; otherwise fall back to manual analysis and clearly note what data is missing.

### Ahrefs MCP (optional)

Use for: `/seo backlinks`, `/seo ahrefs`, and backlink data during full audits.

- Backlink profile: referring domains, DA/DR, anchor text distribution, toxic link signals
- Organic keywords: ranking positions, traffic share, keyword difficulty
- Content gaps: competitor keywords the site doesn't rank for
- Always surface: top referring domains, lost/gained links trend, anchor text diversity

### SE Ranking MCP (optional)

Use for: `/seo seranking` and AI Share-of-Voice during GEO analysis.

- AI Search Visibility: brand mentions in ChatGPT, Gemini, Perplexity, AI Overviews, AI Mode
- Rank tracking: position history, SERP feature presence
- Competitor analysis: Share-of-Voice comparison
- Compare brand mentions versus competitors in AI responses for your target market (e.g. Bangla-language AI search responses for Bangladesh-focused brands)

### Figma MCP (optional)

Use during: `/seo sxo`, `/seo content-brief`, UX-SEO alignment tasks.

- Pull design specs to check mobile UX, CTA placement, above-the-fold content
- Flag design patterns that conflict with Core Web Vitals (LCP images, layout shift)

---

## Sub-Skill Details

### `/seo technical <url>`

9 categories:
1. Crawlability (robots.txt, noindex, crawl budget)
2. Indexability (canonical tags, duplicate content, redirect chains)
3. HTTPS & Security (mixed content, HSTS, certificate validity)
4. Page Speed (Core Web Vitals: LCP, INP, CLS)
5. Mobile (viewport, tap target size, responsive design)
6. Structured Data (schema errors, rich result eligibility)
7. Internationalization (hreflang, alternate tags, geo-targeting)
8. JavaScript SEO (SPA crawlability, lazy loading, pre-rendering)
9. Site Architecture (URL structure, internal linking depth, breadcrumbs)

### `/seo content <url>`

E-E-A-T framework (September 2025 QRG update):
- **Experience**: First-hand expertise signals, author credentials, publication dates
- **Expertise**: Topic depth, accuracy, technical correctness
- **Authoritativeness**: Brand mentions, backlink quality, SERP brand signals
- **Trustworthiness**: HTTPS, privacy policy, contact info, return policy (e-comm), reviews
- Content length benchmarks by page type (informational, transactional, local)
- Thin content detection (below-threshold pages by type)
- Readability: Flesch-Kincaid, sentence complexity, passive voice ratio

### `/seo schema <url>`

- Detect all JSON-LD, Microdata, and RDFa on page
- Validate against Schema.org spec and Google's rich result requirements
- Generate missing schema for: Article, Product, LocalBusiness, FAQ/QAPage, BreadcrumbList, HowTo (where applicable), Event, Recipe, Review, VideoObject
- Flag deprecated types (HowTo for rich results, FAQPage post May 2026)
- Output copy-paste ready JSON-LD

### `/seo geo <url>`

- Check for llms.txt / llms-full.txt (AI crawler permission file)
- Verify AI crawler access in robots.txt (GPTBot, ClaudeBot, Google-Extended, etc.)
- Analyze citability signals: structured claims, statistics, original research
- Brand mention optimization: E-E-A-T signals for AI citation likelihood
- AI Overviews eligibility signals (cannot guarantee inclusion)
- Perplexity/ChatGPT citation pattern analysis based on site's content structure

### `/seo cluster <seed-keyword>`

SERP-based semantic clustering (contributed by Lutfiya Miller):
- Identify parent topic + sub-topic cluster structure
- Map search intent per cluster (informational, navigational, transactional)
- Content gap analysis: which clusters lack a ranking page?
- Internal linking architecture recommendations
- Content calendar prioritization by opportunity size

### `/seo sxo <url>`

Search Experience Optimization (contributed by Florian Schmitz):
- Page-type taxonomy: does the page match the SERP's expected format?
- User stories: what is the searcher trying to accomplish?
- Persona scoring: does this page serve the detected intent persona?
- CTA/conversion alignment with search intent
- Above-the-fold content audit vs. expected SERP snippet

### `/seo drift <url>`

SEO drift monitoring (contributed by Dan Colta):
- Identify traffic/ranking drops vs. prior period
- Classify drift cause: algorithm update, competitor movement, content decay, technical regression
- 17 comparison rules across 3 severity levels
- Recovery recommendations per drift type

### `/seo ecommerce <url>`

E-commerce SEO (contributed by Matej Marjanovic):
- Product schema completeness (Google Merchant Center requirements)
- Category page SEO: faceted navigation, filter indexation
- Marketplace intelligence: Amazon/Shopping data signals
- Product image SEO (alt text, filename, structured data)
- Review schema: AggregateRating implementation

---

## Content Brief Format (`/seo content-brief <topic>`)

Output structure (contributed by puneetindersingh):

1. **Target Keywords**: Primary + 3–5 secondary keywords with intent classification
2. **Search Intent**: Informational / Navigational / Transactional / Commercial
3. **Recommended Format**: Article / Landing Page / Product Page / Local Page
4. **Competitor Analysis**: Top 3 ranking pages, their word count, schema, backlink count
5. **Outline**: H1 → H2 → H3 structure with word count targets per section
6. **E-E-A-T Requirements**: What experience/expertise signals to include
7. **Internal Links**: 3–5 relevant existing pages to link from/to
8. **Schema Recommendations**: JSON-LD to include
9. **Success Metrics**: Target position, estimated traffic, rich result opportunities

---

## Audit Completeness Rule

**Every SEO audit must be complete — no data missing, no sections skipped.**

When auditing any website, always deliver all of the following sections regardless of site size:

1. SEO Health Score (0–100) with category breakdown
2. Technical SEO — all 9 categories
3. On-Page SEO — title, meta, H1-H6, internal links, URL structure
4. Content Quality — E-E-A-T, thin content, readability
5. Schema / Structured Data — full detection + all missing types + production-ready JSON-LD
6. Core Web Vitals — LCP, INP, CLS assessment
7. Images — alt text, filenames, compression, structured data
8. AI Search / GEO — llms.txt, AI crawler access, citability
9. Backlinks — profile summary (use Ahrefs/SE Ranking MCP if connected)
10. Prioritized action plan — all findings sorted Critical → High → Medium → Low
11. Production-ready code for every fix that requires it (JSON-LD, preload tags, hreflang, etc.)

Never truncate, summarize away, or skip any section. If a section requires more information to complete, note exactly what is needed and provide a best-effort assessment with what is available.

---

## Error Handling

| Scenario | Action |
|----------|--------|
| URL not provided | Ask for the URL before proceeding; never guess site content |
| URL unreachable | Report the error, suggest verifying the URL, offer to analyze available page source if user can provide it |
| Ambiguous business type | Present top 2 detected types with supporting signals; ask user to confirm |
| Conflicting signals | Surface the conflict explicitly; do not silently pick one interpretation |
| MCP tool unavailable | Fall back to manual analysis guidance; clearly note what data is missing |

---

## Community & Attribution

**Original skill:** [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) — MIT License

**Sub-skill contributors:** Lutfiya Miller (seo-cluster), Florian Schmitz (seo-sxo), Dan Colta (seo-drift), Matej Marjanovic (seo-ecommerce), puneetindersingh (seo-content-brief)

**This adaptation:** VS Code / GitHub Copilot skill with optional Ahrefs + SE Ranking + Figma MCP integration.
