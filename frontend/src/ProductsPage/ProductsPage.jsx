import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./Products.css";

export default function ProductsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(5000);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [category, price, sort, page, searchParam]);

  // When filters change, jump back to page 1
  useEffect(() => {
    setPage(1);
  }, [category, price, sort, searchParam]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://agrisoil.onrender.com/api/products", {
        params: {
          search: searchParam || undefined,
          category: category !== "All" ? category : undefined,
          minPrice: 0,
          maxPrice: Number(price),
          sort,
          page,
          limit: 6,
        },
      });

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-5" style={{ minHeight: "80vh" }}>
      <div className="row g-5">

        {/* Sidebar */}
        <div className="col-lg-3 col-md-4">
          <div className="card shadow-sm border-0 rounded-4 p-4 sticky-top" style={{ top: "100px", backgroundColor: "#fcfdfd" }}>
            <h5 className="fw-bolder mb-4 text-success border-bottom pb-3">
              <i className="fas fa-filter me-2"></i>Filter Products
            </h5>

            <div className="mb-4">
              <h6 className="fw-bold mb-3 text-dark">Categories</h6>
              {["All", "Seeds", "Soil Kits", "Fertilizers", "Tools", "Irrigation"].map(cat => (
                <div key={cat} className="form-check mb-2 custom-radio">
                  <input
                    className="form-check-input text-success"
                    type="radio"
                    id={`cat-${cat}`}
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    style={{ cursor: "pointer" }}
                  />
                  <label className="form-check-label text-muted" htmlFor={`cat-${cat}`} style={{ cursor: "pointer" }}>
                    {cat}
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h6 className="fw-bold mb-3 text-dark">Price Range</h6>
              <input
                type="range"
                min="0"
                max="5000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="form-range"
                id="priceRange"
              />
              <div className="d-flex justify-content-between mt-2">
                <small className="text-muted fw-bold">₹0</small>
                <small className="text-success fw-bold bg-success bg-opacity-10 px-2 py-1 rounded">₹{price}</small>
              </div>
            </div>

            <button
              className="btn btn-light border w-100 mt-2 fw-semibold rounded-pill text-muted"
              onClick={() => {
                setCategory("All");
                setPrice(5000);
                setSort("");
                setPage(1);
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Product Section */}
        <div className="col-md-9">

          <div className="d-flex justify-content-between mb-3">
            <p>
              Showing results
              {searchParam && <span className="ms-1 fw-bold text-success">for "{searchParam}"</span>}
            </p>

            <select
              className="form-select w-auto"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by Popularity</option>
              <option value="price_low">Price Low to High</option>
              <option value="price_high">Price High to Low</option>
              <option value="latest">Latest</option>
            </select>
          </div>

          <div className="row g-4">
            {products.map(product => (
              <div key={product._id} className="col-lg-4 col-md-6" style={{ cursor: "pointer" }}>
                <div 
                  className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden" 
                  style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = "none"; }}
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <img src={product.image} alt={product.name} className="card-img-top p-4" style={{ height: "240px", objectFit: "contain", backgroundColor: "#f9fbfb" }} />
                  <div className="card-body d-flex flex-column bg-white">
                    <div className="mb-2">
                      <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-2 py-1 rounded-pill mb-2">
                        {product.category}
                      </span>
                      <h6 className="fw-bolder fs-5 mb-1 text-dark" style={{ lineHeight: "1.3" }}>{product.name}</h6>
                      <h5 className="text-success fw-bolder mb-3 mt-2">₹{product.price}</h5>
                    </div>
                    <button 
                      className="btn btn-outline-success w-100 fw-semibold rounded-pill mt-auto" 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                        alert(`Added ${product.name} to cart!`);
                      }}
                    >
                      <i className="fas fa-cart-plus me-2"></i>Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4 gap-2">
            <button
              className="btn btn-light"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn ${page === i + 1 ? "btn-success" : "btn-light"}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="btn btn-light"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}