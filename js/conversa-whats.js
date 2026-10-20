// Celular com WhatsApp: monta a tela e roda uma conversa de demonstração com botões.
// Texto sempre por textContent.
import { icone } from './icones.js';
const reduzirMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, reduzirMovimento ? 0 : ms));

function el(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto != null) elemento.textContent = texto;
  return elemento;
}

export function criarCelular(raiz) {
  const wa = el('div', 'wa');
  const topo = el('div', 'wa-topo');
  const voltar = icone('chevron-left', 'wa-voltar');
  const avatar = el('span', 'wa-avatar');
  avatar.setAttribute('aria-hidden', 'true');
  const nomes = el('div', 'wa-nome');
  const nome = el('strong');
  const status = el('span', null, 'online');
  nomes.append(nome, status);
  topo.append(voltar, avatar, nomes);

  const conversa = el('div', 'wa-conversa');
  conversa.setAttribute('role', 'log');
  conversa.setAttribute('aria-label', 'Conversa de demonstração no WhatsApp');

  const rodape = el('div', 'wa-rodape');
  const campo = el('div', 'wa-campo wa-vazio', 'Mensagem');
  campo.setAttribute('aria-hidden', 'true');
  const enviar = el('button', 'wa-enviar');
  enviar.type = 'button';
  enviar.append(icone('send-horizontal'));
  enviar.disabled = true;
  enviar.setAttribute('aria-label', 'Enviar mensagem');
  rodape.append(campo, enviar);

  wa.append(topo, conversa, rodape);
  raiz.replaceChildren(wa);

  let ultimo = null;
  let aoEnviar = null;
  let hora = 7;

  const rolar = () => {
    conversa.scrollTop = conversa.scrollHeight;
  };

  function bolha(lado, texto) {
    const msg = el('p', `wa-msg ${lado === 'saida' ? 'wa-saida' : 'wa-entrada'}`);
    if (ultimo === lado) msg.classList.add('wa-seguida');
    msg.append(el('span', 'visualmente-oculto', lado === 'saida' ? 'Você: ' : `${nome.textContent}: `));
    msg.append(document.createTextNode(texto));
    const horario = el('span', 'wa-hora', `22:${String(hora).padStart(2, '0')}`);
    if (lado === 'saida') horario.append(icone('check-check', 'wa-vistos'));
    msg.append(horario);
    conversa.append(msg);
    ultimo = lado;
    rolar();
  }

  enviar.addEventListener('click', () => aoEnviar && aoEnviar());

  return {
    rodada: 0,
    limpar(area) {
      wa.style.setProperty('--cor', area.cor);
      nome.textContent = area.negocio;
      avatar.textContent = area.negocio.charAt(0);
      status.textContent = 'online';
      ultimo = null;
      hora = 7;
      conversa.replaceChildren(el('div', 'wa-data', 'Hoje'), el('div', 'wa-aviso', 'Demonstração com dados fictícios'));
      this.sugerir(null);
    },
    sugerir(texto, acao) {
      aoEnviar = acao || null;
      campo.textContent = texto || 'Mensagem';
      campo.classList.toggle('wa-vazio', !texto);
      enviar.disabled = !texto;
      enviar.classList.toggle('wa-chamando', Boolean(texto));
      enviar.setAttribute('aria-label', texto ? `Enviar mensagem: ${texto}` : 'Enviar mensagem');
    },
    enviarSugestao() {
      if (aoEnviar) aoEnviar();
    },
    async digitar(ms) {
      status.textContent = 'digitando…';
      const pontos = el('div', 'wa-digitando');
      pontos.setAttribute('aria-hidden', 'true');
      pontos.append(el('span'), el('span'), el('span'));
      conversa.append(pontos);
      rolar();
      await esperar(ms);
      pontos.remove();
      status.textContent = 'online';
    },
    enviar(texto) {
      bolha('saida', texto);
    },
    receber(texto) {
      bolha('entrada', texto);
    },
    botoes(lista, aoEscolher) {
      const grupo = el('div', 'wa-botoes');
      const botoes = lista.map(([rotulo, destino, envia]) => {
        const botao = el('button', 'wa-botao', rotulo);
        botao.type = 'button';
        botao.addEventListener('click', () => {
          botoes.forEach((b) => (b.disabled = true));
          aoEscolher(envia || rotulo, destino);
        });
        return botao;
      });
      grupo.append(...botoes);
      conversa.append(grupo);
      ultimo = null;
      rolar();
      return botoes;
    },
    recomecar(acao) {
      const botao = el('button', 'wa-recomecar', 'Recomeçar conversa');
      botao.type = 'button';
      botao.addEventListener('click', acao);
      conversa.append(botao);
      rolar();
    },
    avancarHora() {
      hora = Math.min(hora + 1, 59);
    }
  };
}

// Roda a conversa de uma área. automatico: toca sozinho (primeira tela). aoPasso: recebe a nota de cada passo.
export function rodarConversa(celular, area, { automatico = false, aoPasso = () => {}, aoTerminar = () => {} } = {}) {
  const rodada = ++celular.rodada;
  const vivo = () => rodada === celular.rodada;
  celular.limpar(area);

  async function passo(id) {
    const atual = area.passos[id];
    if (!atual) return;
    if (atual.nota) aoPasso(atual.nota);

    for (const texto of atual.bot) {
      await celular.digitar(Math.min(1400, 500 + texto.length * 12));
      if (!vivo()) return;
      celular.receber(texto);
    }

    if (!atual.botoes?.length) {
      if (automatico) aoTerminar();
      else celular.recomecar(() => rodarConversa(celular, area, { aoPasso }));
      return;
    }

    let escolhido = false;
    const botoes = celular.botoes(atual.botoes, async (texto, destino) => {
      escolhido = true;
      celular.avancarHora();
      celular.enviar(texto);
      await esperar(350);
      if (vivo()) passo(destino);
    });

    if (automatico) {
      await esperar(1900);
      if (vivo() && !escolhido) botoes[0].click();
    }
  }

  celular.sugerir(area.sugestao, () => {
    celular.sugerir(null);
    celular.enviar(area.sugestao);
    passo('inicio');
  });

  if (automatico) esperar(1000).then(() => vivo() && celular.enviarSugestao());
}
