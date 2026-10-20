// Página Sistemas: um painel de demonstração com várias telas que funcionam, uma por tipo de sistema.
import { ALUNOS, AGENDA, ESTOQUE, PEDIDOS, ORDENS, LEADS, LANCAMENTOS } from './dados.js';
import { icone } from './icones.js';
import { iniciarPapeis, iniciarRelatorio } from './controle.js';

function el(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto != null) elemento.textContent = texto;
  return elemento;
}

function botao(classe, texto, acao) {
  const b = el('button', classe, texto);
  b.type = 'button';
  b.addEventListener('click', acao);
  return b;
}

function cartoes(lista) {
  const grupo = el('div', 'pn-cartoes');
  for (const [rotulo, valor] of lista) {
    const cartao = el('div', 'pn-cartao');
    cartao.append(el('span', null, rotulo), el('strong', null, valor));
    grupo.append(cartao);
  }
  return grupo;
}

function titulo(texto, detalhe, acao) {
  const topo = el('div', 'pn-titulo');
  const textos = el('div');
  textos.append(el('h3', null, texto), el('p', null, detalhe));
  topo.append(textos);
  if (acao) topo.append(acao);
  return topo;
}

function avisoWhats(rotulo, mensagem) {
  const aviso = el('div', 'pn-aviso');
  aviso.setAttribute('role', 'status');
  aviso.append(el('span', null, rotulo), el('p', 'wa-msg wa-entrada', mensagem));
  return aviso;
}

// ---------- Mensalidades (academia) ----------
function telaMensalidades(redesenhar) {
  let estado = ALUNOS.map(([nome, plano, status]) => ({ nome, plano, status }));
  let enviado = false;
  const STATUS = {
    pago: ['Pago', 'pn-verde'],
    pendente: ['Pendente', 'pn-laranja'],
    hoje: ['Vence hoje', 'pn-amarelo'],
    enviado: ['Lembrete enviado', 'pn-azul']
  };

  return function desenhar() {
    const pagos = estado.filter((a) => a.status === 'pago').length;
    const abertos = estado.length - pagos;
    const acao = botao(`pn-acao${enviado ? ' pn-secundaria' : ''}`, enviado ? 'Recomeçar' : 'Enviar lembrete aos pendentes', () => {
      if (enviado) {
        estado = ALUNOS.map(([nome, plano, status]) => ({ nome, plano, status }));
        enviado = false;
      } else {
        estado = estado.map((a) => (a.status === 'pago' ? a : { ...a, status: 'enviado' }));
        enviado = true;
      }
      redesenhar('.pn-acao');
    });

    const tabela = el('div', 'pn-tabela');
    for (const aluno of estado) {
      const linha = el('div', 'pn-linha');
      const quem = el('div', null, aluno.nome);
      quem.append(el('small', null, `Plano ${aluno.plano}`));
      const [rotulo, classe] = STATUS[aluno.status];
      linha.append(quem, el('span', `pn-status ${classe}`, rotulo));
      tabela.append(linha);
    }

    const partes = [
      titulo('Mensalidades de outubro', 'Academia Pulso · envie lembrete a quem está pendente', acao),
      cartoes([['Pagos', String(pagos)], ['Em aberto', String(abertos)], ['A receber', `R$ ${abertos * 99}`]]),
      tabela
    ];
    if (enviado) {
      partes.push(
        avisoWhats(
          'Assim o aluno recebe no WhatsApp (simulação):',
          'Oi, Bruno! Sua mensalidade da Academia Pulso está em aberto. O Pix para pagar vai logo abaixo. Qualquer dúvida, é só responder esta mensagem.'
        )
      );
    }
    return partes;
  };
}

// ---------- Agenda (clínica) ----------
function telaAgenda(redesenhar) {
  const confirmados = new Set();
  let ultimo = null;

  return function desenhar() {
    const tabela = el('div', 'pn-tabela');
    AGENDA.forEach(([hora, nome, servico], i) => {
      const linha = el('div', 'pn-linha');
      const quem = el('div', null, `${hora} · ${nome}`);
      quem.append(el('small', null, servico));
      const ok = confirmados.has(i);
      const acao = botao(`pn-status ${ok ? 'pn-verde' : 'pn-amarelo'}`, ok ? 'Confirmado' : 'Pedir confirmação', () => {
        if (ok) confirmados.delete(i);
        else {
          confirmados.add(i);
          ultimo = i;
        }
        redesenhar(`[data-linha="${i}"] button`);
      });
      acao.setAttribute('aria-pressed', String(ok));
      linha.dataset.linha = String(i);
      linha.append(quem, acao);
      tabela.append(linha);
    });

    const partes = [
      titulo('Agenda de amanhã', 'Clínica Sorriso Vivo · toque para pedir confirmação'),
      cartoes([['Consultas', String(AGENDA.length)], ['Confirmadas', String(confirmados.size)], ['Faltam', String(AGENDA.length - confirmados.size)]]),
      tabela
    ];
    if (ultimo !== null && confirmados.has(ultimo)) {
      const [hora, nome] = AGENDA[ultimo];
      partes.push(
        avisoWhats(
          'Lembrete que o paciente recebe no WhatsApp (simulação):',
          `Oi, ${nome.split(' ')[0]}! Sua consulta na Clínica Sorriso Vivo é amanhã às ${hora}. Responda 1 para confirmar ou 2 para remarcar.`
        )
      );
    }
    return partes;
  };
}

// ---------- Estoque (loja) ----------
function telaEstoque(redesenhar) {
  const quantidades = ESTOQUE.map(([, , quantidade]) => quantidade);

  return function desenhar() {
    const tabela = el('div', 'pn-tabela');
    ESTOQUE.forEach(([peca, tamanho], i) => {
      const linha = el('div', 'pn-linha');
      linha.dataset.linha = String(i);
      const quem = el('div', null, peca);
      const quantidade = quantidades[i];
      const situacao = quantidade === 0 ? ['Esgotado', 'pn-laranja'] : quantidade <= 2 ? ['Acabando', 'pn-amarelo'] : ['Em estoque', 'pn-verde'];
      quem.append(el('small', null, `Tamanho ${tamanho} · `), el('span', `pn-status ${situacao[1]}`, situacao[0]));
      quem.querySelector('small').style.display = 'inline';

      const controle = el('div', 'pn-quantidade');
      const menos = botao('', null, () => {
        quantidades[i] = Math.max(0, quantidades[i] - 1);
        redesenhar(`[data-linha="${i}"] .pn-quantidade button:first-child`);
      });
      menos.append(icone('minus'));
      menos.setAttribute('aria-label', `Tirar uma unidade de ${peca}`);
      const mais = botao('', null, () => {
        quantidades[i] += 1;
        redesenhar(`[data-linha="${i}"] .pn-quantidade button:last-child`);
      });
      mais.append(icone('plus'));
      mais.setAttribute('aria-label', `Somar uma unidade de ${peca}`);
      controle.append(menos, el('b', null, String(quantidade)), mais);
      linha.append(quem, controle);
      tabela.append(linha);
    });

    const total = quantidades.reduce((soma, q) => soma + q, 0);
    const acabando = quantidades.filter((q) => q <= 2).length;
    return [
      titulo('Estoque da loja', 'Ateliê Lume · use + e − para simular uma venda'),
      cartoes([['Peças', String(total)], ['Acabando ou esgotadas', String(acabando)], ['Modelos', String(ESTOQUE.length)]]),
      tabela
    ];
  };
}

// ---------- Quadro em colunas (pedidos e funil) ----------
function quadro(etapas, itens, desenharFicha) {
  const colunas = el('div', 'pn-colunas');
  colunas.style.setProperty('--colunas', String(etapas.length));
  etapas.forEach((etapa, i) => {
    const coluna = el('div', 'pn-coluna');
    const lista = itens.filter((item) => item.etapa === i);
    const cabeca = el('h4');
    cabeca.append(el('span', null, etapa), el('span', null, String(lista.length)));
    coluna.append(cabeca, ...lista.map(desenharFicha));
    colunas.append(coluna);
  });
  return colunas;
}

function botaoAvancar(rotulo, acao) {
  const b = botao('', rotulo, acao);
  b.append(icone('arrow-right'));
  return b;
}

// ---------- Pedidos (restaurante) ----------
function telaPedidos(redesenhar) {
  const ETAPAS = ['Novos', 'Em preparo', 'Saiu para entrega'];
  const estado = PEDIDOS.map(([numero, cliente, itens, total, etapa]) => ({ numero, cliente, itens, total, etapa }));
  let aviso = null;

  return function desenhar() {
    const ficha = (pedido) => {
      const cartao = el('div', 'pn-ficha');
      cartao.dataset.ficha = pedido.numero;
      cartao.append(el('strong', null, `${pedido.numero} · ${pedido.cliente}`), el('small', null, `${pedido.itens} · ${pedido.total}`));
      if (pedido.etapa < 2) {
        cartao.append(
          botaoAvancar(pedido.etapa === 0 ? 'Começar preparo' : 'Saiu para entrega', () => {
            pedido.etapa += 1;
            aviso =
              pedido.etapa === 1
                ? `Oi, ${pedido.cliente}! Recebemos seu pedido ${pedido.numero} e ele já está sendo preparado.`
                : `Oi, ${pedido.cliente}! Seu pedido ${pedido.numero} saiu para entrega. Chega em uns 30 minutos.`;
            redesenhar(`[data-ficha="${pedido.numero}"] button`);
          })
        );
      }
      return cartao;
    };
    const partes = [titulo('Pedidos de hoje', 'Cantina da Praça · avance os pedidos de etapa'), quadro(ETAPAS, estado, ficha)];
    if (aviso) partes.push(avisoWhats('O cliente recebe no WhatsApp (simulação):', aviso));
    return partes;
  };
}

// ---------- Ordens de serviço (oficina) ----------
function telaOrdens(redesenhar) {
  const ETAPAS = [['Recebido', 'pn-azul'], ['Em serviço', 'pn-amarelo'], ['Pronto', 'pn-verde']];
  const estado = ORDENS.map(([numero, veiculo, cliente, servico, valor, etapa]) => ({ numero, veiculo, cliente, servico, valor, etapa }));
  let aviso = null;

  return function desenhar() {
    const tabela = el('div', 'pn-tabela');
    for (const ordem of estado) {
      const linha = el('div', 'pn-linha');
      linha.dataset.linha = ordem.numero;
      const quem = el('div', null, `${ordem.numero} · ${ordem.veiculo}`);
      quem.append(el('small', null, `${ordem.cliente} · ${ordem.servico} · ${ordem.valor}`));
      const lado = el('div', 'pn-quantidade');
      const [rotulo, classe] = ETAPAS[ordem.etapa];
      lado.append(el('span', `pn-status ${classe}`, rotulo));
      if (ordem.etapa < 2) {
        const avancar = botao('', null, () => {
          ordem.etapa += 1;
          if (ordem.etapa === 2) {
            aviso = `Oi, ${ordem.cliente}! Seu ${ordem.veiculo} está pronto para retirada. Valor: ${ordem.valor}. Qualquer dúvida, é só responder.`;
          }
          redesenhar(`[data-linha="${ordem.numero}"] button`);
        });
        avancar.setAttribute('aria-label', `Avançar ${ordem.numero} para ${ETAPAS[ordem.etapa + 1][0]}`);
        avancar.append(icone('arrow-right'));
        lado.append(avancar);
      }
      linha.append(quem, lado);
      tabela.append(linha);
    }
    const contar = (i) => String(estado.filter((o) => o.etapa === i).length);
    const partes = [
      titulo('Ordens de serviço', 'Auto Center Exemplo · avance cada carro de etapa'),
      cartoes([['Recebidos', contar(0)], ['Em serviço', contar(1)], ['Prontos', contar(2)]]),
      tabela
    ];
    if (aviso) partes.push(avisoWhats('O cliente recebe no WhatsApp (simulação):', aviso));
    return partes;
  };
}

// ---------- Funil de vendas (imobiliária) ----------
function telaFunil(redesenhar) {
  const ETAPAS = ['Novo contato', 'Visita marcada', 'Proposta', 'Fechado'];
  const estado = LEADS.map(([nome, interesse, etapa]) => ({ nome, interesse, etapa }));

  return function desenhar() {
    const ficha = (lead) => {
      const cartao = el('div', 'pn-ficha');
      cartao.dataset.ficha = lead.nome;
      cartao.append(el('strong', null, lead.nome), el('small', null, lead.interesse));
      if (lead.etapa < 3) {
        cartao.append(
          botaoAvancar('Avançar', () => {
            lead.etapa += 1;
            redesenhar(`[data-ficha="${lead.nome}"] button`);
          })
        );
      }
      return cartao;
    };
    const negociando = estado.filter((l) => l.etapa > 0 && l.etapa < 3).length;
    const fechados = estado.filter((l) => l.etapa === 3).length;
    return [
      titulo('Funil de vendas', 'Morada Imóveis · leve cada cliente até o fechamento'),
      cartoes([['Contatos', String(estado.length)], ['Negociando', String(negociando)], ['Fechados', String(fechados)]]),
      quadro(ETAPAS, estado, ficha)
    ];
  };
}

// ---------- Financeiro ----------
function telaFinanceiro(redesenhar) {
  const reais = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const estado = LANCAMENTOS.map(([tipo, descricao, valor, pago], i) => ({ id: i, tipo, descricao, valor, pago }));

  return function desenhar() {
    const tabela = el('div', 'pn-tabela');
    for (const item of estado) {
      const entrada = item.tipo === 'entrada';
      const linha = el('div', 'pn-linha');
      linha.dataset.linha = String(item.id);
      const quem = el('div', null, item.descricao);
      quem.append(el('small', entrada ? 'pn-valor-positivo' : 'pn-valor-negativo', `${entrada ? '+' : '−'} ${reais(item.valor)}`));
      const lado = item.pago
        ? el('span', 'pn-status pn-verde', entrada ? 'Recebido' : 'Pago')
        : botao('pn-status pn-amarelo', entrada ? 'Marcar como recebido' : 'Marcar como pago', () => {
            item.pago = true;
            redesenhar('.pn-tabela button');
          });
      linha.append(quem, lado);
      tabela.append(linha);
    }
    const somar = (tipo) => estado.filter((i) => i.tipo === tipo && i.pago).reduce((s, i) => s + i.valor, 0);
    const recebido = somar('entrada');
    const pago = somar('saida');
    return [
      titulo('Financeiro de outubro', 'Seu negócio · marque o que já foi pago ou recebido'),
      cartoes([['Recebido', reais(recebido)], ['Pago', reais(pago)], ['Saldo', reais(recebido - pago)]]),
      tabela
    ];
  };
}

export function iniciar() {
  iniciarPapeis();
  iniciarRelatorio();
  const alvo = document.querySelector('[data-painel]');
  if (!alvo) return;

  const menu = el('nav', 'pn-menu');
  menu.setAttribute('aria-label', 'Telas do painel');
  menu.append(el('strong', null, 'Seu painel'));
  const principal = el('div', 'pn-principal');
  principal.setAttribute('aria-live', 'polite');
  const corpo = el('div', 'pn-corpo');
  corpo.append(menu, principal);
  alvo.replaceChildren(corpo);

  let telaAtual;
  // Redesenha a tela e devolve o foco para o botão que a pessoa estava usando.
  function redesenhar(seletorFoco) {
    principal.replaceChildren(...telaAtual());
    if (seletorFoco) principal.querySelector(seletorFoco)?.focus();
  }

  // [id, nome, ícone, para quem, tela]
  const TELAS = [
    ['agenda', 'Agenda online', 'calendar', 'Salões, barbearias, clínicas e estética', telaAgenda(redesenhar)],
    ['mensalidades', 'Mensalidades', 'users', 'Academias, escolas e cursos', telaMensalidades(redesenhar)],
    ['pedidos', 'Pedidos', 'chef-hat', 'Restaurantes, lanchonetes e delivery', telaPedidos(redesenhar)],
    ['estoque', 'Estoque', 'package', 'Lojas, depósitos e distribuidoras', telaEstoque(redesenhar)],
    ['ordens', 'Ordens de serviço', 'wrench', 'Oficinas, assistência técnica e manutenção', telaOrdens(redesenhar)],
    ['funil', 'Funil de vendas', 'trending-up', 'Imobiliárias, lojas de carros e corretores', telaFunil(redesenhar)],
    ['financeiro', 'Financeiro', 'wallet', 'Qualquer negócio: contas a pagar e a receber', telaFinanceiro(redesenhar)]
  ];

  const tiposAlvo = document.querySelector('[data-tipos]');
  const cartoesTipo = [];
  let botoes = [];

  function escolher(id, rolar = false) {
    telaAtual = TELAS.find((item) => item[0] === id)[4];
    [...botoes, ...cartoesTipo].forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tela === id)));
    redesenhar();
    if (rolar) alvo.scrollIntoView({ block: 'start' });
  }

  botoes = TELAS.map(([id, nome, nomeIcone]) => {
    const b = botao('', null, () => escolher(id));
    b.dataset.tela = id;
    b.append(icone(nomeIcone), document.createTextNode(nome));
    return b;
  });
  menu.append(...botoes);

  // Lista de tipos de sistema acima do painel: tocar abre a tela correspondente
  if (tiposAlvo) {
    for (const [id, nome, nomeIcone, quem] of TELAS) {
      const cartao = botao('tipo', null, () => escolher(id, true));
      cartao.dataset.tela = id;
      cartao.append(icone(nomeIcone), el('strong', null, nome), el('small', null, quem));
      cartoesTipo.push(cartao);
    }
    tiposAlvo.replaceChildren(...cartoesTipo);
  }

  escolher(TELAS[0][0]);
}
