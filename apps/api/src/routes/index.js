const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const statelessTranslationRoutes = require('./statelessTranslationRoutes');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/translation', statelessTranslationRoutes);

module.exports = router;
