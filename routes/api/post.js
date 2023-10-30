const express = require('express');

const router = express.Router();

// @route  GET  api/post
// @desc   post route
// @access Public
router.get('/', (req, res)=> res.send('Post Route'));

module.exports = router;