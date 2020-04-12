const express = require('express');
const router = express.Router();
const getForecast = require('./get_forecast');

router.get('/', getForecast)

module.exports = router;