const Input = ({label,type="text",...props})=>{
    return(
        <div className="space-y-2">
        <label className="font-semibold ">
            {label}
        </label>
        <input 
        type={type}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 foucs:ring-emerald-500"
        {...props}
         /> 
    </div>
    )
}

export default Input;