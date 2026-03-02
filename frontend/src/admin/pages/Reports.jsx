import { useEffect, useState } from "react";
import axios from "axios";
import "./Reports.css";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://agrisoil.onrender.com/api/soil-reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    };

    fetchReports();
  }, []);

  const approve = async (id) => {
    console.log("Approving ID:", id);

    const token = localStorage.getItem("token");

    await axios.put(
      `https://agrisoil.onrender.com/api/soil-reports/${id}/approve`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );

    setReports(
      reports.map((r) => (r._id === id ? { ...r, approvedByAdmin: true } : r)),
    );
  };

  return (
    <div className="admin-reports container py-4">
      <div className="reports-card">
        <div className="reports-header">
          <h3>Soil Reports Management</h3>
          <span className="report-count-badge">
            Total Reports: {reports.length}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table custom-report-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Recommended Crop</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report._id}>
                  <td className="fw-semibold">
                    {report.user?.email || "Unknown"}
                  </td>

                  <td className="text-success fw-semibold">
                    {report.recommendedCrops[0]}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        report.approvedByAdmin ? "approved" : "pending"
                      }`}
                    >
                      {report.approvedByAdmin ? "Approved" : "Pending"}
                    </span>
                  </td>

                  <td className="text-center">
                    {!report.approvedByAdmin && (
                      <button
                        className="approve-btn"
                        onClick={() => approve(report._id)}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
