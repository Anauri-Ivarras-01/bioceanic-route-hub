import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

export const pagePaths = ['', 'radar', 'mapa', 'biblioteca', 'diario', 'estudio', 'briefings', 'backup', 'configuracoes'];
export const pagesBase = '/bioceanic-route-hub/';

export async function validatePages(directory = 'dist/client') {
  const root = resolve(directory);
  const checked = new Set();
  async function requireFile(file) {
    const target = resolve(root, file);
    if (target !== root && !target.startsWith(`${root}/`)) throw new Error(`Unsafe artifact path: ${file}`);
    if (!(await stat(target)).isFile()) throw new Error(`Not a file: ${file}`);
    checked.add(relative(root, target));
    return readFile(target, 'utf8');
  }
  for (const page of pagePaths) {
    const html = await requireFile(page ? `${page}/index.html` : 'index.html');
    if (!html.includes('Central Rota Bioceânica') || !html.includes('<title>')) throw new Error(`Missing rendered content: ${page || '/'}`);
    if (html.includes('/central-rota-bioceanica/')) throw new Error(`Old repository base: ${page || '/'}`);
    for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
      const url = match[1];
      if (!url.startsWith('/')) continue;
      if (!url.startsWith(pagesBase)) throw new Error(`URL outside repository base: ${url}`);
      const file = decodeURIComponent(url.slice(pagesBase.length).split(/[?#]/)[0]);
      if (/\.[a-z0-9]+$/i.test(file)) await requireFile(file);
    }
  }
  const manifest = JSON.parse(await requireFile('manifest.webmanifest'));
  if (manifest.start_url !== pagesBase || manifest.scope !== pagesBase) throw new Error('Incorrect PWA start_url/scope');
  for (const icon of manifest.icons ?? []) await requireFile(icon.src.replace(pagesBase, ''));
  const worker = await requireFile('sw.js');
  for (const match of worker.matchAll(/workbox-[\w-]+\.js/g)) await requireFile(match[0]);
  for (const file of ['favicon.ico', 'icons/icon-192.png', 'icons/icon-512.png']) await requireFile(file);
  if (!(await readdir(resolve(root, 'assets'))).length) throw new Error('No generated assets');
  console.log(`Pages artifact OK: ${pagePaths.length} rendered pages; ${checked.size} verified files; base ${pagesBase}`);
  return { pages: pagePaths.length, files: checked.size };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await validatePages(process.argv[2]);
}