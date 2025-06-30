import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import LoginNavbar from "../components/LoginNavbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getUser } = useAppContext();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    axios.defaults.withCredentials = true;
    e.preventDefault();
    if (!email || !password) return toast.error("All fields are required");

    try {
      const res = await axios.post(
        backendUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login successful!");
      await getUser();
      const role = res.data.user?.role;
      console.log(role);
      
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "base_commander") navigate("/commander/dashboard");
      else if (role === "logistics_officer") navigate("/logistics/dashboard");
      else navigate("/unauthorized");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handlePasswordReset = async () => {
    axios.defaults.withCredentials = true;
    if (!resetEmail || !newPassword) return toast.error("All fields are required");
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters");

    try {
      const res = await axios.post(`${backendUrl}/api/auth/forgot-password`, {
        email: resetEmail,
        newPassword,
      });

      if (res.data.success) {
        toast.success("Password reset. Check your email.");
        setShowReset(false);
        setResetEmail("");
        setNewPassword("");
      } else {
        toast.error(res.data.message || "Reset failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-gray-600 font-poppins">
      <LoginNavbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-sky-800">
            {showReset ? "Reset Password" : "Login"}
          </h2>

          {!showReset ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-sky-700 text-white py-2 rounded font-semibold"
                >
                  Login
                </button>
              </form>

              <p
                onClick={() => setShowReset(true)}
                className="text-gray-500 text-sm text-center mt-2 hover:underline cursor-pointer"
              >
                Forgot Password?
              </p>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    required
                  />
                </div>

                <button
                  onClick={handlePasswordReset}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
                >
                  Reset Password
                </button>

                <p
                  onClick={() => setShowReset(false)}
                  className="text-sky-600 text-sm text-center mt-2 hover:underline cursor-pointer"
                >
                  Back to Login
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
