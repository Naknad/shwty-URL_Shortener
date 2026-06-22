// src/routes/urlRoutes.js
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/shorten', urlController.shortenUrl);
router.get('/:shortCode', urlController.redirectToLongUrl);
router.get('/stats', urlController.getStats);

module.exports = router;