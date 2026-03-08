

## Codebase Audit & Fix Plan

After reviewing the entire project, here are the issues found and the fixes to implement:

### Issues Found

1. **Blog data mismatch**: `Blog.tsx` has 15 posts but `BlogPost.tsx` only has 6 different posts. Clicking "Read More" on blog posts 7-15 shows "Post Not Found". Posts 1-6 show wrong content (different titles/authors).

2. **Sitemap has invalid `/contact` route**: Sitemap lists `https://bdsolarpower.com/contact` but no `/contact` route exists. The contact form is a section on the homepage.

3. **Duplicate structured data**: `index.html` has Organization schema AND `SEO.tsx` also injects Organization + LocalBusiness schemas on every page with `includeLocalBusiness=true`. This creates duplicate JSON-LD on the homepage.

4. **No `noindex` on private pages**: `/auth` and `/my-dashboard` should have `noindex` to prevent indexing of login/user dashboard pages.

5. **`robots.txt` missing disallow rules**: Auth and user dashboard pages should be disallowed for crawlers.

6. **Placeholder contact info**: WhatsApp number `8801700000000` in ContactForm and phone `+880 1700-000000` in Footer are placeholders. (Will note but leave as-is since these are business-specific.)

7. **Blog page incorrectly uses `type="article"`**: The blog listing page is not an article, it's a `CollectionPage`. Individual blog posts correctly use `article`.

8. **SEO `modifiedTime` values are stale**: Several pages have hardcoded dates from early 2025.

### Implementation Plan

**1. Sync BlogPost.tsx data with Blog.tsx** -- Replace the 6-post array in `BlogPost.tsx` with the same 15 posts from `Blog.tsx` so all "Read More" links work.

**2. Fix sitemap.xml** -- Remove the `/contact` entry (no route exists). Update `lastmod` dates to `2026-03-08`.

**3. Fix duplicate structured data** -- Set `includeLocalBusiness={false}` on the Index page SEO component since `index.html` already has Organization schema. Other pages can keep it since `index.html` schema only loads once.

**4. Add noindex to private pages** -- Add a `noIndex` prop to SEO component. Use it on Auth and UserDashboard pages.

**5. Update robots.txt** -- Add `Disallow: /auth` and `Disallow: /my-dashboard`.

**6. Fix Blog listing page SEO type** -- Change Blog.tsx from `type="article"` to `type="website"` (it's a listing, not an article).

**7. Update stale dates** -- Update `modifiedTime` across pages to current date.

**8. Add SEO to UserDashboard** -- Currently missing SEO component entirely.

### Files to modify
- `src/pages/BlogPost.tsx` -- sync blog post data
- `public/sitemap.xml` -- remove `/contact`, update dates
- `src/pages/Index.tsx` -- set `includeLocalBusiness={false}`
- `src/components/SEO.tsx` -- add `noIndex` prop support
- `src/pages/Auth.tsx` -- add SEO with noindex
- `src/pages/UserDashboard.tsx` -- add SEO with noindex
- `public/robots.txt` -- add disallow rules
- `src/pages/Blog.tsx` -- fix type to `website`
- `src/pages/Learn.tsx` -- update modifiedTime

