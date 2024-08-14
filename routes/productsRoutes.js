const express = require('express');
const { getAllProducts, filterAndSortProducts } = require('../controllers/productcontroller');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/filter', filterAndSortProducts);

module.exports = router;
