const jwt = require('jsonwebtoken');
const secret = 'thanhld';

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['x-token-header'];
        if (!token) return res.status(401).json({ message: 'Xác thực người dùng thất bại. Vui lòng thử lại' });

        const payload = jwt.verify(token, secret);

        req.id = payload.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Xác thực người dùng thất bại. Vui lòng thử lại' })
    }
}
