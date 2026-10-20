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
  // Valores "a partir de" aprovados pelo dono em 20/10/2026 (base: docs/08-precos-e-novidades.md).
  planos: [
    { id: 'inicio', nome: 'Site', aPartirDe: 'R$ 990', confirmado: true },
    { id: 'atendimento', nome: 'WhatsApp automático', aPartirDe: 'R$ 1.490 + R$ 197 por mês', confirmado: true },
    { id: 'sistema', nome: 'Sistema pronto', aPartirDe: 'R$ 1.500 + R$ 149 por mês', confirmado: true },
    { id: 'sobmedida', nome: 'Sob medida', aPartirDe: 'R$ 4.500', confirmado: true },
    { id: 'pacote', nome: 'Site + WhatsApp', aPartirDe: 'R$ 2.290 + R$ 197 por mês', confirmado: true },
    { id: 'cuidado', nome: 'Cuidado mensal', aPartirDe: 'de R$ 97 a R$ 297 por mês', confirmado: true }
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
