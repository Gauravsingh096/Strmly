const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); 
const authController = require('../controllers/authController');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  '/signup',
  [
    check('name', 'Name is required').trim().notEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Password must be 6+ characters').isLength({ min: 6 })
  ],
  validate,
  authController.signup
);
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists()
  ],
  validate,
  authController.login
);

router.get('/profile', require('../middleware/auth'), authController.getProfile);

module.exports = router;