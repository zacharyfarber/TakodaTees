import { Router } from 'express';

import * as adminController from '../controllers/adminController';

const router = Router();

router.post('/drops/new', adminController.createDrop);
router.get('/drops/:dropId', adminController.getDrop);
router.get('/drops', adminController.getDrops);
router.put('/drops/:dropId', adminController.updateDrop);
router.delete('/drops/:dropId', adminController.deleteDrop);

export default router;
