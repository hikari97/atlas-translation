const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const jobController = require('../controller/jobController');
const catchErrors = require('../utils/catchErrors');

router.use(authMiddleware);

router.post('/ocr/page', catchErrors(jobController.triggerOcr));
router.post('/translation/page', catchErrors(jobController.triggerTranslation));
router.get('/ocr/jobs/:jobId', catchErrors(jobController.status));
router.get('/jobs/:jobId', catchErrors(jobController.status));

module.exports = router;
