const express = require('express');
const router = express.Router();
const {handleProfUpdate} = require('../controllers/updateProfileController')

router.post('/',handleProfUpdate);

module.exports = router;