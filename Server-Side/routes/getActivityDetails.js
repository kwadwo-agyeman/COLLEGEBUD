const express = require('express');
const router = express.Router();
const {handleGetActivityDetails} = require('../controllers/getActivityDetailsController');

router.get('/',handleGetActivityDetails);

module.exports = router