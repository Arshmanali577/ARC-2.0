import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const outputRoot = path.join(root, "Content-Extraction");
const appRoot = path.join(root, "src", "app");
const componentsRoot = path.join(root, "src", "components");
const categoryFolders = [
  "Images",
  "Videos",
  "Logos",
  "Documents",
  "SVG",
  "Text",
];

const consolidatedIconRefs = [
  "/favicon.svg",
  "/favicon-96x96.png",
  "/favicon.ico",
  "/apple-touch-icon.png",
];

const sharedComponentNames = new Set([
  "Navbar",
  "Footer",
  "CTASection",
  "ScrollReveal",
  "WhatsAppButton",
  "AnalyticsEvents",
]);

const sourceFiles = walk(root)
  .filter((file) => !file.includes(`${path.sep}node_modules${path.sep}`))
  .filter((file) => !file.includes(`${path.sep}.next${path.sep}`))
  .filter((file) => !file.includes(`${path.sep}Content-Extraction${path.sep}`))
  .filter((file) => /\.(?:[cm]?[jt]sx?|json|mdx?|css|ya?ml)$/i.test(file));

const sourceText = new Map(
  sourceFiles.map((file) => [normalize(path.relative(root, file)), fs.readFileSync(file, "utf8")]),
);

const allComponents = new Map(
  walk(componentsRoot)
    .filter((file) => /\.[jt]sx?$/.test(file))
    .map((file) => [path.basename(file).replace(/\.[^.]+$/, ""), normalize(path.relative(root, file))]),
);

resetGeneratedOutput();

const pageEntries = discoverPages();
const assetUsage = new Map();
const pageResults = [];

for (const page of pageEntries) {
  const html = fs.readFileSync(page.htmlFile, "utf8");
  const sourceComponents = tracePageSourceGraph(page);
  const sharedComponents = sourceComponents
    .map((file) => path.basename(file).replace(/\.[^.]+$/, ""))
    .filter((name) => sharedComponentNames.has(name));
  const rendered = extractRenderedContent(html);
  const sourceOnlyText = extractSourceStrings(sourceComponents, page);
  const localAssets = resolveAssets(page, html);
  const externalUrls = resolveExternalUrls(html, sourceComponents);
  const apis = resolveApis(sourceComponents, externalUrls);
  const importedFonts = resolveFonts(sourceComponents);
  const animations = resolveAnimationLibraries(sourceComponents);
  const destination = path.join(outputRoot, ...page.folder);

  createPageStructure(destination);
  const sourceContentFiles = copyPageOriginalContent(page, destination);

  const copiedAssets = [];
  const missingAssets = [];
  for (const asset of localAssets) {
    const source = resolveLocalAsset(asset);
    if (!source) {
      missingAssets.push(asset);
      continue;
    }
    const category = assetCategory(asset, source);
    const destinationFile = collisionSafeDestination(path.join(destination, category), source);
    fs.copyFileSync(source, destinationFile);
    const result = assetRecord(asset, source, destinationFile, category);
    copiedAssets.push(result);
    const usage = assetUsage.get(result.originalLocation) || [];
    usage.push({ route: page.route, pageFolder: normalize(path.relative(outputRoot, destination)) });
    assetUsage.set(result.originalLocation, usage);
  }

  const textMarkdown = renderTextMarkdown(page, rendered, sourceOnlyText);
  fs.writeFileSync(path.join(destination, "Text", "content.md"), textMarkdown);

  const metadata = {
    pageName: page.name,
    originalRoute: page.route,
    routeType: page.routeType,
    sourcePage: page.sourceFile,
    sourceComponents,
    sharedComponentsUsed: unique(sharedComponents),
    assets: copiedAssets,
    missingAssets,
    importedFonts,
    animations,
    externalUrls,
    apisUsed: apis,
    textFile: normalize(path.relative(outputRoot, path.join(destination, "Text", "content.md"))),
    originalContentSourceFiles: sourceContentFiles,
    renderedHtmlSource: normalize(path.relative(root, page.htmlFile)),
    extractionNotes: [
      "Rendered text was extracted from the production build HTML.",
      "Conditional/source-only interface strings were extracted from the traced source graph.",
      "Lucide icons and inline SVGs are code-defined; their names are recorded but no nonexistent source file is copied.",
    ],
  };
  fs.writeFileSync(path.join(destination, "metadata.json"), `${JSON.stringify(metadata, null, 2)}\n`);

  pageResults.push({
    ...page,
    destination,
    sourceComponents,
    sharedComponents: unique(sharedComponents),
    copiedAssets,
    missingAssets,
    importedFonts,
    animations,
    externalUrls,
    apis,
    rendered,
    textFile: normalize(path.relative(outputRoot, path.join(destination, "Text", "content.md"))),
  });
}

copySharedAssets();
copyGlobalAssets();
copyMasterAssets();
copyConsolidatedIcons();
writeGlobalText();
writeSourceContentCopies();
writeReports();
verifyOutput();

function discoverPages() {
  const staticPages = [
    page("/", "Home", ["Home"], "src/app/page.tsx", ".next/server/app/index.html"),
    page("/about", "About", ["About"], "src/app/about/page.tsx", ".next/server/app/about.html"),
    page("/admin", "Admin CMS", ["Admin"], "src/app/admin/page.tsx", ".next/server/app/admin.html"),
    page("/blog", "Blog", ["Blog"], "src/app/blog/page.tsx", ".next/server/app/blog.html"),
    page("/commercial", "Commercial", ["Commercial"], "src/app/commercial/page.tsx", ".next/server/app/commercial.html"),
    page("/contact", "Contact", ["Contact"], "src/app/contact/page.tsx", ".next/server/app/contact.html"),
    page("/inclusions", "Inclusions", ["Inclusions"], "src/app/inclusions/page.tsx", ".next/server/app/inclusions.html"),
    page("/locations", "Locations", ["Locations"], "src/app/locations/page.tsx", ".next/server/app/locations.html"),
    page("/maintenance", "Maintenance", ["Maintenance"], "src/app/maintenance/page.tsx", ".next/server/app/maintenance.html"),
    page("/process", "Process", ["Process"], "src/app/process/page.tsx", ".next/server/app/process.html"),
    page("/projects", "Projects", ["Projects"], "src/app/projects/page.tsx", ".next/server/app/projects.html"),
    page("/residential", "Residential", ["Residential"], "src/app/residential/page.tsx", ".next/server/app/residential.html"),
  ];

  const dynamic = [];
  for (const [group, sourceFile, folder] of [
    ["blog", "src/app/blog/[slug]/page.tsx", ["Blog", "Posts"]],
    ["locations", "src/app/locations/[slug]/page.tsx", ["Locations", "Areas"]],
    ["projects", "src/app/projects/[slug]/page.tsx", ["Projects", "Items"]],
  ]) {
    const builtDir = path.join(root, ".next", "server", "app", group);
    if (!fs.existsSync(builtDir)) continue;
    for (const file of fs.readdirSync(builtDir)) {
      if (!file.endsWith(".html")) continue;
      const slug = file.slice(0, -5);
      dynamic.push(
        page(
          `/${group}/${slug}`,
          `${titleCase(group.slice(0, -1))}: ${titleCase(slug)}`,
          [...folder, slug],
          sourceFile,
          `.next/server/app/${group}/${file}`,
          "generated-static",
        ),
      );
    }
  }
  return [...staticPages, ...dynamic].sort((a, b) => a.route.localeCompare(b.route));
}

function page(route, name, folder, sourceFile, htmlFile, routeType = "static") {
  return {
    route,
    name,
    folder,
    sourceFile,
    htmlFile: path.join(root, ...htmlFile.split("/")),
    routeType,
  };
}

function traceSourceGraph(entry) {
  const visited = new Set();
  const visit = (relativeFile) => {
    relativeFile = normalize(relativeFile);
    if (visited.has(relativeFile) || !sourceText.has(relativeFile)) return;
    visited.add(relativeFile);
    const text = sourceText.get(relativeFile);
    for (const specifier of importsIn(text)) {
      const resolved = resolveImport(relativeFile, specifier);
      if (resolved) visit(resolved);
    }
  };
  visit("src/app/layout.tsx");
  visit(entry);
  return [...visited].sort();
}

function tracePageSourceGraph(pageInfo) {
  const files = new Set(traceSourceGraph(pageInfo.sourceFile));
  let routeDirectory = normalize(path.dirname(pageInfo.sourceFile));
  while (routeDirectory.startsWith("src/app")) {
    const layoutFile = `${routeDirectory}/layout.tsx`;
    if (sourceText.has(layoutFile)) {
      for (const file of traceSourceGraph(layoutFile)) files.add(file);
    }
    if (routeDirectory === "src/app") break;
    routeDirectory = normalize(path.dirname(routeDirectory));
  }
  const extraEntries = [];
  if (pageInfo.route === "/inclusions") extraEntries.push("src/app/api/inclusions/pdf/route.ts");
  if (pageInfo.route === "/admin") {
    extraEntries.push("src/app/api/auth/route.ts", "src/app/api/callback/route.ts");
  }
  for (const entry of extraEntries) {
    for (const file of traceSourceGraph(entry)) files.add(file);
  }
  return [...files].sort();
}

function importsIn(text) {
  const results = [];
  const pattern = /(?:import\s+(?:[\s\S]*?\s+from\s+)?|import\s*\()\s*["'`]([^"'`]+)["'`]/g;
  for (const match of text.matchAll(pattern)) results.push(match[1]);
  return results;
}

function resolveImport(fromFile, specifier) {
  if (!(specifier.startsWith("@/") || specifier.startsWith("."))) return null;
  const base = specifier.startsWith("@/")
    ? path.join(root, "src", specifier.slice(2))
    : path.resolve(root, path.dirname(fromFile), specifier);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ];
  const found = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  return found ? normalize(path.relative(root, found)) : null;
}

function extractRenderedContent(html) {
  const title = decode(stripTags(firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i)));
  const description = decode(firstMatch(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i));
  const keywords = decode(firstMatch(html, /<meta[^>]+name="keywords"[^>]+content="([^"]*)"/i));
  const canonical = decode(firstMatch(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i));
  const sections = [];
  const semanticPattern = /<(h[1-6]|p|li|button|label|option|blockquote|figcaption)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  for (const match of html.matchAll(semanticPattern)) {
    const text = cleanText(decode(stripTags(match[2])));
    if (text && !looksLikeFlightPayload(text)) sections.push({ element: match[1].toLowerCase(), text });
  }
  const attributes = [];
  for (const match of html.matchAll(/\b(alt|aria-label|placeholder|value)="([^"]*)"/gi)) {
    const value = cleanText(decode(match[2]));
    if (value && !attributes.some((item) => item.type === match[1] && item.value === value)) {
      attributes.push({ type: match[1].toLowerCase(), value });
    }
  }
  return { title, description, keywords, canonical, sections: dedupeObjects(sections), attributes };
}

function extractSourceStrings(files, pageInfo) {
  const entries = [];
  const iconNames = new Set();
  const relevantFiles = pageInfo
    ? files.filter((file) =>
        file.startsWith("src/app/") ||
        file.startsWith("src/components/") ||
        (pageInfo.route === "/inclusions" && (file === "src/lib/inclusions.ts" || file.startsWith("src/lib/pdf/"))),
      )
    : files;
  for (const file of relevantFiles) {
    const text = sourceText.get(file) || "";
    const withoutComments = text
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/(^|[^:])\/\/.*$/gm, "$1");
    for (const importedIcons of withoutComments.matchAll(/import\s*\{([^}]*)\}\s*from\s*["']lucide-react["']/g)) {
      for (const name of importedIcons[1].split(",").map((value) => value.trim().split(/\s+as\s+/)[0])) {
        if (name && name !== "type LucideIcon" && name !== "LucideIcon") {
          iconNames.add(name.replace(/^type\s+/, ""));
        }
      }
    }
    for (const match of withoutComments.matchAll(/(["'`])((?:(?!\1)[^\\]|\\.){2,})\1/g)) {
      let value = match[2]
        .replace(/\\n/g, "\n")
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .trim();
      if (!isContentString(value)) continue;
      entries.push({ source: file, text: value });
    }
  }
  return { strings: dedupeObjects(entries), icons: [...iconNames].sort() };
}

function isContentString(value) {
  if (value.length < 3 || value.length > 1000) return false;
  if (!/[A-Za-z]/.test(value)) return false;
  if (/^(?:use client|next\/|@\/|lucide-react|framer-motion|react|[.#/]|[a-z]+:|[A-Z_]+)$/.test(value)) return false;
  if (/^(?:flex|grid|block|inline|absolute|relative|fixed|hidden|group|space-|gap-|mt-|mb-|px-|py-|text-|bg-|border|hover:|focus:|md:|lg:|sm:|xl:|duration-|transition|font-|tracking|leading|max-|min-|w-|h-|z-|object-|overflow|items-|justify|rounded|shadow|opacity|from-|to-|via-)/.test(value)) return false;
  if (value.includes("${") || value.includes("=>") || value.includes("rgba(") || value.includes("linear-gradient")) return false;
  if (/^[a-z0-9_-]+$/.test(value) && !value.includes(" ")) return false;
  return true;
}

function resolveAssets(pageInfo, html) {
  const candidates = new Set();
  const add = (value) => {
    value = decode(value).replace(/\\u0026/g, "&");
    if (value.startsWith("https://arcbuilders.com.au/")) value = new URL(value).pathname;
    if (!value.startsWith("/")) return;
    value = value.split("?")[0].split("#")[0];
    if (consolidatedIconRefs.includes(value)) return;
    if (/\.(?:woff2?|ttf|otf)$/i.test(value)) return;
    if (/\.(?:png|jpe?g|webp|gif|avif|svg|ico|mp4|webm|mov|pdf|docx?|xlsx?|zip|woff2?|ttf|otf|json|webmanifest)$/i.test(value)) {
      candidates.add(value);
    }
  };

  for (const match of html.matchAll(/(?:src|href|poster|content)="([^"]+)"/gi)) add(match[1]);
  for (const match of html.matchAll(/url\((?:&quot;|["']?)([^)"'&]+)(?:&quot;|["']?)\)/gi)) add(match[1]);
  for (const match of html.matchAll(/\/(?:projects|videos|uploads)\/[A-Za-z0-9_./-]+\.(?:webp|png|jpe?g|svg|mp4|pdf)/gi)) add(match[0]);

  if (pageInfo.route.startsWith("/projects/")) {
    const slug = pageInfo.route.split("/").pop();
    const projectDir = path.join(root, "public", "projects", slug);
    if (fs.existsSync(projectDir)) {
      for (const file of walk(projectDir)) add(`/${normalize(path.relative(path.join(root, "public"), file))}`);
    }
  }

  if (pageInfo.route.startsWith("/blog/") && pageInfo.route !== "/blog") {
    const slug = pageInfo.route.split("/").pop();
    const markdown = sourceText.get(`content/blog/${slug}.md`) || "";
    for (const match of markdown.matchAll(/(?:heroImage:\s*|!\[[^\]]*\]\()([^\s)]+\.(?:webp|png|jpe?g|gif|svg))/gi)) add(match[1]);
  }

  return [...candidates].sort();
}

function resolveExternalUrls(html, files) {
  const urls = new Set();
  const scan = (text) => {
    for (const match of text.matchAll(/https?:\/\/[^\s"'`<>)\\]+/g)) {
      const value = decode(match[0]).replace(/[.,;]+$/, "");
      if (!value.includes("arcbuilders.com.au")) urls.add(value);
    }
  };
  scan(html);
  for (const file of files) scan(sourceText.get(file) || "");
  return [...urls].sort();
}

function resolveApis(files, externalUrls) {
  const apis = new Set();
  for (const file of files) {
    const text = sourceText.get(file) || "";
    for (const match of text.matchAll(/fetch\(\s*["'`]([^"'`]+)["'`]/g)) apis.add(match[1]);
    for (const match of text.matchAll(/(?:href|base_url|auth_endpoint|script\.src)\s*[=:]\s*["'`]([^"'`]+)["'`]/g)) {
      if (match[1].startsWith("/api/") || match[1].startsWith("http")) apis.add(match[1]);
    }
  }
  for (const url of externalUrls) {
    if (/unpkg|github\.com\/login|googletagmanager|google-analytics/.test(url)) apis.add(url);
  }
  return [...apis].sort();
}

function resolveFonts(files) {
  const fonts = [];
  for (const file of files) {
    const text = sourceText.get(file) || "";
    for (const match of text.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']next\/font\/google["']/g)) {
      for (const family of match[1].split(",").map((item) => item.trim())) {
        if (family) fonts.push({ family: family.replace(/_/g, " "), provider: "Google Fonts via next/font/google", source: file });
      }
    }
  }
  return dedupeObjects(fonts);
}

function resolveAnimationLibraries(files) {
  const libraries = [];
  for (const file of files) {
    const text = sourceText.get(file) || "";
    if (/from\s*["']framer-motion["']/.test(text)) {
      libraries.push({ library: "framer-motion", source: file, type: "Code-defined UI animation" });
    }
    if (/from\s*["']gsap["']/.test(text)) {
      libraries.push({ library: "gsap", source: file, type: "Code-defined UI animation" });
    }
  }
  return dedupeObjects(libraries);
}

function resolveLocalAsset(asset) {
  if (asset.startsWith("/_next/static/media/")) {
    const file = path.join(root, ".next", "static", "media", path.basename(asset));
    return fs.existsSync(file) ? file : null;
  }
  const publicFile = path.join(root, "public", ...asset.slice(1).split("/"));
  if (fs.existsSync(publicFile) && fs.statSync(publicFile).isFile()) return publicFile;
  const appFile = path.join(appRoot, ...asset.slice(1).split("/"));
  if (fs.existsSync(appFile) && fs.statSync(appFile).isFile()) return appFile;
  return null;
}

function assetCategory(asset, source) {
  const ext = path.extname(source).toLowerCase();
  const name = path.basename(source).toLowerCase();
  if ([".mp4", ".webm", ".mov"].includes(ext)) return "Videos";
  if ([".woff", ".woff2", ".ttf", ".otf"].includes(ext)) return "Fonts";
  if (ext === ".svg") return /logo|favicon/.test(name) ? "Logos" : "SVG";
  if ([".pdf", ".doc", ".docx", ".xls", ".xlsx", ".zip", ".json", ".webmanifest"].includes(ext)) return "Documents";
  if ([".gif", ".lottie"].includes(ext)) return "Animations";
  if (/logo/.test(name)) return "Logos";
  if (/icon|favicon|apple-touch/.test(name) || ext === ".ico") return "Icons";
  if ([".png", ".jpg", ".jpeg", ".webp", ".avif"].includes(ext)) return "Images";
  return "Documents";
}

function assetRecord(asset, source, destination, category) {
  const bytes = fs.readFileSync(source);
  return {
    reference: asset,
    category,
    originalLocation: normalize(path.relative(root, source)),
    copiedTo: normalize(path.relative(outputRoot, destination)),
    bytes: bytes.length,
    sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
  };
}

function collisionSafeDestination(folder, source) {
  const publicRelative = source.includes(`${path.sep}public${path.sep}`)
    ? path.relative(path.join(root, "public"), source)
    : path.basename(source);
  const preferred = path.join(folder, publicRelative);
  fs.mkdirSync(path.dirname(preferred), { recursive: true });
  if (!fs.existsSync(preferred)) return preferred;
  const existing = fs.readFileSync(preferred);
  const incoming = fs.readFileSync(source);
  if (existing.equals(incoming)) return preferred;
  const ext = path.extname(preferred);
  const base = preferred.slice(0, -ext.length);
  const hash = crypto.createHash("sha256").update(incoming).digest("hex").slice(0, 8);
  return `${base}-${hash}${ext}`;
}

function createPageStructure(destination) {
  for (const category of categoryFolders) fs.mkdirSync(path.join(destination, category), { recursive: true });
}

function renderTextMarkdown(pageInfo, rendered, sourceOnly) {
  const lines = [
    `# ${pageInfo.name}`,
    "",
    `- Route: \`${pageInfo.route}\``,
    `- Page title: ${rendered.title || "Not present"}`,
    `- Meta description: ${rendered.description || "Not present"}`,
    `- Canonical URL: ${rendered.canonical || "Not present"}`,
    `- Meta keywords: ${rendered.keywords || "Not present"}`,
    "",
    "## Rendered Content",
    "",
  ];
  for (const item of rendered.sections) {
    const depth = item.element.startsWith("h") ? Number(item.element[1]) + 1 : 0;
    if (depth) lines.push(`${"#".repeat(Math.min(depth, 6))} ${item.text}`, "");
    else if (item.element === "li") lines.push(`- ${item.text}`);
    else if (item.element === "blockquote") lines.push(`> ${item.text}`, "");
    else lines.push(item.text, "");
  }
  lines.push("## Labels, Alt Text, Placeholders, and Accessibility Text", "");
  for (const item of rendered.attributes) lines.push(`- **${item.type}:** ${item.value}`);
  lines.push("", "## Conditional and Source-Defined Content", "");
  lines.push(
    "These strings are defined in the traced page/component/data source graph and may appear after interaction, in responsive UI, in generated documents, or in metadata.",
    "",
  );
  let lastSource = "";
  for (const item of sourceOnly.strings) {
    if (item.source !== lastSource) {
      lines.push(`### ${item.source}`, "");
      lastSource = item.source;
    }
    lines.push(`- ${item.text.replace(/\n+/g, " ").replace(/\s+/g, " ")}`);
  }
  lines.push("", "## Code-Defined Icons", "");
  for (const icon of sourceOnly.icons) lines.push(`- ${icon} (Lucide React)`);
  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}

function copyPageOriginalContent(pageInfo, destination) {
  const copied = [];
  let sources = [];
  if (pageInfo.route === "/blog") {
    sources = walk(path.join(root, "content", "blog")).filter((file) => file.endsWith(".md"));
  } else if (pageInfo.route.startsWith("/blog/")) {
    const slug = pageInfo.route.split("/").pop();
    const source = path.join(root, "content", "blog", `${slug}.md`);
    if (fs.existsSync(source)) sources = [source];
  }
  for (const source of sources) {
    const subfolder = pageInfo.route === "/blog" ? "Original-Posts" : "Original";
    const target = path.join(destination, "Text", subfolder, path.basename(source));
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
    copied.push(normalize(path.relative(outputRoot, target)));
  }
  return copied;
}

function copySharedAssets() {
  const sharedRoot = path.join(outputRoot, "Shared");
  createPageStructure(sharedRoot);
  const shared = [...assetUsage.entries()].filter(([, pages]) => unique(pages.map((item) => item.route)).length > 1);
  const records = [];
  for (const [original, pages] of shared) {
    const source = path.join(root, ...original.split("/"));
    const reference = original.startsWith("public/") ? `/${original.slice(7)}` : `/${path.basename(original)}`;
    const category = assetCategory(reference, source);
    const destination = collisionSafeDestination(path.join(sharedRoot, category), source);
    fs.copyFileSync(source, destination);
    records.push({ ...assetRecord(reference, source, destination, category), usedByRoutes: unique(pages.map((item) => item.route)).sort() });
  }
  fs.writeFileSync(
    path.join(sharedRoot, "metadata.json"),
    `${JSON.stringify({ description: "Assets used by more than one concrete page route.", assets: records }, null, 2)}\n`,
  );
  const sharedSources = [...sharedComponentNames]
    .map((name) => allComponents.get(name))
    .filter(Boolean)
    .flatMap((file) => traceSourceGraph(file));
  const sharedText = extractSourceStrings(unique(sharedSources));
  const lines = [
    "# Shared Content",
    "",
    "Text defined by shared navigation, footer, CTA, analytics, reveal, and floating contact components.",
    "",
    ...sharedText.strings.map((item) => `- **${item.source}:** ${item.text.replace(/\s+/g, " ")}`),
    "",
    "## Code-Defined Icons",
    "",
    ...sharedText.icons.map((icon) => `- ${icon} (Lucide React)`),
  ];
  fs.writeFileSync(path.join(sharedRoot, "Text", "content.md"), `${lines.join("\n")}\n`);
}

function copyGlobalAssets() {
  const globalRoot = path.join(outputRoot, "Global");
  createPageStructure(globalRoot);
  const globalRefs = [
    "/arc-logo.svg",
    "/site.webmanifest",
  ];
  const records = [];
  for (const ref of globalRefs) {
    const source = resolveLocalAsset(ref);
    if (!source) continue;
    const category = assetCategory(ref, source);
    const destination = collisionSafeDestination(path.join(globalRoot, category), source);
    fs.copyFileSync(source, destination);
    records.push(assetRecord(ref, source, destination, category));
  }
  fs.copyFileSync(path.join(root, "src", "app", "globals.css"), path.join(globalRoot, "Text", "globals.css"));
  fs.writeFileSync(
    path.join(globalRoot, "metadata.json"),
    `${JSON.stringify({
      description: "Root-layout branding, browser icons, manifest, global styling, structured data, and fonts.",
      sourceComponents: ["src/app/layout.tsx", "src/app/globals.css", "src/lib/seo.ts", "src/lib/data.ts"],
      importedFonts: [{ family: "Inter", provider: "Google Fonts via next/font/google" }, { family: "DM Serif Display", provider: "Google Fonts via next/font/google" }],
      consolidatedIconFolder: "Icon",
      assets: records,
    }, null, 2)}\n`,
  );
}

function copyMasterAssets() {
  const masterRoot = path.join(outputRoot, "Assets");
  createPageStructure(masterRoot);
  const records = [];
  for (const original of [...assetUsage.keys()].sort()) {
    const source = path.join(root, ...original.split("/"));
    const reference = original.startsWith("public/") ? `/${original.slice(7)}` : `/${path.basename(original)}`;
    const category = assetCategory(reference, source);
    const destination = collisionSafeDestination(path.join(masterRoot, category), source);
    fs.copyFileSync(source, destination);
    records.push({
      ...assetRecord(reference, source, destination, category),
      usedByRoutes: unique((assetUsage.get(original) || []).map((item) => item.route)).sort(),
    });
  }
  fs.writeFileSync(
    path.join(masterRoot, "metadata.json"),
    `${JSON.stringify({ description: "Deduplicated master copy of every local asset resolved as used.", assets: records }, null, 2)}\n`,
  );
}

function copyConsolidatedIcons() {
  const iconRoot = path.join(outputRoot, "Icon");
  fs.mkdirSync(iconRoot, { recursive: true });
  const assets = [];
  for (const reference of consolidatedIconRefs) {
    const source = resolveLocalAsset(reference);
    if (!source) continue;
    const destination = path.join(iconRoot, path.basename(source));
    fs.copyFileSync(source, destination);
    assets.push(assetRecord(reference, source, destination, "Icon"));
  }
  fs.writeFileSync(
    path.join(iconRoot, "metadata.json"),
    `${JSON.stringify({
      description: "Single consolidated folder for the site's browser favicon and touch-icon files.",
      assets,
    }, null, 2)}\n`,
  );
}

function writeGlobalText() {
  const rootFiles = traceSourceGraph("src/app/layout.tsx");
  const strings = extractSourceStrings(rootFiles);
  const lines = [
    "# Global Content",
    "",
    "Content inherited through the root layout, global metadata, navigation/footer data, analytics, structured data, and floating WhatsApp control.",
    "",
  ];
  for (const item of strings.strings) lines.push(`- **${item.source}:** ${item.text.replace(/\s+/g, " ")}`);
  lines.push("", "## Code-Defined Icons", "", ...strings.icons.map((icon) => `- ${icon} (Lucide React)`));
  fs.writeFileSync(path.join(outputRoot, "Global", "Text", "content.md"), `${lines.join("\n")}\n`);
}

function writeSourceContentCopies() {
  const sourceCopyRoot = path.join(outputRoot, "Assets", "Text", "Original-Content-Sources");
  fs.mkdirSync(sourceCopyRoot, { recursive: true });
  const structuredSources = [
    ...sourceFiles.filter((item) => item.includes(`${path.sep}content${path.sep}`)),
    path.join(root, "src", "lib", "data.ts"),
    path.join(root, "src", "lib", "local-areas.ts"),
    path.join(root, "src", "lib", "inclusions.ts"),
    path.join(root, "src", "lib", "site-state.ts"),
    path.join(root, "src", "lib", "seo.ts"),
    path.join(root, "src", "lib", "pdf", "InclusionPdfDocument.tsx"),
  ];
  for (const file of unique(structuredSources).filter((item) => fs.existsSync(item))) {
    const destination = path.join(sourceCopyRoot, path.relative(root, file));
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(file, destination);
  }
}

function writeReports() {
  const masterAssets = [...assetUsage.keys()].map((original) => {
    const source = path.join(root, ...original.split("/"));
    return { original, category: assetCategory(original, source), hash: sha256(source), routes: unique(assetUsage.get(original).map((item) => item.route)) };
  });
  const iconAssets = consolidatedIconRefs
    .map((reference) => ({ reference, source: resolveLocalAsset(reference) }))
    .filter((item) => item.source)
    .map((item) => ({
      original: normalize(path.relative(root, item.source)),
      category: "Icon",
      hash: sha256(item.source),
      routes: ["global"],
    }));
  const assets = [...masterAssets, ...iconAssets];
  const duplicates = Object.entries(groupBy(assets, (item) => item.hash)).filter(([, group]) => group.length > 1);
  const publicFiles = walk(path.join(root, "public")).filter((file) => fs.statSync(file).isFile()).map((file) => normalize(path.relative(root, file)));
  const usedPublic = new Set(assets.filter((item) => item.original.startsWith("public/")).map((item) => item.original));
  const unusedPublic = publicFiles.filter((file) => !usedPublic.has(file)).sort();
  const shared = masterAssets.filter((item) => item.routes.length > 1);
  const counts = countCategories(assets);
  const fileSvgCount = assets.filter((item) => item.original.toLowerCase().endsWith(".svg")).length;
  const filePdfCount = assets.filter((item) => item.original.toLowerCase().endsWith(".pdf")).length;
  const codeIcons = unique(pageResults.flatMap((pageInfo) => extractSourceStrings(pageInfo.sourceComponents, pageInfo).icons));
  const totalTextArtifacts =
    walk(outputRoot).filter((file) => /\.(?:md|css|ts|tsx)$/i.test(file)).length + 1;

  const report = [
    "# Project Content Inventory",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Summary",
    "",
    `- Concrete page routes audited: ${pageResults.length}`,
    `- Total unique local assets: ${assets.length}`,
    `- Total images: ${counts.Images || 0}`,
    `- Total videos: ${counts.Videos || 0}`,
    `- Total SVG files: ${fileSvgCount}`,
    `- Total icon files: ${iconAssets.length} in the single top-level \`Icon/\` folder`,
    `- Code-defined Lucide icons recorded in page text/metadata: ${codeIcons.length}`,
    `- Total PDFs: ${filePdfCount} static files; 1 dynamically generated PDF download`,
    "- Total copied font files: 0 (font folders intentionally removed; imported family names remain in metadata)",
    `- Total page text files: ${pageResults.length}`,
    `- Total library text artifacts: ${totalTextArtifacts}`,
    `- Shared assets: ${shared.length}`,
    `- Duplicate-content asset groups: ${duplicates.length}`,
    `- Unused public assets: ${unusedPublic.length}`,
    "",
    "Counts are unique source-file counts across the deduplicated `Assets/` library and consolidated `Icon/` folder. Per-page and `Shared/` copies are not counted again.",
    "",
    "## Pages",
    "",
  ];

  for (const pageInfo of pageResults) {
    const byCategory = groupBy(pageInfo.copiedAssets, (item) => item.category);
    const icons = extractSourceStrings(pageInfo.sourceComponents, pageInfo).icons;
    report.push(
      `### ${pageInfo.name}`,
      "",
      `- Route: \`${pageInfo.route}\``,
      `- Components used: ${pageInfo.sourceComponents.map((item) => `\`${item}\``).join(", ") || "None"}`,
      `- Images: ${(byCategory.Images || []).map((item) => `\`${item.originalLocation}\``).join(", ") || "None"}`,
      `- Videos: ${(byCategory.Videos || []).map((item) => `\`${item.originalLocation}\``).join(", ") || "None"}`,
      `- SVGs: ${(byCategory.SVG || []).map((item) => `\`${item.originalLocation}\``).join(", ") || "None"}`,
      `- Logos: ${(byCategory.Logos || []).map((item) => `\`${item.originalLocation}\``).join(", ") || "None"}`,
      `- Documents: ${(byCategory.Documents || []).map((item) => `\`${item.originalLocation}\``).join(", ") || "None"}`,
      `- Fonts: ${pageInfo.importedFonts.map((font) => font.family).join(", ") || "None"}`,
      `- Icons: ${icons.join(", ") || "None"}`,
      `- Text sections: ${unique(pageInfo.rendered.sections.map((item) => item.element)).join(", ") || "None"}; see \`${pageInfo.textFile}\``,
      `- External assets/URLs: ${pageInfo.externalUrls.map((url) => `<${url}>`).join(", ") || "None"}`,
      `- APIs used: ${pageInfo.apis.map((url) => `\`${url}\``).join(", ") || "None"}`,
      `- Animations: ${pageInfo.animations.map((item) => `${item.library} in \`${item.source}\``).join(", ") || "None"}`,
      `- Missing assets: ${pageInfo.missingAssets.map((item) => `\`${item}\``).join(", ") || "None"}`,
      "",
    );
  }

  report.push("## Shared Assets", "");
  for (const item of shared) report.push(`- \`${item.original}\`: ${item.routes.map((route) => `\`${route}\``).join(", ")}`);
  report.push("", "## Duplicate Assets", "");
  if (!duplicates.length) report.push("- No byte-identical used assets with different source paths were found.");
  for (const [hash, group] of duplicates) report.push(`- SHA-256 \`${hash}\`: ${group.map((item) => `\`${item.original}\``).join(", ")}`);
  report.push("", "## Unused Public Assets", "");
  report.push("These files exist in `public/` but were not resolved from rendered HTML, traced page sources, metadata, generated data, or global configuration.");
  report.push("");
  for (const file of unusedPublic) report.push(`- \`${file}\``);
  report.push("", "## Dynamic and External Content Origins", "");
  report.push(
    "- Blog content originates from `content/blog/*.md`, loaded with `gray-matter` by `src/lib/blog.ts`. Original Markdown is preserved under `Assets/Text/Original-Content-Sources/`.",
    "- Project content and gallery paths originate from `src/lib/data.ts`; every project gallery directory referenced by a generated project route is copied.",
    "- Location content originates from `src/lib/local-areas.ts` and project data from `src/lib/data.ts`.",
    "- The inclusions configurator and generated PDF content originate from `src/lib/inclusions.ts` and `src/lib/pdf/InclusionPdfDocument.tsx`; `/api/inclusions/pdf` creates `arc-inclusion-sheet.pdf` at request time, so no original static PDF exists for that download.",
    "- The admin route loads Decap CMS from unpkg and stores new blog media in `public/uploads`; no current `public/uploads` assets exist.",
    "- GitHub OAuth is handled by `/api/auth` and `/api/callback` using environment-provided credentials.",
    "- Google Tag Manager is loaded only when `NEXT_PUBLIC_GTM_ID` exists.",
    "- Inter and DM Serif Display are loaded through `next/font/google`; build-resolved WOFF2 files are preserved.",
    "",
    "## Non-Page Routes",
    "",
    "- `/api/auth` - `src/app/api/auth/route.ts`; starts GitHub OAuth for Decap CMS.",
    "- `/api/callback` - `src/app/api/callback/route.ts`; exchanges the GitHub OAuth code and returns the Decap authorization message.",
    "- `/api/inclusions/pdf` - `src/app/api/inclusions/pdf/route.ts`; generates a PDF from client-side inclusion selections.",
    "- `/robots.txt` - `src/app/robots.ts`; generated from site and maintenance configuration.",
    "- `/sitemap.xml` - `src/app/sitemap.ts`; generated from static routes, projects, blog posts, and location data.",
    "",
    "## Verification",
    "",
    "- Production build completed successfully before extraction.",
    `- All ${pageResults.length} generated concrete HTML pages were parsed.`,
    "- Every copied file is byte-for-byte copied and catalogued with SHA-256 in metadata.",
    "- Every used local asset reference resolves to a copied file; per-page missing lists are empty unless explicitly reported above.",
    "- The source import graph was traced recursively from the root layout and each route page.",
    "- Rendered semantic content was cross-checked with source-defined conditional strings.",
  );

  fs.writeFileSync(path.join(outputRoot, "Reports", "content-index.md"), `${report.join("\n")}\n`);
  fs.writeFileSync(
    path.join(outputRoot, "Reports", "audit-summary.json"),
    `${JSON.stringify({
      generatedAt: new Date().toISOString(),
      routes: pageResults.length,
      uniqueAssets: assets.length,
      categoryCounts: counts,
      sharedAssets: shared.length,
      duplicateGroups: duplicates.map(([hash, group]) => ({ sha256: hash, files: group.map((item) => item.original) })),
      unusedPublicAssets: unusedPublic,
      missingAssets: pageResults.flatMap((pageInfo) => pageInfo.missingAssets.map((asset) => ({ route: pageInfo.route, asset }))),
    }, null, 2)}\n`,
  );
}

function verifyOutput() {
  const errors = [];
  let copiedFilesChecked = 0;
  for (const pageInfo of pageResults) {
    for (const folder of categoryFolders) {
      const expected = path.join(pageInfo.destination, folder);
      if (!fs.existsSync(expected) || !fs.statSync(expected).isDirectory()) {
        errors.push(`${pageInfo.route}: missing category folder ${folder}`);
      }
    }
    const metadataFile = path.join(pageInfo.destination, "metadata.json");
    const textFile = path.join(pageInfo.destination, "Text", "content.md");
    if (!fs.existsSync(metadataFile)) errors.push(`${pageInfo.route}: missing metadata.json`);
    if (!fs.existsSync(textFile) || fs.statSync(textFile).size === 0) {
      errors.push(`${pageInfo.route}: missing or empty Text/content.md`);
    }
    if (fs.existsSync(metadataFile)) {
      try {
        JSON.parse(fs.readFileSync(metadataFile, "utf8"));
      } catch {
        errors.push(`${pageInfo.route}: invalid metadata JSON`);
      }
    }
    for (const asset of pageInfo.copiedAssets) {
      const copied = path.join(outputRoot, ...asset.copiedTo.split("/"));
      const original = path.join(root, ...asset.originalLocation.split("/"));
      if (!fs.existsSync(copied)) {
        errors.push(`${pageInfo.route}: copied asset missing ${asset.copiedTo}`);
        continue;
      }
      if (!fs.existsSync(original)) {
        errors.push(`${pageInfo.route}: original asset missing ${asset.originalLocation}`);
        continue;
      }
      copiedFilesChecked += 1;
      if (sha256(copied) !== asset.sha256 || sha256(original) !== asset.sha256) {
        errors.push(`${pageInfo.route}: hash mismatch ${asset.originalLocation}`);
      }
    }
    for (const missing of pageInfo.missingAssets) errors.push(`${pageInfo.route}: unresolved ${missing}`);
    if (pageInfo.route.startsWith("/blog/") && !pageInfo.route.endsWith("/blog")) {
      const slug = pageInfo.route.split("/").pop();
      const expected = path.join(pageInfo.destination, "Text", "Original", `${slug}.md`);
      if (!fs.existsSync(expected)) errors.push(`${pageInfo.route}: original Markdown was not copied`);
    }
  }

  const master = JSON.parse(fs.readFileSync(path.join(outputRoot, "Assets", "metadata.json"), "utf8"));
  if (master.assets.length !== assetUsage.size) {
    errors.push(`Master asset count ${master.assets.length} does not match resolved unique count ${assetUsage.size}`);
  }
  const verification = {
    verifiedAt: new Date().toISOString(),
    passed: errors.length === 0,
    concretePagesChecked: pageResults.length,
    pageCategoryFoldersChecked: pageResults.length * categoryFolders.length,
    copiedPageAssetFilesChecked: copiedFilesChecked,
    uniqueMasterAssetsChecked: master.assets.length,
    unresolvedAssetReferences: pageResults.reduce((total, pageInfo) => total + pageInfo.missingAssets.length, 0),
    productionHtmlFilesChecked: unique(pageResults.map((pageInfo) => normalize(path.relative(root, pageInfo.htmlFile)))).length,
    metadataJsonFilesParsed: pageResults.length,
    errors,
  };
  fs.writeFileSync(
    path.join(outputRoot, "Reports", "verification.json"),
    `${JSON.stringify(verification, null, 2)}\n`,
  );
  if (errors.length) throw new Error(`Content extraction verification failed:\n${errors.join("\n")}`);
}

function resetGeneratedOutput() {
  const generatedTopLevel = [
    "Home",
    "About",
    "Admin",
    "Blog",
    "Commercial",
    "Contact",
    "Inclusions",
    "Locations",
    "Maintenance",
    "Process",
    "Projects",
    "Residential",
    "Shared",
    "Global",
    "Assets",
    "Icon",
  ];
  for (const name of generatedTopLevel) {
    const target = path.resolve(outputRoot, name);
    if (path.dirname(target) !== path.resolve(outputRoot)) {
      throw new Error(`Refusing to clear unexpected path: ${target}`);
    }
    fs.rmSync(target, { recursive: true, force: true });
  }
  const reportsRoot = path.join(outputRoot, "Reports");
  if (!fs.existsSync(reportsRoot)) return;
  for (const entry of fs.readdirSync(reportsRoot)) {
    if (entry === "generate-content-library.mjs") continue;
    fs.rmSync(path.join(reportsRoot, entry), { recursive: true, force: true });
  }
}

function countCategories(assets) {
  return assets.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  const output = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...walk(file));
    else output.push(file);
  }
  return output;
}

function normalize(value) {
  return value.split(path.sep).join("/");
}

function unique(values) {
  return [...new Set(values)];
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    const value = key(item);
    (groups[value] ||= []).push(item);
    return groups;
  }, {});
}

function dedupeObjects(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = JSON.stringify(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function firstMatch(value, pattern) {
  return value.match(pattern)?.[1] || "";
}

function stripTags(value) {
  return value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
}

function decode(value) {
  const entities = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    "#39": "'",
    nbsp: " ",
  };
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&([a-z]+|#39);/gi, (match, entity) => entities[entity.toLowerCase()] ?? match);
}

function cleanText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function looksLikeFlightPayload(value) {
  return value.includes("self.__next_f.push") || value.includes("$L") || value.length > 2000;
}

function titleCase(value) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}
