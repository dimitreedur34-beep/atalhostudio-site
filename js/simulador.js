// Simulador "quanto você deixa de ganhar por mês". A conta acontece só no navegador:
// os números não são enviados, não são guardados e não entram na mensagem do WhatsApp.
const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });
const reaisComCentavos = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const valorDigitado = (valor) => (Number.isInteger(valor) ? reais : reaisComCentavos).format(valor);
const numero = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });

const CAMPOS = {
  contatos: { min: 0, max: 1_000_000, inteiro: true, erro: 'Use um número inteiro, por exemplo 120.' },
  esfriam: { min: 0, max: 100, erro: 'Use um número de 0 a 100.' },
  fecham: { min: 0, max: 100, erro: 'Use um número de 0 a 100.' },
  valor: { min: 0, max: 10_000_000, erro: 'Use só números, por exemplo 300 ou 89,90.' }
};

// Aceita "1.500", "89,90" e "89.90". Vazio = null; texto inválido = NaN.
export function lerNumero(texto) {
  let limpo = String(texto).replace(/\s|R\$|%/g, '');
  if (!limpo) return null;
  if (limpo.includes(',')) limpo = limpo.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(limpo)) limpo = limpo.replace(/\./g, '');
  return /^\d+(\.\d+)?$/.test(limpo) ? Number(limpo) : NaN;
}

export function calcular({ contatos, esfriam, fecham, valor }) {
  return contatos * (esfriam / 100) * (fecham / 100) * valor;
}

export function iniciarSimulador(form = document.querySelector('[data-simulador]')) {
  if (!form) return;
  const resultado = form.querySelector('[data-resultado]');
  const vazio = form.querySelector('[data-vazio]');

  // O erro só aparece ao sair do campo, para não reclamar enquanto a pessoa digita.
  function lerCampo(nome, mostrarErro) {
    const entrada = form.elements[nome];
    const regra = CAMPOS[nome];
    const aviso = document.getElementById(`${entrada.id}-erro`);
    const valor = lerNumero(entrada.value);
    const valido =
      valor !== null && !Number.isNaN(valor) && valor >= regra.min && valor <= regra.max && (!regra.inteiro || Number.isInteger(valor));
    if (valor === null || valido) {
      entrada.removeAttribute('aria-invalid');
      aviso.hidden = true;
      aviso.textContent = '';
    } else if (mostrarErro) {
      entrada.setAttribute('aria-invalid', 'true');
      aviso.textContent = regra.erro;
      aviso.hidden = false;
    }
    return valido ? valor : null;
  }

  function atualizar(evento) {
    const valores = {};
    let completo = true;
    for (const nome of Object.keys(CAMPOS)) {
      const valor = lerCampo(nome, evento?.type === 'change' && evento.target.name === nome);
      if (valor === null) completo = false;
      else valores[nome] = valor;
    }
    resultado.hidden = !completo;
    vazio.hidden = completo;
    if (!completo) return;
    const perda = calcular(valores);
    form.querySelector('[data-valor]').textContent = reais.format(perda);
    form.querySelector('[data-por-ano]').textContent = reais.format(perda * 12);
    form.querySelector('[data-conta]').textContent =
      `${numero.format(valores.contatos)} contatos × ${numero.format(valores.esfriam)}% que desistem × ` +
      `${numero.format(valores.fecham)}% que fechariam × ${valorDigitado(valores.valor)}`;
  }

  form.addEventListener('submit', (evento) => evento.preventDefault());
  form.addEventListener('input', atualizar);
  form.addEventListener('change', atualizar);
}
