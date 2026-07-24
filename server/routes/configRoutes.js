const express = require('express');
const router = express.Router();
const { getConfig } = require('../controllers/configController');

// Public: Get site configuration
router.get('/', getConfig);

module.exports = router;
