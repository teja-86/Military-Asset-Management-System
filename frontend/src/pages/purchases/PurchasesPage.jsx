import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";

const PurchasesPage = () => {
  const { user } = useAppContext();
  const [purchases, setPurchases] = useState([]);
  const [originalPurchases, setOriginalPurchases] = useState([]);
  const [newPurchase, setNewPurchase] = useState({
    asset_id: "",
    base_id: "",
    quantity: "",
    amount: "",
    purchase_date: "",
  });
  const [bases, setBases] = useState([]);
  const [assets, setAssets] = useState([]);
  const [filters, setFilters] = useState({ baseId: "", assetId: "", date: "" });

  const [isLoading, setIsLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const isCommander = user?.role?.role_name === "base_commander";

  const fetchPurchases = async (filtering = false) => {
    axios.defaults.withCredentials = true;
    try {
      if (filtering) {
        setIsLoading(true);
        setNoResults(false);
      }

      const res = await axios.get(`${backendUrl}/api/purchases/`, {
        params: filters,
        withCredentials: true,
      });

      const result = res.data?.purchases || [];
      if (result.length === 0 && filtering) {
        setNoResults(true);
        setTimeout(() => {
          setFilters({ baseId: "", assetId: "", date: "" });
          setPurchases(originalPurchases);
          setNoResults(false);
        }, 5000);
      } else {
        setPurchases(result);
        if (!initialFetchDone) setOriginalPurchases(result);
        setNoResults(false);
      }
    } catch (err) {
      toast.error("Failed to fetch purchases");
    } finally {
      setIsLoading(false);
      setInitialFetchDone(true);
    }
  };

  const fetchDropdownData = async () => {
    axios.defaults.withCredentials = true;
    try {
      const baseRes = await axios.get(`${backendUrl}/api/bases/`, { withCredentials: true });
      const assetRes = await axios.get(`${backendUrl}/api/assets/`, { withCredentials: true });

      if (isCommander) {
        const commanderBase = baseRes.data.bases.find(b => b.base_id === user.base_id);
        setBases(commanderBase ? [commanderBase] : []);
        setNewPurchase(prev => ({ ...prev, base_id: commanderBase?.base_id || "" }));
      } else {
        setBases(baseRes.data.bases || []);
      }

      setAssets(assetRes.data.assets || []);
    } catch (err) {
      toast.error("Failed to fetch dropdown data");
    }
  };

  const handleCreate = async () => {
    axios.defaults.withCredentials = true;
    const { asset_id, base_id, quantity, amount, purchase_date } = newPurchase;
    if (!asset_id || !base_id || !quantity || !amount || !purchase_date) {
      return toast.error("All fields are required");
    }

    const payload = {
      ...newPurchase,
      base_id: isCommander ? user.base_id : base_id,
    };

    try {
      await axios.post(`${backendUrl}/api/purchases`, payload, { withCredentials: true });
      toast.success("Purchase recorded");
      setNewPurchase({ asset_id: "", base_id: isCommander ? user.base_id : "", quantity: "", amount: "", purchase_date: "" });
      fetchPurchases();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create purchase");
    }
  };

  useEffect(() => {
    fetchDropdownData();
    fetchPurchases();
  }, []);

  useEffect(() => {
    if (initialFetchDone) {
      fetchPurchases(true);
    }
  }, [filters]);

  return (
    <div className="p-6 min-h-screen text-white bg-sky-950 font-poppins">
      <h2 className="text-3xl font-bold text-sky-300 mb-6">Manage Purchases</h2>

      {/* Filters */}
      {!isCommander && (
        <div className="bg-blue-900 p-4 rounded-xl mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="bg-white text-black px-3 py-2 rounded"
            value={filters.baseId}
            onChange={(e) => setFilters({ ...filters, baseId: e.target.value })}
          >
            <option value="">All Bases</option>
            {bases.map((b) => (
              <option key={b.base_id} value={b.base_id}>{b.base_name}</option>
            ))}
          </select>
          <select
            className="bg-white text-black px-3 py-2 rounded"
            value={filters.assetId}
            onChange={(e) => setFilters({ ...filters, assetId: e.target.value })}
          >
            <option value="">All Equipment</option>
            {assets.map((a) => (
              <option key={a.asset_id} value={a.asset_id}>{a.name}</option>
            ))}
          </select>
          <input
            type="date"
            className="bg-white text-black px-3 py-2 rounded"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
          <button
            onClick={() => setFilters({ baseId: "", assetId: "", date: "" })}
            className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-white"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Add Purchase Form */}
      <div className="bg-sky-900 p-6 rounded-xl mb-8 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Add New Purchase</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {!isCommander && (
            <select
              className="bg-white text-black px-3 py-2 rounded"
              value={newPurchase.base_id}
              onChange={(e) => setNewPurchase({ ...newPurchase, base_id: e.target.value })}
            >
              <option value="">Select Base</option>
              {bases.map((b) => (
                <option key={b.base_id} value={b.base_id}>{b.base_name}</option>
              ))}
            </select>
          )}
          {isCommander && (
            <input
              type="text"
              value={bases[0]?.base_name || "Your Base"}
              readOnly
              className="bg-gray-300 text-black px-3 py-2 rounded"
            />
          )}
          <select
            className="bg-white text-black px-3 py-2 rounded"
            value={newPurchase.asset_id}
            onChange={(e) => setNewPurchase({ ...newPurchase, asset_id: e.target.value })}
          >
            <option value="">Select Equipment</option>
            {assets.map((a) => (
              <option key={a.asset_id} value={a.asset_id}>{a.name}</option>
            ))}
          </select>
          <input
            type="number"
            className="bg-white text-black px-3 py-2 rounded"
            placeholder="Quantity"
            value={newPurchase.quantity}
            onChange={(e) => setNewPurchase({ ...newPurchase, quantity: e.target.value })}
          />
          <input
            type="number"
            className="bg-white text-black px-3 py-2 rounded"
            placeholder="Amount (₹)"
            value={newPurchase.amount}
            onChange={(e) => setNewPurchase({ ...newPurchase, amount: e.target.value })}
          />
          <input
            type="date"
            className="bg-white text-black px-3 py-2 rounded"
            value={newPurchase.purchase_date}
            onChange={(e) => setNewPurchase({ ...newPurchase, purchase_date: e.target.value })}
          />
        </div>
        <div className="text-right mt-4">
          <button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg"
          >
            Save Purchase
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="text-center text-lg text-sky-300 py-10">
          Fetching purchase records...
        </div>
      )}

      {noResults && !isLoading && (
        <div className="text-center text-yellow-300 text-lg py-10">
          No matching records found.
        </div>
      )}

      {!isLoading && !noResults && purchases.length > 0 && (
        <div className="overflow-x-auto bg-gray-800 rounded-xl shadow">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-sky-800 text-white">
              <tr>
                <th className="p-3">Base</th>
                <th className="p-3">Equipment</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Created By</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p, i) => (
                <tr key={i} className="border-t border-gray-700 hover:bg-gray-700">
                  <td className="p-3">{p.Base.base_name}</td>
                  <td className="p-3">{p.Asset.name}</td>
                  <td className="p-3">{p.quantity}</td>
                  <td className="p-3">₹ {parseFloat(p.amount).toFixed(2)}</td>
                  <td className="p-3">{new Date(p.purchase_date).toLocaleDateString()}</td>
                  <td className="p-3">{p.creator.email || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchasesPage;
