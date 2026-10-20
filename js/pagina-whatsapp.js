// Página WhatsApp: escolha o tipo e a área, converse no celular e veja o que acontece por trás de cada passo.
import { AREAS, CATEGORIAS } from './dados.js';
import { criarCelular, rodarConversa } from './conversa-whats.js';
import { icone } from './icones.js';
import { iniciarFluxo, iniciarControleWhats } from './controle.js';

function el(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto != null) elemento.textContent = texto;
  return elemento;
}

export function iniciar({ atualizarLink }) {
  iniciarFluxo();
  iniciarControleWhats();
  const grade = document.querySelector('[data-areas]');
  const alvo = document.querySelector('[data-whats="pagina"]');
  if (!grade || !alvo) return;

  const celular = criarCelular(alvo);
  const nota = document.querySelector('[data-nota]');
  const titulo = document.querySelector('[data-nota-titulo]');
  const quero = document.querySelector('[data-quero-whats]');
  let areaAtual = null;

  // Primeiro o tipo de negócio (Saúde, Beleza...), depois a área dentro dele.
  const categorias = el('div', 'filtro-modelos filtro-areas');
  categorias.setAttribute('role', 'group');
  categorias.setAttribute('aria-label', 'Tipo de negócio');
  const botoesCategoria = CATEGORIAS.map(([id, rotulo, nomeIcone]) => {
    const botao = el('button', 'chip');
    botao.type = 'button';
    botao.append(icone(nomeIcone), document.createTextNode(rotulo));
    botao.addEventListener('click', () => mostrarCategoria(id, true));
    return botao;
  });
  categorias.append(...botoesCategoria);
  grade.before(categorias);

  function mostrarCategoria(idCategoria, escolherPrimeira) {
    botoesCategoria.forEach((botao, i) => botao.setAttribute('aria-pressed', String(CATEGORIAS[i][0] === idCategoria)));
    const ids = Object.keys(AREAS).filter((id) => AREAS[id].categoria === idCategoria);
    grade.replaceChildren(
      ...ids.map((id) => {
        const area = AREAS[id];
        const botao = el('button', 'area');
        botao.type = 'button';
        botao.dataset.area = id;
        botao.setAttribute('aria-pressed', String(id === areaAtual));
        botao.append(icone(area.icone), el('strong', null, area.rotulo), el('small', null, area.detalhe));
        botao.addEventListener('click', () => escolher(id));
        return botao;
      })
    );
    if (escolherPrimeira && !ids.includes(areaAtual)) escolher(ids[0]);
  }

  function escolher(id) {
    const area = AREAS[id];
    areaAtual = id;
    grade.querySelectorAll('[data-area]').forEach((botao) => botao.setAttribute('aria-pressed', String(botao.dataset.area === id)));
    titulo.textContent = area.negocio;
    nota.textContent = 'Toque em enviar no celular. A mensagem do cliente já está escrita.';
    quero.dataset.waMensagem = `Oi! Testei o atendimento automático para ${area.rotulo.toLowerCase()} no site da Atalho Studio e quero no meu WhatsApp.`;
    atualizarLink(quero);
    rodarConversa(celular, area, { aoPasso: (texto) => (nota.textContent = texto) });
  }

  areaAtual = 'clinica';
  mostrarCategoria(AREAS.clinica.categoria, false);
  escolher('clinica');
}
