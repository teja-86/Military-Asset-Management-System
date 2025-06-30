import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const BasePage = () => {
  const { user } = useAppContext();
  const [bases, setBases] = useState([]);
  const [form, setForm] = useState({ base_name: "", location: "" });
  const [editingId, setEditingId] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
  const fetchBases = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/bases`, { withCredentials: true });
      setBases(res.data.bases || []);
    } catch {
      toast.error("Failed to load bases");
    }
  };

  const handleSubmit = async () => {
    axios.defaults.withCredentials = true;
    if (!form.base_name || !form.location) {
      return toast.error("All fields are required");
    }

    try {
      if (editingId) {
        await axios.put(`${backendUrl}/api/bases/${editingId}`, form, { withCredentials: true });
        toast.success("Base updated");
      } else {
        await axios.post(`${backendUrl}/api/bases`, form, { withCredentials: true });
        toast.success("Base created");
      }
      setForm({ base_name: "", location: "" });
      setEditingId(null);
      fetchBases();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (base) => {
    axios.defaults.withCredentials = true;
    setForm({ base_name: base.base_name, location: base.location });
    setEditingId(base.base_id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this base?")) return;
    try {
      await axios.delete(`${backendUrl}/api/bases/${id}`, { withCredentials: true });
      toast.success("Base deleted");
      fetchBases();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchBases();
  }, []);
  return (
    <div className="p-6 bg-sky-950 min-h-screen text-white font-poppins">
      <h2 className="text-3xl font-bold text-sky-300 mb-6">Manage Bases</h2>

      <div className="bg-blue-900 p-4 rounded-xl mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            className="bg-white text-black px-3 py-2 rounded"
            placeholder="Base Name"
            value={form.base_name}
            onChange={(e) => setForm({ ...form, base_name: e.target.value })}
          />
          <input
            type="text"
            className="bg-white text-black px-3 py-2 rounded"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg"
          >
            {editingId ? "Update" : "Create"}
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl">
        <h3 className="text-xl font-semibold text-sky-300 mb-4">Base Records</h3>
        <table className="w-full text-left">
          <thead className="bg-sky-800 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Location</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bases.map((b) => (
              <tr key={b.base_id} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="p-3">{b.base_name}</td>
                <td className="p-3">{b.location}</td>
                <td className="p-3 flex gap-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 px-4 py-1 rounded"
                    onClick={() => handleEdit(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded"
                    onClick={() => handleDelete(b.base_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {bases.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400">No bases found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BasePage;
