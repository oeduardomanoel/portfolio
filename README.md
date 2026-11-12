# EduAI · Portfólio de Landing Pages

Site estático (HTML + CSS + JS puro) publicado na Vercel como `portfolio-eduai`.

- `app.js`: lista de projetos (`projects`) e categorias (`cats`). Pra adicionar um projeto, inclua um item e as 3 imagens em `assets/img/`.
- `assets/img/<slug>-hero.webp` (1440×900), `<slug>-full.webp` (página inteira) e `<slug>-mobile.webp` (390×844).
- `scripts/capture.mjs`: gera essas imagens a partir dos deploys (`scripts/sites.json`). Deploys protegidos usam `scripts/bypass.json` (`{ "slug": "secret" }`, fora do git).

```bash
node scripts/capture.mjs --originals   # imagens que já estavam no ar
node scripts/capture.mjs               # screenshots dos projetos novos
```

Os cards não linkam o site do cliente: o CTA de cada projeto leva pro WhatsApp do Eduardo.
