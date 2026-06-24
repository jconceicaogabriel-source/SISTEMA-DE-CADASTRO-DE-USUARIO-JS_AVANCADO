// utils.js → Funções Auxiliares (Programação Funcional)
/**
 * Filtra clientes pelo nome usando find() — retorna o primeiro que corresponde.
 * Função pura: não altera o array original.
 */
export function encontrarClientePorNome(clientes, nome) {
    return clientes.find(c =>
        c.nome.toLowerCase().includes(nome.toLowerCase())
    );
}
/**
 * Conta o total de clientes usando reduce() — técnica funcional.
 * Função pura: apenas soma sem efeitos colaterais.
 */
export function contarClientes(clientes) {
    return clientes.reduce((total) => total + 1, 0);
}
/**
 * Extrai apenas os e-mails da lista usando map() — técnica funcional.
 * Função pura: retorna novo array sem modificar o original.
 */
export function extrairEmails(clientes) {
    return clientes.map(c => c.email);
}
/**
 * Monta uma linha <tr> de forma dinâmica para um cliente.
 * Função pura de utilitário de UI.
 */
export function criarLinhaTabela(cliente) {
    const linha = document.createElement("tr");
    linha.dataset.id = cliente._id;
    linha.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td class="txt-centro">
            <button class="btn-excluir" data-id="${cliente._id}">Excluir</button>
        </td>
    `;
    return linha;
}
/**
 * Exibe uma mensagem de status na tabela (carregando, vazio, erro).
 */
export function exibirMensagemTabela(tabelaCorpo, mensagem, isErro = false) {
    tabelaCorpo.innerHTML = `
        <tr>
            <td colspan="3" class="status-carregando" style="${isErro ? 'color:#e53e3e;' : ''}">
                ${mensagem}
            </td>
        </tr>
    `;
}