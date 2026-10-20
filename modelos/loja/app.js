import { iniciarModelo, mostrarWhats, el } from '../kit.js';

const NEGOCIO = 'Ateliê Lume';
const CORES = { Azul: '#5E6F86', Preto: '#2B2A28', Oliva: '#6F7152', Rosa: '#C9A9A0', Off: '#F1ECE3', Vinho: '#6B2E2E', Terracota: '#A65E46', Caramelo: '#8A6A4F', Verde: '#3F5A4E' };
const TAMANHOS = ['P', 'M', 'G', 'GG'];

// [tipo, nome, preço, foto, cores, tamanhos esgotados, etiqueta]
const PECAS = [
  ['Vestidos', 'Vestido de alça floral', 189.9, 'vestido-midi.webp', ['Verde', 'Preto'], ['GG'], 'Novo'],
  ['Vestidos', 'Vestido de festa', 259.9, 'vestido-linho.webp', ['Preto'], ['P'], ''],
  ['Vestidos', 'Vestido floral vintage', 229.9, 'vestido-longo.webp', ['Vinho', 'Preto'], [], 'Mais pedido'],
  ['Calças', 'Calça jeans reta', 169.9, 'calca-jeans.webp', ['Azul'], ['G'], ''],
  ['Calças', 'Calça jeans escura', 179.9, 'calca-jeans-2.webp', ['Azul', 'Preto'], [], 'Novo'],
  ['Blusas', 'Camiseta básica', 69.9, 'camisa-linho.webp', ['Vinho', 'Terracota', 'Off'], [], ''],
  ['Blusas', 'Camiseta listrada', 89.9, 'camisa-listrada.webp', ['Preto'], ['P'], ''],
  ['Blusas', 'Suéter de tricô', 149.9, 'sueter.webp', ['Caramelo', 'Off'], [], '']
];

iniciarModelo({ negocio: NEGOCIO });

const reais = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const filtros = document.querySelector('[data-filtros]');
const produtos = document.querySelector('[data-produtos]');
const janela = document.querySelector('[data-janela-peca]');
const contadorReservas = document.querySelector('[data-reservas]');
let filtroAtual = 'Todos';
let pecaAberta = null;
let reservas = 0;

function desenharFiltros() {
  filtros.replaceChildren(
    ...['Todos', 'Vestidos', 'Calças', 'Blusas'].map((nome) => {
      const botao = el('button', null, nome);
      botao.type = 'button';
      botao.setAttribute('aria-pressed', String(nome === filtroAtual));
      botao.addEventListener('click', () => filtrar(nome));
      return botao;
    })
  );
}

function filtrar(nome) {
  filtroAtual = nome;
  desenharFiltros();
  desenharProdutos();
}

function desenharProdutos() {
  const lista = PECAS.filter(([tipo]) => filtroAtual === 'Todos' || tipo === filtroAtual);
  produtos.replaceChildren(
    ...lista.map((peca) => {
      const [, nome, preco, foto, cores, , etiqueta] = peca;
      const botao = el('button', 'produto');
      botao.type = 'button';
      botao.setAttribute('aria-label', `${nome}, ${reais(preco)}. Escolher tamanho e cor`);
      const moldura = el('span', 'moldura');
      const imagem = el('img', 'foto-img');
      imagem.src = `fotos/${foto}`;
      imagem.alt = '';
      imagem.loading = 'lazy';
      moldura.append(imagem);
      if (etiqueta) moldura.append(el('span', 'etiqueta', etiqueta));
      const bolinhas = el('span', 'cores');
      cores.forEach((cor) => {
        const bolinha = el('i');
        bolinha.style.background = CORES[cor];
        bolinhas.append(bolinha);
      });
      botao.append(moldura, el('strong', null, nome), el('span', 'preco', reais(preco)), bolinhas);
      botao.addEventListener('click', () => abrir(peca));
      return botao;
    })
  );
}

function opcao(nome, valor, rotulo, { marcado = false, desativado = false, cor } = {}) {
  const label = el('label');
  const entrada = el('input');
  entrada.type = 'radio';
  entrada.name = nome;
  entrada.value = valor;
  entrada.checked = marcado;
  entrada.disabled = desativado;
  const texto = el('span');
  if (cor) {
    const bolinha = el('i');
    bolinha.style.background = cor;
    texto.append(bolinha);
  }
  texto.append(document.createTextNode(desativado ? `${rotulo} (esgotado)` : rotulo));
  label.append(entrada, texto);
  return label;
}

function abrir(peca) {
  pecaAberta = peca;
  const [, nome, preco, foto, cores, esgotados] = peca;
  const imagem = janela.querySelector('[data-peca-foto]');
  imagem.src = `fotos/${foto}`;
  imagem.alt = nome;
  janela.querySelector('[data-peca-nome]').textContent = nome;
  janela.querySelector('[data-peca-preco]').textContent = reais(preco);
  janela.querySelector('[data-peca-cores]').replaceChildren(
    ...cores.map((cor, i) => opcao('cor', cor, cor === 'Off' ? 'Off-white' : cor, { marcado: i === 0, cor: CORES[cor] }))
  );
  const primeiroLivre = TAMANHOS.find((t) => !esgotados.includes(t));
  janela.querySelector('[data-peca-tamanhos]').replaceChildren(
    ...TAMANHOS.map((t) => opcao('tamanho', t, t, { marcado: t === primeiroLivre, desativado: esgotados.includes(t) }))
  );
  janela.showModal();
}

janela.querySelector('[data-fechar]').addEventListener('click', () => janela.close());
janela.addEventListener('click', (evento) => {
  if (evento.target === janela) janela.close();
});

janela.querySelector('[data-reservar]').addEventListener('click', () => {
  const form = janela.querySelector('[data-peca-form]');
  const dados = new FormData(form);
  const [, nome, preco] = pecaAberta;
  const cor = dados.get('cor') === 'Off' ? 'off-white' : String(dados.get('cor')).toLowerCase();
  janela.close();
  reservas += 1;
  contadorReservas.textContent = String(reservas);
  mostrarWhats(NEGOCIO, `Oi! Quero reservar:\n${nome} (${reais(preco)})\nCor: ${cor}\nTamanho: ${dados.get('tamanho')}`);
});

document.querySelectorAll('[data-ir-filtro]').forEach((link) =>
  link.addEventListener('click', () => filtrar(link.dataset.irFiltro))
);

desenharFiltros();
desenharProdutos();
