// Textos fixos do molde em português, inglês e espanhol. Os negócios do Brasil usam só o português;
// os de negocios-eua.js aceitam ?lang=en ou ?lang=es.
export const TEXTOS = {
  pt: {
    tituloPagina: 'Modelo de demonstração', idiomas: 'Idioma',
    sobre: 'Sobre', seuPedido: 'Seu pedido', duvidas: 'Dúvidas', contato: 'Contato', ver: 'Ver',
    pecaWhats: 'Peça pelo WhatsApp', qualquerHora: 'a qualquer hora, até de noite',
    tirar: (x) => `Tirar um ${x}`, quantidade: (x) => `Quantidade de ${x}`, mais: (x) => `Pôr mais um ${x}`,
    falarSobre: 'Falar sobre isso', queroEsse: 'Quero esse',
    porDentro: 'Por dentro', diaADia: 'Um pouco do dia a dia.',
    seuNome: 'Seu nome', exNome: 'Ex.: Ana', enviarWhats: 'Enviar pelo WhatsApp',
    mensagemPara: (x) => `Mensagem que vai para ${x}`,
    oi: 'Oi!', sou: (nome, abertura) => `Sou ${nome} e ${abertura}`, total: 'Total',
    vazio: (x) => `Seu pedido está vazio. Use o + no ${x} acima.`,
    escolhaItem: 'Escolha pelo menos um item para montar a mensagem.',
    oQueDizem: 'O que dizem', exemploAvaliacoes: 'Exemplo: aqui entram as avaliações reais dos seus clientes.', estrelas: '5 estrelas',
    falarWhats: 'Falar no WhatsApp', ondeEstamos: 'Onde estamos', endereco: 'Endereço', horario: 'Horário', telefone: 'Telefone',
    mapa: 'Mapa ilustrativo. No site de verdade, entra o mapa do Google com a sua localização.',
    nomeFicticio: 'nome fictício', falarWhatsDe: (x) => `Falar no WhatsApp de ${x}`,
    kit: {}
  },
  en: {
    tituloPagina: 'Demo website', idiomas: 'Language',
    sobre: 'About', seuPedido: 'Your order', duvidas: 'FAQ', contato: 'Contact', ver: 'See',
    pecaWhats: 'Order on WhatsApp', qualquerHora: 'anytime, even at night',
    tirar: (x) => `Remove one ${x}`, quantidade: (x) => `Quantity of ${x}`, mais: (x) => `Add one ${x}`,
    falarSobre: 'Ask about this', queroEsse: 'I want this',
    porDentro: 'Inside', diaADia: 'A look at our day-to-day.',
    seuNome: 'Your name', exNome: 'e.g. Ana', enviarWhats: 'Send on WhatsApp',
    mensagemPara: (x) => `Message to ${x}`,
    oi: 'Hi!', sou: (nome, abertura) => `I'm ${nome} and ${abertura}`, total: 'Total',
    vazio: (x) => `Your order is empty. Use the + in ${x} above.`,
    escolhaItem: 'Pick at least one item to build the message.',
    oQueDizem: 'What people say', exemploAvaliacoes: 'Example: your real customer reviews go here.', estrelas: '5 stars',
    falarWhats: 'Chat on WhatsApp', ondeEstamos: 'Where we are', endereco: 'Address', horario: 'Hours', telefone: 'Phone',
    mapa: 'Illustrative map. On the real site, this is a Google map with your location.',
    nomeFicticio: 'made-up name', falarWhatsDe: (x) => `Chat on WhatsApp with ${x}`,
    kit: {
      titulo: (x) => `${x} on WhatsApp`,
      explica: "On the real site, this button opens the business's WhatsApp with this message already written:",
      nada: 'This is a demo: nothing was sent.', entendi: 'Got it',
      selo: 'Sample website · made-up prices', precos: 'Sample prices, for demo only'
    }
  },
  es: {
    tituloPagina: 'Sitio de demostración', idiomas: 'Idioma',
    sobre: 'Nosotros', seuPedido: 'Tu pedido', duvidas: 'Preguntas', contato: 'Contacto', ver: 'Ver',
    pecaWhats: 'Pide por WhatsApp', qualquerHora: 'a cualquier hora, incluso de noche',
    tirar: (x) => `Quitar un ${x}`, quantidade: (x) => `Cantidad de ${x}`, mais: (x) => `Agregar un ${x}`,
    falarSobre: 'Preguntar por esto', queroEsse: 'Quiero este',
    porDentro: 'Por dentro', diaADia: 'Un poco del día a día.',
    seuNome: 'Tu nombre', exNome: 'Ej.: Ana', enviarWhats: 'Enviar por WhatsApp',
    mensagemPara: (x) => `Mensaje para ${x}`,
    oi: '¡Hola!', sou: (nome, abertura) => `Soy ${nome} y ${abertura}`, total: 'Total',
    vazio: (x) => `Tu pedido está vacío. Usa el + en ${x} arriba.`,
    escolhaItem: 'Elige al menos un producto para armar el mensaje.',
    oQueDizem: 'Lo que dicen', exemploAvaliacoes: 'Ejemplo: aquí van las reseñas reales de tus clientes.', estrelas: '5 estrellas',
    falarWhats: 'Hablar por WhatsApp', ondeEstamos: 'Dónde estamos', endereco: 'Dirección', horario: 'Horario', telefone: 'Teléfono',
    mapa: 'Mapa ilustrativo. En el sitio real, aquí va el mapa de Google con tu ubicación.',
    nomeFicticio: 'nombre ficticio', falarWhatsDe: (x) => `Hablar por WhatsApp con ${x}`,
    kit: {
      titulo: (x) => `WhatsApp de ${x}`,
      explica: 'En el sitio real, este botón abre el WhatsApp del negocio con este mensaje ya escrito:',
      nada: 'Esto es una demostración: no se envió nada.', entendi: 'Entendido',
      selo: 'Sitio de ejemplo · precios ficticios', precos: 'Precios de ejemplo, solo para demostración'
    }
  }
};
