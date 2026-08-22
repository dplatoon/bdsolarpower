/**
 * Build-time prerender: renders every public route to static HTML so crawlers
 * see content and structured data without executing JavaScript.
 *
 * Run after `vite build` + `vite build --ssr`.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const SERVER_ENTRY = path.join(ROOT, "dist-ssr", "entry-server.js");

// Hard cap so the published output can never blow past hosting file limits.
const MAX_PRERENDER_PAGES = Number(process.env.MAX_PRERENDER_PAGES ?? 500);

const { render } = await import(pathToFileURL(SERVER_ENTRY).href);

// Blog post ids come from the source data so new posts are prerendered too.
const blogSource = fs.readFileSync(path.join(ROOT, "src/data/blogPosts.ts"), "utf8");
const blogIds = [...blogSource.matchAll(/^\s*id:\s*"([^"]+)"/gm)].map((m) => m[1]);

const routes = [
  "/",
  "/dashboard",
  "/ai-tools",
  "/investors",
  "/learn",
  "/blog",
  ...blogIds.map((id) => `/blog/${id}`),
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
    const { html, head } = render(route);

    let page = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    );

    if (head) {
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
