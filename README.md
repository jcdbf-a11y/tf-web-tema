# Os Trapalhões

## Integrantes
[comment] <> (

    Breno Henrique Rodrigues Rocha
    https://github.com/bhrr-alt
    
    Enzo Noah 
    https://github.com/QualquerNome139
    
    Gustavo Santos
    https://github.com/Didi-show
    
    Júlio César Dias Barbosa Filho
    https://github.com/jcdbf-a11y
    
    Matheus Henrique
    https://github.com/matheus44244
)
## Sobre o projeto

**Tema:** Um site que de venda e constomização de chapeus além de conselhos para melhor
qualidade e tempo util do seu chapeu.
**Usuários do sistema:** clientes que desejam comprar chapéus prontos, encomendar peças
personalizadas, tirar dúvidas com a equipe de suporte e consumir conteúdo educativo
sobre cuidados com o produto.

**Problema que resolve:** hoje o maior problema é para fazer as diversas vendas e 
customização de varias pessoas, isso costumam estar espalhados em canais diferentes como
(WhatsApp, Instagram). O sistema centraliza tudo em um único lugar.

## Modelo Conceitual

![Modelo Conceitual](db/conceitual.png)
[Modelo Logico](prisma/schema.prisma)
[Modelo Físico](prisma/seed.js)

### Entidades

**ADM** — representa o administrador cadastrado na plataforma, responsável por gerenciar
itens e serviços oferecidos. Possui id (identificador único), nome e email (para 
identificação e login), senhaHash (senha armazenada de forma segura, nunca em texto puro),
telefone (contato do administrador), cnpj (identificação da empresa/negócio responsável
pela loja) e criadoEm (data de criação do cadastro).

**Servico** — representa uma encomenda personalizada sob medida oferecida pelo ADM.
Possui id, nome e caracteristicas (texto livre com as especificações do serviço, como cor,
tamanho, aba e material desejados), precoEstimado (valor orçado para o serviço), criadoEm 
(data de criação do registro) e admId (chave estrangeira que indica qual ADM oferece o serviço).

**Produto** — representa os chapéus disponíveis para compra direta na loja. Possui `id`,
`nome` e `descricao` (para exibição no catálogo), `estoque` (para controle de
venda e disponibilidade) e `imagemUrl` (para exibição visual do produto na loja online).

**ITEM** — representa os chapéus disponíveis para compra direta na loja. Possui id, nome 
e descricao (para exibição no catálogo), preco e estoque (para controle de venda e 
disponibilidade), imagemUrl (para exibição visual do produto na loja online), tipo
(categoria/tipo do chapéu) e criadoEm (data de cadastro do item), além de admId (chave
estrangeira que indica a qual ADM o item pertence).

### Relacionamentos

- Um **ADM** pode oferecer vários **Serviços**, mas cada Serviço é associado a um único ADM.
- Um **ADM** pode possuir vários **itens**, mas cada item pertence a um único 
ADM.

Tabela ADM
![Tabelas no Neon](Tabela1.png)
Tabela Seviço
![Tabela no Neon](Tabela3.png)
Tabela Item
![Tabela no Neon](Tabela2.png)
