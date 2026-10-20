// Comportamentos comuns dos modelos: selo de demonstração, janela do WhatsApp, menu do celular e animações.
// Nos modelos nada é enviado: o botão de WhatsApp só mostra a mensagem que iria pronta.

function el(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto != null) elemento.textContent = texto;
  return elemento;
}

const NS = 'http://www.w3.org/2000/svg';

// Ícone da biblioteca do site (assets/icones.svg)
export function ic(nome, classe = 'ic') {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', classe);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const uso = document.createElementNS(NS, 'use');
  uso.setAttribute('href', `../../assets/icones.svg#${nome}`);
  svg.append(uso);
  return svg;
}

let janela;

export function mostrarWhats(negocio, mensagem) {
  if (!janela) {
    janela = el('dialog', 'janela-demo');
    janela.setAttribute('aria-labelledby', 'janela-demo-titulo');
    document.body.append(janela);
    janela.addEventListener('click', (evento) => {
      if (evento.target === janela) janela.close();
    });
  }

  const topo = el('div', 'janela-topo');
  const icone = ic('whatsapp');
  const titulo = el('strong', null, `WhatsApp de ${negocio}`);
  titulo.id = 'janela-demo-titulo';
  topo.append(icone, titulo);

  const corpo = el('div', 'janela-corpo');
  corpo.append(
    el('p', null, 'No site de verdade, este botão abre o WhatsApp do negócio já com esta mensagem escrita:'),
    el('p', 'janela-bolha', mensagem),
    el('p', 'janela-nota', 'Isto é uma demonstração: nada foi enviado.')
  );

  const acoes = el('div', 'janela-acoes');
  const fechar = el('button', null, 'Entendi');
  fechar.type = 'button';
  fechar.addEventListener('click', () => janela.close());
  acoes.append(fechar);

  janela.replaceChildren(topo, corpo, acoes);
  janela.showModal();
  fechar.focus();
}

export function iniciarModelo({ negocio }) {
  // Selo fixo de demonstração
  const selo = el('span', 'selo-demo', 'Exemplo · o seu fica do seu jeito');
  document.body.append(selo);

  // Qualquer [data-whats] mostra a mensagem pronta (texto em data-whats)
  document.addEventListener('click', (evento) => {
    const alvo = evento.target.closest('[data-whats]');
    if (!alvo) return;
    evento.preventDefault();
    mostrarWhats(negocio, alvo.dataset.whats);
  });

  // Menu do celular
  const botaoMenu = document.querySelector('[data-menu-botao]');
  const menu = document.querySelector('[data-menu]');
  if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', () => {
      const aberto = menu.classList.toggle('aberto');
      botaoMenu.setAttribute('aria-expanded', String(aberto));
    });
    menu.addEventListener('click', (evento) => {
      if (evento.target.closest('a')) {
        menu.classList.remove('aberto');
        botaoMenu.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Animação ao rolar
  const itens = document.querySelectorAll('.revela');
  if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observador.unobserve(entrada.target);
          }
        }),
      { rootMargin: '0px 0px -5% 0px' }
    );
    itens.forEach((item) => observador.observe(item));
  } else {
    itens.forEach((item) => item.classList.add('visivel'));
  }

  document.querySelectorAll('[data-ano]').forEach((item) => (item.textContent = String(new Date().getFullYear())));
}

export { el };
