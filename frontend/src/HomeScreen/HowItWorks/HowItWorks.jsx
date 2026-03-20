export default function HowItWorks() {
  return (
    <section className="py-5 bg-white position-relative" style={{ overflow: "hidden" }}>
      <div className="container py-5">
        
        <div className="text-center mb-5 pb-3">
          <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-semibold mb-3 border border-success border-opacity-25" style={{ fontSize: "0.9rem" }}>
            SIMPLE PROCESS
          </span>
          <h2 className="fw-bolder mb-3 text-dark" style={{ fontSize: "2.8rem", letterSpacing: "-1px" }}>
            How It Works
          </h2>
          <p className="text-muted mx-auto lead" style={{ maxWidth: "600px" }}>
            Getting scientific insights into your farm shouldn't be complicated.
            Our proven 3-step process delivers professional results directly to your dashboard.
          </p>
        </div>

        <div className="row g-4 position-relative z-1">
          {/* Connecting Line */}
          <div className="d-none d-lg-block position-absolute" style={{ top: "45px", left: "15%", width: "70%", height: "2px", borderTop: "2px dashed #198754", zIndex: -1, opacity: 0.3 }}></div>

          {/* Step 1 */}
          <div className="col-lg-4 text-center px-4">
            <div className="bg-white rounded-5 p-5 shadow-sm border h-100" style={{ transition: "transform 0.3s ease", cursor: "pointer" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div 
                className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow" 
                style={{ width: "80px", height: "80px", fontSize: "2rem" }}
              >
                <i className="fas fa-flask"></i>
              </div>
              <h4 className="fw-bold mb-3">1. Collect Sample</h4>
              <p className="text-muted" style={{ lineHeight: "1.7" }}>
                Collect a soil sample from your field using our easy-to-follow guide and pre-paid testing kit provided immediately upon registration.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-lg-4 text-center px-4 mt-5 mt-lg-0">
            <div className="bg-white rounded-5 p-5 shadow-sm border h-100" style={{ transition: "transform 0.3s ease", cursor: "pointer" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div 
                className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow" 
                style={{ width: "80px", height: "80px", fontSize: "2rem" }}
              >
                <i className="fas fa-microchip"></i>
              </div>
              <h4 className="fw-bold mb-3">2. AI Analysis</h4>
              <p className="text-muted" style={{ lineHeight: "1.7" }}>
                Upload test metrics to our advanced AI engine. Our system instantly processes the data against expansive agricultural databases.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-lg-4 text-center px-4 mt-5 mt-lg-0">
            <div className="bg-white rounded-5 p-5 shadow-sm border h-100" style={{ transition: "transform 0.3s ease", cursor: "pointer" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div 
                className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow" 
                style={{ width: "80px", height: "80px", fontSize: "2rem" }}
              >
                <i className="fas fa-seedling"></i>
              </div>
              <h4 className="fw-bold mb-3">3. Harvest Success</h4>
              <p className="text-muted" style={{ lineHeight: "1.7" }}>
                Receive highly tailored recommendations for fertilizers, crops, and routines. Purchase required supplies directly from our marketplace!
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}