const express = require('express');
const router = express.Router();

// Controllers
const register = require('../controllers/auth/register')
const login = require('../controllers/auth/login')
const me = require('../controllers/auth/me')

// Middelwares
const auth = require('../middleware/auth')
const admin = require('../middleware/roles/admin')

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, me);

module.exports = router;