const axios = require('axios');

const apiKey = '84b4a6a025c689c2943ba7d319522a20';

module.exports = async (req, res) => {
    try {
        const { data } = await axios.get(`https://restcountries.eu/rest/v2/all`);


        return res.json({ data });

    } catch (error) {

        // console.log(error);
        return res.json({ error });

    }
}
