const express = require('express');
const router = express.Router();
const {handleActivityFiles} = require('../controllers/activityFilesController');
const {activityUploads} = require('../middleware/activityFiles')
router.post('/',activityUploads,handleActivityFiles);

module.exports = router