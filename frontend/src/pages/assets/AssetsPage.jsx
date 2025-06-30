import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PackagePlus, Edit3, Trash2, Check, X } from "lucide-react";

const AssetsPage = () => {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({ name: "", category: "" });
  const [editingAsset, setEditingAsset] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const editRef = useRef(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  axios.defaults.withCredentials = true;
  const fetchAssets = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/assets`, {
        withCredentials: true,
      });
      setAssets(res.data.assets || []);
    } catch (err) {
      toast.error("Failed to fetch assets", err);
    }
  };

  const handleCreate = async () => {
    if (!newAsset.name || !newAsset.category) {
      return toast.error("Name and category are required");
    }
    try {
      await axios.post(`${backendUrl}/api/assets`, newAsset, {
        withCredentials: true,
      });
      toast.success("Asset created");
      setNewAsset({ name: "", category: "" });
      fetchAssets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Creation failed");
    }
  };

  const handleUpdate = async () => {
    if (!editingAsset.newName || !editingAsset.category) {
      return toast.error("Name and category required");
    }
    try {
      await axios.put(
        `${backendUrl}/api/assets/${editingAsset.name}`,
        {
          newName: editingAsset.newName,
          category: editingAsset.category,
        },
        { withCredentials: true }
      );
      toast.success("Asset updated");
      setEditingAsset(null);
      fetchAssets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (name) => {
    try {
      await axios.delete(`${backendUrl}/api/assets/${name}`, {
        withCredentials: true,
      });
      toast.success("Asset deleted");
      setDeleteConfirm(null);
      fetchAssets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    if (editingAsset && editRef.current) {
      editRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [editingAsset]);

  return (
    <div className="p-6 min-h-screen bg-sky-950 text-white font-poppins">
      <h2 className="text-3xl font-bold text-sky-300 mb-8 flex items-center gap-3">
        <PackagePlus className="text-sky-400" size={28} />
        Manage Equipment
      </h2>

      {/* Add Asset Form */}
      <div className="bg-sky-900 p-6 rounded-xl mb-10 shadow-lg space-y-4">
        <h3 className="text-xl font-semibold text-white mb-2">
          Add New Equipment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Enter Asset Name"
            className="bg-gray-100 text-black p-3 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={newAsset.name}
            onChange={(e) =>
              setNewAsset({ ...newAsset, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter Category"
            className="bg-gray-100 text-black p-3 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={newAsset.category}
            onChange={(e) =>
              setNewAsset({ ...newAsset, category: e.target.value })
            }
          />
        </div>
        <div className="text-right">
          <button
            onClick={handleCreate}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg transition duration-200 font-semibold"
          >
            Add Equipment
          </button>
        </div>
      </div>

      {/* Asset Table */}
      <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg mb-10">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-sky-800 text-white text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr
                key={asset.name}
                className="border-b border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="p-4">{asset.name}</td>
                <td className="p-4">{asset.category}</td>
                <td className="p-4 flex flex-col md:flex-row justify-center items-center gap-2">
                  <button
                    onClick={() =>
                      setEditingAsset({
                        name: asset.name,
                        newName: asset.name,
                        category: asset.category,
                      })
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded flex items-center gap-1 text-sm"
                  >
                    <Edit3 size={16} /> Edit
                  </button>
                  {deleteConfirm === asset.name ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(asset.name)}
                        className="bg-red-600 px-2 py-1 rounded"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="bg-gray-500 px-2 py-1 rounded"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(asset.name)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded flex items-center gap-1 text-sm"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Section */}
      {editingAsset && (
        <div
          ref={editRef}
          className="mt-6 bg-blue-900 p-6 rounded-xl shadow-md w-full space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">Edit Equipment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="New Name"
              className="bg-gray-100 text-black p-3 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={editingAsset.newName}
              onChange={(e) =>
                setEditingAsset({ ...editingAsset, newName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Category"
              className="bg-gray-100 text-black p-3 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={editingAsset.category}
              onChange={(e) =>
                setEditingAsset({
                  ...editingAsset,
                  category: e.target.value,
                })
              }
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditingAsset(null)}
              className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetsPage;
