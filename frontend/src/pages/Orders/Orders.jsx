import React, { useEffect, useState } from "react";
import orderService from "../../features/orders/orderService";
import { useSelector } from "react-redux";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getMyOrders(user.token);
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };

    fetchOrders();
  }, [user.token]);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="order-card">
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
              <ul className="order-items">
                {order.items.map(({ product, quantity }) => (
                  <li key={product._id}>
                    {product.title} × {quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
