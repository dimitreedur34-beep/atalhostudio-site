// Página EUA: o seletor PT | EN | ES troca a página inteira (textos em textos-eua.js, preços em config.js).
// A língua fica no endereço (eua.html?lang=en), para o link já ir na língua certa, e o navegador lembra a escolha.
import { CONFIG } from './config.js';
import { iniciarWhatsApp } from './whatsapp.js';
import { criarCelular, rodarConversa } from './conversa-whats.js';
import { icone } from './icones.js';
import { IDIOMAS, UI, BENEFICIOS, NEGOCIOS_DEMO, MODELOS_EUA, MENU, ROTULOS_WA, areaDemo, t } from './textos-eua.js';
import { iniciarDemoIAEUA } from './ia-eua.js';

const CHAVE = 'atalho_idioma';
const valido = (codigo) => IDIOMAS.some(([id]) => id === codigo);

function el(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto != null) elemento.textContent = texto;
  return elemento;
}

function lerIdioma() {
  const daUrl = new URLSearchParams(location.search).get('lang');
  if (valido(daUrl)) return daUrl;
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (valido(salvo)) return salvo;
  } catch {
    // Sem acesso ao armazenamento: fica no português.
  }
  return 'pt';
}

function botaoWhats(classe, texto, mensagem, posicao) {
  const botao = el('a', `botao ${classe}`);
  botao.href = '#contato';
  botao.dataset.wa = 'geral';
  botao.dataset.waMensagem = mensagem;
  botao.dataset.posicao = posicao;
  botao.append(document.createTextNode(texto));
  return botao;
}

export function iniciar({ atualizarLink }) {
  let lang = lerIdioma();
  const eua = CONFIG.eua;
  const tr = (valor) => t(valor, lang);
  const dolar = (valor) => {
    const numero = valor.toLocaleString({ pt: 'pt-BR', en: 'en-US', es: 'es-US' }[lang]);
    return lang === 'en' ? `$${numero}` : `US$ ${numero}`;
  };

  /* ---------- Seletor de idioma ---------- */
  const seletor = document.querySelector('[data-idiomas]');
  const botoesIdioma = IDIOMAS.map(([id, rotulo, codigo, nome]) => {
    const botao = el('button', null, rotulo);
    botao.type = 'button';
    botao.lang = codigo;
    botao.dataset.valor = id;
    botao.setAttribute('aria-label', nome);
    botao.addEventListener('click', () => mudar(id));
    return botao;
  });
  seletor.replaceChildren(...botoesIdioma);

  /* ---------- Demonstração por botões ---------- */
  const celular = criarCelular(document.querySelector('[data-whats="eua"]'));
  const gradeNegocios = document.querySelector('[data-demo-negocios]');
  const nota = document.querySelector('[data-nota]');
  const notaTitulo = document.querySelector('[data-nota-titulo]');
  const quero = document.querySelector('[data-quero-whats]');
  let negocioAtual = 'faxina';

  function mostrarNegocios() {
    gradeNegocios.setAttribute('aria-label', tr(UI.demoNegocio));
    gradeNegocios.replaceChildren(
      ...Object.entries(NEGOCIOS_DEMO).map(([id, negocio]) => {
        const botao = el('button', 'area');
        botao.type = 'button';
        botao.setAttribute('aria-pressed', String(id === negocioAtual));
        botao.append(icone(negocio.icone), el('strong', null, tr(negocio.rotulo)), el('small', null, negocio.negocio));
        botao.addEventListener('click', () => escolher(id));
        return botao;
      })
    );
  }

  function escolher(id) {
    negocioAtual = id;
    mostrarNegocios();
    const negocio = NEGOCIOS_DEMO[id];
    notaTitulo.textContent = negocio.negocio;
    nota.textContent = tr(UI.demoNota);
    quero.dataset.waMensagem = tr(UI.demoWhatsMensagem(tr(negocio.rotulo)));
    atualizarLink(quero);
    celular.traduzir(ROTULOS_WA[lang]);
    rodarConversa(celular, areaDemo(id, lang), { aoPasso: (texto) => (nota.textContent = texto) });
  }

  /* ---------- Listas que mudam com a língua ---------- */
  function montarListas() {
    document.querySelector('[data-lista="beneficios"]').replaceChildren(
      ...BENEFICIOS.map(([nomeIcone, titulo, texto]) => {
        const item = el('li');
        item.append(icone(nomeIcone), el('h3', null, tr(titulo)), el('p', null, tr(texto)));
        return item;
      })
    );

    document.querySelector('[data-lista="modelos"]').replaceChildren(
      ...MODELOS_EUA.map((modelo) => {
        const endereco = (codigo) => `modelos/molde/index.html?negocio=${modelo.id}&lang=${codigo}`;
        const item = el('li', 'modelo-eua');
        const abrir = el('a', 'modelo-eua-link');
        abrir.href = endereco(lang);
        abrir.target = '_blank';
        abrir.rel = 'noopener';
        const foto = el('img');
        foto.src = `modelos/molde/fotos/${modelo.id}-capa.webp`;
        foto.alt = '';
        foto.width = 1400;
        foto.height = 933;
        foto.loading = 'lazy';
        const textos = el('span', 'modelo-eua-textos');
        textos.append(el('small', null, tr(modelo.tipo)), el('strong', null, modelo.nome));
        abrir.append(foto, textos);
        const linguas = el('p', 'modelo-eua-linguas');
        linguas.append(document.createTextNode(`${tr(UI.modelosAbrir)}: `));
        for (const [id, rotulo, codigo, nome] of IDIOMAS) {
          const link = el('a', null, rotulo);
          link.href = endereco(id);
          link.target = '_blank';
          link.rel = 'noopener';
          link.lang = codigo;
          link.setAttribute('aria-label', `${modelo.nome}, ${nome}`);
          linguas.append(link);
        }
        item.append(abrir, linguas);
        return item;
      })
    );

    document.querySelector('[data-lista="passos"]').replaceChildren(
      ...UI.passos.map(([titulo, texto]) => {
        const item = el('li');
        item.append(el('h3', null, tr(titulo)), el('p', null, tr(texto)));
        return item;
      })
    );

    document.querySelector('[data-lista="planos"]').replaceChildren(
      ...UI.planos.map((plano) => {
        const [implantacao, mensal] = eua.precos[plano.id];
        const item = el('li', `plano${plano.destaque ? ' plano-destaque' : ''}`);
        if (plano.etiqueta) item.append(el('span', 'plano-etiqueta', tr(plano.etiqueta)));
        const preco = el('p', 'plano-preco', `${tr(UI.aPartir)} `);
        preco.append(el('strong', null, dolar(implantacao)));
        const mensalidade = plano.id === 'site'
          ? `+ ${tr(UI.cuidado)}: ${dolar(mensal)} ${tr(UI.porMes)}`
          : `+ ${dolar(mensal)} ${tr(UI.porMes)}`;
        const lista = el('ul', 'itens-lista');
        lista.setAttribute('role', 'list');
        lista.append(...plano.itens.map((texto) => el('li', null, tr(texto))));
        const botao = botaoWhats(plano.destaque ? 'botao-cobre' : 'botao-contorno', tr(plano.botao), tr(UI.planoMensagem(tr(plano.nome))), 'eua-planos');
        item.append(el('span', 'plano-servico', tr(plano.servico)), el('h3', null, tr(plano.nome)), preco, el('p', 'plano-nota', mensalidade), lista, botao);
        return item;
      })
    );

    const ou = { pt: ' ou ', en: ' or ', es: ' o ' }[lang];
    document.querySelector('[data-precos-nota]').textContent =
      `${tr(UI.desconto(eua.maisDeUm))} ${tr(UI.pagamento(eua.pagamento.join(ou)))}`;

    document.querySelector('[data-lista="faq"]').replaceChildren(
      ...UI.faq.map(([pergunta, respostas]) => {
        const item = el('details', 'pergunta');
        const resposta = el('div', 'resposta');
        resposta.append(...respostas.map((texto) => el('p', null, tr(texto))));
        item.append(el('summary', null, tr(pergunta)), resposta);
        return item;
      })
    );
  }

  /* ---------- Textos soltos, menu e botões de WhatsApp ---------- */
  function aplicarTextos() {
    const [, , codigo] = IDIOMAS.find(([id]) => id === lang);
    document.documentElement.lang = codigo;
    document.title = tr(UI.titulo);
    document.querySelector('meta[name="description"]')?.setAttribute('content', tr(UI.descricao));
    seletor.setAttribute('aria-label', tr(UI.idioma));
    botoesIdioma.forEach((botao) => botao.setAttribute('aria-pressed', String(botao.dataset.valor === lang)));

    for (const elemento of document.querySelectorAll('[data-t]')) elemento.textContent = tr(UI[elemento.dataset.t]);

    for (const link of document.querySelectorAll('.menu a, .menu-celular a:not(.botao), .rodape ul a')) {
      const rotulo = MENU[link.getAttribute('href')];
      if (rotulo) link.textContent = tr(rotulo);
    }
    // Botões com ícone: troca só o texto, sem apagar o ícone.
    const trocarTexto = (botao, texto) => {
      const no = [...botao.childNodes].find((filho) => filho.nodeType === Node.TEXT_NODE && filho.nodeValue.trim());
      if (no) no.nodeValue = texto;
      else botao.append(document.createTextNode(texto));
    };
    for (const botao of document.querySelectorAll('.topo-whats, .menu-celular .botao-whats')) trocarTexto(botao, tr(UI.whats));
    for (const botao of document.querySelectorAll('[data-t-texto]')) trocarTexto(botao, tr(UI[botao.dataset.tTexto]));
    for (const botao of document.querySelectorAll('[data-wa="geral"]:not([data-quero-whats]):not([data-posicao="eua-planos"])')) {
      botao.dataset.waMensagem = tr(UI.finalMensagem);
      atualizarLink(botao);
    }
  }

  function render() {
    aplicarTextos();
    montarListas();
    iniciarWhatsApp();
    escolher(negocioAtual);
  }

  const ia = iniciarDemoIAEUA(lang);

  function mudar(novo) {
    if (novo === lang || !valido(novo)) return;
    lang = novo;
    try {
      localStorage.setItem(CHAVE, lang);
    } catch {
      // Sem acesso ao armazenamento: a escolha vale só nesta visita.
    }
    const url = new URL(location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
    render();
    ia?.mudarIdioma(lang);
  }

  render();
}
