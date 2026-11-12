// Gera as imagens do portfólio a partir dos deploys na Vercel.
//
//   node scripts/capture.mjs                 -> screenshots dos projetos em scripts/sites.json
//   node scripts/capture.mjs --originals     -> baixa as imagens originais do deploy do portfolio-eduai
//   node scripts/capture.mjs --only=idealdent,musicalize
//
// Deploys protegidos (Vercel Authentication): passe um "Protection Bypass for Automation"
// por projeto em scripts/bypass.json ({ "slug": "secret" }) — o arquivo está no .gitignore.
// Revogue os secrets na Vercel depois de rodar.
//
// Saída: assets/img/<slug>-hero.webp (1440x900), -full.webp (página inteira, 1440 de largura)
// e -mobile.webp (390x844), o mesmo padrão das imagens que já estavam no ar.

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'assets/img');
mkdirSync(out, { recursive: true });

const args = process.argv.slice(2);
const only = (args.find(a => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const sites = JSON.parse(readFileSync(join(root, 'scripts/sites.json'), 'utf8'));
const bypassFile = join(root, 'scripts/bypass.json');
const bypass = existsSync(bypassFile) ? JSON.parse(readFileSync(bypassFile, 'utf8')) : {};
const headersFor = slug => (bypass[slug] ? { 'x-vercel-protection-bypass': bypass[slug], 'x-vercel-set-bypass-cookie': 'true' } : {});

const MAX_FULL = 12000; // px, limite de canvas para converter em webp

const browser = await chromium.launch();

// converte PNG -> WebP usando o canvas do próprio Chromium (sem sharp/cwebp)
const conv = await browser.newPage();
async function toWebp(png, quality = 0.82) {
  const b64 = await conv.evaluate(async ({ data, q }) => {
    const blob = await (await fetch(`data:image/png;base64,${data}`)).blob();
    const bmp = await createImageBitmap(blob);
    const c = new OffscreenCanvas(bmp.width, bmp.height);
    c.getContext('2d').drawImage(bmp, 0, 0);
    const webp = await c.convertToBlob({ type: 'image/webp', quality: q });
    const buf = new Uint8Array(await webp.arrayBuffer());
    let s = ''; for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode(...buf.subarray(i, i + 0x8000));
    return btoa(s);
  }, { data: png.toString('base64'), q: quality });
  return Buffer.from(b64, 'base64');
}

async function settle(page) {
  // rola a página inteira para disparar lazy-load e animações de entrada
  await page.evaluate(async () => {
    const h = () => document.documentElement.scrollHeight;
    for (let y = 0; y < h(); y += innerHeight * 0.7) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  await page.addStyleTag({ content: '*,*::before,*::after{animation-play-state:paused!important;caret-color:transparent!important}' });
}

async function shoot(slug, url) {
  const desk = await browser.newContext({ viewport: { width: 1440, height: 900 }, extraHTTPHeaders: headersFor(slug) });
  const p = await desk.newPage();
  await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await settle(p);
  writeFileSync(join(out, `${slug}-hero.webp`), await toWebp(await p.screenshot()));
  const height = Math.min(MAX_FULL, await p.evaluate(() => document.documentElement.scrollHeight));
  const full = await p.screenshot({ clip: { x: 0, y: 0, width: 1440, height }, fullPage: true });
  writeFileSync(join(out, `${slug}-full.webp`), await toWebp(full, 0.72));
  await desk.close();

  const mob = await browser.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    extraHTTPHeaders: headersFor(slug),
  });
  const m = await mob.newPage();
  await m.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await settle(m);
  writeFileSync(join(out, `${slug}-mobile.webp`), await toWebp(await m.screenshot()));
  await mob.close();
}

async function originals() {
  const { url, slug, files } = sites.__originals;
  const ctx = await browser.newContext({ extraHTTPHeaders: headersFor(slug) });
  for (const f of files) {
    const r = await ctx.request.get(new URL(`assets/img/${f}`, url).href);
    if (!r.ok()) { console.error('falhou', f, r.status()); continue; }
    writeFileSync(join(out, f), await r.body());
    console.log('ok', f);
  }
  await ctx.close();
}

try {
  if (args.includes('--originals')) await originals();
  else {
    for (const [slug, url] of Object.entries(sites.projects)) {
      if (only.length && !only.includes(slug)) continue;
      try { await shoot(slug, url); console.log('ok', slug); }
      catch (e) { console.error('falhou', slug, e.message); }
    }
  }
} finally {
  await browser.close();
}
