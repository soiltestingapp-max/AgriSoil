import Cart from "../models/cart.js";

const addToCart = async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.body.userId },
    req.body,
    { upsert: true, new: true }
  );
  res.json(cart);
};

export default { addToCart };
