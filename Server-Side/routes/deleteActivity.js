const express = require('express');
const router = express.Router();
const {handleDeleteActivity} = require('../controllers/deleteActivityController');

router.delete('/', handleDeleteActivity)

module.exports = router;