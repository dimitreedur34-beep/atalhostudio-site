import { iniciarModelo, mostrarWhats, el, ic } from '../kit.js';

const NEGOCIO = 'Contábil Prisma';

// [id, rótulo, ícone, título, explicação, itens, preço de exemplo]
const CASOS = [
  ['mei', 'Sou MEI', 'smile', 'Para quem é MEI', 'Tudo em dia sem perder tempo, e aviso antes de você passar do limite.', ['Declaração anual do MEI', 'Lembrete do DAS todo mês', 'Ajuda para emitir nota fiscal', 'Aviso quando chegar perto do limite de faturamento'], 'a partir de R$ 89 por mês'],
  ['empresa', 'Tenho empresa', 'briefcase', 'Para empresas do Simples', 'Impostos, folha e relatórios, com alguém que responde quando você pergunta.', ['Impostos e obrigações do mês', 'Folha de pagamento e pró-labore', 'Resumo simples do que entrou e saiu', 'Orientação sobre a reforma tributária'], 'a partir de R$ 390 por mês'],
  ['abrir', 'Quero abrir empresa', 'file-text', 'Para abrir a sua empresa', 'Do tipo de empresa ao CNPJ, sem fila e sem papelada perdida.', ['Escolha do tipo de empresa e dos impostos', 'Registro e CNPJ', 'Alvará e inscrições', 'Primeiro mês de contabilidade junto'], 'a partir de R$ 600, uma vez'],
  ['pessoa', 'Pessoa física', 'users', 'Para você, pessoa física', 'Imposto de Renda feito com cuidado, sem susto depois.', ['Declaração do Imposto de Renda', 'Carnê-leão para quem recebe de pessoa física', 'Revisão de declarações anteriores', 'Lembrete das datas importantes'], 'a partir de R$ 180, uma vez']
];

// Começo da mensagem do WhatsApp para cada caso
const FRASES = {
  mei: 'Sou MEI',
  empresa: 'Tenho uma empresa no Simples',
  abrir: 'Quero abrir uma empresa',
  pessoa: 'Preciso de ajuda com o meu Imposto de Renda'
};

// [dia, mês ou "todo mês", obrigação, para quem]
const PRAZOS = [
  ['5º', 'dia útil', 'Pagamento de salários', 'Empresas com funcionários'],
  ['20', 'todo mês', 'DAS do MEI e do Simples', 'MEI e empresas do Simples'],
  ['20', 'todo mês', 'FGTS', 'Empresas com funcionários'],
  ['31', 'de maio', 'Declaração anual do MEI', 'MEI']
];

const DUVIDAS = [
  ['Atendem empresas de outras cidades?', 'Sim. O atendimento é todo online, pelo WhatsApp e por e-mail.'],
  ['Como mando os documentos?', 'Por foto ou PDF, no WhatsApp do escritório. Fica tudo guardado e organizado por mês.'],
  ['A reforma tributária muda algo para mim?', 'As mudanças começam aos poucos. Na conversa, o escritório explica o que muda para o seu tipo de empresa.'],
  ['Tenho pendências com o contador antigo. E agora?', 'A gente confere o que está pendente e mostra por escrito o que precisa ser resolvido.']
];

// Casos (abas)
const lista = document.querySelector('[data-casos]');
const painel = document.querySelector('[data-caso]');
const botoes = CASOS.map(([id, rotulo, icone]) => {
  const botao = el('button');
  botao.type = 'button';
  botao.setAttribute('role', 'tab');
  botao.id = `aba-${id}`;
  botao.append(ic(icone), document.createTextNode(rotulo));
  botao.addEventListener('click', () => escolher(id));
  return botao;
});
lista.append(...botoes);

lista.addEventListener('keydown', (evento) => {
  const atual = botoes.indexOf(document.activeElement);
  if (atual < 0 || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(evento.key)) return;
  evento.preventDefault();
  const passo = ['ArrowDown', 'ArrowRight'].includes(evento.key) ? 1 : -1;
  const proximo = botoes[(atual + passo + botoes.length) % botoes.length];
  proximo.focus();
  proximo.click();
});

function escolher(id) {
  const [, , , titulo, texto, itens, preco] = CASOS.find((c) => c[0] === id);
  botoes.forEach((botao) => {
    const ativo = botao.id === `aba-${id}`;
    botao.setAttribute('aria-selected', String(ativo));
    botao.tabIndex = ativo ? 0 : -1;
  });
  painel.setAttribute('aria-labelledby', `aba-${id}`);

  const caso = el('div', 'caso');
  const ul = el('ul');
  for (const item of itens) {
    const li = el('li');
    li.append(ic('check'), document.createTextNode(item));
    ul.append(li);
  }
  const rodape = el('div', 'caso-rodape');
  const valor = el('div');
  valor.append(el('small', null, 'Valor de exemplo'), el('strong', null, preco));
  const quero = el('button', 'botao botao-cheio');
  quero.type = 'button';
  quero.append(ic('whatsapp'), document.createTextNode('Quero esse serviço'));
  quero.addEventListener('click', () => mostrarWhats(NEGOCIO, `Oi! ${FRASES[id]}. Podem me explicar como funciona o serviço de vocês?`));
  rodape.append(valor, quero);
  caso.append(el('h3', null, titulo), el('p', null, texto), ul, rodape);
  painel.replaceChildren(caso);
}
escolher('mei');

// Prazos com lembrete
const caixaPrazos = document.querySelector('[data-prazos]');
const contagem = document.querySelector('[data-contagem]');
const escolhidos = new Set();

function atualizarContagem() {
  contagem.textContent = escolhidos.size
    ? `${escolhidos.size} ${escolhidos.size === 1 ? 'lembrete escolhido' : 'lembretes escolhidos'}`
    : 'Nenhum lembrete escolhido ainda';
}

for (const [dia, quando, nome, quem] of PRAZOS) {
  const linha = el('div', 'prazo');
  const data = el('div', 'dia');
  data.append(el('strong', null, dia), el('small', null, quando));
  const texto = el('div');
  texto.append(el('h3', null, nome), el('p', null, quem));
  const lembrar = el('button', 'lembrar');
  lembrar.type = 'button';
  lembrar.setAttribute('aria-pressed', 'false');
  lembrar.setAttribute('aria-label', `Lembrar: ${nome}`);
  lembrar.append(ic('bell'), document.createTextNode('Lembrar'));
  lembrar.addEventListener('click', () => {
    if (escolhidos.has(nome)) escolhidos.delete(nome);
    else escolhidos.add(nome);
    lembrar.setAttribute('aria-pressed', String(escolhidos.has(nome)));
    atualizarContagem();
  });
  linha.append(data, texto, lembrar);
  caixaPrazos.append(linha);
}
atualizarContagem();

document.querySelector('[data-pedir-lembretes]').addEventListener('click', () => {
  const itens = escolhidos.size ? [...escolhidos] : PRAZOS.map((p) => p[2]);
  mostrarWhats(NEGOCIO, `Oi! Quero receber lembretes pelo WhatsApp destes prazos:\n${itens.map((i) => `- ${i}`).join('\n')}`);
});

const duvidas = document.querySelector('[data-duvidas]');
for (const [pergunta, resposta] of DUVIDAS) {
  const item = el('details');
  const resumo = el('summary', null, pergunta);
  resumo.append(ic('chevron-down'));
  item.append(resumo, el('p', null, resposta));
  duvidas.append(item);
}

iniciarModelo({ negocio: NEGOCIO });
