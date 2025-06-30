// src/pages/expenditures/AssetExpenditurePage.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";

const AssetExpenditurePage = () => {
  const { user } = useAppContext();
  const [personnel, setPersonnel] = useState([]);
  const [assets, setAssets] = useState([]);
  const [expenditures, setExpenditures] = useState([]);
  const [form, setForm] = useState({
    personnel_id: "",
    asset_id: "",
    quantity: "",
    status: "EXPENDED",
  });
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchPersonnel = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/personnel`, { withCredentials: true });
      const filtered = user.role.role_name === "base_commander"
        ? res.data.personnel.filter(p => p.base_id === user.base_id)
        : res.data.personnel;
      setPersonnel(filtered);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load personnel");
    }
  };

  const fetchAssets = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/assets`, { withCredentials: true });
      setAssets(res.data.assets || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load assets");
    }
  };

  const fetchExpenditures = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/asset-expenditures`, { withCredentials: true });
      const filtered = user.role.role_name === "base_commander"
        ? (res.data.expenditures || []).filter(e => e.Base?.base_id === user.base_id)
        : res.data.expenditures;
      setExpenditures(filtered);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load expenditures");
    }
  };

  const handleExpend = async () => {
    if (!form.personnel_id || !form.asset_id || !form.quantity || !form.status) {
      return toast.error("All fields required");
    }

    const selected = personnel.find(p => p.personnel_id === form.personnel_id);
    if (!selected) return toast.error("Invalid personnel selected");

    try {
      await axios.post(`${backendUrl}/api/asset-expenditures`, {
        ...form,
        quantity: parseInt(form.quantity),
      }, { withCredentials: true });

      toast.success(`Asset ${form.status.toLowerCase()} recorded`);
      setForm({ personnel_id: "", asset_id: "", quantity: "", status: "EXPENDED" });
      setSelectedPersonnel(null);
      fetchExpenditures();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Expenditure failed");
    }
  };

  useEffect(() => {
    fetchPersonnel();
    fetchAssets();
    fetchExpenditures();
  }, []);

  useEffect(() => {
    const selected = personnel.find(p => p.personnel_id === form.personnel_id);
    setSelectedPersonnel(selected || null);
  }, [form.personnel_id, personnel]);

  return (
    <div className="p-6 bg-sky-950 min-h-screen text-white font-poppins">
      <h2 className="text-3xl font-bold text-sky-300 mb-6">Asset Expenditures</h2>

      <div className="bg-blue-900 p-4 rounded-xl mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="bg-white text-black px-3 py-2 rounded"
            value={form.personnel_id}
            onChange={(e) => setForm({ ...form, personnel_id: e.target.value })}
          >
            <option value="">Select Personnel</option>
            {personnel.map(p => (
              <option key={p.personnel_id} value={p.personnel_id}>{p.name}</option>
            ))}
          </select>

          <input
            type="text"
            className="bg-gray-300 text-black px-3 py-2 rounded"
            value={selectedPersonnel?.base?.base_name || ""}
            placeholder="Base"
            readOnly
          />

          <select
            className="bg-white text-black px-3 py-2 rounded"
            value={form.asset_id}
            onChange={(e) => setForm({ ...form, asset_id: e.target.value })}
          >
            <option value="">Select Asset</option>
            {assets.map(a => (
              <option key={a.asset_id} value={a.asset_id}>{a.name}</option>
            ))}
          </select>

          <input
            type="number"
            className="bg-white text-black px-3 py-2 rounded"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="bg-white text-black px-3 py-2 rounded"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="EXPENDED">Expended</option>
            <option value="RETURNED">Returned</option>
          </select>

          <div className="text-right">
            <button
              onClick={handleExpend}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl">
        <h3 className="text-xl font-semibold text-sky-300 mb-4">Expenditure Records</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-sky-800 text-white">
              <tr>
                <th className="p-3">Personnel</th>
                <th className="p-3">Base</th>
                <th className="p-3">Asset</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenditures.map(e => (
                <tr key={e.expenditure_id} className="border-t border-gray-700 hover:bg-gray-700">
                  <td className="p-3">{e.Personnel?.name || "N/A"}</td>
                  <td className="p-3">{e.Base?.base_name || "N/A"}</td>
                  <td className="p-3">{e.Asset?.name || "N/A"}</td>
                  <td className="p-3">{e.quantity}</td>
                  <td className="p-3">{e.status}</td>
                  <td className="p-3">{new Date(e.expended_date).toLocaleDateString()}</td>
                </tr>
              ))}
              {expenditures.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 py-4">No expenditures found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetExpenditurePage;
