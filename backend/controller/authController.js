import otpService from "../service/otpService";
import sendEmailOTP from "../utils/email";
import sendSmsOTP from "../utils/sms";
import { isValidEmail, isValidPhone, isValidOTP } from ('../utils/validators');


const authController = {
    async requestOtp(req, res) {
        try {
            const { identifier, type } = req.body;

            if (!identifier || !type) {
                return res.status(400).json({ error: 'Identifier and type are required' });
            }

            if (type === 'email' && !isValidEmail(identifier)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            if (type === 'phone' && !isValidPhone(identifier)) {
                return res.status(400).json({ error: 'Invalid phone format' });
            }

            if (!['email', 'phone'].includes(type)) {
                return res.status(400).json({ success: false, message: 'type must be "email" or "phone".' });
            }

            const otp = OTPService.createOTP(identifier);

            let sendResult;
            if (type === 'email') {
                sendResult = await sendEmailOTP.sendEmailOTP(identifier, otp);
            } else {
                sendResult = await sendSmsOTP.sendSmsOTP(identifier, otp);
            }

            return res.status(200).json({
                success: true,
                message: `OTP sent to ${identifier} via ${type}.`,
            });

        } catch (error) {
            console.error('[requestOTP] Error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async verifyOTP(req, res) {
        try {
            const { identifier, otp } = req.body;

            if (!identifier || !otp) {
                return res.status(400).json({ success: false, message: 'identifier and otp are required.' });
            }

            if (!isValidOTP(otp)) {
                return res.status(400).json({ success: false, message: 'OTP must be exactly 6 digits.' });
            }

            const result = OTPService.verifyOTP(identifier, otp);

            if (!result.success) {
                return res.status(400).json({ success: false, message: result.message });
            }

            return res.status(200).json({
                success: true,
                message: result.message,
                token: result.token,
            });
        } catch (err) {
            console.error('[verifyOTP] Error:', err);
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    },

    getMe(req, res) {
        return res.status(200).json({
            success: true,
            identifier: req.user.identifier,
            message: 'Authenticated user info.',
        });
    },
}

export default authController;