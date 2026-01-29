const Button = ({children,...props})=>{
    return(
        <button 
        className=
        "w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition cursor-pointer mb-4" 
        {...props}>
            {children}
        </button>
    )
}
export default Button;