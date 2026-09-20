import prisma from '../prisma/client.js';
import { compararSenha } from '../utils/senha.js';
import { gerarToken } from '../utils/jwt.js';

export async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
  }

  const adm = await prisma.aDM.findUnique({ where: { email } });

  if (!adm) {
    return res.status(401).json({ erro: 'Credenciais inválidas.' });
  }

  const senhaValida = await compararSenha(senha, adm.senhaHash);

  if (!senhaValida) {
    return res.status(401).json({ erro: 'Credenciais inválidas.' });
  }

  const token = gerarToken(adm.id);

  return res.json({
    token,
    adm: {
      id: adm.id,
      nome: adm.nome,
      email: adm.email,
    },
  });
}