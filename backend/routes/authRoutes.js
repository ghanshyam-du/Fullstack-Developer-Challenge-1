import express from 'express';
import authController from '../controller/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/request-otp',authController.requestOtp); 
router.post('/verify-otp',authController.verifyOTP);
router.get('/me',authMiddleware, authController.getMe);

export default router;