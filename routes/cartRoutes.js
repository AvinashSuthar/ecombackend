const express = require('express');
const { addToCart, getCartItems } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.get('/', authMiddleware, getCartItems);

module.exports = router;
