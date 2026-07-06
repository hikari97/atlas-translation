const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const projectController = require('../controller/projectController');
const catchErrors = require('../utils/catchErrors');

router.use(authMiddleware);

router.get('/', catchErrors(projectController.list));
router.post('/', catchErrors(projectController.create));
router.get('/:id', catchErrors(projectController.detail));
router.patch('/:id', catchErrors(projectController.update));
router.delete('/:id', catchErrors(projectController.remove));

module.exports = router;
