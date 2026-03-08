

# Audit Report: Recent Changes and Current Condition

## Recent Changes Summary

Three features were added to the blog system:

1. **Hero Images** -- 15 AI-generated images mapped via `src/data/blogHeroImages.ts`, displayed in both listing cards (`BlogPostCard.tsx`) and individual posts (`BlogPost.tsx`).

2. **Related Posts Section** -- Bottom of each blog post shows up to 3 related articles filtered by matching `equipment` or `category`, with hero images, badges, and navigation.

3. **Table of Contents Sidebar** -- Sticky left sidebar (`BlogTableOfContents.tsx`) with scroll-spy active highlighting, visible on `xl` screens only, hidden on smaller screens.

---

## Current Condition Assessment

### Working Well
- No console errors detected
- All 15 blog posts have hero images mapped correctly
- SEO is comprehensive: structured data (LocalBusiness, Organization, Article, BreadcrumbList, FAQ), Open Graph, Twitter Cards, canonical URLs, geo tags
- Sitemap includes all 15 blog posts and core pages
- Robots.txt properly blocks `/auth` and `/my-dashboard`

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| TOC hidden on mobile/tablet | Medium | `hidden xl:block` means TOC is invisible below 1280px -- most users won't see it |
| Related post cards missing `group` class | Low | `group-hover:scale-105` on images won't trigger because parent `<button>` lacks `group` class |
| Blog card hover bg doesn't work | Low | Dynamic Tailwind class `hover:${frame.badge}` in `BlogPostCard.tsx` line 141 won't work -- Tailwind purges dynamic classes |
| OG image is a generic screenshot URL | Low | All pages share one R2 screenshot URL as the OG image instead of per-page images |
| `modifiedTime` hardcoded | Low | BlogPost.tsx hardcodes `modifiedTime` to `"2026-03-08T00:00:00Z"` for all posts |
| No `/auth` or `/my-dashboard` in sitemap | Info | Correct -- these are private routes blocked in robots.txt |

### Recommended Fixes

1. **Fix dynamic Tailwind class** in `BlogPostCard.tsx` -- replace the dynamic `hover:${frame.badge}` with a static hover class per equipment type, or add those classes to the safelist.

2. **Add `group` class** to the related post `<button>` in `BlogPost.tsx` so the image hover scale effect works.

3. **Make TOC accessible on smaller screens** -- add a collapsible/floating TOC for tablet and mobile users.

4. **Generate per-post OG images** -- use each blog's hero image as its `ogImage` prop for better social sharing previews.

5. **Remove hardcoded `modifiedTime`** -- derive it from post data or omit if not tracked.

