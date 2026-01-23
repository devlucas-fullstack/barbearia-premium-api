# Barbearia Premium API

## Descrição

Barbearia Premium é uma **API RESTful** para gerenciar agendamentos de serviços de uma barbearia. A API foi desenvolvida com **Node.js**, **Express**, **TypeScript**, **Prisma** e outras bibliotecas modernas para fornecer endpoints seguros e eficientes para criação, visualização e gerenciamento de agendamentos, usuários e autenticação.

## Tecnologias Utilizadas

- **Node.js**  
- **Express**  
- **TypeScript**  
- **Prisma ORM**  
- **PostgreSQL** (presumido pelo uso do Prisma com SQL)  
- **JSON Web Tokens (JWT)**  
- **Zod** para validação de entradas  
- **bcrypt** para hashing de senhas  
- **CORS** e **express-async-errors**

## Funcionalidades

A API contempla (ou deve contemplar) os seguintes recursos:

- Cadastro de usuários com senha segura  
- Login e geração de token JWT  
- Criação, listagem, edição e cancelamento de agendamentos  
- Validação de dados de entrada com **Zod**  
- Tratamento de erros centralizado  

## Scripts Disponíveis

No `package.json` há os seguintes scripts:

```bash
# Executar a API em modo de desenvolvimento
npm run start
````

## Como Rodar o Projeto

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

* **Node.js** (versão compatível)
* **npm** ou **yarn**
* **Banco de dados** (configurado via Prisma — normalmente PostgreSQL)

### Passo a passo

1. Clone este repositório:

```bash
git clone https://github.com/devlucas-fullstack/barbearia-premium-api.git
cd barbearia-premium-api
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com as variáveis de ambiente necessárias (ex.: conexão com o banco, secret JWT).

4. Execute as migrations do Prisma (ajuste conforme seu modelo):

```bash
npx prisma migrate dev
```

5. Inicie a API:

```bash
npm run start
```

A API deverá iniciar no endereço configurado (por padrão `localhost:porta` conforme seu setup).

## Licença

Este projeto está licenciado sob a **ISC License**.

## Autor

**Lucas Vinícius**
