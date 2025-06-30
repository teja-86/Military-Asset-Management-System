import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const LoginNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        {/* <ShieldCheck size={24} className="text-sky-300" /> */}
        <h1 className="text-xl font-bold tracking-wide">Military Management System by - Ranga Dharma Teja Kuntumalla</h1>
      </div>
      <Link to="/" className="hover:underline text-white-300 font-medium">
        Back to Home
      </Link>
    </nav>
  );
};

export default LoginNavbar;
