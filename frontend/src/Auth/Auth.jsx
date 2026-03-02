import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth({ type }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    adminToken: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const url =
      type === "login"
        ? "https://agrisoil.onrender.com/api/auth/login"
        : "https://agrisoil.onrender.com/api/auth/register";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    if (type === "login") {
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      const userRole = payload.role;

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: form.email,
          role: userRole,
        })
      );

      // ✅ ROLE BASED REDIRECT (Only 2 Roles Now)
      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }

    if (type === "register") {
      alert("Registered successfully. Please login.");
      navigate("/login");
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center px-3">

      {/* HEADER */}
      <div className="text-center mb-4">
        <div
          className="rounded-circle bg-success bg-opacity-25 d-flex justify-content-center align-items-center mx-auto mb-3"
          style={{ width: "70px", height: "70px" }}
        >
          <i className="fas fa-book text-success fs-4"></i>
        </div>
        <h3 className="fw-bold">AgriSoil Portal</h3>
        <p className="text-muted small">
          Connecting users to soil health intelligence.
        </p>
      </div>

      {/* CARD */}
      <div
        className="card shadow-sm w-100"
        style={{ maxWidth: "420px", borderRadius: "14px" }}
      >
        <div className="card-body p-4 p-md-5">

          <form onSubmit={submit}>

            {type === "register" && (
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role Selection (Only User & Admin) */}
            {type === "register" && (
              <div className="mb-3">
                <label className="form-label fw-semibold">Role</label>
                <select
                  className="form-select"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            {/* Admin Token Field */}
            {type === "register" && form.role === "admin" && (
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Admin Registration Token
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="adminToken"
                  value={form.adminToken}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success w-100 py-2 fw-semibold"
            >
              {type === "login"
                ? "Login to Dashboard"
                : "Create Account"}
            </button>

            <hr className="my-4" />

            <div className="text-center small">
              {type === "login" ? (
                <>
                  <span className="text-muted">New to AgriSoil?</span>{" "}
                  <span
                    className="text-success fw-semibold"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/register")}
                  >
                    Create an account
                  </span>
                </>
              ) : (
                <>
                  <span className="text-muted">Already have an account?</span>{" "}
                  <span
                    className="text-success fw-semibold"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </>
              )}
            </div>

          </form>

        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-4 text-muted small text-center">
        EMPOWERING SUSTAINABLE AGRICULTURE
      </div>

    </div>
  );
}