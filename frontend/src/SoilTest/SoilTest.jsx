import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SoilTest() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://agrisoil.onrender.com/api/soil-reports",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTimeout(() => {
        navigate("/analysis", { state: res.data });
      }, 2000);
    } catch (error) {
      alert("Failed to generate report");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
        <div className="spinner-border text-success" />
        <h5 className="mt-3">Analyzing soil data...</h5>
        <p className="text-muted">Generating smart recommendations</p>
      </div>
    );
  }

  return (
    <div className="py-5 bg-light">
      <div className="container">

        {/* Title */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Soil Test Submission</h2>
          <p className="text-muted">
            Enter your soil nutrient data manually or upload a sample image for analysis.
          </p>
        </div>

        {/* Card */}
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4 p-lg-5">

            <form onSubmit={submit}>
              <div className="row g-4">

                {/* LEFT SIDE */}
                <div className="col-lg-8">

                  <h5 className="fw-semibold mb-3 text-success">
                    <i className="fas fa-flask me-2"></i>
                    Nutrient Data (Manual Entry)
                  </h5>

                  <hr />

                  <div className="row g-3 mt-1">

                    {[
                      { name: "N", label: "Nitrogen (N)" },
                      { name: "P", label: "Phosphorus (P)" },
                      { name: "K", label: "Potassium (K)" },
                      { name: "temperature", label: "Temperature (°C)" },
                      { name: "humidity", label: "Humidity (%)" },
                      { name: "ph", label: "pH Level" },
                      { name: "rainfall", label: "Rainfall (mm)" }
                    ].map((field) => (
                      <div className="col-md-6 col-lg-4" key={field.name}>
                        <label className="form-label fw-semibold text-success">
                          {field.label}
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    ))}

                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-lg-4">

                  <h5 className="fw-semibold mb-3 text-success">
                    <i className="fas fa-camera me-2"></i>
                    Image-based Soil Sample
                  </h5>

                  <hr />

                  <div className="border border-2 border-dashed rounded-4 p-4 text-center bg-white">
                    <i className="fas fa-cloud-upload-alt fa-2x text-success mb-3"></i>
                    <p className="mb-1">
                      <span className="fw-semibold text-success">
                        Upload a file
                      </span>
                      <br />or drag and drop
                    </p>
                    <small className="text-muted">
                      PNG, JPG, GIF up to 10MB
                    </small>
                  </div>

                  <button type="submit" className="btn btn-success w-100 mt-4 py-2 fw-semibold">
                    <i className="fas fa-check-circle me-2"></i>
                    Submit for Analysis
                  </button>

                </div>

              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}