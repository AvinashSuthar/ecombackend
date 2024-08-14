const Product = require('../models/Products');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Filter and Sort Products
const filterAndSortProducts = async (req, res) => {
  const { category, brand, sort } = req.query;

  let filter = {};
  if (category) filter.category = category;
  if (brand) filter.brand = brand;

  let sortOrder = {};
  if (sort === 'price_desc') sortOrder.price = -1;

  try {
    const products = await Product.find(filter).sort(sortOrder);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllProducts, filterAndSortProducts };
