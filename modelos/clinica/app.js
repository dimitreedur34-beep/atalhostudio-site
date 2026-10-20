import { iniciarModelo, mostrarWhats, el, ic } from '../kit.js';

const NEGOCIO = 'Clínica Sorriso Vivo';

const TRATAMENTOS = [
  ['droplets', 'Limpeza', 'Remove tártaro e manchas. Leva uns 40 minutos.', 'a partir de R$ 150'],
  ['sun', 'Clareamento', 'Dentes mais brancos em consultório, em 2 sessões.', 'a partir de R$ 600'],
  ['shield-check', 'Implante', 'Repõe o dente que falta, com avaliação antes.', 'sob avaliação'],
  ['smile', 'Ortodontia', 'Aparelho fixo ou alinhador transparente.', 'a partir de R$ 180/mês'],
  ['activity', 'Canal', 'Tratamento com anestesia e acompanhamento.', 'sob avaliação'],
  ['baby', 'Odontopediatria', 'Atendimento para crianças, com calma.', 'a partir de R$ 120']
];

const AVALIACOES = [
  'Fui atendida no horário e saí sabendo exatamente o que ia fazer.',
  'Pedi o horário à noite pelo WhatsApp e de manhã já estava confirmado.',
  'Ótimo atendimento com as crianças.'
];

const DUVIDAS = [
  ['Vocês atendem convênio?', 'Aqui a clínica informa quais convênios aceita.'],
  ['Quanto custa a avaliação?', 'R$ 80, descontados se você fizer o tratamento.'],
  ['Atendem crianças?', 'Sim, com hora marcada e dentista para crianças.'],
  ['Tem estacionamento?', 'Aqui a clínica explica onde estacionar.']
];

const grade = document.querySelector('[data-tratamentos]');
const select = document.querySelector('[data-select-tratamento]');
const form = document.querySelector('[data-formulario]');
const previa = document.querySelector('[data-previa]');

for (const [icone, nome, descricao, preco] of TRATAMENTOS) {
  const item = el('article', 'tratamento');
  const botao = el('button', null, 'Quero esse');
  botao.type = 'button';
  botao.append(ic('arrow-right'));
  botao.addEventListener('click', () => {
    select.value = nome;
    atualizar();
    document.getElementById('horario').scrollIntoView();
    document.getElementById('nome').focus({ preventScroll: true });
  });
  const rodape = el('div', 'rodape-item');
  rodape.append(el('span', 'preco', preco), botao);
  item.append(ic(icone), el('h3', null, nome), el('p', null, descricao), rodape);
  grade.append(item);
  select.append(el('option', null, nome));
}

const avaliacoes = document.querySelector('[data-avaliacoes]');
for (const texto of AVALIACOES) {
  const cartao = el('figure', 'avaliacao');
  const estrelas = el('div', 'estrelas');
  estrelas.setAttribute('role', 'img');
  estrelas.setAttribute('aria-label', '5 estrelas');
  for (let i = 0; i < 5; i += 1) estrelas.append(ic('star'));
  cartao.append(estrelas, el('p', null, `“${texto}”`), el('small', null, 'Paciente de exemplo'));
  avaliacoes.append(cartao);
}

const duvidas = document.querySelector('[data-duvidas]');
for (const [pergunta, resposta] of DUVIDAS) {
  const item = el('details');
  const resumo = el('summary', null, pergunta);
  resumo.append(ic('chevron-down'));
  item.append(resumo, el('p', null, resposta));
  duvidas.append(item);
}

function mensagem() {
  const dados = new FormData(form);
  const nome = String(dados.get('nome') || '').trim();
  return [
    `Oi! ${nome ? `Sou ${nome} e ` : ''}quero pedir um horário.`,
    `Tratamento: ${dados.get('tratamento')}`,
    `Período: ${dados.get('periodo')}`,
    `Dia: ${dados.get('dia')}`
  ].join('\n');
}

function atualizar() {
  previa.textContent = mensagem();
}

form.addEventListener('input', atualizar);
form.addEventListener('change', atualizar);
form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  mostrarWhats(NEGOCIO, mensagem());
});
atualizar();

iniciarModelo({ negocio: NEGOCIO });
