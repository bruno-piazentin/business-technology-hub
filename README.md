# Business & Technology Hub

Painel central para gestão de negócios de uma consultoria de tecnologia: clientes, demandas, pesquisa de soluções, fornecedores, propostas, projetos, suporte, tarefas e inteligência artificial, organizados por segmento de mercado.

Esta é a **base inicial**: o Dashboard principal (dados fictícios) e uma infraestrutura mínima que comprova o fluxo completo:

```
Computador → GitHub → Frontend (Vercel) → API C# (Railway, Docker) → PostgreSQL (Supabase)
```

A faixa **Infraestrutura** no topo do Dashboard mostra, em tempo real, se a API responde e se ela consegue ler e gravar no banco.

## Estrutura

```
frontend/   Next.js + React + TypeScript (publicado na Vercel)
backend/    API ASP.NET Core (.NET 10) com Dockerfile (publicada no Railway)
global.json Fixa o SDK do .NET 10
```

| Parte | Tecnologia | Versão |
|---|---|---|
| Frontend | Next.js, React, TypeScript | Node.js 26 LTS (`engines` em `frontend/package.json`) |
| Backend | ASP.NET Core | .NET 10 LTS (SDK local e imagens `mcr.microsoft.com/dotnet/*:10.0`) |
| Banco | PostgreSQL | Supabase |

## Endpoints da API

| Rota | O que faz |
|---|---|
| `GET /api/health` | Confirma que a API está no ar |
| `GET /api/db-check` | Conecta ao banco, grava um registro em `infra_pings` e devolve versão, latência e total |

## Rodando localmente

Pré-requisitos: Node.js 26, .NET SDK 10, Docker Desktop.

**API**

```bash
cd backend/HubApi
# opcional: defina DATABASE_URL para testar o banco
dotnet run --urls http://localhost:5080
```

**API em Docker**

```bash
cd backend
docker build -t hub-api .
docker run --rm -p 5080:8080 -e DATABASE_URL="..." -e CORS_ORIGINS="http://localhost:3000" hub-api
```

**Frontend**

```bash
cd frontend
cp .env.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:5080
npm install
npm run dev
```

Abra http://localhost:3000.

## Variáveis de ambiente

| Onde | Variável | Valor |
|---|---|---|
| Railway (API) | `DATABASE_URL` | String de conexão do Supabase (*Session pooler*, porta 5432) |
| Railway (API) | `CORS_ORIGINS` | URL do frontend na Vercel (e `http://localhost:3000`), separadas por vírgula |
| Vercel (frontend) | `NEXT_PUBLIC_API_URL` | URL pública da API no Railway |

Segredos nunca vão para o repositório: use `.env.local` / `.env` localmente (ignorados pelo git) e as variáveis de cada plataforma.

## Publicação

- **Vercel**: importar o repositório, *Root Directory* = `frontend`.
- **Railway**: novo serviço a partir do repositório, *Root Directory* = `backend` (usa `backend/Dockerfile` e `backend/railway.json`).
- **Supabase**: criar o projeto e copiar a string de conexão do *Session pooler* para `DATABASE_URL` no Railway.

## Próximos passos

- Telas de cada área do menu (Clientes, Demandas, Propostas etc.)
- Modelagem do banco e endpoints reais
- Autenticação
- Integração do assistente de IA
