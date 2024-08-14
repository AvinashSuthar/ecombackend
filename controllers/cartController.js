const Cart = require('../models/Cart');
const Product = require('../models/Products');

// Add to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId == productId);

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
      res.json(cart);
    } else {
      const newCart = new Cart({ userId: req.user.id, products: [{ productId, quantity }] });
      await newCart.save();
      res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cart items
const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addToCart, getCartItems };
