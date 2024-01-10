const express = require('express');
const router = express.Router();
const {handleGetProfile} = require('../controllers/getProfileImageController')
router.get('/',handleGetProfile );

module.exports = router;
