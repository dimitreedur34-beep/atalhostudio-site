// Monta um site completo a partir de um negócio de negocios.js. Todo texto entra com textContent.
// Nada é enviado: os botões de WhatsApp só mostram a mensagem pronta (kit.js).
import { iniciarModelo, mostrarWhats, el, ic } from '../kit.js';
import { NEGOCIOS } from './negocios.js';
import { NEGOCIOS_EUA } from './negocios-eua.js';
import { TEXTOS } from './textos-molde.js';

const parametros = new URLSearchParams(location.search);
const pedido = parametros.get('negocio');
const TODOS = { ...NEGOCIOS, ...NEGOCIOS_EUA };
const id = Object.hasOwn(TODOS, pedido) ? pedido : Object.keys(NEGOCIOS)[0]; // só aceita negócios da lista
// Negócios da página EUA têm texto em 3 línguas ({ pt, en, es }); ?lang= escolhe qual. Os do Brasil ficam em português.
const IDIOMAS = ['pt', 'en', 'es'];
const multilingue = Object.hasOwn(NEGOCIOS_EUA, id);
const lang = multilingue && IDIOMAS.includes(parametros.get('lang')) ? parametros.get('lang') : 'pt';
const ehTraducao = (v) => v && typeof v === 'object' && !Array.isArray(v) && 'pt' in v && 'en' in v && 'es' in v;
const traduzir = (v) => {
  if (Array.isArray(v)) return v.map(traduzir);
  if (ehTraducao(v)) return v[lang];
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, traduzir(x)]));
  return v;
};
const n = traduzir(TODOS[id]);
const TX = TEXTOS[lang];
const LOCAL = { pt: 'pt-BR', en: 'en-US', es: 'es-US' }[lang];
const reais = new Intl.NumberFormat(LOCAL, { style: 'currency', currency: n.moeda || 'BRL' });
document.documentElement.lang = LOCAL;
const ehPedido = n.modo === 'pedido';

// Cores e estilo do negócio
const raiz = document.documentElement;
['--cor', '--cor-escura', '--cor-clara'].forEach((nome, i) => raiz.style.setProperty(nome, n.cores[i]));
document.body.classList.add(`layout-${n.layout}`);
if (n.serif) document.body.classList.add('titulo-serif');
if (n.reto) document.body.classList.add('cantos-retos');
if (n.escuro) document.body.classList.add('tom-escuro');
document.title = `${n.nome} | ${TX.tituloPagina}`;

// Fonte dos títulos própria do negócio (Google Fonts): fonte: ['Nome da fonte', 'pesos'].
if (n.fonte) {
  const [familia, pesos = '500;600;700'] = n.fonte;
  for (const [href, cruzado] of [['https://fonts.googleapis.com', false], ['https://fonts.gstatic.com', true]]) {
    const pre = el('link');
    pre.rel = 'preconnect';
    pre.href = href;
    if (cruzado) pre.crossOrigin = '';
    document.head.append(pre);
  }
  const folha = el('link');
  folha.rel = 'stylesheet';
  folha.href = `https://fonts.googleapis.com/css2?family=${familia.replaceAll(' ', '+')}:wght@${pesos}&display=swap`;
  document.head.append(folha);
  document.body.style.setProperty('--fonte-titulo', `'${familia}', ${n.serif ? 'Georgia, serif' : 'system-ui, sans-serif'}`);
}

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
const aviso = document.querySelector('[data-aviso]');
aviso.append(comIcone('clock', n.horario), comIcone('map-pin', n.endereco));
if (multilingue) {
  const idiomas = el('nav', 'idiomas');
  idiomas.setAttribute('aria-label', TX.idiomas);
  for (const codigo of IDIOMAS) {
    const a = link(null, `?negocio=${id}&lang=${codigo}`, codigo.toUpperCase());
    a.lang = codigo;
    if (codigo === lang) a.setAttribute('aria-current', 'true');
    idiomas.append(a);
  }
  aviso.append(idiomas);
}

const nomeLogo = el('span');
nomeLogo.append(el('strong', null, n.curto), el('small', null, n.tipo));
document.querySelector('[data-logo]').append(ic(n.icone), nomeLogo);

const LINKS = [
  ['#servicos', n.servicosTitulo],
  ...(n.sobre ? [['#sobre', TX.sobre]] : []),
  ['#acao', ehPedido ? TX.seuPedido : n.acao.botao],
  ['#duvidas', TX.duvidas],
  ['#contato', TX.contato]
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
acoesHero.append(link('botao botao-cheio', '#acao', n.acao.botao), link('botao botao-linha', '#servicos', `${TX.ver} ${n.servicosTitulo.toLowerCase()}`));
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
  textos.append(el('strong', null, TX.pecaWhats), el('span', null, TX.qualquerHora));
  cartao.append(ic('whatsapp'), textos);
  quadro.append(cartao);
  heroGrade.append(heroTexto, quadro);
}
hero.append(heroGrade);
main.append(hero);

/* ---------- Faixa com os serviços correndo ---------- */
const faixa = el('div', 'faixa');
faixa.setAttribute('aria-hidden', 'true');
const trilho = el('div', 'faixa-trilho');
for (let volta = 0; volta < 2; volta += 1) for (const servico of n.servicos) trilho.append(el('span', null, servico[1]));
faixa.append(trilho);
main.append(faixa);

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
    menos.setAttribute('aria-label', TX.tirar(nome));
    menos.append(ic('minus'));
    const valor = el('output', null, '0');
    valor.setAttribute('aria-label', TX.quantidade(nome));
    const mais = el('button');
    mais.type = 'button';
    mais.setAttribute('aria-label', TX.mais(nome));
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
    const quero = el('button', 'quero', n.modo === 'orcamento' && !preco ? TX.falarSobre : TX.queroEsse);
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

/* ---------- Sobre (foto grande, texto e compromissos) ---------- */
if (n.sobre) {
  const caixaSobre = secao('sobre', 'secao-sobre');
  caixaSobre.classList.add('sobre');
  const quadro = el('figure', 'sobre-foto revela revela-foto');
  quadro.append(foto('apoio', n.altApoio));
  if (n.sobre.assinatura) quadro.append(el('figcaption', null, n.sobre.assinatura));
  const texto = el('div', 'sobre-texto revela');
  const pontos = el('ul', 'sobre-pontos');
  pontos.setAttribute('role', 'list');
  for (const ponto of n.sobre.pontos) pontos.append(comIcone('check', ponto, 'li'));
  texto.append(el('small', 'sobre-selo', n.tipo), el('h2', null, n.sobre.titulo), el('p', null, n.sobre.texto), pontos);
  caixaSobre.append(quadro, texto);
}

/* ---------- Galeria: uma foto grande e duas menores ---------- */
if (n.galeria) {
  const caixaGaleria = secao('galeria', '', TX.porDentro, TX.diaADia);
  const grade = el('div', 'galeria');
  n.galeria.forEach((alt, i) => {
    const quadro = el('figure', 'galeria-item revela revela-foto');
    const img = el('img');
    img.src = `fotos/${id}-galeria-${i + 1}.webp`;
    img.alt = alt;
    img.width = 1100;
    img.height = 733;
    img.loading = 'lazy';
    quadro.append(img);
    grade.append(quadro);
  });
  caixaGaleria.append(grade);
}

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
const rotuloNome = el('label', null, TX.seuNome);
rotuloNome.htmlFor = 'nome';
campoNome = el('input');
campoNome.id = 'nome';
campoNome.name = 'nome';
campoNome.autocomplete = 'off';
campoNome.placeholder = TX.exNome;
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
enviar.append(ic('whatsapp'), document.createTextNode(TX.enviarWhats));
const linhaEnviar = el('div');
linhaEnviar.append(enviar);
form.append(linhaEnviar);
ladoForm.append(form);

const previa = el('aside', 'previa');
previa.setAttribute('aria-live', 'polite');
const bolha = el('p', 'bolha');
previa.append(el('p', null, TX.mensagemPara(n.curto)), bolha);
caixaAcao.append(ladoForm, previa);

function totalPedido() {
  let total = 0;
  for (const [nome, qtd] of carrinho) total += n.servicos.find((s) => s[1] === nome)[3] * qtd;
  return total;
}

function mensagem() {
  const dados = new FormData(form);
  const nome = String(dados.get('nome') || '').trim();
  const abertura = nome ? TX.sou(nome, n.acao.abertura) : n.acao.abertura.charAt(0).toUpperCase() + n.acao.abertura.slice(1);
  const linhas = [`${TX.oi} ${abertura}${ehPedido ? ':' : '.'}`];
  if (ehPedido) {
    for (const [item, qtd] of carrinho) {
      const preco = n.servicos.find((s) => s[1] === item)[3];
      linhas.push(`${qtd}x ${item} (${reais.format(preco * qtd)})`);
    }
    linhas.push(`${TX.total}: ${reais.format(totalPedido())}`);
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
      total.append(el('span', null, TX.total), el('strong', null, reais.format(totalPedido())));
      resumo.replaceChildren(lista, total);
    } else {
      resumo.replaceChildren(el('p', 'vazio', TX.vazio(n.servicosTitulo.toLowerCase())));
    }
  }
  bolha.textContent = ehPedido && !carrinho.size ? TX.escolhaItem : mensagem();
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
  const caixaAvaliacoes = secao(null, '', TX.oQueDizem);
  const exemplo = el('p', 'exemplo', TX.exemploAvaliacoes);
  const grade = el('div', 'avaliacoes');
  for (const texto of n.avaliacoes) {
    const cartao = el('figure', 'avaliacao revela');
    const estrelas = el('div', 'estrelas');
    estrelas.setAttribute('role', 'img');
    estrelas.setAttribute('aria-label', TX.estrelas);
    for (let i = 0; i < 5; i += 1) estrelas.append(ic('star'));
    cartao.append(estrelas, el('blockquote', null, `“${texto}”`), el('figcaption', null, n.quem));
    grade.append(cartao);
  }
  caixaAvaliacoes.append(grade, exemplo);
}

/* ---------- Dúvidas ---------- */
const caixaDuvidas = secao('duvidas', 'secao-clara', TX.duvidas);
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
const falar = link('botao botao-cheio', '#', TX.falarWhats);
falar.prepend(ic('whatsapp'));
falar.dataset.whats = n.whats;
dados.append(el('h2', null, TX.ondeEstamos), dado('map-pin', n.enderecoRotulo || TX.endereco, n.endereco), dado('clock', TX.horario, n.horario), dado('phone', TX.telefone, n.telefone || '(33) 0000-0000'));
if (n.nota) dados.append(comIcone('info', n.nota, 'p', 'nota'));
const linhaFalar = el('p');
linhaFalar.append(falar);
dados.append(linhaFalar);
// Com a seção Sobre, a foto de apoio já apareceu: aqui entra um mapa ilustrativo.
function mapa() {
  const quadro = el('figure', 'mapa revela revela-foto');
  const desenho = el('div', 'mapa-desenho');
  desenho.setAttribute('aria-hidden', 'true');
  desenho.innerHTML = `<svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice">
    <rect width="600" height="420" class="mapa-fundo"/>
    <rect x="352" y="40" width="150" height="110" rx="14" class="mapa-praca"/>
    <path d="M-20 300 C 120 250, 260 330, 420 270 S 620 230, 640 250" class="mapa-rio"/>
    <g class="mapa-ruas">
      <path d="M0 175 H600"/><path d="M0 380 H600"/><path d="M120 0 V420"/><path d="M300 0 V420"/><path d="M530 0 V420"/>
      <path d="M0 70 H330"/><path d="M210 175 V420"/><path d="M420 175 V420"/>
    </g>
    <path d="M-10 420 L260 0" class="mapa-avenida"/>
  </svg>`;
  const pino = el('div', 'mapa-pino');
  pino.append(ic('map-pin'));
  const etiqueta = el('p', 'mapa-etiqueta');
  etiqueta.append(el('strong', null, n.curto), el('span', null, n.endereco));
  desenho.append(pino, etiqueta);
  quadro.append(desenho, el('figcaption', null, TX.mapa));
  return quadro;
}
caixaContato.append(dados, n.sobre ? mapa() : foto('apoio', n.altApoio, 'contato-foto'));

/* ---------- Rodapé e botão fixo ---------- */
document.querySelector('[data-rodape-nome]').textContent = `${n.nome} (${TX.nomeFicticio})`;
const fixo = document.querySelector('[data-whats-fixo]');
fixo.dataset.whats = n.whats;
fixo.setAttribute('aria-label', TX.falarWhatsDe(n.nome));

atualizar();
iniciarModelo({ negocio: n.nome, textos: TX.kit });
