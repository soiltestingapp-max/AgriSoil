import { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("https://agrisoil.onrender.com/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `https://agrisoil.onrender.com/api/orders/${id}`,
      { orderStatus: status },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    setOrders(
      orders.map((order) =>
        order._id === id ? { ...order, orderStatus: status } : order,
      ),
    );
  };

  return (
    <div className="admin-orders container py-4">
      <div className="orders-card">
        <div className="orders-header">
          <h3>Order Management</h3>
          <span className="orders-count">Total Orders: {orders.length}</span>
        </div>

        <div className="table-responsive">
          <table className="table custom-orders-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Products</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  {/* USER */}
                  <td className="user-cell">
                    <strong>{order.userId?.name}</strong>
                    <div className="user-email">{order.userId?.email}</div>
                  </td>

                  {/* PRODUCTS */}
                  <td>
                    {order.products.map((item, index) => (
                      <div key={index} className="product-item">
                        {item.productId?.name} × {item.quantity}
                      </div>
                    ))}
                  </td>

                  {/* TOTAL */}
                  <td className="order-total">₹{order.totalAmount}</td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`status-badge ${order.orderStatus.toLowerCase()}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* DATE */}
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                  {/* UPDATE */}
                  <td>
                    <select
                      className="status-select"
                      value={order.orderStatus}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
