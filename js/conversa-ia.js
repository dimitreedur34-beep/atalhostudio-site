// Demonstração "Com IA / Sem IA" da página WhatsApp. É SIMULADA: o visitante escreve, e o atendimento
// reconhece a intenção por palavras-chave, abreviações e erros de uma letra, respondendo só com o que está
// em respostas-ia.js. Quando não reconhece, diz que não sabe e passa para uma pessoa.
// No modo "Sem IA", o que for escrito cai no "não entendi" e aparecem os botões do menu.
import { AREAS } from './dados.js';
import { RESPOSTAS_IA } from './respostas-ia.js';
import { criarCelular } from './conversa-whats.js';
import { icone } from './icones.js';

const ABREVIACOES = {
  vc: 'voce', vcs: 'voces', voceis: 'voces', ce: 'voce', q: 'que', oq: 'o que', pq: 'por que', tb: 'tambem', tbm: 'tambem',
  hj: 'hoje', amn: 'amanha', sab: 'sabado', dom: 'domingo', fds: 'fim de semana', qto: 'quanto', qnto: 'quanto', qt: 'quanto',
  qnt: 'quanto', qdo: 'quando', to: 'estou', tou: 'estou', ta: 'esta', tah: 'esta', eh: 'e', n: 'nao', naum: 'nao',
  mto: 'muito', mt: 'muito', pra: 'para', pro: 'para o', cmg: 'comigo', obg: 'obrigado', brigado: 'obrigado', vlw: 'valeu',
  blz: 'beleza', td: 'tudo', tdb: 'tudo bem', msg: 'mensagem', agr: 'agora', dps: 'depois', aki: 'aqui', kd: 'cade', hrs: 'horas'
};

// Palavras comuns: não passam pela correção de erro de digitação e não contam como assunto novo.
const COMUNS = new Set(`voce voces que qual quais quando quanto quanta quantas quantos como onde para por com sem um uma uns umas
dois duas tres tem tenho temos ter esta estou estao sou ser e o a os as de do da dos das no na nos nas em ao mais menos muito
ja ainda hoje amanha agora aqui ai la isso esse essa este ele ela meu minha seu sua faz fazem fazer pode posso podem queria
quero gostaria saber preciso sim nao bom boa dia tarde noite manha sabado domingo segunda terca quarta quinta sexta semana fim
so tambem mesmo mesma tudo bem ate depois antes sobre aceita aceitam atende atendem dar vai vou ir se ou mas porque entao oi
gente me mim te eu nos favor obrigado cade tipo coisa vez pra comigo aquele aquela outro outra`.split(/\s+/));

const DIAS = ['domingo', 'sabado', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'feriado', 'hoje', 'amanha'];
const NOMES = { sabado: 'sábado', terca: 'terça', amanha: 'amanhã', fds: 'fim de semana', manha: 'manhã' };
const REFERENCIA = / (esse|essa|ele|ela|dele|dela|desse|dessa|mesmo|mesma|tambem|e o|e a|e no|e na) /;
const AFIRMATIVO = /^ (sim|s|quero|quero sim|sim quero|pode|pode ser|claro|isso|ok|bora|beleza|com certeza|uhum|aham) $/;
const NEGOU = /^ (nao|agora nao|deixa|depois)( |$)/;
const QUANTIDADE = { um: 1, uma: 1, 1: 1, dois: 2, duas: 2, 2: 2, tres: 3, 3: 3, 4: 4, 5: 5 };

const dobras = (texto) => texto.replace(/([a-z])\1+/g, '$1');

export function normalizar(texto) {
  const limpo = dobras(texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim());
  return ` ${limpo.split(' ').map((p) => ABREVIACOES[p] ?? p).join(' ')} `;
}

// Prepara as palavras de cada área uma vez (mesma limpeza do texto do cliente).
const preparar = (lista = []) => lista.map((p) => dobras(p.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')));
const PREPARADAS = new Map();
function preparada(area) {
  if (PREPARADAS.has(area)) return PREPARADAS.get(area);
  const intencoes = Object.entries(area.intencoes).map(([id, int]) => ({ id, ...int, chaves: preparar(int.palavras) }));
  const itens = Object.values(area.itens || {}).map((item) => ({ ...item, chaves: preparar(item.palavras), cores: preparar(item.cor) }));
  const vocabulario = [...intencoes.flatMap((i) => i.chaves), ...itens.flatMap((i) => [...i.chaves, ...i.cores])].map((p) => p.trim().split(' ')[0]);
  const pronta = { ...area, intencoes, itens, vocabulario };
  PREPARADAS.set(area, pronta);
  return pronta;
}

function distancia(a, b) {
  const linha = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let anterior = linha[0];
    linha[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const guardado = linha[j];
      linha[j] = Math.min(linha[j] + 1, linha[j - 1] + 1, anterior + (a[i - 1] === b[j - 1] ? 0 : 1));
      anterior = guardado;
    }
  }
  return linha[b.length];
}

// A chave aparece no texto? Vale também com um erro de uma letra ("limpesa", "orario"), em palavras de 5 letras ou mais.
function achou(texto, tokens, chave, protegidas) {
  if (texto.includes(` ${chave}`)) return true;
  const base = chave.trim();
  if (base.includes(' ') || base.length < 5) return false;
  const inteira = chave.endsWith(' ');
  return tokens.some((t) => {
    if (t.length < 4 || COMUNS.has(t) || protegidas?.has(t) || t.length < base.length - 1) return false;
    if (inteira) return distancia(t, base) <= 1;
    return [base.length - 1, base.length, base.length + 1].some((n) => distancia(t.slice(0, n), base) <= 1);
  });
}

const pontuar = (texto, tokens, chaves, protegidas) => chaves.reduce((soma, chave) => soma + (achou(texto, tokens, chave, protegidas) ? (chave.trim().includes(' ') ? 2 : 1) : 0), 0);

function acharItens(area, texto, tokens, memoria, protegidas) {
  const temCor = (item) => item.cores.some((cor) => texto.includes(` ${cor}`));
  const achados = area.itens.filter((item) => item.chaves.some((chave) => achou(texto, tokens, chave, protegidas)));
  if (achados.length) {
    const comCor = achados.filter(temCor);
    return { itens: comCor.length ? comCor : achados, soCor: false };
  }
  // "e o preto?": só a cor, do mesmo tipo de peça da conversa.
  const grupo = memoria.itens?.[0]?.grupo;
  const porCor = area.itens.filter((item) => temCor(item) && (!grupo || item.grupo === grupo));
  return { itens: porCor.length === 1 ? porCor : [], soCor: porCor.length === 1 };
}

function lerDetalhes(textoOriginal, texto, tokens) {
  const semCumprimento = texto.replace(/ (bom dia|boa tarde|boa noite) /g, ' ');
  const palavras = semCumprimento.trim().split(' ');
  const dia = texto.includes(' fim de semana') ? 'fds' : DIAS.find((d) => tokens.includes(d)) || null;
  const periodo = ['manha', 'tarde', 'noite'].find((p) => palavras.includes(p)) || null;
  const semQueijos = tokens.join(' ').replace(/(quatro|4) queijo/g, '').split(' ');
  const quantidade = semQueijos.map((t) => QUANTIDADE[t]).find(Boolean) || null;
  const brutos = textoOriginal.toLowerCase().split(/[^a-z0-9]+/);
  const tamanho = brutos.find((t) => /^(pp|p|m|g|gg|3[4-9]|4[0-8])$/.test(t))?.toUpperCase() || null;
  const sabor = textoOriginal.toLowerCase().match(/(?:pizza|sabor)\s+de\s+([a-zà-ü]+)/);
  const saborDesconhecido = sabor && !COMUNS.has(normalizar(sabor[1]).trim()) ? sabor[1] : null;
  return { dia, periodo, quantidade, tamanho, saborDesconhecido };
}

const comoResposta = (r) => (Array.isArray(r) ? { textos: r } : r);
const cumprimento = (texto) => (texto.includes(' bom dia') ? 'Bom dia!' : texto.includes(' boa tarde') ? 'Boa tarde!' : texto.includes(' boa noite') ? 'Boa noite!' : 'Oi!');

// Com IA: entende o texto e monta a resposta. estado guarda o que a conversa já disse (espera e memória).
export function responderComIA(areaBruta, textoOriginal, estado) {
  const area = preparada(areaBruta);
  const texto = normalizar(textoOriginal);
  const tokens = texto.trim().split(' ').filter(Boolean);
  const c = { texto, primeira: estado.primeira, ...lerDetalhes(textoOriginal, texto, tokens) };
  const esperava = estado.espera;
  const protegidas = new Set(tokens.filter((t) => area.vocabulario.some((v) => v.length >= 3 && t.startsWith(v))));
  const { itens: itensDoTexto, soCor } = acharItens(area, texto, tokens, estado.memoria, protegidas);
  // "e o preto?" depois de "tem no P?": continua falando do mesmo tamanho.
  if (soCor && !c.tamanho) c.tamanho = estado.memoria.tamanho || null;
  if (itensDoTexto.length) c.saborDesconhecido = null;
  c.itens = itensDoTexto;

  const negou = NEGOU.test(texto);
  const pontos = new Map();
  area.intencoes.forEach((int) => {
    let p = pontuar(texto, tokens, int.chaves, protegidas);
    // A peça ou o serviço citado reforça o assunto principal da área ("quanto é a limpeza").
    if (int.id === area.itemIntencao && p >= 1 && itensDoTexto.length) p += 1;
    if (int.soEmContexto && estado.espera !== int.id) p = 0;
    if (estado.espera === int.id && !negou) p += 0.5 + (AFIRMATIVO.test(texto) ? 1 : 0);
    pontos.set(int.id, p);
  });
  const ordem = (a, b) => pontos.get(b.id) - pontos.get(a.id) || area.intencoes.indexOf(a) - area.intencoes.indexOf(b);
  const fortes = area.intencoes.filter((int) => !int.sozinha && pontos.get(int.id) >= 1).sort(ordem);
  // Até dois assuntos na mesma mensagem; o segundo só se estiver bem claro.
  let escolhidas = fortes.slice(0, 1).concat(fortes.slice(1, 2).filter((int) => pontos.get(int.id) >= 2));
  const porId = (id) => area.intencoes.find((int) => int.id === id);
  if (!escolhidas.length && estado.espera && !negou && tokens.length <= 4) escolhidas = [porId(estado.espera)];
  if (!escolhidas.length && (itensDoTexto.length || c.tamanho) && area.itemIntencao) escolhidas = [porId(area.itemIntencao)];
  if (!escolhidas.length) escolhidas = area.intencoes.filter((int) => int.sozinha && pontos.get(int.id) >= 1).sort(ordem).slice(0, 1);
  // Responde na ordem em que o cliente perguntou.
  const posicao = (int) => Math.min(...int.chaves.map((chave) => texto.indexOf(` ${chave}`)).filter((i) => i >= 0), Infinity);
  escolhidas.sort((a, b) => posicao(a) - posicao(b) || area.intencoes.indexOf(a) - area.intencoes.indexOf(b));

  // Memória: "quanto custa?" depois de perguntar do vestido fala do vestido. Só quando não há assunto novo.
  const assuntoNovo = tokens.some((t) => t.length > 2 && !COMUNS.has(t) && !/^\d+$/.test(t) && !area.vocabulario.some((v) => v.length >= 3 && (t.startsWith(v) || v.startsWith(t))));
  const podeLembrar = !itensDoTexto.length && estado.memoria.itens?.length && (!assuntoNovo || REFERENCIA.test(texto) || esperava);

  const partes = [];
  for (const int of escolhidas) {
    const ctx = int.usaMemoria && podeLembrar ? { ...c, itens: estado.memoria.itens, tamanho: c.tamanho || estado.memoria.tamanho } : c;
    const r = int.responder(ctx);
    if (r) partes.push({ int, ctx, ...comoResposta(r) });
  }

  estado.espera = null;
  if (itensDoTexto.length) estado.memoria = { itens: itensDoTexto, tamanho: c.tamanho };
  else if (c.tamanho && estado.memoria.itens) estado.memoria.tamanho = c.tamanho;

  const abertura = estado.primeira && !escolhidas.some((int) => int.id === 'robo') ? [`${cumprimento(texto)} Aqui é o atendimento automático ${area.da} ${area.negocio}.`] : [];
  estado.primeira = false;

  if (!partes.length) {
    return {
      textos: [...abertura, 'Essa eu não sei responder com certeza, e prefiro não chutar.', `Passei sua pergunta para ${area.equipe}, ${area.quando}.`],
      evento: `Conversa passada para ${area.equipe}`,
      nota: 'Não achou a resposta nas informações aprovadas. Em vez de inventar, disse que não sabe e passou para uma pessoa.'
    };
  }

  const pessoa = partes.some((p) => p.pessoa);
  estado.espera = partes.at(-1).espera || null;
  const ctx = partes[0].ctx;
  const detalhes = [
    ctx.dia && (NOMES[ctx.dia] || ctx.dia),
    ctx.periodo && (NOMES[ctx.periodo] || ctx.periodo),
    ...(partes.some((p) => p.int.usaMemoria || p.int.id === area.itemIntencao) ? ctx.itens.slice(0, 2).map((i) => i.nome) : []),
    ctx.tamanho && area.itens.some((i) => i.tamanhos) && `tamanho ${ctx.tamanho}`,
    partes.some((p) => p.int.id === 'cardapio') && ctx.saborDesconhecido
  ].filter(Boolean);
  const entendeu = `Entendeu: ${partes.map((p) => p.int.rotulo).join(' + ')}${detalhes.length ? ` (${detalhes.join(', ')})` : ''}.`;
  const explicacao = partes.find((p) => p.nota)?.nota || (pessoa ? `Passou para ${area.equipe}.` : `Respondeu só com o que ${area.aprovou}.`);
  return {
    textos: [...abertura, ...partes.flatMap((p, i) => (i < partes.length - 1 ? p.textos.filter((t) => !t.endsWith('?')) : p.textos))],
    evento: partes.find((p) => p.evento)?.evento || (pessoa ? `Conversa passada para ${area.equipe}` : null),
    nota: `${entendeu} ${explicacao}`
  };
}

// Sem IA: só entende "oi" e os botões.
export function responderSemIA(areaBruta, textoOriginal, estado) {
  const area = preparada(areaBruta);
  const texto = normalizar(textoOriginal);
  const tokens = texto.trim().split(' ').filter(Boolean);
  const saudacao = area.intencoes.find((int) => int.id === 'saudacao');
  const soCumprimento = pontuar(texto, tokens, saudacao.chaves) >= 1 && tokens.length <= 3;
  const primeira = estado.primeira;
  estado.primeira = false;
  return {
    textos: [soCumprimento || primeira ? `Olá! Aqui é o atendimento automático ${area.da} ${area.negocio}.` : null, soCumprimento ? 'Escolha uma das opções:' : 'Desculpe, não entendi. Escolha uma das opções:'].filter(Boolean),
    menu: true,
    nota: soCumprimento ? 'Sem IA, o atendimento responde com o menu de botões.' : 'Sem IA, o atendimento só entende os botões. O que o cliente escreve cai no "não entendi".'
  };
}

function responderBotao(areaBruta, id) {
  const area = preparada(areaBruta);
  const int = area.intencoes.find((i) => i.id === id);
  const r = comoResposta(int.responder({ texto: ' ', itens: [], primeira: false }) || { textos: [] });
  // Pergunta no fim ("Quer pedir?") sai: no menu, quem pergunta é o botão.
  const textos = r.textos.filter((t, i) => !(i === r.textos.length - 1 && r.textos.length > 1 && t.endsWith('?')));
  const pessoa = Boolean(r.pessoa);
  return {
    textos: pessoa ? textos : [...textos, 'Posso ajudar em mais alguma coisa?'],
    evento: r.evento || (pessoa ? `Conversa passada para ${area.equipe}` : null),
    menu: !pessoa,
    nota: 'Pelo botão funciona. Mas o cliente só chega ao que está no menu, e quem escreve fica sem resposta.'
  };
}

function el(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto != null) elemento.textContent = texto;
  return elemento;
}

export function iniciarDemoIA() {
  const alvo = document.querySelector('[data-whats="ia"]');
  const grupoAreas = document.querySelector('[data-ia-areas]');
  const grupoModo = document.querySelector('[data-ia-modo]');
  const titulo = document.querySelector('[data-ia-titulo]');
  const nota = document.querySelector('[data-ia-nota]');
  if (!alvo || !grupoAreas || !grupoModo || !titulo || !nota) return;

  const celular = criarCelular(alvo, { escrever: true });
  const botoesModo = [...grupoModo.querySelectorAll('button')];
  let areaId = 'clinica';
  let modo = 'com';
  let ultima = '';
  let geracao = 0;
  let estado = null;

  const botoesArea = Object.keys(RESPOSTAS_IA).map((id) => {
    const botao = el('button', 'chip');
    botao.type = 'button';
    botao.dataset.id = id;
    botao.append(icone(AREAS[id].icone), document.createTextNode(AREAS[id].rotulo));
    botao.addEventListener('click', () => {
      if (id === areaId) return;
      areaId = id;
      ultima = '';
      recomecar();
    });
    return botao;
  });
  grupoAreas.replaceChildren(...botoesArea);
  botoesModo.forEach((botao) => botao.addEventListener('click', () => {
    if (botao.dataset.valor === modo) return;
    modo = botao.dataset.valor;
    recomecar();
  }));

  async function falar(resposta, minha) {
    nota.textContent = resposta.nota;
    for (const texto of resposta.textos) {
      await celular.digitar(Math.min(1300, 450 + texto.length * 10));
      if (minha !== geracao) return;
      celular.receber(texto);
    }
    if (resposta.evento) celular.evento(resposta.evento);
    if (resposta.menu) mostrarMenu(minha);
    celular.travar(false);
  }

  function mostrarMenu(minha) {
    celular.botoes(RESPOSTAS_IA[areaId].menu, (rotulo, id) => {
      if (minha !== geracao) return;
      celular.travar(true);
      celular.avancarHora();
      celular.enviar(rotulo);
      falar(responderBotao(RESPOSTAS_IA[areaId], id), minha);
    });
  }

  function mandar(texto) {
    const minha = geracao;
    ultima = texto;
    celular.travar(true);
    celular.avancarHora();
    celular.enviar(texto);
    const area = RESPOSTAS_IA[areaId];
    falar(modo === 'com' ? responderComIA(area, texto, estado) : responderSemIA(area, texto, estado), minha);
  }

  function recomecar() {
    geracao++;
    estado = { primeira: true, espera: null, memoria: {} };
    botoesArea.forEach((botao) => botao.setAttribute('aria-pressed', String(botao.dataset.id === areaId)));
    botoesModo.forEach((botao) => botao.setAttribute('aria-pressed', String(botao.dataset.valor === modo)));
    celular.limpar(AREAS[areaId], 'Demonstração simulada · dados fictícios');
    celular.sugestoes(RESPOSTAS_IA[areaId].exemplos, mandar);
    celular.travar(false);
    celular.preencher(ultima);
    titulo.textContent = modo === 'com' ? 'Com IA' : 'Sem IA';
    nota.textContent = ultima
      ? `Agora ${modo === 'com' ? 'com' : 'sem'} IA. A mesma pergunta já está escrita: toque em enviar.`
      : modo === 'com'
        ? 'Escreva uma pergunta no celular, do jeito que um cliente escreveria, ou toque numa sugestão.'
        : 'Escreva uma pergunta no celular e veja o que um atendimento só com botões responde.';
  }

  celular.aoEscrever(mandar);
  recomecar();
}
