const express = require('express');
const router = express.Router();
const {handleGetCertsAndAwards} = require('../controllers/getCertsNAwardController')
router.get('/',handleGetCertsAndAwards);

module.exports = router;
