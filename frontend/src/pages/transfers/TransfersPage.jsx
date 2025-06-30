import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";

const TransfersPage = () => {
  const { user } = useAppContext();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [transfers, setTransfers] = useState([]);
  const [assets, setAssets] = useState([]);
  const [bases, setBases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    asset_id: "",
    from_base_id: "",
    to_base_id: "",
    quantity: "",
  });

  useEffect(() => {
    fetchTransfers();
    fetchAssetsAndBases();
  }, []);

  const fetchTransfers = async () => {
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      const res = await axios.get(`${backendUrl}/api/transfers`, { withCredentials: true });
      setTransfers(res.data);
     // console.log(res.data);
    } catch (err) {
      toast.error("Failed to fetch transfers");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAssetsAndBases = async () => {
    axios.defaults.withCredentials = true;
    try {
      const baseRes = await axios.get(`${backendUrl}/api/bases/`, { withCredentials: true });
      const assetRes = await axios.get(`${backendUrl}/api/assets/`, { withCredentials: true });
      setBases(baseRes.data.bases || []);
      setAssets(assetRes.data.assets || []);
    } catch (err) {
      toast.error("Failed to load assets or bases");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createTransfer = async (e) => {
    axios.defaults.withCredentials = true;
    e.preventDefault();
    const { asset_id, from_base_id, to_base_id, quantity } = formData;

    if (!asset_id || !from_base_id || !to_base_id || !quantity) {
      toast.error("All fields are required");
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/transfers`, formData, { withCredentials: true });
      toast.success("Transfer created successfully");
      setFormData({
        asset_id: "",
        from_base_id: user.base_id || "",
        to_base_id: "",
        quantity: "",
      });
      fetchTransfers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <div className="p-6 min-h-screen text-white bg-sky-950 font-poppins">
      <h2 className="text-3xl font-bold text-sky-300 mb-6">Manage Transfers</h2>

      {isLoading ? (
        <div className="text-center text-lg text-sky-300 py-10">
          Fetching transfer records...
        </div>
      ) : (
        <>
          {/* Transfer Form */}
          <div className="bg-sky-900 p-6 rounded-xl mb-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Create New Transfer</h3>
            <form onSubmit={createTransfer} className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <select
                name="asset_id"
                value={formData.asset_id}
                onChange={handleChange}
                className="bg-white text-black px-3 py-2 rounded"
              >
                <option value="">Select Asset</option>
                {assets.map((a) => (
                  <option key={a.asset_id} value={a.asset_id}>
                    {a.name}
                  </option>
                ))}
              </select>

              <select
                name="from_base_id"
                value={(user?.role?.role_name === "admin"||user?.role?.role_name === "logistics_officer" )? formData.from_base_id : user?.base_id}
                onChange={handleChange}
                className="bg-white text-black px-3 py-2 rounded"
                disabled={!(user?.role?.role_name === "admin" || user?.role?.role_name === "logistics_officer")}
              >
                <option value="">From Base</option>
                {bases.map((b) => (
                  <option key={b.base_id} value={b.base_id}>
                    {b.base_name}
                  </option>
                ))}
              </select>

              <select
                name="to_base_id"
                value={formData.to_base_id}
                onChange={handleChange}
                className="bg-white text-black px-3 py-2 rounded"
              >
                <option value="">To Base</option>
                {bases.map((b) => (
                  <option key={b.base_id} value={b.base_id}>
                    {b.base_name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="bg-white text-black px-3 py-2 rounded"
                min={1}
              />

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Create
              </button>
            </form>
          </div>

          {/* Transfer Table */}
          {transfers.length > 0 ? (
            <div className="overflow-x-auto bg-gray-800 rounded-xl shadow">
              <table className="w-full text-left min-w-[900px]">
                <thead className="bg-sky-800 text-white">
                  <tr>
                    <th className="p-3">Asset</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">From</th>
                    <th className="p-3">To</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">By</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.map((t) => (
                    <tr key={t.transfer_id} className="border-t border-gray-700 hover:bg-gray-700">
                      <td className="p-3">{t.asset?.name}</td>
                      <td className="p-3">{t.quantity}</td>
                      <td className="p-3">{t.from_base?.base_name}</td>
                      <td className="p-3">{t.to_base?.base_name}</td>
                      <td className="p-3">{new Date(t.transfer_date).toLocaleDateString()}</td>
                      <td className="p-3">{t.creator?.email || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-yellow-300 text-lg py-10">No transfers found.</div>
          )}
        </>
      )}
    </div>
  );
};

export default TransfersPage;
