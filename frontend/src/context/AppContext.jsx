import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [user, setUser] = useState(null); // Will store logged-in user
const [loading, setLoading] = useState(true);
  const getUser = async () => {
    axios.defaults.withCredentials=true;
    try {
      const res = await axios.get(backendUrl+"/api/auth/user");
      //console.log(res.data.success);
      res.data.success?setUser(res.data.user):toast.error(res.data.message);
      //console.log(res.data.user);
    } catch (error) {
     // toast.error(error.message);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
const value={ user, setUser, getUser ,loading};
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
