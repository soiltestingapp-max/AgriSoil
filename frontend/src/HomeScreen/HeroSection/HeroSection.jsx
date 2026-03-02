import "./HeroSection.css";
export default function HeroSection() {
  return (
    <section className="hero-section container py-5">
      <div className="row align-items-center">

        {/* LEFT SIDE */}
        <div className="col-lg-6">

          <span className="hero-badge">
            <i className="fas fa-certificate me-2"></i>
            CERTIFIED AGRICULTURAL LAB
          </span>

          <h1 className="hero-title mt-4">
            Unlock Your <br />
            <span>Soil's</span> Potential
          </h1>

          <p className="hero-text mt-3">
            Professional soil analysis and customized agricultural solutions at
            your fingertips. Get precise data to maximize your harvest and
            reduce waste.
          </p>

          <div className="mt-4 d-flex flex-wrap gap-3">
            <button className="btn btn-success hero-btn-primary">
              Start Soil Test <i className="fas fa-arrow-right ms-2"></i>
            </button>

            <button className="btn btn-outline-secondary hero-btn-secondary">
              View Marketplace
            </button>
          </div>

          <div className="trusted mt-4 d-flex align-items-center">
            <div className="avatars">
              <img src="https://i.pravatar.cc/40?img=1" alt="" />
              <img src="https://i.pravatar.cc/40?img=2" alt="" />
              <img src="https://i.pravatar.cc/40?img=3" alt="" />
            </div>
            <span className="ms-3">
              Trusted by <strong>10,000+</strong> farmers nationwide
            </span>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-6 position-relative mt-5 mt-lg-0">

          <img src="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Field" className="hero-img img-fluid" />

          <div className="soil-card">
            <small>CURRENT SOIL HEALTH</small>
            <h5>94% Optimal</h5>
          </div>

        </div>

      </div>
    </section>
  );
}