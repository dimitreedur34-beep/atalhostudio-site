// Demonstração com IA da página EUA: o cliente escreve em português, inglês ou espanhol e a resposta sai na mesma língua.
// Simulação local (palavras-chave e detecção de idioma): nada é enviado e não há IA de verdade. Texto sempre por textContent.
import { criarCelular } from './conversa-whats.js';
import { NEGOCIOS_DEMO, UI, t } from './textos-eua.js';

const L = (pt, en, es) => ({ pt, en, es });

// Nome de cada língua, escrito na língua da página.
const NOMES = {
  pt: { pt: 'português', en: 'inglês', es: 'espanhol' },
  en: { pt: 'Portuguese', en: 'English', es: 'Spanish' },
  es: { pt: 'portugués', en: 'inglés', es: 'español' }
};

export function normalizar(texto) {
  const limpo = String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return ` ${limpo} `;
}

// Palavras típicas de cada língua (já sem acento). Palavra que existe em duas línguas conta para as duas.
const MARCAS = {
  pt: 'voce voces vc vcs quanto custa fazem faxina trabalham levam trazem produtos obrigado obrigada preco orcamento tem nao sim oi ola bom boa quartos onde qual quero preciso cachorro cachorros fala falam ingles espanhol limpeza com uma um do da meu minha tenho ate aceita aceitam bairro cidade fim semana pra pro ta tbm tb atende atendem banheiros',
  en: 'how much do does you your clean cleaning house home bedroom bedrooms bring supplies saturday saturdays sunday price quote estimate cost hi hello hey thanks thank what where when can is are the a i my have dogs dog cat cats speak english spanish work area serve ok need want for in on of it bathrooms',
  es: 'cuanto cuesta hola gracias limpian limpieza casa cuartos habitaciones traen llevan productos sabado sabados domingo precio presupuesto tienen donde cual quiero necesito perro perros gato gatos habla hablan espanol ingles trabajan zona usted ustedes el la los las y de mi tengo que por para una un si buenos buenas dias esta hay puedo pueden banos sus propios'
};
const CONJUNTOS = Object.fromEntries(Object.entries(MARCAS).map(([lingua, lista]) => [lingua, new Set(lista.split(' '))]));

export function detectarIdioma(original, norm, anterior) {
  const pontos = { pt: 0, en: 0, es: 0 };
  for (const palavra of norm.trim().split(' ')) for (const lingua of Object.keys(pontos)) if (CONJUNTOS[lingua].has(palavra)) pontos[lingua] += 1;
  if (/[¿¡ñ]/i.test(original)) pontos.es += 3;
  if (/[ãõç]|ção/i.test(original)) pontos.pt += 3;
  const melhor = Math.max(...Object.values(pontos));
  if (!melhor) return anterior || 'pt';
  const empatadas = Object.keys(pontos).filter((lingua) => pontos[lingua] === melhor);
  return empatadas.includes(anterior) ? anterior : empatadas[0];
}

// Intenções na ordem de prioridade. Saudação e agradecimento só valem quando nada mais foi entendido.
const INTENCOES = [
  {
    id: 'pessoa',
    palavras: ['falar com', 'atendente', 'pessoa', 'humano', 'person', 'human', 'someone', 'real person', 'call me', 'ligar', 'llamar', 'persona', 'hablar con'],
    resposta: L('Claro! Já avisei a equipe, e uma pessoa responde por aqui.', 'Of course! I let the team know, and a person will reply here.', '¡Claro! Ya avisé al equipo y una persona te responde por aquí.'),
    evento: L('Conversa passada para a equipe', 'Chat handed to the team', 'Conversación pasada al equipo')
  },
  {
    id: 'preco',
    palavras: ['quanto', 'custa', 'preco', 'precos', 'valor', 'orcamento', 'cobram', 'cuanto', 'cuesta', 'precio', 'precios', 'presupuesto', 'cobran', 'how much', 'price', 'prices', 'quote', 'estimate', 'cost', 'rate', 'rates', 'charge']
  },
  {
    id: 'produtos',
    palavras: ['produto', 'produtos', 'material', 'materiais', 'levam', 'trazem', 'supplies', 'supply', 'products', 'product', 'bring', 'equipment', 'vacuum', 'productos', 'producto', 'traen', 'llevan', 'materiales', 'aspiradora', 'aspirador'],
    resposta: L('Levamos todos os produtos e equipamentos, inclusive aspirador. Se você prefere algum produto específico, é só avisar.', 'We bring all supplies and equipment, vacuum included. If you prefer a specific product, just let us know.', 'Llevamos todos los productos y equipos, incluida la aspiradora. Si prefieres algún producto específico, solo avísanos.')
  },
  {
    id: 'horario',
    palavras: ['sabado', 'sabados', 'domingo', 'domingos', 'fim de semana', 'horario', 'horarios', 'saturday', 'saturdays', 'sunday', 'sundays', 'weekend', 'weekends', 'hours', 'open', 'available', 'availability', 'fin de semana', 'disponible', 'trabalham', 'trabajan'],
    resposta: L('Trabalhamos de segunda a sábado, das 8h às 18h. Domingo, só se for combinado antes.', 'We work Monday to Saturday, 8 am to 6 pm. Sundays only if arranged in advance.', 'Trabajamos de lunes a sábado, de 8 a. m. a 6 p. m. Los domingos, solo si se acuerda antes.')
  },
  {
    id: 'regiao',
    palavras: ['onde', 'regiao', 'bairro', 'cidade', 'where', 'area', 'serve', 'cover', 'town', 'donde', 'zona', 'atienden', 'ciudad', 'danbury', 'hartford', 'bridgeport', 'waterbury', 'new haven', 'stamford'],
    resposta: L('Atendemos Danbury e cidades vizinhas. Me diga a sua cidade que eu confirmo com a equipe.', 'We serve Danbury and nearby towns. Tell me your town and I will confirm with the team.', 'Atendemos Danbury y ciudades cercanas. Dime tu ciudad y lo confirmo con el equipo.')
  },
  {
    id: 'animais',
    palavras: ['cachorro', 'cachorros', 'gato', 'gatos', 'pet', 'pets', 'animal', 'animais', 'dog', 'dogs', 'cat', 'cats', 'perro', 'perros', 'mascota', 'mascotas'],
    resposta: L('Sem problema! A equipe está acostumada com animais. Só avise se algum fica solto durante a limpeza.', 'No problem! Our team is used to pets. Just let us know if any will be loose during the cleaning.', '¡No hay problema! El equipo está acostumbrado a las mascotas. Solo avísanos si alguna estará suelta durante la limpieza.')
  },
  {
    id: 'idioma',
    palavras: ['ingles', 'espanhol', 'portugues', 'english', 'spanish', 'portuguese', 'espanol', 'habla', 'hablan', 'speak', 'lingua', 'idioma', 'language'],
    resposta: L('Falamos português, inglês e espanhol. Pode escrever na língua que preferir.', 'We speak English, Spanish and Portuguese. Feel free to write in whichever you prefer.', 'Hablamos español, inglés y portugués. Escribe en el idioma que prefieras.')
  },
  {
    id: 'pagamento',
    palavras: ['pagamento', 'pagar', 'cartao', 'dinheiro', 'zelle', 'venmo', 'cash', 'card', 'pay', 'payment', 'pago', 'tarjeta', 'efectivo'],
    resposta: L('Aceitamos cartão, Zelle e dinheiro. O pagamento é no dia, depois da limpeza.', 'We accept card, Zelle and cash. Payment is on the day, after the cleaning.', 'Aceptamos tarjeta, Zelle y efectivo. El pago es el mismo día, después de la limpieza.')
  },
  {
    id: 'agendar',
    palavras: ['agendar', 'marcar', 'book', 'booking', 'appointment', 'reservar', 'cita', 'schedule'],
    resposta: L('Vamos marcar! Quantos quartos tem a casa?', "Let's book it! How many bedrooms does the home have?", '¡Vamos a agendar! ¿Cuántas habitaciones tiene la casa?')
  },
  {
    id: 'saudacao', fraca: true,
    palavras: ['oi', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'buenas'],
    resposta: L('Olá! Aqui é o atendimento automático da Casa Limpa Cleaning. Posso ajudar com preço, horários, região ou agendar uma limpeza.', 'Hi! This is the automatic assistant for Casa Limpa Cleaning. I can help with prices, hours, service area or booking a cleaning.', 'Hola, soy el asistente automático de Casa Limpa Cleaning. Puedo ayudarte con precios, horarios, zona o agendar una limpieza.')
  },
  {
    id: 'obrigado', fraca: true,
    palavras: ['obrigado', 'obrigada', 'valeu', 'thanks', 'thank you', 'thx', 'gracias'],
    resposta: L('Por nada! Se precisar, é só chamar.', "You're welcome! Message us anytime.", '¡De nada! Escríbenos cuando quieras.')
  }
];

const TIPOS = ['padrao', 'normal', 'regular', 'standard', 'basic', 'pesada', 'profunda', 'deep', 'mudanca', 'move out', 'move', 'mudanza', 'estandar'];
const QUARTOS = / (\d{1,2}) ?(quartos?|bedrooms?|bed|br|bd|habitaciones|habitacion|cuartos?|recamaras?|rooms?) /;

const R = {
  ola: L('Olá! Aqui é o atendimento automático da Casa Limpa Cleaning.', 'Hi! This is the automatic assistant for Casa Limpa Cleaning.', 'Hola, soy el asistente automático de Casa Limpa Cleaning.'),
  preco: L('O valor depende do tamanho da casa e do tipo de limpeza. Quantos quartos tem a casa?', 'The price depends on the size of the home and the type of clean. How many bedrooms does it have?', 'El precio depende del tamaño de la casa y del tipo de limpieza. ¿Cuántas habitaciones tiene?'),
  quartos: (q) => L(`Anotado: casa de ${q} quartos.`, `Got it: a ${q} bedroom home.`, `Anotado: casa de ${q} habitaciones.`),
  tipo: L('Qual limpeza você quer: padrão, pesada ou de mudança?', 'Which clean do you need: standard, deep or move-out?', '¿Qué limpieza necesitas: estándar, profunda o de mudanza?'),
  fechado: L('Perfeito! A equipe confirma o valor e o melhor dia com você ainda hoje.', 'Perfect! The team will confirm the price and the best day with you today.', '¡Perfecto! El equipo te confirma el precio y el mejor día hoy mismo.'),
  pedido: L('Pedido anotado para a equipe', 'Request saved for the team', 'Pedido anotado para el equipo'),
  naoEntendi: L('Não tenho certeza se entendi. Posso responder sobre preço, produtos, horários, região e animais, ou passar você para uma pessoa da equipe.', "I'm not sure I understood. I can answer about prices, supplies, hours, service area and pets, or pass you to a person on the team.", 'No estoy seguro de haber entendido. Puedo responder sobre precios, productos, horarios, zona y mascotas, o pasarte con una persona del equipo.')
};

const NOTAS = {
  igual: (n) => L(`O cliente escreveu em ${n}, e a resposta saiu em ${n}.`, `The customer wrote in ${n}, and the reply came back in ${n}.`, `El cliente escribió en ${n} y la respuesta salió en ${n}.`),
  naoEntendi: L('Quando não entende, a IA não inventa: oferece passar para uma pessoa.', 'When it does not understand, the AI does not make things up: it offers a person.', 'Cuando no entiende, la IA no inventa: ofrece pasar con una persona.'),
  semOutra: (n, m) => L(`O cliente escreveu em ${n} e recebeu um menu em ${m}, que talvez nem entenda.`, `The customer wrote in ${n} and got a menu in ${m}, which they may not even understand.`, `El cliente escribió en ${n} y recibió un menú en ${m}, que quizá ni entienda.`)
};

const tem = (norm, palavras) => palavras.some((p) => norm.includes(` ${p} `));

export function responderComIA(texto, estado, langPagina) {
  const norm = normalizar(texto);
  const lingua = detectarIdioma(texto, norm, estado.idioma);
  estado.idioma = lingua;
  const T = (valor) => t(valor, lingua);
  const textos = [];
  let evento = null;

  let achadas = INTENCOES.filter((i) => tem(norm, i.palavras));
  if (achadas.some((i) => !i.fraca)) achadas = achadas.filter((i) => !i.fraca);
  const quartos = norm.match(QUARTOS)?.[1] || (estado.espera === 'quartos' && norm.match(/^ (\d{1,2}) $/)?.[1]);
  const tipo = tem(norm, TIPOS);

  if (estado.primeira && !achadas.some((i) => i.id === 'saudacao')) textos.push(T(R.ola));
  estado.primeira = false;

  if (quartos || (tipo && estado.espera === 'tipo')) {
    // Fluxo de orçamento: tamanho da casa e tipo de limpeza viram um pedido para a equipe.
    if (quartos) textos.push(T(R.quartos(quartos)));
    if (tipo) {
      textos.push(T(R.fechado));
      evento = T(R.pedido);
      estado.espera = null;
    } else {
      textos.push(T(R.tipo));
      estado.espera = 'tipo';
    }
    achadas = achadas.filter((i) => !['preco', 'agendar'].includes(i.id));
  }

  for (const intencao of achadas.slice(0, 2)) {
    if (intencao.id === 'preco') {
      textos.push(T(R.preco));
      estado.espera = 'quartos';
    } else {
      textos.push(T(intencao.resposta));
      if (intencao.id === 'agendar') estado.espera = 'quartos';
      if (intencao.evento) evento = T(intencao.evento);
    }
  }

  const entendeu = textos.length > (textos[0] === T(R.ola) ? 1 : 0);
  if (!entendeu) textos.push(T(R.naoEntendi));

  const nome = NOMES[langPagina][lingua];
  return {
    antes: `${t(UI.iaIdioma, langPagina)}${nome}`,
    textos,
    evento,
    nota: t(entendeu ? NOTAS.igual(nome) : NOTAS.naoEntendi, langPagina)
  };
}

// Sem IA: menu numérico na língua do negócio (a da página), não importa a língua do cliente.
const MENU = {
  ola: L('Olá! Bem-vindo à Casa Limpa Cleaning.', 'Hello! Welcome to Casa Limpa Cleaning.', '¡Hola! Bienvenido a Casa Limpa Cleaning.'),
  opcoes: L('Digite o número da opção: 1 Orçamento · 2 Horários · 3 Falar com atendente', 'Type the option number: 1 Quote · 2 Hours · 3 Talk to an agent', 'Escribe el número de la opción: 1 Presupuesto · 2 Horarios · 3 Hablar con un agente'),
  1: L('Para orçamento, aguarde o contato da equipe em horário comercial.', 'For a quote, please wait for the team to contact you during business hours.', 'Para un presupuesto, espera el contacto del equipo en horario laboral.'),
  2: L('Horário: segunda a sábado, das 8h às 18h.', 'Hours: Monday to Saturday, 8 am to 6 pm.', 'Horario: lunes a sábado, de 8 a. m. a 6 p. m.'),
  3: L('Aguarde. Um atendente vai falar com você assim que possível.', 'Please wait. An agent will talk to you as soon as possible.', 'Espera. Un agente hablará contigo lo antes posible.'),
  invalida: L('Opção inválida. Digite 1, 2 ou 3.', 'Invalid option. Type 1, 2 or 3.', 'Opción inválida. Escribe 1, 2 o 3.')
};

export function responderSemIA(texto, estado, langPagina) {
  const norm = normalizar(texto);
  const lingua = detectarIdioma(texto, norm, estado.idioma);
  estado.idioma = lingua;
  const T = (valor) => t(valor, langPagina);
  const numero = norm.match(/^ ([123]) $/)?.[1];
  let textos;
  if (numero) textos = [T(MENU[numero])];
  else if (estado.primeira) textos = [T(MENU.ola), T(MENU.opcoes)];
  else textos = [T(MENU.invalida)];
  estado.primeira = false;
  const nota = lingua !== langPagina
    ? NOTAS.semOutra(NOMES[langPagina][lingua], NOMES[langPagina][langPagina])
    : UI.iaNotaSem;
  return { textos, nota: t(nota, langPagina) };
}

export function iniciarDemoIAEUA(langInicial) {
  const alvo = document.querySelector('[data-whats="ia"]');
  const grupoModo = document.querySelector('[data-ia-modo]');
  const nota = document.querySelector('[data-ia-nota]');
  const titulo = document.querySelector('[data-ia-titulo]');
  if (!alvo || !grupoModo || !nota || !titulo) return null;

  const celular = criarCelular(alvo, { escrever: true });
  const campo = alvo.querySelector('.wa-campo');
  const botoesModo = [...grupoModo.querySelectorAll('button')];
  const negocio = NEGOCIOS_DEMO.faxina;
  let lang = langInicial;
  let modo = 'com';
  let ultima = '';
  let geracao = 0;
  let estado = null;

  botoesModo.forEach((botao) => botao.addEventListener('click', () => {
    if (botao.dataset.valor === modo) return;
    modo = botao.dataset.valor;
    recomecar();
  }));

  async function falar(resposta, minha) {
    if (resposta.antes) celular.evento(resposta.antes);
    for (const texto of resposta.textos) {
      await celular.digitar(Math.min(1300, 450 + texto.length * 10));
      if (minha !== geracao) return;
      celular.receber(texto);
    }
    if (resposta.evento) celular.evento(resposta.evento);
    nota.textContent = resposta.nota;
    celular.travar(false);
  }

  function mandar(texto) {
    const minha = geracao;
    ultima = texto;
    celular.travar(true);
    celular.avancarHora();
    celular.enviar(texto);
    falar(modo === 'com' ? responderComIA(texto, estado, lang) : responderSemIA(texto, estado, lang), minha);
  }

  function recomecar() {
    geracao++;
    estado = { primeira: true, espera: null, idioma: null };
    botoesModo.forEach((botao) => {
      botao.textContent = t(botao.dataset.valor === 'com' ? UI.iaCom : UI.iaSem, lang);
      botao.setAttribute('aria-pressed', String(botao.dataset.valor === modo));
    });
    grupoModo.setAttribute('aria-label', t(UI.iaModoLabel, lang));
    if (campo) campo.placeholder = t(UI.iaPlaceholder, lang);
    titulo.textContent = t(modo === 'com' ? UI.iaCom : UI.iaSem, lang);
    celular.limpar({ negocio: negocio.negocio, cor: negocio.cor }, t(UI.iaAviso, lang));
    celular.sugestoes(UI.iaSugestoes, mandar);
    celular.travar(false);
    celular.preencher(ultima);
    nota.textContent = t(ultima ? UI.iaNotaTroca : modo === 'com' ? UI.iaNotaCom : UI.iaNotaSem, lang);
  }

  celular.aoEscrever(mandar);
  recomecar();
  return {
    mudarIdioma(novo) {
      lang = novo;
      ultima = '';
      recomecar();
    }
  };
}
