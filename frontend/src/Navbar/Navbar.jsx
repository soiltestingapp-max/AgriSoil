import { useNavigate } from "react-router-dom";
import "./Navbar.css"

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <div className="container-fluid">

        {/* Logo */}
        <span
          className="navbar-brand fw-bold text-warning"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <i className="fas fa-sparkles me-2"></i>
          AgriSoil 
        </span>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Center Links */}
          <ul className="navbar-nav me-auto ms-4 mb-2 mb-lg-0">
            <li className="nav-item">
              <span className="nav-link" style={{ cursor: "pointer" }} onClick={()=>navigate("/soil-test")}>
                Soil Testing
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link" style={{ cursor: "pointer" }} onClick={()=>navigate("/products")}>
                Marketplace
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link" style={{ cursor: "pointer" }}>
                How It Works
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link" style={{ cursor: "pointer" }}>
                About Us
              </span>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex me-3" style={{ width: "250px" }}>
            <input
              className="form-control rounded-pill"
              type="search"
              placeholder="Search kits, fertilizers..."
            />
          </form>

          {/* Profile Dropdown */}
          {user ? (
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fas fa-user-circle me-2 fs-5"></i>
                {user.email}
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow">
                <li>
                  <span className="dropdown-item text-muted">
                    Role: {user.role}
                  </span>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={logout}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn btn-success rounded-pill px-4"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}