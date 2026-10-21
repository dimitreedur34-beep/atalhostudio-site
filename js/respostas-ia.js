// Demonstração "Com IA" da página WhatsApp: respostas ensaiadas por área. É uma SIMULAÇÃO no navegador
// (um site estático não pode chamar IA sem expor a chave). Tudo fictício. O motor está em conversa-ia.js.
//
// Acrescentar uma área = acrescentar um item em RESPOSTAS_IA com a mesma chave usada em AREAS (dados.js).
// Intenção: rotulo (aparece em "o que entendeu"), palavras e responder(c).
// Palavras: começo de palavra, já sem acento (ex.: 'abre' acha "abrem"); com espaço no fim exige a palavra
// inteira ('dor '); frase com espaço no meio vale 2 pontos. Erros de digitação de uma letra também contam.
// responder(c) devolve a lista de mensagens, ou { textos, pessoa, evento, espera, nota }, ou null quando
// não sabe (aí o atendimento diz que não sabe e passa para uma pessoa).
// c = { dia, periodo, itens, tamanho, quantidade, saborDesconhecido }. A ordem das intenções desempata.
// sozinha: só vale quando nenhuma outra intenção apareceu (ex.: "obrigado").
// soEmContexto: só vale logo depois da pergunta que espera por ela (ex.: "entrega ou retirada?").

const real = (valor) => `R$ ${valor}`;
const juntar = (lista) => (lista.length < 2 ? lista.join('') : `${lista.slice(0, -1).join(', ')} e ${lista.at(-1)}`);

// Intenções que toda área tem. equipe: quem assume a conversa; quando: quando essa pessoa responde.
function comuns(area) {
  return {
    pessoa: {
      rotulo: 'pedido para falar com uma pessoa',
      palavras: ['falar com', 'atendente', 'pessoa', 'humano', 'alguem', 'recepcao', 'secretaria', 'vendedora', 'gerente', 'responsavel', 'dono '],
      responder: () => ({ textos: [`Combinado! Passei a conversa para ${area.equipe}, ${area.quando}.`], pessoa: true, nota: `Pediu uma pessoa: a conversa foi para ${area.equipe}.` })
    },
    robo: {
      rotulo: 'pergunta se é robô',
      palavras: ['robo', 'bot ', 'maquina', 'inteligencia artificial', 'automatico', 'de verdade'],
      responder: () => [`Sou o atendimento automático ${area.da} ${area.negocio}. Respondo na hora, só com as informações que a equipe aprovou.`, 'Se preferir falar com uma pessoa, é só pedir.']
    },
    agradecimento: {
      rotulo: 'agradecimento', sozinha: true,
      palavras: ['obrigad', 'valeu', 'agradec', 'show ', 'otimo', 'perfeito', 'beleza', 'ok ', 'ta bom', 'esta bom', 'entendi'],
      responder: () => ['Por nada! Se precisar, é só chamar.']
    },
    tchau: {
      rotulo: 'despedida', sozinha: true,
      palavras: ['tchau', 'ate mais', 'ate logo', 'falou', 'flw', 'bye'],
      responder: () => ['Até mais! Qualquer coisa, é só chamar por aqui.']
    },
    negativo: {
      rotulo: 'resposta "não"', sozinha: true,
      palavras: ['nao ', 'agora nao', 'deixa', 'depois'],
      responder: () => ['Tudo bem! Se precisar, é só chamar.']
    },
    saudacao: {
      rotulo: 'cumprimento', sozinha: true,
      palavras: ['oi ', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'e ai', 'opa', 'tudo bem', 'alo'],
      responder: (c) => (c.primeira ? [`Pode perguntar do seu jeito: ${area.dica}.`] : ['Oi! Em que posso ajudar?'])
    }
  };
}

// Horário a partir de uma tabela simples: semana, sábado, domingo (null = fechado).
function responderHorario(c, horas, fechadoTexto) {
  const { semana, sabado } = horas;
  const resumo = `De segunda a sexta, ${semana}. Sábado, ${sabado}. Domingo e feriado, ${fechadoTexto}.`;
  if (c.dia === 'domingo' || c.dia === 'feriado') return [`${c.dia === 'domingo' ? 'Domingo' : 'Feriado'} a gente fica fechado.`, resumo];
  if (c.dia === 'sabado' || c.dia === 'fds') {
    if (c.periodo === 'tarde' || c.periodo === 'noite') return [`Sábado à ${c.periodo} não: no sábado atendemos ${sabado}.`];
    return [`${c.periodo === 'manha' ? 'Sábado de manhã sim!' : 'Sábado sim!'} Atendemos ${sabado}.`, ...(c.dia === 'fds' ? ['Domingo, fechado.'] : [])];
  }
  if (c.periodo === 'noite') return [`À noite não. De segunda a sexta atendemos ${semana}.`];
  if (c.dia) return [`Sim! De segunda a sexta atendemos ${semana}.`];
  return [resumo];
}

const clinica = {
  equipe: 'a recepção',
  quando: 'que te responde a partir das 8h',
  aprovou: 'a clínica aprovou',
  dica: 'horário, valores, convênio, endereço ou marcar consulta',
  menu: [['Horários', 'horario'], ['Valores', 'preco'], ['Marcar consulta', 'marcar'], ['Falar com a recepção', 'pessoa']],
  exemplos: ['vcs abrem sábado de manhã?', 'quanto é a limpeza?', 'tô com dor de dente', 'aceita convênio?', 'atendem criança de 3 anos?', 'quero falar com alguém'],
  itemIntencao: 'preco',
  itens: {
    limpeza: { nome: 'limpeza', a: 'a', palavras: ['limpeza', 'limpar', 'profilaxia', 'tartaro'], preco: 150 },
    avaliacao: { nome: 'avaliação', a: 'a', palavras: ['avaliac', 'consulta'], preco: 80 },
    clareamento: { nome: 'clareamento', a: 'o', palavras: ['clarea', 'branquea'] },
    canal: { nome: 'tratamento de canal', a: 'o', palavras: ['canal '] },
    aparelho: { nome: 'aparelho', a: 'o', palavras: ['aparelho', 'ortodon'] },
    implante: { nome: 'implante', a: 'o', palavras: ['implante'] },
    restauracao: { nome: 'restauração', a: 'a', palavras: ['restaura', 'obtura', 'carie'] },
    extracao: { nome: 'extração', a: 'a', palavras: ['extrac', 'extrai', 'arrancar', 'siso'] }
  },
  intencoes: {
    urgencia: {
      rotulo: 'dor ou urgência',
      palavras: ['dor ', 'dores', 'doendo', 'doi ', 'doeu', 'inchad', 'inchaco', 'sangr', 'quebr', 'urgen', 'emergen', 'latej', 'socorro'],
      responder: () => ({
        textos: ['Sinto muito pela dor. Por aqui eu não consigo avaliar o seu caso.', 'Para urgência, ligue (33) 0000-0000. Já avisei a recepção para te dar prioridade às 8h.'],
        pessoa: true,
        nota: 'Dor é urgência: vai direto para uma pessoa. O atendimento não dá orientação de saúde.'
      })
    },
    marcar: {
      rotulo: 'pedido de horário',
      palavras: ['marcar', 'marca ', 'agendar', 'agenda', 'consulta', 'tem horario', 'tem vaga', 'vaga', 'encaixe', 'horario livre'],
      responder: (c) => {
        if (c.dia === 'domingo' || c.dia === 'feriado') return { textos: ['Domingo e feriado a clínica fica fechada.', 'Tenho horários a partir de segunda. Me diz seu nome e o melhor período, manhã ou tarde.'], espera: 'anotar' };
        const quando = c.dia === 'sabado' ? 'Sábado, das 8h às 12h, ainda tem vaga.' : `Tem horário${c.periodo === 'manha' ? ' de manhã' : c.periodo === 'tarde' ? ' à tarde' : ''} sim.`;
        return { textos: [quando, 'Me diz seu nome e o melhor período, manhã ou tarde, que a recepção confirma o horário exato com você.'], espera: 'anotar' };
      }
    },
    preco: {
      rotulo: 'pergunta de valor', usaMemoria: true,
      palavras: ['quanto', 'preco', 'valor', 'custa', 'cobra', 'sai por', 'orcamento', 'caro', 'barato'],
      responder: (c) => {
        const item = c.itens[0];
        if (!item) return { textos: ['A avaliação custa R$ 80 e a limpeza, R$ 150. Os outros tratamentos dependem da avaliação.', 'Quer pedir um horário?'], espera: 'marcar' };
        if (item.preco) return { textos: [`${item.a === 'a' ? 'A' : 'O'} ${item.nome} custa ${real(item.preco)}${item.nome === 'avaliação' ? ' e é descontada se você fizer o tratamento' : ', com avaliação incluída'}.`, 'Quer pedir um horário?'], espera: 'marcar' };
        return { textos: [`O valor d${item.a} ${item.nome} depende da avaliação, porque muda de caso para caso.`, 'A avaliação custa R$ 80 e é descontada se você fizer o tratamento. Quer pedir um horário?'], espera: 'marcar', nota: 'Sem valor aprovado para esse tratamento: o atendimento não chuta um preço.' };
      }
    },
    pagamento: {
      rotulo: 'forma de pagamento',
      palavras: ['pix', 'cartao', 'credito', 'debito', 'parcel', 'vezes', 'dinheiro', 'pagamento', 'pagar', 'boleto'],
      responder: () => ['Aceitamos Pix, débito e crédito em até 6 vezes sem juros nos tratamentos.']
    },
    horario: {
      rotulo: 'horário de funcionamento',
      palavras: ['abre', 'abrem', 'abert', 'abrir', 'funciona', 'fecha', 'que horas', 'horario', 'expediente', 'sabado', 'domingo', 'feriado', 'segunda', 'fim de semana'],
      responder: (c) => responderHorario(c, { semana: 'das 8h às 18h', sabado: 'das 8h às 12h' }, 'fechado')
    },
    convenio: {
      rotulo: 'convênio',
      palavras: ['convenio', 'plano ', 'planos', 'unimed', 'amil', 'odontoprev', 'particular'],
      responder: () => ['Atendemos particular e pelos convênios Dental Bem e Sorriso Mais.', 'Se o seu for outro, a recepção confere para você amanhã.']
    },
    endereco: {
      rotulo: 'endereço',
      palavras: ['onde fica', 'onde e', 'endereco', 'localiza', 'como chego', 'chegar', 'estaciona', 'telefone'],
      responder: () => ['Ficamos na Rua das Acácias, 120, Centro. Tem estacionamento na rua em frente.', 'Telefone: (33) 0000-0000.']
    },
    anotar: {
      rotulo: 'nome e período para a consulta', soEmContexto: true,
      palavras: ['manha', 'tarde', 'meu nome', 'me chamo', 'prefiro', 'qualquer', 'tanto faz', 'cedo'],
      responder: () => ({ textos: ['Anotado!', 'A recepção confirma o horário exato com você amanhã cedo, por aqui mesmo.'], evento: 'Pedido anotado para a recepção', nota: 'O pedido fica marcado para a recepção confirmar. O cliente da noite não se perde.' })
    }
  }
};

const SABORES = {
  mussarela: { nome: 'mussarela', palavras: ['mussarela', 'mucarela', 'muzzarela', 'mozarela', 'muzarela'], preco: 48 },
  margherita: { nome: 'margherita', palavras: ['margherita', 'marguerita', 'margarita'], preco: 52 },
  calabresa: { nome: 'calabresa', palavras: ['calabresa'], preco: 54 },
  frango: { nome: 'frango com catupiry', palavras: ['frango', 'catupir'], preco: 58 },
  portuguesa: { nome: 'portuguesa', palavras: ['portuguesa'], preco: 58 },
  queijos: { nome: 'quatro queijos', palavras: ['quatro queijo', '4 queijo'], preco: 62 },
  chocolate: { nome: 'chocolate', palavras: ['chocolate', 'brigadeiro'], preco: 50 }
};
const cardapio = () => Object.values(SABORES).map((s) => `${s.nome[0].toUpperCase()}${s.nome.slice(1)} ${real(s.preco)}`).join(' · ');

const pizzaria = {
  equipe: 'o atendente',
  quando: 'que te responde em instantes',
  aprovou: 'a pizzaria aprovou',
  dica: 'cardápio, preço, entrega, pagamento ou fazer o pedido',
  menu: [['Cardápio', 'cardapio'], ['Fazer pedido', 'pedido'], ['Entrega', 'entrega'], ['Falar com atendente', 'pessoa']],
  exemplos: ['tem pizza de camarão?', 'quero uma calabresa', 'quanto tempo demora a entrega?', 'aceita pix?', 'abrem segunda?', 'minha pizza tá atrasada'],
  itemIntencao: 'cardapio',
  itens: SABORES,
  intencoes: {
    reclamacao: {
      rotulo: 'reclamação',
      palavras: ['atrasad', 'atrasou', 'demorando', 'demorou', 'nao chegou', 'cade', 'fria ', 'frio ', 'errad', 'reclama', 'queimad', 'pessim', 'horrivel'],
      responder: () => ({ textos: ['Sinto muito! Passei sua mensagem agora para o gerente, com o seu pedido em destaque.', 'Ele te responde aqui em instantes.'], pessoa: true, evento: 'Conversa passada para o gerente', nota: 'Reclamação não fica com o robô: vai direto para uma pessoa, com prioridade.' })
    },
    pedido: {
      rotulo: 'pedido', usaMemoria: true,
      palavras: ['quero uma', 'quero um', 'quero pizza', 'quero duas', 'vou querer', 'pedir', 'pedido', 'manda uma', 'manda duas', 'me ve', 'fazer um pedido', 'encomend'],
      responder: (c) => {
        const item = c.itens[0];
        if (!item) return { textos: ['Claro! Qual sabor?', cardapio()], espera: 'pedido' };
        const n = c.quantidade || 1;
        const nome = n > 1 ? `${n} ${item.nome === 'calabresa' ? 'calabresas' : `pizzas de ${item.nome}`}` : `1 ${item.nome}`;
        return { textos: [`Anotado: ${nome}, ${real(item.preco * n)}.`, 'Vai ser entrega ou retirada?'], espera: 'modo' };
      }
    },
    cardapio: {
      rotulo: 'sabor ou cardápio', usaMemoria: true,
      palavras: ['cardapio', 'sabor', 'menu', 'opcoes', 'quais pizza', 'que pizza', 'tem pizza', 'pizza de', 'tem de'],
      responder: (c) => {
        const item = c.itens[0];
        if (item) return { textos: [`Tem sim! A ${item.nome} sai por ${real(item.preco)}, grande, com 8 fatias.`, 'Quer pedir?'], espera: 'pedido' };
        if (c.saborDesconhecido) return { textos: [`Pizza de ${c.saborDesconhecido} não tem no nosso cardápio.`, `Os sabores são: ${cardapio()}`], nota: 'Esse sabor não está no cardápio aprovado: o atendimento diz que não tem, em vez de inventar.' };
        return { textos: [cardapio(), 'Todas grandes, com 8 fatias. Quer pedir?'], espera: 'pedido' };
      }
    },
    preco: {
      rotulo: 'pergunta de valor', usaMemoria: true,
      palavras: ['quanto', 'preco', 'valor', 'custa', 'sai por', 'caro'],
      responder: (c) => (c.itens[0] ? { textos: [`A ${c.itens[0].nome} sai por ${real(c.itens[0].preco)}, grande, com 8 fatias.`, 'Quer pedir?'], espera: 'pedido' } : [cardapio(), 'Todas grandes, com 8 fatias.'])
    },
    entrega: {
      rotulo: 'entrega',
      palavras: ['entreg', 'delivery', 'taxa', 'frete', 'quanto tempo', 'demora', 'motoboy', 'chega em'],
      responder: () => ['Entregamos em até 5 km da pizzaria, com taxa de R$ 6.', 'Leva de 40 a 60 minutos depois do pedido confirmado.']
    },
    tamanho: {
      rotulo: 'tamanho',
      palavras: ['tamanho', 'grande', 'media', 'pequena', 'broto', 'fatia', 'pedaco', 'quantas pessoas', 'serve quantas', 'familia'],
      responder: () => ['Nossas pizzas são grandes, com 8 fatias. Servem bem 2 ou 3 pessoas.']
    },
    horario: {
      rotulo: 'horário de funcionamento',
      palavras: ['abre', 'abrem', 'abert', 'abrir', 'funciona', 'fecha', 'que horas', 'horario', 'sabado', 'domingo', 'feriado', 'segunda'],
      responder: (c) => {
        const horas = 'Abrimos de terça a domingo, das 18h às 23h30.';
        if (c.dia === 'segunda') return ['Segunda a gente fecha para descanso.', horas];
        if (c.periodo === 'manha' || c.periodo === 'tarde') return [`De ${c.periodo === 'manha' ? 'manhã' : 'tarde'} não: o forno liga às 18h.`, horas];
        if (c.dia === 'hoje' || !c.dia) return ['Estamos abertos agora, até 23h30.', horas];
        return [horas];
      }
    },
    pagamento: {
      rotulo: 'forma de pagamento',
      palavras: ['pix', 'cartao', 'credito', 'debito', 'dinheiro', 'troco', 'maquin', 'pagamento', 'pagar', 'vale refeicao'],
      responder: () => ['Pix, cartão (a maquininha vai com o motoboy) ou dinheiro.', 'Se precisar de troco, é só avisar o valor.']
    },
    endereco: {
      rotulo: 'endereço',
      palavras: ['onde fica', 'onde e', 'endereco', 'localiza', 'como chego'],
      responder: () => ['Ficamos na Rua das Palmeiras, 45, Centro.']
    },
    modo: {
      rotulo: 'entrega ou retirada', soEmContexto: true,
      palavras: ['retirada', 'retirar', 'retiro', 'buscar', 'busco', 'vou ai', 'entreg'],
      responder: (c) => (c.texto.includes(' retir') || c.texto.includes(' busc') || c.texto.includes(' vou ai')
        ? { textos: ['Combinado: retirada no balcão, na Rua das Palmeiras, 45, Centro.', 'Fica pronta em 30 a 40 minutos.'], evento: 'Pedido enviado para a cozinha', nota: 'O pedido chega completo para a cozinha, sem ninguém parar o forno para digitar.' }
        : { textos: ['Me manda o endereço com número e um ponto de referência.'], espera: 'endereco_cliente' })
    },
    endereco_cliente: {
      rotulo: 'endereço de entrega', soEmContexto: true,
      palavras: ['rua ', 'avenida', 'av ', 'bairro', 'numero', 'apto', 'apartamento', 'perto d'],
      responder: () => ({ textos: ['Endereço anotado! Seu pedido entrou na fila da cozinha e chega em 40 a 60 minutos.', 'Pagamento na entrega: Pix, cartão ou dinheiro.'], evento: 'Pedido enviado para a cozinha', nota: 'O pedido chega completo para a cozinha, sem ninguém parar o forno para digitar.' })
    }
  }
};

// Loja: cada peça tem grupo (para "e o preto?"), cor e tamanhos em estoque.
const PECAS = {
  vestidoAzul: { nome: 'vestido azul', a: 'o', grupo: 'vestido', palavras: ['vestido'], cor: ['azul'], preco: 189, tamanhos: ['M', 'G'] },
  vestidoPreto: { nome: 'vestido preto', a: 'o', grupo: 'vestido', palavras: ['vestido'], cor: ['pret'], preco: 189, tamanhos: ['P', 'M', 'G'] },
  vestidoVerde: { nome: 'vestido verde-oliva', a: 'o', grupo: 'vestido', palavras: ['vestido'], cor: ['verde', 'oliva'], preco: 189, tamanhos: ['M', 'G'] },
  blusaBranca: { nome: 'blusa de linho branca', a: 'a', grupo: 'blusa', palavras: ['blusa', 'camisa'], cor: ['branc'], preco: 129, tamanhos: ['P', 'M', 'G', 'GG'] },
  blusaBege: { nome: 'blusa de linho bege', a: 'a', grupo: 'blusa', palavras: ['blusa', 'camisa'], cor: ['bege'], preco: 129, tamanhos: ['M', 'G'] },
  calca: { nome: 'calça pantalona preta', a: 'a', grupo: 'calca', palavras: ['calca', 'pantalona'], cor: ['pret'], preco: 159, tamanhos: ['38', '40', '42'] },
  saia: { nome: 'saia midi caramelo', a: 'a', grupo: 'saia', palavras: ['saia'], cor: ['caramelo', 'marrom'], preco: 139, tamanhos: ['P', 'M'] }
};
const art = (peca) => (peca.a === 'a' ? 'A' : 'O');
const tamanhosTexto = (peca) => juntar(peca.tamanhos.map((t) => `no ${t}`));
const cores = (pecas) => juntar(pecas.map((p) => p.nome.replace(/^(vestido|blusa de linho|calça pantalona|saia midi) /, '')));

const loja = {
  da: 'do',
  equipe: 'a vendedora',
  quando: 'que assume a conversa em instantes',
  aprovou: 'a loja aprovou',
  dica: 'peça, tamanho, preço, troca ou entrega',
  menu: [['Horários', 'horario'], ['Valores', 'preco'], ['Trocas', 'troca'], ['Falar com a vendedora', 'pessoa']],
  exemplos: ['tem o vestido azul no P?', 'quanto é a calça preta?', 'dá pra trocar se não servir?', 'abre sábado?', 'aceita pix?', 'vocês têm vale-presente?'],
  itemIntencao: 'estoque',
  itens: PECAS,
  intencoes: {
    reserva: {
      rotulo: 'pedido de reserva', usaMemoria: true,
      palavras: ['separa', 'reserva', 'guarda', 'vou levar', 'quero comprar', 'quero esse', 'quero essa', 'quero o ', 'quero a ', 'comprar'],
      responder: (c) => {
        const peca = c.itens[0];
        if (!peca) return null;
        const tamanho = c.tamanho && peca.tamanhos.includes(c.tamanho) ? `, tamanho ${c.tamanho}` : '';
        return { textos: [`Pedido de reserva anotado: ${peca.nome}${tamanho}.`, 'A vendedora confirma com você e combina a retirada ou a entrega.'], evento: 'Reserva enviada para a vendedora', nota: 'A reserva vai para a vendedora confirmar. A cliente não compra em outra loja enquanto espera.' };
      }
    },
    estoque: {
      rotulo: 'pergunta de estoque', usaMemoria: true,
      palavras: ['tem ', 'ainda tem', 'disponivel', 'chegou', 'tamanho', 'numero', 'outra cor', 'outras cores', 'cores'],
      responder: (c) => {
        if (!c.itens.length) return null;
        const outrasCores = c.texto.includes(' outra cor') || c.texto.includes(' outras cores') || c.texto.includes(' cores ');
        if (c.itens.length > 1 || outrasCores) {
          const grupo = Object.values(PECAS).filter((p) => p.grupo === c.itens[0].grupo);
          return { textos: [`Tem em ${cores(grupo)}.`, 'Qual cor você prefere?'] };
        }
        const peca = c.itens[0];
        if (!c.tamanho) return { textos: [`${art(peca)} ${peca.nome} tem ${tamanhosTexto(peca)}, por ${real(peca.preco)}.`, 'Quer que eu peça para separar?'], espera: 'reserva' };
        if (peca.tamanhos.includes(c.tamanho)) return { textos: [`Tem sim! ${art(peca)} ${peca.nome} no ${c.tamanho} está disponível, por ${real(peca.preco)}.`, 'Quer que eu peça para separar?'], espera: 'reserva' };
        const outra = Object.values(PECAS).find((p) => p.grupo === peca.grupo && p !== peca && p.tamanhos.includes(c.tamanho));
        return { textos: [`${art(peca)} ${peca.nome} no ${c.tamanho} acabou. Tem ${tamanhosTexto(peca)}.`, ...(outra ? [`No ${c.tamanho}, tem ${outra.a} ${outra.nome}.`] : [])], nota: 'O atendimento consulta o estoque cadastrado e oferece o que tem, em vez de deixar a cliente sem resposta.' };
      }
    },
    preco: {
      rotulo: 'pergunta de valor', usaMemoria: true,
      palavras: ['quanto', 'preco', 'valor', 'custa', 'sai por', 'caro'],
      responder: (c) => (c.itens[0]
        ? { textos: [`${art(c.itens[0])} ${c.itens[0].nome} sai por ${real(c.itens[0].preco)}.`, 'Quer que eu peça para separar?'], espera: 'reserva' }
        : ['Vestidos R$ 189 · blusas de linho R$ 129 · calça pantalona R$ 159 · saia midi R$ 139.'])
    },
    troca: {
      rotulo: 'troca', palavras: ['troca', 'trocar', 'devolv', 'devoluc', 'nao serv', 'ficou pequen', 'ficou grande', 'defeito', 'arrepend'],
      responder: () => ['Pode trocar em até 30 dias, com etiqueta e nota.', 'Em compra feita pelo WhatsApp ou pela internet, você também pode desistir em até 7 dias depois de receber.']
    },
    entrega: {
      rotulo: 'entrega', palavras: ['entreg', 'envia', 'enviam', 'frete', 'correio', 'sedex', 'mandam', 'retirar', 'buscar'],
      responder: () => ['Entregamos na cidade por R$ 10 e enviamos pelos Correios para todo o Brasil.', 'Se preferir, pode retirar na loja sem custo.']
    },
    horario: {
      rotulo: 'horário de funcionamento',
      palavras: ['abre', 'abrem', 'abert', 'abrir', 'funciona', 'fecha', 'que horas', 'horario', 'sabado', 'domingo', 'feriado', 'segunda', 'fim de semana'],
      responder: (c) => responderHorario(c, { semana: 'das 9h às 18h', sabado: 'das 9h às 13h' }, 'fechado')
    },
    pagamento: {
      rotulo: 'forma de pagamento', palavras: ['pix', 'cartao', 'credito', 'debito', 'parcel', 'vezes', 'dinheiro', 'pagamento', 'pagar'],
      responder: () => ['Pix, débito ou crédito em até 3 vezes sem juros.']
    },
    endereco: {
      rotulo: 'endereço', palavras: ['onde fica', 'onde e', 'endereco', 'localiza', 'como chego'],
      responder: () => ['Ficamos na Rua dos Ipês, 88, Centro, ao lado da praça.']
    }
  }
};

// Junta as intenções da área com as comuns. Ordem: urgências e pedidos de pessoa primeiro.
function montar(area, negocio) {
  area = { da: 'da', ...area };
  const base = comuns({ ...area, negocio });
  const { urgencia, reclamacao, ...resto } = area.intencoes;
  const intencoes = { ...(urgencia && { urgencia }), ...(reclamacao && { reclamacao }), pessoa: base.pessoa, robo: base.robo, ...resto, agradecimento: base.agradecimento, tchau: base.tchau, negativo: base.negativo, saudacao: base.saudacao };
  return { ...area, negocio, intencoes };
}

export const RESPOSTAS_IA = {
  clinica: montar(clinica, 'Clínica Sorriso Vivo'),
  pizzaria: montar(pizzaria, 'Bella Massa'),
  loja: montar(loja, 'Ateliê Lume')
};

