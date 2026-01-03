import Input from "../components/Input";
import Button from "../components/Button";
import AuthLayout from "../layouts/AuthLayout";
import { useState } from "react";

const Login = ()=>{
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    return(
        <AuthLayout>
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form className="space-y-4">
                <Input label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <Input label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <Button>Login</Button>
            </form>
        </AuthLayout>
    )
}

export default Login;