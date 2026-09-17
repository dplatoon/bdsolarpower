# Hosting Migration Runbook — Lovable to Cloudflare Pages

**Goal:** serve `bdsolarpower.com` from Cloudflare Pages so that:

1. Unknown URLs return a **real 404** (today they return HTTP 200 with the homepage).
2. HTML gets sane **cache headers** (today: `no-cache, max-age=0`).
3. `www` → apex is a **single 301** (today: 302).
4. Every push to `main` **auto-deploys** (no more manual Publish step).

## Current state vs target

| Thing | Now (Lovable) | After (Cloudflare Pages) |
|---|---|---|
| Unknown URL | HTTP 200 + homepage (soft 404) | `404.html` with HTTP 404 |
| HTML caching | `no-cache, must-revalidate` | edge cache + `stale-while-revalidate` |
| www redirect | 302 | 301 (zone Redirect Rule) |
| Deploy | GitHub push + click Publish | push = deploy |

## DNS inventory (verified 17 Sep 2026)

- **Nameservers:** `ns1.dyna-ns.net`, `ns2.dyna-ns.net` — **Dynadot** DNS (zone must move to Cloudflare for Pages custom domains + redirect rules)
- **A** `bdsolarpower.com` → `185.158.133.1` (Lovable proxy)
- **A** `www.bdsolarpower.com` → `185.158.133.1`
- **MX:** none · **TXT:** none — no email or verification records to preserve
- A-record TTL is 3600s — allow up to ~1 hour for full propagation after cutover

## Repo-side prep (already committed)

- `public/_headers` — security headers + cache policy (CF Pages applies the **last** matching rule)
- `public/_redirects` — legacy `/blog/17` and `/blog/18` → slug 301s
- `.nvmrc` — pins **Node 22** for the Pages build environment
- `package-lock.json` — re-synced so `npm ci` works in CI

## Steps (est. 30–45 minutes, plus DNS propagation)

### 1. Cloudflare account + zone
1. Log in / create an account at dash.cloudflare.com → **Add a site** → `bdsolarpower.com` → Free plan.
2. Cloudflare shows two nameservers (e.g. `xxx.ns.cloudflare.com`). **Do not change anything at Dynadot yet.**

### 2. Create the Pages project
1. Workers & Pages → **Create** → **Pages** → **Connect to Git** → GitHub → repo `Start-bd/bdsolarpower`, branch `main`.
2. Build settings: Framework preset **None** · Build command **`npm run build`** · Build output directory **`dist`**. (Node version comes from `.nvmrc` = 22.)
3. Deploy and note the `*.pages.dev` URL.

### 3. Validate on pages.dev BEFORE switching DNS
- [ ] Home, `/blog` (18 post links), `/solar-system-prices/3kw|5kw|10kw`, `/solar-inverter-price-bangladesh`, `/solar-battery-price-bangladesh`
- [ ] Unknown URL returns **404**: `curl -s -o /dev/null -w "%{http_code}" https://<project>.pages.dev/definitely-missing`
- [ ] HTML headers: `curl -sI https://<project>.pages.dev/ | grep -i cache-control`
- [ ] Asset headers: `curl -sI https://<project>.pages.dev/assets/<any>.js | grep -i cache-control` → `immutable`
- [ ] `/blog/17` → 301 → `/blog/solar-system-cost-bangladesh-2026`
- [ ] `/sitemap.xml` contains 29 URLs

### 4. Custom domains + redirect rule (still pre-cutover)
1. Pages project → **Custom domains** → add `bdsolarpower.com` and `www.bdsolarpower.com` (the zone is in the account, so DNS records configure automatically; they become live after step 5).
2. Zone → **Rules → Redirect Rules** → use the *Redirect from WWW to root* template → **301**, "Site live".
3. SSL/TLS → Edge Certificates → enable **Always Use HTTPS** and **HSTS** (max-age 1 year, include subdomains).
4. Pages project → Settings → Builds & deployments → **Trailing slashes → Transform** (canonical URLs have no trailing slash; after cutover verify `/blog/1/` 301s to `/blog/1` — if behaviour differs, switch to "Ignore" and rely on canonicals).

### 5. Cutover (DNS at Dynadot)
1. Dynadot → `bdsolarpower.com` → Nameservers → replace `ns1/ns2.dyna-ns.net` with the two Cloudflare nameservers from step 1.
2. Save the old values — **rollback = change them back** (Lovable keeps serving meanwhile).

### 6. Post-cutover validation
- [ ] Nameservers show Cloudflare (dig / dnschecker)
- [ ] Repeat the step-3 checklist on the real domain
- [ ] `curl -sI https://www.bdsolarpower.com/` → `301` → apex, single hop
- [ ] SSL certificate issued (automatic, usually minutes)
- [ ] In GSC: re-verify property (the meta tag persists), resubmit the sitemap, request indexing for the five new pages

### 7. Aftercare
- Lovable remains usable as an editor; its GitHub sync now feeds Pages automatically — the **Publish button is no longer needed for hosting**.
- Watch GSC → Page indexing for a week: soft-404s should vanish as Google recrawls.
- Note: if the Pages checkout is shallow, sitemap `lastmod` falls back to build date — acceptable; can be refined later with a full clone setting.

## Open questions
- Confirm access to the **Dynadot registrar account** (needed only for step 5).
- If moving nameservers is ever blocked, the fallback (CNAME to `<project>.pages.dev` for `www` plus apex flattening at Dynadot) is messier — moving NS is the clean path.
