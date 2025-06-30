// src/pages/dashboard/LogisticsDashboard.jsx
import { PackageCheck, Repeat } from "lucide-react";

const LogisticsDashboard = () => {
  return (
    <div className="p-6 text-white font-poppins">
      <h2 className="text-3xl font-bold text-sky-300 mb-6">Logistics Officer Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4 mb-2">
            <PackageCheck className="text-white" size={32} />
            <h3 className="text-xl font-semibold">Purchase Management</h3>
          </div>
          <p>Handle procurement of military assets for your assigned base. Access and track all purchase requests.</p>
        </div>

        <div className="bg-green-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4 mb-2">
            <Repeat className="text-white" size={32} />
            <h3 className="text-xl font-semibold">Transfer Management</h3>
          </div>
          <p>Manage transfers between bases efficiently with full transparency of asset movement.</p>
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;
