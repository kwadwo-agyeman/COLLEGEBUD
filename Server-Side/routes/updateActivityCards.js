const express = require('express');
const router = express.Router();
const {handleActivityCards} = require('../controllers/updateActivityCardsController')

router.post('/',handleActivityCards)

module.exports = router;