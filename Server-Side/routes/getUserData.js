const express = require('express');
const router = express.Router();
const {handleGetUserData} = require('../controllers/getUserDataController')

router.get('/', handleGetUserData)

module.exports = router