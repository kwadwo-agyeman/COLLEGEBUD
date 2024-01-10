const express = require('express');
const router = express.Router();
const {handleCertsAndAwards} = require('../controllers/certsAndAwardController');
const {upload} = require('../middleware/multerMultiple');


router.post('/',upload, handleCertsAndAwards)

module.exports = router;