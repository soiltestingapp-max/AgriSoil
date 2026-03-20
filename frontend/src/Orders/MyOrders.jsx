import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    let userId = user.id;
    if (!userId) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload.id;
      } catch (e) {
        console.error("Failed to decode token", e);
      }
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/orders/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, token, navigate]);

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-success" />
        <h5 className="mt-3">Loading orders...</h5>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ minHeight: "75vh" }}>
      <h2 className="fw-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="card shadow-sm border-0 rounded-4 p-5 text-center bg-light">
          <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">You have no orders yet.</h4>
          <button className="btn btn-success mt-3 px-4 py-2" onClick={() => navigate("/products")}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {orders.map((order) => (
            <div className="col-12" key={order._id}>
              <div className="card shadow-sm border-0 rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                  <div>
                    <h6 className="mb-1 text-muted">Order ID</h6>
                    <span className="fw-semibold">#{order._id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div>
                    <h6 className="mb-1 text-muted">Date</h6>
                    <span className="fw-semibold">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <h6 className="mb-1 text-muted">Status</h6>
                    <span className={`badge rounded-pill px-3 py-2 ${
                      order.orderStatus === "Pending" ? "bg-warning text-dark" 
                      : order.orderStatus === "Processing" ? "bg-info text-dark" 
                      : order.orderStatus === "Shipped" ? "bg-primary"
                      : order.orderStatus === "Cancelled" ? "bg-danger"
                      : "bg-success"
                    }`}>
                      {order.orderStatus || "Pending"}
                    </span>
                  </div>
                  <div className="text-end">
                    <h6 className="mb-1 text-muted">Total Amount</h6>
                    <span className="fw-bold text-success fs-5">₹{order.totalAmount}</span>
                  </div>
                </div>

                <div className="row">
                  {order.products.map((item, idx) => (
                    <div className="col-md-6 mb-2" key={idx}>
                      <div className="d-flex align-items-center bg-light p-2 rounded">
                        <div 
                          className="bg-white text-center rounded me-3 d-flex justify-content-center align-items-center border"
                          style={{ width: "50px", height: "50px" }}
                        >
                          <i className="fas fa-leaf text-success"></i>
                        </div>
                        <div>
                          <h6 className="mb-0 fw-semibold" style={{ fontSize: "0.95rem" }}>
                            Product ID: {item.productId?.slice(-6).toUpperCase() || "Unknown"}
                          </h6>
                          <small className="text-muted">Qty: {item.quantity}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
