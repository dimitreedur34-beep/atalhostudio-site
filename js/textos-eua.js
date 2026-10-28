// Textos da página EUA em português, inglês e espanhol, lado a lado: corrigir uma palavra é mudar uma linha.
// Conversas e respostas de demonstração são fictícias. Preços ficam em config.js (eua).

export const IDIOMAS = [
  ['pt', 'PT', 'pt-BR', 'Português'],
  ['en', 'EN', 'en', 'English'],
  ['es', 'ES', 'es', 'Español']
];

const L = (pt, en, es) => ({ pt, en, es });
export const t = (valor, lang) => (valor && typeof valor === 'object' ? valor[lang] ?? valor.pt : valor) ?? '';

export const UI = {
  titulo: L('EUA | Atalho Studio', 'U.S. businesses | Atalho Studio', 'Negocios en EE. UU. | Atalho Studio'),
  descricao: L(
    'Site, WhatsApp automático e sistema para negócios de brasileiros e latinos nos EUA, em português, inglês e espanhol.',
    'A website, automatic WhatsApp assistant and simple system for Brazilian and Latino businesses in the U.S., in English, Spanish and Portuguese.',
    'Sitio web, asistente automático de WhatsApp y sistema para negocios de brasileños y latinos en EE. UU., en español, inglés y portugués.'
  ),
  idioma: L('Idioma da página', 'Page language', 'Idioma de la página'),
  aviso: L('Demonstração com dados fictícios', 'Demo with made-up data', 'Demostración con datos ficticios'),
  eyebrow: L('Para brasileiros e latinos com negócio nos EUA', 'For Brazilian and Latino business owners in the U.S.', 'Para brasileños y latinos con negocio en EE. UU.'),
  h1: L(
    'Atenda seus clientes em português, inglês e espanhol, mesmo com as mãos ocupadas',
    'Answer your customers in English, Spanish and Portuguese, even when your hands are full',
    'Atiende a tus clientes en español, inglés y portugués, aunque tengas las manos ocupadas'
  ),
  sub: L(
    'Site, WhatsApp automático e sistema para quem trabalha com limpeza, obra, pintura, comércio e serviços. Tudo é feito à distância e tudo fica no seu nome.',
    'A website, an automatic WhatsApp assistant and a simple system for cleaning, construction, painting, retail and service businesses. Everything is done remotely and stays in your name.',
    'Sitio web, asistente automático de WhatsApp y sistema para negocios de limpieza, construcción, pintura, comercio y servicios. Todo se hace a distancia y queda a tu nombre.'
  ),
  verConversa: L('Ver uma conversa', 'See a conversation', 'Ver una conversación'),
  whats: L('Falar no WhatsApp', 'Chat on WhatsApp', 'Hablar por WhatsApp'),

  beneficiosTitulo: L('O que muda no seu dia', 'What changes in your day', 'Qué cambia en tu día'),
  beneficiosLinha: L(
    'Quatro problemas comuns de quem trabalha por conta própria e atende gente de várias línguas.',
    'Four common problems for self-employed owners who serve people in more than one language.',
    'Cuatro problemas comunes de quien trabaja por cuenta propia y atiende a gente de varios idiomas.'
  ),

  demoTitulo: L('Veja uma conversa, na sua língua', 'See a conversation in your language', 'Mira una conversación en tu idioma'),
  demoLinha: L(
    'Escolha o negócio e toque nos botões do celular, como se fosse o cliente. Troque a língua no topo para ver a mesma conversa em inglês ou espanhol.',
    'Pick a business and tap the buttons on the phone, as if you were the customer. Change the language at the top to see the same chat in Portuguese or Spanish.',
    'Elige un negocio y toca los botones del celular, como si fueras el cliente. Cambia el idioma arriba para ver la misma conversación en inglés o portugués.'
  ),
  demoNegocio: L('Tipo de negócio', 'Type of business', 'Tipo de negocio'),
  demoNota: L('Toque em enviar no celular. A mensagem do cliente já está escrita.', "Tap send on the phone. The customer's message is already written.", 'Toca enviar en el celular. El mensaje del cliente ya está escrito.'),
  demoQuero: L('Quero no meu WhatsApp', 'I want this on my WhatsApp', 'Lo quiero en mi WhatsApp'),
  demoLegenda: L('Demonstração com dados fictícios.', 'Demo with made-up data.', 'Demostración con datos ficticios.'),
  demoWhatsMensagem: (nome) => L(
    `Oi! Testei o atendimento automático (${nome}) na página para negócios nos EUA da Atalho Studio e quero no meu WhatsApp.`,
    `Hi! I tried the automatic assistant (${nome}) on Atalho Studio's page for U.S. businesses and I want it on my WhatsApp.`,
    `¡Hola! Probé el asistente automático (${nome}) en la página de Atalho Studio para negocios en EE. UU. y lo quiero en mi WhatsApp.`
  ),

  iaTitulo: L('Escreva em qualquer língua', 'Write in any language', 'Escribe en cualquier idioma'),
  iaLinha: L(
    'Digite como o seu cliente digitaria, em português, inglês ou espanhol. Depois troque para “Sem IA” e mande a mesma frase.',
    'Type the way your customer would, in English, Spanish or Portuguese. Then switch to “No AI” and send the same sentence.',
    'Escribe como lo haría tu cliente, en español, inglés o portugués. Luego cambia a “Sin IA” y envía la misma frase.'
  ),
  iaModoLabel: L('Tipo de atendimento', 'Type of service', 'Tipo de atención'),
  iaSem: L('Sem IA', 'No AI', 'Sin IA'),
  iaCom: L('Com IA', 'With AI', 'Con IA'),
  iaPlaceholder: L('Escreva sua pergunta', 'Type your question', 'Escribe tu pregunta'),
  iaAviso: L('Demonstração simulada · dados fictícios', 'Simulated demo · made-up data', 'Demostración simulada · datos ficticios'),
  iaNotaCom: L(
    'Escreva do jeito que um cliente escreveria, em qualquer das 3 línguas, ou toque numa sugestão.',
    'Write the way a customer would, in any of the 3 languages, or tap a suggestion.',
    'Escribe como lo haría un cliente, en cualquiera de los 3 idiomas, o toca una sugerencia.'
  ),
  iaNotaSem: L(
    'Menu numérico, o mais comum em atendimento sem IA: responde numa língua só e só se o cliente digitar o número certo.',
    'A numbered menu, the most common setup without AI: it answers in one language only, and only if the customer types the right number.',
    'Un menú numérico, lo más común sin IA: responde en un solo idioma y solo si el cliente escribe el número correcto.'
  ),
  iaNotaTroca: L(
    'A mesma frase já está escrita: toque em enviar e compare.',
    'The same sentence is already written: tap send and compare.',
    'La misma frase ya está escrita: toca enviar y compara.'
  ),
  iaIdioma: L('Idioma detectado: ', 'Language detected: ', 'Idioma detectado: '),
  iaSugestoes: [
    'How much for a 3 bedroom house?',
    '¿Traen sus propios productos?',
    'Vocês trabalham sábado?',
    'I have 2 dogs, is that ok?',
    'Hablan español?'
  ],

  modelosTitulo: L('Exemplos de modelos de site', 'Sample website templates', 'Ejemplos de modelos de sitio'),
  modelosLinha: L(
    'Estes três são só exemplos, para você ver como pode ficar. O seu site é montado do jeito que você quiser: suas cores, suas fotos, seus serviços, seus textos e as línguas que você escolher. Nomes e preços dos exemplos são fictícios.',
    'These three are just examples, so you can see how it could look. Your website is built the way you want it: your colors, your photos, your services, your words and the languages you choose. Names and prices in the examples are made up.',
    'Estos tres son solo ejemplos, para que veas cómo podría quedar. Tu sitio se arma como tú quieras: tus colores, tus fotos, tus servicios, tus textos y los idiomas que elijas. Los nombres y precios de los ejemplos son ficticios.'
  ),
  modelosAbrir: L('Abrir em', 'Open in', 'Abrir en'),

  distTitulo: L('Como funciona à distância', 'How it works from a distance', 'Cómo funciona a distancia'),
  distLinha: L(
    'Eu estou em Governador Valadares, no Brasil. A diferença de horário para Connecticut é de 1 a 2 horas, conforme o horário de verão dos EUA, e tudo se resolve por WhatsApp e vídeo.',
    "I'm based in Governador Valadares, Brazil. The time difference with Connecticut is 1 to 2 hours, depending on U.S. daylight saving time, and everything is handled by WhatsApp and video call.",
    'Estoy en Governador Valadares, Brasil. La diferencia horaria con Connecticut es de 1 a 2 horas, según el horario de verano de EE. UU., y todo se resuelve por WhatsApp y videollamada.'
  ),
  passos: [
    [L('Conversa', 'Chat', 'Conversación'), L('Você conta, por WhatsApp ou vídeo, como atende hoje e o que mais te atrapalha.', 'You tell me, by WhatsApp or video, how you take customers today and what slows you down.', 'Me cuentas, por WhatsApp o video, cómo atiendes hoy y qué más te complica.')],
    [L('Proposta', 'Proposal', 'Propuesta'), L('Você recebe por escrito o que será feito e o preço, em dólar.', 'You get in writing what will be done and the price, in dollars.', 'Recibes por escrito lo que se hará y el precio, en dólares.')],
    [L('Aprovação', 'Approval', 'Aprobación'), L('Você vê tudo funcionando no seu celular e aprova cada etapa.', 'You see it working on your phone and approve each step.', 'Lo ves funcionando en tu celular y apruebas cada etapa.')],
    [L('No ar', 'Live', 'En marcha'), L('Entrego funcionando. Domínio, número e contas ficam no seu nome.', 'I deliver it working. Domain, number and accounts stay in your name.', 'Lo entrego funcionando. Dominio, número y cuentas quedan a tu nombre.')]
  ],

  precosTitulo: L('Preços em dólar', 'Prices in U.S. dollars', 'Precios en dólares'),
  precosLinha: L(
    'Valores “a partir de”. O preço final sai numa proposta por escrito, antes de você fechar.',
    'Starting prices. The final price comes in a written proposal before you commit.',
    'Precios “desde”. El precio final llega en una propuesta por escrito, antes de que decidas.'
  ),
  aPartir: L('a partir de', 'starting at', 'desde'),
  porMes: L('por mês', 'per month', 'al mes'),
  cuidado: L('cuidado mensal opcional', 'optional monthly care', 'cuidado mensual opcional'),
  precosComparar: L(
    'Para comparar: guias de preço dos EUA falam em US$ 1.500 a US$ 5.000 por um site de empresa local feito por freelancer. São estimativas de blogs especializados, não uma tabela oficial.',
    'For comparison: U.S. pricing guides put a local business website built by a freelancer at roughly $1,500 to $5,000. Those are estimates from industry blogs, not an official price list.',
    'Para comparar: las guías de precios de EE. UU. hablan de US$ 1.500 a US$ 5.000 por un sitio de negocio local hecho por un freelancer. Son estimaciones de blogs especializados, no una tarifa oficial.'
  ),
  desconto: (pct) => L(
    `Levando mais de um serviço, ${pct} de desconto na implantação.`,
    `Taking more than one service: ${pct} off the setup.`,
    `Si contratas más de un servicio: ${pct} de descuento en la implementación.`
  ),
  pagamento: (forma) => L(
    `Pagamento em dólar por ${forma}. A mensalidade só começa depois da entrega.`,
    `Payment in U.S. dollars via ${forma}. The monthly fee starts only after delivery.`,
    `Pago en dólares por ${forma}. La mensualidad empieza solo después de la entrega.`
  ),
  planos: [
    {
      id: 'site',
      servico: L('Para ser encontrado', 'To be found', 'Para que te encuentren'),
      nome: L('Site em 3 línguas', 'Website in 3 languages', 'Sitio web en 3 idiomas'),
      itens: [
        L('Feito do jeito que você quiser: os modelos são só exemplos', 'Built the way you want: the templates are just examples', 'Hecho a tu manera: los modelos son solo ejemplos'),
        L('Português, inglês e espanhol num site só', 'Portuguese, English and Spanish in one site', 'Español, inglés y portugués en un solo sitio'),
        L('Fotos, serviços, horário e botão de WhatsApp com mensagem pronta', 'Photos, services, hours and a WhatsApp button with a ready-made message', 'Fotos, servicios, horario y botón de WhatsApp con mensaje listo'),
        L('Pode sair sem o seu endereço de casa', 'Can go live without your home address', 'Puede salir sin tu dirección de casa')
      ],
      botao: L('Quero um site', 'I want a website', 'Quiero un sitio')
    },
    {
      id: 'zap',
      servico: L('Para responder na hora', 'To reply right away', 'Para responder al instante'),
      nome: L('WhatsApp com botões', 'WhatsApp with buttons', 'WhatsApp con botones'),
      itens: [
        L('O cliente escolhe a língua num menu de botões', 'The customer picks a language from a button menu', 'El cliente elige el idioma en un menú de botones'),
        L('Anota serviço, endereço e telefone', 'Collects service, address and phone number', 'Anota servicio, dirección y teléfono'),
        L('Passa para você quando precisa', 'Hands off to you when needed', 'Te pasa la conversación cuando hace falta')
      ],
      botao: L('Quero automatizar', 'I want to automate', 'Quiero automatizar')
    },
    {
      id: 'zapIA', destaque: true,
      etiqueta: L('Mais completo', 'Most complete', 'El más completo'),
      servico: L('Para responder na hora', 'To reply right away', 'Para responder al instante'),
      nome: L('WhatsApp com IA', 'WhatsApp with AI', 'WhatsApp con IA'),
      itens: [
        L('Entende e responde em português, inglês e espanhol', 'Understands and replies in English, Spanish and Portuguese', 'Entiende y responde en español, inglés y portugués'),
        L('Responde só o que você aprovou e passa para uma pessoa quando não sabe', 'Only answers what you approved and hands off to a person when unsure', 'Responde solo lo que aprobaste y pasa a una persona cuando no sabe'),
        L('Você recebe o resumo de cada pedido', 'You get a summary of every request', 'Recibes el resumen de cada pedido')
      ],
      botao: L('Quero com IA', 'I want the AI version', 'Quiero la versión con IA')
    },
    {
      id: 'sistema',
      servico: L('Para organizar', 'To get organized', 'Para organizarte'),
      nome: L('Sistema sob medida', 'Custom system', 'Sistema a la medida'),
      itens: [
        L('Agenda, orçamentos, equipe e cobranças do jeito que você trabalha', 'Schedule, quotes, crew and payments the way you work', 'Agenda, presupuestos, equipo y cobros a tu manera de trabajar'),
        L('Módulos e valor definidos com você, na proposta', 'Modules and price set with you, in the proposal', 'Módulos y valor definidos contigo, en la propuesta'),
        L('Fica na sua conta, e o código é seu', 'Lives in your account, and the code is yours', 'Queda en tu cuenta y el código es tuyo')
      ],
      botao: L('Quero um sistema', 'I want a system', 'Quiero un sistema')
    }
  ],
  planoMensagem: (nome) => L(
    `Oi! Vi a página para negócios nos EUA da Atalho Studio e quero saber mais do plano ${nome}. Meu negócio é ___.`,
    `Hi! I saw Atalho Studio's page for U.S. businesses and want to know more about the ${nome} plan. My business is ___.`,
    `¡Hola! Vi la página de Atalho Studio para negocios en EE. UU. y quiero saber más del plan ${nome}. Mi negocio es ___.`
  ),

  faqTitulo: L('Perguntas frequentes', 'Frequently asked questions', 'Preguntas frecuentes'),
  faq: [
    [L('Você mora no Brasil. Como funciona?', "You're in Brazil. How does this work?", 'Vives en Brasil. ¿Cómo funciona?'),
      [L('Tudo é feito à distância, por WhatsApp e vídeo. A diferença de horário é de 1 a 2 horas. Não precisa de reunião presencial.', 'Everything is done remotely, by WhatsApp and video call. The time difference is 1 to 2 hours. No in-person meeting is needed.', 'Todo se hace a distancia, por WhatsApp y videollamada. La diferencia horaria es de 1 a 2 horas. No hace falta reunión presencial.')]],
    [L('O meu site vai ser igual a esses modelos?', 'Will my website look like these templates?', '¿Mi sitio va a ser igual a estos modelos?'),
      [L('Não. Os modelos são só exemplos para você ver como pode ficar. O seu é montado do jeito que você quiser: cores, fotos, serviços, textos e as línguas que escolher. Você aprova cada etapa antes de ir ao ar.', 'No. The templates are just examples so you can see how it could look. Yours is built the way you want: colors, photos, services, words and the languages you choose. You approve each step before it goes live.', 'No. Los modelos son solo ejemplos para que veas cómo podría quedar. El tuyo se arma como tú quieras: colores, fotos, servicios, textos y los idiomas que elijas. Apruebas cada etapa antes de publicarlo.')]],
    [L('Você pede documento ou pergunta sobre situação migratória?', 'Do you ask for documents or about immigration status?', '¿Pides documentos o preguntas por el estatus migratorio?'),
      [L('Não. Eu não peço documento seu nem pergunto sobre isso. Algumas etapas, como a verificação da conta de WhatsApp, são da Meta, e você decide o que informar a ela.', "No. I don't ask for your documents or about that. Some steps, like WhatsApp account verification, belong to Meta, and you decide what to share with them.", 'No. No pido tus documentos ni pregunto sobre eso. Algunas etapas, como la verificación de la cuenta de WhatsApp, son de Meta, y tú decides qué informarle.')]],
    [L('Funciona com número americano (+1)?', 'Does it work with a U.S. (+1) number?', '¿Funciona con un número de EE. UU. (+1)?'),
      [L('Sim, a plataforma oficial do WhatsApp aceita números dos EUA. A conta da Meta fica no seu nome e no seu cartão. Desde 1º de outubro de 2026, a Meta dá 1.000 respostas de atendimento grátis por mês, por número, e cobra centavos por resposta depois disso.', 'Yes, the official WhatsApp platform accepts U.S. numbers. The Meta account stays in your name and on your card. Since October 1, 2026, Meta gives 1,000 free service replies per month, per number, and charges a few cents per reply after that.', 'Sí, la plataforma oficial de WhatsApp acepta números de EE. UU. La cuenta de Meta queda a tu nombre y con tu tarjeta. Desde el 1 de octubre de 2026, Meta da 1.000 respuestas de atención gratis al mes, por número, y cobra centavos por respuesta después.'),
        L('Se o seu número já está no app WhatsApp Business, vemos na primeira conversa como conectar sem perder o que você já usa.', 'If your number is already in the WhatsApp Business app, we check in the first chat how to connect it without losing what you use today.', 'Si tu número ya está en la app WhatsApp Business, vemos en la primera conversación cómo conectarlo sin perder lo que usas hoy.')]],
    [L('O atendimento entende inglês e espanhol de verdade?', 'Does it really understand English and Spanish?', '¿De verdad entiende inglés y español?'),
      [L('No plano com IA, sim: responde na língua em que o cliente escreveu. A IA pode errar, por isso só responde o que você aprovou e chama uma pessoa quando não sabe. No plano de botões, o cliente escolhe a língua num menu. Teste na demonstração acima.', 'On the AI plan, yes: it replies in the language the customer wrote in. AI can make mistakes, so it only answers what you approved and calls a person when it does not know. On the button plan, the customer picks a language from a menu. Try it in the demo above.', 'En el plan con IA, sí: responde en el idioma en que escribió el cliente. La IA puede equivocarse, por eso solo responde lo que aprobaste y llama a una persona cuando no sabe. En el plan de botones, el cliente elige el idioma en un menú. Pruébalo en la demostración de arriba.')]],
    [L('Como eu pago, em dólar?', 'How do I pay, in dollars?', '¿Cómo pago, en dólares?'),
      [L('Combinamos na proposta. A implantação é paga antes de começar e a mensalidade só começa depois da entrega.', 'We agree on it in the proposal. Setup is paid before starting, and the monthly fee only starts after delivery.', 'Lo acordamos en la propuesta. La implementación se paga antes de empezar y la mensualidad solo empieza después de la entrega.')]],
    [L('E se eu não gostar?', "What if I don't like it?", '¿Y si no me gusta?'),
      [L('Você só fecha depois de ver a proposta por escrito e aprova cada etapa antes da entrega. Depois da entrega, o que foi combinado e não funciona é corrigido em até 90 dias, sem custo.', 'You only commit after seeing the written proposal, and you approve each step before delivery. After delivery, anything agreed that does not work is fixed within 90 days at no cost.', 'Solo decides después de ver la propuesta por escrito y apruebas cada etapa antes de la entrega. Después, lo acordado que no funcione se corrige en hasta 90 días, sin costo.')]],
    [L('Os meus dados ficam comigo?', 'Do I keep my data?', '¿Mis datos quedan conmigo?'),
      [L('Sim. Domínio, número de WhatsApp e contas ficam no seu nome, e os dados saem em planilha quando você quiser.', 'Yes. Domain, WhatsApp number and accounts stay in your name, and your data comes out as a spreadsheet whenever you want.', 'Sí. Dominio, número de WhatsApp y cuentas quedan a tu nombre, y los datos salen en una hoja de cálculo cuando quieras.')]]
  ],

  finalTitulo: L('Quer ver como ficaria no seu negócio?', 'Want to see how it would work for your business?', '¿Quieres ver cómo quedaría en tu negocio?'),
  finalLinha: L(
    'Mande uma mensagem em qualquer língua e conte o que você faz. Eu respondo com uma proposta por escrito, sem compromisso.',
    'Send a message in any language and tell me what you do. I will reply with a written proposal, no obligation.',
    'Escríbeme en cualquier idioma y cuéntame a qué te dedicas. Te respondo con una propuesta por escrito, sin compromiso.'
  ),
  finalMensagem: L(
    'Oi! Vi a página para negócios nos EUA da Atalho Studio e quero saber mais. Meu negócio é ___.',
    "Hi! I saw Atalho Studio's page for U.S. businesses and I'd like to know more. My business is ___.",
    '¡Hola! Vi la página de Atalho Studio para negocios en EE. UU. y quiero saber más. Mi negocio es ___.'
  )
};

export const BENEFICIOS = [
  ['clock',
    L('Você está trabalhando, não no celular', "You're working, not on your phone", 'Estás trabajando, no con el celular'),
    L('Faxina em andamento, pincel na mão ou em cima da escada, e o cliente manda mensagem. O atendimento responde na hora, pergunta o serviço e o endereço e deixa tudo anotado para você ver no almoço.', 'Mid-clean, brush in hand or up a ladder, and a customer texts. The assistant replies right away, asks what they need and where, and saves everything for you to see at lunch.', 'A mitad de una limpieza, con la brocha en la mano o en una escalera, y el cliente escribe. El asistente responde al momento, pregunta qué necesita y dónde, y deja todo anotado para que lo veas a la hora del almuerzo.')],
  ['languages',
    L('Cada cliente na língua dele', 'Every customer in their own language', 'Cada cliente en su idioma'),
    L('Uma cliente escreve em inglês, o vizinho em espanhol, a sua tia em português. Com IA, cada um recebe resposta na língua em que escreveu.', 'One customer writes in English, the neighbor in Spanish, your aunt in Portuguese. With AI, each gets a reply in the language they wrote in.', 'Una clienta escribe en inglés, el vecino en español, tu tía en portugués. Con IA, cada uno recibe respuesta en el idioma en que escribió.')],
  ['image',
    L('Um site que passa confiança', 'A website that builds trust', 'Un sitio que da confianza'),
    L('Quem te acha pelo Instagram, por indicação ou pelo Google vê fotos, serviços e um botão de WhatsApp, na língua dele. Não prometo primeiro lugar no Google: ninguém honesto promete isso.', 'People who find you through Instagram, a referral or Google see photos, services and a WhatsApp button in their language. I do not promise first place on Google: nobody honest can.', 'Quien te encuentra por Instagram, por recomendación o por Google ve fotos, servicios y un botón de WhatsApp en su idioma. No prometo el primer lugar en Google: nadie honesto puede prometerlo.')],
  ['shield-check',
    L('Sem papelada e sem exposição', 'No paperwork, no exposure', 'Sin papeleo y sin exponerte'),
    L('Eu não peço documento nem pergunto sobre situação migratória. O site e o WhatsApp podem mostrar só o nome do negócio, sem o seu endereço de casa. Tudo é feito por WhatsApp e vídeo.', 'I do not ask for documents or about immigration status. Your website and WhatsApp can show only the business name, not your home address. Everything is done by WhatsApp and video.', 'No pido documentos ni pregunto por el estatus migratorio. El sitio y el WhatsApp pueden mostrar solo el nombre del negocio, sin tu dirección de casa. Todo se hace por WhatsApp y video.')]
];

// Conversas por botões: negócio, cor, mensagem do cliente e passos (mesma estrutura de dados.js).
export const NEGOCIOS_DEMO = {
  faxina: {
    icone: 'droplets', cor: '#2F7D6B', negocio: 'Casa Limpa Cleaning',
    rotulo: L('Limpeza de casas', 'House cleaning', 'Limpieza de casas'),
    sugestao: L('Oi! Vocês fazem faxina em Danbury?', 'Hi! Do you clean houses in Danbury?', '¡Hola! ¿Limpian casas en Danbury?'),
    passos: {
      inicio: {
        bot: [L('Olá! Aqui é o atendimento automático da Casa Limpa Cleaning.', 'Hello! This is the automatic assistant for Casa Limpa Cleaning.', 'Hola, soy el asistente automático de Casa Limpa Cleaning.'), L('Fazemos sim! Qual serviço você quer?', 'We do! Which service do you need?', '¡Sí! ¿Qué servicio necesitas?')],
        botoes: [[L('Limpeza padrão', 'Standard clean', 'Limpieza estándar'), 'quartos'], [L('Limpeza pesada', 'Deep clean', 'Limpieza profunda'), 'quartos'], [L('Mudança (move-out)', 'Move-out clean', 'Limpieza de mudanza'), 'quartos']],
        nota: L('Pergunta o serviço primeiro, sem você parar o trabalho.', 'It asks about the service first, without you stopping work.', 'Pregunta primero el servicio, sin que pares de trabajar.')
      },
      quartos: {
        bot: [L('Quantos quartos tem a casa?', 'How many bedrooms does the home have?', '¿Cuántas habitaciones tiene la casa?')],
        botoes: [[L('1 a 2', '1 to 2', '1 a 2'), 'fim'], [L('3 a 4', '3 to 4', '3 a 4'), 'fim'], [L('5 ou mais', '5 or more', '5 o más'), 'fim']],
        nota: L('Com o tamanho da casa, você já consegue pensar no preço.', 'With the size of the home you can already think about the price.', 'Con el tamaño de la casa ya puedes pensar en el precio.')
      },
      fim: {
        bot: [L('Anotado! A equipe confirma o valor e o melhor dia com você ainda hoje.', 'Got it! The team will confirm the price and the best day with you today.', '¡Anotado! El equipo te confirma el precio y el mejor día hoy mismo.'), L('Se quiser, mande fotos da casa por aqui.', 'If you like, send photos of the home here.', 'Si quieres, envía fotos de la casa por aquí.')],
        nota: L('O pedido chega pronto: serviço, tamanho e telefone. Você só confirma o preço.', 'The request arrives ready: service, size and phone number. You only confirm the price.', 'El pedido llega listo: servicio, tamaño y teléfono. Tú solo confirmas el precio.')
      }
    }
  },
  pintura: {
    icone: 'brush', cor: '#B8772E', negocio: 'Silva Painting',
    rotulo: L('Pintura e reformas', 'Painting & remodeling', 'Pintura y remodelación'),
    sugestao: L('Preciso pintar a sala e dois quartos.', 'I need my living room and two bedrooms painted.', 'Necesito pintar la sala y dos habitaciones.'),
    passos: {
      inicio: {
        bot: [L('Olá! Aqui é o atendimento automático da Silva Painting.', 'Hello! This is the automatic assistant for Silva Painting.', 'Hola, soy el asistente automático de Silva Painting.'), L('Entendi: sala e dois quartos. Quer a tinta incluída no orçamento?', 'Got it: living room and two bedrooms. Do you want paint included in the quote?', 'Entendido: sala y dos habitaciones. ¿Quieres la pintura incluida en el presupuesto?')],
        botoes: [[L('Com a tinta', 'Paint included', 'Con la pintura'), 'fotos'], [L('Só a mão de obra', 'Labor only', 'Solo la mano de obra'), 'fotos']],
        nota: L('Faz as perguntas que o pintor faria antes de passar o orçamento.', 'It asks the questions a painter would ask before quoting.', 'Hace las preguntas que haría el pintor antes de presupuestar.')
      },
      fotos: {
        bot: [L('Pode mandar fotos das paredes? Assim o orçamento sai mais certo.', 'Can you send photos of the walls? The quote will be more accurate.', '¿Puedes enviar fotos de las paredes? Así el presupuesto sale más exacto.')],
        botoes: [[L('Vou mandar fotos', "I'll send photos", 'Voy a enviar fotos'), 'fim'], [L('Prefiro visita', 'I prefer a visit', 'Prefiero una visita'), 'fim']],
        nota: L('As fotos chegam junto do pedido, e você evita visita à toa.', 'Photos arrive with the request, so you avoid pointless visits.', 'Las fotos llegan con el pedido y evitas visitas innecesarias.')
      },
      fim: {
        bot: [L('Perfeito! O Silva responde com o orçamento ainda hoje.', 'Perfect! Silva will reply with the quote today.', '¡Perfecto! Silva te responde con el presupuesto hoy mismo.'), L('Se precisar de visita, marcamos por aqui mesmo.', 'If a visit is needed, we will set it up right here.', 'Si hace falta una visita, la coordinamos por aquí mismo.')],
        nota: L('Cliente atendido na hora, antes de chamar outro pintor.', 'The customer is answered right away, before calling another painter.', 'El cliente es atendido al instante, antes de llamar a otro pintor.')
      }
    }
  },
  mercado: {
    icone: 'shopping-bag', cor: '#2E6B3A', negocio: 'Sabor do Brasil Market',
    rotulo: L('Mercado brasileiro', 'Brazilian market', 'Mercado brasileño'),
    sugestao: L('Vocês têm pão de queijo e guaraná?', 'Do you have pão de queijo and guaraná?', '¿Tienen pão de queijo y guaraná?'),
    passos: {
      inicio: {
        bot: [L('Olá! Aqui é o Sabor do Brasil Market.', 'Hello! This is Sabor do Brasil Market.', 'Hola, somos Sabor do Brasil Market.'), L('Temos sim! Pão de queijo congelado e guaraná. Quer reservar?', 'We do! Frozen pão de queijo and guaraná. Want to reserve some?', '¡Sí tenemos! Pão de queijo congelado y guaraná. ¿Quieres reservar?')],
        botoes: [[L('Reservar', 'Reserve', 'Reservar'), 'retira'], [L('Ver horário', 'See hours', 'Ver horario'), 'horario']],
        nota: L('Pergunta de produto é a mais comum e a mais fácil de automatizar.', 'Product questions are the most common and the easiest to automate.', 'La pregunta por un producto es la más común y la más fácil de automatizar.')
      },
      horario: {
        bot: [L('Abrimos todos os dias, das 9h às 20h.', 'We are open every day, 9 am to 8 pm.', 'Abrimos todos los días, de 9 a. m. a 8 p. m.')],
        botoes: [[L('Reservar', 'Reserve', 'Reservar'), 'retira']]
      },
      retira: {
        bot: [L('Retirada na loja ou entrega?', 'Store pickup or delivery?', '¿Recoger en la tienda o entrega?')],
        botoes: [[L('Retirada', 'Pickup', 'Recoger'), 'fim'], [L('Entrega', 'Delivery', 'Entrega'), 'fim']]
      },
      fim: {
        bot: [L('Reservado! Fica separado no seu nome até as 20h.', 'Reserved! It is held under your name until 8 pm.', '¡Reservado! Queda apartado a tu nombre hasta las 8 p. m.')],
        nota: L('O cliente sabe que o produto existe antes de sair de casa.', 'The customer knows the item is there before leaving home.', 'El cliente sabe que el producto existe antes de salir de casa.')
      }
    }
  }
};

// Converte um negócio de demonstração para o formato que conversa-whats.js entende, na língua escolhida.
export function areaDemo(id, lang) {
  const n = NEGOCIOS_DEMO[id];
  const passos = {};
  for (const [nome, p] of Object.entries(n.passos)) {
    passos[nome] = {
      bot: p.bot.map((x) => t(x, lang)),
      ...(p.botoes ? { botoes: p.botoes.map(([rotulo, destino]) => [t(rotulo, lang), destino]) } : {}),
      ...(p.nota ? { nota: t(p.nota, lang) } : {})
    };
  }
  return { negocio: n.negocio, cor: n.cor, sugestao: t(n.sugestao, lang), passos };
}

// Modelos de site da página EUA (modelos/molde/negocios-eua.js), abertos com ?lang=.
export const MODELOS_EUA = [
  { id: 'faxina-us', nome: 'Casa Limpa Cleaning', tipo: L('Limpeza de casas', 'House cleaning', 'Limpieza de casas') },
  { id: 'pintura-us', nome: 'Silva Painting', tipo: L('Pintura e reformas', 'Painting & remodeling', 'Pintura y remodelación') },
  { id: 'mercado-us', nome: 'Sabor do Brasil Market', tipo: L('Mercado brasileiro', 'Brazilian market', 'Mercado brasileño') }
];

// Menu do topo traduzido na página EUA (as outras páginas são só em português).
export const MENU = {
  'index.html': L('Início', 'Home', 'Inicio'),
  'sites.html': L('Sites', 'Websites', 'Sitios'),
  'whatsapp.html': L('WhatsApp', 'WhatsApp', 'WhatsApp'),
  'sistemas.html': L('Sistemas', 'Systems', 'Sistemas'),
  'planos.html': L('Planos e dúvidas', 'Plans & FAQ', 'Planes y dudas'),
  'eua.html': L('EUA', 'U.S.', 'EE. UU.')
};

// Textos fixos do celular de demonstração (conversa-whats.js).
export const ROTULOS_WA = {
  pt: { hoje: 'Hoje', online: 'online', digitando: 'digitando…', voce: 'Você', recomecar: 'Recomeçar conversa', mensagem: 'Mensagem' },
  en: { hoje: 'Today', online: 'online', digitando: 'typing…', voce: 'You', recomecar: 'Restart chat', mensagem: 'Message' },
  es: { hoje: 'Hoy', online: 'en línea', digitando: 'escribiendo…', voce: 'Tú', recomecar: 'Reiniciar conversación', mensagem: 'Mensaje' }
};
