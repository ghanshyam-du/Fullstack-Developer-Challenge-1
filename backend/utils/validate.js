const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE = /^\+?\d{10,15}$/;


function isValidEmail(email) {
  return EMAIL.test(String(email).trim());
}

function isValidPhone(phone) {
  return PHONE.test(String(phone).trim());
}

function isValidOTP(otp) {
  return /^\d{6}$/.test(String(otp).trim());
}

export default { isValidEmail, isValidPhone, isValidOTP };
