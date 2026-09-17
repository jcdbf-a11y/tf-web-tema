import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import logger from './middlewares/logger.js';
import admRoutes from './routes/ADM.js';
import itemRoutes from './routes/Item.js';
import servicoRoutes from './routes/Servico.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use('/adm', admRoutes);
app.use('/items', itemRoutes);
app.use('/servicos', servicoRoutes);

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

export default app;