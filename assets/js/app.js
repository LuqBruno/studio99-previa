/* Studio 99 — prévia conceitual. Sem dependências.
   Presets de movimento (shared/motion-library): fan (cartela), curtain (máscara das fotos),
   line-mask (títulos), accordion (serviços), press e magnetic (CTA), image-zoom (galeria). */
(() => {
  'use strict';
  const WHATS = '5548996227668';
  const reduz = matchMedia('(prefers-reduced-motion: reduce)');
  const movel = matchMedia('(max-width: 760px)');
  const fino = matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = k => 1 - Math.pow(1 - k, 3);
  const waLink = texto => `https://wa.me/${WHATS}?text=${encodeURIComponent(texto)}`;

  /* ---------- Cartela de tons (assinatura) ---------- */
  const hero = document.querySelector('[data-hero]');
  const cartela = hero.querySelector('[data-cartela]');
  const lista = cartela.querySelector('[data-tiras]');
  const tiras = [...cartela.querySelectorAll('.tira')];
  const legenda = cartela.querySelector('[data-legenda]');
  const nomeTom = cartela.querySelector('[data-nome-tom]');
  const linkTom = cartela.querySelector('[data-link-tom]');
  const N = tiras.length;
  const FASE = .36;            // fatia da rolagem em que o leque se abre (desktop)
  const BASE = FASE * .85;     // a partir daqui os tons recebem destaque, um a um
  let ativa = -1;

  const curso = () => hero.offsetHeight - innerHeight;
  const rolagemLigada = () => !reduz.matches && curso() > 40;
  const lerP = () => clamp(-hero.getBoundingClientRect().top / curso());
  const fase = f => { if (legenda.dataset.fase !== f) legenda.dataset.fase = f; };

  function setAtiva(i) {
    if (i === ativa) return;
    ativa = i;
    tiras.forEach((t, k) => {
      const on = k === i;
      t.classList.toggle('is-ativa', on);
      t.querySelector('.tira__btn').setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (i >= 0) {
      const nome = tiras[i].dataset.nome;
      nomeTom.textContent = nome;
      linkTom.href = waLink(`Oi! Vim pela página e quero agendar mechas. Gostei do tom “${nome}” da cartela.`);
    }
  }

  // Desktop: abre o leque e revela cada foto em máscara; depois destaca um tom por vez.
  // Celular: uma banda aberta por vez, conforme a rolagem.
  function pinta(p) {
    hero.style.setProperty('--p', p.toFixed(4));
    if (!movel.matches) {
      const a = clamp(p / FASE);
      // Começa com o leque entreaberto (as seis pontas já aparecem) e termina aberto.
      cartela.style.setProperty('--abre', (.5 + .5 * ease(a)).toFixed(4));
      tiras.forEach((t, i) => t.style.setProperty('--r', (.88 + .12 * ease(clamp(a * 1.5 - i * .1))).toFixed(3)));
      if (p < BASE) { fase('dica'); setAtiva(-1); }
      else { fase('tom'); setAtiva(Math.min(N - 1, Math.floor((p - BASE) / (1 - BASE) * N))); }
    } else {
      if (p < .02) { fase('dica'); setAtiva(0); }
      else { fase('tom'); setAtiva(Math.min(N - 1, Math.floor(p * N))); }
    }
  }

  let alvo = 0, atual = 0, rodando = false;
  // Mola leve: a cartela segue a rolagem com um pouco de inércia, sem atrasar o conteúdo.
  function passo() {
    atual += (alvo - atual) * .15;
    if (Math.abs(alvo - atual) < .0006) atual = alvo;
    pinta(atual);
    if (atual !== alvo) requestAnimationFrame(passo); else rodando = false;
  }

  function iniciaCartela() {
    if (rolagemLigada()) {
      atual = alvo = lerP();
      pinta(atual);
    } else {
      // Sem rolagem guiada (movimento reduzido ou sem curso): cartela aberta e estática.
      cartela.style.removeProperty('--abre');
      hero.style.removeProperty('--p');
      tiras.forEach(t => t.style.removeProperty('--r'));
      fase('tom');
      ativa = -2;
      setAtiva(0);
    }
  }

  function escolhe(i) {
    if (rolagemLigada()) {
      const topo0 = hero.getBoundingClientRect().top + scrollY;
      const p = movel.matches ? (i + .5) / N : BASE + ((i + .5) / N) * (1 - BASE);
      scrollTo({ top: topo0 + p * curso(), behavior: 'smooth' });
    } else {
      setAtiva(i);
    }
  }

  let bloqueiaClique = false;
  tiras.forEach((t, i) => {
    const b = t.querySelector('.tira__btn');
    b.addEventListener('click', () => { if (!bloqueiaClique) escolhe(i); });
    b.addEventListener('keydown', e => {
      const vertical = movel.matches;
      const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: vertical ? 1 : 0, ArrowUp: vertical ? -1 : 0 }[e.key];
      if (!d) return;
      e.preventDefault();
      const j = clamp(i + d, 0, N - 1);
      tiras[j].querySelector('.tira__btn').focus({ preventScroll: true });
      escolhe(j);
    });
  });

  // Arraste horizontal no celular (limiar de 40 px); a rolagem vertical segue nativa (touch-action: pan-y).
  let x0 = null, y0 = 0;
  lista.addEventListener('pointerdown', e => { if (movel.matches) { x0 = e.clientX; y0 = e.clientY; } });
  lista.addEventListener('pointerup', e => {
    if (x0 === null) return;
    const dx = e.clientX - x0, dy = e.clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      bloqueiaClique = true; setTimeout(() => { bloqueiaClique = false; }, 0);
      escolhe(clamp(Math.max(ativa, 0) + (dx < 0 ? 1 : -1), 0, N - 1));
    }
  });
  lista.addEventListener('pointercancel', () => { x0 = null; });

  /* ---------- Barra fixa do celular ---------- */
  const barra = document.querySelector('[data-barra]');
  const contatoEls = [document.getElementById('contato'), document.querySelector('.rodape')].filter(Boolean);
  const contatoVisivel = new Set();
  function atualizaBarra() {
    if (!barra) return;
    const passouHero = hero.getBoundingClientRect().bottom < innerHeight * .7;
    barra.classList.toggle('is-visivel', passouHero && contatoVisivel.size === 0);
  }

  // Tudo que a rolagem já deixou para trás (ou está na tela) aparece, mesmo numa rolagem muito rápida.
  let pendentes = [...document.querySelectorAll('.revela, .mascara')];
  function revelaPassados() {
    if (!pendentes.length) return;
    pendentes = pendentes.filter(el => {
      if (el.getBoundingClientRect().top < innerHeight * .96) { el.classList.add('is-visivel'); return false; }
      return true;
    });
  }

  function aoRolar() {
    if (rolagemLigada()) {
      alvo = lerP();
      if (!rodando) { rodando = true; requestAnimationFrame(passo); }
    }
    atualizaBarra();
    revelaPassados();
  }

  addEventListener('scroll', aoRolar, { passive: true });
  let tResize;
  addEventListener('resize', () => { clearTimeout(tResize); tResize = setTimeout(() => { iniciaCartela(); aoRolar(); }, 120); });
  reduz.addEventListener?.('change', () => { iniciaCartela(); aoRolar(); });
  movel.addEventListener?.('change', () => { ativa = -2; iniciaCartela(); aoRolar(); });

  /* ---------- Revelações (line-mask, fade, image-zoom) ---------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entradas => {
      entradas.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visivel');
        io.unobserve(en.target);
      });
    }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.revela, .mascara').forEach(el => io.observe(el));
    // Um observador por elemento mantém o conjunto de seções visíveis; a barra some sobre o contato.
    contatoEls.forEach(el => {
      new IntersectionObserver(([en]) => {
        if (en.isIntersecting) contatoVisivel.add(el); else contatoVisivel.delete(el);
        atualizaBarra();
      }, { threshold: .1 }).observe(el);
    });
  } else {
    document.querySelectorAll('.revela, .mascara').forEach(el => el.classList.add('is-visivel'));
  }

  /* ---------- Serviços: painéis (accordion) ---------- */
  const paineis = [...document.querySelectorAll('[data-painel]')];
  function abre(idx, foco) {
    paineis.forEach((p, i) => {
      const on = i === idx;
      p.classList.toggle('is-aberto', on);
      const aba = p.querySelector('.painel__aba');
      aba.setAttribute('aria-expanded', on ? 'true' : 'false');
      if (on && foco) aba.focus({ preventScroll: true });
    });
  }
  paineis.forEach((p, i) => {
    const aba = p.querySelector('.painel__aba');
    aba.addEventListener('click', () => abre(p.classList.contains('is-aberto') ? -1 : i));
    aba.addEventListener('keydown', e => {
      const d = { ArrowDown: 1, ArrowUp: -1 }[e.key];
      if (d) { e.preventDefault(); paineis[(i + d + paineis.length) % paineis.length].querySelector('.painel__aba').focus(); }
      if (e.key === 'Home') { e.preventDefault(); paineis[0].querySelector('.painel__aba').focus(); }
      if (e.key === 'End') { e.preventDefault(); paineis[paineis.length - 1].querySelector('.painel__aba').focus(); }
    });
  });
  abre(0);

  /* ---------- CTA magnético (só ponteiro fino) ---------- */
  if (fino.matches && !reduz.matches) {
    document.querySelectorAll('[data-magnetico]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = clamp((e.clientX - (r.left + r.width / 2)) * .16, -9, 9);
        const y = clamp((e.clientY - (r.top + r.height / 2)) * .26, -7, 7);
        el.style.translate = `${x}px ${y}px`;
      });
      el.addEventListener('pointerleave', () => { el.style.translate = ''; });
    });
  }

  iniciaCartela();
  aoRolar();
})();
