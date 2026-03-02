import Order from "../models/order.js";

/* USER: Place Order */
const placeOrder = async (req, res) => {
  try {
    const order = await Order.create({
      userId: req.user.id, // 🔥 VERY IMPORTANT
      products: req.body.products,
      totalAmount: req.body.totalAmount,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/* ADMIN: Get All Orders */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("products.productId", "name price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* USER: Get Orders By User */
const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ADMIN: Update Order Status */
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.orderStatus },
      { new: true },
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  placeOrder,
  getAllOrders,
  getOrdersByUser,
  updateOrderStatus,
};
