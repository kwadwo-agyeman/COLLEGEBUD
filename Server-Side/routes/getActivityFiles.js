const express = require('express');
const router = express.Router();
const {getActivityFiles} = require('../controllers/getActivityFilesController')

router.get('/', getActivityFiles);

module.exports = router