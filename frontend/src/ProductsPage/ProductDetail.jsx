import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const isWishlisted = product ? isInWishlist(product._id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-success mb-3" />
        <h5 className="text-muted fw-semibold">Loading product details...</h5>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "60vh" }}>
        <h3 className="text-muted mb-4">Product not found</h3>
        <button className="btn btn-outline-success px-4 py-2 rounded-pill" onClick={() => navigate("/products")}>
          <i className="fas fa-arrow-left me-2"></i> Back to Marketplace
        </button>
      </div>
    );
  }

  const deliveryDateObj = new Date();
  deliveryDateObj.setDate(deliveryDateObj.getDate() + 3);
  const deliveryDateFormatted = deliveryDateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="bg-light" style={{ minHeight: "80vh", paddingBottom: "5rem" }}>
      {/* Breadcrumb / Back Navigation */}
      <div className="container pt-4 pb-2">
        <button 
          className="btn btn-link text-decoration-none text-muted p-0 mb-3" 
          onClick={() => navigate("/products")}
        >
          <i className="fas fa-arrow-left me-2"></i>Back to Marketplace
        </button>
      </div>

      <div className="container">
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
          <div className="row g-0">
            {/* Left Column: Product Image Gallery (Mocked for single image) */}
            <div className="col-lg-6 bg-white d-flex align-items-center justify-content-center p-5 position-relative">
              {/* Wishlist Button Overlay */}
              <button 
                className={`btn btn-light position-absolute top-0 end-0 m-4 rounded-circle shadow-sm d-flex align-items-center justify-content-center border-0`}
                style={{ width: "45px", height: "45px", zIndex: 10 }}
                onClick={() => toggleWishlist(product)}
              >
                <i className={`${isWishlisted ? "fas text-danger" : "far text-muted"} fa-heart fs-5`}></i>
              </button>

              <img 
                src={product.image} 
                alt={product.name} 
                className="img-fluid" 
                style={{ maxHeight: "500px", objectFit: "contain", mixBlendMode: "multiply" }} 
              />
            </div>
            
            {/* Right Column: Product Details */}
            <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center bg-white border-start">
              <div className="mb-2 d-flex align-items-center">
                <span className="badge bg-success-subtle text-success border border-success px-3 py-2 rounded-pill fw-semibold me-3">
                  {product.category}
                </span>
                <span className={`badge ${product.stock > 0 || product.stock === undefined ? 'bg-primary-subtle text-primary border border-primary' : 'bg-danger-subtle text-danger border border-danger'} px-3 py-2 rounded-pill fw-semibold me-3`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : (product.stock === undefined ? 'In Stock' : 'Out of Stock')}
                </span>
                <span className="text-muted small">
                  <i className="fas fa-star text-warning me-1"></i>
                  4.8 (124 Reviews)
                </span>
              </div>

              <h1 className="fw-bold mb-3 mt-2" style={{ fontSize: "2.5rem" }}>
                {product.name}
              </h1>
              
              <h2 className="text-success fw-bold mb-4" style={{ fontSize: "2rem" }}>
                ₹{product.price}
              </h2>
              
              <div className="mb-4">
                <p className="text-muted fs-6" style={{ lineHeight: "1.8" }}>
                  {product.description || "Premium quality agricultural product ensuring the best yield and health for your crops. Sustainably sourced and scientifically formulated."}
                </p>
              </div>

              {/* Action Area: Quantity & Add to Cart */}
              <div className="d-flex flex-wrap align-items-center gap-3 mt-auto pt-3 border-top">
                <div className="d-flex align-items-center bg-light rounded-pill p-1 border">
                  <button 
                    className="btn btn-sm btn-light rounded-circle border-0 text-muted"
                    style={{ width: "40px", height: "40px" }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="fw-bold px-3 fs-5" style={{ minWidth: "40px", textAlign: "center" }}>
                    {quantity}
                  </span>
                  <button 
                    className="btn btn-sm btn-light rounded-circle border-0 text-muted"
                    style={{ width: "40px", height: "40px" }}
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>

                <button 
                  className="btn btn-success flex-grow-1 fw-bold rounded-pill shadow-sm"
                  style={{ height: "54px", fontSize: "1.1rem" }}
                  onClick={handleAddToCart}
                >
                  <i className="fas fa-shopping-bag me-2"></i> Add to Cart • ₹{product.price * quantity}
                </button>
              </div>
              
              <div className="row mt-4 pt-3 text-muted small border-top">
                <div className="col-12 d-flex align-items-center mb-3 text-dark fw-semibold">
                  <i className="fas fa-calendar-check text-success me-3 fs-5"></i> 
                  Estimated Delivery: By {deliveryDateFormatted}
                </div>
                <div className="col-6 d-flex align-items-center mb-2">
                  <i className="fas fa-truck text-success me-2 fs-5"></i> Free Standard Delivery
                </div>
                <div className="col-6 d-flex align-items-center mb-2">
                  <i className="fas fa-undo text-success me-2 fs-5"></i> 7 Days Return Policy
                </div>
                <div className="col-6 d-flex align-items-center">
                  <i className="fas fa-check-circle text-success me-2 fs-5"></i> Quality Verified
                </div>
                <div className="col-6 d-flex align-items-center">
                  <i className="fas fa-leaf text-success me-2 fs-5"></i> 100% Organic safe
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details & Reviews Tabs */}
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white p-4 p-md-5">
          <ul className="nav nav-pills mb-4 border-bottom pb-3 gap-2">
            <li className="nav-item">
              <button 
                className={`nav-link fw-semibold rounded-pill px-4 ${activeTab === 'description' ? 'active bg-success text-white' : 'text-dark bg-light'}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link fw-semibold rounded-pill px-4 ${activeTab === 'specs' ? 'active bg-success text-white' : 'text-dark bg-light'}`}
                onClick={() => setActiveTab('specs')}
              >
                Additional Details
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link fw-semibold rounded-pill px-4 ${activeTab === 'reviews' ? 'active bg-success text-white' : 'text-dark bg-light'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Customer Reviews (124)
              </button>
            </li>
          </ul>

          <div className="tab-content pt-2">
            {activeTab === 'description' && (
              <div className="fade show active">
                <h4 className="fw-bold mb-3">About this item</h4>
                <p className="text-muted fs-6" style={{ lineHeight: "1.8" }}>
                  {product.description}
                  <br/><br/>
                  Discover the optimal solution for your farming and gardening needs. Our {product.category} is sourced carefully to enhance your soil's health, offering a balanced nutrient profile that guarantees vigorous plant growth and improved yields. Suitable for both commercial agriculture and home gardening, it adheres to all organic and holistic farming standards. 
                </p>
              </div>
            )}
            
            {activeTab === 'specs' && (
              <div className="fade show active">
                <h4 className="fw-bold mb-3">Specifications</h4>
                <div className="table-responsive col-md-8">
                  <table className="table table-borderless table-striped">
                    <tbody>
                      <tr>
                        <th className="text-muted fw-semibold" style={{ width: "30%" }}>Brand</th>
                        <td className="fw-medium">AgriSoil Official</td>
                      </tr>
                      <tr>
                        <th className="text-muted fw-semibold">Category</th>
                        <td className="fw-medium">{product.category}</td>
                      </tr>
                      <tr>
                        <th className="text-muted fw-semibold">Net Quantity</th>
                        <td className="fw-medium">1 Unit</td>
                      </tr>
                      <tr>
                        <th className="text-muted fw-semibold">Origin</th>
                        <td className="fw-medium">India</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="fade show active">
                <div className="row">
                  <div className="col-md-4 mb-4 mb-md-0 border-end">
                    <h4 className="fw-bold mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center mb-3">
                      <h1 className="fw-bold me-3 mb-0">4.8</h1>
                      <div>
                        <div className="text-warning fs-5">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                        </div>
                        <span className="text-muted small">Based on 124 reviews</span>
                      </div>
                    </div>
                    
                    {/* Progress Bars Mock */}
                    {[5,4,3,2,1].map((star, idx) => (
                      <div className="d-flex align-items-center mb-2" key={star}>
                        <span className="text-muted small me-2" style={{ width: "30px" }}>{star} <i className="fas fa-star text-warning"></i></span>
                        <div className="progress flex-grow-1" style={{ height: "6px" }}>
                          <div className="progress-bar bg-warning" style={{ width: `${star === 5 ? 80 : star === 4 ? 15 : star === 3 ? 3 : 1}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="col-md-8 ps-md-4">
                    {/* Individual Review */}
                    <div className="mb-4 border-bottom pb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center">
                          <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 fw-bold" style={{ width: "40px", height: "40px" }}>
                            R
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">Rahul Sharma</h6>
                            <span className="text-muted small">Verified Purchase • 2 weeks ago</span>
                          </div>
                        </div>
                        <div className="text-warning small">
                          <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                        </div>
                      </div>
                      <p className="mb-0 text-dark">
                        Excellent product qualities. I immediately saw an improvement in soil aeration and overall crop health after using this. Delivery was super fast across rural routes. Highly recommended!
                      </p>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center">
                          <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-3 fw-bold" style={{ width: "40px", height: "40px" }}>
                            A
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">Amit Patel</h6>
                            <span className="text-muted small">Verified Purchase • 1 month ago</span>
                          </div>
                        </div>
                        <div className="text-warning small">
                          <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="far fa-star"></i>
                        </div>
                      </div>
                      <p className="mb-0 text-dark">
                        Good value for money. The packaging was neat, and clear instructions were provided on usage. Giving 4 stars only because there was a slight delay in dispatch, but the item itself is perfect.
                      </p>
                    </div>
                    
                    <button className="btn btn-outline-success rounded-pill fw-semibold">View All Reviews</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
