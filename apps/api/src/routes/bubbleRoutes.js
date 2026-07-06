const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const bubbleController = require('../controller/bubbleController');
const catchErrors = require('../utils/catchErrors');

router.use(authMiddleware);

router.get('/pages/:pageId/bubbles', catchErrors(bubbleController.list));
router.post('/pages/:pageId/bubbles', catchErrors(bubbleController.create));
router.patch('/bubbles/:id', catchErrors(bubbleController.update));
router.delete('/bubbles/:id', catchErrors(bubbleController.remove));

module.exports = router;
