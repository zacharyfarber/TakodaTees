import { Router } from 'express';

import * as adminController from '../controllers/adminController';

const router = Router();

router.post('/drops/new', adminController.createDrop);
router.get('/drops/:dropId', adminController.getDrop);
router.get('/drops', adminController.getDrops);
router.put('/drops/:dropId', adminController.updateDrop);
router.delete('/drops/:dropId', adminController.deleteDrop);
router.get('/products/:productId', adminController.getProduct);
router.get('/products', adminController.getProducts);
router.put('/products/:productId/data', adminController.updateProductData);
router.put('/products/:productId/drop', adminController.updateProductDrop);
router.delete('/products/:productId', adminController.deleteProduct);

export default router;
