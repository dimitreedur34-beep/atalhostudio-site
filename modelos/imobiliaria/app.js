import { iniciarModelo, mostrarWhats, el, ic } from '../kit.js';

const NEGOCIO = 'Morada Imóveis';

// [código, título, tipo, modo, bairro, quartos, banheiros, vagas, m², preço, foto, descrição da foto]
const IMOVEIS = [
  [101, 'Casa 3 quartos com quintal', 'casa', 'venda', 'Vila Bretas', 3, 2, 2, 140, 480000, 'casa-quintal', 'Casa moderna com gramado e caminho de pedra'],
  [102, 'Casa 2 quartos com varanda', 'casa', 'aluguel', 'São Pedro', 2, 1, 1, 90, 1800, 'casa-madeira', 'Casa de dois andares com cerca viva'],
  [103, 'Sobrado moderno, 4 quartos', 'casa', 'venda', 'Grã-Duquesa', 4, 3, 2, 220, 890000, 'sobrado', 'Fachada clara de sobrado com janelas grandes'],
  [104, 'Apartamento 2 quartos, sala ampla', 'apartamento', 'aluguel', 'Centro', 2, 1, 1, 68, 1500, 'apto-sala', 'Sala clara com sofá branco e cortinas'],
  [105, 'Apartamento 3 quartos, cozinha planejada', 'apartamento', 'venda', 'Centro', 3, 2, 1, 95, 420000, 'apto-cozinha', 'Cozinha planejada em madeira clara'],
  [106, 'Studio mobiliado perto do centro', 'studio', 'aluguel', 'Centro', 1, 1, 0, 32, 1100, 'studio', 'Quarto com cama de casal e parede verde']
];

const DUVIDAS = [
  ['Precisa de fiador para alugar?', 'Aqui a imobiliária explica as garantias que aceita, como fiador, seguro-fiança ou caução.'],
  ['Vocês ajudam com financiamento?', 'Explicamos o caminho e indicamos o correspondente bancário. A aprovação é sempre do banco.'],
  ['Posso visitar no sábado?', 'Sim, aos sábados das 9h às 13h, com hora marcada pelo WhatsApp.'],
  ['Quanto custa anunciar o meu imóvel?', 'Aqui a imobiliária informa a comissão e as condições para vender ou alugar.']
];

const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const favoritos = new Set();
let soFavoritos = false;

const busca = document.querySelector('[data-busca]');
const grade = document.querySelector('[data-imoveis]');
const resultado = document.querySelector('[data-resultado]');
const botaoFavoritos = document.querySelector('[data-so-favoritos]');
const totalFavoritos = document.querySelector('[data-total-favoritos]');

function cartao([codigo, titulo, tipo, modo, bairro, quartos, banheiros, vagas, area, preco, foto, alt]) {
  const item = el('article', 'imovel');

  const capa = el('div', 'imovel-foto');
  const img = el('img');
  img.src = `fotos/${foto}.webp`;
  img.alt = alt;
  img.width = 900;
  img.height = 675;
  img.loading = 'lazy';
  const favorito = el('button', 'favorito');
  favorito.type = 'button';
  favorito.setAttribute('aria-pressed', String(favoritos.has(codigo)));
  favorito.setAttribute('aria-label', `Guardar ${titulo} nos favoritos`);
  favorito.append(ic('heart'));
  favorito.addEventListener('click', () => {
    if (favoritos.has(codigo)) favoritos.delete(codigo);
    else favoritos.add(codigo);
    favorito.setAttribute('aria-pressed', String(favoritos.has(codigo)));
    totalFavoritos.textContent = String(favoritos.size);
    if (soFavoritos) mostrar();
  });
  capa.append(img, el('span', 'etiqueta', modo === 'venda' ? 'Venda' : 'Aluguel'), favorito);

  const corpo = el('div', 'imovel-corpo');
  const local = el('span', 'imovel-bairro');
  local.append(ic('map-pin'), document.createTextNode(bairro));
  const dados = el('div', 'imovel-dados');
  dados.append(
    el('span', null, `${quartos} ${quartos > 1 ? 'quartos' : 'quarto'}`),
    el('span', null, `${banheiros} ${banheiros > 1 ? 'banheiros' : 'banheiro'}`),
    el('span', null, vagas ? `${vagas} ${vagas > 1 ? 'vagas' : 'vaga'}` : 'sem vaga'),
    el('span', null, `${area} m²`)
  );
  const valor = el('p', 'preco', reais.format(preco));
  if (modo === 'aluguel') valor.append(el('small', null, ' por mês'));
  const agendar = el('button', 'botao botao-cheio');
  agendar.type = 'button';
  agendar.append(ic('calendar'), document.createTextNode('Agendar visita'));
  agendar.addEventListener('click', () =>
    mostrarWhats(NEGOCIO, `Oi! Quero agendar uma visita.\nImóvel: cód. ${codigo}, ${titulo}\nBairro: ${bairro}\nPode ser ainda esta semana?`)
  );
  const rodape = el('div', 'imovel-rodape');
  rodape.append(valor, agendar);
  corpo.append(el('small', null, `Cód. ${codigo}`), el('h3', null, titulo), local, dados, rodape);

  item.append(capa, corpo);
  return item;
}

function mostrar() {
  const filtros = new FormData(busca);
  const modo = filtros.get('modo');
  const tipo = filtros.get('tipo');
  const bairro = filtros.get('bairro');
  const quartos = Number(filtros.get('quartos'));

  const lista = IMOVEIS.filter(
    (i) =>
      (modo === 'todos' || i[3] === modo) &&
      (!tipo || i[2] === tipo) &&
      (!bairro || i[4] === bairro) &&
      i[5] >= quartos &&
      (!soFavoritos || favoritos.has(i[0]))
  );

  if (lista.length) {
    grade.replaceChildren(...lista.map(cartao));
  } else {
    const vazio = el('div', 'vazio');
    const chamar = el('a', 'botao botao-linha', 'Pedir para um corretor procurar');
    chamar.href = '#';
    chamar.dataset.whats = 'Oi! Não achei no site um imóvel do jeito que procuro. Pode me ajudar a encontrar?';
    vazio.append(
      el('p', null, soFavoritos ? 'Você ainda não guardou nenhum imóvel com esses filtros.' : 'Nenhum imóvel com esses filtros agora. Um corretor pode procurar para você.'),
      chamar
    );
    grade.replaceChildren(vazio);
  }
  resultado.textContent = `${lista.length} ${lista.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}${soFavoritos ? ' nos favoritos' : ''}`;
}

busca.addEventListener('change', mostrar);
busca.addEventListener('submit', (evento) => {
  evento.preventDefault();
  mostrar();
  document.getElementById('imoveis').scrollIntoView();
});

botaoFavoritos.addEventListener('click', () => {
  soFavoritos = !soFavoritos;
  botaoFavoritos.setAttribute('aria-pressed', String(soFavoritos));
  mostrar();
  document.getElementById('imoveis').scrollIntoView();
});

mostrar();

const duvidas = document.querySelector('[data-duvidas]');
for (const [pergunta, resposta] of DUVIDAS) {
  const item = el('details');
  const resumo = el('summary', null, pergunta);
  resumo.append(ic('chevron-down'));
  item.append(resumo, el('p', null, resposta));
  duvidas.append(item);
}

// Anunciar: a mensagem para a imobiliária se monta enquanto a pessoa preenche.
const anuncie = document.querySelector('[data-anuncie]');
const previa = document.querySelector('[data-previa]');

function mensagemAnuncio() {
  const dados = new FormData(anuncie);
  const nome = String(dados.get('nome') || '').trim();
  return [
    `Oi! ${nome ? `Sou ${nome} e ` : ''}quero ${dados.get('objetivo')} um imóvel.`,
    `Tipo: ${dados.get('tipo')}`,
    `Bairro: ${dados.get('bairro')}`,
    'Podemos combinar uma avaliação?'
  ].join('\n');
}

const atualizarPrevia = () => (previa.textContent = mensagemAnuncio());
anuncie.addEventListener('input', atualizarPrevia);
anuncie.addEventListener('change', atualizarPrevia);
anuncie.addEventListener('submit', (evento) => {
  evento.preventDefault();
  mostrarWhats(NEGOCIO, mensagemAnuncio());
});
atualizarPrevia();

iniciarModelo({ negocio: NEGOCIO });
