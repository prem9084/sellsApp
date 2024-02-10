import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        {
          fname,
          lname,
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
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
      <h2 className="mt-3 text-center">REGISTRATION FORM</h2>
      <form className="w-50 m-auto  mt-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="First Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className="form-control"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
