import { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(500);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [category, price, sort, page]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/products", {
        params: {
          category: category !== "All" ? category : undefined,
          minPrice: 0,
          maxPrice: price,
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
    <div className="marketplace container py-4">
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-3 filter-sidebar">
          <h5>Filters</h5>

          <div className="filter-section">
            <h6>Categories</h6>
            {["All", "Soil Kits", "Fertilizers", "Tools", "Irrigation"].map(cat => (
              <div key={cat}>
                <input
                  type="radio"
                  name="category"
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                />
                <label className="ms-2">{cat}</label>
              </div>
            ))}
          </div>

          <div className="filter-section mt-4">
            <h6>Price Range</h6>
            <input
              type="range"
              min="0"
              max="500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-range"
            />
            <p>$0 - ${price}</p>
          </div>

          <button
            className="btn btn-outline-success w-100 mt-3"
            onClick={() => {
              setCategory("All");
              setPrice(500);
              setSort("");
              setPage(1);
            }}
          >
            Reset Filters
          </button>
        </div>

        {/* Product Section */}
        <div className="col-md-9">

          <div className="d-flex justify-content-between mb-3">
            <p>Showing results</p>

            <select
              className="form-select w-auto"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by Popularity</option>
              <option value="price_low">Price Low to High</option>
              <option value="price_high">Price High to Low</option>
              <option value="latest">Latest</option>
            </select>
          </div>

          <div className="row">
            {products.map(product => (
              <div key={product._id} className="col-md-4 mb-4">
                <div className="product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="product-body">
                    <span className="category-tag">
                      {product.category}
                    </span>
                    <h6>{product.name}</h6>
                    <p className="price">₹{product.price}</p>
                    <button className="add-btn">
                      + Add to Cart
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