// GitHub Pages has no SPA rewrites, so give each client-side route its own
// copy of index.html (and use it as the 404 page for anything else).
// Each copy gets its own <title> and canonical URL so search engines treat
// the pages as distinct.
// Keep ROUTES in sync with the <Route> paths in src/App.jsx and PAGE_TITLES
// in src/usePageTitle.js.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const SITE_URL = 'https://adamboesky.github.io/';
const ROUTES = { research: 'Research', cv: 'CV' };

const html = readFileSync('dist/index.html', 'utf8');

for (const [route, name] of Object.entries(ROUTES)) {
    const url = `${SITE_URL}${route}/`;
    const page = html
        .replace('<title>Adam Boesky</title>', `<title>${name} – Adam Boesky</title>`)
        .replace(`<link rel="canonical" href="${SITE_URL}">`, `<link rel="canonical" href="${url}">`)
        .replace(`<meta property="og:url" content="${SITE_URL}">`, `<meta property="og:url" content="${url}">`)
        .replace(`<meta property="twitter:url" content="${SITE_URL}">`, `<meta property="twitter:url" content="${url}">`);
    mkdirSync(`dist/${route}`, { recursive: true });
    writeFileSync(`dist/${route}/index.html`, page);
}
copyFileSync('dist/index.html', 'dist/404.html');
