// Profundidade (3D): telas que ficam de pé ao rolar, cartões que inclinam com o mouse e o símbolo que flutua.
// Usa as propriedades individuais rotate/scale/translate, que se somam ao transform do .revelar
// sem brigar com ele. Nada disso roda com "reduzir movimento" ligado.
const parado = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Telas de demonstração: chegam deitadas para trás e ficam de pé quando chegam ao meio da tela.
// Funciona igual no celular e no computador, porque depende só da rolagem.
const TELAS = '.celular, .pn, .video-moldura, .modelo-tela, .modelo-cartao, .controle-painel, .relatorio';

function iniciarTelasEmPe() {
  const telas = [...document.querySelectorAll(TELAS)];
  if (!telas.length) return;
  for (const tela of telas) {
    tela.classList.add('em-3d');
    if (tela.parentElement) tela.parentElement.style.perspective = '1400px';
  }

  const visiveis = new Set();
  let pedido = 0;
  function desenhar() {
    pedido = 0;
    const altura = innerHeight;
    for (const tela of visiveis) {
      const caixa = tela.getBoundingClientRect();
      // 0 quando o topo da tela entra por baixo; 1 quando o meio dela chega a 55% da altura da janela.
      const chegada = (altura - caixa.top) / (altura * 0.45 + caixa.height * 0.5);
      const p = Math.min(1, Math.max(0, chegada));
      const suave = 1 - (1 - p) ** 3;
      tela.style.rotate = `x ${((1 - suave) * 18).toFixed(2)}deg`;
      tela.style.scale = (0.92 + suave * 0.08).toFixed(4);
    }
  }
  const agendar = () => {
    if (!pedido) pedido = requestAnimationFrame(desenhar);
  };

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) visiveis.add(entrada.target);
        else visiveis.delete(entrada.target);
      }
      agendar();
    },
    { rootMargin: '10% 0px 10% 0px' }
  );
  telas.forEach((tela) => observador.observe(tela));
  addEventListener('scroll', agendar, { passive: true });
  addEventListener('resize', agendar);
}

// Cartões que inclinam na direção do mouse (só onde existe mouse).
const CARTOES = '.plano, .modelo, a.servico, .fatos li, .recursos li, .papel';

function iniciarInclinar() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  for (const cartao of document.querySelectorAll(CARTOES)) {
    if (cartao.parentElement) cartao.parentElement.style.perspective = '1200px';
    cartao.classList.add('inclina');
    cartao.addEventListener('pointermove', (evento) => {
      const caixa = cartao.getBoundingClientRect();
      const x = (evento.clientX - caixa.left) / caixa.width - 0.5;
      const y = (evento.clientY - caixa.top) / caixa.height - 0.5;
      const angulo = Math.min(7, Math.hypot(x, y) * 12);
      cartao.style.rotate = `${(-y).toFixed(3)} ${x.toFixed(3)} 0 ${angulo.toFixed(2)}deg`;
      cartao.style.translate = '0 -4px';
    });
    cartao.addEventListener('pointerleave', () => {
      cartao.style.rotate = '';
      cartao.style.translate = '';
    });
  }
}

// Símbolo do topo: flutua devagar e acompanha o mouse, como se estivesse um pouco à frente da página.
function iniciarSimbolo() {
  const simbolo = document.querySelector('.hero-simbolo');
  if (!simbolo) return;
  simbolo.classList.add('flutua');
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  addEventListener(
    'pointermove',
    (evento) => {
      const x = evento.clientX / innerWidth - 0.5;
      const y = evento.clientY / innerHeight - 0.5;
      simbolo.style.rotate = `${(-y).toFixed(3)} ${x.toFixed(3)} 0 ${(Math.hypot(x, y) * 22).toFixed(2)}deg`;
      simbolo.style.translate = `${(x * 14).toFixed(1)}px ${(y * 14).toFixed(1)}px`;
    },
    { passive: true }
  );
}

export function iniciarProfundidade() {
  // O visualizador de modelos (ver.html) fica de fora: lá a tela precisa ficar parada.
  if (parado() || !('IntersectionObserver' in window) || document.body.dataset.pagina === 'ver') return;
  document.documentElement.classList.add('com-3d');
  iniciarTelasEmPe();
  iniciarInclinar();
  iniciarSimbolo();
}
