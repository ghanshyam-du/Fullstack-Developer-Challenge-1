const otpStore = {};
const sessionStore = {};

const otpModels = {
    save(identifier, data) {
        otpStore[identifier] = {
            otp: data.otp,
            expiresAt: data.expiresAt,
            attempts: data.attempts ?? 0,
            blockedUntil: data.blockedUntil ?? null
        };
    },

    get(identifier) {
        return otpStore[identifier] || null;
    },

    delete(identifier) {
        delete otpStore[identifier];
    },

    incrementAttempts(identifier) {
        if (otpStore[identifier]) {
            otpStore[identifier].attempts += 1;
        }
    },

    blockUser(identifier, blockedUntil) {
        if (otpStore[identifier]) {
            otpStore[identifier].blockedUntil = blockedUntil;
        }
    },


    saveSession(token, identifier) {
        sessionStore[token] = { identifier, createdAt: Date.now() };
    },

    getSession(token) {
        return sessionStore[token] ?? null;
    },

    deleteSession(token) {
        delete sessionStore[token];
    },
}


export default otpModels;