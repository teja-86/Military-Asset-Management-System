// src/pages/Welcome.jsx
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-500 to-gray-600 text-gray-800 ">
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          {/* <ShieldCheck size={28} className="text-sky-300" /> */}
          <h1 className="text-2xl font-bold tracking-wide">Military Asset Management by - Ranga Dharma Teja Kuntumalla</h1>
        </div>
        <Link
          to="/login"
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Login
        </Link>
      </nav>

      <main className="flex flex-col items-center justify-center text-center py-20 px-4">

        <img
          src="https://data.militaryembedded.com/uploads/resize/1256/756/external/data.militaryembedded.com/uploads/articles/primary_images/1739574905.jpeg"
          alt="Military Technology"
          className="w-full max-w-2xl rounded-lg shadow-xl border-4 border-white"
        />
      </main>
    </div>
  );
};

export default Welcome;
