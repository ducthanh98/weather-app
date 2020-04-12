const userModel = require('../../model/user.model');

module.exports = async (req, res) => {
    try {
        const { city } = req.body;

        if (!city) return res.json({ message: 'Thành phố không được trống' });

        const user = await userModel.findById(req.id);
        if (user.cities.includes(city)) {
            return res.json({ message: 'Thành phố đã có trong bảng tin' });
        }

        await userModel.updateCityById(req.id, city)

        return res.json({ data: "Thành công" });

    } catch (error) {
        console.log(error);
        
        return res.json({ error: "Đã có lỗi xảy ra. Vui lòng kiểm tra lại" });
    }
}