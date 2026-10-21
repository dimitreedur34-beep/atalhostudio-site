// Negócios do molde de site. Cada um vira um site completo em modelos/molde/index.html?negocio=<id>.
// Fotos em fotos/<id>-capa.webp e fotos/<id>-apoio.webp. Nomes, números e avaliações são de exemplo.
//
// layout: 'dividido' (texto e foto lado a lado), 'foto' (foto de fundo) ou 'cartao' (bloco colorido com foto).
// modo: 'agenda' (pedido de horário), 'pedido' (carrinho com total) ou 'orcamento' (pedido de orçamento).
// servicos: [ícone, nome, descrição, preço ou detalhe]. No modo 'pedido' o preço é um número.
// campos do formulário: { tipo: 'servico' | 'opcoes' | 'lista', nome, rotulo, opcoes }.
// Profissões com regras de publicidade (saúde, psicologia, advocacia) não mostram preço nem promessa de resultado.
// fonte (opcional): fonte dos títulos no Google Fonts, ['Nome', 'pesos']. sobre (opcional): seção Sobre com a foto
// de apoio ({ titulo, texto, pontos, assinatura }); com ela, o contato mostra um mapa ilustrativo no lugar da foto.
// galeria (opcional): textos alternativos das fotos fotos/<id>-galeria-1.webp, -2 e -3 (Unsplash, ver fotos/CREDITOS.txt).

const DIAS = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const DIAS_TER_SAB = DIAS.slice(1);

export const NEGOCIOS = {
  medica: {
    nome: 'Clínica Vida Plena', curto: 'Vida Plena', tipo: 'Clínica médica', icone: 'stethoscope',
    galeria: ['Recepção da clínica', 'Médico conversando com um paciente no consultório', 'Estetoscópio sobre a mesa'],
    fonte: ['Plus Jakarta Sans', '600;700'],
    sobre: {
      titulo: 'Uma clínica de bairro, com estrutura de centro médico.',
      texto: 'Consultas, exames e vacinas no mesmo endereço, para você resolver mais com menos idas. A equipe conhece os pacientes pelo nome e acompanha cada caso de perto.',
      pontos: ['Médicos com registro no CRM', 'Coleta de exames no próprio local', 'Prontuário organizado e sigiloso'],
      assinatura: 'Responsável técnico · CRM-MG 00000 (exemplo)'
    },
    cores: ['#2F6E8C', '#235670', '#E7F1F5'], layout: 'dividido',
    horario: 'Seg a sex, 7h às 19h · Sáb, 7h às 12h', endereco: 'Rua Exemplo, 210 · Centro',
    selo: 'Clínica geral e especialidades',
    titulo: 'Consulta marcada sem fila e sem ligação.',
    linha: 'Clínico geral, pediatria, cardiologia e ginecologia. Peça o seu horário pelo WhatsApp, a qualquer hora.',
    fatos: [['Seg a sáb', 'com hora marcada'], ['Particular', 'e convênios'], ['Exames', 'no mesmo lugar']],
    altCapa: 'Médica atendendo no consultório', altApoio: 'Médica conversando com um paciente',
    modo: 'agenda',
    servicosTitulo: 'Especialidades', servicosLinha: 'Toque em "Quero esse" e o pedido de horário já vem preenchido.',
    servicos: [
      ['stethoscope', 'Clínico geral', 'Consulta de rotina, check-up e pedidos de exame.', 'Consulta de 30 min'],
      ['baby', 'Pediatria', 'Acompanhamento do crescimento e vacinas em dia.', 'Consulta de 30 min'],
      ['heart-pulse', 'Cardiologia', 'Avaliação do coração, com eletrocardiograma.', 'Com exame no local'],
      ['flower-2', 'Ginecologia', 'Consulta preventiva e acompanhamento.', 'Consulta de 30 min'],
      ['microscope', 'Exames de sangue', 'Coleta sem precisar ir a outro endereço.', 'Seg a sáb, 7h às 10h'],
      ['syringe', 'Vacinas', 'Calendário adulto e infantil.', 'Sem agendamento']
    ],
    acao: {
      titulo: 'Peça seu horário', linha: 'A mensagem vai pronta para o WhatsApp da clínica. A recepção confirma com você.',
      botao: 'Pedir horário', abertura: 'quero marcar uma consulta',
      campos: [
        { tipo: 'servico', rotulo: 'Especialidade' },
        { tipo: 'opcoes', nome: 'periodo', rotulo: 'Período', opcoes: ['manhã', 'tarde'] },
        { tipo: 'lista', nome: 'atendimento', rotulo: 'Atendimento', opcoes: ['Particular', 'Convênio'] },
        { tipo: 'lista', nome: 'dia', rotulo: 'Dia preferido', opcoes: DIAS }
      ]
    },
    diferenciais: [
      ['clock', 'Pouca espera', 'Horário marcado de verdade, com lembrete na véspera.'],
      ['microscope', 'Exames no mesmo lugar', 'Consulta e coleta no mesmo endereço.'],
      ['message-circle', 'Aviso pelo WhatsApp', 'Mensagem quando o resultado do exame fica pronto.']
    ],
    passosTitulo: 'Como marcar',
    passos: [['Você pede o horário', 'Pelo WhatsApp, a qualquer hora.'], ['A recepção confirma', 'Com o dia, a hora e o que levar.'], ['Lembrete na véspera', 'Para ninguém esquecer.']],
    avaliacoes: ['Marquei à noite pelo WhatsApp e de manhã já estava confirmado.', 'Fui atendida no horário marcado.', 'Os exames saíram rápido e me avisaram.'],
    quem: 'Paciente de exemplo',
    duvidas: [
      ['Vocês atendem convênio?', 'Aqui a clínica informa os convênios que aceita.'],
      ['Precisa de pedido médico para exame?', 'Depende do exame. A recepção orienta pelo WhatsApp.'],
      ['Atendem urgência?', 'Para urgência e emergência, procure um pronto-socorro ou ligue 192.'],
      ['Tem estacionamento?', 'Aqui a clínica explica onde estacionar.']
    ],
    whats: 'Oi! Vi o site da Clínica Vida Plena e quero marcar uma consulta.'
  },

  psicologo: {
    nome: 'Espaço Escuta Psicologia', curto: 'Espaço Escuta', tipo: 'Psicologia', icone: 'brain',
    galeria: ['Sala de atendimento com sofá e mesa de madeira', 'Duas pessoas conversando sentadas', 'Sala de espera com cadeiras brancas e plantas'],
    fonte: ['Fraunces', '500;600'],
    sobre: {
      titulo: 'Um lugar seguro para conversar.',
      texto: 'Atendimento com psicóloga registrada no Conselho Regional de Psicologia, com escuta sem julgamento e sigilo profissional. O ritmo é o seu: o processo é construído junto, sessão a sessão.',
      pontos: ['Sigilo garantido pelo Código de Ética', 'Presencial ou online, com a mesma atenção', 'Primeira conversa para entender o que você busca'],
      assinatura: 'Psicóloga · CRP 00/00000 (exemplo)'
    },
    cores: ['#9A5A44', '#7C4835', '#F6ECE6'], layout: 'cartao', serif: true,
    horario: 'Seg a sex, 8h às 20h', endereco: 'Rua Exemplo, 88 · sala 3 · Centro',
    selo: 'Psicóloga · CRP 00/00000 (exemplo)',
    titulo: 'Um espaço para falar e ser ouvido, no seu tempo.',
    linha: 'Psicoterapia para adultos e adolescentes, presencial ou online. Marque a primeira conversa pelo WhatsApp, sem precisar ligar.',
    fatos: [['Presencial', 'ou online'], ['50 minutos', 'por sessão'], ['Sigilo', 'sempre']],
    altCapa: 'Sessão de terapia em uma sala acolhedora', altApoio: 'Psicóloga fazendo anotações',
    modo: 'agenda',
    servicosTitulo: 'Atendimentos', servicosLinha: 'A primeira conversa ajuda a definir o melhor caminho para você.',
    servicos: [
      ['armchair', 'Psicoterapia individual', 'Para ansiedade, luto, mudanças e o que estiver pesando.', '50 min'],
      ['users', 'Adolescentes', 'Com acolhimento e conversa com a família quando precisa.', '50 min'],
      ['hand-heart', 'Casal', 'Para melhorar a conversa e decidir juntos.', '80 min'],
      ['monitor', 'Online', 'Por vídeo, de onde você estiver.', '50 min']
    ],
    acao: {
      titulo: 'Marque a primeira conversa', linha: 'A mensagem vai pronta para a psicóloga, que responde em até um dia útil.',
      botao: 'Marcar conversa', abertura: 'quero marcar uma primeira conversa',
      campos: [
        { tipo: 'servico', rotulo: 'Atendimento' },
        { tipo: 'opcoes', nome: 'formato', rotulo: 'Formato', opcoes: ['presencial', 'online'] },
        { tipo: 'opcoes', nome: 'periodo', rotulo: 'Período', opcoes: ['manhã', 'tarde', 'noite'] }
      ]
    },
    diferenciais: [
      ['shield-check', 'Sigilo profissional', 'O que é dito na sessão fica na sessão.'],
      ['calendar', 'Horário fixo', 'Você tem o seu horário garantido na semana.'],
      ['monitor', 'Online quando precisar', 'Viajou ou choveu? A sessão continua.']
    ],
    passosTitulo: 'Como começa',
    passos: [['Primeira conversa', 'Para entender o que você procura.'], ['Combinamos juntos', 'Frequência, horário e formato.'], ['Sessões semanais', 'Com espaço para ajustar quando precisar.']],
    avaliacoes: null,
    duvidas: [
      ['Como funciona a sessão online?', 'Por vídeo, num link enviado antes do horário. Basta um lugar reservado e internet.'],
      ['Atende convênio?', 'Aqui a psicóloga informa se atende convênio ou emite recibo para reembolso.'],
      ['Quanto tempo dura a terapia?', 'Depende de cada pessoa. Isso é conversado ao longo das sessões.'],
      ['E se eu estiver em crise agora?', 'Ligue 188, o CVV, de graça e 24 horas. Em emergência, ligue 192.']
    ],
    nota: 'Precisando conversar agora? Ligue 188 (CVV), de graça, 24 horas.',
    whats: 'Oi! Vi o site do Espaço Escuta e quero marcar uma primeira conversa.'
  },

  fisioterapia: {
    nome: 'Movimento Fisioterapia', curto: 'Movimento', tipo: 'Fisioterapia e pilates', icone: 'activity',
    galeria: ['Fisioterapeuta examinando a perna de um paciente', 'Massagem terapêutica no ombro', 'Exercício com bola de pilates'],
    fonte: ['Outfit', '600;700'],
    sobre: {
      titulo: 'Tratamento acompanhado de perto, do primeiro ao último dia.',
      texto: 'Cada paciente passa por avaliação antes de começar. O plano de exercícios é pensado para a sua rotina, e o fisioterapeuta acompanha a evolução em todas as sessões.',
      pontos: ['Avaliação antes de começar', 'Turmas pequenas no pilates', 'Exercícios para fazer em casa'],
      assinatura: 'Fisioterapeuta · CREFITO-4 000000-F (exemplo)'
    },
    cores: ['#2F7F72', '#23645A', '#E4F2EF'], layout: 'dividido', reto: true,
    horario: 'Seg a sex, 6h às 20h', endereco: 'Av. Exemplo, 1.200 · Centro',
    selo: 'Fisioterapia e pilates',
    titulo: 'Volte a se mexer sem dor.',
    linha: 'Ortopedia, coluna, pós-cirurgia e pilates. Peça a sua avaliação pelo WhatsApp e comece ainda esta semana.',
    fatos: [['Avaliação', 'na primeira sessão'], ['6h às 20h', 'de segunda a sexta'], ['Em casa', 'sob consulta']],
    altCapa: 'Fisioterapeuta orientando exercício com halteres', altApoio: 'Paciente fazendo alongamento na maca',
    modo: 'agenda',
    servicosTitulo: 'Tratamentos', servicosLinha: 'Toque em "Quero esse" e o pedido de avaliação já vem preenchido.',
    servicos: [
      ['bone', 'Ortopedia', 'Recuperação de entorses, fraturas e tendinites.', 'Sessão de 50 min'],
      ['activity', 'Coluna', 'Tratamento para dor nas costas e no pescoço.', 'Sessão de 50 min'],
      ['footprints', 'Pós-cirurgia', 'Reabilitação com plano feito para você.', 'Com avaliação'],
      ['dumbbell', 'Pilates', 'Turmas pequenas, com fisioterapeuta.', 'Até 3 alunos'],
      ['heart-pulse', 'RPG', 'Postura e alongamento global.', 'Sessão de 50 min'],
      ['house', 'Atendimento em casa', 'Para quem não pode se deslocar.', 'Sob consulta']
    ],
    acao: {
      titulo: 'Agende sua avaliação', linha: 'A mensagem vai pronta para a recepção, que confirma o horário.',
      botao: 'Agendar avaliação', abertura: 'quero agendar uma avaliação',
      campos: [
        { tipo: 'servico', rotulo: 'Tratamento' },
        { tipo: 'opcoes', nome: 'periodo', rotulo: 'Período', opcoes: ['manhã', 'tarde', 'noite'] },
        { tipo: 'lista', nome: 'dia', rotulo: 'Dia preferido', opcoes: DIAS.slice(0, 5) }
      ]
    },
    diferenciais: [
      ['ruler', 'Avaliação completa', 'O tratamento começa com medidas e testes.'],
      ['users', 'Atenção individual', 'Um fisioterapeuta por paciente na sessão.'],
      ['bell', 'Lembrete das sessões', 'Aviso no WhatsApp para não perder nenhuma.']
    ],
    passosTitulo: 'Como funciona',
    passos: [['Avaliação', 'Entendemos a dor e o que você precisa.'], ['Plano de tratamento', 'Número de sessões e exercícios.'], ['Reavaliação', 'Para acompanhar a evolução.']],
    avaliacoes: ['Voltei a caminhar sem dor no joelho.', 'Horário marcado e atendimento sem pressa.', 'O pilates em turma pequena faz diferença.'],
    quem: 'Paciente de exemplo',
    duvidas: [
      ['Preciso de pedido médico?', 'Para convênio, geralmente sim. No particular, a avaliação é feita aqui mesmo.'],
      ['Quantas sessões vou precisar?', 'Depende da avaliação. O plano é passado por escrito.'],
      ['Atendem convênio?', 'Aqui a clínica informa quais convênios aceita.'],
      ['Que roupa devo usar?', 'Roupa leve, que deixe a região tratada à mostra.']
    ],
    whats: 'Oi! Vi o site da Movimento Fisioterapia e quero agendar uma avaliação.'
  },

  nutricionista: {
    nome: 'Nutri Equilíbrio', curto: 'Equilíbrio', tipo: 'Nutricionista', icone: 'apple',
    galeria: ['Tigela de salada colorida', 'Iogurte com frutas no café da manhã', 'Marmitas de vidro com refeições prontas'],
    fonte: ['Bricolage Grotesque', '600;700'],
    sobre: {
      titulo: 'Um plano que cabe na sua rotina, não o contrário.',
      texto: 'A consulta começa pelo que você come hoje, pelo seu horário e pelo seu orçamento. O plano sai simples, com comida de verdade, e as dúvidas do dia a dia são respondidas pelo WhatsApp.',
      pontos: ['Plano alimentar no celular', 'Dúvidas pelo WhatsApp entre as consultas', 'Presencial ou online'],
      assinatura: 'Nutricionista · CRN-9 00000 (exemplo)'
    },
    cores: ['#5C7A33', '#475F27', '#EEF3E4'], layout: 'cartao',
    horario: 'Seg a sex, 8h às 19h', endereco: 'Rua Exemplo, 77 · Centro',
    selo: 'Nutricionista · CRN 0000 (exemplo)',
    titulo: 'Comer bem, sem dieta impossível.',
    linha: 'Plano alimentar feito para a sua rotina, com acompanhamento pelo WhatsApp entre as consultas.',
    fatos: [['Presencial', 'ou online'], ['Retorno', 'em 30 dias'], ['Plano', 'no celular']],
    altCapa: 'Nutricionista atendendo paciente com frutas na mesa', altApoio: 'Mesa com refeição saudável',
    modo: 'agenda',
    servicosTitulo: 'Atendimentos', servicosLinha: 'Escolha o seu objetivo e peça o horário.',
    servicos: [
      ['salad', 'Reeducação alimentar', 'Mudança de hábito sem passar fome.', 'Consulta de 60 min'],
      ['dumbbell', 'Nutrição esportiva', 'Para treinar melhor e recuperar mais rápido.', 'Consulta de 60 min'],
      ['baby', 'Gestantes', 'Alimentação na gravidez e na amamentação.', 'Consulta de 60 min'],
      ['heart-pulse', 'Saúde e exames', 'Colesterol, glicemia e pressão.', 'Com análise de exames'],
      ['monitor', 'Consulta online', 'Por vídeo, com plano enviado no celular.', 'Consulta de 50 min']
    ],
    acao: {
      titulo: 'Marque sua consulta', linha: 'A mensagem vai pronta para a nutricionista, que confirma o horário.',
      botao: 'Marcar consulta', abertura: 'quero marcar uma consulta',
      campos: [
        { tipo: 'servico', rotulo: 'Objetivo' },
        { tipo: 'opcoes', nome: 'formato', rotulo: 'Formato', opcoes: ['presencial', 'online'] },
        { tipo: 'opcoes', nome: 'periodo', rotulo: 'Período', opcoes: ['manhã', 'tarde'] }
      ]
    },
    diferenciais: [
      ['leaf', 'Plano possível', 'Com comida que você gosta e encontra perto de casa.'],
      ['message-circle', 'Dúvida no meio da semana', 'Pergunte pelo WhatsApp entre as consultas.'],
      ['chart-column', 'Evolução medida', 'Peso e medidas a cada retorno.']
    ],
    passosTitulo: 'Como funciona',
    passos: [['Consulta', 'Rotina, gostos, exames e objetivos.'], ['Plano alimentar', 'Pronto em até 3 dias, no seu celular.'], ['Retorno', 'Ajustes a cada 30 dias.']],
    avaliacoes: ['Primeira vez que consegui seguir um plano.', 'As dúvidas pelo WhatsApp ajudam muito.', 'Plano simples, com comida de verdade.'],
    quem: 'Paciente de exemplo',
    duvidas: [
      ['Preciso levar exames?', 'Se tiver exames recentes, sim. Se não, a nutricionista pode pedir.'],
      ['A consulta online funciona?', 'Sim. O plano é o mesmo e chega no seu celular.'],
      ['Tem retorno incluso?', 'Aqui a nutricionista informa as condições do retorno.'],
      ['Atende criança?', 'Aqui a nutricionista informa as idades que atende.']
    ],
    whats: 'Oi! Vi o site da Nutri Equilíbrio e quero marcar uma consulta.'
  },

  veterinaria: {
    nome: 'Clínica Veterinária Bicho Bom', curto: 'Bicho Bom', tipo: 'Clínica veterinária', icone: 'paw-print',
    galeria: ['Gatinho sendo examinado pelo veterinário', 'Veterinário segurando um cachorro pequeno', 'Gato no colo durante a consulta'],
    fonte: ['Nunito', '700;800'],
    sobre: {
      titulo: 'Seu pet atendido com calma, por quem gosta de bicho.',
      texto: 'Consultório separado para gatos, para eles chegarem menos estressados. A ficha de cada pet fica guardada, com o histórico de vacinas e o lembrete da próxima dose pelo WhatsApp.',
      pontos: ['Médicos-veterinários com registro no CRMV', 'Espaço separado para gatos', 'Lembrete de vacina pelo WhatsApp'],
      assinatura: 'Responsável técnico · CRMV-MG 00000 (exemplo)'
    },
    cores: ['#3B6EA5', '#2D5683', '#E8EFF7'], layout: 'dividido',
    horario: 'Seg a sáb, 8h às 20h', endereco: 'Rua Exemplo, 640 · Centro',
    selo: 'Cães e gatos',
    titulo: 'Cuidado de verdade para quem é da família.',
    linha: 'Consultas, vacinas, exames e cirurgias. Marque pelo WhatsApp e receba o lembrete da próxima vacina.',
    fatos: [['Seg a sáb', '8h às 20h'], ['Vacinas', 'com lembrete'], ['Exames', 'no local']],
    altCapa: 'Veterinário examinando um cachorro', altApoio: 'Cachorro olhando para o tutor',
    modo: 'agenda',
    servicosTitulo: 'Serviços', servicosLinha: 'Toque em "Quero esse" e o pedido de horário já vem preenchido.',
    servicos: [
      ['stethoscope', 'Consulta', 'Avaliação completa do seu pet.', 'R$ 120'],
      ['syringe', 'Vacinas', 'Polivalente, antirrábica e gripe, com carteirinha.', 'a partir de R$ 80'],
      ['microscope', 'Exames', 'Sangue, fezes e ultrassom.', 'sob consulta'],
      ['scissors', 'Castração', 'Com avaliação e exames antes.', 'sob avaliação'],
      ['bone', 'Ortopedia', 'Para pets que mancam ou sentem dor.', 'sob avaliação'],
      ['cat', 'Horário para gatos', 'Atendimento calmo, sem cachorro por perto.', 'Consulta R$ 120']
    ],
    acao: {
      titulo: 'Marque o atendimento', linha: 'A mensagem vai pronta para a recepção, que confirma o horário.',
      botao: 'Pedir horário', abertura: 'quero marcar um atendimento para o meu pet',
      campos: [
        { tipo: 'servico', rotulo: 'Serviço' },
        { tipo: 'opcoes', nome: 'pet', rotulo: 'Pet', opcoes: ['cachorro', 'gato'] },
        { tipo: 'opcoes', nome: 'periodo', rotulo: 'Período', opcoes: ['manhã', 'tarde', 'noite'] },
        { tipo: 'lista', nome: 'dia', rotulo: 'Dia preferido', opcoes: DIAS }
      ]
    },
    diferenciais: [
      ['bell', 'Lembrete de vacina', 'Aviso no WhatsApp quando chega a hora da próxima dose.'],
      ['heart', 'Sem pressa', 'Tempo para examinar e explicar tudo.'],
      ['microscope', 'Exames no local', 'Resultado mais rápido.']
    ],
    passosTitulo: 'Como marcar',
    passos: [['Você pede o horário', 'Pelo WhatsApp, a qualquer hora.'], ['A recepção confirma', 'Com o horário e o que levar.'], ['Lembrete', 'Na véspera e na próxima vacina.']],
    avaliacoes: ['A Mel foi muito bem cuidada.', 'O lembrete da vacina me salvou.', 'Horário separado para gatos faz diferença.'],
    quem: 'Tutor de exemplo',
    duvidas: [
      ['Atendem emergência?', 'Aqui a clínica informa o horário de urgência e o telefone de plantão.'],
      ['Preciso levar a carteirinha?', 'Sim, para registrar as vacinas.'],
      ['O pet precisa estar em jejum?', 'Para alguns exames, sim. A recepção avisa na confirmação.'],
      ['Atendem outros animais?', 'Aqui a clínica informa quais animais atende.']
    ],
    whats: 'Oi! Vi o site da Clínica Veterinária Bicho Bom e quero marcar um atendimento.'
  },

  salao: {
    nome: 'Salão Flor de Lis', curto: 'Flor de Lis', tipo: 'Salão de beleza', icone: 'scissors',
    galeria: ['Escova com secador no salão', 'Salão com cadeiras pretas e espelhos redondos', 'Escovas, tesoura e pincel de coloração'],
    fonte: ['Playfair Display', '500;600'],
    sobre: {
      titulo: 'Um salão onde você é ouvida antes da tesoura.',
      texto: 'Antes de cortar ou colorir, a gente conversa sobre o que você quer, o seu tipo de cabelo e a sua rotina. O horário é respeitado e cada detalhe é combinado com você.',
      pontos: ['Conversa antes de cada serviço', 'Produtos profissionais', 'Horário marcado, sem espera']
    },
    cores: ['#A35C66', '#844852', '#F7EBEC'], layout: 'foto', serif: true,
    horario: 'Ter a sáb, 9h às 19h', endereco: 'Rua Exemplo, 45 · Centro',
    selo: 'Salão de beleza',
    titulo: 'Cabelo do jeito que você imaginou.',
    linha: 'Corte, cor, escova e tratamentos. Escolha o serviço e o horário e mande pelo WhatsApp em menos de um minuto.',
    fatos: [['Ter a sáb', '9h às 19h'], ['Cor e corte', 'com hora marcada'], ['Noivas', 'sob consulta']],
    altCapa: 'Cabeleireira finalizando o cabelo de uma cliente', altApoio: 'Corte de cabelo com tesoura',
    modo: 'agenda',
    servicosTitulo: 'Serviços', servicosLinha: 'Toque em "Quero esse" e o agendamento já vem preenchido.',
    servicos: [
      ['scissors', 'Corte feminino', 'Com lavagem e finalização.', 'R$ 70'],
      ['brush', 'Coloração', 'Cor inteira ou retoque de raiz.', 'a partir de R$ 140'],
      ['sun', 'Mechas e luzes', 'Com tonalização.', 'a partir de R$ 280'],
      ['flame', 'Escova', 'Lisa ou modelada.', 'R$ 50'],
      ['droplets', 'Hidratação', 'Tratamento para fios secos.', 'R$ 80'],
      ['flower-2', 'Penteado', 'Para festas e eventos.', 'a partir de R$ 120']
    ],
    acao: {
      titulo: 'Agende seu horário', linha: 'A mensagem vai pronta para o salão, que confirma com você.',
      botao: 'Agendar', abertura: 'quero agendar um horário',
      campos: [
        { tipo: 'servico', rotulo: 'Serviço' },
        { tipo: 'opcoes', nome: 'periodo', rotulo: 'Período', opcoes: ['manhã', 'tarde'] },
        { tipo: 'lista', nome: 'dia', rotulo: 'Dia preferido', opcoes: DIAS_TER_SAB }
      ]
    },
    diferenciais: [
      ['calendar', 'Hora marcada', 'Você chega e é atendida, sem esperar.'],
      ['bell', 'Lembrete na véspera', 'Aviso no WhatsApp para não esquecer.'],
      ['star', 'Produtos profissionais', 'Marcas de salão em todos os serviços.']
    ],
    passosTitulo: 'Como agendar',
    passos: [['Escolha o serviço', 'Aqui no site ou pelo WhatsApp.'], ['Confirmação', 'O salão confirma o horário com você.'], ['Lembrete', 'Na véspera, pelo WhatsApp.']],
    avaliacoes: ['Saí com a cor exatamente como pedi.', 'Marquei pelo WhatsApp em um minuto.', 'Atendimento no horário, sem espera.'],
    quem: 'Cliente de exemplo',
    duvidas: [
      ['Preciso fazer teste de mecha?', 'Para coloração e mechas, sim. É rápido e evita surpresa.'],
      ['Quanto tempo demora a mecha?', 'Em média de 3 a 4 horas, depende do cabelo.'],
      ['Posso remarcar?', 'Sim, avise pelo WhatsApp com antecedência.'],
      ['Aceitam cartão?', 'Aqui o salão informa as formas de pagamento.']
    ],
    whats: 'Oi! Vi o site do Salão Flor de Lis e quero agendar um horário.'
  },

  barbearia: {
    nome: 'Barbearia Navalha', curto: 'Navalha', tipo: 'Barbearia', icone: 'scissors',
    galeria: ['Cadeira de barbeiro perto da parede de tijolos', 'Barbeiro cortando o cabelo de um cliente', 'Máquinas, tesoura e pente sobre a bancada'],
    fonte: ['Oswald', '500;600'],
    sobre: {
      titulo: 'Barbearia de bairro, com hora marcada.',
      texto: 'Aqui você chega no horário e já senta na cadeira. Corte na tesoura ou na máquina, barba com toalha quente e acabamento na navalha, sem pressa e sem fila.',
      pontos: ['Hora marcada pelo WhatsApp', 'Toalha quente e lâmina descartável', 'Café e ambiente climatizado']
    },
    cores: ['#8C6531', '#6E4F26', '#F4EEE4'], layout: 'foto', reto: true, escuro: true,
    horario: 'Ter a sáb, 9h às 20h', endereco: 'Rua Exemplo, 12 · Centro',
    selo: 'Barbearia',
    titulo: 'Corte na hora marcada. Sem fila.',
    linha: 'Corte, barba e acabamento. Escolha o horário e chegue só na sua vez.',
    fatos: [['Ter a sáb', '9h às 20h'], ['Corte', 'em 40 minutos'], ['Clube', 'mensal']],
    altCapa: 'Barbeiro aparando a barba de um cliente', altApoio: 'Interior da barbearia com cadeiras',
    modo: 'agenda',
    servicosTitulo: 'Serviços', servicosLinha: 'Toque em "Quero esse" e a reserva já vem preenchida.',
    servicos: [
      ['scissors', 'Corte', 'Máquina e tesoura, com acabamento.', 'R$ 45'],
      ['brush', 'Barba', 'Toalha quente e navalha.', 'R$ 35'],
      ['star', 'Corte e barba', 'O combo completo.', 'R$ 70'],
      ['baby', 'Corte infantil', 'Até 12 anos.', 'R$ 35'],
      ['droplets', 'Pigmentação', 'Para barba ou cabelo.', 'R$ 40'],
      ['repeat', 'Clube mensal', 'Cortes à vontade no mês.', 'R$ 120 por mês']
    ],
    acao: {
      titulo: 'Reserve seu horário', linha: 'A mensagem vai pronta para a barbearia, que confirma em minutos.',
      botao: 'Reservar', abertura: 'quero reservar um horário',
      campos: [
        { tipo: 'servico', rotulo: 'Serviço' },
        { tipo: 'lista', nome: 'barbeiro', rotulo: 'Barbeiro', opcoes: ['Tanto faz', 'Rafa', 'Léo', 'Duda'] },
        { tipo: 'opcoes', nome: 'periodo', rotulo: 'Período', opcoes: ['manhã', 'tarde', 'noite'] },
        { tipo: 'lista', nome: 'dia', rotulo: 'Dia', opcoes: DIAS_TER_SAB }
      ]
    },
    diferenciais: [
      ['clock', 'Sem fila', 'Hora marcada de verdade.'],
      ['coffee', 'Café por conta da casa', 'Enquanto você espera a sua vez.'],
      ['repeat', 'Clube mensal', 'Corte sempre em dia por um valor fixo.']
    ],
    passosTitulo: 'Como reservar',
    passos: [['Escolha', 'Serviço, barbeiro e horário.'], ['Confirmação', 'Pelo WhatsApp, em minutos.'], ['Lembrete', 'Uma hora antes do horário.']],
    avaliacoes: ['Chego e sou atendido na hora.', 'A barba com toalha quente é outro nível.', 'O clube mensal compensa demais.'],
    quem: 'Cliente de exemplo',
    duvidas: [
      ['Posso escolher o barbeiro?', 'Sim, é só escolher no formulário.'],
      ['Como funciona o clube?', 'Você paga um valor fixo por mês e corta quantas vezes quiser.'],
      ['Atrasei, e agora?', 'Avise pelo WhatsApp. Se der, o horário é mantido.'],
      ['Aceitam Pix?', 'Aqui a barbearia informa as formas de pagamento.']
    ],
    whats: 'Oi! Vi o site da Barbearia Navalha e quero reservar um horário.'
  },

  estetica: {
    nome: 'Essência Estética', curto: 'Essência', tipo: 'Estética', icone: 'flower-2',
    galeria: ['Cliente recebendo máscara facial', 'Tratamento facial de cuidado com a pele', 'Toalhas e produtos na sala de estética'],
    fonte: ['Cormorant Garamond', '600;700'],
    sobre: {
      titulo: 'Cuidado com a pele, sem promessa milagrosa.',
      texto: 'Todo tratamento começa por uma avaliação, para indicar só o que faz sentido para a sua pele. Cada sessão fica registrada na sua ficha, com o que foi feito e o que vem a seguir.',
      pontos: ['Avaliação antes de qualquer tratamento', 'Materiais descartáveis e esterilizados', 'Ficha com o histórico das sessões']
    },
    cores: ['#86694C', '#6B533B', '#F5EFE8'], layout: 'cartao', serif: true,
    horario: 'Seg a sáb, 9h às 19h', endereco: 'Rua Exemplo, 150 · Centro',
    selo: 'Estética facial e corporal',
    titulo: 'Cuidar da pele também é rotina.',
    linha: 'Limpeza de pele, massagens e tratamentos corporais, com avaliação antes. Agende pelo WhatsApp.',
    fatos: [['Avaliação', 'antes de começar'], ['Seg a sáb', 'com hora marcada'], ['Pacotes', 'com valor menor']],
    altCapa: 'Massagem facial relaxante', altApoio: 'Esteticista fazendo tratamento facial',
    modo: 'agenda',
    servicosTitulo: 'Procedimentos', servicosLinha: 'Toque em "Quero esse" e o agendamento já vem preenchido.',
    servicos: [
      ['droplets', 'Limpeza de pele', 'Profunda, com extração e máscara.', 'R$ 150'],
      ['hand-heart', 'Massagem relaxante', 'Para aliviar a tensão do dia a dia.', 'R$ 130'],
      ['activity', 'Drenagem linfática', 'Ajuda a aliviar o inchaço.', 'R$ 120'],
      ['sun', 'Peeling', 'Para manchas e textura da pele.', 'sob avaliação'],
      ['eye', 'Design de sobrancelha', 'Com henna opcional.', 'R$ 45'],
      ['gift', 'Pacotes', 'Sessões com valor menor.', 'sob consulta']
    ],
    acao: {
      titulo: 'Agende sua sessão', linha: 'A mensagem vai pronta para a clínica, que confirma o horário.',
      botao: 'Agendar', abertura: 'quero agendar uma sessão',
      campos: [
        { tipo: 'servico', rotulo: 'Procedimento' },
        { tipo: 'opcoes', nome: 'periodo', rotulo: 'Período', opcoes: ['manhã', 'tarde', 'noite'] },
        { tipo: 'lista', nome: 'dia', rotulo: 'Dia preferido', opcoes: DIAS }
      ]
    },
    diferenciais: [
      ['clipboard-list', 'Avaliação antes', 'Cada pele recebe o cuidado certo.'],
      ['shield-check', 'Material descartável', 'Higiene em cada atendimento.'],
      ['bell', 'Lembrete das sessões', 'Para manter a rotina do tratamento.']
    ],
    passosTitulo: 'Como funciona',
    passos: [['Avaliação', 'Entendemos a sua pele e o que você quer.'], ['Plano', 'Número de sessões e cuidados em casa.'], ['Sessões', 'Com lembrete no WhatsApp.']],
    avaliacoes: ['Ambiente calmo e atendimento cuidadoso.', 'A avaliação antes fez toda a diferença.', 'O pacote de drenagem valeu a pena.'],
    quem: 'Cliente de exemplo',
    duvidas: [
      ['Limpeza de pele dói?', 'Pode incomodar um pouco na extração. A esteticista vai com cuidado.'],
      ['Quantas sessões preciso?', 'Depende do tratamento. A avaliação define o plano.'],
      ['Posso ir maquiada?', 'O ideal é vir sem maquiagem.'],
      ['Tem pacote?', 'Sim, com valor menor por sessão.']
    ],
    whats: 'Oi! Vi o site da Essência Estética e quero agendar uma sessão.'
  },

  confeitaria: {
    nome: 'Doce Fornada', curto: 'Doce Fornada', tipo: 'Confeitaria e padaria', icone: 'cake-slice',
    galeria: ['Vitrine com bolos e tortas', 'Bolo com morangos', 'Cupcakes de chocolate na prateleira'],
    fonte: ['DM Serif Display', '400'],
    sobre: {
      titulo: 'Feito aqui, no dia, com receita de casa.',
      texto: 'Bolos, doces e salgados saem da nossa cozinha, sem massa pronta. As encomendas são preparadas para chegar fresquinhas na data da sua festa.',
      pontos: ['Massa feita aqui, todo dia', 'Retirada ou entrega na data marcada', 'Valor confirmado antes de começar']
    },
    cores: ['#7A4B32', '#5F3A27', '#F8EFE6'], layout: 'cartao', serif: true,
    horario: 'Seg a sáb, 6h às 20h · Dom, 7h às 12h', endereco: 'Rua Exemplo, 300 · Centro',
    selo: 'Confeitaria e padaria',
    titulo: 'Bolo, salgado e pão fresquinho, sob encomenda.',
    linha: 'Monte o seu pedido aqui, escolha retirar ou receber em casa e mande pelo WhatsApp.',
    fatos: [['Pão quente', 'às 6h e às 16h'], ['Encomendas', 'com 2 dias'], ['Entrega', 'no bairro']],
    altCapa: 'Pães doces enrolados saindo do forno', altApoio: 'Doce de merengue de perto',
    modo: 'pedido',
    servicosTitulo: 'Cardápio de encomendas', servicosLinha: 'Use + e − para montar o pedido. O total aparece logo abaixo.',
    servicos: [
      ['cake-slice', 'Bolo de chocolate (1 kg)', 'Recheio de brigadeiro.', 75],
      ['cake-slice', 'Bolo de cenoura (1 kg)', 'Com cobertura de chocolate.', 60],
      ['cookie', 'Salgadinhos (cento)', 'Coxinha, risole e bolinha de queijo.', 85],
      ['gift', 'Docinhos (cento)', 'Brigadeiro e beijinho.', 90],
      ['croissant', 'Croissant', 'De manteiga, saindo do forno.', 8],
      ['coffee', 'Pão de queijo (kg)', 'Congelado, para assar em casa.', 38]
    ],
    acao: {
      titulo: 'Seu pedido', linha: 'Confira os itens e mande pelo WhatsApp. A confeitaria confirma o valor final e a data.',
      botao: 'Fazer encomenda', abertura: 'quero fazer uma encomenda',
      campos: [
        { tipo: 'opcoes', nome: 'entrega', rotulo: 'Como prefere', opcoes: ['retirar na loja', 'receber em casa'] },
        { tipo: 'lista', nome: 'quando', rotulo: 'Para quando', opcoes: ['daqui a 2 dias', 'daqui a 3 dias', 'fim de semana', 'outra data'] }
      ]
    },
    diferenciais: [
      ['flame', 'Feito aqui', 'Massa e recheio preparados todo dia.'],
      ['calendar', 'Encomenda organizada', 'Seu pedido anotado com data e hora.'],
      ['truck', 'Entrega no bairro', 'Ou retire no balcão, sem fila.']
    ],
    passosTitulo: 'Como encomendar',
    passos: [['Monte o pedido', 'Aqui no site ou pelo WhatsApp.'], ['Confirmação', 'Valor final e data combinados.'], ['Retirada ou entrega', 'No dia e na hora marcados.']],
    avaliacoes: ['O bolo foi o sucesso da festa.', 'Encomendei os salgados pelo WhatsApp em 2 minutos.', 'Pão de queijo igual ao de vó.'],
    quem: 'Cliente de exemplo',
    duvidas: [
      ['Com quanto tempo preciso encomendar?', 'Bolos e salgados, com 2 dias. Para festas grandes, com uma semana.'],
      ['Fazem bolo personalizado?', 'Sim. Mande a ideia pelo WhatsApp e a confeitaria passa o valor.'],
      ['Qual a taxa de entrega?', 'Aqui a confeitaria informa a taxa por bairro.'],
      ['Tem opção sem lactose?', 'Aqui a confeitaria informa as opções.']
    ],
    whats: 'Oi! Vi o site da Doce Fornada e quero fazer uma encomenda.'
  },

  pizzaria: {
    nome: 'Bella Massa Pizzaria', curto: 'Bella Massa', tipo: 'Pizzaria e delivery', icone: 'pizza',
    galeria: ['Pizza assando no forno a lenha', 'Pizzaiolo com a pá ao lado do forno', 'Fatia de pizza servida na tábua'],
    fonte: ['Archivo', '700;800'],
    sobre: {
      titulo: 'Pizza artesanal, do forno direto para a sua casa.',
      texto: 'A massa descansa por muitas horas antes de ir para o forno a lenha. É isso que deixa a borda leve e crocante, do jeito que pizza tem de ser.',
      pontos: ['Massa de longa fermentação', 'Forno a lenha', 'Pedido direto pelo WhatsApp, sem aplicativo no meio']
    },
    cores: ['#B23A2E', '#8E2E25', '#FBEDEA'], layout: 'foto', reto: true, escuro: true,
    horario: 'Ter a dom, 18h às 23h30', endereco: 'Av. Exemplo, 900 · Centro',
    selo: 'Pizzaria e delivery',
    titulo: 'Massa de longa fermentação, forno a lenha.',
    linha: 'Escolha as pizzas, veja o total e mande o pedido pronto pelo WhatsApp.',
    fatos: [['Ter a dom', '18h às 23h30'], ['Entrega', 'em 40 a 60 min'], ['Massa', 'de 48 horas']],
    altCapa: 'Pizzas de calabresa e azeitona sobre a mesa', altApoio: 'Mãos abrindo a massa da pizza',
    modo: 'pedido',
    servicosTitulo: 'Cardápio', servicosLinha: 'Toque em + para adicionar. O total aparece no seu pedido.',
    servicos: [
      ['pizza', 'Margherita', 'Molho de tomate, muçarela e manjericão.', 52],
      ['pizza', 'Calabresa', 'Calabresa, cebola e azeitona.', 54],
      ['pizza', 'Frango com catupiry', 'Frango desfiado e catupiry.', 58],
      ['pizza', 'Portuguesa', 'Presunto, ovo, cebola e ervilha.', 58],
      ['pizza', 'Quatro queijos', 'Muçarela, provolone, parmesão e gorgonzola.', 62],
      ['cake-slice', 'Chocolate com morango', 'Pizza doce para fechar a noite.', 48]
    ],
    acao: {
      titulo: 'Seu pedido', linha: 'Confira e mande pelo WhatsApp. A pizzaria confirma o tempo de entrega.',
      botao: 'Fazer pedido', abertura: 'quero fazer um pedido',
      campos: [
        { tipo: 'opcoes', nome: 'entrega', rotulo: 'Entrega ou retirada', opcoes: ['entrega', 'retirada'] },
        { tipo: 'opcoes', nome: 'pagamento', rotulo: 'Pagamento', opcoes: ['Pix', 'cartão', 'dinheiro'] }
      ]
    },
    diferenciais: [
      ['flame', 'Forno a lenha', 'Borda crocante e massa leve.'],
      ['clock', 'Tempo de entrega avisado', 'Você sabe quando a pizza chega.'],
      ['message-circle', 'Pedido pelo WhatsApp', 'Direto com a pizzaria, sem aplicativo no meio.']
    ],
    passosTitulo: 'Como pedir',
    passos: [['Escolha as pizzas', 'Aqui no site, com o total na tela.'], ['Mande pelo WhatsApp', 'O pedido vai pronto.'], ['Acompanhe', 'Aviso quando sair para entrega.']],
    avaliacoes: ['A melhor borda da cidade.', 'Pedi pelo site e chegou no tempo que avisaram.', 'A quatro queijos é obrigatória.'],
    quem: 'Cliente de exemplo',
    duvidas: [
      ['Qual a taxa de entrega?', 'Aqui a pizzaria informa a taxa por bairro.'],
      ['Pode meio a meio?', 'Sim, é só pedir na mensagem.'],
      ['Tem outros tamanhos?', 'Aqui a pizzaria informa os tamanhos.'],
      ['Aceitam cartão na entrega?', 'Sim, o entregador leva a maquininha.']
    ],
    whats: 'Oi! Vi o site da Bella Massa e quero fazer um pedido.'
  },

  petshop: {
    nome: 'Pet Amigo', curto: 'Pet Amigo', tipo: 'Pet shop, banho e tosa', icone: 'dog',
    galeria: ['Tosa com tesoura em um cachorro branco', 'Escovação do pelo de um cachorro', 'Cachorro enrolado na toalha depois do banho'],
    fonte: ['Baloo 2', '600;700'],
    sobre: {
      titulo: 'Banho e tosa com carinho e sem pressa.',
      texto: 'Cada pet é atendido no seu tempo, com produtos próprios para a pele dele. Quando fica pronto, você recebe uma foto pelo WhatsApp e combina a busca.',
      pontos: ['Produtos próprios para cada pelagem', 'Busca e entrega em casa', 'Foto pelo WhatsApp quando fica pronto']
    },
    cores: ['#A8621F', '#874E18', '#FBF1E4'], layout: 'dividido',
    horario: 'Seg a sáb, 8h às 18h', endereco: 'Rua Exemplo, 520 · Centro',
    selo: 'Pet shop, banho e tosa',
    titulo: 'Banho e tosa com hora marcada e busca em casa.',
    linha: 'Agende o banho, peça ração e acessórios e receba o aviso quando o seu pet estiver pronto.',
    fatos: [['Leva e traz', 'no bairro'], ['Aviso', 'quando fica pronto'], ['Ração', 'com entrega']],
    altCapa: 'Tutor abraçando um cachorro', altApoio: 'Gato peludo depois do banho',
    modo: 'agenda',
    servicosTitulo: 'Serviços', servicosLinha: 'Toque em "Quero esse" e o agendamento já vem preenchido.',
    servicos: [
      ['bath', 'Banho', 'Com secagem e perfume.', 'a partir de R$ 50'],
      ['scissors', 'Banho e tosa', 'Tosa higiênica ou na máquina.', 'a partir de R$ 80'],
      ['cat', 'Banho para gatos', 'Horário separado e calmo.', 'a partir de R$ 70'],
      ['truck', 'Leva e traz', 'Buscamos e levamos o seu pet.', 'R$ 15'],
      ['package', 'Ração e petiscos', 'Entrega no mesmo dia.', 'sob consulta'],
      ['heart', 'Hidratação de pelo', 'Para pelos secos e embaraçados.', 'R$ 30']
    ],
    acao: {
      titulo: 'Agende o banho', linha: 'A mensagem vai pronta para o pet shop, que confirma o horário.',
      botao: 'Agendar', abertura: 'quero agendar um horário para o meu pet',
      campos: [
        { tipo: 'servico', rotulo: 'Serviço' },
        { tipo: 'opcoes', nome: 'porte', rotulo: 'Porte', opcoes: ['pequeno', 'médio', 'grande'] },
        { tipo: 'opcoes', nome: 'busca', rotulo: 'Leva e traz', opcoes: ['sim', 'não'] },
        { tipo: 'lista', nome: 'dia', rotulo: 'Dia preferido', opcoes: DIAS }
      ]
    },
    diferenciais: [
      ['message-circle', 'Aviso quando fica pronto', 'Mensagem no WhatsApp com foto do seu pet.'],
      ['truck', 'Leva e traz', 'Você não precisa sair de casa.'],
      ['shield-check', 'Cuidado e paciência', 'Equipe acostumada com pets medrosos.']
    ],
    passosTitulo: 'Como funciona',
    passos: [['Agende', 'Serviço, porte e dia.'], ['Buscamos ou você traz', 'No horário combinado.'], ['Pronto', 'Aviso no WhatsApp para buscar.']],
    avaliacoes: ['O Thor volta cheiroso e calmo.', 'O leva e traz salvou a minha rotina.', 'Mandaram foto quando ficou pronto.'],
    quem: 'Tutor de exemplo',
    duvidas: [
      ['Precisa de vacina em dia?', 'Sim, por segurança de todos os pets.'],
      ['Quanto tempo demora?', 'De 1 a 3 horas, depende do porte e do serviço.'],
      ['Atendem gatos?', 'Sim, em horário separado.'],
      ['Entregam ração?', 'Sim, no bairro. Aqui o pet shop informa a taxa.']
    ],
    whats: 'Oi! Vi o site do Pet Amigo e quero agendar um banho.'
  },

  oficina: {
    nome: 'Auto Center Torque', curto: 'Torque', tipo: 'Oficina mecânica', icone: 'wrench',
    galeria: ['Mecânico inspecionando o motor', 'Oficina com carros em manutenção', 'Mãos trabalhando no motor com uma chave'],
    fonte: ['Barlow Condensed', '600;700'],
    sobre: {
      titulo: 'Você aprova o orçamento antes de qualquer serviço.',
      texto: 'O carro passa por diagnóstico, você recebe o orçamento pelo WhatsApp com fotos das peças e só depois o serviço começa. Nada é trocado sem a sua aprovação.',
      pontos: ['Orçamento por escrito antes do serviço', 'Fotos das peças trocadas', 'Garantia de 90 dias no serviço, como manda o Código do Consumidor']
    },
    cores: ['#2A4A73', '#1E3655', '#E8EEF6'], layout: 'foto', reto: true, escuro: true,
    horario: 'Seg a sex, 8h às 18h · Sáb, 8h às 12h', endereco: 'Av. Exemplo, 2.300 · Distrito Industrial',
    selo: 'Oficina mecânica',
    titulo: 'Orçamento antes, serviço depois. Sem surpresa.',
    linha: 'Revisão, freios, suspensão e injeção eletrônica. Peça o orçamento pelo WhatsApp e acompanhe o serviço por fotos.',
    fatos: [['Orçamento', 'antes de mexer'], ['Fotos', 'do serviço no WhatsApp'], ['Garantia', 'por escrito']],
    altCapa: 'Mecânico trabalhando em um carro no elevador', altApoio: 'Mecânico olhando o motor de um carro',
    modo: 'orcamento',
    servicosTitulo: 'Serviços', servicosLinha: 'Toque em "Quero esse" e o pedido de orçamento já vem preenchido.',
    servicos: [
      ['cog', 'Revisão completa', 'Óleo, filtros e checagem de itens.', 'a partir de R$ 250'],
      ['gauge', 'Diagnóstico eletrônico', 'Leitura de falhas com scanner.', 'R$ 100'],
      ['shield-check', 'Freios', 'Pastilha, disco e fluido.', 'a partir de R$ 180'],
      ['car-front', 'Suspensão', 'Amortecedor, bandeja e barulhos.', 'sob orçamento'],
      ['route', 'Alinhamento e balanceamento', 'Com equipamento computadorizado.', 'R$ 120'],
      ['droplets', 'Troca de óleo', 'Com filtro, em cerca de 30 minutos.', 'a partir de R$ 150']
    ],
    acao: {
      titulo: 'Peça seu orçamento', linha: 'A mensagem vai pronta para a oficina, que responde com o valor e o prazo.',
      botao: 'Pedir orçamento', abertura: 'quero um orçamento',
      campos: [
        { tipo: 'servico', rotulo: 'Serviço' },
        { tipo: 'lista', nome: 'carro', rotulo: 'Tipo de veículo', opcoes: ['Hatch ou sedã', 'SUV ou caminhonete', 'Utilitário'] },
        { tipo: 'opcoes', nome: 'quando', rotulo: 'Quando precisa', opcoes: ['esta semana', 'sem pressa', 'é urgente'] }
      ]
    },
    diferenciais: [
      ['receipt', 'Você aprova antes', 'Nada é trocado sem a sua autorização.'],
      ['image', 'Fotos do serviço', 'Você vê no WhatsApp o que foi trocado.'],
      ['award', 'Garantia por escrito', 'Peças e mão de obra com garantia.']
    ],
    passosTitulo: 'Como funciona',
    passos: [['Orçamento', 'Você descreve, a oficina avalia e passa o valor.'], ['Aprovação', 'O serviço só começa com o seu ok.'], ['Pronto', 'Aviso no WhatsApp para buscar o carro.']],
    avaliacoes: ['Mandaram foto de cada peça trocada.', 'O orçamento bateu com o valor final.', 'Carro pronto no dia combinado.'],
    quem: 'Cliente de exemplo',
    duvidas: [
      ['O orçamento é cobrado?', 'Aqui a oficina informa se cobra a avaliação.'],
      ['Posso levar a minha peça?', 'Aqui a oficina explica as regras para peça trazida pelo cliente.'],
      ['Quanto tempo de garantia?', 'Aqui a oficina informa o prazo, que fica escrito na nota.'],
      ['Atendem moto?', 'Aqui a oficina informa os veículos que atende.']
    ],
    whats: 'Oi! Vi o site do Auto Center Torque e quero um orçamento.'
  },

  advocacia: {
    nome: 'Prado Advocacia', curto: 'Prado', tipo: 'Advocacia', icone: 'scale',
    galeria: ['Estante com livros', 'Assinatura de documento em reunião', 'Pessoa escrevendo à mesa'],
    fonte: ['Libre Baskerville', '400;700'],
    sobre: {
      titulo: 'Atendimento jurídico com clareza e discrição.',
      texto: 'Na primeira consulta, você entende a sua situação, os caminhos possíveis e os custos envolvidos. Cada caso é tratado com sigilo, como determina o Código de Ética da OAB.',
      pontos: ['Sigilo profissional', 'Explicação em linguagem simples', 'Andamento do processo informado pelo WhatsApp'],
      assinatura: 'Sociedade de advogados · OAB/MG 0.000 (exemplo)'
    },
    cores: ['#1F4D3F', '#173B30', '#EAF1EE'], layout: 'dividido', serif: true, reto: true,
    horario: 'Seg a sex, 9h às 18h', endereco: 'Av. Exemplo, 1.500 · sala 804 · Centro',
    selo: 'Advocacia · OAB/MG 000.000 (exemplo)',
    titulo: 'Orientação jurídica clara, do primeiro contato à solução.',
    linha: 'Família, trabalho, aposentadoria e consumidor. Agende uma consulta pelo WhatsApp.',
    fatos: [['Presencial', 'e online'], ['Sem juridiquês', 'tudo explicado'], ['Andamento', 'pelo WhatsApp']],
    altCapa: 'Advogados em reunião com uma cliente', altApoio: 'Advogado analisando documentos',
    modo: 'orcamento',
    servicosTitulo: 'Áreas de atuação', servicosLinha: 'Escolha a área do seu caso para agendar a consulta.',
    servicos: [
      ['users', 'Família', 'Divórcio, pensão, guarda e inventário.', ''],
      ['briefcase', 'Trabalhista', 'Verbas rescisórias, horas extras e acordos.', ''],
      ['landmark', 'Previdenciário', 'Aposentadoria, auxílio e revisão de benefício.', ''],
      ['shopping-bag', 'Consumidor', 'Cobrança indevida, produto com defeito, voo cancelado.', ''],
      ['house', 'Imobiliário', 'Contratos, compra e venda e despejo.', ''],
      ['file-text', 'Contratos', 'Elaboração e revisão de contratos.', '']
    ],
    acao: {
      titulo: 'Agende uma consulta', linha: 'Conte só o tema. Os detalhes do caso ficam para a consulta, com sigilo.',
      botao: 'Agendar consulta', abertura: 'quero agendar uma consulta',
      campos: [
        { tipo: 'servico', rotulo: 'Área' },
        { tipo: 'opcoes', nome: 'formato', rotulo: 'Formato', opcoes: ['presencial', 'online'] },
        { tipo: 'opcoes', nome: 'periodo', rotulo: 'Período', opcoes: ['manhã', 'tarde'] }
      ]
    },
    diferenciais: [
      ['shield-check', 'Sigilo', 'O que você conta fica entre você e o advogado.'],
      ['message-circle', 'Andamento informado', 'Atualização do processo pelo WhatsApp.'],
      ['file-text', 'Tudo explicado', 'Sem juridiquês, com os próximos passos por escrito.']
    ],
    passosTitulo: 'Como funciona',
    passos: [['Consulta', 'Você conta o caso e tira as dúvidas.'], ['Proposta', 'Caminhos possíveis e honorários por escrito.'], ['Acompanhamento', 'Atualizações do andamento pelo WhatsApp.']],
    avaliacoes: null,
    duvidas: [
      ['Quanto custa a consulta?', 'O valor é informado no contato, conforme a tabela de honorários da OAB.'],
      ['Atendem online?', 'Sim, por vídeo.'],
      ['Preciso levar documentos?', 'Leve o que tiver sobre o caso. A lista é enviada na confirmação.'],
      ['Em quanto tempo o processo termina?', 'Depende de cada caso e da Justiça. Ninguém pode prometer prazo.']
    ],
    whats: 'Oi! Vi o site da Prado Advocacia e quero agendar uma consulta.'
  },

  idiomas: {
    nome: 'Fala Bem Idiomas', curto: 'Fala Bem', tipo: 'Escola de idiomas', icone: 'languages',
    galeria: ['Professora apresentando para a turma', 'Alunos conversando na sala de aula', 'Blocos de letras sobre a mesa de estudo'],
    fonte: ['Manrope', '600;700;800'],
    sobre: {
      titulo: 'Turmas pequenas, para todo mundo falar na aula.',
      texto: 'Com poucos alunos por turma, o professor ouve cada um e corrige na hora. As aulas usam situações do dia a dia: viagem, trabalho e conversa de verdade.',
      pontos: ['Turmas pequenas', 'Conversação desde a primeira aula', 'Aula experimental gratuita']
    },
    cores: ['#2F5DA8', '#244A86', '#EAF0FA'], layout: 'cartao',
    horario: 'Seg a sex, 8h às 21h · Sáb, 8h às 12h', endereco: 'Rua Exemplo, 400 · Centro',
    selo: 'Escola de idiomas',
    titulo: 'Aprenda a falar de verdade, em turmas pequenas.',
    linha: 'Inglês e espanhol para adultos, adolescentes e crianças. Agende uma aula experimental gratuita pelo WhatsApp.',
    fatos: [['Até 8 alunos', 'por turma'], ['Aula experimental', 'gratuita'], ['Online', 'ou presencial']],
    altCapa: 'Professora dando aula ao lado do quadro', altApoio: 'Aluna estudando com caderno',
    modo: 'agenda',
    servicosTitulo: 'Cursos', servicosLinha: 'Toque em "Quero esse" e o pedido de aula experimental já vem preenchido.',
    servicos: [
      ['languages', 'Inglês para adultos', 'Conversação desde a primeira aula.', 'R$ 290 por mês'],
      ['languages', 'Espanhol', 'Para viagem e trabalho.', 'R$ 260 por mês'],
      ['users', 'Crianças e adolescentes', 'Aulas com jogos e projetos.', 'R$ 250 por mês'],
      ['briefcase', 'Inglês para o trabalho', 'Reuniões, e-mails e entrevistas.', 'R$ 340 por mês'],
      ['monitor', 'Aulas online', 'Ao vivo, com professor.', 'R$ 240 por mês'],
      ['award', 'Preparatório para provas', 'Para certificados internacionais.', 'sob consulta']
    ],
    acao: {
      titulo: 'Agende uma aula experimental', linha: 'A mensagem vai pronta para a escola, que confirma o dia e o horário.',
      botao: 'Agendar aula', abertura: 'quero agendar uma aula experimental',
      campos: [
        { tipo: 'servico', rotulo: 'Curso' },
        { tipo: 'lista', nome: 'nivel', rotulo: 'Seu nível', opcoes: ['Nunca estudei', 'Básico', 'Intermediário', 'Avançado'] },
        { tipo: 'opcoes', nome: 'periodo', rotulo: 'Período', opcoes: ['manhã', 'tarde', 'noite'] }
      ]
    },
    diferenciais: [
      ['users', 'Turmas pequenas', 'Todo mundo fala em toda aula.'],
      ['book-open', 'Material incluso', 'Digital, no celular.'],
      ['bell', 'Lembrete das aulas', 'E aviso de reposição pelo WhatsApp.']
    ],
    passosTitulo: 'Como começar',
    passos: [['Aula experimental', 'Conheça o método sem pagar.'], ['Teste de nível', 'Para entrar na turma certa.'], ['Matrícula', 'No horário que cabe na sua rotina.']],
    avaliacoes: ['Perdi a vergonha de falar em inglês.', 'A aula experimental me convenceu.', 'Turma pequena faz toda a diferença.'],
    quem: 'Aluno de exemplo',
    duvidas: [
      ['Em quanto tempo vou falar?', 'Depende da sua dedicação. O teste de nível ajuda a planejar.'],
      ['Tem reposição de aula?', 'Sim, avise pelo WhatsApp com antecedência.'],
      ['Tem certificado?', 'Sim, ao fim de cada nível.'],
      ['Posso trocar de horário?', 'Sim, se houver vaga em outra turma.']
    ],
    whats: 'Oi! Vi o site da Fala Bem Idiomas e quero agendar uma aula experimental.'
  },

  autoescola: {
    nome: 'Autoescola Rota Certa', curto: 'Rota Certa', tipo: 'Autoescola', icone: 'car-front',
    galeria: ['Instrutor com prancheta durante a aula prática', 'Mãos no volante durante a direção', 'Aluna sentada ao volante'],
    fonte: ['Space Grotesk', '600;700'],
    sobre: {
      titulo: 'Aprender a dirigir, sem pressão.',
      texto: 'As aulas são marcadas no seu horário, com instrutores credenciados pelo Detran. Para quem tem medo de dirigir, há aulas extras com calma e no seu ritmo.',
      pontos: ['Instrutores credenciados pelo Detran', 'Aula marcada pelo WhatsApp', 'Aulas para quem já tem carteira']
    },
    cores: ['#2E6B4A', '#225238', '#E6F1EA'], layout: 'foto', reto: true, escuro: true,
    horario: 'Seg a sex, 7h às 19h · Sáb, 7h às 12h', endereco: 'Av. Exemplo, 700 · Centro',
    selo: 'Autoescola',
    titulo: 'Sua carteira com aula marcada no seu horário.',
    linha: 'Primeira habilitação, adição de categoria e aulas para quem já tem carteira e quer perder o medo de dirigir.',
    fatos: [['Carro e moto', 'categorias A e B'], ['Aulas', 'no seu horário'], ['Simulados', 'da prova teórica']],
    altCapa: 'Instrutor ao lado de um aluno dirigindo', altApoio: 'Painel do carro com estrada à frente',
    modo: 'agenda',
    servicosTitulo: 'Cursos e aulas', servicosLinha: 'Toque em "Quero esse" e o pedido já vem preenchido.',
    servicos: [
      ['car-front', 'Primeira habilitação (B)', 'Carro, da teoria à prática.', 'sob consulta'],
      ['route', 'Moto (A)', 'Aulas em pista e na rua.', 'sob consulta'],
      ['award', 'Carro e moto (AB)', 'As duas categorias juntas.', 'sob consulta'],
      ['traffic-cone', 'Aulas para habilitados', 'Para perder o medo de dirigir.', 'R$ 90 por aula'],
      ['book-open', 'Simulados', 'Treino para a prova teórica.', 'incluso'],
      ['repeat', 'Reciclagem', 'Para quem precisa recuperar a carteira.', 'sob consulta']
    ],
    acao: {
      titulo: 'Fale sobre matrícula ou aula', linha: 'A mensagem vai pronta para a autoescola, que responde com valores e horários.',
      botao: 'Enviar pedido', abertura: 'quero informações para me matricular ou marcar aula',
      campos: [
        { tipo: 'servico', rotulo: 'Curso' },
        { tipo: 'opcoes', nome: 'periodo', rotulo: 'Período', opcoes: ['manhã', 'tarde', 'noite'] },
        { tipo: 'opcoes', nome: 'cambio', rotulo: 'Câmbio', opcoes: ['manual', 'automático'] }
      ]
    },
    diferenciais: [
      ['calendar', 'Aula no seu horário', 'Inclusive cedo e no sábado.'],
      ['bell', 'Lembrete das aulas', 'Pelo WhatsApp, na véspera.'],
      ['shield-check', 'Instrutores pacientes', 'Para quem está começando ou com medo.']
    ],
    passosTitulo: 'Como funciona',
    passos: [['Matrícula', 'Com documentos e exames.'], ['Aulas', 'Teoria e prática, no seu ritmo.'], ['Provas', 'Com simulado antes de cada uma.']],
    avaliacoes: ['Perdi o medo de dirigir em poucas aulas.', 'Marcar aula pelo WhatsApp é muito prático.', 'Instrutor muito paciente.'],
    quem: 'Aluno de exemplo',
    duvidas: [
      ['Quantas aulas preciso fazer?', 'Depende das regras do Detran e de como você dirige hoje. A autoescola explica na matrícula.'],
      ['Tem carro automático?', 'Aqui a autoescola informa.'],
      ['Posso parcelar?', 'Aqui a autoescola informa as formas de pagamento.'],
      ['Que documentos preciso?', 'A lista vai pelo WhatsApp quando você faz o pedido.']
    ],
    whats: 'Oi! Vi o site da Autoescola Rota Certa e quero informações.'
  }
};
