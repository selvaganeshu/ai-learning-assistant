import {useNavigate} from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthLayout from "../layouts/AuthLayout";
import { register} from "../services/authServices.js";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }*/

    try {
      setLoading(true);
      const res = await register(formData);

      localStorage.setItem("token", res.data.token);
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
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Account
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="Username" name="userName" onChange={handleChange} />
        <Input label="Email" type="email" name="email" onChange={handleChange} />
        <Input label="Password" type="password" name="password" onChange={handleChange} />
        {/*<Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
        />*/}

        <Button disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
