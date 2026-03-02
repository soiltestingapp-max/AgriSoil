import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReports: 0,
    pendingReports: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-dashboard container py-4">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="dashboard-card users">
            <h6>Total Users</h6>
            <h3>{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card reports">
            <h6>Total Reports</h6>
            <h3>{stats.totalReports}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card pending">
            <h6>Pending Approvals</h6>
            <h3>{stats.pendingReports}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card orders">
            <h6>Total Orders</h6>
            <h3>{stats.totalOrders}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
