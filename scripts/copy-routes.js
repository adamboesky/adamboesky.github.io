// GitHub Pages has no SPA rewrites, so give each client-side route its own
// copy of index.html (and use it as the 404 page for anything else).
// Keep ROUTES in sync with the <Route> paths in src/App.jsx.
import { copyFileSync, mkdirSync } from 'node:fs';

const ROUTES = ['research', 'cv'];

for (const route of ROUTES) {
    mkdirSync(`dist/${route}`, { recursive: true });
    copyFileSync('dist/index.html', `dist/${route}/index.html`);
}
copyFileSync('dist/index.html', 'dist/404.html');
