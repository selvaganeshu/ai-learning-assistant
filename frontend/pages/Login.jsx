import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthLayout from "../layouts/AuthLayout";
import { login } from "../services/authServices.js";
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
      <h2 className="text-2xl font-bold text-center mb-6">
        Login
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="Email" name="email" onChange={handleChange} />
        <Input label="Password" type="password" name="password" onChange={handleChange} />

        <Button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
