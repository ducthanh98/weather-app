const express = require('express');
const router = express.Router();
const weatherRouter = require('./weather')
const authRouter = require('./auth')
const citiesRouter = require('./cities')
const forecastRouter = require('./forecast')
const checkAuth = require('../middlewares/checkAuth');

router.use('/auth', authRouter)

router.use('/weather', checkAuth, weatherRouter)
router.use('/cities', checkAuth, citiesRouter)
router.use('/forecast', checkAuth, forecastRouter)

module.exports = router;