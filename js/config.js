// Dados do negócio. Tudo o que o dono troca fica aqui, nada espalhado pelo HTML.
// Texto ainda não preenchido e plano com confirmado: false bloqueiam a publicação (tools/checar-site.js).
export const CONFIG = {
  marca: {
    nome: 'Atalho Studio',
    primeiroNome: '[PREENCHER: primeiro nome]',
    cidade: 'Governador Valadares',
    uf: 'MG'
  },
  contato: {
    // Só dígitos: 55 + DDD (GV é 33) + número. Ex.: 5533999990000
    whatsapp: '[PREENCHER: número do WhatsApp do negócio]',
    email: '[PREENCHER: e-mail profissional]',
    instagram: '[PREENCHER: @ do Instagram]'
  },
  // As áreas das demonstrações (clínica, loja...) ficam em js/dados-demo.js.
  // Valores de exemplo do docs/01. Só vira confirmado: true quando o dono confirmar.
  planos: [
    { id: 'inicio', nome: 'Início', aPartirDe: 'R$ 990', confirmado: false },
    { id: 'atendimento', nome: 'Atendimento', aPartirDe: 'R$ 1.800 + R$ 197 por mês', confirmado: false },
    { id: 'sobmedida', nome: 'Sob medida', aPartirDe: 'R$ 4.500', confirmado: false },
    { id: 'cuidado', nome: 'Cuidado mensal', aPartirDe: 'de R$ 97 a R$ 297 por mês', confirmado: false }
  ],
  prazos: {
    entrega: '[PREENCHER: prazo de entrega que cumpre]',
    ajustes: '[PREENCHER: dias de ajustes depois da entrega]',
    pagamento: '[PREENCHER: forma de pagamento]'
  },
  // Caso da imobiliária: só aparece com autorização do cliente (nome e telas com dados borrados).
  casoReal: { autorizado: false, nome: '' },
  diagnostico: { ativo: false },
  medicao: { ga4Id: '', pixelId: '' },
  dominio: '',
  cnpj: ''
};
