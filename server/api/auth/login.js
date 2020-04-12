const jwt = require('jsonwebtoken');
const userModel = require('../../model/user.model');

const secret = 'thanhld';

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findByUsername(username);

        if (!user || user.password !== password) {
            return res.json({ message: "Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại" });
        }
        // else if (!user.active) {
        //     return res.json({ message: "Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email." });
        // }
        const payload = {
            id: user._id,
            username:user.username,
            
        }
        const token = jwt.sign(payload, secret, { expiresIn: 24 * 60 * 60 * 60 });
        return res.json({ data: token });

    } catch (error) {
        return res.json({ error: "Đã có lỗi xảy ra. Vui lòng kiểm tra lại" });

    }
}

module.exports = login;