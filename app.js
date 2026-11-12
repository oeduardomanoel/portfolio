// Projetos novos aparecem quando as imagens deles estiverem em assets/img (rode scripts/capture.mjs e tire o slug daqui).
const PENDING_SHOTS = new Set([
  'jurerebeaute', 'veltroneletrica', 'fatimaguilherme', 'musicalize', 'idealdent', 'rosepaulichen-estetica',
  '5457studio', 'laianenicole', 'adrianajoca', 'alexsandrarodrigues', 'paulalemes-podologia', 'jhonymailon',
  'kanjiiiiii', 'trocasquecortamdoces', 'fontedajuventude',
]);

const allProjects = [
  { slug: 'poderosobigode', name: 'Poderoso Bigode', niche: 'Barbearia premium', loc: 'Balneário Camboriú · BR', cat: 'beleza',
    desc: 'Visual escuro e dourado para uma barbearia com 67 mil cortes no histórico. Prova social logo na dobra e agendamento direto no WhatsApp.',
    tags: ['Agendamento', 'Prova social', 'Galeria'] },
  { slug: 'jurerebeaute', name: 'Jurerê Beauté', niche: 'Salão de beleza premium', loc: 'Florianópolis · BR', cat: 'beleza',
    desc: 'Noir e dourado para um salão com nota 5,0 em 112 avaliações e selo de marca autorizada. Caso real de antes e depois, galeria de trabalhos e avaliação pelo WhatsApp.',
    tags: ['Caso real', 'Galeria', 'Selo de marca'] },
  { slug: 'fontaneriacocersa', name: 'Fontanería Cocersa', niche: 'Encanador 24h', loc: 'Zaragoza · ES', cat: 'servicos',
    desc: 'Página em espanhol para uma empresa com 35 anos de mercado. Identidade com mascote, nota 4,8 no Google em destaque e contato em um toque.',
    tags: ['Espanhol', 'Urgência 24h', 'Google Reviews'] },
  { slug: 'veltroneletrica', name: 'Veltron Elétrica', niche: 'Eletricista 24h', loc: 'Balneário Camboriú · BR', cat: 'servicos',
    desc: 'Preto e amarelo-elétrico com um cabo animado percorrendo a página. Serviços num quadro de disjuntores interativo, sinais de alerta e barra fixa de WhatsApp e ligação no celular.',
    tags: ['Interativo', 'Urgência 24h', 'WhatsApp e ligação'] },
  { slug: 'fatimaguilherme', name: 'Fátima Guilherme', niche: 'Podologia', loc: 'Balneário Camboriú · BR', cat: 'saude',
    desc: 'Mapa interativo do pé ("me mostra onde dói"): cada ponto explica o problema e abre o WhatsApp com a mensagem pronta. 15 anos de profissão e nota 5,0 em destaque.',
    tags: ['Mapa interativo', 'Prova social', 'FAQ'] },
  { slug: '4meengenharia', name: '4ME Engenharia', niche: 'Projetos complementares', loc: 'Balneário Camboriú · BR', cat: 'servicos',
    desc: 'Estrutural, hidrossanitário, elétrico e PPCI apresentados com sobriedade. Portfólio de obras e linguagem de escritório técnico.',
    tags: ['B2B', 'Portfólio de obras', 'Institucional'] },
  { slug: 'musicalize', name: 'Musicalize', niche: 'Escola de música', loc: 'Camboriú · BR', cat: 'educacao',
    desc: 'Energia de palco para uma rede com mais de 5 mil alunos. Parede de vídeos de alunos tocando ao vivo, método em 3 pilares e um único CTA: a aula experimental.',
    tags: ['Vídeos de alunos', 'Aula experimental', 'Método'] },
  { slug: 'centraldavisao', name: 'Central da Visão', niche: 'Clínica de oftalmologia', loc: 'Balneário Camboriú · BR', cat: 'saude',
    desc: '18 anos de clínica traduzidos em confiança: especialidades, corpo médico e agendamento de consulta sem atrito.',
    tags: ['Saúde', 'Agendamento', 'SEO local'] },
  { slug: 'idealdent', name: 'Ideal Dent', niche: 'Clínica odontológica', loc: 'Balneário Barra do Sul · BR', cat: 'saude',
    desc: 'Página que ataca o medo de dentista: o depoimento "sem dor, sem traumas" vira o gancho, a dobra simula uma conversa no WhatsApp e são só 4 passos até a primeira consulta.',
    tags: ['Medo de dentista', 'Nota 4,9', 'WhatsApp'] },
  { slug: 'esteticasilvestre', name: 'Vanessa Silvestre', niche: 'Estética avançada', loc: 'Balneário Camboriú · BR', cat: 'estetica',
    desc: 'Remoção de tatuagem a laser, podologia e furo humanizado. Tom acolhedor e convite para avaliação.',
    tags: ['Estética', 'Procedimentos', 'Avaliação'] },
  { slug: 'rosepaulichen-estetica', name: 'Rose Paulichen', niche: 'Estética avançada', loc: 'Itajaí · BR', cat: 'estetica',
    desc: 'Rosé e vinho com arcos e tipografia leve. O mote "mãos de fada" saiu das próprias clientes; tratamentos com filtro corpo e rosto, protocolo em 4 passos e nota 5,0 em 69 avaliações.',
    tags: ['Prova social', 'Filtro de tratamentos', 'Protocolo'] },
  { slug: '5457studio', name: '5457 Studio', niche: 'Studio de beleza', loc: 'Florianópolis · BR', cat: 'beleza',
    desc: 'Tons de areia e sálvia para um salão que vive de clientela fiel. Seção "por que as clientes voltam" montada com as avaliações do Google e agendamento com cada profissional.',
    tags: ['Prova social', 'Equipe', 'Agendamento'] },
  { slug: 'laianenicole', name: 'Laiane Nicole', niche: 'Lash designer', loc: 'Balneário Camboriú · BR', cat: 'beleza',
    desc: 'Vinho profundo e dourado. As técnicas aparecem como "escolha o efeito", do natural ao marcante, com galeria de resultados, passo a passo e cuidados pós-procedimento.',
    tags: ['Técnicas', 'Galeria', 'Pós-procedimento'] },
  { slug: 'adrianajoca', name: 'Adriana Joca', niche: 'Estética facial e corporal', loc: 'Joinville · BR', cat: 'estetica',
    desc: 'Creme e argila para uma biomédica esteta que vende avaliação antes de protocolo. Processo em 4 passos, bastidores do atendimento e o recado "sem pacote empurrado".',
    tags: ['Autoridade', 'Bastidores', 'Avaliação'] },
  { slug: 'alexsandrarodrigues', name: 'Alexsandra Rodrigues', niche: 'Podologia e laserterapia', loc: 'Itapema · BR', cat: 'saude',
    desc: 'Creme, azul-petróleo e dourado para uma podóloga com 30 anos de profissão. Autoridade na dobra e uma seção "você se reconhece?" que leva à avaliação.',
    tags: ['Autoridade', 'Nota 5,0', 'Agendamento'] },
  { slug: 'paulalemes-podologia', name: 'Paula Lemes', niche: 'Podologia domiciliar', loc: 'Itapema · BR', cat: 'saude',
    desc: 'Verde-sálvia e creme. Chips de "sinais de alerta" que levam direto ao WhatsApp, um bloco que derruba o mito da unha encravada e o atendimento em casa como diferencial.',
    tags: ['Sinais de alerta', 'Home care', 'Prova social'] },
  { slug: 'jhonymailon', name: 'Jhony Mailon', niche: 'Personal trainer', loc: 'Presencial e online · BR', cat: 'saude',
    desc: 'Estética crua de academia em bege, preto e amarelo. Abre com "já fez alguma dessas?", mostra o método como uma ficha de treino interativa e compara os planos presencial e online.',
    tags: ['Identificação', 'Método', 'Planos'] },
  { slug: 'ginasticadocerebrocamboriu', name: 'Ginástica do Cérebro', niche: 'Treino cognitivo', loc: 'Camboriú · BR', cat: 'educacao',
    desc: 'Soroban, apostilas e jogos para crianças até +60. Turmas pequenas e aula experimental gratuita como porta de entrada.',
    tags: ['Educação', 'Aula grátis', 'Todas as idades'] },
  { slug: 'jslcell', name: 'JSL Cell Imports', niche: 'Assistência de celular', loc: 'Itajaí · BR', cat: 'tech',
    desc: 'Troca só do vidro mantendo a tela original. Página que explica o serviço técnico de um jeito que qualquer cliente entende.',
    tags: ['iPhone', 'Samsung', 'Garantia'] },
  { slug: 'lkassistencia', name: 'LK Cell', niche: 'Assistência técnica', loc: 'Balneário Camboriú · BR', cat: 'tech',
    desc: 'Tela, bateria, conector e placa. Mais venda de iPhone no boleto, com catálogo e chamada direta para o balcão.',
    tags: ['Reparo', 'Venda no boleto', 'Loja física'] },
  { slug: 'kappelinformatica', name: 'Kappel Informática', niche: 'Computador, notebook e games', loc: 'Tijucas · BR', cat: 'tech',
    desc: 'Busca e leva o aparelho, dá garantia e atende 24h no WhatsApp. Página feita para quem está com o equipamento parado agora.',
    tags: ['Leva e traz', 'Atendimento 24h', 'Garantia'] },
  { slug: 'marcioeletricista', name: 'Marcio Lisboa', niche: 'Eletricista certificado', loc: 'Lisboa · PT', cat: 'servicos',
    desc: 'Português de Portugal, nota 5.0 no Zaask com mais de 32 avaliações e orçamento grátis pelo WhatsApp.',
    tags: ['Portugal', 'Zaask 5.0', 'Orçamento grátis'] },
  { slug: 'limpaconforto', name: 'LimpaConforto', niche: 'Limpeza de estofados', loc: 'São Paulo · BR', cat: 'servicos',
    desc: 'Sofás, colchões e estofados limpos em casa. Antes e depois em destaque e orçamento pelo WhatsApp.',
    tags: ['Antes e depois', 'Orçamento', 'Domicílio'] },
  { slug: 'souzaestetica', name: 'Souza Estética Automotiva', niche: 'Detalhamento automotivo', loc: 'Itajaí · BR', cat: 'servicos',
    desc: 'Cuidados internos, externos, motos e motor. Visual que valoriza o brilho do carro e atendimento agendado.',
    tags: ['Automotivo', 'Pacotes', 'Agendamento'] },
  { slug: 'desapego-bina', name: 'Desapego da Bina', niche: 'Brechó e consultoria de estilo', loc: 'Camboriú · BR', cat: 'varejo',
    desc: 'Peças second hand selecionadas e consultoria de imagem. Moda circular com personalidade.',
    tags: ['Moda', 'Second hand', 'Consultoria'] },
  { slug: 'escuelajogabonito', name: 'Escuela Joga Bonito', niche: 'Infoproduto de futebol infantil', loc: 'América Latina · ES', cat: 'info',
    desc: '400 treinos do método brasileiro para crianças de 4 a 12 anos. Página de venda em espanhol com oferta de lançamento.',
    tags: ['Infoproduto', 'Página de vendas', 'Espanhol'] },
  { slug: 'kanjiiiiii', name: 'Kit Kanji Kids', niche: 'Infoproduto de alfabetização', loc: 'Digital · BR', cat: 'info',
    desc: 'Página colorida com tipografia infantil para um método de leitura em 10 minutos por dia. VSL, comparação Brasil x Japão, pop-ups de compras recentes, bônus e garantia de 7 dias.',
    tags: ['VSL', 'Pop-up de compras', 'Bônus'] },
  { slug: 'trocasquecortamdoces', name: '21 Trocas', niche: 'Infoproduto de emagrecimento', loc: 'Digital · BR', cat: 'info',
    desc: 'Oferta low-ticket com VSL e a narrativa "é química, não falta de força de vontade". Planos de/por, 3 bônus, downsell na saída e garantia de 7 dias.',
    tags: ['VSL', 'Downsell', 'Garantia'] },
  { slug: 'fontedajuventude', name: 'Pilates Asiático', niche: 'Funil de quiz · 40+', loc: 'Digital · BR', cat: 'info',
    desc: 'Quiz em tons de rosa com barra de progresso que promete um diagnóstico corporal gratuito em menos de 3 minutos e leva direto para a oferta.',
    tags: ['Quiz', 'Diagnóstico grátis', 'Funil'] },
  { slug: 'magicpro', name: 'MagicPro', niche: 'Produto · Sites gerados por IA', loc: 'Web', cat: 'tech',
    desc: 'Produto próprio: descreva o que quer e a IA gera o site ou app. Interface minimalista com fundo animado.',
    tags: ['SaaS', 'IA', 'Produto'] },
];
const projects = allProjects.filter(p => !PENDING_SHOTS.has(p.slug));

const cats = [
  { id: 'all', label: 'Todos' },
  { id: 'saude', label: 'Saúde & bem-estar' },
  { id: 'estetica', label: 'Estética' },
  { id: 'beleza', label: 'Beleza' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'tech', label: 'Tecnologia' },
  { id: 'educacao', label: 'Educação' },
  { id: 'info', label: 'Infoprodutos' },
  { id: 'varejo', label: 'Moda' },
];

const $ = (s, el = document) => el.querySelector(s);
const pad = n => String(n).padStart(2, '0');
const img = (slug, kind) => `assets/img/${slug}-${kind}.webp`;
const wa = (name) => `https://wa.me/5547996170855?text=${encodeURIComponent(`Oi Eduardo! Vi o projeto ${name} no seu portfólio e quero uma página assim.`)}`;
const touch = matchMedia('(hover: none)').matches;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let current = 0;

/* numbers that depend on the project list */
document.querySelectorAll('[data-total]').forEach(el => { el.textContent = projects.length; });
const totalStat = $('.stats [data-count="total"]');
if (totalStat) totalStat.dataset.count = projects.length;

/* hint copy: touch screens have no hover */
if (touch) $('#hint').textContent = 'Os projetos rolam sozinhos na tela. Toque em um para ver a página inteira e a versão no celular.';

/* marquee */
const mq = $('#marquee');
const names = projects.map(p => `<span>${p.name}<img src="assets/img/symbol.png" alt="" width="18" height="18"></span>`).join('');
mq.innerHTML = names + names;

/* filters */
const filters = $('#filters');
filters.innerHTML = cats.filter(c => c.id === 'all' || projects.some(p => p.cat === c.id)).map((c, i) => {
  const n = c.id === 'all' ? projects.length : projects.filter(p => p.cat === c.id).length;
  return `<button class="chip" role="tab" data-cat="${c.id}" aria-selected="${i === 0}">${c.label}<sup>${pad(n)}</sup></button>`;
}).join('');

/* grid */
const grid = $('#grid');
grid.innerHTML = projects.map((p, i) => `
  <article class="card reveal ${i === 0 ? 'feature' : ''}" data-cat="${p.cat}" data-i="${i}" tabindex="0" aria-label="${p.name}, abrir detalhes">
    <div class="frame">
      <div class="bar"><i></i><i></i><i></i><span>${p.name}</span></div>
      <div class="viewport"><img src="${img(p.slug, 'full')}" alt="Página completa de ${p.name}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async"></div>
    </div>
    <div class="meta">
      <div>
        <span class="num">${pad(i + 1)} / ${pad(projects.length)}</span>
        <h3>${p.name}</h3>
        <p>${p.niche}</p>
        ${i === 0 ? `<p class="desc">${p.desc}</p><ul class="tags">${p.tags.map(t => `<li>${t}</li>`).join('')}</ul>` : ''}
      </div>
      <div class="meta-right"><span class="loc">${p.loc}</span><span class="go" aria-hidden="true">↗</span></div>
    </div>
  </article>`).join('');
const cards = [...grid.querySelectorAll('.card')];

/* hover-scroll: compute how far each screenshot travels */
function measure(card) {
  const vp = $('.viewport', card), im = $('img', vp);
  if (!im.complete || !im.naturalHeight) return;
  const travel = Math.max(0, im.getBoundingClientRect().height - vp.getBoundingClientRect().height);
  card.style.setProperty('--shift', `-${travel}px`);
  card.style.setProperty('--dur', `${Math.min(14, Math.max(2.5, travel / 450))}s`);
}
cards.forEach(card => {
  const im = $('.viewport img', card);
  im.complete ? measure(card) : im.addEventListener('load', () => measure(card), { once: true });
  card.addEventListener('click', () => openModal(+card.dataset.i));
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(+card.dataset.i); } });
  if (touch) return;
  card.addEventListener('mouseenter', () => measure(card));
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--cx', `${e.clientX - r.left}px`);
    card.style.setProperty('--cy', `${e.clientY - r.top}px`);
  });
});
let rt;
addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => cards.forEach(measure), 150); });

/* touch: the card that is centred on screen scrolls its own screenshot, like the desktop hover */
if (touch && !reduced && 'IntersectionObserver' in window) {
  const player = new IntersectionObserver(entries => entries.forEach(en => {
    const card = en.target;
    if (en.isIntersecting) { measure(card); card.classList.add('is-playing'); }
    else card.classList.remove('is-playing');
  }), { rootMargin: '-35% 0px -35% 0px' });
  cards.forEach(c => player.observe(c));
}

filters.addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  filters.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-selected', c === b));
  b.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
  const cat = b.dataset.cat;
  cards.forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat;
    card.classList.toggle('is-hidden', !show);
    // the wide "feature" layout only makes sense in the full list
    if (card.dataset.i === '0') card.classList.toggle('feature', cat === 'all');
    if (show) { card.classList.remove('in'); requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('in'))); }
  });
  requestAnimationFrame(() => cards.forEach(measure));
});

/* modal */
const modal = $('#modal');
const panel = $('.modal-panel');
const mScroll = $('.m-scroll');
let lastFocus = null, scrollY = 0;

function visibleIndexes() {
  return cards.filter(c => !c.classList.contains('is-hidden')).map(c => +c.dataset.i);
}
function setView(view) {
  modal.dataset.view = view;
  modal.querySelectorAll('.m-switch button').forEach(b => b.setAttribute('aria-pressed', b.dataset.view === view));
  mScroll.scrollTop = 0;
}
function openModal(i) {
  const p = projects[i];
  if (!modal.classList.contains('open')) lastFocus = document.activeElement;
  current = i;
  $('#m-url').textContent = p.name;
  $('#m-full').src = img(p.slug, 'full'); $('#m-full').alt = `Página completa de ${p.name}`;
  $('#m-mobile').src = img(p.slug, 'mobile'); $('#m-mobile').alt = `${p.name} no celular`;
  $('#m-mobile-big').src = img(p.slug, 'mobile'); $('#m-mobile-big').alt = `${p.name} no celular`;
  $('#m-meta').textContent = `${pad(i + 1)} · ${p.loc}`;
  $('#m-title').textContent = p.name;
  $('#m-desc').textContent = p.desc;
  $('#m-tags').innerHTML = [p.niche, ...p.tags].map(t => `<li>${t}</li>`).join('');
  $('#m-link').href = wa(p.name);
  setView(modal.dataset.view || 'desktop');
  panel.scrollTop = 0;
  if (!modal.classList.contains('open')) {
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
    // lock the page behind the modal (iOS ignores overflow:hidden on body alone)
    scrollY = window.scrollY;
    document.body.classList.add('locked');
    document.body.style.top = `-${scrollY}px`;
    $('.modal-close').focus({ preventScroll: true });
  }
}
function step(dir) {
  const list = visibleIndexes();
  const at = list.indexOf(current);
  openModal(list[(at + dir + list.length) % list.length]);
}
function closeModal() {
  modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked');
  document.body.style.top = '';
  window.scrollTo({ top: scrollY, behavior: 'instant' });
  lastFocus && lastFocus.focus({ preventScroll: true });
}
modal.addEventListener('click', e => {
  if (e.target.closest('[data-close]')) return closeModal();
  const nav = e.target.closest('[data-step]');
  if (nav) return step(+nav.dataset.step);
  const sw = e.target.closest('.m-switch button');
  if (sw) setView(sw.dataset.view);
});
addEventListener('keydown', e => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') step(e.key === 'ArrowRight' ? 1 : -1);
});
/* swipe left/right inside the modal to change project */
let sx = 0, sy = 0;
panel.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
panel.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
  if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) step(dx < 0 ? 1 : -1);
}, { passive: true });

/* reveal on scroll */
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
  if (el.classList.contains('card')) el.style.setProperty('--d', `${(i % 2) * 0.08}s`);
  io.observe(el);
});
document.querySelectorAll('.hero .reveal').forEach((el, i) => el.style.setProperty('--d', `${0.1 + i * 0.1}s`));
document.querySelectorAll('.steps .reveal').forEach((el, i) => el.style.setProperty('--d', `${i * 0.1}s`));

/* hero tilt + cursor glow (mouse only) */
if (!touch) {
  const stack = $('.stack'), glow = $('.cursor-glow');
  let raf = 0, mx = 0, my = 0;
  addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      glow.style.setProperty('--mx', `${mx}px`);
      glow.style.setProperty('--my', `${my}px`);
      if (stack) {
        stack.style.setProperty('--tx', (mx / innerWidth - 0.5).toFixed(3));
        stack.style.setProperty('--ty', (my / innerHeight - 0.5).toFixed(3));
      }
    });
  }, { passive: true });
}

/* count-up for stats */
const counters = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target, end = +el.dataset.count; let t0;
  const tick = t => { t0 ??= t; const k = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); };
  if (!reduced) requestAnimationFrame(tick); else el.textContent = end;
  counters.unobserve(el);
}), { threshold: 0.6 });
document.querySelectorAll('.stats [data-count]').forEach(el => counters.observe(el));

$('#year').textContent = new Date().getFullYear();
