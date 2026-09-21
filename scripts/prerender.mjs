/**
 * Build-time prerender: renders every public route to static HTML so crawlers
 * see content and structured data without executing JavaScript.
 *
 * Run after `vite build` + `vite build --ssr`.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { getBlogEntries } from "./lib/blog-entries.mjs";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const SERVER_ENTRY = path.join(ROOT, "dist-ssr", "entry-server.js");

// Hard cap so the published output can never blow past hosting file limits.
const MAX_PRERENDER_PAGES = Number(process.env.MAX_PRERENDER_PAGES ?? 500);

// Minimal browser shims: the Supabase client reads localStorage at import time.
// `window` stays undefined so components keep taking their server-safe branch.
if (typeof globalThis.localStorage === "undefined") {
  const store = new Map();
  globalThis.localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => void store.set(k, String(v)),
    removeItem: (k) => void store.delete(k),
    clear: () => store.clear(),
    key: (i) => [...store.keys()][i] ?? null,
    get length() {
      return store.size;
    },
  };
}

const { render } = await import(pathToFileURL(SERVER_ENTRY).href);

// Blog post ids come from the source data so new posts are prerendered too.
const blogSource = fs.readFileSync(path.join(ROOT, "src/data/blogPosts.ts"), "utf8");
// Slugged posts are rendered at BOTH the slug (their canonical URL) and their
// legacy numeric id, so old links keep working instead of falling through to
// the host's SPA fallback (which would serve the homepage at HTTP 200).
const blogSegments = getBlogEntries(blogSource).flatMap(({ id, slug }) =>
  slug ? [id, slug] : [id]
);

const routes = [
  "/",
  "/solar-system-price-bangladesh",
  "/1kw-solar-system-price-bangladesh",
  "/3kw-solar-system-price-bangladesh",
  "/5kw-solar-system-price-bangladesh",
  "/10kw-solar-system-price-bangladesh",
  "/net-metering-bangladesh",
  "/residential-solar-bangladesh",
  "/commercial-solar-bangladesh",
  "/solar-calculator-bangladesh",
  "/solar-projects-bangladesh",
  "/factory-solar-bangladesh",
  "/office-solar-bangladesh",
  "/school-solar-bangladesh",
  "/hospital-solar-bangladesh",
  "/solar-company-dhaka",
  "/solar-company-chittagong",
  "/solar-company-sylhet",
  "/solar-company-rajshahi",
  "/solar-company-mymensingh",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/blog/solar-panel-price-bangladesh",
  "/blog/5kw-solar-system-bangladesh",
  "/blog/net-metering-bangladesh-guide",
  "/blog/grid-tied-vs-hybrid-solar-bangladesh",
  "/blog/solar-panel-maintenance-bangladesh",
  "/blog/how-to-reduce-electricity-bill-bangladesh",
  "/solar-inverter-price-bangladesh",
  "/solar-battery-price-bangladesh",
  "/blog",
  ...blogSegments.map((segment) => `/blog/${segment}`),
  // Rendered to 404.html so static hosts serve a real 404 status.
  "/404",
];

if (routes.length > MAX_PRERENDER_PAGES) {
  console.warn(
    `[prerender] ${routes.length} routes exceeds MAX_PRERENDER_PAGES=${MAX_PRERENDER_PAGES}; truncating.`
  );
  routes.length = MAX_PRERENDER_PAGES;
}

const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");

let ok = 0;
let failed = 0;

for (const route of routes) {
  try {
    const { html, head } = await render(route);

    let page = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    );

    if (head) {
      // Strip the static defaults Helmet re-emits, so each page has exactly one
      // title/description/canonical/social tag set.
      page = page
        .replace(/\n?\s*<title>[\s\S]*?<\/title>/i, "")
        .replace(
          /\n?\s*<meta\s+name="(?:title|description|author|robots)"[^>]*>/gi,
          ""
        )
        .replace(/\n?\s*<link\s+rel="canonical"[^>]*>/gi, "")
        .replace(/\n?\s*<meta\s+property="og:[^"]*"[^>]*>/gi, "")
        .replace(/\n?\s*<meta\s+name="twitter:[^"]*"[^>]*>/gi, "");

      // Helmet-managed tags win over the static defaults in index.html.
      page = page.replace("</head>", `  ${head}\n  </head>`);
    }

    const outPath =
      route === "/"
        ? path.join(DIST, "index.html")
        : route === "/404"
          ? path.join(DIST, "404.html")
          : path.join(DIST, route.replace(/^\//, ""), "index.html");

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, page);
    ok += 1;
  } catch (error) {
    failed += 1;
    console.warn(`[prerender] skipped ${route}: ${error?.message ?? error}`);
  }
}

console.log(`[prerender] ${ok} pages written, ${failed} skipped`);
