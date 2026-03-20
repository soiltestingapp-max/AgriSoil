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
  const [extracting, setExtracting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setExtracting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8080/api/soil-reports/extract-from-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Auto-fill form fields with extracted data
      if (res.data && res.data.extracted) {
        setForm((prev) => ({
          ...prev,
          N: res.data.extracted.N || prev.N,
          P: res.data.extracted.P || prev.P,
          K: res.data.extracted.K || prev.K,
          ph: res.data.extracted.ph || prev.ph,
          temperature: res.data.extracted.temperature || prev.temperature,
          humidity: res.data.extracted.humidity || prev.humidity,
          rainfall: res.data.extracted.rainfall || prev.rainfall,
        }));
        alert("Data extracted from image and populated successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to extract data from image");
    } finally {
      setExtracting(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8080/api/soil-reports",
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
    <div className="py-5" style={{ background: "linear-gradient(135deg, #f0f7f4 0%, #ffffff 100%)", minHeight: "100vh" }}>
      <div className="container py-4">

        {/* Title */}
        <div className="text-center mb-5">
          <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-semibold mb-3 border border-success border-opacity-25">
            <i className="fas fa-microscope me-2"></i>PRECISION AI ANALYSIS
          </span>
          <h1 className="fw-bolder text-dark" style={{ fontSize: "3rem", letterSpacing: "-1px" }}>Soil Intelligence Test</h1>
          <p className="text-muted lead mx-auto mt-3" style={{ maxWidth: "600px" }}>
            Submit field metrics manually or upload a laboratory image summary. Our core engine will immediately process your data.
          </p>
        </div>

        {/* Card */}
        <div className="card shadow-lg border-0 rounded-5 overflow-hidden bg-white">
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
                        <label className="form-label fw-bold text-dark small" style={{ letterSpacing: "0.5px" }}>
                          {field.label}
                        </label>
                        <input
                          type="number"
                          className="form-control form-control-lg bg-light border-0 px-3"
                          style={{ borderRadius: "12px", fontSize: "1rem" }}
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

                    <div 
                      className="border border-2 border-success border-opacity-50 border-dashed rounded-4 p-5 text-center"
                      style={{ cursor: "pointer", position: "relative", backgroundColor: "#f9fcfb" }}
                    >
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        onChange={handleImageUpload}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          cursor: "pointer",
                        }}
                      />
                      {extracting ? (
                        <>
                          <div className="spinner-border text-success mb-3" />
                          <p className="mb-1 fw-semibold text-success">Extracting...</p>
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>

                  <button type="submit" className="btn btn-success w-100 mt-4 py-3 fw-bold rounded-pill shadow-sm" style={{ fontSize: "1.1rem" }}>
                    <i className="fas fa-search me-2"></i>
                    Generate AI Analysis
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