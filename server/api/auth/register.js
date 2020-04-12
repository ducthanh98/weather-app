const uuid = require('uuid').v4;
const userModel = require('../../model/user.model');



const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.json({ message: "Email hoặc mật khẩu không được trống" });
        }

        const user = await userModel.findByUsername(username);


        if (user) {
            return res.json({ message: "Tên tài khoản đã tồn tại. Vui lòng chọn tên khác" });
        }


        const userSchema = new userModel({ username, password, code: uuid() });
        await userSchema.save();


        return res.json({ data: "Đăng kí thành công. Vui lòng đăng nhập " });

    } catch (error) {
        return res.json({ error: "Đã có lỗi xảy ra. Vui lòng kiểm tra lại" });

    }
}

module.exports = login;