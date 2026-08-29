// Regenerates public/sitemap.xml with accurate <lastmod> dates.
//
// Why: a sitemap with the same static lastmod on every URL (or one that gets
// bumped to "today" on every build regardless of whether the page actually
// changed) is a known anti-pattern — Google's own guidance says an
// inaccurate lastmod signal gets ignored or can reduce crawler trust in the
// whole sitemap. Instead this pulls each page's real last-modified date from
// git history, so lastmod reflects genuine content changes.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const baseUrl = "https://bdsolarpower.com";

function gitDate(args) {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cd", "--date=short", ...args],
      { cwd: rootDir, encoding: "utf8" }
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}

const today = new Date().toISOString().slice(0, 10);

// Last commit date touching any of the given files, falling back to today
// (e.g. for uncommitted local changes, or files outside git history).
function lastModForFiles(files) {
  const dates = files.map((f) => gitDate(["--", f])).filter(Boolean);
  return dates.length ? dates.sort().at(-1) : today;
}

// Last commit that introduced/touched this specific blog post's id field,
// falling back to the blog data files' own last-modified date.
function lastModForBlogPost(id) {
  // -S<string> takes the literal search text as one argument; since this
  // runs via execFileSync (no shell), the embedded quotes need no escaping.
  const pickaxeDate = gitDate([
    `-Sid: "${id}"`,
    "--",
    "src/data/blogPosts.ts",
  ]);
  return (
    pickaxeDate ||
    lastModForFiles(["src/data/blogPosts.ts", "src/data/blogPostContent.ts"])
  );
}

const blogPostsSource = readFileSync(
  join(rootDir, "src/data/blogPosts.ts"),
  "utf8"
);
const blogPostIds = [...blogPostsSource.matchAll(/id:\s*"(\d+)"/g)].map(
  (m) => m[1]
);

const pages = [
  {
    loc: "/",
    changefreq: "weekly",
    priority: "1.0",
    files: ["src/pages/Index.tsx"],
  },
  {
    loc: "/dashboard",
    changefreq: "daily",
    priority: "0.9",
    files: ["src/pages/Dashboard.tsx", "src/components/SolarDataDashboard.tsx"],
  },
  {
    loc: "/ai-tools",
    changefreq: "weekly",
    priority: "0.9",
    files: ["src/pages/AITools.tsx"],
  },
  {
    loc: "/investors",
    changefreq: "weekly",
    priority: "0.9",
    files: ["src/pages/Investors.tsx", "src/components/InvestorMetrics.tsx"],
  },
  {
    loc: "/learn",
    changefreq: "monthly",
    priority: "0.8",
    files: ["src/pages/Learn.tsx"],
  },
  {
    loc: "/blog",
    changefreq: "weekly",
    priority: "0.8",
    files: ["src/pages/Blog.tsx", "src/data/blogPosts.ts"],
  },
  ...blogPostIds.map((id) => ({
    loc: `/blog/${id}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: lastModForBlogPost(id),
  })),
];

const urlEntries = pages
  .map((page) => {
    const lastmod = page.lastmod || lastModForFiles(page.files);
    return `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(join(rootDir, "public/sitemap.xml"), xml);
console.log(`Generated public/sitemap.xml with ${pages.length} URLs.`);
