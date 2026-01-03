import Input from "../components/Input";
import Button from "../components/Button";
import AuthLayout from "../layouts/AuthLayout";
import { useState } from "react";

const Register = ()=>{
    const [userName,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    return(
        <AuthLayout>
            <h2 className="font-bold text-center text-2xl mb-6">Create An Account</h2>
            <form className="space-y-4">
                <Input label="Name" 
                type="text" 
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                placeholder="Name : "
                />
                <Input 
                label="Email" 
                type="email"
                value={email}
                onChange = {(e)=> setEmail(e.target.value)}
                placeholder = "you@example.com"
                />
                <Input 
                label="Password"
                type="password"
                value = {password}
                onChange = {(e)=> setPassword(e.target.value)}
                placeholder = "********"
                 />
                <Button >Register</Button>
            </form>
        </AuthLayout>
    )
}
export default Register;
