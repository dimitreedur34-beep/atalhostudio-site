// Visualizador de modelo: barra da Atalho em cima e o modelo em tela cheia (computador ou celular).
import { MODELOS } from './dados.js';

export function iniciar() {
  const id = new URLSearchParams(location.search).get('modelo');
  const modelo = MODELOS.find((m) => m.id === id); // só aceita modelos da lista
  if (!modelo) {
    location.replace('sites.html');
    return;
  }

  document.title = `${modelo.nome} | Modelo da Atalho Studio`;
  document.querySelector('[data-modelo-nome]').textContent = modelo.nome;
  document.querySelector('[data-modelo-area]').textContent = `Exemplo de ${modelo.area.toLowerCase()} · o seu é feito do seu jeito`;

  const iframe = document.querySelector('[data-quadro]');
  iframe.src = modelo.caminho || `modelos/${modelo.id}/index.html`;
  iframe.title = `Modelo de site ${modelo.nome}`;

  const quero = document.querySelector('[data-quero]');
  quero.dataset.waMensagem = `Oi! Vi o modelo de site "${modelo.nome}" (${modelo.area.toLowerCase()}) no site da Atalho Studio e quero um parecido para o meu negócio.`;

  const palco = document.querySelector('[data-palco]');
  const botoes = document.querySelectorAll('[data-modo]');
  botoes.forEach((botao) =>
    botao.addEventListener('click', () => {
      const celular = botao.dataset.modo === 'celular';
      palco.classList.toggle('no-celular', celular);
      botoes.forEach((b) => b.setAttribute('aria-pressed', String(b === botao)));
    })
  );
}
