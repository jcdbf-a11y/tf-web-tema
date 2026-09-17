import prisma from '../prisma/client.js';

export async function listar(req, res) {
  const { tipo } = req.query;

  const itens = await prisma.item.findMany({
    where: tipo ? { tipo } : undefined,
  });

  return res.json(itens);
}

export async function buscarPorId(req, res) {
  const { id } = req.params;

  const item = await prisma.item.findUnique({
    where: { id: Number(id) },
  });

  if (!item) {
    return res.status(404).json({ erro: 'Item não encontrado.' });
  }

  return res.json(item);
}

export async function criar(req, res) {
  const { nome, descricao, preco, estoque, imagemUrl, tipo } = req.body;

  if (!nome || !descricao || preco === undefined || estoque === undefined || !tipo) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando.' });
  }

  const item = await prisma.item.create({
    data: {
      nome,
      descricao,
      preco,
      estoque,
      imagemUrl: imagemUrl || '',
      tipo,
      admId: req.admId,
    },
  });

  return res.status(201).json(item);
}

export async function atualizar(req, res) {
  const { id } = req.params;
  const { nome, descricao, preco, estoque, imagemUrl, tipo } = req.body;

  const item = await prisma.item.update({
    where: { id: Number(id) },
    data: { nome, descricao, preco, estoque, imagemUrl, tipo },
  });

  return res.json(item);
}

export async function deletar(req, res) {
  const { id } = req.params;

  await prisma.item.delete({
    where: { id: Number(id) },
  });

  return res.status(204).send();
}