const express = require('express');

const authMiddleware = require('../middleware/auth');
const memoryImageUpload = require('../middleware/memoryImageUpload');
const statelessTranslationController = require('../controller/statelessTranslationController');
const catchErrors = require('../utils/catchErrors');

const router = express.Router();

router.use(authMiddleware);
router.post(
  '/image',
  memoryImageUpload.single('image'),
  catchErrors(statelessTranslationController.translateImage),
);

module.exports = router;
