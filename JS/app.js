// app.js → Código Principal (orquestra tudo usando import/export)
// app.js → Código Principal (orquestra tudo usando import/export)

import { Cliente, ClienteAPI } from "./classes.js";
import {
    criarLinhaTabela,
    exibirMensagemTabela,
    contarClientes,
    extrairEmails
} from "./utils.js";

// Configuração da API
const API_URL = "https://crudcrud.com/api/435c2f7a1db145a6bc4e271916153a43/clientes";
const api = new ClienteAPI(API_URL);

// Referências do DOM
const formCliente = document.getElementById("formCliente");
const tabelaCorpo = document.getElementById("tabelaClientesCorpo");
const contadorEl  = document.getElementById("contadorClientes");

// Renderizar a tabela
async function renderizarClientes() {
    exibirMensagemTabela(tabelaCorpo, "⏳ Carregando dados da API...");

    try {
        // Lista de clientes da API
        const clientes = await api.listar();

        tabelaCorpo.innerHTML = "";

        if (clientes.length === 0) {
            exibirMensagemTabela(tabelaCorpo, "Nenhum cliente cadastrado na nuvem até o momento.");
            atualizarContador(0);
            return;
        }

        // map() - transforma cada cliente em elemento <tr> e insere na tabela.
        clientes
            .map(criarLinhaTabela)
            .forEach(linha => tabelaCorpo.appendChild(linha));

        atualizarContador(contarClientes(clientes));

        // Log auxiliar: lista os e-mails usando extrairEmails() (reduce/map)
        console.log("📧 E-mails cadastrados:", extrairEmails(clientes));

    } catch (erro) {
        console.error("Erro na requisição GET:", erro);
        exibirMensagemTabela(
            tabelaCorpo,
            "❌ Falha ao carregar dados. Verifique se o ID da API está correto ou se expirou.",
            true
        );
    }
}

// Atualizar contador de clientes
function atualizarContador(total) {
    if (contadorEl) contadorEl.textContent = `Total: ${total} cliente(s)`;
}

// Evento: Cadastrar Cliente (POST)
formCliente.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome  = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    try {
        const novoCliente = new Cliente(nome, email);
        novoCliente.validar(); // Validação via método da classe

        await api.cadastrar(novoCliente);

        formCliente.reset();
        document.getElementById("nome").focus();
        await renderizarClientes();

    } catch (erro) {
        console.error("Erro na requisição POST:", erro);
        alert(`Não foi possível salvar: ${erro.message}`);
    }
});

// Evento: Excluir Cliente (DELETE) via delegação de evento.
// Usamos addEventListener na tabela, sem onclick inline no HTML (DOM).
tabelaCorpo.addEventListener("click", async function (event) {
    const btn = event.target.closest(".btn-excluir");
    if (!btn) return;

    const id = btn.dataset.id;
    if (!confirm("Tem certeza que deseja remover este cliente permanentemente da nuvem?")) return;

    try {
        await api.excluir(id);
        await renderizarClientes();
    } catch (erro) {
        console.error("Erro na requisição DELETE:", erro);
        alert("Falha ao excluir o registro. Tente novamente.");
    }
});

// ─── Inicialização ──────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", renderizarClientes);