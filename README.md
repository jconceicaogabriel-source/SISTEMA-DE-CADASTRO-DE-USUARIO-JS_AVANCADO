# 📋 Sistema de Cadastro de Clientes (API)

> Integração em tempo real usando **Fetch API** e banco de dados **CrudCrud**.

---

## 📁 Estrutura do Projeto

```
SISTEMA-DE-CADASTRO-DE-USUARIO-JS_AVANCADO/
├── index.html        # Estrutura da página (formulário + tabela)
├── styles.css        # Estilização visual responsiva
└── JS/
    ├── app.js        # Código principal — orquestra tudo com import/export
    ├── classes.js    # Definição das classes (POO): Cliente e ClienteAPI
    └── utils.js      # Funções utilitárias puras (DOM, contagem, extração)
```

---

## 🚀 Funcionalidades

- **Cadastrar cliente** via formulário (nome + e-mail corporativo)
- **Listar clientes** carregados dinamicamente da API na inicialização
- **Excluir cliente** com confirmação, usando delegação de eventos
- **Contador de clientes** atualizado em tempo real
- **Validação de dados** antes do envio (nome mínimo 2 caracteres, e-mail com `@`)
- **Tratamento de erros** com mensagens na interface e no console

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica da página |
| CSS3 (Flexbox) | Layout responsivo e estilização |
| JavaScript ES6+ | Lógica, POO, programação funcional |
| ES Modules (import/export) | Organização modular do código |
| Fetch API (async/await) | Comunicação assíncrona com a API REST |
| CrudCrud | Backend como serviço (BaaS) para persistência |

---

## 🏗️ Arquitetura

### `classes.js` — Programação Orientada a Objetos

**`Cliente`**
- Armazena `nome`, `email` e `_id` (gerado pela API)
- `validar()` — lança erro se os dados forem inválidos
- `resumo()` — retorna string `"nome - email"`
- `paraJSON()` — serializa para o formato esperado pela API

**`ClienteAPI`**
- Recebe a URL da API no construtor
- `listar()` — GET: busca todos os clientes e os converte em instâncias de `Cliente`
- `cadastrar(cliente)` — POST: envia novo cliente para a nuvem
- `excluir(id)` — DELETE: remove cliente pelo ID

### `utils.js` — Funções Utilitárias Puras

| Função | Descrição |
|---|---|
| `encontrarClientePorNome(clientes, nome)` | Busca cliente por nome (case-insensitive) — usa `find()` |
| `contarClientes(clientes)` | Conta total de clientes — usa `reduce()` |
| `extrairEmails(clientes)` | Extrai array de e-mails — usa `map()` |
| `criarLinhaTabela(cliente)` | Cria elemento `<tr>` dinamicamente no DOM |
| `exibirMensagemTabela(corpo, msg, isErro)` | Exibe mensagem de status na tabela |

### `app.js` — Orquestração

- Inicializa a instância de `ClienteAPI` com a URL da API
- `renderizarClientes()` — carrega e exibe todos os clientes na tabela
- Evento `submit` no formulário → cria, valida e cadastra novo cliente
- Evento `click` na tabela (delegação de eventos) → exclui cliente pelo `data-id`

---

## ⚙️ Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/sistema-cadastro-usuario-js-avancado.git
   cd sistema-cadastro-usuario-js-avancado
   ```

2. **Configure a API:**

   Acesse [crudcrud.com](https://crudcrud.com), copie o endpoint gerado e atualize a constante em `JS/app.js`:
   ```js
   const API_URL = "https://crudcrud.com/api/SEU_ID_AQUI/clientes";
   ```

3. **Abra com Live Server:**

   > ⚠️ O projeto usa **ES Modules** (`type="module"`), portanto **não pode ser aberto diretamente** como arquivo local (`file://`). É necessário um servidor HTTP.

   - No VS Code, instale a extensão **Live Server** e clique em **Go Live**
   - Ou use qualquer servidor local (ex: `npx serve .`)

---

## 📌 Conceitos Aplicados

- **POO (Programação Orientada a Objetos)** com `class`, `constructor` e métodos de instância
- **Programação Funcional** com `map()`, `reduce()`, `find()` e `forEach()`
- **Módulos ES6** com `import` / `export` para separação de responsabilidades
- **Async/Await** para operações assíncronas com a Fetch API
- **Delegação de Eventos** para lidar com elementos criados dinamicamente
- **Manipulação do DOM** de forma dinâmica e declarativa

---

## 🔗 Dependências Externas

- [CrudCrud](https://crudcrud.com) — API REST gratuita para prototipagem (IDs expiram periodicamente)

---

## 📄 Licença

Este projeto é de uso educacional e livre para estudo e modificação.
