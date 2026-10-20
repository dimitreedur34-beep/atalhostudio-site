// Início: o celular conversa sozinho, passando pelas áreas. Ao escolher uma área, a pessoa conversa no lugar do cliente.
import { AREAS } from './dados.js';
import { criarCelular, rodarConversa } from './conversa-whats.js';
import { icone } from './icones.js';
import { iniciarSimulador } from './simulador.js';
import { iniciarDiagnostico } from './diagnostico.js';

function el(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto != null) elemento.textContent = texto;
  return elemento;
}

export function iniciar() {
  iniciarSimulador();
  iniciarDiagnostico();
  const alvo = document.querySelector('[data-whats="hero"]');
  const grupo = document.querySelector('[data-areas-inicio]');
  if (!alvo || !grupo) return;

  const celular = criarCelular(alvo);
  const ids = Object.keys(AREAS).filter((id) => AREAS[id].destaque); // na página inicial, só as áreas em destaque
  const parado = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let indice = 0;
  let escolhidoPelaPessoa = false;
  let espera;

  const botoes = ids.map((id) => {
    const area = AREAS[id];
    const botao = el('button', 'chip');
    botao.type = 'button';
    botao.append(icone(area.icone), document.createTextNode(area.rotulo));
    botao.addEventListener('click', () => {
      escolhidoPelaPessoa = true;
      clearTimeout(espera);
      marcar(id);
      rodarConversa(celular, area);
    });
    return botao;
  });
  grupo.replaceChildren(...botoes);

  function marcar(id) {
    botoes.forEach((botao, i) => botao.setAttribute('aria-pressed', String(ids[i] === id)));
  }

  // Sozinho: mostra uma área, espera e passa para a próxima (para quando a pessoa escolhe uma).
  function proxima() {
    if (escolhidoPelaPessoa) return;
    const id = ids[indice % ids.length];
    indice += 1;
    marcar(id);
    rodarConversa(celular, AREAS[id], {
      automatico: true,
      aoTerminar: () => {
        if (!parado && !escolhidoPelaPessoa) espera = setTimeout(proxima, 4500);
      }
    });
  }

  proxima();
}
