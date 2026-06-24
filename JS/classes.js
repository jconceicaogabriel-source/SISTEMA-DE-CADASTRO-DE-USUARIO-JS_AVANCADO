// classes.js → Definição das Classes (POO)
export class Cliente {
    constructor(nome, email, _id = null) {
        this._id = _id;
        this.nome = nome;
        this.email = email;
    }
    // Método para validar os dados do cliente antes de enviar
    validar() {
        if (!this.nome || this.nome.trim().length < 2) {
            throw new Error("Nome inválido. Deve ter ao menos 2 caracteres.");
        }
        if (!this.email || !this.email.includes("@")) {
            throw new Error("E-mail inválido.");
        }
        return true;
    }
    // Retorna uma representação resumida do cliente
    resumo() {
        return `${this.nome} - ${this.email}`;
    }
    // Converte os dados para envio na API (sem o _id)
    paraJSON() {
        return { nome: this.nome.trim(), email: this.email.trim() };
    }
}
export class ClienteAPI {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    async listar() {
        const resposta = await fetch(this.apiUrl);
        if (!resposta.ok) throw new Error("Erro ao buscar clientes na API.");
        const dados = await resposta.json();
        // map() → Técnica funcional: converte cada objeto bruto em instância de Cliente
        return dados.map(c => new Cliente(c.nome, c.email, c._id));
    }
    async cadastrar(cliente) {
        cliente.validar();
        const resposta = await fetch(this.apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente.paraJSON())
        });
        if (!resposta.ok) throw new Error("Erro ao cadastrar cliente.");
        return await resposta.json();
    }
    async excluir(id) {
        const resposta = await fetch(`${this.apiUrl}/${id}`, {
            method: "DELETE"
        });
        if (!resposta.ok) throw new Error("Erro ao excluir cliente.");
    }
}