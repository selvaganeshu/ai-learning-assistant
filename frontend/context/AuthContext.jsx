import { createContext,useState,useEffect,useContext } from "react";
import { getMe } from "../services/authServices.js";
const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [token,setToken] = useState(null);
    const [loading,setLoading] = useState(true);
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    useEffect(()=>{
        const storedToken = localStorage.getItem("token");
        if(!storedToken){
            setLoading(false);
            return;
        }
        setToken(storedToken);
        getMe()
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
    },[]);

    const login = (token)=>{
        localStorage.setItem("token",token);
        setToken(token);
        setIsAuthenticated(true);
    }

    const logout = ()=>{
        localStorage.removeItem("token");
        setToken(null);
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value={{user,token,isAuthenticated,loading,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(AuthContext);
};