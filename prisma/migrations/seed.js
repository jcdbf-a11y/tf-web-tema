import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

const usuarios = await prisma.usuario.findMany({
    select:{
        id: true,       
        nome: true,       
        email: true,        
        senhaHash: true,          
        telefone: true,    
        criadoEm: true,
        enderecos: true,
        pedidos: true,
        encomendas: true,
        mensagens: true,
    },
});

const enderecos = await prisma.endereco.findMany({
    select:{
        id: true,
        usuarioId: true,
        logradouro: true,
        numero: true,
        complemento: true,
        cidade: true,
        estado: true,
        cep: true,
        usuario: true,
        pedidos: true,
    },
});

const produtos = await prisma.produto.findMany({
    select:{
        id: true,       
        nome: true,
        descricao: true,
        preco: true,
        estoque: true,
        imagemUrl: true,
        itensPedido: true,
    },
});

const pedidos = await prisma.pedido.findMany({
    select:{
        id: true,         
        usuarioId: true,
        enderecoId: true,
        status: true,   
        valorTotal: true, 
        criadoEm: true,
        atualizadoEm: true,
        usuario: true,   
        endereco: true,  
        itens: true,    
        pagamento: true,
        encomenda: true,
    },
});

const itenspedidos = await prisma.itempedido.findMany({
    select:{
        id: true,       
        pedidoId: true,     
        produtoId: true,
        quantidade: true, 
        precoUnitario: true, 
        pedido: true,
        produto: true, 
    },
});

const pagamentos = await prisma.pagamento.findMany({
    select:{
        id: true,                   
        pedidoId: true,     
        forma: true,         
        parcelas: true,  
        status: true,      
        dataPagamento: true,
        pedido: true,
    },
});

const encomendas = await prisma.encomenda.findMany({
    select:{
        id: true,             
        usuarioId: true,    
        caracteristicas: true,
        canalContato: true, 
        status: true,        
        precoEstimado: true,  
        pedidoId: true,      
        usuario: true,
        pedido: true,
    },
});

const postagens = prisma.postagem.findMany({
    select:{
        id: true,
        titulo: true,   
        conteudo: true,
        tipo: true,
        urlVideo: true,    
        publicadoEm: true,
    },
});

const mensagens = prisma.mensagem.findMany({
    include:{
        usuario:{
            select:{
                nome: true,
                email: true,
            },
        },
    },
    select:{
        assunto: true,
        mensagem: true,
        respondida: true,
        criadoEm: true,
    },
});





