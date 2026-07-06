const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const projectRoutes = require('./projectRoutes');
const pageRoutes = require('./pageRoutes');
const bubbleRoutes = require('./bubbleRoutes');
const jobRoutes = require('./jobRoutes');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/projects', projectRoutes); // Mount ke /api/v1/projects
router.use('/api/v1', pageRoutes);
router.use('/api/v1', bubbleRoutes);
router.use('/api/v1', jobRoutes);

module.exports = router;
