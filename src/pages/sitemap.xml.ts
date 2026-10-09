// =====================================================================
//  sitemap.xml – wird beim Build automatisch erzeugt.
//  Jede Seite in src/pages landet hier von selbst, neue Unterseiten
//  müssen also nicht von Hand eingetragen werden.
//  Seiten, die nicht bei Google erscheinen sollen (noindex), ausschließen.
// =====================================================================
import { SITE_URL } from "../data/site";

const EXCLUDE = ["/rechtliches", "/404"];

export function GET() {
  const paths = Object.keys(import.meta.glob("./**/*.astro"))
    .filter((file) => !file.includes("["))
    .map((file) => file.replace(/^\./, "").replace(/\.astro$/, "").replace(/\/index$/, "/"))
    .filter((path) => !EXCLUDE.includes(path))
    .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

  const urls = paths.map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n  </url>`).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
