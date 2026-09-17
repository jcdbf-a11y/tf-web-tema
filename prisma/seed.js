import prisma from './client.js';
import bcrypt from 'bcryptjs';

async function main() {
  const senhaHash = await bcrypt.hash('admin123', 10);

  await prisma.aDM.upsert({
    where: { email: 'admin@exemplo.com' },
    update: {
      nome: 'Administrador',
      senhaHash,
      telefone: '3899966633',
      cnpj: '12345678000199',
    },
    create: {
      nome: 'Administrador',
      email: 'admin@exemplo.com',
      senhaHash,
      telefone: '3899966633',
      cnpj: '12345678000199',
    },
  });

  await prisma.item.deleteMany();
  await prisma.servico.deleteMany();

  await prisma.item.createMany({
    data: [
      {
        nome: 'Chapeu de couro',
        descricao: 'Chapeu artesanal de couro, com acabamento reforcado.',
        preco: '10000.00',
        estoque: 13,
        imagemUrl: '',
      },
      {
        nome: 'Chapeu Fedora',
        descricao: 'Chapeu fedora de edicao limitada.',
        preco: '5000.00',
        estoque: 6,
        imagemUrl: '',
      },
    ],
  });

  await prisma.servico.createMany({
    data: [
      {
        nome: 'Personalizacao de chapeu',
        caracteristicas: 'Ajuste de tamanho, cor e acabamento sob medida.',
        precoEstimado: '9500.00',
      },
      {
        nome: 'Reparo de chapeu',
        caracteristicas: 'Avaliacao e reparo de aba, costura e acabamento.',
        precoEstimado: '250.00',
      },
    ],
  });

  console.log('Seed executado com sucesso.');
}

main()
  .catch((erro) => {
    console.error('Erro ao rodar o seed:', erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });