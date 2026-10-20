// "Conte o que você precisa": as opções marcadas viram a mensagem do WhatsApp.
// Nada é enviado nem guardado pelo site: a pessoa confere a mensagem e envia pelo próprio WhatsApp.
const ABERTURA = 'Oi! Vim pela página de planos da Atalho Studio e quero uma proposta.';
const LIMITE = 400;

function juntar(itens) {
  if (itens.length < 2) return itens[0] || '';
  return `${itens.slice(0, -1).join(', ')} e ${itens.at(-1)}`;
}

export function montarMensagem({ servicos = [], area = '', quando = '', detalhes = '' }) {
  const linhas = [ABERTURA];
  if (servicos.length) linhas.push(`Preciso de: ${juntar(servicos)}`);
  if (area) linhas.push(`Área do negócio: ${area}`);
  if (quando) linhas.push(`Para quando: ${quando}`);
  if (detalhes) linhas.push(`Mais detalhes: ${detalhes}`);
  if (linhas.length === 1) linhas.push('Meu negócio é ___.');
  return linhas.join('\n');
}

export function iniciar({ atualizarLink }) {
  const form = document.querySelector('[data-pedido]');
  if (!form) return;
  const previa = form.querySelector('[data-pedido-previa]');
  const enviar = form.querySelector('[data-pedido-enviar]');
  const contador = form.querySelector('[data-pedido-contador]');
  const servicos = [...form.querySelectorAll('input[name="servico"]')];
  const naoSei = servicos.find((i) => i.dataset.naoSei !== undefined);

  function respostas() {
    const marcado = (nome) => form.querySelector(`input[name="${nome}"]:checked`)?.value || '';
    return {
      servicos: servicos.filter((i) => i.checked).map((i) => i.value),
      area: marcado('area'),
      quando: marcado('quando'),
      detalhes: form.elements.detalhes.value.replace(/\s+/g, ' ').trim().slice(0, LIMITE)
    };
  }

  function atualizar() {
    const mensagem = montarMensagem(respostas());
    previa.textContent = mensagem;
    enviar.dataset.waMensagem = mensagem;
    atualizarLink(enviar);
    if (contador) contador.textContent = `${form.elements.detalhes.value.length} de ${LIMITE}`;
  }

  form.addEventListener('change', (evento) => {
    const alvo = evento.target;
    // "Ainda não sei" não combina com as outras opções: marcar um desmarca o outro.
    if (alvo.name === 'servico' && alvo.checked) {
      for (const opcao of servicos) {
        if (alvo === naoSei ? opcao !== naoSei : opcao === naoSei) opcao.checked = false;
      }
    }
    atualizar();
  });
  form.addEventListener('input', atualizar);
  form.addEventListener('submit', (evento) => evento.preventDefault());
  atualizar();
}
