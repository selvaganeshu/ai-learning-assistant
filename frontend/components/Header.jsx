import { User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <header
      className="
        fixed top-0 left-64 right-0
        h-[56px]
        bg-white border-b
        flex items-center justify-end
        px-6 z-40
      "
    >
     
      <div className="flex items-center gap-3">
        
          <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center">
            <User size={18} className="text-emerald-100" />
          </div>

          <div className="leading-tight">
            <p className="text-m font-semibold text-slate-800">
              {user?.userName || "User"}
            </p>
            <p className="text-sm text-slate-500">
              {user?.email}
            </p>
          </div>
        
      </div>
    </header>
  );
};

export default Header;
