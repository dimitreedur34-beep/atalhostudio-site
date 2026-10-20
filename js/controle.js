// Demonstrações de "como funciona por dentro" e "você no controle" (páginas WhatsApp e Sistemas).
// Tudo de exemplo: nada é salvo nem enviado.
import { icone } from './icones.js';

const parado = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function el(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto != null) elemento.textContent = texto;
  return elemento;
}

// Liga um grupo de botões em que só um fica marcado (aria-pressed).
function segmentos(grupo, aoEscolher) {
  const botoes = [...grupo.querySelectorAll('button')];
  botoes.forEach((botao) =>
    botao.addEventListener('click', () => {
      botoes.forEach((b) => b.setAttribute('aria-pressed', String(b === botao)));
      aoEscolher(botao.dataset.valor ?? botao.dataset.caminho);
    })
  );
}

// Quando o elemento aparece na tela pela primeira vez
function aoAparecer(elemento, fazer, limiar = 0.3) {
  if (!('IntersectionObserver' in window)) {
    fazer();
    return;
  }
  const observador = new IntersectionObserver(
    (entradas) => {
      if (!entradas.some((e) => e.isIntersecting)) return;
      observador.disconnect();
      fazer();
    },
    { threshold: limiar }
  );
  observador.observe(elemento);
}

/* ---------- WhatsApp: o caminho de cada mensagem ---------- */
const CAMINHOS = {
  preco: {
    nos: ['chega', 'entende', 'procura', 'responde', 'fim'],
    textos: {
      chega: '22:10 · “Quanto custa a avaliação?”',
      entende: 'É uma pergunta de preço.',
      procura: 'Acha o preço que você cadastrou: R$ 80.',
      responde: '“A avaliação custa R$ 80. Quer marcar?”, com os botões Sim e Não.',
      fim: 'Cliente respondido em segundos, sem ninguém da equipe parar o que estava fazendo.'
    }
  },
  marcar: {
    nos: ['chega', 'entende', 'procura', 'responde', 'fim'],
    textos: {
      chega: '22:14 · “Quero marcar um horário”',
      entende: 'É um pedido de horário.',
      procura: 'Vê os dias e períodos em que você atende.',
      responde: '“Prefere manhã ou tarde?” e anota a escolha.',
      fim: 'Pedido anotado e organizado. De manhã, a equipe só confirma.'
    }
  },
  reclamar: {
    nos: ['chega', 'entende', 'pessoa', 'fim'],
    textos: {
      chega: '09:30 · “Quero fazer uma reclamação”',
      entende: 'É uma reclamação: está na lista do que vai direto para você.',
      pessoa: 'Avisa a equipe e para de responder nesta conversa.',
      fim: 'Uma pessoa assume. O cliente não fica discutindo com um robô.'
    }
  }
};

export function iniciarFluxo() {
  const lista = document.querySelector('[data-fluxo]');
  const escolha = document.querySelector('[data-fluxo-escolha]');
  if (!lista || !escolha) return;

  const nos = [...lista.querySelectorAll('[data-no]')];
  const textoOriginal = new Map(nos.map((no) => [no, no.querySelector('[data-texto-no]').textContent]));
  let rodada = 0;

  function mostrar(nome) {
    const caminho = CAMINHOS[nome];
    rodada += 1;
    const minhaRodada = rodada;
    for (const no of nos) {
      no.classList.remove('ativo', 'feito', 'pulado');
      no.querySelector('[data-texto-no]').textContent = textoOriginal.get(no);
      if (!caminho.nos.includes(no.dataset.no)) no.classList.add('pulado');
    }
    const ordem = caminho.nos.map((id) => nos.find((no) => no.dataset.no === id));
    const acender = (i) => {
      if (minhaRodada !== rodada || i >= ordem.length) return;
      if (i > 0) {
        ordem[i - 1].classList.remove('ativo');
        ordem[i - 1].classList.add('feito');
      }
      ordem[i].classList.add('ativo');
      ordem[i].querySelector('[data-texto-no]').textContent = caminho.textos[ordem[i].dataset.no];
      if (parado()) acender(i + 1);
      else setTimeout(() => acender(i + 1), 750);
    };
    acender(0);
  }

  segmentos(escolha, mostrar);
  aoAparecer(lista, () => mostrar('preco'), 0.4);
}

/* ---------- WhatsApp: painel de configurações ---------- */
export function iniciarControleWhats() {
  const painel = document.querySelector('[data-controle]');
  if (!painel) return;
  const chave = painel.querySelector('[data-chave]');
  const estado = painel.querySelector('[data-estado-texto]');
  const resumo = painel.querySelector('[data-resumo]');
  const assuntos = painel.querySelector('[data-assuntos]');
  let quando = '24h';

  function atualizar() {
    const ligado = chave.getAttribute('aria-checked') === 'true';
    estado.textContent = ligado ? 'Ligado: respondendo agora' : 'Pausado: as mensagens esperam por você';
    painel.classList.toggle('pausado', !ligado);
    const marcados = [...assuntos.querySelectorAll('input:checked')].map((i) => i.nextElementSibling.textContent.toLowerCase());
    if (!ligado) {
      resumo.textContent = 'Pausado. Nenhuma resposta automática até você ligar de novo.';
      return;
    }
    const horario = quando === '24h' ? 'responde 24 horas por dia' : 'responde só quando a sua equipe não está';
    const direto = marcados.length
      ? `${marcados.join(', ').replace(/, ([^,]*)$/, ' e $1')} ${marcados.length > 1 ? 'vão' : 'vai'} direto para você.`
      : 'Nada vai direto para você: o atendimento tenta resolver tudo.';
    resumo.textContent = `Assim: o atendimento ${horario}. ${direto.charAt(0).toUpperCase()}${direto.slice(1)}`;
  }

  chave.addEventListener('click', () => {
    chave.setAttribute('aria-checked', String(chave.getAttribute('aria-checked') !== 'true'));
    atualizar();
  });
  segmentos(painel.querySelector('[data-quando]'), (valor) => {
    quando = valor;
    atualizar();
  });
  assuntos.addEventListener('change', atualizar);
  atualizar();
}

/* ---------- Sistemas: ver o painel como dono ou recepção ---------- */
const MENU = [
  ['calendar', 'Agenda', ['dono', 'recepcao']],
  ['users', 'Clientes', ['dono', 'recepcao']],
  ['receipt', 'Cobranças pendentes', ['dono', 'recepcao']],
  ['wallet', 'Financeiro', ['dono']],
  ['chart-column', 'Relatórios', ['dono']],
  ['shield-check', 'Equipe e acessos', ['dono']]
];

export function iniciarPapeis() {
  const caixa = document.querySelector('[data-papeis]');
  if (!caixa) return;
  const menu = caixa.querySelector('[data-papel-menu]');

  function mostrar(papel) {
    menu.replaceChildren(
      ...MENU.map(([nomeIcone, nome, quem], i) => {
        const pode = quem.includes(papel);
        const item = el('li', pode ? '' : 'bloqueado');
        item.style.setProperty('--i', i);
        const estado = el('small', null, pode ? 'pode ver' : 'sem acesso');
        estado.prepend(icone(pode ? 'check' : 'x'));
        item.append(icone(nomeIcone), el('span', null, nome), estado);
        return item;
      })
    );
  }

  segmentos(caixa.querySelector('[data-papel]'), mostrar);
  mostrar('dono');
}

/* ---------- Sistemas: relatório com gráfico ---------- */
const DIAS = { Seg: 'Segunda', Ter: 'Terça', Qua: 'Quarta', Qui: 'Quinta', Sex: 'Sexta', Sáb: 'Sábado' };
const RELATORIO = {
  atual: {
    dias: [['Seg', 31], ['Ter', 42], ['Qua', 33], ['Qui', 35], ['Sex', 29], ['Sáb', 16]],
    kpis: [['Atendimentos', '186', 'no mês'], ['Faltas', '4', 'no mês passado foram 11'], ['A receber', 'R$ 1.240', '4 clientes, lembrete já enviado']],
    dicas: [
      'Terça é o dia mais cheio: vale reforçar a recepção.',
      'Os horários das 18h acabam primeiro. Dá para abrir mais vagas nesse horário.',
      'Com o lembrete de véspera, as faltas caíram de 11 para 4.'
    ]
  },
  anterior: {
    dias: [['Seg', 28], ['Ter', 30], ['Qua', 27], ['Qui', 33], ['Sex', 25], ['Sáb', 14]],
    kpis: [['Atendimentos', '157', 'no mês'], ['Faltas', '11', 'antes do lembrete de véspera'], ['A receber', 'R$ 2.180', '9 clientes em atraso']],
    dicas: [
      'Quinta foi o dia mais cheio.',
      '11 faltas sem aviso: horários que poderiam ter sido de outro cliente.',
      '9 clientes atrasados, cobrados um por um no WhatsApp.'
    ]
  }
};

export function iniciarRelatorio() {
  const caixa = document.querySelector('[data-relatorio]');
  if (!caixa) return;
  const kpis = caixa.querySelector('[data-kpis]');
  const barras = caixa.querySelector('[data-barras]');
  const detalhe = caixa.querySelector('[data-detalhe]');
  const dicas = caixa.querySelector('[data-dicas]');

  function mostrar(periodo) {
    const dados = RELATORIO[periodo];
    const maior = Math.max(...dados.dias.map(([, n]) => n));

    kpis.replaceChildren(
      ...dados.kpis.map(([nome, valor, nota]) => {
        const cartao = el('div', 'kpi');
        cartao.append(el('small', null, nome), el('strong', null, valor), el('span', null, nota));
        return cartao;
      })
    );

    // Reaproveita as barras para a altura animar de um período para o outro.
    if (barras.children.length !== dados.dias.length) {
      barras.replaceChildren(
        ...dados.dias.map(() => {
          const barra = el('button', 'barra');
          barra.type = 'button';
          barra.append(el('span', 'barra-valor'), el('span', 'barra-cheia'), el('span', 'barra-dia'));
          return barra;
        })
      );
    }
    [...barras.children].forEach((barra, i) => {
      const [dia, n] = dados.dias[i];
      barra.style.setProperty('--altura', `${Math.round((n / maior) * 100)}%`);
      barra.querySelector('.barra-valor').textContent = String(n);
      barra.querySelector('.barra-dia').textContent = dia;
      barra.setAttribute('aria-label', `${DIAS[dia]}: ${n} atendimentos`);
      barra.setAttribute('aria-pressed', String(n === maior));
      barra.onclick = () => escolherDia(dados, i);
    });
    escolherDia(dados, dados.dias.findIndex(([, n]) => n === maior));

    dicas.replaceChildren(
      ...dados.dicas.map((texto) => {
        const item = el('li');
        item.append(icone('info'), el('span', null, texto));
        return item;
      })
    );
  }

  function escolherDia(dados, indice) {
    const [dia, n] = dados.dias[indice];
    const total = dados.dias.reduce((soma, [, v]) => soma + v, 0);
    const maior = Math.max(...dados.dias.map(([, v]) => v));
    [...barras.children].forEach((barra, i) => barra.setAttribute('aria-pressed', String(i === indice)));
    detalhe.replaceChildren(
      el('strong', null, DIAS[dia]),
      el('span', null, `${n} atendimentos, ${Math.round((n / total) * 100)}% do total${n === maior ? '. É o dia mais cheio.' : '.'}`)
    );
  }

  segmentos(caixa.querySelector('[data-relatorio-periodo]'), mostrar);
  mostrar('atual');
}
