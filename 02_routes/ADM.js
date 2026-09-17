import express from 'express';
import * as admController from '../controllers/ADM.js';

const router = express.Router();

router.post('/login', admController.login);

export default router;