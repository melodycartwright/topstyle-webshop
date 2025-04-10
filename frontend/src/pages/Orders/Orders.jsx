import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import orderService from "../../features/orders/orderService";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrders(user.token);
        setOrders(data);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
      }
    };

    if (user?.token) {
      fetchOrders();
    }
  }, [user?.token]);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </p>
            <div className="order-items">
              {order.items.map(({ product, quantity }) =>
                product ? (
                  <div key={product._id} className="order-item">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL.replace(
                        "/api",
                        ""
                      )}${product.image}`}
                      alt={product.title}
                    className="order-product-img" />
                    <div className="item-info">
                      <p>{product.title}</p>
                      <p>Quantity: {quantity}</p>
                    </div>
                  </div>
                ) : (
                  <div key={Math.random()} className="order-item unavailable">
                    <p>⚠️ Product no longer available</p>
                    <p>Quantity: {quantity}</p>
                  </div>
                )
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
