/**
 * Robust reader for the blog data file (src/data/blogPosts.ts).
 *
 * Splits the exported array into per-post blocks before extracting fields, so
 * extraction does not depend on field order. (An earlier regex required `slug`
 * to sit directly under `id` and silently missed posts when fields moved.)
 *
 * @param {string} source - raw contents of src/data/blogPosts.ts
 * @returns {{ id: string, slug: string | null }[]}
 */
export function getBlogEntries(source) {
  return source
    .split(/\n\s*\{\n/)
    .map((block) => {
      // Each block starts right after `{\n`, so the first field line has no
      // leading newline — allow both start-of-block and start-of-line.
      const id = block.match(/(?:^|\n)[ \t]*id:\s*"([^"]+)"/);
      if (!id) return null;
      const slug = block.match(/(?:^|\n)[ \t]*slug:\s*"([^"]+)"/);
      return { id: id[1], slug: slug ? slug[1] : null };
    })
    .filter(Boolean);
}
