import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LayoutDashboard, Package, Truck, Users, ClipboardList, Activity,Home } from 'lucide-react';

const Sidebar = () => {
  const { user } = useAppContext();
  const location = useLocation();

  const role = user?.role?.role_name;

  const menuItems = (() => {
    switch (role) {
      case "admin":
        return [
          { label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
          { label: "Bases", path: "/admin/bases", icon: <Home size={18} /> },
          { label: "Assets", path: "/admin/assets", icon: <Package size={18} /> },
          { label: "Purchases", path: "/admin/purchases", icon: <ClipboardList size={18} /> },
          { label: "Transfers", path: "/admin/transfers", icon: <Truck size={18} /> },
          { label: "Assignments", path: "/admin/assignments", icon: <ClipboardList size={18} /> },
          { label: "Expenditures", path: "/admin/expenditures", icon: <Activity size={18} /> },
          { label: "User", path: "/admin/user", icon: <Users size={18} /> },
          { label: "Personnel", path: "/admin/personnel", icon: <Users size={18} /> },
        ];
      case "base_commander":
        return [
          { label: "Dashboard", path: "/commander/dashboard", icon: <LayoutDashboard size={18} /> },
          { label: "Purchases", path: "/commander/purchases", icon: <ClipboardList size={18} /> },
          { label: "Transfers", path: "/commander/transfers", icon: <Truck size={18} /> },
          { label: "Assignments", path: "/commander/assignments", icon: <ClipboardList size={18} /> },
          { label: "Expenditures", path: "/commander/expenditures", icon: <Activity size={18} /> },
        ];
      case "logistics_officer":
        return [
          { label: "Dashboard", path: "/logistics/dashboard", icon: <LayoutDashboard size={18} /> },
          { label: "Transfers", path: "/logistics/transfers", icon: <Truck size={18} /> },
          { label: "Purchases", path: "/logistics/purchases", icon: <ClipboardList size={18} /> },
        ];
      default:
        return [];
    }
  })();

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-700 to-sky-800 p-6 space-y-4 min-h-screen flex flex-col text-white shadow-lg">
      <h2 className="text-xl font-bold border-b border-sky-600 pb-2 mb-6 tracking-wide">Main Menu</h2>

      <nav className="space-y-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200
                ${isActive ? 'bg-sky-600 text-white shadow' : 'hover:bg-sky-700 hover:scale-[1.02]'}
              `}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
