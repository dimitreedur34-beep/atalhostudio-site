// Monta um site completo a partir de um negócio de negocios.js. Todo texto entra com textContent.
// Nada é enviado: os botões de WhatsApp só mostram a mensagem pronta (kit.js).
import { iniciarModelo, mostrarWhats, el, ic } from '../kit.js';
import { NEGOCIOS } from './negocios.js';

const pedido = new URLSearchParams(location.search).get('negocio');
const id = Object.hasOwn(NEGOCIOS, pedido) ? pedido : Object.keys(NEGOCIOS)[0]; // só aceita negócios da lista
const n = NEGOCIOS[id];
const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const ehPedido = n.modo === 'pedido';

// Cores e estilo do negócio
const raiz = document.documentElement;
['--cor', '--cor-escura', '--cor-clara'].forEach((nome, i) => raiz.style.setProperty(nome, n.cores[i]));
document.body.classList.add(`layout-${n.layout}`);
if (n.serif) document.body.classList.add('titulo-serif');
if (n.reto) document.body.classList.add('cantos-retos');
if (n.escuro) document.body.classList.add('tom-escuro');
document.title = `${n.nome} | Modelo de demonstração`;

function comIcone(nome, texto, tag = 'span', classe = null) {
  const item = el(tag, classe);
  item.append(ic(nome), document.createTextNode(texto));
  return item;
}

function link(classe, href, texto) {
  const a = el('a', classe, texto);
  a.href = href;
  return a;
}

function foto(tipo, alt, classe) {
  const img = el('img', classe);
  img.src = `fotos/${id}-${tipo}.webp`;
  img.alt = alt;
  img.width = tipo === 'capa' ? 1400 : 900;
  img.height = tipo === 'capa' ? 933 : 700;
  if (tipo !== 'capa') img.loading = 'lazy';
  return img;
}

const main = document.querySelector('[data-conteudo]');

function secao(idSecao, classe, titulo, linha) {
  const bloco = el('section', `secao ${classe}`.trim());
  if (idSecao) bloco.id = idSecao;
  const caixa = el('div', 'caixa');
  if (titulo) {
    const cabeca = el('div', 'titulo revela');
    cabeca.append(el('h2', null, titulo));
    if (linha) cabeca.append(el('p', null, linha));
    caixa.append(cabeca);
  }
  bloco.append(caixa);
  main.append(bloco);
  return caixa;
}

/* ---------- Faixa de aviso e topo ---------- */
document.querySelector('[data-aviso]').append(comIcone('clock', n.horario), comIcone('map-pin', n.endereco));

const nomeLogo = el('span');
nomeLogo.append(el('strong', null, n.curto), el('small', null, n.tipo));
document.querySelector('[data-logo]').append(ic(n.icone), nomeLogo);

const LINKS = [
  ['#servicos', n.servicosTitulo],
  ['#acao', ehPedido ? 'Seu pedido' : n.acao.botao],
  ['#duvidas', 'Dúvidas'],
  ['#contato', 'Contato']
];
for (const menu of document.querySelectorAll('[data-links], [data-menu]')) {
  menu.append(...LINKS.map(([href, texto]) => link(null, href, texto)));
}
document.querySelector('[data-cta-topo]').textContent = n.acao.botao;

/* ---------- Primeira tela ---------- */
const hero = el('section', 'hero');
hero.id = 'inicio';
const heroGrade = el('div', 'caixa hero-grade');
const heroTexto = el('div', 'hero-texto');
const acoesHero = el('div', 'acoes');
acoesHero.append(link('botao botao-cheio', '#acao', n.acao.botao), link('botao botao-linha', '#servicos', `Ver ${n.servicosTitulo.toLowerCase()}`));
const fatos = el('div', 'fatos');
for (const [forte, fraco] of n.fatos) {
  const fato = el('div');
  fato.append(el('strong', null, forte), el('span', null, fraco));
  fatos.append(fato);
}
heroTexto.append(comIcone(n.icone, n.selo, 'small', 'hero-selo'), el('h1', null, n.titulo), el('p', 'hero-linha', n.linha), acoesHero, fatos);

if (n.layout === 'foto') {
  hero.append(foto('capa', n.altCapa, 'hero-fundo'));
  heroGrade.append(heroTexto);
} else {
  const quadro = el('div', 'hero-foto');
  quadro.append(foto('capa', n.altCapa));
  const cartao = el('div', 'hero-cartao');
  cartao.setAttribute('aria-hidden', 'true');
  const textos = el('div');
  textos.append(el('strong', null, 'Peça pelo WhatsApp'), el('span', null, 'a qualquer hora, até de noite'));
  cartao.append(ic('whatsapp'), textos);
  quadro.append(cartao);
  heroGrade.append(heroTexto, quadro);
}
hero.append(heroGrade);
main.append(hero);

/* ---------- Serviços ou cardápio ---------- */
const caixaServicos = secao('servicos', '', n.servicosTitulo, n.servicosLinha);
const gradeServicos = el('div', 'servicos');
const carrinho = new Map(); // nome do item -> quantidade (modo pedido)
let selectServico = null;
let campoNome = null;

for (const [icone, nome, descricao, preco] of n.servicos) {
  const cartao = el('article', 'servico revela');
  const rodape = el('div', 'servico-rodape');

  if (ehPedido) {
    rodape.append(el('span', 'preco', reais.format(preco)));
    const quantidade = el('div', 'quantidade');
    const menos = el('button');
    menos.type = 'button';
    menos.setAttribute('aria-label', `Tirar um ${nome}`);
    menos.append(ic('minus'));
    const valor = el('output', null, '0');
    valor.setAttribute('aria-label', `Quantidade de ${nome}`);
    const mais = el('button');
    mais.type = 'button';
    mais.setAttribute('aria-label', `Pôr mais um ${nome}`);
    mais.append(ic('plus'));
    const mudar = (passo) => {
      const nova = Math.max(0, Math.min(20, (carrinho.get(nome) || 0) + passo));
      if (nova) carrinho.set(nome, nova);
      else carrinho.delete(nome);
      valor.textContent = String(nova);
      cartao.classList.toggle('escolhido', nova > 0);
      atualizar();
    };
    menos.addEventListener('click', () => mudar(-1));
    mais.addEventListener('click', () => mudar(1));
    quantidade.append(menos, valor, mais);
    rodape.append(quantidade);
  } else {
    if (preco) rodape.append(el('span', 'preco', preco));
    const quero = el('button', 'quero', n.modo === 'orcamento' && !preco ? 'Falar sobre isso' : 'Quero esse');
    quero.type = 'button';
    quero.append(ic('arrow-right'));
    quero.addEventListener('click', () => {
      if (selectServico) selectServico.value = nome;
      atualizar();
      document.getElementById('acao').scrollIntoView();
      campoNome.focus({ preventScroll: true });
    });
    rodape.append(quero);
  }

  cartao.append(ic(icone, 'ic servico-ic'), el('h3', null, nome), el('p', null, descricao), rodape);
  gradeServicos.append(cartao);
}
caixaServicos.append(gradeServicos);

/* ---------- Diferenciais ---------- */
const caixaDiferenciais = secao(null, 'secao-clara');
const diferenciais = el('div', 'diferenciais');
for (const [icone, titulo, texto] of n.diferenciais) {
  const item = el('div', 'revela');
  item.append(ic(icone), el('h3', null, titulo), el('p', null, texto));
  diferenciais.append(item);
}
caixaDiferenciais.append(diferenciais);

/* ---------- Pedido de horário, encomenda ou orçamento ---------- */
const caixaAcao = secao('acao', '');
caixaAcao.classList.add('acao-grade');
const ladoForm = el('div');
const cabecaAcao = el('div', 'titulo revela');
cabecaAcao.append(el('h2', null, n.acao.titulo), el('p', null, n.acao.linha));
ladoForm.append(cabecaAcao);

let resumo = null;
if (ehPedido) {
  resumo = el('div', 'resumo');
  resumo.setAttribute('aria-live', 'polite');
  ladoForm.append(resumo);
}

const form = el('form', 'formulario');
form.noValidate = true;

const campoNomeBloco = el('div', 'campo');
const rotuloNome = el('label', null, 'Seu nome');
rotuloNome.htmlFor = 'nome';
campoNome = el('input');
campoNome.id = 'nome';
campoNome.name = 'nome';
campoNome.autocomplete = 'off';
campoNome.placeholder = 'Ex.: Ana';
campoNomeBloco.append(rotuloNome, campoNome);
form.append(campoNomeBloco);

for (const campo of n.acao.campos) {
  const nomeCampo = campo.nome || 'servico';
  if (campo.tipo === 'opcoes') {
    const grupo = el('fieldset', 'campo');
    grupo.append(el('legend', null, campo.rotulo));
    const opcoes = el('div', 'opcoes');
    campo.opcoes.forEach((opcao, i) => {
      const rotulo = el('label');
      const entrada = el('input');
      entrada.type = 'radio';
      entrada.name = nomeCampo;
      entrada.value = opcao;
      entrada.checked = i === 0;
      rotulo.append(entrada, el('span', null, opcao.charAt(0).toUpperCase() + opcao.slice(1)));
      opcoes.append(rotulo);
    });
    grupo.append(opcoes);
    form.append(grupo);
  } else {
    const bloco = el('div', 'campo');
    const rotulo = el('label', null, campo.rotulo);
    rotulo.htmlFor = `campo-${nomeCampo}`;
    const select = el('select');
    select.id = `campo-${nomeCampo}`;
    select.name = nomeCampo;
    const itens = campo.tipo === 'servico' ? n.servicos.map((s) => s[1]) : campo.opcoes;
    for (const item of itens) select.append(el('option', null, item));
    if (campo.tipo === 'servico') selectServico = select;
    bloco.append(rotulo, select);
    form.append(bloco);
  }
}

const enviar = el('button', 'botao botao-cheio');
enviar.type = 'submit';
enviar.append(ic('whatsapp'), document.createTextNode('Enviar pelo WhatsApp'));
const linhaEnviar = el('div');
linhaEnviar.append(enviar);
form.append(linhaEnviar);
ladoForm.append(form);

const previa = el('aside', 'previa');
previa.setAttribute('aria-live', 'polite');
const bolha = el('p', 'bolha');
previa.append(el('p', null, `Mensagem que vai para ${n.curto}`), bolha);
caixaAcao.append(ladoForm, previa);

function totalPedido() {
  let total = 0;
  for (const [nome, qtd] of carrinho) total += n.servicos.find((s) => s[1] === nome)[3] * qtd;
  return total;
}

function mensagem() {
  const dados = new FormData(form);
  const nome = String(dados.get('nome') || '').trim();
  const abertura = nome ? `Sou ${nome} e ${n.acao.abertura}` : n.acao.abertura.charAt(0).toUpperCase() + n.acao.abertura.slice(1);
  const linhas = [`Oi! ${abertura}${ehPedido ? ':' : '.'}`];
  if (ehPedido) {
    for (const [item, qtd] of carrinho) {
      const preco = n.servicos.find((s) => s[1] === item)[3];
      linhas.push(`${qtd}x ${item} (${reais.format(preco * qtd)})`);
    }
    linhas.push(`Total: ${reais.format(totalPedido())}`);
  }
  for (const campo of n.acao.campos) linhas.push(`${campo.rotulo}: ${dados.get(campo.nome || 'servico')}`);
  return linhas.join('\n');
}

function atualizar() {
  if (resumo) {
    if (carrinho.size) {
      const lista = el('ul');
      for (const [item, qtd] of carrinho) lista.append(el('li', null, `${qtd}x ${item}`));
      const total = el('p', 'total');
      total.append(el('span', null, 'Total'), el('strong', null, reais.format(totalPedido())));
      resumo.replaceChildren(lista, total);
    } else {
      resumo.replaceChildren(el('p', 'vazio', `Seu pedido está vazio. Use o + no ${n.servicosTitulo.toLowerCase()} acima.`));
    }
  }
  bolha.textContent = ehPedido && !carrinho.size ? 'Escolha pelo menos um item para montar a mensagem.' : mensagem();
}

form.addEventListener('input', atualizar);
form.addEventListener('change', atualizar);
form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  if (ehPedido && !carrinho.size) {
    document.getElementById('servicos').scrollIntoView();
    return;
  }
  mostrarWhats(n.nome, mensagem());
});

/* ---------- Como funciona ---------- */
const caixaPassos = secao(null, 'secao-clara', n.passosTitulo);
const passos = el('ol', 'passos');
passos.setAttribute('role', 'list');
for (const [titulo, texto] of n.passos) {
  const item = el('li', 'revela');
  item.append(el('h3', null, titulo), el('p', null, texto));
  passos.append(item);
}
caixaPassos.append(passos);

/* ---------- Avaliações (só onde a profissão permite) ---------- */
if (n.avaliacoes) {
  const caixaAvaliacoes = secao(null, '', 'O que dizem');
  const exemplo = el('p', 'exemplo', 'Exemplo: aqui entram as avaliações reais dos seus clientes.');
  const grade = el('div', 'avaliacoes');
  for (const texto of n.avaliacoes) {
    const cartao = el('figure', 'avaliacao revela');
    const estrelas = el('div', 'estrelas');
    estrelas.setAttribute('role', 'img');
    estrelas.setAttribute('aria-label', '5 estrelas');
    for (let i = 0; i < 5; i += 1) estrelas.append(ic('star'));
    cartao.append(estrelas, el('blockquote', null, `“${texto}”`), el('figcaption', null, n.quem));
    grade.append(cartao);
  }
  caixaAvaliacoes.append(grade, exemplo);
}

/* ---------- Dúvidas ---------- */
const caixaDuvidas = secao('duvidas', 'secao-clara', 'Dúvidas');
const duvidas = el('div', 'duvidas');
for (const [pergunta, resposta] of n.duvidas) {
  const item = el('details');
  const resumoPergunta = el('summary', null, pergunta);
  resumoPergunta.append(ic('chevron-down'));
  item.append(resumoPergunta, el('p', null, resposta));
  duvidas.append(item);
}
caixaDuvidas.append(duvidas);

/* ---------- Contato ---------- */
const caixaContato = secao('contato', '');
caixaContato.classList.add('contato');
const dados = el('div', 'contato-dados');
const dado = (icone, titulo, texto) => {
  const linha = el('div');
  const textos = el('p');
  textos.append(el('strong', null, titulo), el('span', null, texto));
  linha.append(ic(icone), textos);
  return linha;
};
const falar = link('botao botao-cheio', '#', 'Falar no WhatsApp');
falar.prepend(ic('whatsapp'));
falar.dataset.whats = n.whats;
dados.append(el('h2', null, 'Onde estamos'), dado('map-pin', 'Endereço', n.endereco), dado('clock', 'Horário', n.horario), dado('phone', 'Telefone', '(33) 0000-0000'));
if (n.nota) dados.append(comIcone('info', n.nota, 'p', 'nota'));
const linhaFalar = el('p');
linhaFalar.append(falar);
dados.append(linhaFalar);
caixaContato.append(dados, foto('apoio', n.altApoio, 'contato-foto'));

/* ---------- Rodapé e botão fixo ---------- */
document.querySelector('[data-rodape-nome]').textContent = `${n.nome} (nome fictício)`;
const fixo = document.querySelector('[data-whats-fixo]');
fixo.dataset.whats = n.whats;
fixo.setAttribute('aria-label', `Falar no WhatsApp de ${n.nome}`);

atualizar();
iniciarModelo({ negocio: n.nome });
