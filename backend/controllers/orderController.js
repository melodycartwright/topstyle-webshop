import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  const { items, total } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    const newOrder = await Order.create({
      user: req.user.id,
      items,
      total,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed to place order" });
  }
};
