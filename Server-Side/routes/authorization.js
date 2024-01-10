const express = require('express');
const router = express.Router();
const {handleAuthorization} = require('../controllers/authController')

router.post('/', handleAuthorization)
module.exports = router