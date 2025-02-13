const express = require('express')
const router = express.Router();

const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/auth')

router.get('/', authController.getToken)
router.get('/verify', authController.verifyToken)
router.get('/restricted', authMiddleware, authController.restricted)
router.get('/restrictedadmin', authMiddleware, authController.restrictedAdmin)

module.exports = router;