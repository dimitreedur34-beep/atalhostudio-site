// Negócios do molde para a página EUA, em português, inglês e espanhol: modelos/molde/index.html?negocio=<id>&lang=en.
// Mesmos campos de negocios.js; todo texto em 3 línguas é L(pt, en, es) e o molde escolhe a língua.
// moeda: 'USD' (preços em dólar). telefone: número fictício (555-01xx é reservado para ficção nos EUA).
// enderecoRotulo: troca "Endereço" quando o negócio mostra só a região, sem endereço de casa.
// Fotos em fotos/<id>-capa.webp, -apoio.webp e -galeria-1..3.webp (Unsplash, ver fotos/CREDITOS.txt).
const L = (pt, en, es) => ({ pt, en, es });

const quem = L('Cliente de exemplo', 'Sample customer', 'Cliente de ejemplo');
const comoFunciona = L('Como funciona', 'How it works', 'Cómo funciona');
const servicosTitulo = L('Serviços', 'Services', 'Servicios');
const servicosLinha = L('Toque em "Quero esse" e o pedido de orçamento já vem preenchido.', 'Tap "I want this" and the quote request is filled in for you.', 'Toca "Quiero este" y la solicitud de presupuesto se llena sola.');
const pecaOrcamento = L('Peça seu orçamento', 'Get your quote', 'Pide tu presupuesto');
const pedirOrcamento = L('Pedir orçamento', 'Get a quote', 'Pedir presupuesto');
const sobOrcamento = L('sob orçamento', 'by quote', 'según presupuesto');
const aPartir = (valor) => L(`a partir de US$ ${valor}`, `from $${valor}`, `desde US$ ${valor}`);
const servico = L('Serviço', 'Service', 'Servicio');
const regiao = L('Onde atendemos', 'Service area', 'Dónde atendemos');
const linguas = ['languages', L('Fala a sua língua', 'Speaks your language', 'Habla tu idioma'), L('Português, inglês e espanhol.', 'English, Spanish and Portuguese.', 'Español, inglés y portugués.')];

export const NEGOCIOS_EUA = {
  'faxina-us': {
    nome: 'Casa Limpa Cleaning', curto: 'Casa Limpa', tipo: L('Limpeza de casas', 'House cleaning', 'Limpieza de casas'), icone: 'droplets',
    moeda: 'USD', telefone: '(203) 555-0142',
    galeria: [L('Cozinha limpa e organizada', 'A clean, tidy kitchen', 'Cocina limpia y ordenada'), L('Mão de luva segurando um borrifador', 'Gloved hand holding a spray bottle', 'Mano con guante sosteniendo un atomizador'), L('Aspirando um pufe', 'Vacuuming an ottoman', 'Aspirando un puf')],
    fonte: ['DM Serif Display', '400'], serif: true,
    sobre: {
      titulo: L('Casa limpa do jeito que você gosta, toda semana.', 'Your home cleaned the way you like it, every week.', 'Tu casa limpia como te gusta, cada semana.'),
      texto: L('Equipe fixa, que aprende como você gosta das coisas: onde fica cada item, quais produtos prefere e o que precisa de mais atenção. Você não precisa explicar tudo de novo a cada visita.', 'A steady team that learns how you like things: where each item goes, which products you prefer and what needs extra care. No need to explain everything again every visit.', 'Un equipo fijo que aprende cómo te gustan las cosas: dónde va cada objeto, qué productos prefieres y qué necesita más atención. No tienes que explicar todo en cada visita.'),
      pontos: [L('Mesma equipe a cada visita', 'Same team every visit', 'El mismo equipo en cada visita'), L('Produtos e equipamentos inclusos', 'Supplies and equipment included', 'Productos y equipos incluidos'), L('Atendimento em português, inglês e espanhol', 'Service in English, Spanish and Portuguese', 'Atención en español, inglés y portugués')]
    },
    cores: ['#2F7D6B', '#22594C', '#E8F3F0'], layout: 'dividido',
    horario: L('Seg a sáb, 8h às 18h', 'Mon–Sat, 8 am–6 pm', 'Lun a sáb, 8 a. m.–6 p. m.'),
    endereco: L('Danbury e cidades vizinhas', 'Danbury and nearby towns', 'Danbury y ciudades cercanas'), enderecoRotulo: regiao,
    selo: L('Limpeza residencial', 'Residential cleaning', 'Limpieza residencial'),
    titulo: L('Chegue em casa e encontre tudo limpo.', 'Come home to a spotless house.', 'Llega a casa y encuéntrala impecable.'),
    linha: L('Limpeza semanal, quinzenal, pesada ou de mudança. Peça o orçamento pelo WhatsApp em 1 minuto.', 'Weekly, biweekly, deep or move-out cleaning. Request a quote on WhatsApp in 1 minute.', 'Limpieza semanal, quincenal, profunda o de mudanza. Pide tu presupuesto por WhatsApp en 1 minuto.'),
    fatos: [[L('Seg a sáb', 'Mon–Sat', 'Lun a sáb'), L('das 8h às 18h', '8 am to 6 pm', 'de 8 a. m. a 6 p. m.')], [L('Produtos', 'Supplies', 'Productos'), L('inclusos', 'included', 'incluidos')], [L('3 línguas', '3 languages', '3 idiomas'), 'PT · EN · ES']],
    altCapa: L('Mulher passando mop no chão de uma sala clara', 'Woman mopping the floor of a bright room', 'Mujer trapeando el piso de una sala luminosa'),
    altApoio: L('Profissional subindo a escada com balde e vassoura', 'Cleaner walking upstairs with a caddy and broom', 'Profesional subiendo la escalera con cubeta y escoba'),
    modo: 'orcamento', servicosTitulo, servicosLinha,
    servicos: [
      ['house', L('Limpeza padrão', 'Standard clean', 'Limpieza estándar'), L('Cozinha, banheiros, quartos e sala.', 'Kitchen, bathrooms, bedrooms and living areas.', 'Cocina, baños, habitaciones y sala.'), aPartir(140)],
      ['droplets', L('Limpeza pesada', 'Deep clean', 'Limpieza profunda'), L('Rodapés, armários por dentro, forno e geladeira.', 'Baseboards, inside cabinets, oven and fridge.', 'Zócalos, gabinetes por dentro, horno y refrigerador.'), aPartir(240)],
      ['truck', L('Mudança (entrada ou saída)', 'Move-in / move-out', 'Mudanza (entrada o salida)'), L('Casa vazia pronta para entregar a chave.', 'Empty home ready for the keys.', 'Casa vacía lista para entregar las llaves.'), aPartir(280)],
      ['repeat', L('Semanal ou quinzenal', 'Weekly or biweekly', 'Semanal o quincenal'), L('Mesmo dia e mesma equipe, com desconto.', 'Same day and same team, at a lower rate.', 'Mismo día y mismo equipo, con descuento.'), sobOrcamento],
      ['briefcase', L('Escritórios', 'Offices', 'Oficinas'), L('Fora do horário comercial.', 'After business hours.', 'Fuera del horario laboral.'), sobOrcamento],
      ['armchair', L('Estofados', 'Upholstery', 'Tapicería'), L('Sofá, poltronas e colchões.', 'Sofas, armchairs and mattresses.', 'Sofás, sillones y colchones.'), aPartir(90)]
    ],
    acao: {
      titulo: pecaOrcamento,
      linha: L('A mensagem vai pronta para a Casa Limpa, que responde com o valor e o dia.', 'The message goes ready to Casa Limpa, who replies with the price and a day.', 'El mensaje llega listo a Casa Limpa, que responde con el precio y el día.'),
      botao: pedirOrcamento, abertura: L('quero um orçamento', 'I would like a quote', 'quiero un presupuesto'),
      campos: [
        { tipo: 'servico', rotulo: servico },
        { tipo: 'lista', nome: 'quartos', rotulo: L('Tamanho da casa', 'Home size', 'Tamaño de la casa'), opcoes: [L('1 a 2 quartos', '1–2 bedrooms', '1 a 2 habitaciones'), L('3 a 4 quartos', '3–4 bedrooms', '3 a 4 habitaciones'), L('5 quartos ou mais', '5+ bedrooms', '5 habitaciones o más')] },
        { tipo: 'opcoes', nome: 'quando', rotulo: L('Quando', 'When', 'Cuándo'), opcoes: [L('esta semana', 'this week', 'esta semana'), L('semana que vem', 'next week', 'la próxima semana'), L('sem pressa', 'no rush', 'sin prisa')] }
      ]
    },
    diferenciais: [
      ['users', L('Mesma equipe', 'Same team', 'Mismo equipo'), L('Gente de confiança dentro da sua casa.', 'Trusted people inside your home.', 'Gente de confianza dentro de tu casa.')],
      ['clock', L('No horário', 'On time', 'Puntuales'), L('Aviso no WhatsApp quando a equipe sai.', 'A WhatsApp heads-up when the team is on the way.', 'Aviso por WhatsApp cuando el equipo sale.')],
      linguas
    ],
    passosTitulo: comoFunciona,
    passos: [[L('Orçamento', 'Quote', 'Presupuesto'), L('Pelo WhatsApp, com fotos se quiser.', 'On WhatsApp, with photos if you like.', 'Por WhatsApp, con fotos si quieres.')], [L('Dia marcado', 'Booked', 'Día agendado'), L('Você escolhe o melhor dia.', 'You pick the best day.', 'Eliges el mejor día.')], [L('Casa limpa', 'Clean home', 'Casa limpia'), L('Pagamento depois da limpeza.', 'Pay after the cleaning.', 'Pagas después de la limpieza.')]],
    avaliacoes: [L('Chego do trabalho e a casa está impecável.', 'I get home from work and the house is spotless.', 'Llego del trabajo y la casa está impecable.'), L('Respondem rápido no WhatsApp, até de noite.', 'They reply fast on WhatsApp, even at night.', 'Responden rápido por WhatsApp, incluso de noche.'), L('Finalmente uma equipe que fala a minha língua.', 'Finally a team that speaks my language.', 'Por fin un equipo que habla mi idioma.')],
    quem,
    duvidas: [
      [L('Preciso estar em casa?', 'Do I need to be home?', '¿Tengo que estar en casa?'), L('Aqui a empresa explica como funciona a entrega da chave.', 'Here the business explains how key access works.', 'Aquí la empresa explica cómo funciona la entrega de llaves.')],
      [L('Vocês levam os produtos?', 'Do you bring supplies?', '¿Traen los productos?'), L('Sim, produtos e equipamentos estão inclusos.', 'Yes, supplies and equipment are included.', 'Sí, los productos y equipos están incluidos.')],
      [L('Como é o pagamento?', 'How do I pay?', '¿Cómo se paga?'), L('Aqui a empresa informa as formas de pagamento, como Zelle, cartão ou dinheiro.', 'Here the business lists payment options, such as Zelle, card or cash.', 'Aquí la empresa indica las formas de pago, como Zelle, tarjeta o efectivo.')],
      [L('Posso remarcar?', 'Can I reschedule?', '¿Puedo cambiar la fecha?'), L('Aqui a empresa informa a regra para remarcar ou cancelar.', 'Here the business explains its reschedule and cancellation policy.', 'Aquí la empresa explica su política para cambiar o cancelar.')]
    ],
    whats: L('Oi! Vi o site da Casa Limpa Cleaning e quero um orçamento.', 'Hi! I saw the Casa Limpa Cleaning website and I would like a quote.', '¡Hola! Vi el sitio de Casa Limpa Cleaning y quiero un presupuesto.')
  },

  'pintura-us': {
    nome: 'Silva Painting', curto: 'Silva Painting', tipo: L('Pintura e reformas', 'Painting & remodeling', 'Pintura y remodelación'), icone: 'brush',
    moeda: 'USD', telefone: '(203) 555-0168',
    galeria: [L('Pintor trabalhando na fachada de um prédio', 'Painter working on a building exterior', 'Pintor trabajando en la fachada de un edificio'), L('Varanda azul com porta preta', 'Blue porch with a black door', 'Porche azul con puerta negra'), L('Sala clara recém-pintada', 'Bright, freshly painted living room', 'Sala luminosa recién pintada')],
    fonte: ['Oswald', '500;600'],
    sobre: {
      titulo: L('Você recebe o orçamento por escrito antes de começar.', 'You get a written quote before we start.', 'Recibes el presupuesto por escrito antes de empezar.'),
      texto: L('Mande fotos das paredes e as medidas aproximadas. O orçamento diz o que está incluído, a tinta usada e o prazo, e o serviço só começa com o seu ok.', 'Send photos of the walls and rough measurements. The quote lists what is included, the paint we use and the timeline, and work only starts with your OK.', 'Envía fotos de las paredes y medidas aproximadas. El presupuesto indica qué incluye, la pintura que usamos y el plazo, y el trabajo empieza solo con tu aprobación.'),
      pontos: [L('Orçamento por escrito', 'Written quote', 'Presupuesto por escrito'), L('Chão e móveis protegidos', 'Floors and furniture protected', 'Pisos y muebles protegidos'), L('Limpeza no fim de cada dia', 'Cleanup at the end of each day', 'Limpieza al final de cada día')]
    },
    cores: ['#B8772E', '#8C5A20', '#FBF1E6'], layout: 'dividido', reto: true,
    horario: L('Seg a sex, 7h às 17h · Sáb, 8h às 12h', 'Mon–Fri 7 am–5 pm · Sat 8 am–12 pm', 'Lun a vie 7 a. m.–5 p. m. · Sáb 8 a. m.–12 p. m.'),
    endereco: L('Danbury, Bridgeport e região', 'Danbury, Bridgeport and nearby', 'Danbury, Bridgeport y alrededores'), enderecoRotulo: regiao,
    selo: L('Pintura residencial e comercial', 'Residential & commercial painting', 'Pintura residencial y comercial'),
    titulo: L('Pintura caprichada, sem sujeira e no prazo.', 'Careful painting, a clean job, on schedule.', 'Pintura cuidadosa, sin desorden y a tiempo.'),
    linha: L('Interna, externa, drywall e pequenos reparos. Mande fotos pelo WhatsApp e receba o orçamento.', 'Interior, exterior, drywall and small repairs. Send photos on WhatsApp and get your quote.', 'Interior, exterior, drywall y pequeñas reparaciones. Envía fotos por WhatsApp y recibe tu presupuesto.'),
    fatos: [[L('Orçamento', 'Quote', 'Presupuesto'), L('por foto', 'from photos', 'por fotos')], [L('Móveis', 'Furniture', 'Muebles'), L('protegidos', 'protected', 'protegidos')], [L('Limpeza', 'Cleanup', 'Limpieza'), L('no fim do serviço', 'after every job', 'al final del trabajo')]],
    altCapa: L('Pintor subindo a escada com rolo de pintura', 'Painter climbing a ladder with a paint roller', 'Pintor subiendo la escalera con un rodillo'),
    altApoio: L('Pintor passando rolo na parede', 'Painter rolling paint on a wall', 'Pintor pasando el rodillo en la pared'),
    modo: 'orcamento', servicosTitulo, servicosLinha,
    servicos: [
      ['brush', L('Pintura interna', 'Interior painting', 'Pintura interior'), L('Paredes, tetos, portas e rodapés.', 'Walls, ceilings, doors and trim.', 'Paredes, techos, puertas y zócalos.'), sobOrcamento],
      ['house', L('Pintura externa', 'Exterior painting', 'Pintura exterior'), L('Fachada, varanda e deck.', 'Siding, porches and decks.', 'Fachada, porche y deck.'), sobOrcamento],
      ['ruler', L('Drywall', 'Drywall', 'Drywall'), L('Furos, rachaduras e acabamento.', 'Holes, cracks and finishing.', 'Agujeros, grietas y acabado.'), aPartir(150)],
      ['droplets', L('Massa e textura', 'Plaster & texture', 'Masilla y textura'), L('Parede lisa antes da tinta.', 'Smooth walls before painting.', 'Paredes lisas antes de pintar.'), sobOrcamento],
      ['wrench', L('Pequenos reparos', 'Small repairs', 'Pequeñas reparaciones'), L('Portas, rodapés e vedação.', 'Doors, trim and caulking.', 'Puertas, zócalos y sellado.'), aPartir(90)],
      ['armchair', L('Armários', 'Cabinets', 'Gabinetes'), L('Pintura de armários de cozinha.', 'Kitchen cabinet painting.', 'Pintura de gabinetes de cocina.'), sobOrcamento]
    ],
    acao: {
      titulo: pecaOrcamento,
      linha: L('A mensagem vai pronta para a Silva Painting. Depois é só mandar as fotos na conversa.', 'The message goes ready to Silva Painting. Then just send the photos in the chat.', 'El mensaje llega listo a Silva Painting. Después solo envía las fotos en la conversación.'),
      botao: pedirOrcamento, abertura: L('quero um orçamento de pintura', 'I would like a painting quote', 'quiero un presupuesto de pintura'),
      campos: [
        { tipo: 'servico', rotulo: servico },
        { tipo: 'lista', nome: 'comodos', rotulo: L('Tamanho', 'Size', 'Tamaño'), opcoes: [L('1 a 2 cômodos', '1–2 rooms', '1 a 2 ambientes'), L('3 a 5 cômodos', '3–5 rooms', '3 a 5 ambientes'), L('Casa inteira', 'Whole house', 'Casa completa')] },
        { tipo: 'opcoes', nome: 'tinta', rotulo: L('Tinta', 'Paint', 'Pintura'), opcoes: [L('com tinta', 'paint included', 'con pintura'), L('só mão de obra', 'labor only', 'solo mano de obra')] }
      ]
    },
    diferenciais: [
      ['receipt', L('Preço fechado', 'Fixed price', 'Precio cerrado'), L('O valor do orçamento é o valor final.', 'The quoted price is the final price.', 'El precio del presupuesto es el precio final.')],
      ['shield-check', L('Casa protegida', 'Home protected', 'Casa protegida'), L('Chão e móveis cobertos.', 'Floors and furniture covered.', 'Pisos y muebles cubiertos.')],
      linguas
    ],
    passosTitulo: comoFunciona,
    passos: [[L('Fotos', 'Photos', 'Fotos'), L('Você manda pelo WhatsApp.', 'You send them on WhatsApp.', 'Las envías por WhatsApp.')], [L('Orçamento', 'Quote', 'Presupuesto'), L('Por escrito, com prazo.', 'In writing, with a timeline.', 'Por escrito, con plazo.')], [L('Pintura', 'Painting', 'Pintura'), L('Começa no dia combinado.', 'Starts on the agreed day.', 'Empieza el día acordado.')]],
    avaliacoes: [L('Deixaram tudo mais limpo do que encontraram.', 'They left the place cleaner than they found it.', 'Dejaron todo más limpio de lo que encontraron.'), L('Orçamento por foto em poucas horas.', 'A quote from photos within hours.', 'Presupuesto por fotos en pocas horas.'), L('Acabamento perfeito nos rodapés.', 'Perfect finish on the trim.', 'Acabado perfecto en los zócalos.')],
    quem,
    duvidas: [
      [L('Vocês dão garantia?', 'Do you offer a warranty?', '¿Dan garantía?'), L('Aqui a empresa informa a garantia do serviço.', 'Here the business states its warranty.', 'Aquí la empresa indica la garantía del trabajo.')],
      [L('Preciso sair de casa?', 'Do I need to leave home?', '¿Tengo que salir de casa?'), L('Não. A equipe trabalha por cômodo e protege o que fica.', 'No. The crew works room by room and protects what stays.', 'No. El equipo trabaja por ambiente y protege lo que queda.')],
      [L('A tinta tem cheiro forte?', 'Does the paint smell strong?', '¿La pintura huele fuerte?'), L('Aqui a empresa informa as tintas que usa.', 'Here the business lists the paints it uses.', 'Aquí la empresa indica las pinturas que usa.')],
      [L('Atendem comércio?', 'Do you do commercial jobs?', '¿Atienden negocios?'), L('Sim, lojas e escritórios, inclusive fora do horário.', 'Yes, stores and offices, including after hours.', 'Sí, tiendas y oficinas, incluso fuera de horario.')]
    ],
    whats: L('Oi! Vi o site da Silva Painting e quero um orçamento.', 'Hi! I saw the Silva Painting website and I would like a quote.', '¡Hola! Vi el sitio de Silva Painting y quiero un presupuesto.')
  },

  'mercado-us': {
    nome: 'Sabor do Brasil Market', curto: 'Sabor do Brasil', tipo: L('Mercado brasileiro', 'Brazilian market', 'Mercado brasileño'), icone: 'shopping-bag',
    moeda: 'USD', telefone: '(203) 555-0177',
    galeria: [L('Pão de queijo quentinho na travessa', 'Warm pão de queijo in a pan', 'Pão de queijo calentito en la bandeja'), L('Pão de queijo no prato', 'Pão de queijo on a plate', 'Pão de queijo en el plato'), L('Balcão da padaria', 'Bakery counter', 'Mostrador de la panadería')],
    fonte: ['Fraunces', '600;700'], serif: true,
    sobre: {
      titulo: L('Produtos do Brasil e padaria fresquinha.', 'Brazilian groceries and a fresh bakery.', 'Productos de Brasil y panadería fresca.'),
      texto: L('Do pão de queijo ao requeijão, as marcas que você conhece. A padaria assa pão francês e salgados todo dia.', 'From pão de queijo to requeijão, the brands you know. Our bakery bakes French rolls and savory snacks every day.', 'Del pão de queijo al requeijão, las marcas que conoces. La panadería hornea pan francés y bocadillos todos los días.'),
      pontos: [L('Padaria própria', 'In-house bakery', 'Panadería propia'), L('Carnes no corte brasileiro', 'Brazilian-style meat cuts', 'Cortes de carne al estilo brasileño'), L('Pedido pelo WhatsApp, sem aplicativo', 'Order on WhatsApp, no app needed', 'Pedido por WhatsApp, sin app')]
    },
    cores: ['#2E6B3A', '#214F2A', '#EAF3EC'], layout: 'foto', escuro: true,
    horario: L('Todos os dias, 9h às 20h', 'Daily, 9 am–8 pm', 'Todos los días, 9 a. m.–8 p. m.'),
    endereco: '100 Example St · Danbury, CT',
    selo: L('Mercado e padaria brasileira', 'Brazilian market & bakery', 'Mercado y panadería brasileña'),
    titulo: L('O gosto de casa, pertinho de você.', 'A taste of home, right around the corner.', 'El sabor de Brasil, cerca de ti.'),
    linha: L('Pão de queijo, guaraná, carnes e doces do Brasil. Monte o pedido aqui e retire na loja ou receba em casa.', 'Pão de queijo, guaraná, meats and sweets from Brazil. Build your order here and pick it up or get it delivered.', 'Pão de queijo, guaraná, carnes y dulces de Brasil. Arma tu pedido aquí y recógelo en la tienda o recíbelo en casa.'),
    fatos: [[L('Todo dia', 'Every day', 'Todos los días'), L('9h às 20h', '9 am to 8 pm', '9 a. m. a 8 p. m.')], [L('Retirada', 'Pickup', 'Recoger'), L('em 30 minutos', 'in 30 minutes', 'en 30 minutos')], [L('Entrega', 'Delivery', 'Entrega'), L('na região', 'nearby', 'en la zona')]],
    altCapa: L('Corredor de mercado com prateleiras cheias', 'Market aisle with full shelves', 'Pasillo de mercado con estantes llenos'),
    altApoio: L('Prateleiras com frutas frescas', 'Shelves of fresh fruit', 'Estantes con fruta fresca'),
    modo: 'pedido',
    servicosTitulo: L('Produtos', 'Products', 'Productos'),
    servicosLinha: L('Toque em + para adicionar. O total aparece no seu pedido.', 'Tap + to add. The total shows in your order.', 'Toca + para agregar. El total aparece en tu pedido.'),
    servicos: [
      ['croissant', L('Pão de queijo congelado, 1 kg', 'Frozen pão de queijo, 1 kg', 'Pão de queijo congelado, 1 kg'), L('Assa em 20 minutos.', 'Bakes in 20 minutes.', 'Se hornea en 20 minutos.'), 12.99],
      ['coffee', L('Guaraná, 2 litros', 'Guaraná soda, 2 liters', 'Guaraná, 2 litros'), L('Gelado na hora da retirada.', 'Cold at pickup.', 'Frío al recogerlo.'), 4.49],
      ['croissant', L('Pão francês, 6 unidades', 'French rolls, 6 pack', 'Pan francés, 6 unidades'), L('Saído do forno toda manhã.', 'Fresh out of the oven every morning.', 'Recién salido del horno cada mañana.'), 3.99],
      ['flame', L('Picanha, por kg', 'Picanha, per kg', 'Picanha, por kg'), L('Corte brasileiro, pronto para a grelha.', 'Brazilian cut, ready for the grill.', 'Corte brasileño, listo para la parrilla.'), 19.99],
      ['cookie', L('Brigadeiro, caixa com 12', 'Brigadeiros, box of 12', 'Brigadeiros, caja de 12'), L('Feito na casa.', 'Made in-house.', 'Hecho en casa.'), 14],
      ['cake-slice', L('Requeijão cremoso', 'Requeijão cream cheese', 'Requeijão cremoso'), L('O de copo, do jeito que você conhece.', 'The classic jar you know.', 'El de vaso, como lo conoces.'), 5.99]
    ],
    acao: {
      titulo: L('Seu pedido', 'Your order', 'Tu pedido'),
      linha: L('Confira e mande pelo WhatsApp. A loja avisa quando estiver separado.', 'Check it and send it on WhatsApp. The store lets you know when it is ready.', 'Revísalo y envíalo por WhatsApp. La tienda avisa cuando esté listo.'),
      botao: L('Fazer pedido', 'Place order', 'Hacer pedido'), abertura: L('quero fazer um pedido', 'I would like to place an order', 'quiero hacer un pedido'),
      campos: [
        { tipo: 'opcoes', nome: 'entrega', rotulo: L('Retirada ou entrega', 'Pickup or delivery', 'Recoger o entrega'), opcoes: [L('retirada', 'pickup', 'recoger'), L('entrega', 'delivery', 'entrega')] },
        { tipo: 'opcoes', nome: 'pagamento', rotulo: L('Pagamento', 'Payment', 'Pago'), opcoes: ['Zelle', L('cartão', 'card', 'tarjeta'), L('dinheiro', 'cash', 'efectivo')] }
      ]
    },
    diferenciais: [
      ['croissant', L('Padaria todo dia', 'Bakery every day', 'Panadería todos los días'), L('Pão e salgado saindo do forno.', 'Bread and snacks fresh from the oven.', 'Pan y bocadillos recién horneados.')],
      ['package', L('Separado para você', 'Packed for you', 'Apartado para ti'), L('Chega e retira, sem fila.', 'Walk in and pick up, no line.', 'Llegas y recoges, sin fila.')],
      ['message-circle', L('Pedido pelo WhatsApp', 'Order on WhatsApp', 'Pedido por WhatsApp'), L('Em português, inglês ou espanhol.', 'In English, Spanish or Portuguese.', 'En español, inglés o portugués.')]
    ],
    passosTitulo: L('Como pedir', 'How to order', 'Cómo pedir'),
    passos: [[L('Escolha', 'Pick', 'Elige'), L('Os produtos, com o total na tela.', 'Your items, with the total on screen.', 'Los productos, con el total en pantalla.')], [L('Mande', 'Send', 'Envía'), L('O pedido vai pronto pelo WhatsApp.', 'The order goes ready on WhatsApp.', 'El pedido va listo por WhatsApp.')], [L('Retire', 'Pick up', 'Recoge'), L('Ou receba em casa.', 'Or get it delivered.', 'O recíbelo en casa.')]],
    avaliacoes: [L('O pão de queijo mais parecido com o de Minas.', 'The closest pão de queijo to the real one from Minas.', 'El pão de queijo más parecido al de Minas.'), L('Faço o pedido no WhatsApp e só passo para pegar.', 'I order on WhatsApp and just swing by to pick it up.', 'Pido por WhatsApp y solo paso a recogerlo.'), L('Atendem em inglês, então meu marido também pede.', 'They speak English, so my husband orders too.', 'Atienden en inglés, así que mi esposo también pide.')],
    quem,
    duvidas: [
      [L('Qual a taxa de entrega?', 'What is the delivery fee?', '¿Cuánto cuesta la entrega?'), L('Aqui a loja informa a taxa por cidade.', 'Here the store lists the fee by town.', 'Aquí la tienda indica la tarifa por ciudad.')],
      [L('Vocês fazem bolo de encomenda?', 'Do you take cake orders?', '¿Hacen pasteles por encargo?'), L('Aqui a loja informa os bolos e o prazo da encomenda.', 'Here the store lists cakes and lead times.', 'Aquí la tienda indica los pasteles y el plazo.')],
      [L('Os preços são iguais aos da loja?', 'Are prices the same as in store?', '¿Los precios son iguales a los de la tienda?'), L('Aqui a loja explica se há diferença.', 'Here the store explains any difference.', 'Aquí la tienda explica si hay diferencia.')],
      [L('Tem estacionamento?', 'Is there parking?', '¿Hay estacionamiento?'), L('Aqui a loja informa onde estacionar.', 'Here the store says where to park.', 'Aquí la tienda indica dónde estacionar.')]
    ],
    whats: L('Oi! Vi o site do Sabor do Brasil Market e quero fazer um pedido.', 'Hi! I saw the Sabor do Brasil Market website and I would like to place an order.', '¡Hola! Vi el sitio de Sabor do Brasil Market y quiero hacer un pedido.')
  }
};
