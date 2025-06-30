import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryCard from './components/SummaryCard';
import NetMovementModal from './components/NetMovementModal';
import { useAppContext } from '../../context/AppContext';

const Dashboard = () => {
  const {user}=useAppContext();
  const [stats, setStats] = useState([]);
  const [filterInputs, setFilterInputs] = useState({
    baseId: '',
    assetId: '',
    startDate: '',
    endDate: ''
  });
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNoData, setShowNoData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [bases, setBases] = useState([]);
  const [assets, setAssets] = useState([]);
axios.defaults.withCredentials = true;
  const fetchStats = async (filters = {}) => {
    try {
      
      const res = await axios.get(`${backendUrl}/api/dashboard/stats`, { params: filters });
      const results = res.data?.data || [];
      if(results.length>0){
        setShowNoData(false);
      }
      if (results.length === 0 && Object.keys(filters).length > 0) {
        setShowNoData(true);
        setTimeout(() => {
          setShowNoData(false);
          fetchStats(); 
        }, 3000);
      }

      setStats(results);
    } catch (err) {
      toast.error('Failed to fetch dashboard stats');
    }
  };

  useEffect(() => {
    setShowNoData(true);
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const baseRes = await axios.get(`${backendUrl}/api/bases/`);
        const assetRes = await axios.get(`${backendUrl}/api/assets/`);
        setBases(baseRes.data?.bases || []);
        setAssets(assetRes.data?.assets || []);
      } catch (error) {
        toast.error('Error fetching dropdown options');
      }
    };
    fetchOptions();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilterInputs(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    fetchStats(filterInputs);
  };

  const clearFilters = () => {
    setFilterInputs({ baseId: '', assetId: '', startDate: '', endDate: '' });
    fetchStats();
  };

  const openModal = (item) => {
    setModalData(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-700 to-sky-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">{user?.role?.role_name==='admin'? "Admin":"Base Commander"} Dashboard</h1>

 <div className="w-full bg-gradient-to-br from-sky-600 to-sky-800 p-6 rounded-lg shadow-lg mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-white mb-1">Select Base</label>
    <select
      className="bg-blue-100 text-black px-4 py-2 rounded-md shadow w-full"
      value={filterInputs.baseId}
      onChange={(e) => handleFilterChange('baseId', e.target.value)}
    >
      <option value="">All Bases</option>
      {bases.map((b) => (
        <option key={b.base_id} value={b.base_id}>{b.base_name}</option>
      ))}
    </select>
  </div>

  <div className="flex flex-col">
    <label className="text-sm font-semibold text-white mb-1">Select Equipment</label>
    <select
      className="bg-blue-100 text-black px-4 py-2 rounded-md shadow w-full"
      value={filterInputs.assetId}
      onChange={(e) => handleFilterChange('assetId', e.target.value)}
    >
      <option value="">All Equipment</option>
      {assets.map((a) => (
        <option key={a.asset_id} value={a.asset_id}>{a.name}</option>
      ))}
    </select>
  </div>

  <div className="flex flex-col">
    <label className="text-sm font-semibold text-white mb-1">Start Date</label>
    <input
      type="date"
      className="bg-blue-100 text-black px-4 py-2 rounded-md shadow w-full"
      value={filterInputs.startDate}
      onChange={(e) => handleFilterChange('startDate', e.target.value)}
    />
  </div>

  <div className="flex flex-col">
    <label className="text-sm font-semibold text-white mb-1">End Date</label>
    <input
      type="date"
      className="bg-blue-100 text-black px-4 py-2 rounded-md shadow w-full"
      value={filterInputs.endDate}
      onChange={(e) => handleFilterChange('endDate', e.target.value)}
    />
  </div>

  <div className="flex gap-2 col-span-full justify-end">
    <button
      className="bg-green-500 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-md shadow"
      onClick={applyFilters}
    >
      Apply
    </button>
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md shadow"
      onClick={clearFilters}
    >
      Clear
    </button>
  </div>
</div>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {showNoData ? (
          <p className="text-yellow-300 text-lg col-span-full">Searching for the data  shortly.</p>
        ) : stats.length === 0 ? (
          <p className="text-gray-300 col-span-full">No data available...</p>
        ) : (
          stats.map((item, index) => (
            <SummaryCard
              key={index}
              data={item}
              onNetMovementClick={() => openModal(item)}
            />
          ))
        )}
      </div>

      {/* Net Movement Modal */}
      {showModal && modalData && (
        <NetMovementModal item={modalData} onClose={closeModal} />
      )}
    </div>
  );
};

export default Dashboard;
