const express = require('express');
const router = express.Router();
const login = require('./login');
const register = require('./register');
const getInfo = require('./get_info');
const checkAuth = require('../../middlewares/checkAuth');

router.post('/login', login)
router.post('/register', register)
router.get('/', checkAuth,getInfo)


module.exports = router;