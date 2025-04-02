import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../../features/cart/cartSlice";
import orderService from "../../features/orders/orderService";
import "./Cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      items: items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      total,
    };

    try {
      await orderService.placeOrder(orderData, user.token);
      alert("🎉 Order placed successfully!");
      dispatch(clearCart());
    } catch (err) {
      console.error(err);
      alert("❌ Failed to place order.");
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {items.map(({ product, quantity }) => (
              <li key={product._id}>
                <div className="cart-item">
                  <span>
                    {product.title} (${product.price}) × {quantity}
                  </span>
                  <button className="btn" onClick={() => dispatch(removeFromCart(product._id))}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p>
            <strong>Total: ${total.toFixed(2)}</strong>
          </p>
          <div className="cart-buttons">
            <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
