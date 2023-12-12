import { Router } from 'express';

import * as storeController from '../controllers/storeController';

const router = Router();

router.get('/drop/:dropId', storeController.getDrop);
router.get('/recent-drops', storeController.getRecentDrops);
router.get('/product/:productId', storeController.getProduct);

export default router;
