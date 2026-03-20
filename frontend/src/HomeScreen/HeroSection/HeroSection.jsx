import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="position-relative overflow-hidden" style={{ backgroundColor: "#f8faf9", padding: "100px 0 120px 0" }}>
      {/* Abstract Background Shapes */}
      <div className="position-absolute rounded-circle" style={{ width: "500px", height: "500px", backgroundColor: "rgba(25, 135, 84, 0.05)", top: "-150px", left: "-100px", zIndex: 0 }}></div>
      <div className="position-absolute rounded-circle" style={{ width: "300px", height: "300px", backgroundColor: "rgba(25, 135, 84, 0.08)", bottom: "50px", right: "-100px", zIndex: 0 }}></div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center g-5">

          {/* LEFT SIDE */}
          <div className="col-lg-6 pe-lg-5">
            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-semibold mb-3 border border-success border-opacity-25" style={{ fontSize: "0.9rem" }}>
              <i className="fas fa-leaf me-2"></i>
              CERTIFIED AGRICULTURAL INTELLIGENCE
            </span>

            <h1 className="fw-bolder mb-4 text-dark" style={{ fontSize: "3.5rem", lineHeight: "1.2", letterSpacing: "-1px" }}>
              Unlock Your <br />
              <span className="text-success position-relative">
                Soil's
                <svg className="position-absolute start-0 w-100" style={{ bottom: "-10px", height: "12px", zIndex: -1 }} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.00015 6.64917C43.1979 -1.61907 113.627 -2.43343 198.003 6.64917" stroke="#198754" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span> Potential
            </h1>

            <p className="lead text-muted mb-5" style={{ fontSize: "1.2rem", lineHeight: "1.7" }}>
              Professional soil analysis and customized agricultural solutions at your fingertips. Discover precise, actionable data to maximize your harvest and cultivate sustainably.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-5">
              <button 
                className="btn btn-success rounded-pill px-5 py-3 fw-bold shadow-sm" 
                style={{ transition: "all 0.3s ease" }}
                onClick={() => navigate("/soil-test")}
              >
                Start AI Soil Test <i className="fas fa-arrow-right ms-2"></i>
              </button>

              <button 
                className="btn btn-outline-dark rounded-pill px-5 py-3 fw-semibold"
                style={{ transition: "all 0.3s ease" }}
                onClick={() => navigate("/products")}
              >
                View Marketplace
              </button>
            </div>

            <div className="d-flex align-items-center bg-white p-3 rounded-pill shadow-sm d-inline-flex border border-light">
              <div className="d-flex me-3">
                <img src="https://i.pravatar.cc/100?img=33" alt="Farmer" className="rounded-circle border border-2 border-white" style={{ width: "40px", height: "40px", marginLeft: "-0px" }} />
                <img src="https://i.pravatar.cc/100?img=47" alt="Farmer" className="rounded-circle border border-2 border-white" style={{ width: "40px", height: "40px", marginLeft: "-15px" }} />
                <img src="https://i.pravatar.cc/100?img=12" alt="Farmer" className="rounded-circle border border-2 border-white" style={{ width: "40px", height: "40px", marginLeft: "-15px" }} />
              </div>
              <div>
                <div className="d-flex text-warning mb-1" style={{ fontSize: "0.8rem" }}>
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <span className="text-secondary small fw-medium">
                  Trusted by <strong>10,000+</strong> farmers
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6 position-relative mt-5 mt-lg-0">
            <div className="position-relative shadow-lg rounded-5 overflow-hidden border border-4 border-white" style={{ transform: "rotate(-2deg)", transition: "transform 0.5s ease" }}>
              <img 
                src="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=2342&auto=format&fit=crop" 
                alt="Agricultural Field" 
                className="img-fluid w-100" 
                style={{ objectFit: "cover", height: "550px", transform: "scale(1.05)" }} 
              />
              <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)" }}></div>
            </div>

            {/* Floating Glassmorphism Card */}
            <div 
              className="position-absolute shadow-lg rounded-4 p-4" 
              style={{ 
                bottom: "40px", 
                left: "-30px", 
                backgroundColor: "rgba(255, 255, 255, 0.9)", 
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.5)",
                transform: "rotate(2deg)"
              }}
            >
              <div className="d-flex align-items-center mb-2">
                <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" style={{ width: "40px", height: "40px" }}>
                  <i className="fas fa-check"></i>
                </div>
                <div>
                  <small className="text-muted fw-bold" style={{ letterSpacing: "1px", fontSize: "0.7rem" }}>CURRENT SOIL HEALTH</small>
                  <h4 className="fw-bolder text-dark mb-0">94% Optimal</h4>
                </div>
              </div>
              <div className="progress mt-3" style={{ height: "6px" }}>
                <div className="progress-bar bg-success" style={{ width: "94%" }}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}