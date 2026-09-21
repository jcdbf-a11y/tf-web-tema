# API - TF Web Tema (Loja de Chapéus)

API REST para gerenciamento de administradores, produtos (chapéus prontos e itens de montagem) e serviços de uma loja de chapéus. O fechamento de vendas e orçamentos é feito fora do sistema, via WhatsApp — esta API cobre apenas o catálogo e a administração.

## URL base

- **Produção:** `https://tf-web-tema.vercel.app`
- **Desenvolvimento:** `http://localhost:3000`

## Autenticação

Rotas protegidas exigem um token JWT no header `Authorization`, no formato:

Authorization: Bearer <token>


O token é obtido através do endpoint de login (`POST /adm/login`) e expira em 1 dia.

## Status

### `GET /status`

Verifica se a API está no ar. Rota pública.

**Resposta 200:**
```json
{
  "status": "ok",
  "timestamp": "2026-09-21T12:00:00.000Z"
}
```

## ADM

### `POST /adm/login`

Autentica um administrador e retorna um token JWT. Rota pública.

**Body:**
```json
{
  "email": "admin@exemplo.com",
  "senha": "admin123"
}
```

**Resposta 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "adm": {
    "id": 1,
    "nome": "Administrador",
    "email": "admin@exemplo.com"
  }
}
```

**Erros:**
| Status | Motivo |
|---|---|
| 400 | Email ou senha não enviados |
| 401 | Email não cadastrado ou senha incorreta |

## Items

Representam tanto chapéus prontos quanto itens avulsos para montagem, diferenciados pelo campo `tipo`.

### `GET /items`

Lista todos os itens. Rota pública.

**Query params (opcional):**
| Parâmetro | Valores | Descrição |
|---|---|---|
| `tipo` | `CHAPEU_PRONTO` ou `ITEM_MONTAGEM` | Filtra por tipo de item |

**Exemplo:** `GET /items?tipo=CHAPEU_PRONTO`

**Resposta 200:**
```json
[
  {
    "id": 1,
    "nome": "Chapeu de couro",
    "descricao": "Chapeu artesanal de couro, com acabamento reforcado.",
    "preco": "10000.00",
    "estoque": 13,
    "imagemUrl": "",
    "tipo": "CHAPEU_PRONTO",
    "criadoEm": "2026-08-10T22:49:17.000Z",
    "admId": 1
  }
]
```

### `GET /items/:id`

Busca um item específico. Rota pública.

**Resposta 200:** objeto do item (mesmo formato acima)

**Resposta 404:**
```json
{ "erro": "Item não encontrado." }
```

### `POST /items`

Cria um novo item. **Rota protegida** (requer token).

**Body:**
```json
{
  "nome": "Chapeu Panama",
  "descricao": "Chapeu de palha estilo panama.",
  "preco": "7500.00",
  "estoque": 10,
  "imagemUrl": "",
  "tipo": "CHAPEU_PRONTO"
}
```

**Resposta 201:** objeto do item criado

**Erros:**
| Status | Motivo |
|---|---|
| 400 | Campo obrigatório faltando (`nome`, `descricao`, `preco`, `estoque` ou `tipo`) |
| 401 | Token ausente, inválido ou expirado |

### `PUT /items/:id`

Atualiza um item existente. **Rota protegida.** Suporta atualização parcial — envie apenas os campos que deseja alterar.

**Body (exemplo):**
```json
{
  "estoque": 20
}
```

**Resposta 200:** objeto do item atualizado

**Erros:**
| Status | Motivo |
|---|---|
| 401 | Token ausente, inválido ou expirado |
| 404 | Item não encontrado |

### `DELETE /items/:id`

Remove um item. **Rota protegida.**

**Resposta 204:** sem corpo

**Erros:**
| Status | Motivo |
|---|---|
| 401 | Token ausente, inválido ou expirado |
| 404 | Item não encontrado |

## Servicos

Serviços oferecidos pela loja (ex: personalização, reparo de chapéus).

### `GET /servicos`

Lista todos os serviços. Rota pública.

**Resposta 200:**
```json
[
  {
    "id": 1,
    "nome": "Personalizacao de chapeu",
    "caracteristicas": "Ajuste de tamanho, cor e acabamento sob medida.",
    "precoEstimado": "9500.00",
    "criadoEm": "2026-08-10T22:49:17.000Z",
    "admId": 1
  }
]
```

### `GET /servicos/:id`

Busca um serviço específico. Rota pública.

**Resposta 200:** objeto do serviço

**Resposta 404:**
```json
{ "erro": "Serviço não encontrado." }
```

### `POST /servicos`

Cria um novo serviço. **Rota protegida.**

**Body:**
```json
{
  "nome": "Limpeza de chapeu",
  "caracteristicas": "Limpeza profunda e restauracao de cor.",
  "precoEstimado": "150.00"
}
```

`precoEstimado` é opcional.

**Resposta 201:** objeto do serviço criado

**Erros:**
| Status | Motivo |
|---|---|
| 400 | Campo obrigatório faltando (`nome` ou `caracteristicas`) |
| 401 | Token ausente, inválido ou expirado |

### `PUT /servicos/:id`

Atualiza um serviço existente. **Rota protegida.** Suporta atualização parcial.

**Body (exemplo):**
```json
{
  "precoEstimado": "180.00"
}
```

**Resposta 200:** objeto do serviço atualizado

**Erros:**
| Status | Motivo |
|---|---|
| 401 | Token ausente, inválido ou expirado |
| 404 | Serviço não encontrado |

### `DELETE /servicos/:id`

Remove um serviço. **Rota protegida.**

**Resposta 204:** sem corpo

**Erros:**
| Status | Motivo |
|---|---|
| 401 | Token ausente, inválido ou expirado |
| 404 | Serviço não encontrado |

## Erros gerais

Erros não previstos nas tabelas acima retornam `500`:
```json
{ "erro": "Erro interno do servidor." }
```

## Testes

A coleção completa de testes (Bruno) está na pasta `bruno/`, organizada em `Status/`, `ADM/`, `Items/` e `Servicos/`. Ambientes disponíveis: `Local` (Codespaces), `CI` (GitHub Actions) e `Producao` (Vercel).