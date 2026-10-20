// Diagnóstico em 3 perguntas: sugere por onde começar e monta a mensagem do WhatsApp.
// A mensagem usa só as opções fixas (nada digitado). Nada é enviado nem guardado pelo site.
import { icone } from './icones.js';
import { iniciarWhatsApp } from './whatsapp.js';

// [id, rótulo, ícone, modelo de site da área]
const NEGOCIOS = [
  ['clinica', 'Clínica ou consultório', 'stethoscope', 'clinica'],
  ['restaurante', 'Restaurante ou delivery', 'utensils', 'restaurante'],
  ['loja', 'Loja', 'shirt', 'loja'],
  ['imobiliaria', 'Imobiliária ou corretor', 'house', 'imobiliaria'],
  ['academia', 'Academia, escola ou curso', 'dumbbell', 'academia'],
  ['contabilidade', 'Escritório de contabilidade', 'briefcase', 'contabilidade'],
  ['salao', 'Salão, estética ou barbearia', 'scissors', 'salao'],
  ['outro', 'Outro tipo de negócio', 'plus', null]
];

const PERGUNTAS = [
  { id: 'negocio', titulo: 'Qual é o seu tipo de negócio?', opcoes: NEGOCIOS },
  {
    id: 'site',
    titulo: 'Você tem site hoje?',
    opcoes: [
      ['nao', 'Não tenho', 'x'],
      ['velho', 'Tenho, mas está desatualizado', 'repeat'],
      ['sim', 'Tenho e funciona bem', 'check']
    ]
  },
  {
    id: 'dor',
    titulo: 'O que mais faz você perder tempo ou cliente?',
    opcoes: [
      ['mensagens', 'Responder as mesmas perguntas no WhatsApp', 'message-circle'],
      ['encontrar', 'Cliente que não me encontra na internet', 'monitor'],
      ['organizar', 'Organizar agenda, pedidos, cobranças ou estoque', 'layout-dashboard'],
      ['tudo', 'Um pouco de tudo isso', 'clipboard-list']
    ]
  }
];

// Palavras de cada área, para a sugestão falar a língua do dono.
const PALAVRAS = {
  clinica: { cliente: 'paciente', pedido: 'pedido de horário', organizar: 'a agenda e os lembretes de consulta' },
  restaurante: { cliente: 'cliente', pedido: 'pedido', organizar: 'os pedidos, do WhatsApp até a cozinha' },
  loja: { cliente: 'cliente', pedido: 'pergunta de preço e tamanho', organizar: 'o estoque e as reservas de peças' },
  imobiliaria: { cliente: 'interessado', pedido: 'pedido de visita', organizar: 'os interessados em cada etapa da venda' },
  academia: { cliente: 'aluno', pedido: 'pedido de aula experimental', organizar: 'as mensalidades e quem está atrasado' },
  contabilidade: { cliente: 'cliente', pedido: 'envio de documento', organizar: 'os prazos e os documentos de cada cliente' },
  salao: { cliente: 'cliente', pedido: 'pedido de horário', organizar: 'a agenda e os lembretes de horário' },
  outro: { cliente: 'cliente', pedido: 'pedido', organizar: 'o que hoje fica no caderno ou na planilha' }
};

const NOMES = { site: 'Site', whatsapp: 'WhatsApp automático', sistema: 'Sistema' };
const ICONES = { site: 'monitor', whatsapp: 'message-circle', sistema: 'layout-dashboard' };

function el(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto != null) elemento.textContent = texto;
  return elemento;
}

const rotulo = (pergunta, valor) => PERGUNTAS.find((p) => p.id === pergunta).opcoes.find((o) => o[0] === valor)[1];

export function sugerir({ negocio, site, dor }) {
  const p = PALAVRAS[negocio];
  const itens = [];
  if (site !== 'sim' || dor === 'encontrar') {
    const motivo = {
      nao: `Quem procura no Google ou pergunta para a IA precisa encontrar você. Hoje, o ${p.cliente} que procura acha o concorrente.`,
      velho: `Site parado passa a impressão de negócio parado. Um site rápido e atual faz o ${p.cliente} confiar e chamar.`,
      sim: 'Seu site existe, mas não traz gente. Dá para prepará-lo para o Google, para a IA e para receber anúncios.'
    }[site];
    itens.push(['site', motivo]);
  }
  if (dor === 'mensagens' || dor === 'tudo') {
    itens.push(['whatsapp', `Cada ${p.pedido} é respondido na hora, 24h, e chega organizado para você. Ninguém fica esperando.`]);
  }
  if (dor === 'organizar' || dor === 'tudo') {
    itens.push(['sistema', `Um painel para cuidar de ${p.organizar}, com aviso pelo WhatsApp. Menos caderno, menos esquecimento.`]);
  }
  return { titulo: itens.map(([id]) => NOMES[id]).join(' + '), itens };
}

export function iniciarDiagnostico(caixa = document.querySelector('[data-diagnostico]')) {
  if (!caixa) return;
  const respostas = {};
  let etapa = 0;

  function entrar(conteudo, focar) {
    conteudo.classList.add('dg-entrando');
    caixa.replaceChildren(conteudo);
    if (focar) conteudo.querySelector('h3')?.focus({ preventScroll: true });
  }

  function mostrarPergunta(focar) {
    const pergunta = PERGUNTAS[etapa];
    const bloco = el('div');

    const topo = el('div', 'dg-topo');
    const barra = el('div', 'dg-barra');
    const preenchido = el('span');
    preenchido.style.width = `${((etapa + 1) / (PERGUNTAS.length + 1)) * 100}%`;
    barra.append(preenchido);
    topo.append(el('span', null, `Pergunta ${etapa + 1} de ${PERGUNTAS.length}`), barra);

    const corpo = el('div', 'dg-corpo');
    const titulo = el('h3', null, pergunta.titulo);
    titulo.tabIndex = -1;
    const opcoes = el('div', 'dg-opcoes');
    opcoes.setAttribute('role', 'group');
    opcoes.setAttribute('aria-label', pergunta.titulo);
    for (const [valor, texto, nomeIcone] of pergunta.opcoes) {
      const botao = el('button', 'dg-opcao');
      botao.type = 'button';
      botao.append(icone(nomeIcone), document.createTextNode(texto));
      if (respostas[pergunta.id] === valor) botao.setAttribute('aria-pressed', 'true');
      botao.addEventListener('click', () => {
        respostas[pergunta.id] = valor;
        etapa += 1;
        if (etapa < PERGUNTAS.length) mostrarPergunta(true);
        else mostrarResultado();
      });
      opcoes.append(botao);
    }
    corpo.append(titulo, opcoes);
    bloco.append(topo, corpo);

    if (etapa > 0) {
      const voltar = el('button', 'dg-voltar');
      voltar.type = 'button';
      voltar.append(icone('chevron-left'), document.createTextNode('Voltar'));
      voltar.addEventListener('click', () => {
        etapa -= 1;
        mostrarPergunta(true);
      });
      bloco.append(voltar);
    }
    entrar(bloco, focar);
  }

  function mostrarResultado() {
    const { titulo, itens } = sugerir(respostas);
    const negocio = NEGOCIOS.find((n) => n[0] === respostas.negocio);
    const bloco = el('div', 'dg-resultado');

    const topo = el('div', 'dg-topo');
    const barra = el('div', 'dg-barra');
    const cheio = el('span');
    cheio.style.width = '100%';
    barra.append(cheio);
    topo.append(el('span', null, 'Pronto'), barra);

    const nome = el('h3', null, titulo);
    nome.tabIndex = -1;
    const motivos = el('ul', 'dg-motivos');
    motivos.setAttribute('role', 'list');
    for (const [id, texto] of itens) {
      const item = el('li');
      const textos = el('div');
      textos.append(el('strong', null, NOMES[id]), el('span', null, texto));
      item.append(icone(ICONES[id]), textos);
      motivos.append(item);
    }

    const acoes = el('div', 'acoes');
    const whats = el('a', 'botao botao-whats');
    whats.href = '#contato';
    whats.dataset.wa = 'geral';
    whats.dataset.posicao = 'diagnostico';
    whats.dataset.waMensagem = [
      'Oi! Fiz o diagnóstico no site da Atalho Studio.',
      `Negócio: ${negocio[1]}`,
      `Site hoje: ${rotulo('site', respostas.site)}`,
      `O que mais pesa: ${rotulo('dor', respostas.dor)}`,
      `Sugestão: ${titulo}`,
      'Quero entender como funcionaria para mim.'
    ].join('\n');
    whats.append(icone('whatsapp'), document.createTextNode('Quero começar por aqui'));
    acoes.append(whats);

    // Um exemplo para ver antes de chamar: o modelo de site da área ou a página do serviço sugerido.
    const exemplo = el('a', 'link-seta');
    if (itens[0][0] === 'site' && negocio[3]) {
      exemplo.href = `ver.html?modelo=${negocio[3]}`;
      exemplo.textContent = 'Ver um site de exemplo';
    } else {
      exemplo.href = { site: 'sites.html', whatsapp: 'whatsapp.html', sistema: 'sistemas.html' }[itens[0][0]];
      exemplo.textContent = 'Ver como funciona';
    }
    exemplo.append(icone('arrow-right'));
    acoes.append(exemplo);

    const refazer = el('button', 'dg-refazer');
    refazer.type = 'button';
    refazer.append(icone('repeat'), document.createTextNode('Refazer'));
    refazer.addEventListener('click', () => {
      etapa = 0;
      mostrarPergunta(true);
    });

    bloco.append(topo, el('small', null, `Para ${negocio[1].toLowerCase()}, o atalho é`), nome, motivos, acoes, refazer);
    entrar(bloco, true);
    iniciarWhatsApp(bloco);
  }

  mostrarPergunta(false);
}
