# API - SISTEMA DE ENTREGAS

A API - SISTEMA DE ENTREGAS é uma aplicação que permite o cadastro de entregas para uso em geral.

## Tecnologias Utilizadas

A API foi desenvolvida utilizando as seguintes tecnologias:

- Node.js com Express e Typescript para criação do servidor e definição de rotas.
- Docker para a criação de contêineres do banco de dados PostgreSQL.
- Prisma para gerenciamento da conexão com o banco de dados e execução de queries.
- Bibliotecas e pacotes utilizados incluem: Yup para validação de entradas, dotenv para gerenciamento de variáveis de ambiente, vitest para a criação e execução dos testes unitários.

## Como Baixar e Rodar o Projeto Localmente?

Siga os passos abaixo para baixar e executar o projeto em seu ambiente local:

1. Clone o repositório do projeto para o seu ambiente local:

```
    git clone git@github.com:leorjr/api_sistema_entregas.git
```

2. Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis necessárias para o funcionamento do projeto.

3. Verifique se você tem o Docker e o Docker Compose instalados em sua máquina. Se não estiverem instalados, siga as instruções de instalação nos sites oficiais do Docker e Docker Compose.

4. Abra um terminal e inicialize a aplicação com o seguinte comando:

```
    docker-compose up --build
```

Após seguir esses passos, sua aplicação estará rodando em sua máquina local, no endereço ao qual aparece em seu terminal e estará pronta para receber requisições;

## ENDPOINTS

A seguir, são apresentados exemplos de endpoints da API e seus retornos:

### Cadastrar uma entrega

- **Endpoint:** `/api/entregas/`
- **Método:** POST
- **Corpo da Requisição (JSON):**

```json
{
  "nome": "leonardo",
  "data": "2023-02-02",
  "partida": {
    "lat": "-401.000",
    "long": "600.000"
  },
  "destino": {
    "lat": "-600.000",
    "long": "700.000"
  }
}
```

-- **Resposta (JSON):**

```json
{
  "success": true,
  "status": 201,
  "data": {
    "id": 1,
    "nome": "leonardo",
    "data": "2023-02-02T00:00:00.000Z",
    "partida": {
      "lat": "-401.000",
      "long": "600.000"
    },
    "destino": {
      "lat": "-600.000",
      "long": "700.000"
    }
  }
}
```

### Listar entregas:

- **Endpoint:** `/api/entregas/`
- **Método:** GET
- **Parâmetros opcionais da URL:** limit, offset
- **Corpo da Requisição (JSON):**

```json
    sem corpo
```

-- **Resposta (JSON):**

```json
{
  "success": true,
  "status": 200,
  "data": {
    "entregas": [
      {
        "id": 1,
        "nome": "leonardo",
        "data": "2023-02-02T00:00:00.000Z",
        "partida": {
          "lat": "-401.000",
          "long": "600.000"
        },
        "destino": {
          "lat": "-600.000",
          "long": "700.000"
        }
      }
    ],
    "count": 1
  }
}
```

### Buscar uma entrega por ID:

- **Endpoint:** `/api/entregas`
- **Método:** GET
- **Parâmetros da URL:** id
- **Corpo da Requisição (JSON):**

```json
    sem corpo
```

-- **Resposta (JSON):**

```json
{
  "success": true,
  "status": 200,
  "data": {
    "id": 1,
    "nome": "leonardo",
    "data": "2023-02-02T00:00:00.000Z",
    "partida": {
      "lat": "-401.000",
      "long": "600.000"
    },
    "destino": {
      "lat": "-600.000",
      "long": "700.000"
    }
  }
}
```

### Documentação automática via swagger:

- **Endpoint:** `/api/docs/`
- **Método:** GET
- **Corpo da Requisição (JSON):**

```json
    sem corpo
```

Aqui, você terá acesso a documentação automática via swagger, caso ache interessante;

### Testes

Para os rodar os testes que foram implementados, os mesmos devem ser feitos fora do container docker. Logo, será necessário instalar as dependencias do projeto em sua própria máquina. Siga os passos:

1. Dentro do diretório do projeto, rode o seguinte comando, ao qual instalará todas as dependencias do projeto:

```
  npm i
```

2. Feito isso, você já poderá executar os testes com o seguinte comando:

```
  npm run test
```
