// Topo, rodapé e botão do WhatsApp iguais em todas as páginas (um lugar só para mudar o menu).
// Os modelos HTML abaixo são fixos; dados do dono entram depois, por data-config / data-link.
import { iconeHTML } from './icones.js';

const PAGINAS = [
  ['inicio', 'index.html', 'Início'],
  ['sites', 'sites.html', 'Sites'],
  ['whatsapp', 'whatsapp.html', 'WhatsApp'],
  ['sistemas', 'sistemas.html', 'Sistemas'],
  ['planos', 'planos.html', 'Planos e dúvidas'],
  ['eua', 'eua.html', 'EUA']
];

const marca = (versao) => `
  <a class="marca" href="index.html" aria-label="Atalho Studio, início">
    <img src="assets/logo/atalho-simbolo-${versao}.svg" alt="" width="32" height="32">
    <span class="marca-nome" aria-hidden="true">atalho<span>studio</span></span>
  </a>`;

function links(atual) {
  return PAGINAS.map(
    ([id, href, rotulo]) => `<a href="${href}"${id === atual ? ' aria-current="page"' : ''}>${rotulo}</a>`
  ).join('');
}

export function montarLayout() {
  const atual = document.body.dataset.pagina || '';

  const topo = document.querySelector('[data-topo]');
  if (topo) {
    topo.className = 'topo';
    topo.innerHTML = `
      <div class="recipiente topo-linha">
        ${marca('escuro')}
        <nav class="menu" aria-label="Principal">${links(atual)}</nav>
        <a class="botao botao-whats botao-pequeno topo-whats" href="#contato" data-wa="geral" data-posicao="topo">${iconeHTML('whatsapp')}Falar no WhatsApp</a>
        <button class="menu-botao" type="button" aria-expanded="false" aria-controls="menu-celular" aria-label="Abrir menu">${iconeHTML('menu')}</button>
      </div>
      <nav class="menu-celular" id="menu-celular" aria-label="Principal" hidden>
        ${links(atual)}
        <a class="botao botao-whats" href="#contato" data-wa="geral" data-posicao="menu">${iconeHTML('whatsapp')}Falar no WhatsApp</a>
      </nav>`;

    const botao = topo.querySelector('.menu-botao');
    const menu = topo.querySelector('.menu-celular');
    botao.addEventListener('click', () => {
      const abrir = menu.hidden;
      menu.hidden = !abrir;
      botao.setAttribute('aria-expanded', String(abrir));
      botao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
      botao.innerHTML = iconeHTML(abrir ? 'x' : 'menu');
    });
  }

  const rodape = document.querySelector('[data-rodape]');
  if (rodape) {
    rodape.className = 'rodape';
    rodape.id = 'contato';
    rodape.innerHTML = `
      <div class="recipiente">
        <div class="rodape-grade">
          <div class="rodape-marca">
            ${marca('claro')}
            <p>Sites, atendimento automático no WhatsApp e sistemas. Governador Valadares (MG).</p>
          </div>
          <div>
            <h2>Páginas</h2>
            <ul role="list">${PAGINAS.map(([, href, rotulo]) => `<li><a href="${href}">${rotulo}</a></li>`).join('')}</ul>
          </div>
          <div>
            <h2>Contato</h2>
            <ul role="list">
              <li>Fale com <span data-config="marca.primeiroNome"></span></li>
              <li data-opcional="contato.instagram"><a data-link="instagram"></a></li>
              <li><a data-link="email"></a></li>
            </ul>
          </div>
          <div>
            <h2>Onde</h2>
            <p>Governador Valadares, MG. Atendemos a região e projetos online.</p>
          </div>
        </div>
        <div class="rodape-base">
          <p>© <span data-ano>2026</span> Atalho Studio</p>
          <p data-opcional="cnpj">CNPJ <span data-config="cnpj"></span></p>
          <p><a href="privacidade.html">Privacidade</a></p>
        </div>
      </div>`;
  }

  if (!document.querySelector('.whats-flutuante') && document.body.dataset.semFlutuante === undefined) {
    const flutuante = document.createElement('a');
    flutuante.className = 'whats-flutuante';
    flutuante.href = '#contato';
    flutuante.dataset.wa = 'geral';
    flutuante.dataset.posicao = 'flutuante';
    flutuante.setAttribute('aria-label', 'Falar no WhatsApp');
    flutuante.innerHTML = iconeHTML('whatsapp');
    document.body.append(flutuante);
  }
}

// Elementos com .revelar aparecem suavemente quando entram na tela.
export function iniciarRevelar() {
  const itens = document.querySelectorAll('.revelar');
  if (!('IntersectionObserver' in window)) {
    itens.forEach((item) => item.classList.add('visivel'));
    return;
  }
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('visivel');
        observador.unobserve(entrada.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' }
  );
  itens.forEach((item) => observador.observe(item));
}
