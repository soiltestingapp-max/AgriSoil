const API_URL = "https://agrisoil.onrender.com/api";

export const api = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    ...options,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API error");

  return data;
};
