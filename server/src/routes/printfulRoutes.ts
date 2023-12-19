import { Router } from 'express';

import * as printfulController from '../controllers/printfulController';

const router = Router();

router.post('/webhook', printfulController.createProduct);
router.post('/orders', printfulController.placeOrder);

export default router;
