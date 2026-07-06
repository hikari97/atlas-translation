const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/auth');
const catchErrors = require('../utils/catchErrors');

router.post('/register', catchErrors(authController.register));
router.post('/login', catchErrors(authController.login));
router.get('/profile', authMiddleware, catchErrors(authController.profile));

module.exports = router;
