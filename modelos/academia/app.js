import { iniciarModelo, mostrarWhats, el, ic } from '../kit.js';

const NEGOCIO = 'Academia Pulso';

// Grade de aulas por dia: [hora, aula, professor]
const GRADE = {
  Seg: [['07:00', 'Funcional', 'Prof. Diego'], ['12:15', 'Abdominal', 'Prof. Carla'], ['18:30', 'Ritmos', 'Prof. Carla'], ['19:30', 'Funcional', 'Prof. Diego']],
  Ter: [['06:30', 'Alongamento', 'Prof. Rita'], ['18:00', 'Funcional', 'Prof. Diego'], ['19:00', 'Alongamento', 'Prof. Rita']],
  Qua: [['07:00', 'Funcional', 'Prof. Diego'], ['12:15', 'Abdominal', 'Prof. Carla'], ['18:30', 'Ritmos', 'Prof. Carla'], ['19:30', 'Funcional', 'Prof. Diego']],
  Qui: [['06:30', 'Alongamento', 'Prof. Rita'], ['18:00', 'Funcional', 'Prof. Diego'], ['19:00', 'Alongamento', 'Prof. Rita']],
  Sex: [['07:00', 'Funcional', 'Prof. Diego'], ['18:30', 'Ritmos', 'Prof. Carla']],
  Sáb: [['09:00', 'Funcional em dupla', 'Prof. Diego'], ['10:00', 'Alongamento', 'Prof. Rita']]
};
const NOMES_DIAS = { Seg: 'segunda', Ter: 'terça', Qua: 'quarta', Qui: 'quinta', Sex: 'sexta', Sáb: 'sábado' };

// [nome, valor mensal no plano mensal, trimestral, anual, itens, destaque]
const PLANOS = [
  ['Livre', [99, 90, 79], ['Musculação à vontade', 'Ficha com professor', 'Avaliação física'], false],
  ['Completo', [139, 125, 109], ['Tudo do Livre', 'Todas as aulas coletivas', 'Revisão de treino todo mês'], true],
  ['Dupla', [239, 215, 189], ['Plano Completo para 2 pessoas', 'Pode ser amigo ou família', 'Um pagamento só'], false]
];
const INDICE = { 1: 0, 3: 1, 12: 2 };
const PERIODO = { 1: 'mensal', 3: 'trimestral', 12: 'anual' };

const DUVIDAS = [
  ['Preciso fazer avaliação física?', 'Ela é feita no primeiro mês, sem custo, para o professor montar a sua ficha.'],
  ['Posso congelar o plano?', 'Nos planos trimestral e anual, sim. Aqui a academia explica por quanto tempo.'],
  ['Tem professor na musculação?', 'Sim, o dia todo, para orientar e corrigir os exercícios.'],
  ['Tem estacionamento?', 'Aqui a academia explica onde estacionar.']
];

const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

// Dias e grade
const dias = document.querySelector('[data-dias]');
const grade = document.querySelector('[data-grade]');
const botoesDias = Object.keys(GRADE).map((dia) => {
  const botao = el('button', null, dia);
  botao.type = 'button';
  botao.setAttribute('role', 'tab');
  botao.setAttribute('aria-label', NOMES_DIAS[dia]);
  botao.addEventListener('click', () => escolherDia(dia));
  return botao;
});
dias.append(...botoesDias);

// Setas do teclado trocam o dia, como em abas
dias.addEventListener('keydown', (evento) => {
  const atual = botoesDias.indexOf(document.activeElement);
  if (atual < 0 || !['ArrowLeft', 'ArrowRight'].includes(evento.key)) return;
  const proximo = botoesDias[(atual + (evento.key === 'ArrowRight' ? 1 : -1) + botoesDias.length) % botoesDias.length];
  proximo.focus();
  proximo.click();
});

function escolherDia(dia) {
  botoesDias.forEach((botao) => {
    const ativo = botao.textContent === dia;
    botao.setAttribute('aria-selected', String(ativo));
    botao.tabIndex = ativo ? 0 : -1;
  });
  grade.setAttribute('aria-label', `Aulas de ${NOMES_DIAS[dia]}`);
  grade.replaceChildren(
    ...GRADE[dia].map(([hora, aula, professor], i) => {
      const linha = el('div', 'aula');
      linha.style.animationDelay = `${i * 0.06}s`;
      const texto = el('div');
      texto.append(el('strong', null, aula), el('span', null, professor));
      const reservar = el('button', null, 'Reservar');
      reservar.type = 'button';
      reservar.setAttribute('aria-label', `Reservar ${aula} às ${hora}`);
      reservar.addEventListener('click', () =>
        mostrarWhats(NEGOCIO, `Oi! Quero reservar uma vaga.\nAula: ${aula}\nDia: ${NOMES_DIAS[dia]}, às ${hora}`)
      );
      linha.append(el('time', null, hora), texto, reservar);
      return linha;
    })
  );
}
const hoje = ['Seg', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][new Date().getDay()];
escolherDia(hoje);

// Planos com troca de período
const caixaPlanos = document.querySelector('[data-planos]');
const botoesPeriodo = document.querySelectorAll('[data-periodo] button');
let meses = 1;

function mostrarPlanos() {
  caixaPlanos.replaceChildren(
    ...PLANOS.map(([nome, valores, itens, destaque]) => {
      const mensal = valores[INDICE[meses]];
      const cartao = el('article', `plano${destaque ? ' destaque' : ''}`);
      if (destaque) cartao.append(el('small', null, 'Recomendado'));
      const valor = el('p', 'valor', reais.format(mensal));
      valor.append(el('span', null, ' por mês'));
      const total = el('p', 'total', meses > 1 ? `${reais.format(mensal * meses)} no plano ${PERIODO[meses]}` : 'Sem fidelidade');
      const lista = el('ul');
      for (const item of itens) {
        const li = el('li');
        li.append(ic('check'), document.createTextNode(item));
        lista.append(li);
      }
      const quero = el('button', `botao ${destaque ? 'botao-escuro' : 'botao-cheio'}`, 'Quero esse plano');
      quero.type = 'button';
      quero.addEventListener('click', () =>
        mostrarWhats(NEGOCIO, `Oi! Quero o plano ${nome} ${PERIODO[meses]} (${reais.format(mensal)} por mês). Como faço a matrícula?`)
      );
      cartao.append(el('h3', null, nome), valor, total, lista, quero);
      return cartao;
    })
  );
}

botoesPeriodo.forEach((botao) =>
  botao.addEventListener('click', () => {
    meses = Number(botao.dataset.meses);
    botoesPeriodo.forEach((b) => b.setAttribute('aria-pressed', String(b === botao)));
    mostrarPlanos();
  })
);
mostrarPlanos();

// Aula experimental
const form = document.querySelector('[data-formulario]');
const previa = document.querySelector('[data-previa]');

function mensagem() {
  const dados = new FormData(form);
  const nome = String(dados.get('nome') || '').trim();
  return [
    `Oi! ${nome ? `Sou ${nome} e ` : ''}quero fazer uma aula experimental.`,
    `Modalidade: ${dados.get('modalidade')}`,
    `Período: ${dados.get('periodo')}`
  ].join('\n');
}

const atualizar = () => (previa.textContent = mensagem());
form.addEventListener('input', atualizar);
form.addEventListener('change', atualizar);
form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  mostrarWhats(NEGOCIO, mensagem());
});
atualizar();

const duvidas = document.querySelector('[data-duvidas]');
for (const [pergunta, resposta] of DUVIDAS) {
  const item = el('details');
  const resumo = el('summary', null, pergunta);
  resumo.append(ic('chevron-down'));
  item.append(resumo, el('p', null, resposta));
  duvidas.append(item);
}

iniciarModelo({ negocio: NEGOCIO });
