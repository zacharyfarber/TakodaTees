import express from 'express';

import * as emailController from '../controllers/emailController';

const router = express.Router();

router.post('/send', emailController.sendConfirmationEmail);

export default router;
