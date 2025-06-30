import React from "react";
import { ArrowDownCircle, ArrowUpCircle, PackagePlus, X } from "lucide-react";

const NetMovementModal = ({ item, onClose }) => {
  const {
    asset_name,
    base_name,
    purchases,
    transfers_in,
    transfers_out,
  } = item;

  const netMovement = purchases + transfers_in - transfers_out;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 font-poppins">
      <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-blue-800">Net Movement Summary</h2>

        <p className="mb-2"><strong>🏢 Base:</strong> {base_name}</p>
        <p className="mb-2"><strong>⚙️ Equipment:</strong> {asset_name}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <PackagePlus className="text-green-600" /> <span>Purchases:</span> <strong>{purchases}</strong>
          </div>
          <div className="flex items-center gap-2">
            <ArrowDownCircle className="text-green-600" /> <span>Transfers In:</span> <strong>{transfers_in}</strong>
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpCircle className="text-red-600" /> <span>Transfers Out:</span> <strong>{transfers_out}</strong>
          </div>
        </div>

        <p className="mt-4 text-center text-lg font-semibold text-indigo-700">
          Net Movement: {netMovement}
        </p>

        <div className="text-center mt-6">
          <button
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetMovementModal;
