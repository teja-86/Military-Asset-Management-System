import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";

const AssignmentPage = () => {
  const { user } = useAppContext();
  const [personnel, setPersonnel] = useState([]);
  const [baseAssets, setBaseAssets] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [form, setForm] = useState({ asset_id: "", quantity: "" });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const isCommander = user?.role?.role_name === "base_commander";

  const fetchPersonnel = async () => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.get(`${backendUrl}/api/personnel`, { withCredentials: true });
      const filteredPersonnel = isCommander
        ? res.data.personnel.filter(p => p.base_id === user.base_id)
        : res.data.personnel;
      setPersonnel(filteredPersonnel);
    } catch {
      toast.error("Failed to load personnel");
    }
  };

  const fetchBaseAssets = async (base_id) => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.get(`${backendUrl}/api/base-assets/${base_id}`, { withCredentials: true });
      setBaseAssets(res.data.assets || []);
    } catch {
      toast.error("Failed to load base assets");
    }
  };

  const fetchAssignments = async () => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.get(`${backendUrl}/api/asset-assignments`, { withCredentials: true });
      const filtered = isCommander
        ? res.data.assignments.filter(a => a.base_id === user.base_id)
        : res.data.assignments;
      setAssignments(filtered);
    } catch {
      toast.error("Failed to fetch assignments");
    }
  };

  const handleAssign = async () => {
    axios.defaults.withCredentials = true;
    if (!selectedPersonnel || !form.asset_id || !form.quantity || parseInt(form.quantity) <= 0) {
      return toast.error("All fields required and valid");
    }

    const asset = baseAssets.find(a => a.asset_id === form.asset_id);
    if (!asset) return toast.error("Asset not found in base");
    if (parseInt(form.quantity) > asset.available_quantity) {
      return toast.error("Not enough quantity available");
    }

    try {
      await axios.post(`${backendUrl}/api/asset-assignments`, {
        personnel_id: selectedPersonnel?.personnel_id,
        base_id: selectedPersonnel?.base_id,
        asset_id: form.asset_id,
        quantity: parseInt(form.quantity),
      }, { withCredentials: true });

      toast.success("Assigned successfully");
      setForm({ asset_id: "", quantity: "" });
      setSelectedPersonnel(null);
      setBaseAssets([]);
      fetchAssignments();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Assignment failed");
    }
  };

  useEffect(() => {
    fetchPersonnel();
    fetchAssignments();
    if (isCommander) {
      fetchBaseAssets(user.base_id); // fetch only once
    }
  }, []);

  useEffect(() => {
    if (!isCommander && selectedPersonnel?.base_id) {
      fetchBaseAssets(selectedPersonnel.base_id);
    }
  }, [selectedPersonnel]);

  return (
    <div className="p-6 bg-sky-950 min-h-screen text-white font-poppins">
      <h2 className="text-3xl font-bold text-sky-300 mb-6">Assign Assets</h2>

      <div className="bg-blue-900 p-4 rounded-xl mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="bg-white text-black px-3 py-2 rounded"
            value={selectedPersonnel?.personnel_id || ""}
            onChange={(e) => {
              const p = personnel.find(p => p.personnel_id === e.target.value);
              setSelectedPersonnel(p);
              setForm({ asset_id: "", quantity: "" });
              if (!isCommander && p?.base_id) fetchBaseAssets(p.base_id);
            }}
          >
            <option value="">Select Personnel</option>
            {personnel.map(p => (
              <option key={p.personnel_id} value={p.personnel_id}>{p.name}</option>
            ))}
          </select>

          <select
            className="bg-white text-black px-3 py-2 rounded"
            value={form.asset_id}
            onChange={(e) => setForm({ ...form, asset_id: e.target.value })}
            disabled={!selectedPersonnel}
          >
            <option value="">Select Asset</option>
            {baseAssets.map(a => (
              <option key={a.asset_id} value={a.asset_id}>
                {a.Asset.name} (Available: {a.available_quantity})
              </option>
            ))}
          </select>

          <input
            type="number"
            className="bg-white text-black px-3 py-2 rounded"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            disabled={!form.asset_id}
          />
        </div>
        <div className="text-right mt-4">
          <button
            onClick={handleAssign}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg"
            disabled={!selectedPersonnel || !form.asset_id || !form.quantity}
          >
            Assign
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl">
        <h3 className="text-xl font-semibold text-sky-300 mb-4">Assignment Records</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-sky-800 text-white">
              <tr>
                <th className="p-3">Personnel</th>
                <th className="p-3">Base</th>
                <th className="p-3">Asset</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(a => (
                <tr key={a.assignment_id} className="border-t border-gray-700 hover:bg-gray-700">
                  <td className="p-3">{a.Personnel?.name || "N/A"}</td>
                  <td className="p-3">{a.Base?.base_name || "N/A"}</td>
                  <td className="p-3">{a.Asset?.name || "N/A"}</td>
                  <td className="p-3">{a.quantity}</td>
                  <td className="p-3">{new Date(a.assigned_date).toLocaleDateString()}</td>
                </tr>
              ))}
              {assignments.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 py-4">No assignments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;
