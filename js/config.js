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
  // Valores "a partir de" do dono (20/10/2026): preço de entrada, do básico do básico.
  planos: [
    { id: 'inicio', nome: 'Site', aPartirDe: 'R$ 339', confirmado: true },
    { id: 'atendimento', nome: 'WhatsApp automático', aPartirDe: 'R$ 497 + R$ 97 por mês', confirmado: true },
    { id: 'sistema', nome: 'Sistema pronto', aPartirDe: 'R$ 597 + R$ 79 por mês', confirmado: true },
    { id: 'sobmedida', nome: 'Sob medida', aPartirDe: 'R$ 1.490', confirmado: true },
    { id: 'pacote', nome: 'Site + WhatsApp', aPartirDe: 'R$ 749 + R$ 97 por mês', confirmado: true },
    { id: 'cuidado', nome: 'Cuidado mensal', aPartirDe: 'de R$ 39 a R$ 149 por mês', confirmado: true }
  ],
  // Descontos: SUGESTÃO de 21/10/2026, ainda não aprovada pelo dono. Troque os valores e mude confirmado para true.
  // Aparecem na página Planos (seção Descontos) por data-config="descontos.<nome>".
  descontos: {
    pacoteCompleto: '15%',
    indicacao: '1 mês grátis',
    indicado: '10%',
    fundador: '20%',
    fundadorVagas: '10',
    anual: '2 meses grátis',
    confirmado: false
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
