import {useState} from "react";
import { Eye,EyeOff } from "lucide-react";
const Input = ({ label, icon, type = "text", ...props }) => {
  const[showPassword,setShowPassword] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>
      
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          type={isPassword && showPassword ? "text" : type}
          className={`
            w-full px-3 py-2 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            ${icon ? "pl-10" : ""}
            ${isPassword ? "pr-10" : ""}
          `}
          {...props}
        />

        {isPassword && (
          <button 
          type = "button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-slate-600"
          onClick={()=> setShowPassword(!showPassword)}>
            {showPassword ? <Eye size={16}/> : <EyeOff size={16}/>}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
