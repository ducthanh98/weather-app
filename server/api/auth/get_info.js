const userModel = require('../../model/user.model');

const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.id);
        if (!user) return res.json({ message: 'Tài khoản không tồn tại' });


        return res.json({data:user.cities})
    } catch (error) {
        return res.json({ error: "Đã có lỗi xảy ra. Vui lòng kiểm tra lại" });

    }
}

module.exports = getInfo;