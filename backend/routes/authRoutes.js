const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); 
const authController = require('../controllers/authController');

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Signup route
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

// Login route
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists()
  ],
  validate,
  authController.login
);

// Profile route
router.get('/profile', require('../middleware/auth'), authController.getProfile);

module.exports = router;