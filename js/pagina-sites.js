// Página Sites: galeria com uma prévia de cada modelo (site/modelos/<id>/).
// A prévia é uma foto leve em assets/previas/ (gerada por tools/otimizar/previas.js), não o site inteiro.
import { MODELOS, CATEGORIAS } from './dados.js';
import { icone } from './icones.js';

function el(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto != null) elemento.textContent = texto;
  return elemento;
}

function link(classe, href, texto) {
  const a = el('a', classe, texto);
  a.href = href;
  return a;
}


// Filtro por tipo de negócio: só os cartões da categoria escolhida ficam visíveis (e só eles carregam).
function montarFiltro(cartoes) {
  const grupo = el('div', 'filtro-modelos');
  grupo.setAttribute('role', 'group');
  grupo.setAttribute('aria-label', 'Filtrar modelos por tipo de negócio');
  const opcoes = [['todos', 'Todos', 'layout-dashboard'], ...CATEGORIAS];
  const botoes = opcoes.map(([id, rotulo, nomeIcone]) => {
    const total = id === 'todos' ? MODELOS.length : MODELOS.filter((m) => m.categoria === id).length;
    const botao = el('button', 'chip');
    botao.type = 'button';
    botao.setAttribute('aria-pressed', String(id === 'todos'));
    botao.append(icone(nomeIcone), document.createTextNode(rotulo), el('small', 'chip-total', String(total)));
    botao.addEventListener('click', () => {
      botoes.forEach((b) => b.setAttribute('aria-pressed', String(b === botao)));
      for (const cartao of cartoes) {
        const mostra = id === 'todos' || cartao.dataset.categoria === id;
        cartao.hidden = !mostra;
        if (mostra) cartao.classList.add('visivel');
      }
    });
    return botao;
  });
  grupo.append(...botoes);
  return grupo;
}

export function iniciar() {
  const galeria = document.querySelector('[data-galeria]');
  if (!galeria) return;

  const cartoes = MODELOS.map((modelo) => {
    const cartao = el('article', 'modelo revelar');
    cartao.dataset.categoria = modelo.categoria;

    const tela = el('div', 'modelo-tela');
    const previa = el('img');
    previa.src = `assets/previas/${modelo.id}.webp`;
    previa.alt = '';
    previa.width = 800;
    previa.height = 550;
    previa.loading = 'lazy';
    previa.decoding = 'async';
    const abrir = link('', `ver.html?modelo=${modelo.id}`);
    abrir.setAttribute('aria-label', `Abrir o modelo ${modelo.nome}`);
    tela.append(previa, el('span', 'modelo-exemplo', 'Exemplo · preços fictícios'), abrir);

    const corpo = el('div', 'modelo-corpo');
    const area = el('span', 'modelo-area');
    area.append(icone(modelo.icone), document.createTextNode(modelo.area));
    const acoes = el('div', 'acoes');
    const quero = link('link-seta', '#contato', 'Quero um assim');
    quero.append(icone('arrow-right'));
    acoes.append(link('botao botao-escuro botao-pequeno', `ver.html?modelo=${modelo.id}`, 'Abrir e mexer'), quero);
    quero.dataset.wa = 'geral';
    quero.dataset.waMensagem = `Oi! Vi o modelo de site "${modelo.nome}" (${modelo.area.toLowerCase()}) no site da Atalho Studio e quero um parecido para o meu negócio.`;
    quero.dataset.posicao = 'galeria';

    corpo.append(area, el('h3', null, modelo.nome), el('p', null, modelo.descricao), acoes);
    cartao.append(tela, corpo);
    return cartao;
  });

  galeria.prepend(...cartoes);
  galeria.before(montarFiltro(cartoes));
}
