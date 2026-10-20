import { CONFIG } from './config.js';

const CHAVE_REF = 'atalho_ref';

// Mensagens prontas (docs/03). data-wa-mensagem no botão substitui qualquer uma delas.
const MENSAGENS = {
  geral: () => 'Oi! Vi o site da Atalho Studio e quero saber mais.',
  aba: (el) =>
    el.dataset.areaNome
      ? `Oi! Vi a demonstração para ${el.dataset.areaNome} no site da Atalho Studio e quero saber mais.`
      : null,
  plano: (el) => {
    const plano = CONFIG.planos.find((p) => p.id === el.dataset.plano);
    return plano ? `Oi! Quero saber mais do plano ${plano.nome}. Meu negócio é ___.` : null;
  }
};

// Só letras, números, hífen e sublinhado: ninguém consegue escrever texto livre na mensagem pelo link.
export function limparRef(valor) {
  return String(valor || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);
}

function lerRef() {
  const daUrl = limparRef(new URLSearchParams(location.search).get('utm_campaign'));
  try {
    if (daUrl) sessionStorage.setItem(CHAVE_REF, daUrl);
    return limparRef(sessionStorage.getItem(CHAVE_REF));
  } catch {
    return daUrl;
  }
}

export function numeroValido(numero = CONFIG.contato.whatsapp) {
  return /^55\d{10,11}$/.test(numero);
}

export function montarLink(mensagem, ref = '', numero = CONFIG.contato.whatsapp) {
  const texto = ref ? `${mensagem} (ref: ${ref})` : mensagem;
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

export function mensagemDe(el) {
  if (el.dataset.waMensagem) return el.dataset.waMensagem;
  const gerar = MENSAGENS[el.dataset.wa];
  return gerar ? gerar(el) : null;
}

function avisarSemNumero(evento) {
  evento.preventDefault();
  console.warn('WhatsApp: número ainda não configurado em js/config.js (contato.whatsapp).');
}

let ref = '';

// Refaz o link de um botão (usado quando a mensagem muda, ex.: área escolhida na demonstração).
export function atualizarLink(el) {
  const mensagem = mensagemDe(el);
  if (!mensagem) {
    console.warn('WhatsApp: botão sem mensagem.', el);
    return;
  }
  if (numeroValido()) {
    el.href = montarLink(mensagem, ref);
    el.target = '_blank';
    el.rel = 'noopener';
  } else {
    el.href = '#';
  }
}

export function iniciarWhatsApp(raiz = document) {
  ref = lerRef();
  const numeroOk = numeroValido();

  for (const el of raiz.querySelectorAll('[data-wa]')) {
    if (el.dataset.waPronto) continue;
    el.dataset.waPronto = 'sim';
    atualizarLink(el);
    if (!numeroOk) el.addEventListener('click', avisarSemNumero);

    // A medição (Fase 7) escuta este evento; aqui só avisamos que houve o clique.
    el.addEventListener('click', () => {
      document.dispatchEvent(
        new CustomEvent('atalho:whatsapp', {
          detail: {
            tipo: el.dataset.wa,
            plano: el.dataset.plano || null,
            posicao: el.dataset.posicao || null
          }
        })
      );
    });
  }
}
