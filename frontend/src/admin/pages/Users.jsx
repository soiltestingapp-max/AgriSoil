import { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="admin-users container py-4">
      <div className="users-card">
        <div className="users-header">
          <h3>User Management</h3>
          <span className="total-users">Total Users: {users.length}</span>
        </div>

        <div className="table-responsive">
          <table className="table custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Reports</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="fw-semibold">{user.name}</td>
                  <td className="text-muted">{user.email}</td>

                  <td>
                    <span
                      className={`role-badge ${
                        user.role === "admin" ? "admin" : "user"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span className="report-count">
                      {user.reportCount || 0}
                    </span>
                  </td>

                  <td className="text-center">
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
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