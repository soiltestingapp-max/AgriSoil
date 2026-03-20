import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./Analysis.css";

export default function Analysis() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [recommended, setRecommended] = useState([]);
  const [recLoading, setRecLoading] = useState(false);
  const [recError, setRecError] = useState("");

  if (!state) return <h3 className="text-center py-5">No Report Found</h3>;

  const soilAnalysis = state?.soilAnalysis || {};
  const nutrientPercentages = state?.nutrientPercentages || {
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
  };
  const soilData = state?.soilData || {};
  const cropName = useMemo(() => state?.recommendedCrops?.[0] || "", [state]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        setRecLoading(true);
        setRecError("");
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8080/api/products/recommended", {
          params: { reportId: state?._id, limit: 6 },
          headers: { Authorization: `Bearer ${token}` },
        });

        setRecommended(res.data?.products || []);
      } catch (e) {
        setRecError("Could not load recommended products.");
        setRecommended([]);
      } finally {
        setRecLoading(false);
      }
    };

    if (state?._id) fetchRecommended();
  }, [state?._id]);

  // 🔥 Dynamic Color Logic
  const getStatusClass = (status) => {
    if (status === "Low") return "low";
    if (status === "High") return "high";
    return "optimal";
  };

  return (
    <div className="analysis-wrapper py-5">
      <div className="container">
        {/* ===== SUMMARY SECTION ===== */}
        <div className="analysis-summary card border-0 shadow-sm p-4 mb-5 rounded-4">
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <h4 className="fw-bold mb-3">
                <span className="green-line"></span>
                Analysis Summary
              </h4>

              <p className="text-muted mb-3">
                Recommended crop: <strong>{cropName}</strong>.
                Soil pH is <strong>{soilAnalysis.ph_status}</strong>.
              </p>

              <span className="badge bg-success-subtle text-success px-3 py-2 me-2">
                Dynamic AI Analysis
              </span>
            </div>

            <div className="d-flex gap-3 mt-3 mt-lg-0">
              <div className="info-box">
                <small>SOIL pH</small>
                <h6>{soilData.ph}</h6>
              </div>
              <div className="info-box">
                <small>HUMIDITY</small>
                <h6>{soilData.humidity}%</h6>
              </div>
            </div>
          </div>
        </div>

        {/* ===== NPK SECTION ===== */}
        <h5 className="fw-bold mb-4">Primary Nutrient Levels (NPK)</h5>

        <div className="row g-4 mb-5">
          {/* Nitrogen */}
          <div className="col-md-4">
            <div className="nutrient-card">
              <h6>NITROGEN (N)</h6>
              <div
                className={`circle ${getStatusClass(soilAnalysis.nitrogen_status)}`}
                style={{ "--value": nutrientPercentages.nitrogen }}
              >
                {nutrientPercentages.nitrogen}%
              </div>
              <p className="text-muted small">
                {soilData.N} ppm measured. Status:{" "}
                {soilAnalysis.nitrogen_status}
              </p>
            </div>
          </div>

          {/* Phosphorus */}
          <div className="col-md-4">
            <div className="nutrient-card">
              <h6>PHOSPHORUS (P)</h6>
              <div
                className={`circle ${getStatusClass(soilAnalysis.phosphorus_status)}`}
                style={{ "--value": nutrientPercentages.phosphorus }}
              >
                {nutrientPercentages.phosphorus}%
              </div>
              <p className="text-muted small">
                {soilData.P} ppm measured. Status:{" "}
                {soilAnalysis.phosphorus_status}
              </p>
            </div>
          </div>

          {/* Potassium */}
          <div className="col-md-4">
            <div className="nutrient-card">
              <h6>POTASSIUM (K)</h6>
              <div
                className={`circle ${getStatusClass(soilAnalysis.potassium_status)}`}
                style={{ "--value": nutrientPercentages.potassium }}
              >
                {nutrientPercentages.potassium}%
              </div>
              <p className="text-muted small">
                {soilData.K} ppm measured. Status:{" "}
                {soilAnalysis.potassium_status}
              </p>
            </div>
          </div>
        </div>

        {/* ===== EXPERT RECOMMENDATIONS ===== */}
        <div className="expert-section p-4 rounded-4">
          <h5 className="fw-bold text-white mb-4">
            <i className="fas fa-lightbulb me-2"></i>
            Expert Recommendations
          </h5>

          {state.fertilizerPlan.map((item, index) => (
            <div key={index} className="recommendation-item mb-3">
              <div className="number">{index + 1}</div>
              <div>
                <h6>{item.suggestion}</h6>
                <p className="small mb-0">
                  Follow best agronomic practices before application.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== SHOP RECOMMENDATIONS ===== */}
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h5 className="fw-bold mb-0">Recommended from our shop</h5>
            <button className="btn btn-outline-success btn-sm" onClick={() => navigate("/products")}>
              View all products
            </button>
          </div>

          {recLoading && (
            <div className="text-muted">Loading recommendations...</div>
          )}

          {!recLoading && recError && (
            <div className="alert alert-warning py-2 mb-3">{recError}</div>
          )}

          {!recLoading && !recError && recommended.length === 0 && (
            <div className="text-muted">No matching products found yet.</div>
          )}

          <div className="row g-4">
            {recommended.map((p) => (
              <div key={p._id} className="col-12 col-md-6 col-lg-4">
                <div 
                  className="card border-0 shadow-sm h-100 overflow-hidden" 
                  style={{ cursor: "pointer", transition: "transform 0.2s" }}
                  onClick={() => navigate(`/products/${p._id}`)}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="card-img-top"
                      style={{ height: 180, objectFit: "cover" }}
                    />
                  ) : (
                    <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: 180 }}>
                      <i className="fas fa-image text-muted fa-3x"></i>
                    </div>
                  )}
                  <div className="card-body d-flex flex-column">
                    <div className="mb-2">
                      <span className="badge bg-success-subtle text-success border border-success px-2 py-1 rounded-pill mb-2">
                        {p.category || "Product"}
                      </span>
                      <h6 className="fw-bold fs-5 mb-1">{p.name}</h6>
                      <h5 className="text-success fw-bold mb-2">₹{p.price}</h5>
                    </div>
                    {p.description && (
                      <p className="text-muted small mb-3" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {p.description}
                      </p>
                    )}
                    
                    {/* Add to Cart Button */}
                    <div className="mt-auto pt-3 border-top">
                      <button 
                        className="btn btn-outline-success w-100 fw-semibold rounded-pill"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p, 1);
                          alert(`Added ${p.name} to cart!`);
                        }}
                      >
                        <i className="fas fa-cart-plus me-2"></i>Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
