import express from 'express';
import authController from '../controller/authController';
const router = express.Router();

router.post('/request-otp',authController.requestOtp); 
router.post('/verify-otp',authController.verifyOTP);
router.get('/me',authController.getMe);

export default router;