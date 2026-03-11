const API = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  const res = await fetch(`${API}/api/users`);
  return res.json();
};