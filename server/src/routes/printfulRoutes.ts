import { Router } from 'express';

import * as printfulController from '../controllers/printfulController';

const router = Router();

router.post('/webhook', printfulController.createProduct);

export default router;
