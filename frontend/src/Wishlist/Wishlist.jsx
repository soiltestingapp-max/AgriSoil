import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container py-5" style={{ minHeight: "75vh" }}>
      <h2 className="fw-bold mb-4">My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="card shadow-sm border-0 rounded-4 p-5 text-center bg-light">
          <i className="far fa-heart fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">Your wishlist is empty.</h4>
          <button className="btn btn-success mt-3 px-4 py-2" onClick={() => navigate("/products")}>
            Explore Products
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {wishlistItems.map((product) => (
            <div key={product._id} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 overflow-hidden position-relative">
                {/* Remove Button */}
                <button 
                  className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow-sm d-flex align-items-center justify-content-center border-0 text-danger"
                  style={{ width: "40px", height: "40px", zIndex: 10 }}
                  onClick={() => toggleWishlist(product)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>

                <div 
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: 200, objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <span className="badge bg-success-subtle text-success border border-success px-2 py-1 rounded-pill mb-2">
                      {product.category || "Product"}
                    </span>
                    <h5 className="fw-bold mb-1">{product.name}</h5>
                    <h6 className="text-success fw-bold mb-3">₹{product.price}</h6>
                  </div>
                </div>

                <div className="card-footer bg-white border-top-0 pt-0 pb-3 px-3">
                  <button 
                    className="btn btn-outline-success w-100 fw-semibold rounded-pill"
                    onClick={() => {
                      addToCart(product, 1);
                      alert(`Added ${product.name} to cart!`);
                    }}
                  >
                    <i className="fas fa-cart-plus me-2"></i>Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
