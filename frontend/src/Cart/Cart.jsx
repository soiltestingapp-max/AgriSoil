import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "60vh" }}>
        <h2 className="mb-4 text-muted">Your Cart is Empty</h2>
        <button className="btn btn-success" onClick={() => navigate("/products")}>
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ minHeight: "75vh" }}>
      <h2 className="fw-bold mb-4">Shopping Cart</h2>

      <div className="row g-4">
        {/* Cart Items */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            {cartItems.map((item) => (
              <div key={item.product._id} className="row align-items-center mb-4 border-bottom pb-3">
                <div className="col-md-2 col-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="img-fluid rounded"
                    style={{ objectFit: "cover", height: "80px", width: "100%" }}
                  />
                </div>
                <div className="col-md-4 col-8">
                  <h6 className="fw-bold mb-1">{item.product.name}</h6>
                  <p className="text-muted small mb-0">{item.product.category}</p>
                </div>
                <div className="col-md-3 col-6 mt-3 mt-md-0 d-flex align-items-center">
                  <div className="input-group input-group-sm w-75">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="form-control text-center bg-white"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-md-2 col-4 mt-3 mt-md-0 text-md-center">
                  <span className="fw-semibold">₹{item.product.price * item.quantity}</span>
                </div>
                <div className="col-md-1 col-2 mt-3 mt-md-0 text-end">
                  <button
                    className="btn btn-light text-danger btn-sm"
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 rounded-4 p-4 bg-light">
            <h5 className="fw-bold mb-4">Order Summary</h5>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Subtotal</span>
              <span className="fw-semibold">₹{getCartTotal()}</span>
            </div>
            <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
              <span className="text-muted">Shipping</span>
              <span className="text-success">Free</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-5">Total</span>
              <span className="fw-bold fs-5 text-success">₹{getCartTotal()}</span>
            </div>
            <button
              className="btn btn-success w-100 fw-semibold py-2 rounded-pill shadow-sm"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
