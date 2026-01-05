import { createContext,useState,useEffect,useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [token,setToken] = useState(null);
    const [loading,setLoading] = useState(true);
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    useEffect(()=>{
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            setToken(storedToken);
            setIsAuthenticated(true);
        }
        setLoading(false);
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
        <AuthContext.Provider value={{token,isAuthenticated,loading,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(AuthContext);
};