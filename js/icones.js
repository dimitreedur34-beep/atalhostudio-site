// Ícones de linha (Lucide) e símbolo do WhatsApp, todos em assets/icones.svg.
// Para acrescentar um ícone: tools/icones/montar-icones.js
const SPRITE = 'assets/icones.svg';
const NS = 'http://www.w3.org/2000/svg';

export function icone(nome, classe = 'icone') {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', classe);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const uso = document.createElementNS(NS, 'use');
  uso.setAttribute('href', `${SPRITE}#${nome}`);
  svg.append(uso);
  return svg;
}

export const iconeHTML = (nome, classe = 'icone') =>
  `<svg class="${classe}" aria-hidden="true" focusable="false"><use href="${SPRITE}#${nome}"></use></svg>`;
