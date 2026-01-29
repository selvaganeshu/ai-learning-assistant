const Input = ({ label, icon, type = "text", ...props }) => {
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
          type={type}
          className={`
            w-full px-3 py-2 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            ${icon ? "pl-10" : ""}
          `}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
