const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);

// Example protected route
router.get('/protected', auth, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;
