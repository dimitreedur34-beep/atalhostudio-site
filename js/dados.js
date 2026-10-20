// Dados das demonstrações. Tudo fictício e marcado como demonstração na tela.
//
// Acrescentar uma área no WhatsApp = acrescentar um item em AREAS.
// Acrescentar um modelo de site = criar a pasta site/modelos/<id>/ e um item em MODELOS.

// Conversa: começa com a mensagem "sugestao" (o visitante toca em enviar) e segue pelos passos.
// Passo: bot = mensagens do atendimento (uma ou mais), botoes = [rótulo, próximo passo, texto enviado (opcional)],
// nota = o que está acontecendo por trás (aparece ao lado do celular). Passo sem botões = fim.
export const AREAS = {
  clinica: {
    rotulo: 'Dentista',
    categoria: 'saude',
    destaque: true,
    detalhe: 'Agenda e dúvidas',
    negocio: 'Clínica Sorriso Vivo',
    cor: '#6E8F86',
    icone: 'stethoscope',
    sugestao: 'Boa noite! Vocês têm horário amanhã?',
    passos: {
      inicio: {
        bot: ['Boa noite! Sou o assistente automático da Clínica Sorriso Vivo', 'Temos horários amanhã. Qual período é melhor para você?'],
        botoes: [['Manhã', 'tratamento'], ['Tarde', 'tratamento'], ['Quanto custa a avaliação?', 'preco']],
        nota: 'Mensagem às 22:07, com a clínica fechada. A resposta sai na hora, com botões para o cliente não precisar digitar.'
      },
      preco: {
        bot: ['A avaliação custa R$ 80 e é descontada se você fizer o tratamento.', 'Quer pedir um horário?'],
        botoes: [['Quero pedir', 'tratamento'], ['Falar com a recepção', 'pessoa']],
        nota: 'Preço e regras vêm do que a clínica cadastrou. O atendimento não inventa nada.'
      },
      tratamento: {
        bot: ['Ótimo! Para qual tratamento?'],
        botoes: [['Limpeza', 'pedido'], ['Clareamento', 'pedido'], ['Estou com dor', 'urgencia']],
        nota: 'Cada resposta vira uma informação organizada para a recepção.'
      },
      pedido: {
        bot: ['Anotado!', 'A recepção confirma o horário exato com você amanhã cedo, por aqui mesmo.'],
        nota: 'O pedido fica marcado para a recepção confirmar. O cliente da noite não se perde.'
      },
      urgencia: {
        bot: ['Sinto muito pela dor. Para urgência, ligue (33) 0000-0000 ou venha amanhã a partir das 8h.', 'Já avisei a equipe para te dar prioridade.'],
        nota: 'Urgência vai direto para uma pessoa. O atendimento não dá orientação médica.'
      },
      pessoa: {
        bot: ['Combinado! A conversa fica marcada para a recepção, que te responde a partir das 8h.'],
        nota: 'Quando o cliente pede uma pessoa, a conversa vai para a equipe.'
      }
    }
  },
  restaurante: {
    rotulo: 'Restaurante',
    categoria: 'alimentacao',
    destaque: true,
    detalhe: 'Cardápio e pedidos',
    negocio: 'Cantina da Praça',
    cor: '#A0634B',
    icone: 'utensils',
    sugestao: 'Oi! Qual é o prato de hoje?',
    passos: {
      inicio: {
        bot: ['Oi! Bem-vindo à Cantina da Praça', 'Hoje tem:\n- Frango assado com batatas\n- Feijoada completa\n- Lasanha de legumes'],
        botoes: [['Quero pedir', 'tipo'], ['Ver preços', 'precos'], ['Que horas abre?', 'horario']],
        nota: 'O cardápio do dia é atualizado pelo restaurante e o atendimento responde com ele.'
      },
      precos: {
        bot: ['Prato do dia: R$ 24,90\nMarmita: R$ 19,90\nSobremesa: R$ 8,00'],
        botoes: [['Quero pedir', 'tipo']],
        nota: 'Pergunta repetida (preço, horário) é respondida sem ocupar ninguém.'
      },
      horario: {
        bot: ['Abrimos de segunda a sábado, das 11h às 15h. Entregas até 14h30.'],
        botoes: [['Quero pedir', 'tipo']]
      },
      tipo: {
        bot: ['É para entrega ou retirada?'],
        botoes: [['Entrega', 'entrega'], ['Retirada', 'retirada']]
      },
      entrega: {
        bot: ['Perfeito! Me manda o prato e o endereço.', 'A cozinha confirma o pedido e o tempo de entrega em seguida.'],
        nota: 'O pedido chega organizado para a cozinha confirmar. Ninguém precisa ficar no celular no horário de pico.'
      },
      retirada: {
        bot: ['Combinado! Me diga o prato e a hora que você passa aqui. A cozinha confirma em seguida.'],
        nota: 'O pedido chega organizado para a cozinha confirmar.'
      }
    }
  },
  loja: {
    rotulo: 'Loja',
    categoria: 'comercio',
    destaque: true,
    detalhe: 'Estoque e reservas',
    negocio: 'Ateliê Lume',
    cor: '#8C7A66',
    icone: 'shirt',
    sugestao: 'Oi! Tem aquele vestido azul no M?',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é o atendimento do Ateliê Lume', 'O vestido azul tem no M e no G.'],
        botoes: [['Separar no M', 'separar'], ['Tem outra cor?', 'cores'], ['Falar com a vendedora', 'pessoa']],
        nota: 'O atendimento consulta o catálogo da loja e responde na hora, até de madrugada.'
      },
      cores: {
        bot: ['Tem também em preto e verde-oliva, nos mesmos tamanhos.'],
        botoes: [['Separar o azul no M', 'separar'], ['Separar o preto no M', 'separar']]
      },
      separar: {
        bot: ['Pedido de reserva anotado!', 'A vendedora confirma com você e combina a retirada ou a entrega.'],
        nota: 'A reserva chega para a vendedora confirmar. A cliente não compra de outra loja enquanto espera.'
      },
      pessoa: {
        bot: ['Combinado! A vendedora assume a conversa em instantes.'],
        nota: 'Quando a cliente pede uma pessoa, a conversa vai para a equipe.'
      }
    }
  },
  imobiliaria: {
    rotulo: 'Imobiliária',
    categoria: 'servicos',
    destaque: true,
    detalhe: 'Imóveis por bairro',
    negocio: 'Morada Imóveis',
    cor: '#5F7488',
    icone: 'house',
    sugestao: 'Tem casa para alugar no Centro?',
    passos: {
      inicio: {
        bot: ['Oi! Sou o assistente automático da Morada Imóveis', 'Tenho casas para alugar no Centro. Quantos quartos você precisa?'],
        botoes: [['2 quartos', 'lista'], ['3 quartos', 'lista'], ['Tanto faz', 'lista']],
        nota: 'O atendimento procura no catálogo da imobiliária, por bairro e tipo de imóvel.'
      },
      lista: {
        bot: ['Encontrei estas:', 'Casa 3 quartos, Centro\nmoradaimoveis.com.br/casa-101', 'Casa 2 quartos com quintal, Centro\nmoradaimoveis.com.br/casa-102'],
        botoes: [['Falar com um corretor', 'pessoa'], ['Ver outro bairro', 'bairro']],
        nota: 'Cada imóvel vai com título, bairro e link para o cliente ver as fotos no site.'
      },
      bairro: {
        bot: ['Claro! Qual bairro você prefere?'],
        botoes: [['Vila Bretas', 'lista'], ['Grã-Duquesa', 'lista']]
      },
      pessoa: {
        bot: ['Combinado! Um corretor assume a conversa em instantes.', 'Quando ele responder, eu paro de responder.'],
        nota: 'O corretor entra na conversa e o atendimento automático pausa sozinho.'
      }
    }
  },
  academia: {
    rotulo: 'Academia',
    categoria: 'educacao',
    destaque: true,
    detalhe: 'Planos e aula grátis',
    negocio: 'Academia Pulso',
    cor: '#8F7A4E',
    icone: 'dumbbell',
    sugestao: 'Quanto custa a mensalidade?',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é a Academia Pulso', 'Plano mensal: R$ 99\nTrimestral: R$ 270 (sai R$ 90 por mês)'],
        botoes: [['Agendar aula experimental', 'aula'], ['Ver horários', 'horarios']],
        nota: 'Quem pergunta preço à noite recebe a resposta na hora e já pode marcar uma aula.'
      },
      horarios: {
        bot: ['Segunda a sexta, das 6h às 22h. Sábado, das 8h às 12h.'],
        botoes: [['Agendar aula experimental', 'aula']]
      },
      aula: {
        bot: ['Ótimo! Qual período?'],
        botoes: [['Manhã', 'fim'], ['Noite', 'fim']]
      },
      fim: {
        bot: ['Anotado! A recepção confirma o dia com você.', 'Traga roupa leve e uma garrafinha de água.'],
        nota: 'O pedido de aula chega para a recepção confirmar.'
      }
    }
  },
  escritorio: {
    rotulo: 'Contabilidade',
    categoria: 'servicos',
    detalhe: 'Documentos e prazos',
    negocio: 'Contábil Prisma',
    cor: '#5E7360',
    icone: 'briefcase',
    sugestao: 'Preciso mandar as notas do mês. Como faço?',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é o atendimento da Contábil Prisma', 'Pode mandar aqui mesmo, em foto ou PDF.'],
        botoes: [['Mandar um PDF', 'recebido', 'Documento: notas-outubro.pdf'], ['Falar com o contador', 'pessoa']],
        nota: 'O cliente manda os documentos a qualquer hora, sem ligar para o escritório.'
      },
      recebido: {
        bot: ['Recebido! Guardei o arquivo e avisei a equipe.'],
        botoes: [['Falar com o contador', 'pessoa']],
        nota: 'O arquivo fica guardado e a equipe é avisada.'
      },
      pessoa: {
        bot: ['Combinado! A equipe retorna em horário comercial.'],
        nota: 'O atendimento não dá orientação tributária: dúvida técnica vai para o contador.'
      }
    }
  },
  medica: {
    rotulo: 'Clínica médica', categoria: 'saude', destaque: true,
    detalhe: 'Consultas e exames', negocio: 'Clínica Vida Plena', cor: '#2F6E8C', icone: 'stethoscope',
    sugestao: 'Boa noite! Tem pediatra amanhã?',
    passos: {
      inicio: {
        bot: ['Boa noite! Sou o assistente automático da Clínica Vida Plena', 'Temos pediatria amanhã. Qual período é melhor?'],
        botoes: [['Manhã', 'fim'], ['Tarde', 'fim'], ['Aceitam convênio?', 'planos']],
        nota: 'Mensagem às 21:40, com a clínica fechada. A resposta sai na hora, com botões.'
      },
      planos: {
        bot: ['Atendemos particular e alguns convênios. Qual é o seu caso?'],
        botoes: [['Particular', 'fim'], ['Tenho convênio', 'pessoa']],
        nota: 'A resposta vem do que a clínica cadastrou.'
      },
      fim: {
        bot: ['Anotado!', 'A recepção confirma o horário com você amanhã às 7h, por aqui mesmo.'],
        nota: 'O pedido fica marcado para a recepção confirmar. O atendimento não dá orientação médica.'
      },
      pessoa: {
        bot: ['Certo! A recepção confere o seu convênio e responde a partir das 7h.'],
        nota: 'O que precisa de conferência vai para uma pessoa.'
      }
    }
  },
  psicologo: {
    rotulo: 'Psicólogo', categoria: 'saude',
    detalhe: 'Primeira conversa', negocio: 'Espaço Escuta', cor: '#9A5A44', icone: 'brain',
    sugestao: 'Oi, queria saber como funciona a terapia',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é o atendimento automático do Espaço Escuta', 'A psicóloga atende presencial e online, em sessões de 50 minutos. Quer marcar uma primeira conversa?'],
        botoes: [['Quero marcar', 'formato'], ['Atende online?', 'online'], ['Preciso falar agora', 'crise']],
        nota: 'As dúvidas de sempre são respondidas na hora. A conversa sobre o caso é sempre com a psicóloga.'
      },
      online: {
        bot: ['Atende sim! A sessão é por vídeo, num link enviado antes do horário.'],
        botoes: [['Quero marcar', 'formato']]
      },
      formato: {
        bot: ['Prefere presencial ou online?'],
        botoes: [['Presencial', 'fim'], ['Online', 'fim']]
      },
      fim: {
        bot: ['Anotado! A psicóloga responde pessoalmente em até um dia útil para combinar o horário.'],
        nota: 'O primeiro contato chega organizado para a profissional.'
      },
      crise: {
        bot: ['Se você está sofrendo agora, ligue 188 (CVV), de graça e 24 horas. Em emergência, ligue 192.', 'Também avisei a psicóloga sobre a sua mensagem.'],
        nota: 'Em situação delicada, o atendimento indica ajuda imediata e avisa a profissional.'
      }
    }
  },
  fisioterapia: {
    rotulo: 'Fisioterapia', categoria: 'saude',
    detalhe: 'Avaliação e pilates', negocio: 'Movimento Fisioterapia', cor: '#2F7F72', icone: 'activity',
    sugestao: 'Vocês atendem dor nas costas?',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é o atendimento automático da Movimento Fisioterapia', 'Atendemos sim. O tratamento começa com uma avaliação. Quer agendar?'],
        botoes: [['Quero agendar', 'periodo'], ['Precisa de pedido médico?', 'pedido'], ['Tem pilates?', 'pilates']],
        nota: 'Pergunta de sempre respondida na hora, com as regras da clínica.'
      },
      pedido: {
        bot: ['Para convênio, geralmente sim. No particular, a avaliação é feita aqui mesmo.'],
        botoes: [['Quero agendar', 'periodo']]
      },
      pilates: {
        bot: ['Temos! Turmas de até 3 alunos, com fisioterapeuta.'],
        botoes: [['Quero agendar', 'periodo']]
      },
      periodo: {
        bot: ['Qual período fica melhor?'],
        botoes: [['Manhã', 'fim'], ['Tarde', 'fim'], ['Noite', 'fim']]
      },
      fim: {
        bot: ['Anotado! A recepção confirma o dia e o horário com você.'],
        nota: 'O pedido chega organizado para a recepção.'
      }
    }
  },
  nutricionista: {
    rotulo: 'Nutricionista', categoria: 'saude',
    detalhe: 'Consultas', negocio: 'Nutri Equilíbrio', cor: '#5C7A33', icone: 'apple',
    sugestao: 'Oi! Você atende online?',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é o atendimento automático da Nutri Equilíbrio', 'Atende sim! A consulta online é por vídeo e o plano chega no seu celular.'],
        botoes: [['Quero marcar', 'objetivo'], ['Tem retorno?', 'retorno']],
        nota: 'Quem pergunta à noite recebe a resposta na hora.'
      },
      retorno: {
        bot: ['Tem sim, em 30 dias, para ajustar o plano.'],
        botoes: [['Quero marcar', 'objetivo']]
      },
      objetivo: {
        bot: ['Qual é o seu objetivo principal?'],
        botoes: [['Reeducação alimentar', 'fim'], ['Esporte', 'fim'], ['Gestação', 'fim']]
      },
      fim: {
        bot: ['Anotado! A nutricionista confirma o horário com você.', 'Se tiver exames recentes, separe para a consulta.'],
        nota: 'O pedido chega com o objetivo, e a consulta começa mais rápido.'
      }
    }
  },
  veterinaria: {
    rotulo: 'Veterinária', categoria: 'saude',
    detalhe: 'Consultas e vacinas', negocio: 'Clínica Bicho Bom', cor: '#3B6EA5', icone: 'paw-print',
    sugestao: 'Oi, quanto custa a vacina polivalente?',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é o atendimento automático da Clínica Bicho Bom', 'A vacina polivalente sai a partir de R$ 80, com carteirinha. Quer agendar?'],
        botoes: [['Quero agendar', 'pet'], ['É urgência', 'urgencia']],
        nota: 'O preço vem da tabela da clínica.'
      },
      pet: {
        bot: ['É para cachorro ou gato?'],
        botoes: [['Cachorro', 'fim'], ['Gato', 'fim']]
      },
      fim: {
        bot: ['Anotado! A recepção confirma o horário.', 'Depois da vacina, eu aviso quando chegar a hora da próxima dose.'],
        nota: 'Com o lembrete da próxima vacina, o tutor volta sem precisar lembrar.'
      },
      urgencia: {
        bot: ['Já avisei a equipe. Se for grave, venha direto para a clínica ou ligue (33) 0000-0000.'],
        nota: 'Urgência vai direto para uma pessoa.'
      }
    }
  },
  salao: {
    rotulo: 'Salão de beleza', categoria: 'beleza', destaque: true,
    detalhe: 'Agenda de horários', negocio: 'Salão Flor de Lis', cor: '#A35C66', icone: 'scissors',
    sugestao: 'Oi! Tem horário para escova no sábado?',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é o atendimento automático do Salão Flor de Lis', 'Sábado tem horário para escova (R$ 50). Qual período?'],
        botoes: [['Manhã', 'fim'], ['Tarde', 'fim'], ['Ver outros serviços', 'servicos']],
        nota: 'A agenda e os preços vêm do que o salão cadastrou.'
      },
      servicos: {
        bot: ['Corte R$ 70 · Coloração a partir de R$ 140 · Hidratação R$ 80'],
        botoes: [['Quero a escova', 'fim'], ['Falar com o salão', 'pessoa']]
      },
      fim: {
        bot: ['Anotado! O salão confirma o horário com você.', 'Na sexta eu mando um lembrete.'],
        nota: 'O lembrete na véspera diminui as faltas.'
      },
      pessoa: {
        bot: ['Combinado! Uma pessoa do salão responde em instantes.'],
        nota: 'Quando a cliente quer falar com alguém, a conversa vai para a equipe.'
      }
    }
  },
  barbearia: {
    rotulo: 'Barbearia', categoria: 'beleza', destaque: true,
    detalhe: 'Corte sem fila', negocio: 'Barbearia Navalha', cor: '#8C6531', icone: 'scissors',
    sugestao: 'Fala! Tem horário hoje à noite?',
    passos: {
      inicio: {
        bot: ['Fala! Aqui é o atendimento automático da Barbearia Navalha', 'Hoje tem às 19h e às 20h. Qual serviço?'],
        botoes: [['Corte', 'barbeiro'], ['Corte e barba', 'barbeiro'], ['Como é o clube?', 'clube']],
        nota: 'O cliente reserva sem o barbeiro parar o corte para responder.'
      },
      clube: {
        bot: ['No clube você paga R$ 120 por mês e corta quantas vezes quiser.'],
        botoes: [['Quero o corte de hoje', 'barbeiro']]
      },
      barbeiro: {
        bot: ['Tem preferência de barbeiro?'],
        botoes: [['Tanto faz', 'fim'], ['Rafa', 'fim'], ['Léo', 'fim']]
      },
      fim: {
        bot: ['Fechado! Horário reservado, falta só a confirmação da barbearia.', 'Uma hora antes eu te lembro.'],
        nota: 'Reserva feita na hora, com lembrete automático.'
      }
    }
  },
  estetica: {
    rotulo: 'Estética', categoria: 'beleza',
    detalhe: 'Sessões e pacotes', negocio: 'Essência Estética', cor: '#86694C', icone: 'flower-2',
    sugestao: 'Oi! Quanto é a limpeza de pele?',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é o atendimento automático da Essência Estética', 'A limpeza de pele profunda custa R$ 150, com extração e máscara. Quer agendar?'],
        botoes: [['Quero agendar', 'periodo'], ['Tem pacote?', 'pacote']],
        nota: 'Preço e regras vêm do que a clínica cadastrou.'
      },
      pacote: {
        bot: ['Tem sim! No pacote, cada sessão sai por um valor menor. A esteticista monta o seu na avaliação.'],
        botoes: [['Quero agendar', 'periodo']]
      },
      periodo: {
        bot: ['Qual período fica melhor?'],
        botoes: [['Manhã', 'fim'], ['Tarde', 'fim'], ['Noite', 'fim']]
      },
      fim: {
        bot: ['Anotado! A clínica confirma com você.', 'Venha sem maquiagem, combinado?'],
        nota: 'A orientação de preparo vai na hora, sem ninguém precisar lembrar.'
      }
    }
  },
  confeitaria: {
    rotulo: 'Confeitaria', categoria: 'alimentacao', destaque: true,
    detalhe: 'Encomendas', negocio: 'Doce Fornada', cor: '#7A4B32', icone: 'cake-slice',
    sugestao: 'Oi! Vocês fazem bolo para sábado?',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é o atendimento automático da Doce Fornada', 'Fazemos sim! Encomendas com 2 dias de antecedência. Qual sabor?'],
        botoes: [['Chocolate', 'quantidade'], ['Cenoura', 'quantidade'], ['Quero personalizado', 'pessoa']],
        nota: 'Prazo e sabores vêm do cardápio da confeitaria.'
      },
      quantidade: {
        bot: ['O bolo de 1 kg sai por R$ 75. Quer incluir salgadinhos?'],
        botoes: [['Sim, um cento', 'fim'], ['Só o bolo', 'fim']]
      },
      fim: {
        bot: ['Anotado para sábado! A confeitaria confirma o valor e o horário de retirada.'],
        nota: 'A encomenda chega com sabor, quantidade e data.'
      },
      pessoa: {
        bot: ['Que legal! Mande uma foto de referência que a confeitaria passa o valor.'],
        nota: 'Pedido personalizado vai para uma pessoa avaliar.'
      }
    }
  },
  pizzaria: {
    rotulo: 'Pizzaria', categoria: 'alimentacao',
    detalhe: 'Pedidos e entrega', negocio: 'Bella Massa', cor: '#B23A2E', icone: 'pizza',
    sugestao: 'Boa noite! Tem pizza de calabresa?',
    passos: {
      inicio: {
        bot: ['Boa noite! Aqui é o atendimento automático da Bella Massa', 'Tem sim! A calabresa sai por R$ 54. Quantas?'],
        botoes: [['Uma', 'entrega'], ['Duas', 'entrega'], ['Ver cardápio', 'cardapio']],
        nota: 'Na hora do pico, ninguém para o forno para digitar.'
      },
      cardapio: {
        bot: ['Margherita R$ 52 · Calabresa R$ 54 · Frango com catupiry R$ 58 · Quatro queijos R$ 62'],
        botoes: [['Quero calabresa', 'entrega']]
      },
      entrega: {
        bot: ['Entrega ou retirada?'],
        botoes: [['Entrega', 'fim'], ['Retirada', 'fim']]
      },
      fim: {
        bot: ['Pedido anotado! Fica pronto em 40 a 60 minutos.', 'Eu aviso quando sair para entrega.'],
        nota: 'O pedido chega completo para a cozinha.'
      }
    }
  },
  petshop: {
    rotulo: 'Pet shop', categoria: 'comercio',
    detalhe: 'Banho e tosa', negocio: 'Pet Amigo', cor: '#A8621F', icone: 'dog',
    sugestao: 'Oi! Tem banho amanhã?',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é o atendimento automático do Pet Amigo', 'Tem sim! Qual o porte do seu pet?'],
        botoes: [['Pequeno', 'busca'], ['Médio', 'busca'], ['Grande', 'busca']],
        nota: 'O tutor agenda a qualquer hora, sem ligar.'
      },
      busca: {
        bot: ['Quer que a gente busque em casa? O leva e traz custa R$ 15.'],
        botoes: [['Sim', 'fim'], ['Eu levo', 'fim']]
      },
      fim: {
        bot: ['Anotado! O pet shop confirma o horário.', 'Quando o banho terminar, eu aviso aqui.'],
        nota: 'Com o aviso de pronto, o tutor não precisa ligar para saber.'
      }
    }
  },
  oficina: {
    rotulo: 'Oficina', categoria: 'servicos',
    detalhe: 'Orçamentos', negocio: 'Auto Center Torque', cor: '#2A4A73', icone: 'wrench',
    sugestao: 'Meu carro está fazendo barulho no freio',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é o atendimento automático do Auto Center Torque', 'Vamos ver isso. Qual é o tipo do carro?'],
        botoes: [['Hatch ou sedã', 'quando'], ['SUV ou caminhonete', 'quando']],
        nota: 'O atendimento não dá diagnóstico: só organiza o pedido para o mecânico.'
      },
      quando: {
        bot: ['Quando você consegue trazer?'],
        botoes: [['Hoje', 'fim'], ['Esta semana', 'fim']]
      },
      fim: {
        bot: ['Anotado! O mecânico avalia e passa o orçamento antes de mexer em qualquer coisa.', 'As fotos do serviço vêm por aqui.'],
        nota: 'O cliente sabe o que esperar, e o mecânico recebe o pedido organizado.'
      }
    }
  },
  advocacia: {
    rotulo: 'Advocacia', categoria: 'servicos',
    detalhe: 'Agendar consulta', negocio: 'Prado Advocacia', cor: '#1F4D3F', icone: 'scale',
    sugestao: 'Boa tarde, preciso de ajuda com pensão',
    passos: {
      inicio: {
        bot: ['Boa tarde! Aqui é o atendimento automático da Prado Advocacia', 'O escritório atende Direito de Família. Quer agendar uma consulta?'],
        botoes: [['Quero agendar', 'formato'], ['Quanto custa?', 'valor']],
        nota: 'O atendimento não dá orientação jurídica: só agenda a conversa com o advogado.'
      },
      valor: {
        bot: ['O valor da consulta é informado pelo escritório, conforme a tabela da OAB.'],
        botoes: [['Quero agendar', 'formato']]
      },
      formato: {
        bot: ['Prefere presencial ou online?'],
        botoes: [['Presencial', 'fim'], ['Online', 'fim']]
      },
      fim: {
        bot: ['Anotado! O escritório confirma o horário. Os detalhes do caso ficam para a consulta, com sigilo.'],
        nota: 'Nada do caso fica na conversa automática.'
      }
    }
  },
  idiomas: {
    rotulo: 'Escola de idiomas', categoria: 'educacao',
    detalhe: 'Aula experimental', negocio: 'Fala Bem Idiomas', cor: '#2F5DA8', icone: 'languages',
    sugestao: 'Oi! Quanto custa o curso de inglês?',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é o atendimento automático da Fala Bem', 'Inglês para adultos: R$ 290 por mês, em turmas de até 8 alunos. A primeira aula é grátis. Quer agendar?'],
        botoes: [['Quero agendar', 'nivel'], ['Tem online?', 'online']],
        nota: 'Quem pergunta preço à noite já sai com aula marcada.'
      },
      online: {
        bot: ['Tem sim! Aulas ao vivo, com professor, por R$ 240 por mês.'],
        botoes: [['Quero agendar', 'nivel']]
      },
      nivel: {
        bot: ['Como está o seu inglês hoje?'],
        botoes: [['Nunca estudei', 'fim'], ['Básico', 'fim'], ['Intermediário', 'fim']]
      },
      fim: {
        bot: ['Anotado! A escola confirma o dia da aula experimental.'],
        nota: 'O pedido chega com o nível, e a escola já indica a turma certa.'
      }
    }
  },
  autoescola: {
    rotulo: 'Autoescola', categoria: 'educacao',
    detalhe: 'Matrícula e aulas', negocio: 'Autoescola Rota Certa', cor: '#2E6B4A', icone: 'car-front',
    sugestao: 'Oi! Vocês têm aula para quem já tem carteira?',
    passos: {
      inicio: {
        bot: ['Oi! Aqui é o atendimento automático da Rota Certa', 'Temos sim! Aulas para habilitados, R$ 90 cada. Câmbio manual ou automático?'],
        botoes: [['Manual', 'periodo'], ['Automático', 'periodo']],
        nota: 'Pedido de aula a qualquer hora, sem ligação.'
      },
      periodo: {
        bot: ['Qual período?'],
        botoes: [['Manhã', 'fim'], ['Tarde', 'fim'], ['Noite', 'fim']]
      },
      fim: {
        bot: ['Anotado! A autoescola confirma o horário da primeira aula.', 'Na véspera eu te lembro.'],
        nota: 'Lembrete automático: menos aula perdida.'
      }
    }
  }
};

// Grupos de negócio (galeria de sites e conversas)
export const CATEGORIAS = [
  ['saude', 'Saúde', 'stethoscope'],
  ['beleza', 'Beleza', 'scissors'],
  ['alimentacao', 'Alimentação', 'utensils'],
  ['comercio', 'Comércio', 'shopping-bag'],
  ['servicos', 'Serviços', 'briefcase'],
  ['educacao', 'Educação e esporte', 'graduation-cap']
];

// Modelos de site completos (pasta site/modelos/<id>/).
export const MODELOS = [
  {
    id: 'clinica',
    categoria: 'saude',
    nome: 'Clínica Sorriso Vivo',
    area: 'Clínica odontológica',
    cor: '#6E8F86',
    icone: 'stethoscope',
    descricao: 'Tratamentos, pedido de horário que monta a mensagem do WhatsApp, perguntas frequentes e localização.'
  },
  {
    id: 'restaurante',
    categoria: 'alimentacao',
    nome: 'Cantina da Praça',
    area: 'Restaurante',
    cor: '#A0634B',
    icone: 'utensils',
    descricao: 'Cardápio por categoria, carrinho de pedido e envio do pedido pronto pelo WhatsApp.'
  },
  {
    id: 'loja',
    categoria: 'comercio',
    nome: 'Ateliê Lume',
    area: 'Loja de roupas',
    cor: '#8C7A66',
    icone: 'shirt',
    descricao: 'Vitrine com filtros, escolha de tamanho e cor, e reserva da peça pelo WhatsApp.'
  },
  {
    id: 'imobiliaria',
    categoria: 'servicos',
    nome: 'Morada Imóveis',
    area: 'Imobiliária',
    cor: '#1F4447',
    icone: 'house',
    descricao: 'Busca por bairro, tipo e quartos, favoritos, visita agendada pelo WhatsApp e área para quem quer anunciar.'
  },
  {
    id: 'academia',
    categoria: 'educacao',
    nome: 'Academia Pulso',
    area: 'Academia',
    cor: '#1B1C1A',
    icone: 'dumbbell',
    descricao: 'Grade de aulas por dia com reserva, planos que mudam de valor por período e pedido de aula experimental.'
  },
  {
    id: 'contabilidade',
    categoria: 'servicos',
    nome: 'Contábil Prisma',
    area: 'Escritório de contabilidade',
    cor: '#23395B',
    icone: 'briefcase',
    descricao: 'Serviço certo para cada caso (MEI, empresa, abrir empresa), troca de contador e lembretes de prazos.'
  },
  {
    id: 'medica',
    categoria: 'saude',
    nome: 'Clínica Vida Plena',
    area: 'Clínica médica',
    cor: '#2F6E8C',
    icone: 'stethoscope',
    caminho: 'modelos/molde/index.html?negocio=medica',
    descricao: 'Especialidades, pedido de horário com convênio ou particular e dúvidas.'
  },
  {
    id: 'psicologo',
    categoria: 'saude',
    nome: 'Espaço Escuta',
    area: 'Psicologia',
    cor: '#9A5A44',
    icone: 'brain',
    caminho: 'modelos/molde/index.html?negocio=psicologo',
    descricao: 'Atendimentos presenciais e online, primeira conversa pelo WhatsApp e aviso do CVV.'
  },
  {
    id: 'fisioterapia',
    categoria: 'saude',
    nome: 'Movimento Fisioterapia',
    area: 'Fisioterapia e pilates',
    cor: '#2F7F72',
    icone: 'activity',
    caminho: 'modelos/molde/index.html?negocio=fisioterapia',
    descricao: 'Tratamentos, avaliação agendada e lembrete das sessões.'
  },
  {
    id: 'nutricionista',
    categoria: 'saude',
    nome: 'Nutri Equilíbrio',
    area: 'Nutricionista',
    cor: '#5C7A33',
    icone: 'apple',
    caminho: 'modelos/molde/index.html?negocio=nutricionista',
    descricao: 'Consultas por objetivo, presencial ou online.'
  },
  {
    id: 'veterinaria',
    categoria: 'saude',
    nome: 'Clínica Bicho Bom',
    area: 'Clínica veterinária',
    cor: '#3B6EA5',
    icone: 'paw-print',
    caminho: 'modelos/molde/index.html?negocio=veterinaria',
    descricao: 'Consultas, vacinas com lembrete e horário separado para gatos.'
  },
  {
    id: 'salao',
    categoria: 'beleza',
    nome: 'Salão Flor de Lis',
    area: 'Salão de beleza',
    cor: '#A35C66',
    icone: 'scissors',
    caminho: 'modelos/molde/index.html?negocio=salao',
    descricao: 'Serviços com preço, agendamento por dia e período.'
  },
  {
    id: 'barbearia',
    categoria: 'beleza',
    nome: 'Barbearia Navalha',
    area: 'Barbearia',
    cor: '#8C6531',
    icone: 'scissors',
    caminho: 'modelos/molde/index.html?negocio=barbearia',
    descricao: 'Reserva com escolha de barbeiro e clube mensal.'
  },
  {
    id: 'estetica',
    categoria: 'beleza',
    nome: 'Essência Estética',
    area: 'Estética',
    cor: '#86694C',
    icone: 'flower-2',
    caminho: 'modelos/molde/index.html?negocio=estetica',
    descricao: 'Procedimentos, pacotes e agendamento de sessões.'
  },
  {
    id: 'confeitaria',
    categoria: 'alimentacao',
    nome: 'Doce Fornada',
    area: 'Confeitaria e padaria',
    cor: '#7A4B32',
    icone: 'cake-slice',
    caminho: 'modelos/molde/index.html?negocio=confeitaria',
    descricao: 'Encomendas com carrinho, total e retirada ou entrega.'
  },
  {
    id: 'pizzaria',
    categoria: 'alimentacao',
    nome: 'Bella Massa',
    area: 'Pizzaria e delivery',
    cor: '#B23A2E',
    icone: 'pizza',
    caminho: 'modelos/molde/index.html?negocio=pizzaria',
    descricao: 'Cardápio com carrinho, total e pedido pronto pelo WhatsApp.'
  },
  {
    id: 'petshop',
    categoria: 'comercio',
    nome: 'Pet Amigo',
    area: 'Pet shop, banho e tosa',
    cor: '#A8621F',
    icone: 'dog',
    caminho: 'modelos/molde/index.html?negocio=petshop',
    descricao: 'Banho e tosa por porte, leva e traz e aviso de pronto.'
  },
  {
    id: 'oficina',
    categoria: 'servicos',
    nome: 'Auto Center Torque',
    area: 'Oficina mecânica',
    cor: '#2A4A73',
    icone: 'wrench',
    caminho: 'modelos/molde/index.html?negocio=oficina',
    descricao: 'Serviços e pedido de orçamento com tipo de carro e urgência.'
  },
  {
    id: 'advocacia',
    categoria: 'servicos',
    nome: 'Prado Advocacia',
    area: 'Advocacia',
    cor: '#1F4D3F',
    icone: 'scale',
    caminho: 'modelos/molde/index.html?negocio=advocacia',
    descricao: 'Áreas de atuação e consulta agendada, sem preço e sem promessa.'
  },
  {
    id: 'idiomas',
    categoria: 'educacao',
    nome: 'Fala Bem Idiomas',
    area: 'Escola de idiomas',
    cor: '#2F5DA8',
    icone: 'languages',
    caminho: 'modelos/molde/index.html?negocio=idiomas',
    descricao: 'Cursos com preço e aula experimental por nível.'
  },
  {
    id: 'autoescola',
    categoria: 'educacao',
    nome: 'Autoescola Rota Certa',
    area: 'Autoescola',
    cor: '#2E6B4A',
    icone: 'car-front',
    caminho: 'modelos/molde/index.html?negocio=autoescola',
    descricao: 'Cursos por categoria e pedido de matrícula ou aula.'
  }
];

// Painel de demonstração (página Sistemas)
export const ALUNOS = [
  ['Ana Souza', 'Mensal', 'pago'],
  ['Bruno Lima', 'Mensal', 'pendente'],
  ['Carla Mendes', 'Trimestral', 'pago'],
  ['Diego Rocha', 'Mensal', 'hoje'],
  ['Elaine Prado', 'Mensal', 'pendente'],
  ['Fábio Nunes', 'Trimestral', 'pago']
];

export const AGENDA = [
  ['08:00', 'Marina Costa', 'Limpeza'],
  ['09:30', 'Paulo Henrique', 'Avaliação'],
  ['11:00', 'Rita Alves', 'Clareamento'],
  ['14:00', 'João Pedro', 'Avaliação'],
  ['16:30', 'Luciana Reis', 'Limpeza']
];

export const ESTOQUE = [
  ['Vestido azul', 'M', 4],
  ['Vestido preto', 'G', 1],
  ['Calça pantalona', 'P', 6],
  ['Blusa de linho', 'M', 2],
  ['Saia midi', 'G', 0]
];

// Pedidos de um restaurante (quadro: novo, em preparo, saiu para entrega)
export const PEDIDOS = [
  ['#1042', 'Juliana', '2× Prato do dia', 'R$ 49,80', 0],
  ['#1043', 'Marcos', '1× Feijoada, 1× Suco', 'R$ 36,90', 0],
  ['#1040', 'Patrícia', '3× Marmita grande', 'R$ 65,70', 1],
  ['#1039', 'Roberto', '1× Lasanha', 'R$ 26,90', 2]
];

// Ordens de serviço de uma oficina (recebido, em serviço, pronto)
export const ORDENS = [
  ['OS 318', 'Gol 2015', 'Carlos', 'Troca de óleo e filtros', 'R$ 240', 1],
  ['OS 319', 'Onix 2019', 'Fernanda', 'Revisão dos freios', 'R$ 580', 0],
  ['OS 320', 'HB20 2021', 'Lucas', 'Alinhamento e balanceamento', 'R$ 150', 0],
  ['OS 317', 'Strada 2018', 'Mário', 'Troca da embreagem', 'R$ 1.350', 2]
];

// Funil de vendas de uma imobiliária (novo contato, visita, proposta, fechado)
export const LEADS = [
  ['Renata', 'Casa 3 quartos, Centro', 0],
  ['Paulo', 'Apartamento 2 quartos', 0],
  ['Sílvia', 'Terreno 360 m²', 1],
  ['André', 'Casa com quintal', 2],
  ['Bianca', 'Apartamento no Centro', 3]
];

// Financeiro (contas a receber e a pagar do mês)
export const LANCAMENTOS = [
  ['entrada', 'Vendas da semana', 3200, true],
  ['entrada', 'Serviço para cliente Souza', 850, false],
  ['saida', 'Aluguel da loja', 1800, true],
  ['saida', 'Fornecedor de embalagens', 420, false],
  ['saida', 'Energia elétrica', 310, false]
];
