// --- 1. "Pegamos" os elementos do HTML pelos seus IDs ---
// A partir dessas variáveis podemos ler o que o usuário digitou ou modificar a tela
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');
const tipoSelect = document.getElementById('tipo');
const btnAdicionar = document.getElementById('btn-adicionar');
const lista = document.getElementById('lista-transacoes');
const saldoSpan = document.getElementById('saldo');

// --- 2. Função que recalcula o saldo e atualiza a tela ---
function atualizarSaldo() {
  // Pega todos os <li> que possuem a classe "transacao"
  const itens = document.querySelectorAll('.transacao');
  let total = 0;

  // forEach: "para cada" item da lista, execute o que está entre chaves
  itens.forEach(function(item) {
    // dataset.valor e dataset.tipo leem os atributos data-valor e data-tipo
    const valor = Number(item.dataset.valor);
    const tipo = item.dataset.tipo;

    // Se for receita, soma; se for despesa, subtrai
    if (tipo === 'receita') {
      total = total + valor;
    } else {
      total = total - valor;
    }
  });

  // Mostra o total no span formatado com duas casas decimais
  saldoSpan.textContent = 'R$ ' + total.toFixed(2);

  // Remove as classes de cor antigas e adiciona a correta
  saldoSpan.classList.remove('positivo', 'negativo');
  if (total > 0) {
    saldoSpan.classList.add('positivo');   // verde
  } else if (total < 0) {
    saldoSpan.classList.add('negativo');   // vermelho
  }
}

// --- 3. Programa o que acontece ao clicar no botão "Adicionar" ---
btnAdicionar.addEventListener('click', function() {
  // Lê os dados do formulário
  const descricao = descricaoInput.value.trim();   // texto sem espaços extras
  const valor = Number(valorInput.value);          // converte para número
  const tipo = tipoSelect.value;                   // "receita" ou "despesa"

  // Validação: não aceita campos vazios ou valor inválido
  if (descricao === '' || isNaN(valor) || valor <= 0) {
    alert('Por favor, preencha a descrição e um valor maior que zero.');
    return;  // interrompe a função aqui
  }

  // Cria um novo elemento <li> que representará a transação
  const novoItem = document.createElement('li');
  novoItem.classList.add('transacao');   // classe base (estilo comum)
  novoItem.classList.add(tipo);          // adiciona "receita" ou "despesa" (muda a cor da borda)

  // Guarda os dados em atributos invisíveis (data-valor e data-tipo)
  // Eles serão usados depois pelo atualizarSaldo
  novoItem.dataset.valor = valor;
  novoItem.dataset.tipo = tipo;

  // Define o conteúdo HTML dentro do <li>: descrição, valor e botão excluir
  novoItem.innerHTML = `
    <div class="info">
      <strong>${descricao}</strong> - R$ ${valor.toFixed(2)}
    </div>
    <button class="btn-excluir">Excluir</button>
  `;

  // Torna o botão "Excluir" funcional: remove o item e atualiza o saldo
  const btnExcluir = novoItem.querySelector('.btn-excluir');
  btnExcluir.addEventListener('click', function() {
    novoItem.remove();      // tira o <li> da tela
    atualizarSaldo();       // recalcula o total
  });

  // Adiciona o novo item na lista (no final)
  lista.appendChild(novoItem);

  // Limpa os campos do formulário para a próxima transação
  descricaoInput.value = '';
  valorInput.value = '';
  tipoSelect.value = 'receita';

  // Atualiza o saldo total
  atualizarSaldo();
});
