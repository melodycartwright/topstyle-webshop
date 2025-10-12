import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import "./CartDropdown.css";

const CartDropdown = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleRemoveItem = (cartId) => {
    dispatch(removeFromCart(cartId));
  };

  const handleQuantityChange = (cartId, newQuantity) => {
    dispatch(updateQuantity({ cartId, quantity: parseInt(newQuantity) }));
  };

  if (!isOpen) return null;

  return (
    <div className="cart-dropdown-overlay" onClick={onClose}>
      <div className="cart-dropdown" onClick={(e) => e.stopPropagation()}>
        <div className="cart-dropdown-header">
          <h3>Shopping Cart</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="cart-dropdown-content">
          {items.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.cartId} className="cart-item">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL.replace(
                        "/api",
                        ""
                      )}${item.product.image}`}
                      alt={item.product.title}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <h4>{item.product.title}</h4>
                      {item.selectedSize && (
                        <span className="cart-item-size">
                          Size: {item.selectedSize}
                        </span>
                      )}
                      <p className="cart-item-price">${item.product.price}</p>
                      <div className="quantity-controls">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.cartId, e.target.value)
                          }
                          className="quantity-select"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleRemoveItem(item.cartId)}
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-dropdown-footer">
                <div className="cart-total">
                  <strong>Total: ${totalPrice.toFixed(2)}</strong>
                </div>
                <div className="cart-actions">
                  <Link to="/cart" className="view-cart-btn" onClick={onClose}>
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    className="checkout-btn"
                    onClick={onClose}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
