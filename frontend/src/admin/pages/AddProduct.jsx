import { useEffect, useState } from "react";
import axios from "axios";
import "./AddProduct.css";

export default function AddProduct() {

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: "",
  });

  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:8080/api/products");
    setProducts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/products", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Product added successfully!");

      setForm({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
        image: "",
      });

      fetchProducts();

    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await axios.delete(
      `http://localhost:8080/api/products/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div className="add-product-wrapper container py-4">

      {/* ================= FORM ================= */}
      <div className="add-product-card mb-5">
        <div className="add-product-header">
          <h3>Add New Product</h3>
          <span className="subtitle">
            Create products visible in marketplace
          </span>
        </div>

        <form onSubmit={submit}>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                className="custom-input"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-4">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                className="custom-input"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-4">
              <label>Category</label>
              <input
                type="text"
                name="category"
                className="custom-input"
                value={form.category}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-4">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                className="custom-input"
                value={form.stock}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 mb-4">
              <label>Description</label>
              <textarea
                name="description"
                className="custom-input"
                rows="3"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 mb-4">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                className="custom-input"
                value={form.image}
                onChange={handleChange}
              />

              {form.image && (
                <div className="image-preview mt-3">
                  <img src={form.image} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="submit-product-btn">
            Add Product
          </button>
        </form>
      </div>

      {/* ================= PRODUCT LIST ================= */}
      <h4 className="mb-4 fw-bold">Available Products</h4>

      <div className="row g-4">

        {products.map(product => (
          <div key={product._id} className="col-md-4">
            <div className="product-card shadow-sm">

              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

              <div className="product-body">
                <h5>{product.name}</h5>
                <p className="category">{product.category}</p>
                <p className="price">₹{product.price}</p>
                <p className="stock">
                  Stock: {product.stock}
                </p>

                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}