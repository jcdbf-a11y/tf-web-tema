import prisma from '../prisma/client.js';

export async function listar(req, res) {
  const servicos = await prisma.servico.findMany();

  return res.json(servicos);
}

export async function buscarPorId(req, res) {
  const { id } = req.params;

  const servico = await prisma.servico.findUnique({
    where: { id: Number(id) },
  });

  if (!servico) {
    return res.status(404).json({ erro: 'Serviço não encontrado.' });
  }

  return res.json(servico);
}

export async function criar(req, res) {
  const { nome, caracteristicas, precoEstimado } = req.body;

  if (!nome || !caracteristicas) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando.' });
  }

  const servico = await prisma.servico.create({
    data: {
      nome,
      caracteristicas,
      precoEstimado,
      admId: req.admId,
    },
  });

  return res.status(201).json(servico);
}

export async function atualizar(req, res) {
  const { id } = req.params;
  const { nome, caracteristicas, precoEstimado } = req.body;

  const servico = await prisma.servico.update({
    where: { id: Number(id) },
    data: { nome, caracteristicas, precoEstimado },
  });

  return res.json(servico);
}

export async function deletar(req, res) {
  const { id } = req.params;

  await prisma.servico.delete({
    where: { id: Number(id) },
  });

  return res.status(204).send();
}