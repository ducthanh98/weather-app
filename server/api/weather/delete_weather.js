const userModel = require('../../model/user.model');

module.exports = async (req, res) => {
    try {
        const { city } = req.query;

        if (!city) return res.json({ message: 'Thành phố không được trống' });

        await userModel.deleteCityById(email, city)

        return res.json({ data: "Thành công" });

    } catch (error) {
        return res.json({ error: "Đã có lỗi xảy ra. Vui lòng kiểm tra lại" });
    }
}