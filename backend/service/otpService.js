import { v4 as uuidv4 } from 'uuid';
import otpModels from '../models/otpModels.js';

const otp_expiry_time = 5 * 60 * 1000;
const max_attempts = 3;
const block_duration = 10 * 60 * 1000;


const otpService = {
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    },

    createOtp(identifier) {
        const otp = this.generateOTP();
        const expiresAt = Date.now() + otp_expiry_time;
        otpModels.save(identifier, { otp, expiresAt, attempts: 0, blockedUntil: null });
        return otp;
    },

    verifyOtp(identifier, submittedOtp) {
        const record = otpModels.get(identifier);

        if (!record) return { success: false, message: 'OTP not found' };

        if (record.blockedUntil && Date.now() < record.blockedUntil) {
            return { success: false, message: 'Too many attempts. Try again later.' };
        }

        if (Date.now() > record.expiresAt) {
            otpModels.delete(identifier);
            return { success: false, message: 'OTP expired. Please request a new one.' };
        }

        if (record.otp !== submittedOtp) {
            otpModels.incrementAttempts(identifier);
            const attemptsLeft = max_attempts - otpModels.get(identifier).attempts;

            if (attemptsLeft <= 0) {
                const blockedUntil = Date.now() + block_duration;
                const updatedRecord = otpModels.get(identifier);
                const remaining = max_attempts - updatedRecord.attempts;

                if (updatedRecord.attempts >= max_attempts) {
                    otpModels.blockUser(identifier, Date.now() + block_duration);
                    return { success: false, message: 'Too many wrong attempts. Blocked for 10 minutes.' };
                }

                return { success: false, message: `Invalid OTP. ${remaining} attempt(s) remaining.` };
            }

            const token = uuidv4();
            otpModels.saveSession(token, identifier);
            otpModels.delete(identifier);
            return { success: true, message: 'OTP verified successfully.', token };

        }
    },
    getSessionUser(token) {
        return otpModels.getSession(token);
    }

}

export default otpService;