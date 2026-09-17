import jwt from 'jsonwebtoken';

export function gerarToken(admId) {
  return jwt.sign({ admId }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export function verificarToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}