import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAppContext();
console.log(user);
  if (loading) return <div className="text-white text-center p-10">Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
