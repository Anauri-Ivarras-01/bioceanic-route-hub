// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

const pagesBuild = process.env['GITHUB_PAGES'] === 'true';
const base = pagesBuild ? '/bioceanic-route-hub/' : '/';

export default defineConfig({
  vite: {
    base,
    plugins: [VitePWA({
      base, scope: base, outDir: 'dist/client',
      injectRegister: null, registerType: 'autoUpdate',
      devOptions: { enabled: false },
      manifest: {
        name: 'Central Rota Bioceânica', short_name: 'Rota Bioceânica',
        description: 'Inteligência e produção editorial do corredor bioceânico',
        start_url: base, scope: base, display: 'standalone', lang: 'pt-BR',
        theme_color: '#111c2e', background_color: '#111c2e',
        icons: [{ src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,png,jpg,svg,ico,woff2}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: null,
        runtimeCaching: [
          { urlPattern: ({ request, url }) => request.mode === 'navigate' && !url.pathname.includes('/~oauth'), handler: 'NetworkFirst', options: { cacheName: 'central-navigation', networkTimeoutSeconds: 4 } },
          { urlPattern: ({ url, sameOrigin }) => sameOrigin && /\/assets\/.*-[\w-]+\.(js|css|png|jpg|woff2)$/.test(url.pathname), handler: 'CacheFirst', options: { cacheName: 'central-assets', expiration: { maxEntries: 100 } } },
        ],
      },
    })],
  },
  // Prerender needs a temporary SSR entry. Only dist/client is deployed to Pages.
  ...(pagesBuild ? { nitro: {
    preset: 'node-server',
    entry: './scripts/pages-renderer.mjs',
    output: { dir: 'dist', serverDir: 'dist/server', publicDir: 'dist/client' },
  } } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    router: { basepath: base },
    pages: ['/', '/radar', '/mapa', '/biblioteca', '/diario', '/estudio', '/briefings', '/backup', '/configuracoes'].map(path => ({ path })),
    prerender: { enabled: pagesBuild, autoStaticPathsDiscovery: false, crawlLinks: false, failOnError: true },
  },
});
