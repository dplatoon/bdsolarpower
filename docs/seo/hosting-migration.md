# Hosting Migration — Lovable → Cloudflare Pages

**Why:** three Phase 2 issues can only be fixed at the hosting layer, and the current
host also cannot deploy automatically from GitHub pushes:

| Problem today | Symptom (verified on production, Sep 2026) |
|---|---|
| Unknown URLs return the homepage | `GET /any-missing-path` → **HTTP 200** with homepage HTML (soft-404) |
| No HTML cache policy | `cache-control: no-cache, must-revalidate, max-age=0` on every page |
| `www` redirect is 302 | `https://www.bdsolarpower.com/* → 302` (should be a 301) |
| Deploys are manual | GitHub push does nothing until **Publish** is clicked in the Lovable editor |

Cloudflare Pages fixes all four: it serves `dist/404.html` with a real 404 status, honors
`_headers` / `_redirects` (already committed in `public/`), and deploys automatically on
every push to `main`.

---

## Steps

1. **Create the Pages project**
   - Cloudflare dashboard → Workers & Pages → Create → Pages → **Connect to Git**
   - Repository: `Start-bd/bdsolarpower`, production branch: `main`
   - Build command: `npm run build` · Build output directory: `dist`
   - Node version: set env var `NODE_VERSION=20` (prerender script needs Node ≥ 18)

2. **Verify on the preview URL** (`<project>.pages.dev`) before touching DNS:
   - [ ] `curl -sI https://<project>.pages.dev/whatever-missing` → **404**
   - [ ] `curl -sI https://<project>.pages.dev/` → `cache-control` shows `s-maxage`
   - [ ] `curl https://<project>.pages.dev/blog | grep -c 'href="/blog/'` → **18**
   - [ ] `curl -s https://<project>.pages.dev/blog/17 -D - | grep -i location` → **301** to the slug URL
   - [ ] `curl -s https://<project>.pages.dev/this-does-not-exist | grep -i '<title'` → 404 page, not homepage
   - [ ] `https://www.<preview-domain>` behaviour (www redirect only tested on custom domain)
   - [ ] Spot-check a prerendered page's HTML (title, canonical, OG tags)

3. **Attach the custom domain** (DNS cutover)
   - In Pages → Custom domains → add `bdsolarpower.com` and `www.bdsolarpower.com`
   - In Cloudflare DNS (the domain already uses Cloudflare nameservers):
     - `bdsolarpower.com` → replace the current Lovable target with the Pages custom-domain CNAME (Cloudflare flattens at apex)
     - `www` → CNAME to `<project>.pages.dev`
   - SSL/TLS mode: **Full (strict)**; wait for the certificate to go Active

4. **Post-cutover verification** (run the production checks again):
   - [ ] `GET /missing-path` → 404; no homepage canary
   - [ ] `www → apex` single-hop **301**
   - [ ] HTML `cache-control` includes `s-maxage` + `stale-while-revalidate`
   - [ ] `/blog/17` and `/blog/18` redirect 301 to slug URLs
   - [ ] `/blog` still exposes 18 crawlable links; OG images absolute
   - [ ] `x-deployment-id` header gone (Cloudflare Pages headers instead)

5. **Rollback plan**
   - DNS records are the only switch — restore the previous Lovable targets and the
     old host resumes serving. Keep the Lovable project untouched for at least a week
     (it remains the editor + GitHub sync; nothing there needs changing).

## Notes

- `public/_headers` and `public/_redirects` are already committed; they are copied into
  `dist/` automatically by Vite and are **inert** on the Lovable host.
- The prerender pipeline writes a real `404.html`; Cloudflare Pages serves it with a 404
  status for any unmatched path, which is exactly what we want (no SPA fallback).
- Vercel alternative: same build settings, but `_headers`/`_redirects` are ignored —
  you would move those rules into `vercel.json` (`headers` + `redirects` arrays).

## Google Search Console (unchanged property)

- Property + verification meta already exist (`google-site-verification` in `index.html`).
- After 1–2 weeks on the new host: check **Pages** report for the 404 fix (the soft-404
  “Crawled – currently not indexed” noise on random URLs should clear up).
- Use URL Inspection → *Request Indexing* for `/blog` and the two slugged posts.
- Submit `https://bdsolarpower.com/sitemap.xml` if not already submitted.
