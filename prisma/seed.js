const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();



async function main() {
 
  const usuario1 = await prisma.usuario.create({
    data: {
      nome: 'Gui Santos',
      email: 'Guisantos33@gmail.com',
      senhaHash: 'Gui33San',
      telefone: '3899966633',
    },
  });
 
  const usuario2 = await prisma.usuario.create({
    data: {
      nome: 'Lebron James',
      email: 'Lebrongoat@gmail.com',
      senhaHash: 'lebron123',
      telefone: '425435678',
    },
  });
 
  
  const endereco1 = await prisma.endereco.create({
    data: {
      usuarioId: usuario1.id,
      logradouro: 'Rua Jacaré Não Voa',
      numero: '590',
      complemento: '',
      cidade: 'Salinas',
      estado: 'Amazonas',
      cep: '66560999',
    },
  });
 
  const endereco2 = await prisma.endereco.create({
    data: {
      usuarioId: usuario2.id,
      logradouro: 'Rua 2patinhos na lagoa',
      numero: '777',
      complemento: '',
      cidade: 'Salinas',
      estado: 'Acre',
      cep: '3960000',
    },
  });
 
  
  const produto1 = await prisma.produto.create({
    data: {
      nome: 'Chapéu De Couro de Jacaré',
      descricao: 'Chapéu feito do couro de um jacaré de mais de 20 metros,preto com verde',
      preco: 10000,
      estoque: 13,
      imagemUrl: '',
    },
  });
 
  const produto2 = await prisma.produto.create({
    data: {
      nome: 'Chapéu Fedora do Lebron',
      descricao: 'Chapéu fedora usado pelo Lebron James em dia de folga, edição limitada',
      preco: 5000,
      estoque: 6,
      imagemUrl: '',
    },
  });

  
  const pedido1 = await prisma.pedido.create({
    data: {
      usuarioId: usuario1.id,
      enderecoId: endereco1.id,
      status: 'pago',
      valorTotal: 10000,
    },
  });

  
  const itemPedido1 = await prisma.itemPedido.create({
    data: {
      pedidoId: pedido1.id,
      produtoId: produto1.id,
      quantidade: 1,
      precoUnitario: 10000,
    },
  });

  
  const pagamento1 = await prisma.pagamento.create({
    data: {
      pedidoId: pedido1.id,
      forma: 'pix',
      parcelas: 1,
      status: 'aprovado',
      dataPagamento: new Date(),
    },
  });

  
  const encomenda1 = await prisma.encomendaPersonalizada.create({
    data: {
      usuarioId: usuario2.id,
      caracteristicas: 'Chapéu igual ao do Gui Santos, mas em couro de jacaré roxo, tamanho 60',
      canalContato: 'WhatsApp',
      status: 'solicitado',
      precoEstimado: 9500,
      pedidoId: null,
    },
  });

  
  const postagem1 = await prisma.postagem.create({
    data: {
      titulo: 'Por que o couro de jacaré de 20 metros é tão raro?',
      conteudo: 'Jacarés desse tamanho são extremamente raros, o que torna cada chapéu uma peça única e cara de se repor.',
      tipo: 'texto',
      urlVideo: '',
      publicadoEm: new Date(),
    },
  });

  
  const mensagem1 = await prisma.mensagem.create({
    data: {
      usuarioId: usuario1.id,
      nome: 'Gui Santos',
      email: 'Guisantos33@gmail.com',
      assunto: 'Chapéu de jacaré rachou',
      mensagem: 'Comprei o chapéu de couro de jacaré semana passada e ele já rachou na aba, isso é normal?',
      respondida: false,
    },
  });
 
}
 
main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
 