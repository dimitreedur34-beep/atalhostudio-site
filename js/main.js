import { CONFIG } from './config.js';
import { iniciarWhatsApp, atualizarLink } from './whatsapp.js';
import { montarLayout, iniciarRevelar } from './layout.js';
import { iniciarMovimento } from './movimento.js';

// Módulo de cada página (body data-pagina)
const MODULOS = {
  inicio: './pagina-inicio.js',
  sites: './pagina-sites.js',
  ver: './ver.js',
  whatsapp: './pagina-whatsapp.js',
  sistemas: './painel.js'
};

const PENDENTE = '[PREENCHER';
const ehPendente = (valor) => typeof valor === 'string' && valor.includes(PENDENTE);
const modoDev = new URLSearchParams(location.search).has('dev');

function valorDe(caminho) {
  return caminho.split('.').reduce((objeto, chave) => (objeto == null ? objeto : objeto[chave]), CONFIG);
}

// Links montados a partir do config.js. Valor inválido ou pendente: mostra o texto, sem link.
const LINKS = {
  email() {
    const email = CONFIG.contato.email;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? { href: `mailto:${email}`, texto: email } : null;
  },
  instagram() {
    const usuario = String(CONFIG.contato.instagram).replace(/^@/, '');
    return /^[A-Za-z0-9._]{1,30}$/.test(usuario)
      ? { href: `https://www.instagram.com/${usuario}/`, texto: `@${usuario}` }
      : null;
  }
};

function preencherConfig() {
  for (const el of document.querySelectorAll('[data-config]')) {
    const valor = valorDe(el.dataset.config);
    el.textContent = valor == null ? '' : String(valor);
  }

  for (const el of document.querySelectorAll('[data-opcional]')) {
    const valor = valorDe(el.dataset.opcional);
    el.hidden = valor == null || valor === '';
  }

  // Frase que depende de um dado do dono: some enquanto o dado falta (no ?dev aparece marcada).
  for (const el of document.querySelectorAll('[data-se-preenchido]')) {
    const valor = valorDe(el.dataset.sePreenchido);
    el.hidden = !modoDev && (valor == null || valor === '' || ehPendente(valor));
  }

  // Blocos ligados a uma decisão do config.js (ex.: diagnostico.ativo).
  for (const el of document.querySelectorAll('[data-mostrar-se]')) {
    el.hidden = !valorDe(el.dataset.mostrarSe);
  }
  for (const el of document.querySelectorAll('[data-ocultar-se]')) {
    el.hidden = Boolean(valorDe(el.dataset.ocultarSe));
  }

  for (const el of document.querySelectorAll('[data-link]')) {
    const montar = LINKS[el.dataset.link];
    const link = montar && montar();
    if (link) {
      el.href = link.href;
      el.textContent = link.texto;
      if (el.dataset.link === 'instagram') el.rel = 'noopener';
    } else {
      el.removeAttribute('href');
      el.textContent = String(valorDe(`contato.${el.dataset.link}`) ?? '');
    }
  }

  for (const el of document.querySelectorAll('[data-ano]')) {
    el.textContent = String(new Date().getFullYear());
  }

  // Preço "a partir de": valor ainda não confirmado pelo dono aparece como pendência.
  const plano = (id) => CONFIG.planos.find((p) => p.id === id);
  for (const el of document.querySelectorAll('[data-plano-nome]')) {
    el.textContent = plano(el.dataset.planoNome)?.nome ?? '';
  }
  for (const el of document.querySelectorAll('[data-plano-preco]')) {
    const p = plano(el.dataset.planoPreco);
    el.textContent = !p ? '' : p.confirmado ? p.aPartirDe : `[PREENCHER: confirmar ${p.aPartirDe}]`;
  }
}

// ?dev na URL: contorna em amarelo todo texto que ainda falta preencher.
function marcarPendencias() {
  if (!modoDev) return;
  document.documentElement.classList.add('modo-dev');
  const percorrer = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (percorrer.nextNode()) {
    if (ehPendente(percorrer.currentNode.nodeValue)) percorrer.currentNode.parentElement.classList.add('pendente');
  }
}

document.documentElement.classList.remove('sem-js');
montarLayout();
preencherConfig();

const modulo = MODULOS[document.body.dataset.pagina];
if (modulo) {
  try {
    const { iniciar } = await import(modulo);
    await iniciar({ atualizarLink });
  } catch (erro) {
    console.error('Não foi possível iniciar a página.', erro);
  }
}

marcarPendencias();
iniciarWhatsApp();
iniciarRevelar();
iniciarMovimento();
