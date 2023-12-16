import express from 'express';

import * as stripeController from '../controllers/stripeController';

const router = express.Router();

router.post('/create-payment-intent', stripeController.createPaymentIntent);

export default router;
