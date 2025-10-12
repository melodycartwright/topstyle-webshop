import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import orderService from "../../features/orders/orderService";
import "./Checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "card",
  });

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shipping = total > 100 ? 0 : 9.99;
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shipping + tax;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to complete your order");
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      navigate("/");
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          size: item.selectedSize,
          price: item.product.price,
        })),
        total: finalTotal,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
      };

      await orderService.placeOrder(orderData, user.token);

      toast.success("🎉 Order placed successfully!");
      dispatch(clearCart());
      navigate("/orders");
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart to proceed with checkout.</p>
          <button
            onClick={() => navigate("/")}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-form-section">
          <h2>Checkout</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={!!user?.email}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Shipping Address</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Method</h3>
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleInputChange}
                  />
                  <span>Credit Card</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === "paypal"}
                    onChange={handleInputChange}
                  />
                  <span>PayPal</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="place-order-btn"
              disabled={isProcessing}
            >
              {isProcessing
                ? "Processing..."
                : `Place Order - $${finalTotal.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <div className="order-summary">
            <h3>Order Summary</h3>

            <div className="summary-items">
              {items.map((item) => (
                <div key={item.cartId} className="summary-item">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL.replace(
                      "/api",
                      ""
                    )}${item.product.image}`}
                    alt={item.product.title}
                    className="summary-item-image"
                  />
                  <div className="summary-item-details">
                    <h4>{item.product.title}</h4>
                    {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="summary-item-price">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {total < 100 && (
              <div className="shipping-notice">
                <p>Add ${(100 - total).toFixed(2)} more for free shipping!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
