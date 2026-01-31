import {useNavigate} from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthLayout from "../layouts/AuthLayout";
import { register} from "../services/authServices.js";
import {Mail,User,Lock} from "lucide-react";
import {useAuth} from "../context/AuthContext.jsx";

const Register = () => {
  const {login: authLogin} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword : "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
      return toast.error("Passwords do not match");
    }
    try {
      setLoading(true);
      const res = await register(formData);
      authLogin(res.data.token);
      toast.success("Registration successful 🎉");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center mb-4">
        Create Account
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="Username" name="userName" placeholder = "example" icon={<User size={16}/>} onChange={handleChange} />
        <Input label="Email" type="email" name="email" placeholder="you@example.com" icon={<Mail size={16}/>} onChange={handleChange} />
        <Input label="Password" type="password" name="password" placeholder="••••••••" icon={<Lock size={16}/>} onChange={handleChange} />
        <Input label="confirmPassword" type="password" name="confirmPassword" placeholder="••••••••" icon={<Lock size={16}/>} onChange={handleChange} />
        <Button disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-m text-slate-500">
        Already have an account?{" "}
        <span 
        onClick={()=> navigate('/login')}
        className="text-emerald-600 hover:underline cursor-pointer">
          Login
        </span>
      </p>
    </AuthLayout>
  );
};

export default Register;
