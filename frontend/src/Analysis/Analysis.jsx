import { useLocation } from "react-router-dom";
import "./Analysis.css";

export default function Analysis() {
  const { state } = useLocation();

  if (!state) return <h3 className="text-center py-5">No Report Found</h3>;

  const soilAnalysis = state?.soilAnalysis || {};
  const nutrientPercentages = state?.nutrientPercentages || {
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
  };
  const soilData = state?.soilData || {};

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
                Recommended crop: <strong>{state.recommendedCrops[0]}</strong>.
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
      </div>
    </div>
  );
}
