import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  // Since user uses `auth` middleware for `/api/orders`, we should pass token.
  const submitOrder = async () => {
    if (!token) {
      alert("Please log in to place an order.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        products: cartItems.map((item) => ({
          productId: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image
        })),
        totalAmount: getCartTotal(),
      };

      await axios.post("https://agrisoil.onrender.com/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      clearCart();
      alert("Order placed successfully!");
      navigate("/my-orders");
    } catch (error) {
      console.error(error);
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "60vh" }}>
        <h2 className="mb-4 text-muted">No items to checkout</h2>
        <button className="btn btn-success" onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ minHeight: "75vh" }}>
      <h2 className="fw-bold mb-4">Checkout</h2>

      <div className="row g-5">
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 rounded-4 p-4 mb-4">
            <h5 className="fw-bold mb-3">Shipping Detail</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-muted small">First Name</label>
                <input type="text" className="form-control" defaultValue={user?.name?.split(' ')[0] || ''} />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small">Last Name</label>
                <input type="text" className="form-control" defaultValue={user?.name?.split(' ')[1] || ''} />
              </div>
              <div className="col-12">
                <label className="form-label text-muted small">Address</label>
                <input type="text" className="form-control" placeholder="123 Farm Lane" />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small">City</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small">Postal Code</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4 p-4">
            <h5 className="fw-bold mb-3">Payment Method</h5>
            <div className="form-check mb-2">
              <input className="form-check-input text-success" type="radio" name="payment" id="cod" defaultChecked />
              <label className="form-check-label" htmlFor="cod">
                Cash on Delivery (COD)
              </label>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card shadow-sm border-0 rounded-4 p-4 bg-light position-sticky" style={{ top: "20px" }}>
            <h5 className="fw-bold mb-4">Order Review</h5>
            
            <div className="mb-4" style={{ maxHeight: "300px", overflowY: "auto" }}>
              {cartItems.map((item) => (
                <div key={item.product._id} className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="rounded me-3"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                    <div>
                      <p className="mb-0 fw-semibold" style={{ fontSize: "0.9rem" }}>{item.product.name}</p>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                  </div>
                  <span className="fw-semibold">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <hr />
            
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span className="fw-semibold">₹{getCartTotal()}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Shipping</span>
              <span className="text-success">Free</span>
            </div>
            
            <hr />
            
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-5">Total Pay</span>
              <span className="fw-bold fs-5 text-success">₹{getCartTotal()}</span>
            </div>
            
            <button
              className="btn btn-success w-100 fw-bold py-3 rounded-pill shadow"
              onClick={submitOrder}
              disabled={loading}
            >
              {loading ? (
                <span><i className="fas fa-spinner fa-spin me-2"></i>Processing...</span>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
