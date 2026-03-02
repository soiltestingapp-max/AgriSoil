import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css"
export default function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="admin-sidebar">
      <h4 className="mb-4 text-success">AgriSoil Admin</h4>

      <ul className="nav flex-column flex-grow-1">
        <li className="nav-item mb-2">
          <NavLink to="/admin/dashboard" className="nav-link text-white">
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/admin/reports" className="nav-link text-white">
            Soil Reports
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/admin/users" className="nav-link text-white">
            Users
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/admin/products" className="nav-link text-white">
            Products
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/admin/orders" className="nav-link text-white">
            Orders
          </NavLink>
        </li>
      </ul>

      {/* Logout Button */}
      <button onClick={logout} className="btn btn-danger mt-auto">
        Logout
      </button>
    </div>
  );
}
