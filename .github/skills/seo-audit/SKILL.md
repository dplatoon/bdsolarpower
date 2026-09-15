---
name: seo-audit
description: "Audit a website's SEO health end to end: keyword research, on-page SEO, content gaps, technical SEO (crawlability, structured data, Core Web Vitals), and competitor benchmarking, producing a prioritized action plan. Use when the user runs /seo-audit or asks for an SEO audit, keyword research, content gap analysis, technical SEO check, site health review, sitemap/robots.txt fixes, meta tag and structured data review, or competitor SEO comparison."
argument-hint: '[url-or-topic] [full | keywords | content-gaps | technical | competitors]'
---

# SEO Audit

Audit a website's SEO health, research keyword opportunities, identify content gaps, and benchmark against competitors. Produces a prioritized action plan a marketer can execute immediately.

## When to Use

- User runs `/seo-audit`
- User asks for an SEO audit, keyword research, content gap analysis, a technical SEO check, or a competitor SEO comparison

## Inputs

Gather the following from the user. If something required is missing, ask before proceeding — never invent a domain, keyword, or competitor.

**URL or domain** — the site to audit, or a topic/keyword if running in keyword research mode.

**Audit type** — one of:
- **Full site audit** — end-to-end review covering all sections below (default if unspecified)
- **Keyword research** — keyword opportunities for a topic or domain
- **Content gap analysis** — topics competitors rank for that you don't
- **Technical SEO check** — crawlability, speed, structured data, and infrastructure issues
- **Competitor SEO comparison** — head-to-head benchmarking against specific competitors

**Target keywords or topics** (optional) — keywords the user already targets or wants to rank for.

**Competitors** (optional) — domains or companies to compare against. If not provided and the audit type requires competitor data, use web search to identify 2–3 likely competitors based on the user's domain and keyword space.

## Data Sources

Pull data however it is available, in this order of preference:

1. **SEO tool via MCP** (Ahrefs, Semrush, DataForSEO, etc.), if connected — search volume, difficulty, ranking positions, and rank changes.
2. **Product analytics via MCP** (GA4, Plausible, etc.), if connected — cross-reference keyword targets with actual organic traffic to validate which keywords drive visits and conversions.
3. **The codebase**, when the audited site lives in the current workspace — read `robots.txt`, `sitemap.xml`, meta tag and structured data code, and content files directly instead of crawling the live site.
4. **Web search and page fetch** (web tools, or `curl` in the terminal) — competitor research, SERP inspection, and live page checks.

If no SEO tool is connected, estimate from search data and include this note once in the output: "For more precise volume and difficulty data, connect an SEO tool like Ahrefs or Semrush via MCP — rerunning the audit will auto-populate ranking data."

## Process

### 1. Keyword Research

Research keywords related to the user's domain, topic, or target keywords. For each opportunity, assess:

- **Primary keywords** — high-intent terms tied directly to the product or service
- **Secondary keywords** — supporting terms and variations
- **Search volume signals** — relative demand (high, medium, low)
- **Keyword difficulty** — how competitive the term is (easy, moderate, hard)
- **Long-tail opportunities** — specific, lower-competition phrases with clear intent
- **Question-based keywords** — "how to", "what is", "why does" queries that mirror People Also Ask
- **Intent classification** — informational, navigational, commercial, or transactional

When ranking data is available, also note which keywords the site already ranks for and where it is gaining or losing ground.

### 2. On-Page SEO Audit

For each key page (homepage, top landing pages, recent blog posts), evaluate:

| Check | What good looks like |
|-------|----------------------|
| Title tags | Present, unique, 50–60 characters, includes the target keyword |
| Meta descriptions | Present, compelling, 150–160 characters, includes a call to action |
| H1 tags | Exactly one per page, includes the primary keyword |
| H2/H3 structure | Logical hierarchy, uses secondary keywords where natural |
| Keyword usage | Primary keyword appears in the first 100 words, used naturally, not over-stuffed |
| Internal linking | Pages link to related content, orphan pages identified, anchor text is descriptive |
| Image alt text | All images have descriptive alt attributes, keywords included where relevant |
| URL structure | Clean, readable, includes keywords, no excessive parameters or depth |

### 3. Content Gap Analysis

Identify what is missing from the user's content strategy:

- **Competitor topic coverage** — topics and keywords competitors rank for that the site does not cover
- **Content freshness** — pages not updated in 12+ months that may be losing rankings
- **Thin content** — pages with insufficient depth to rank (under 300 words for informational queries, or lacking substance)
- **Missing content types** — formats competitors use that the site does not (guides, comparison pages, glossaries, tools, templates)
- **Funnel gaps** — missing content at specific buyer-journey stages (awareness, consideration, decision)
- **Topic clusters** — opportunities to build pillar pages with supporting content

### 4. Technical SEO Checklist

Evaluate the technical foundations that affect crawlability and rankings:

- **Page speed** — identify slow-loading pages and likely causes (large images, render-blocking scripts, excessive redirects)
- **Mobile-friendliness** — responsive design, tap targets, font sizes, viewport configuration
- **Structured data** — opportunities for schema markup (FAQ, HowTo, Product, Article, Organization, Breadcrumb)
- **Crawlability** — robots.txt configuration, XML sitemap presence and accuracy, canonical tags, noindex/nofollow usage
- **Broken links** — internal and external 404s, redirect chains
- **HTTPS** — secure connection, mixed content issues
- **Core Web Vitals signals** — LCP, INP, CLS indicators based on observable page behavior
- **Indexation** — pages that should be indexed but may not be, duplicate content risks

### 5. Competitor SEO Comparison

For each competitor, compare:

- **Keyword overlap** — keywords both sites rank for, and where each site ranks higher
- **Keyword gaps** — terms the competitor ranks for that the user does not
- **Domain authority signals** — relative site strength based on backlink profiles, referring domains, and content depth
- **Content depth** — average content length, topic coverage breadth, publishing frequency
- **Backlink profile observations** — types of sites linking to competitors, link-worthy content they have produced
- **SERP feature ownership** — which competitor appears in featured snippets, People Also Ask, image packs, or knowledge panels
- **Technical advantages** — site speed differences, mobile experience, structured data usage

## Output

### Executive Summary

Open with a 3–5 sentence summary of overall SEO health, covering:

- The site's biggest strength
- The top 3 priorities that will have the most impact
- An overall assessment: **strong foundation**, **needs work**, or **critical issues**

### Keyword Opportunity Table

Include 15–25 keyword opportunities, sorted by opportunity score.

| Keyword | Est. Difficulty | Opportunity Score | Current Ranking | Intent | Recommended Content Type |
|---------|-----------------|-------------------|-----------------|--------|--------------------------|

Opportunity score is **high**, **medium**, or **low** — based on the combination of search demand, difficulty, and relevance to the user's business.

### On-Page Issues Table

| Page | Issue | Severity | Recommended Fix |
|------|-------|----------|-----------------|

Severity levels:

- **Critical** — directly hurting rankings or preventing indexation
- **High** — significant impact on SEO performance
- **Medium** — best practice violation, moderate impact
- **Low** — minor optimization opportunity

### Content Gap Recommendations

For each content gap identified, provide:

- Topic or keyword to target
- Why it matters — search demand, competitor coverage, funnel stage
- Recommended format — blog post, landing page, guide, comparison page, etc.
- Priority — high, medium, or low
- Estimated effort — quick win (1–2 hours), moderate (half day), substantial (multi-day)

### Technical SEO Checklist

| Check | Status | Details |
|-------|--------|---------|

Status: **Pass**, **Fail**, or **Warning**.

### Competitor Comparison Summary

| Dimension | Your Site | Competitor A | Competitor B | Winner |
|-----------|-----------|--------------|--------------|--------|

Include rows for: keyword count, content depth, publishing frequency, backlink signals, technical score, SERP feature presence.

## Prioritized Action Plan

### Quick Wins (do this week)

Actions that take under 2 hours and have immediate impact — e.g. fix title tags, add meta descriptions, fix broken links, add alt text.

### Strategic Investments (plan for this quarter)

Actions that require more effort but drive long-term growth — e.g. build a topic cluster, create a pillar page, launch a link-building campaign, overhaul site structure.

For each action item, include:

- What to do (specific and concrete)
- Expected impact (high, medium, low)
- Effort estimate
- Dependencies, if any

## Follow-Up

After presenting the audit, ask:

> Would you like me to:
>
> - Draft content briefs for the top keyword opportunities?
> - Create optimized title tags and meta descriptions for your key pages?
> - Build a content calendar based on the gap analysis?
> - Dive deeper into any specific section of the audit?
> - Run this same analysis for a different competitor or domain?

## Completion Check

Before sending the audit, confirm:

- Executive summary names one strength, the top 3 priorities, and an overall assessment
- 15–25 keyword opportunities are included, sorted by opportunity score
- Every issue and action names a specific page or topic and a concrete fix
- Externally sourced numbers are labeled as estimates, with assumptions listed
