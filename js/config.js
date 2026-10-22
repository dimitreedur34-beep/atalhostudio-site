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
  // Valores aprovados pelo dono em 22/10/2026 (docs/12-plano-de-precificacao.md). Implantação: Pix à vista
  // ou até 3x no cartão com a taxa da operadora repassada. Mensalidade: Pix ou boleto.
  planos: [
    { id: 'inicio', nome: 'Site', aPartirDe: 'R$ 439', confirmado: true },
    { id: 'atendimento', nome: 'WhatsApp automático', aPartirDe: 'R$ 597 + R$ 149 por mês', confirmado: true },
    { id: 'sistema', nome: 'Sistema', aPartirDe: 'R$ 900 + R$ 149 por mês', confirmado: true },
    { id: 'sobmedida', nome: 'Sistema sob medida', aPartirDe: 'R$ 5.000 + R$ 199 por mês', confirmado: true },
    { id: 'pacote', nome: 'Os três juntos', aPartirDe: 'R$ 3.500 + R$ 498 por mês', confirmado: true },
    { id: 'cuidado', nome: 'Cuidado mensal', aPartirDe: 'R$ 49 por mês', confirmado: true },
    { id: 'assinatura', nome: 'Site por assinatura', aPartirDe: 'R$ 200 + R$ 100 por mês', confirmado: true }
  ],
  // Descontos aprovados em 22/10/2026. Aparecem na página Planos (seção Descontos) por data-config="descontos.<nome>".
  descontos: {
    pacoteCompleto: 'R$ 487',
    indicacao: '1 mês grátis',
    indicado: '10%',
    fundador: '20%',
    fundadorVagas: '10',
    anual: '2 meses grátis',
    confirmado: true
  },
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
