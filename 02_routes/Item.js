import express from 'express';
import * as itemController from '../controllers/Item.js';
import autenticar from '../middlewares/auth.js';

const router = express.Router();

router.get('/', itemController.listar);
router.get('/:id', itemController.buscarPorId);

router.post('/', autenticar, itemController.criar);
router.put('/:id', autenticar, itemController.atualizar);
router.delete('/:id', autenticar, itemController.deletar);

export default router;