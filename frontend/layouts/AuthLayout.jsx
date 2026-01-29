import { BrainCircuit } from "lucide-react";
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <div className="flex justify-center mb-4">
          <div className="w-17 h-17 bg-emerald-500 text-white rounded-xl shadow-lg flex items-center justify-center text-white">
            <BrainCircuit size={28} />
          </div>
        </div>
        {children}
      </div>
    </div>  
  );
};

export default AuthLayout;
