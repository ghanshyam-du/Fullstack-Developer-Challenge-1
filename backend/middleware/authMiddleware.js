import otpService from "../service/otpService.js";

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authorization token missing.' });
    }
    const session = otpService.getSessionUser(token);
    if (!session) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }

    req.user = { identifier: session.identifier };
    req.token = token;
    next();
}

export default authMiddleware;
