# TEC Challenge - Backend

API REST para gestão de pedidos de laboratório com autenticação JWT.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express**
- **MongoDB** (Mongoose)
- **Vitest**
- **Zod** para validação dos dados
- **JWT** para autenticação

## 📋 Funcionalidades

### Autenticação
- Registro de usuários com email e senha
- Login com geração de token JWT
- Proteção de rotas sensíveis (middleware de autenticação com JWT)

### Gestão de Pedidos
- Criação de pedidos com serviços e valores
- Listagem paginada com filtros
- Transição de estados com validação de fluxo
- Validações de regras de negócio

## 🔧 Instalação e Execução

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e configure:

```env
PORT=3000
MONGODB_URI=sua-conexão-com-mongodb-aqui
JWT_SECRET=sua-chave-secreta-aqui
JWT_EXPIRES_IN=1d
```

### 3. Executar o projeto

**Modo desenvolvimento:**
```bash
npm run dev
```

**Modo produção:**
```bash
npm run build
npm start
```

**Executar testes:**
```bash
npm test
```

## 📡 Rotas da API

### Autenticação (públicas)

#### `POST /auth/register`
Registra um novo usuário.

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta:** `201 Created`
```json
{
  "message": "Usuário criado com sucesso"
}
```

#### `POST /auth/login`
Autentica um usuário e retorna token JWT.

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Pedidos (protegidas - requer token JWT)

**Header obrigatório:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

#### `POST /orders`
Cria um novo pedido.

**Body:**
```json
{
  "lab": "Laboratório ABC",
  "patient": "João Silva",
  "customer": "Cliente XYZ",
  "services": [
    {
      "name": "Hemograma",
      "value": 50
    },
    {
      "name": "Glicose",
      "value": 30
    }
  ]
}
```

**Resposta:** `201 Created`
```json
{
  "_id": "6959f243f36add6b46b5a048",
  "lab": "Laboratório ABC",
  "patient": "João Silva",
  "customer": "Cliente XYZ",
  "state": "CREATED",
  "status": "ACTIVE",
  "services": [...]
}
```

#### `GET /orders`
Lista pedidos com paginação e filtros.

**Query params (opcionais):**
- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 10, máx: 100)
- `state` - Filtrar por estado: `CREATED`, `ANALYSIS` ou `COMPLETED`

**Exemplo:**
```
GET /orders?page=1&limit=20&state=CREATED
```

**Resposta:** `200 OK`
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

#### `PATCH /orders/:id/advance`
Avança o estado do pedido seguindo o fluxo: `CREATED` → `ANALYSIS` → `COMPLETED`

**Resposta:** `200 OK`
```json
{
  "_id": "6959f243f36add6b46b5a048",
  "state": "ANALYSIS",
  ...
}
```

## 🎯 Regras de Negócio

### Validações de Pedidos
- ✅ Pedido deve ter **ao menos 1 serviço**
- ✅ Valor total **não pode ser zero**
- ✅ Todas as rotas de pedidos **exigem autenticação**

### Fluxo de Estados
```
CREATED → ANALYSIS → COMPLETED
```

- ✅ Transições seguem ordem **estrita**
- ✅ **Não é possível** pular etapas
- ✅ **Não é possível** retroceder
- ✅ Pedidos com `status: DELETED` **não podem avançar**

## 🧪 Testes

Os testes usam **mocks do Vitest** e cobrem:
- Transições de estado válidas
- Bloqueios de ações inválidas

Execute com:
```bash
npm test           # Executar uma vez
npm run test:watch # Modo watch
```

## 📮 Postman Collection (Opcional)

Na pasta `postman/` você encontra collections prontas para importar no Postman:
- `tec-challenge.postman_collection.json` - Collection com todas as rotas
- `tec-challenge.postman_environment.json` - Variáveis de ambiente

**Como usar (sugestão, caso use Postman):**
1. Abra o Postman
2. Importe a collection (`postman/tec-challenge.postman_collection.json`)
3. Importe o environment (`postman/tec-challenge.postman_environment.json`)
4. Configure a variável `baseUrl` no environment (padrão: `http://localhost:3000`)
5. Faça login e o token será salvo automaticamente

## 🏗️ Arquitetura

```
src/
├── app.ts                    # Configuração Express
├── server.ts                 # Inicialização
├── config/
│   ├── db.ts                 # Conexão MongoDB
│   └── env.ts                # Variáveis de ambiente
├── controllers/              # Handlers de requisições
├── middlewares/
│   ├── auth.middleware.ts    # Autenticação JWT
│   └── errorHandler.ts       # Tratamento de erros
├── models/                   # Schemas Mongoose
├── routes/                   # Definição de rotas
├── schemas/                  # Validação Zod
└── services/                 # Lógica de negócio
```

## ✨ Diferenciais

- ✅ Arquitetura em camadas
- ✅ Divisão de responsabilidades
- ✅ Tipagem completa TypeScript
- ✅ Tratamento de erros centralizado
- ✅ Validação com Zod
- ✅ Testes unitários
- ✅ Express-async-errors para tratamento automático de erros async
- ✅ Paginação e filtros
- ✅ Documentação completa
