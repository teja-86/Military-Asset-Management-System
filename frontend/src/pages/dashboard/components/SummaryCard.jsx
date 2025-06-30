import React from "react";
import { FaBoxOpen, FaClipboardList, FaArrowUp, FaArrowDown, FaBalanceScale } from "react-icons/fa";

const SummaryCard = ({ data, onNetMovementClick }) => {
  const {
    base_name,
    asset_name,
    opening_balance,
    purchases,
    transfers_in,
    transfers_out,
    assigned,
    expended,
    closing_balance,
  } = data;

  const netMovement = purchases + transfers_in - transfers_out;

  return (
    <div className="bg-gradient-to-br from-gray-700 from-gray-800 text-white rounded-2xl shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <h3 className="text-xl font-bold mb-2 tracking-wide text-amber-300">
        {asset_name} <span className="text-sm text-gray-300">({base_name})</span>
      </h3>

      <div className="space-y-2 text-sm">
        <p className="flex items-center gap-2">
          <FaBoxOpen className="text-yellow-300" />
          Opening Balance: <span className="ml-auto font-semibold text-white">{opening_balance}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaArrowDown className="text-green-400" />
          Assigned: <span className="ml-auto font-semibold text-white">{assigned}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaArrowUp className="text-pink-400" />
          Expended: <span className="ml-auto font-semibold text-white">{expended}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaBalanceScale className="text-blue-400" />
          Closing Balance: <span className="ml-auto font-semibold text-white">{closing_balance}</span>
        </p>
      </div>

      <button
        className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition duration-300"
        onClick={onNetMovementClick}
      >
        View Net Movement
      </button>
    </div>
  );
};

export default SummaryCard;
