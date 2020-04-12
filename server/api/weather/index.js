const express = require('express');
const router = express.Router();
const getWeather = require('./get_weather');
const postWeather = require('./put_weather');
const deleteWeather = require('./delete_weather');

router.get('/', getWeather)
router.put('/', postWeather)
router.delete('/', deleteWeather)

module.exports = router;