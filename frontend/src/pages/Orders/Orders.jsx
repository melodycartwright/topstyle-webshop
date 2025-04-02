import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../features/orders/ordersSlice";
import "./Orders.css";

const Orders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, isLoading, isError, errorMessage } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchOrders(user.token));
    }
  }, [dispatch, user]);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {isLoading && <p>Loading your orders...</p>}
      {isError && <p className="error-message">Error: {errorMessage}</p>}

      {!isLoading && orders.length === 0 && (
        <p>You haven't placed any orders yet.</p>
      )}

      {!isLoading && orders.length > 0 && (
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
