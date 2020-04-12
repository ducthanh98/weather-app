const axios = require('axios');

const apiKey = '84b4a6a025c689c2943ba7d319522a20';

module.exports = async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) return res.json({ error: "Vui lòng chọn tên thành phố" });


        const {data} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);


        return res.json({data});

    } catch (error) {

        // console.log(error);
        return res.json({ error });

    }
}
