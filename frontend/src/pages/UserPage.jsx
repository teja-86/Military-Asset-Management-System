import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [roles, setRoles] = useState([]);
  const [bases, setBases] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role_name: "",
    base_name: "",
  });
  const [editData, setEditData] = useState(null);

  const fetchInitialData = async () => {
    axios.defaults.withCredentials = true;
    try {
      const [roleRes, baseRes, userRes] = await Promise.all([
        axios.get(`${backendUrl}/api/roles`, { withCredentials: true }),
        axios.get(`${backendUrl}/api/bases`, { withCredentials: true }),
        axios.get(`${backendUrl}/api/auth`, { withCredentials: true }),
      ]);
      setRoles(roleRes.data.roles || []);
      setBases(baseRes.data.bases || []);
      setUsers(userRes.data.users || []);
    } catch (err) {
      toast.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (user) => {
    setEditData({
      userId: user.user_id,
      full_name: user.full_name,
      email: user.email,
      role_name: user.role?.role_name || "",
      base_name: user.assignedBase?.base_name || "",
    });
  };

  const handleDelete = async (userId) => {
    axios.defaults.withCredentials = true;
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${backendUrl}/api/auth/${userId}`, { withCredentials: true });
      toast.success("User deleted");
      fetchInitialData();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    const { full_name, email, password, role_name, base_name } = formData;
    if (!full_name || !email || !role_name || !password || (role_name === "base_commander" && !base_name)) {
      return toast.error("Missing required fields");
    }
    try {
      await axios.post(`${backendUrl}/api/auth/register`, formData, { withCredentials: true });
      toast.success("User registered");
      setFormData({ full_name: "", email: "", password: "", role_name: "", base_name: "" });
      fetchInitialData();
    } catch (err) {
      // console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  const handleUpdate = async () => {
    axios.defaults.withCredentials = true;
    const { userId, full_name, email, role_name, base_name } = editData;
    if (!full_name || !email || !role_name || (role_name === "base_commander" && !base_name)) {
      return toast.error("Missing required fields for update");
    }
    try {
      await axios.put(`${backendUrl}/api/auth/${userId}`, { full_name, email, role_name, base_name }, { withCredentials: true });
      toast.success("User updated");
      setEditData(null);
      fetchInitialData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <div className="p-6 text-white bg-sky-950 text-center">Loading...</div>;

  return (
    <div className="p-6 min-h-screen text-white bg-sky-950 font-poppins">
      <h2 className="text-3xl font-bold text-sky-300 mb-6">Register New User</h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4 bg-sky-900 p-6 rounded-xl mb-8">
        <input name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full Name" className="bg-white text-black px-3 py-2 rounded" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" className="bg-white text-black px-3 py-2 rounded" />
        <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" className="bg-white text-black px-3 py-2 rounded" />
        <select name="role_name" value={formData.role_name} onChange={handleChange} className="bg-white text-black px-3 py-2 rounded">
          <option value="">Select Role</option>
          {roles.map(r => <option key={r.role_id} value={r.role_name}>{r.role_name}</option>)}
        </select>
        <select name="base_name" value={formData.base_name} onChange={handleChange} className="bg-white text-black px-3 py-2 rounded">
          <option value="">Select Base</option>
          {bases.map(b => <option key={b.base_id} value={b.base_name}>{b.base_name}</option>)}
        </select>
        <button type="submit" className="col-span-full bg-green-600 hover:bg-green-700 px-6 py-2 rounded">Register</button>
      </form>

      {editData && (
        <div className="bg-yellow-200 p-4 rounded-xl text-black mb-6">
          <h3 className="text-xl font-semibold mb-2">Edit User</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input name="full_name" value={editData.full_name} onChange={handleEditChange} placeholder="Full Name" className="px-3 py-2 rounded" />
            <input name="email" value={editData.email} onChange={handleEditChange} placeholder="Email" type="email" className="px-3 py-2 rounded" />
            <select name="role_name" value={editData.role_name} onChange={handleEditChange} className="px-3 py-2 rounded">
              <option value="">Select Role</option>
              {roles.map(r => <option key={r.role_id} value={r.role_name}>{r.role_name}</option>)}
            </select>
            <select name="base_name" value={editData.base_name} onChange={handleEditChange} className="px-3 py-2 rounded">
              <option value="">Select Base</option>
              {bases.map(b => <option key={b.base_id} value={b.base_name}>{b.base_name}</option>)}
            </select>
          </div>
          <div className="mt-4">
            <button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">Update</button>
            <button onClick={() => setEditData(null)} className="ml-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-sky-800 text-white">
            <tr>
              <th className="p-3">Full Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Base</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.user_id} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="p-3">{u.full_name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role?.role_name}</td>
                <td className="p-3">{u.assignedBase?.base_name || "N/A"}</td>
                <td className="p-3">{new Date(u.created_at).toLocaleDateString()}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(u)} className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700">Edit</button>
                  <button onClick={() => handleDelete(u.user_id)} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
