# TEC Challenge - Backend

API REST para gestão de pedidos de laboratório com autenticação JWT.

## Tecnologias

- Node.js + TypeScript
- Express
- Mongoose (MongoDB)
- JWT (jsonwebtoken)
- Zod (validação)
- Vitest (testes)

## Estrutura Implementada

### Autenticação
- **POST /auth/register** - Registro de usuário
- **POST /auth/login** - Login (retorna JWT)

### Pedidos (Protegidas por JWT)
- **POST /orders** - Criar pedido
- **GET /orders** - Listar pedidos (paginação + filtro por state)
- **PATCH /orders/:id/advance** - Avançar estado do pedido

## Regras de Negócio

### Validações
- ✅ Pedido deve ter ao menos 1 serviço
- ✅ Valor total não pode ser zero
- ✅ Todas as rotas de pedidos exigem autenticação

### Fluxo de Estados
```
CREATED → ANALYSIS → COMPLETED
```

- ✅ Transições devem seguir a ordem estrita
- ✅ Não é possível pular etapas
- ✅ Não é possível retroceder
- ✅ Pedidos DELETED não podem avançar

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tec-challenge
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

## Executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

### Testes
```bash
npm test
```

### Testes em modo watch
```bash
npm run test:watch
```

## Uso da API

### 1. Registrar usuário
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"123456"}'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"123456"}'
```

Resposta:
```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

### 3. Criar pedido (com token)
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "lab": "Lab ABC",
    "patient": "João Silva",
    "customer": "Cliente XYZ",
    "services": [
      {"name": "Hemograma", "value": 50},
      {"name": "Glicose", "value": 30}
    ]
  }'
```

### 4. Listar pedidos
```bash
# Todos os pedidos (página 1, 10 por página)
curl http://localhost:3000/orders \
  -H "Authorization: Bearer SEU_TOKEN"

# Filtrar por estado
curl "http://localhost:3000/orders?state=CREATED&page=1&limit=20" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### 5. Avançar estado do pedido
```bash
curl -X PATCH http://localhost:3000/orders/ID_DO_PEDIDO/advance \
  -H "Authorization: Bearer SEU_TOKEN"
```

## Testes Implementados

Os testes usam **mocks do Vitest** (sem dependências pesadas) e cobrem:
- ✅ Transição CREATED → ANALYSIS
- ✅ Transição ANALYSIS → COMPLETED
- ✅ Bloqueio de avanço de COMPLETED
- ✅ Bloqueio de avanço de pedidos DELETED
- ✅ Erro para pedidos não encontrados
- ✅ Fluxo completo de estados
- ✅ Validação de pedidos sem serviços
- ✅ Validação de valor total zero
- ✅ Criação válida de pedidos

Execute com:
```bash
npm test
```

## Arquitetura

```
src/
├── app.ts                    # Configuração Express
├── server.ts                 # Inicialização do servidor
├── config/
│   ├── db.ts                # Conexão MongoDB
│   └── env.ts               # Variáveis de ambiente
├── controllers/             # Handlers de requisições
│   ├── auth.controller.ts
│   └── order.controller.ts
├── middlewares/
│   ├── auth.ts             # Middleware JWT
│   └── errorHandler.ts     # Tratamento de erros
├── models/                  # Schemas Mongoose
│   ├── User.ts
│   └── Order.ts
├── routes/                  # Definição de rotas
│   ├── auth.route.ts
│   └── order.route.ts
├── schemas/                 # Validação Zod
│   ├── auth.schema.ts
│   └── order.schema.ts
└── services/                # Lógica de negócio
    ├── auth.service.ts
    └── order.service.ts
```

## Diferenciais Implementados

- ✅ Arquitetura em camadas (Routes → Controllers → Services → Models)
- ✅ Validação robusta com Zod
- ✅ Tipagem completa com TypeScript
- ✅ Middleware de autenticação JWT
- ✅ Testes unitários com Vitest
- ✅ Validações de regras de negócio
- ✅ Paginação em listagens
- ✅ Filtros por estado
- ✅ Tratamento de erros centralizado
- ✅ Queries otimizadas do Mongoose
