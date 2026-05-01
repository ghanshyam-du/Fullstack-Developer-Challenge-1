import e from 'express';
import nodemailer from 'nodemailer';
dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

transporter.verify((err) => {
    if (err) {
        console.error('[Email] SMTP connection failed:', err.message);
        console.error('Check email_user and email_pass in .env');
    } else {
        console.log(`[Email] SMTP ready — sending from ${EMAIL_USER}`);
    }
});



async function sendEmailOTP(to, otp) {
    try {
        const info = await transporter.sendMail({
            from: EMAIL_FROM,
            to,
            subject: 'Your OTP Code',
            text: `Your OTP is: ${otp}\n\nIt expires in 5 minutes. Do not share it.`,
        });

        return { success: true, messageId: info.messageId };

    } catch (err) {
        console.error('[Email] Failed to send OTP to', to, '|', err.message);
        return { success: false, error: err.message };
    }
}
export default { sendEmailOTP };