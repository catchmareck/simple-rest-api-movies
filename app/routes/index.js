'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/movies', require('./movies'));
router.use('/comments', require('./comments'));

module.exports = router;
