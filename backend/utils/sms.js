async function sendSmsOTP(phone, otp) {
  // ── Mock implementation ──────────────────────────────────────────────────
  console.log(`[SMS MOCK] To: ${phone} | OTP: ${otp} | Expires in 5 minutes`);
  return { success: true, mock: true };
}

export default { sendSmsOTP };