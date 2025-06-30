
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const DashboardLayout = ({ links }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar links={links} />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar/>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
