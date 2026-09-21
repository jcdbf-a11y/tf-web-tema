export default function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.code === 'P2025') {
    return res.status(404).json({ erro: 'Registro não encontrado.' });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({ erro: 'Já existe um registro com esse valor único.' });
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }

  return res.status(500).json({ erro: 'Erro interno do servidor.' });
}