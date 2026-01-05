# TEC Challenge - API de Gerenciamento de Pedidos Laboratoriais

## 📋 Funcionalidades

API REST desenvolvida para gerenciar pedidos laboratoriais com as seguintes funcionalidades:

- **Autenticação JWT**: Sistema de registro e login de usuários com tokens JWT
- **Gestão de Pedidos**: Criação, listagem e avanço de estado de pedidos laboratoriais
- **Máquina de Estados**: Pedidos transitam entre estados (CREATED → ANALYSIS → COMPLETED)
- **Paginação**: Listagem de pedidos com suporte a paginação
- **Validação**: Validação de dados com Zod
- **Documentação**: Swagger/OpenAPI para documentação interativa da API
- **Testes**: Suite de testes automatizados com Vitest

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js (v18+)
- MongoDB local / Atlas / Docker (recomendado)
- Git

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/gildoamaral/tec-challenge.git
cd tec-challenge
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/tec-challenge
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=1d
```

> **Nota**: Altere o `JWT_SECRET` para uma string segura e aleatória.

4. **Execute em modo de desenvolvimento**
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

5. **Execute os testes**
```bash
npm test
```

Para executar os testes em modo watch:
```bash
npm run test:watch
```

## 🧪 Testando a API

### Sugestão 1: Usando Swagger UI (Recomendado)

Acesse a documentação interativa em: **`http://localhost:3000/api-docs`**

A interface Swagger permite testar todos os endpoints diretamente pelo navegador.

**Fluxo de teste sugerido:**

1. **Registrar um usuário** (POST `/auth/register`)
   - Body: `{ "email": "teste@example.com", "password": "senha123" }`
   
2. **Fazer login** (POST `/auth/login`)
   - Body: `{ "email": "teste@example.com", "password": "senha123" }`
   - Copie o token retornado
   
3. **Autorizar no Swagger**
   - Clique no botão "Authorize" no topo
   - Cole o token no formato: `Bearer <seu-token>`
   
4. **Criar um pedido** (POST `/orders`)
   ```json
   {
     "lab": "Laboratório ABC",
     "patient": "João Silva",
     "customer": "Hospital XYZ",
     "services": [
       {
         "name": "Hemograma",
         "value": 50.00
       },
       {
         "name": "Glicemia",
         "value": 30.00
       }
     ]
   }
   ```
   
5. **Listar pedidos** (GET `/orders`)
   - Teste com diferentes parâmetros: `page=1`, `limit=10`, `state=CREATED`
   
6. **Avançar estado do pedido** (POST `/orders/{id}/advance`)
   - Use o ID retornado na criação
   - Execute múltiplas vezes para ver a transição: CREATED → ANALYSIS → COMPLETED

### Sugestão 2: Usando Postman
caso queira usar o postman para fazer as chamadas, segue os passos:


1. **Importar Collections**
   - Abra o Postman
   - Clique em "Import" no canto superior esquerdo
   - Selecione os arquivos da pasta `postman/`:
     - `tec-challenge.postman_collection.json` (Collection com requests)
     - `tec-challenge.postman_environment.json` (Environment com variáveis)
   
2. **Configurar Environment**
   - Selecione o environment "TEC Challenge" no dropdown
   - Verifique se a variável `baseUrl` está configurada para `http://localhost:3000`
   
3. **Executar Requests**
   - Execute primeiro "Register" e depois "Login"
   - O token será automaticamente salvo no environment
   - Execute os demais requests na ordem desejada

### Endpoints Disponíveis

| Método | Endpoint | Autenticação | Descrição |
|--------|----------|--------------|-----------|
| GET | `/health` | Não | Health check |
| POST | `/auth/register` | Não | Registrar novo usuário |
| POST | `/auth/login` | Não | Fazer login |
| POST | `/orders` | Sim | Criar novo pedido |
| GET | `/orders` | Sim | Listar pedidos (com paginação) |
| POST | `/orders/:id/advance` | Sim | Avançar estado do pedido |

## 🏗️ Arquitetura e Princípios

A aplicação foi desenvolvida seguindo princípios de **Clean Code** e **organização modular**:

- **Separação de Responsabilidades**: Cada módulo (auth, orders, user) é independente com suas próprias rotas, controllers, services e schemas
- **Camadas Bem Definidas**: Controller → Service → Model, mantendo lógica de negócio separada da camada HTTP
- **Validação Centralizada**: Uso de Zod para validação declarativa de schemas
- **Tratamento de Erros**: Middleware global para captura e formatação consistente de erros
- **Configuração Isolada**: Variáveis de ambiente e configurações em módulos dedicados
- **Testabilidade**: Factories e testes isolados para garantir qualidade

## 📦 Tecnologias Principais

- **Express**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT**
- **Zod**
- **Swagger**
- **Vitest**
