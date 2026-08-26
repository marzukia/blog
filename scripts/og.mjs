// OG image generator for mrzk.io — one 1200x630 poster per post/paper + site default.
//
// Usage:  bun run og        (before `hugo` in CI, or once after cloning for dev)
//
// Reads each item's front matter (title, tags, date) in content/posts and
// content/papers and writes content/<section>/<slug>/og.png. The site default
// (home + pages without a post image) is written to static/img/ogbanner.png.
// Outputs are gitignored and regenerated on every build, so adding a post
// needs zero manual work.
//
// Design system: enokidev/ui (enoki.css tokens) 3-face system. Poster frame
// with hard offset shadow, Anton display (solid + hollow last word),
// Archivo labels (site UI face), tag chips. No serif — posters carry no prose.
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { createElement as h } from "satori/jsx";
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// ---- site tokens (assets/css/enoki.css :root, light) ----
const PAPER = "#efe9db";
const PAPER2 = "#e7ddc9";
const PAPER3 = "#ddd0b6";
const INK = "#16130e";
const INK2 = "#5a5140";
const RED = "#c21c00";
const CREAM = "#f1ead9";
const GRID = "rgba(22,19,14,0.07)";
const GRIDBG = `linear-gradient(to right, ${GRID} 1px, transparent 1px), linear-gradient(to bottom, ${GRID} 1px, transparent 1px)`;

// ---- fonts (committed, woff1 — satori's bundled opentype is woff1-only) ----
const fontDir = join(ROOT, "fonts");
const fonts = [
  { name: "Anton", data: readFileSync(join(fontDir, "anton.woff")), weight: 400 },
  { name: "Archivo", data: readFileSync(join(fontDir, "archivo-400.woff")), weight: 400 },
  { name: "Archivo", data: readFileSync(join(fontDir, "archivo-600.woff")), weight: 600 },
  { name: "Archivo", data: readFileSync(join(fontDir, "archivo-700.woff")), weight: 700 },
];

const W = 1200;
const H = 630;
const MARK = "#ff00ff"; // hollow marker colour, swapped for stroke post-render
const HOLLOW_STROKE = 2.5;
const SITE = "MRZK";
const SLOGAN = "Net Zero Productivity by 2050";
const URL = "mrzk.io";

// ---- element helpers (satori: every container with children needs display) ----
const d = (style, ...c) => h("div", { style: { display: "flex", ...style } }, ...c);
const sp = (style, ...c) => h("span", { style: { display: "flex", ...style } }, ...c);
const mono = (o = {}) => ({ fontFamily: "Archivo, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em", ...o });
const anton = (o = {}) => ({ fontFamily: "Anton, sans-serif", textTransform: "uppercase", ...o });

const chip = (t) =>
  sp({ ...mono({ fontSize: 15, fontWeight: 700, letterSpacing: "0.06em" }), padding: "10px 16px", border: `2px solid ${INK}`, background: PAPER2, color: INK, whiteSpace: "nowrap" }, t);

const BARS = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1];
const barcode = () =>
  d({ alignItems: "flex-end", gap: 3 }, ...BARS.map((w) => d({ width: w * 2.4, height: 44, background: INK })));

const headerStrip = (label) =>
  d({ ...mono({ background: INK, justifyContent: "space-between", alignItems: "center", padding: "14px 24px", fontSize: 15, letterSpacing: "0.1em", color: CREAM }) },
    sp(null, label),
    sp({ color: "#ff5a3c" }, `${W}×${H}`),
  );

const metaRow = ({ date, words, kind = "POSTS" }) =>
  d({ justifyContent: "space-between", alignItems: "center", ...mono({ fontSize: 16, color: INK2 }) },
    sp(null, `${SITE} / ${kind}`),
    d(null, date ? sp({ color: RED, fontWeight: 700 }, date) : null, sp(null, `${date ? "  /  " : ""}${words} WORDS`)),
  );

const rule = () => d({ borderTop: `2px solid ${INK}`, marginTop: 14 });

// Anton avg glyph width ~0.58em. Pick the largest size in [56..92] whose
// estimated wrapped line count fits the title area (300px).
const TITLE_MAX_W = 960;
const TITLE_AREA_H = 300;
function fitTitleSize(title, maxW = TITLE_MAX_W, areaH = TITLE_AREA_H) {
  const chars = title.length;
  const longestWord = Math.max(...title.split(/\s+/).map((w) => w.length));
  for (let s = 92; s >= 56; s--) {
    if (s * 0.58 * longestWord > maxW) continue; // one word must fit a line
    const lines = Math.ceil((chars * 0.58 * s) / maxW);
    if (lines * 0.95 * s <= areaH) return s;
  }
  return 56;
}

// ---- poster for a post / paper ----
function poster({ title, date, words, tags, kind = "POSTS" }) {
  const safe = title.replace(/[\u2010-\u2015\u2212]/g, "-"); // normalise fancy hyphens for the display font
  const size = fitTitleSize(safe);
  const i = safe.lastIndexOf(" ");
  const rest = i > 0 ? safe.slice(0, i) : safe;
  const last = i > 0 ? safe.slice(i + 1) : "";
  const titleStyle = (color) => ({ display: "flex", ...anton({ fontSize: size, lineHeight: 0.95, letterSpacing: "0.5px", color, margin: 0, maxWidth: TITLE_MAX_W }) });

  const bottom = d({ justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto", gap: 24 },
    tags.length
      ? d({ gap: 10, flexWrap: "wrap", maxWidth: 680 }, ...tags.map(chip))
      : d({}),
    d({ flexDirection: "column", alignItems: "flex-end", gap: 8 },
      barcode(),
      sp({ ...mono({ fontSize: 13, letterSpacing: "0.1em", color: INK2 }) }, `${URL} / ${date || "2026"}`),
    ),
  );

  return d({ width: W, height: H, background: PAPER3, backgroundImage: GRIDBG, backgroundSize: "48px 48px", padding: 44, boxSizing: "border-box" },
    d({ width: "100%", height: "100%", background: PAPER, border: `3px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}`, flexDirection: "column", boxSizing: "border-box" },
      headerStrip(`${SITE} — ${SLOGAN}`),
      d({ flex: 1, flexDirection: "column", padding: "30px 36px 28px" },
        metaRow({ date, words, kind }),
        rule(),
        d({ marginTop: 34, flex: 1, flexDirection: "column" },
          h("h1", { style: titleStyle(INK) }, rest),
          last ? h("h1", { style: titleStyle(MARK) }, last) : h("div", { style: { display: "none" } }),
        ),
        bottom,
      ),
    ),
  );
}

// ---- site default: ANDRYO (solid) / MARZUKI (hollow) + slogan ----
function homeBanner() {
  const size = 150;
  return d({ width: W, height: H, background: PAPER3, backgroundImage: GRIDBG, backgroundSize: "48px 48px", padding: 44, boxSizing: "border-box" },
    d({ width: "100%", height: "100%", background: PAPER, border: `3px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}`, flexDirection: "column", boxSizing: "border-box" },
      headerStrip(SITE),
      d({ flex: 1, flexDirection: "column", justifyContent: "center", padding: "20px 36px 28px" },
        h("h1", { style: { display: "flex", ...anton({ fontSize: size, lineHeight: 0.92, letterSpacing: "1px", color: INK, margin: 0 }) } }, "ANDRYO"),
        h("h1", { style: { display: "flex", ...anton({ fontSize: size, lineHeight: 0.92, letterSpacing: "1px", color: MARK, margin: 0 }) } }, "MARZUKI"),
        d({ marginTop: 36, alignItems: "center", gap: 16 },
          d({ width: 18, height: 18, background: RED }),
          sp({ ...mono({ fontSize: 20, fontWeight: 700, letterSpacing: "0.14em", color: INK }) }, SLOGAN),
        ),
        d({ marginTop: "auto", justifyContent: "space-between", alignItems: "flex-end", gap: 24 },
          sp({ ...mono({ fontSize: 13, letterSpacing: "0.1em", color: INK2 }) }, `${URL} / ${SITE}`),
          barcode(),
        ),
      ),
    ),
  );
}

// ---- render: satori -> hollow swap -> resvg png ----
async function svgOf(el) {
  let svg = await satori(el, { width: W, height: H, fonts, loadGoogleFonts: false });
  return svg.replaceAll(`fill="${MARK}"`, `fill="none" stroke="${INK}" stroke-width="${HOLLOW_STROKE}" stroke-linejoin="miter"`);
}

async function render(file, el) {
  const png = new Resvg(await svgOf(el), { fitTo: { mode: "width", value: W } }).render().asPng();
  writeFileSync(file, png);
}

// ---- tiny front matter reader (no deps) ----
function readPost(dir) {
  const raw = readFileSync(join(dir, "index.md"), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  const fm = m ? m[1] : "";
  const str = (k) => {
    const r = fm.match(new RegExp(`^${k}:\\s*["']?([^"']+)["']?`, "m"));
    return r ? r[1].trim() : "";
  };
  const tagsRaw = fm.match(/^tags:\s*\[([^\]]*)\]/m);
  const tags = tagsRaw
    ? tagsRaw[1].split(",").map((t) => t.trim().replace(/^["']|["']$/g, "")).filter(Boolean).slice(0, 4)
    : [];
  const dateRaw = str("date") || (fm.match(/^date:\s*(\d{4}-\d{2}-\d{2})/) || [])[1] || "";
  const date = dateRaw.slice(0, 10).replaceAll("-", ".");
  // word count: strip front matter, shortcodes, html, markdown noise
  const body = raw.slice(m ? m[0].length : 0).replace(/\{\{[<%][\s\S]*?[>%]\}\}/g, " ").replace(/<[^>]+>/g, " ").replace(/[#*_`>|~]/g, " ");
  const words = Math.max(1, body.split(/\s+/).filter(Boolean).length);
  const title = str("title") || dir.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
  return { title, tags, date, words };
}

// ---- main ----
let failed = 0;
for (const section of ["posts", "papers"]) {
  const sectionDir = join(ROOT, "content", section);
  if (!existsSync(sectionDir)) continue;
  const dirs = readdirSync(sectionDir).filter((n) => statSync(join(sectionDir, n)).isDirectory());
  for (const n of dirs) {
    const dir = join(sectionDir, n);
    if (!existsSync(join(dir, "index.md"))) continue;
    try {
      const data = readPost(dir);
      await render(join(dir, "og.png"), poster({ ...data, kind: section.toUpperCase() }));
      console.log(`og  ${section}/${n}  (${data.words} words, ${data.title.slice(0, 48)}...)`);
    } catch (e) {
      failed++;
      console.error(`FAIL ${section}/${n}: ${e.message}`);
    }
  }
}
try {
  const out = join(ROOT, "static/img/ogbanner.png");
  mkdirSync(dirname(out), { recursive: true });
  await render(out, homeBanner());
  console.log("og  (default -> static/img/ogbanner.png)");
} catch (e) {
  failed++;
  console.error(`FAIL default: ${e.message}`);
}
if (failed) {
  console.error(`${failed} OG image(s) failed`);
  process.exit(1);
}
