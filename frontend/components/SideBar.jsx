import { useNavigate,NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {LayoutDashboard,LogOut,FileText} from "lucide-react";

const SideBar = ()=>{
    const {logout} = useAuth();
    const navigate = useNavigate();

    return(
        <aside className="w-64 bg-white border-r fixed top-0 left-0 min-h-screen p-4 flex flex-col ">
            <div className="flex items-center gap-2 mb-8">
                <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
                    AI
                </div>
                <h1 className="font-semibold text-lg">AI Learning Assistant</h1>
            </div>

            <nav className="flex flex-col gap-2 flex-1 ">
                <NavItem 
                to = "/dashboard" 
                label = "Dashboard" 
                icon = {<LayoutDashboard size={18}/>}/>
                <NavItem 
                to = "/documents" 
                label= "Documents"
                icon = {<FileText size={18}/>}
                />
            </nav>

            <button 
            className="text-left flex gap-x-2 items-center text-red-500 bg-slate-150 cursor-pointer hover:bg-red-100 px-3 py-2 rounded-lg"
            onClick={()=>{
                logout();
                navigate("/login");
            }}>
                <LogOut size={18}/>
                Logout
            </button>

        </aside>
    )
}

const NavItem = ({to,label,icon})=>{
    return(
        <NavLink
    to = {to}
    className={({isActive})=> `px-3 py-2 flex gap-x-1 items-center rounded-lg  font-medium transition ${
        isActive ?
        "bg-emerald-500 text-white"
        : "text-slate-600 hover:bg-slate-100"
    }`}
    >
        {icon}
        {label}
    </NavLink>
    )
}

export default SideBar;