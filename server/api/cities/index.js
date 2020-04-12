const express = require('express');
const router = express.Router();
const getCities = require('./get_cities');

router.get('/', getCities)

module.exports = router;