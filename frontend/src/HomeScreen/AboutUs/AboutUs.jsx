export default function AboutUs() {
  return (
    <section className="py-5" style={{ backgroundColor: "#f0f7f4" }}>
      <div className="container py-5">
        <div className="row align-items-center g-5">
          
          <div className="col-lg-6 order-2 order-lg-1">
            <div className="row g-3">
              <div className="col-6 mt-5">
                <img 
                  src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=2000&auto=format&fit=crop" 
                  alt="Farmers discussing" 
                  className="img-fluid rounded-4 shadow-sm"
                  style={{ height: "250px", objectFit: "cover" }}
                />
              </div>
              <div className="col-6">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2000&auto=format&fit=crop" 
                  alt="Healthy crops" 
                  className="img-fluid rounded-4 shadow-sm"
                  style={{ height: "350px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 order-1 order-lg-2 ps-lg-5">
            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-semibold mb-3 border border-success border-opacity-25" style={{ fontSize: "0.9rem" }}>
              OUR MISSION
            </span>
            <h2 className="fw-bolder mb-4 text-dark" style={{ fontSize: "2.8rem", letterSpacing: "-1px", lineHeight: "1.2" }}>
              Bridging the Gap Between <span className="text-success">Technology</span> and <span className="text-success">Farming</span>.
            </h2>
            <p className="text-muted mb-4" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
              At AgriSoil, we believe that sustainable agriculture is the foundation of a healthy planet and thriving communities. Our platform is dedicated to empowering farmers big and small with cutting-edge AI technology to understand their soil at a microscopic level.
            </p>
            <p className="text-muted mb-5" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
              We've partnered with leading agronomists and soil scientists worldwide to ensure our data algorithms deliver precise, actionable insights. Say goodbye to guesswork and hello to unprecedented crop yields.
            </p>

            <div className="row g-4 mb-4">
              <div className="col-sm-6">
                <div className="d-flex align-items-center">
                  <div className="bg-white rounded-circle d-flex justify-content-center align-items-center shadow-sm text-success fw-bold fs-4 me-3" style={{ width: "60px", height: "60px" }}>
                    <i className="fas fa-hand-holding-water"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Sustainable</h5>
                    <small className="text-muted">Eco-friendly focus</small>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center">
                  <div className="bg-white rounded-circle d-flex justify-content-center align-items-center shadow-sm text-success fw-bold fs-4 me-3" style={{ width: "60px", height: "60px" }}>
                    <i className="fas fa-brain"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">AI Powered</h5>
                    <small className="text-muted">High accuracy precision</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
