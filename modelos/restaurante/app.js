import { iniciarModelo, mostrarWhats, el, ic } from '../kit.js';

const NEGOCIO = 'Cantina da Praça';
const reais = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const CARDAPIO = {
  'Pratos do dia': [
    ['Frango assado', 'Com batatas, arroz e salada.', 24.9],
    ['Feijoada completa', 'Com couve, farofa e laranja.', 29.9],
    ['Lasanha de legumes', 'Molho branco e queijo gratinado.', 26.9]
  ],
  Marmitas: [
    ['Marmita pequena', 'Arroz, feijão, carne do dia e salada.', 17.9],
    ['Marmita grande', 'Porção maior, com dois acompanhamentos.', 21.9]
  ],
  Bebidas: [
    ['Suco natural', 'Laranja, limão ou maracujá.', 7.0],
    ['Refrigerante lata', '350 ml.', 6.0]
  ],
  Sobremesas: [
    ['Pudim de leite', 'Fatia generosa.', 8.0],
    ['Mousse de chocolate', 'Feito no dia.', 8.0]
  ]
};

const pedido = new Map(); // nome -> { preco, quantidade }
const categorias = document.querySelector('[data-categorias]');
const itens = document.querySelector('[data-itens]');
const lista = document.querySelector('[data-lista]');
const vazio = document.querySelector('[data-vazio]');
const total = document.querySelector('[data-total]');
const contador = document.querySelector('[data-contador]');
const enviar = document.querySelector('[data-enviar]');
const endereco = document.querySelector('[data-endereco]');
let categoriaAtual = Object.keys(CARDAPIO)[0];

function botaoIcone(nome, rotulo, acao, classe) {
  const b = el('button', classe || null);
  b.type = 'button';
  b.setAttribute('aria-label', rotulo);
  b.append(ic(nome));
  b.addEventListener('click', acao);
  return b;
}

function mudar(nome, preco, diferenca) {
  const focoNaLista = itens.contains(document.activeElement);
  const nova = Math.max(0, (pedido.get(nome)?.quantidade || 0) + diferenca);
  if (nova === 0) pedido.delete(nome);
  else pedido.set(nome, { preco, quantidade: nova });
  desenharItens();
  desenharPedido();
  // Mantém o foco no item que a pessoa estava mexendo (teclado)
  if (focoNaLista) itens.querySelector(`[data-nome="${CSS.escape(nome)}"] button:last-of-type`)?.focus();
}

function desenharCategorias() {
  categorias.replaceChildren(
    ...Object.keys(CARDAPIO).map((nome) => {
      const botao = el('button', null, nome);
      botao.type = 'button';
      botao.setAttribute('aria-pressed', String(nome === categoriaAtual));
      botao.addEventListener('click', () => {
        categoriaAtual = nome;
        desenharCategorias();
        desenharItens();
      });
      return botao;
    })
  );
}

function desenharItens() {
  itens.replaceChildren(
    ...CARDAPIO[categoriaAtual].map(([nome, descricao, preco]) => {
      const item = el('article', 'item');
      item.dataset.nome = nome;
      const texto = el('div');
      texto.append(el('h3', null, nome), el('p', null, descricao), el('p', 'preco', reais(preco)));

      const quantidade = pedido.get(nome)?.quantidade || 0;
      const controle = el('div', 'controle');
      if (quantidade === 0) {
        controle.append(botaoIcone('plus', `Adicionar ${nome}`, () => mudar(nome, preco, 1)));
      } else {
        controle.append(
          botaoIcone('minus', `Tirar um ${nome}`, () => mudar(nome, preco, -1)),
          el('b', null, String(quantidade)),
          botaoIcone('plus', `Adicionar mais um ${nome}`, () => mudar(nome, preco, 1), 'cheio')
        );
      }
      item.append(texto, controle);
      return item;
    })
  );
}

function soma() {
  let valor = 0;
  let quantidade = 0;
  for (const item of pedido.values()) {
    valor += item.preco * item.quantidade;
    quantidade += item.quantidade;
  }
  return { valor, quantidade };
}

function desenharPedido() {
  const { valor, quantidade } = soma();
  lista.replaceChildren(
    ...[...pedido.entries()].map(([nome, item]) => {
      const linha = el('li');
      linha.append(el('span', null, `${item.quantidade}× ${nome}`), el('span', null, reais(item.preco * item.quantidade)));
      return linha;
    })
  );
  vazio.hidden = quantidade > 0;
  total.textContent = reais(valor);
  contador.textContent = String(quantidade);
  enviar.disabled = quantidade === 0;
}

const tipoEntrega = () => document.querySelector('input[name="entrega"]:checked').value;

document.querySelectorAll('input[name="entrega"]').forEach((opcao) =>
  opcao.addEventListener('change', () => {
    endereco.hidden = tipoEntrega() !== 'Entrega';
  })
);

document.querySelector('[data-ir-pedido]').addEventListener('click', () => {
  document.getElementById('pedido').scrollIntoView({ block: 'center' });
});

enviar.addEventListener('click', () => {
  const { valor } = soma();
  const linhas = [...pedido.entries()].map(([nome, item]) => `- ${item.quantidade}× ${nome}`);
  const onde = tipoEntrega() === 'Entrega' ? `Entrega em: ${endereco.value.trim() || '(endereço)'}` : 'Vou retirar no balcão';
  mostrarWhats(NEGOCIO, ['Oi! Quero fazer um pedido:', ...linhas, `Total: ${reais(valor)}`, onde].join('\n'));
});

desenharCategorias();
desenharItens();
desenharPedido();
iniciarModelo({ negocio: NEGOCIO });
