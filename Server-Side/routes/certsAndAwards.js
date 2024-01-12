const express = require('express');
const router = express.Router();
const {handleCertsAndAwards} = require('../controllers/certsAndAwardController');
const {certUploads} = require('../middleware/multerMultiple');


router.post('/',certUploads, handleCertsAndAwards)

module.exports = router;