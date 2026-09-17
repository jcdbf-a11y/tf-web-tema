const jwt = require('jsonwebtoken');

function gerarToken(admId) {
  return jwt.sign({ admId }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

function verificarToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { gerarToken, verificarToken };