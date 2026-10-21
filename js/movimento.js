// Movimento do site: a cor do fundo acompanha a seção que está no meio da tela, as faixas grafite
// escurecem ao chegar, os números contam até o valor, a faixa de áreas anda e o "antes e depois" se conta sozinho.
// Sem JavaScript tudo aparece parado e com as cores normais de cada seção. O 3D fica em profundidade.js.
import { iniciarProfundidade } from './profundidade.js';

const parado = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const temObservador = 'IntersectionObserver' in window;

function iniciarTons() {
  const secoes = [...document.querySelectorAll('main > section')];
  if (!secoes.length || !temObservador) return;

  const raiz = document.documentElement;
  const fundoPagina = getComputedStyle(document.body).backgroundColor;
  const transparente = (cor) => cor === 'transparent' || cor === 'rgba(0, 0, 0, 0)';
  const tons = new Map();
  const grafites = [];
  for (const secao of secoes) {
    if (secao.classList.contains('secao-grafite')) grafites.push(secao);
    else {
      const cor = getComputedStyle(secao).backgroundColor;
      tons.set(secao, transparente(cor) ? fundoPagina : cor);
    }
  }

  const tema = document.querySelector('meta[name="theme-color"]');
  const aplicar = (cor) => {
    document.body.style.backgroundColor = cor;
    tema?.setAttribute('content', cor);
  };

  // Começa com a cor da seção que já está no meio da tela, sem transição.
  const meio = innerHeight / 2;
  for (const [secao, cor] of tons) {
    const caixa = secao.getBoundingClientRect();
    if (caixa.top <= meio && caixa.bottom >= meio) aplicar(cor);
  }
  for (const secao of grafites) {
    if (secao.getBoundingClientRect().top < innerHeight * 0.9) secao.classList.add('escurecida');
  }
  raiz.classList.add('tons-ativos');
  requestAnimationFrame(() => requestAnimationFrame(() => raiz.classList.add('tons-prontos')));

  const linhaDoMeio = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) if (entrada.isIntersecting) aplicar(tons.get(entrada.target));
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );
  tons.forEach((_, secao) => linhaDoMeio.observe(secao));

  const chegada = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('escurecida');
        chegada.unobserve(entrada.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' }
  );
  grafites.filter((s) => !s.classList.contains('escurecida')).forEach((s) => chegada.observe(s));
}

// "79,5%" conta de 0,0 até 79,5. O leitor de tela lê só o valor final.
function iniciarContadores() {
  const alvos = [...document.querySelectorAll('.numeros-impacto strong')];
  if (!alvos.length || !temObservador || parado()) return;

  const dados = new WeakMap();
  for (const el of alvos) {
    const original = el.textContent.trim();
    const partes = /^(\d+(?:,\d+)?)(.*)$/.exec(original);
    if (!partes) continue;
    const casas = (partes[1].split(',')[1] || '').length;
    const formato = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
    const visivel = document.createElement('span');
    visivel.setAttribute('aria-hidden', 'true');
    visivel.textContent = formato.format(0) + partes[2];
    const leitor = document.createElement('span');
    leitor.className = 'visualmente-oculto';
    leitor.textContent = original;
    el.replaceChildren(visivel, leitor);
    dados.set(el, { alvo: Number(partes[1].replace(',', '.')), formato, sufixo: partes[2], visivel, original });
  }

  const contar = ({ alvo, formato, sufixo, visivel, original }) => {
    const inicio = performance.now();
    const duracao = 1400;
    const passo = (agora) => {
      const t = Math.min(1, (agora - inicio) / duracao);
      const suave = 1 - (1 - t) ** 3;
      visivel.textContent = t < 1 ? formato.format(alvo * suave) + sufixo : original;
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        observador.unobserve(entrada.target);
        contar(dados.get(entrada.target));
      }
    },
    { threshold: 0.6 }
  );
  alvos.filter((el) => dados.has(el)).forEach((el) => observador.observe(el));
}

// A lista é duplicada (escondida do leitor de tela) para a faixa andar sem emenda.
function iniciarFaixa() {
  const trilho = document.querySelector('.faixa-trilho');
  if (!trilho) return;
  const copia = trilho.querySelector('ul').cloneNode(true);
  copia.setAttribute('aria-hidden', 'true');
  trilho.append(copia);
  trilho.classList.add('andando');
}

// Cada lado do "antes e depois" se conta quando boa parte dele está na tela.
function iniciarContraste() {
  const lados = document.querySelectorAll('[data-contraste] .contraste-lado');
  if (!lados.length) return;
  if (!temObservador) {
    lados.forEach((lado) => lado.classList.add('visivel'));
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
    { threshold: 0.3 }
  );
  lados.forEach((lado) => observador.observe(lado));
}

// Etapas numeradas: a linha se preenche e os números ganham cor quando a lista aparece.
function iniciarEtapas() {
  const listas = document.querySelectorAll('[data-etapas]');
  if (!listas.length) return;
  if (!temObservador) {
    listas.forEach((lista) => lista.classList.add('visivel'));
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
    { threshold: 0.3 }
  );
  listas.forEach((lista) => observador.observe(lista));
}

// No celular não há "passar o mouse". O efeito acontece quando o item passa pela faixa do meio da tela.
function iniciarFocoNoToque() {
  if (!temObservador || !matchMedia('(hover: none)').matches) return;
  const itens = document.querySelectorAll(
    'a.servico, .modelo-cartao, .lista-sistemas a, .recursos li, .controle-lista li, .modelo'
  );
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) entrada.target.classList.toggle('em-foco', entrada.isIntersecting);
    },
    { rootMargin: '-38% 0px -38% 0px' }
  );
  itens.forEach((item) => observador.observe(item));
}

// Vídeos de demonstração: tocam sem som quando aparecem na tela e pausam quando saem.
// Não tocam sozinhos com "reduzir movimento" ligado nem no modo de economia de dados.
function iniciarVideos() {
  const videos = document.querySelectorAll('[data-video-auto]');
  if (!videos.length || !temObservador || parado() || navigator.connection?.saveData) return;
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) entrada.target.play().catch(() => {});
        else entrada.target.pause();
      }
    },
    { threshold: 0.5 }
  );
  videos.forEach((video) => observador.observe(video));
}

export function iniciarMovimento() {
  iniciarVideos();
  iniciarTons();
  iniciarContadores();
  iniciarFaixa();
  iniciarContraste();
  iniciarEtapas();
  iniciarFocoNoToque();
  iniciarProfundidade();
}
