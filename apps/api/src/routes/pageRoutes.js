const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const pageController = require('../controller/pageController');
const catchErrors = require('../utils/catchErrors');
const upload = require('../middleware/upload');

router.use(authMiddleware);

router.get('/projects/:projectId/pages', catchErrors(pageController.list));
// Accept multiple file upload on key 'image' up to 50 files
router.post('/projects/:projectId/pages', upload.array('image', 50), catchErrors(pageController.create));
router.get('/pages/:id', catchErrors(pageController.detail));
router.patch('/pages/:id', catchErrors(pageController.update));
router.delete('/pages/:id', catchErrors(pageController.remove));

module.exports = router;
