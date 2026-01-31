import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthLayout from "../layouts/AuthLayout";
import { login } from "../services/authServices.js";
import {Mail,Lock} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await login(formData);
      authLogin(res.data.token);
      toast.success("Login successful 🚀");
     navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>

      
      <h2 className="text-2xl font-bold text-center">
        Welcome Back
      </h2>
      <p className="text-m text-slate-500 text-center mb-6">
        Sign in to continue to your journey
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="Email" name="email" placeholder="you@example.com" icon = {<Mail size={16}/>} onChange={handleChange} />
        <Input label="Password" type="password" name="password" placeholder="••••••••" icon = {<Lock size={16}/>} onChange={handleChange} />

        <Button disabled={loading} >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="text-m text-center text-slate-500">
        Don't have an account?{" "}
        <span 
        onClick={()=> navigate('/register')}
        className="text-emerald-600 cursor-pointer hover:underline">Sign Up</span>
      </p>

      <p className="text-xs text-center text-slate-400 mt-3">
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </AuthLayout>
  );
};

export default Login;
