import express from 'express';
import * as servicoController from '../controllers/Servico.js';
import autenticar from '../middlewares/auth.js';

const router = express.Router();

router.get('/', servicoController.listar);
router.get('/:id', servicoController.buscarPorId);

router.post('/', autenticar, servicoController.criar);
router.put('/:id', autenticar, servicoController.atualizar);
router.delete('/:id', autenticar, servicoController.deletar);

export default router;