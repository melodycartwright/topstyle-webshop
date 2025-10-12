import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
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
      toast.error("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      items: items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.selectedSize,
      })),
      total,
    };

    try {
      await orderService.placeOrder(orderData, user.token);
      toast.success("🎉 Order placed successfully!");
      dispatch(clearCart());
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to place order.");
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
            {items.map((item) => (
              <li key={item.cartId}>
                <div className="cart-item">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL.replace(
                      "/api",
                      ""
                    )}${item.product.image}`}
                    alt={item.product.title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.product.title}</h3>
                    {item.selectedSize && (
                      <p className="item-size">Size: {item.selectedSize}</p>
                    )}
                    <p className="item-price">${item.product.price}</p>
                    <div className="quantity-controls">
                      <label>Quantity:</label>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            updateQuantity({
                              cartId: item.cartId,
                              quantity: parseInt(e.target.value),
                            })
                          )
                        }
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    className="btn remove-btn"
                    onClick={() => dispatch(removeFromCart(item.cartId))}
                  >
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
