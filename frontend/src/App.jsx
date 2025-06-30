import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import AssetsPage from './pages/assets/AssetsPage';
import PurchasesPage from './pages/purchases/PurchasesPage';
import TransfersPage from './pages/transfers/TransfersPage';
import AssignmentPage from './pages/assignments/AssignmentPage';
import PersonnelPage from './pages/personnel/PersonnelPage';
import UserPage from './pages/UserPage';
import DashboardLayout from './components/DashboardLayout';
import AssetExpenditurePage from './pages/expendtitures/AssetExpenditurePage';
import BasePage from './pages/BasePage';
import ProtectedRoute from './components/ProtectedRoute';
import Welcome from './pages/Welcome'; 
import LogisticsDashboard from './pages/dashboard/LogisticsDashboard';
import { Navigate } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bases" element={<BasePage />} />
        <Route path="assets" element={<AssetsPage />} />
        <Route path="purchases" element={<PurchasesPage />} />
        <Route path="transfers" element={<TransfersPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="personnel" element={<PersonnelPage />} />
        <Route path="assignments" element={<AssignmentPage />} />
        <Route path="expenditures" element={<AssetExpenditurePage />} />
      </Route>

      <Route path="/commander" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="purchases" element={<PurchasesPage />} />
        <Route path="transfers" element={<TransfersPage />} />
        <Route path="assignments" element={<AssignmentPage />} />
        <Route path="expenditures" element={<AssetExpenditurePage />} />
      </Route>

      <Route path="/logistics" element={<ProtectedRoute><DashboardLayout/></ProtectedRoute>}>
         <Route path="dashboard" element={<LogisticsDashboard />} />
        <Route path="purchases" element={<PurchasesPage />} />
        <Route path="transfers" element={<TransfersPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
