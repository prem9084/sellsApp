import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/addsels");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <h2 className="mt-3 text-center">LOGIN FORM</h2>
      <form className="w-50 m-auto  mt-5" onSubmit={handleLogin}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            <h4 className="text-center">Email address</h4>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            <h4>Password</h4>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter Password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
