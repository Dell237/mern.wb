import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCreateUsersMutation } from "../features/api/apiSlice";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [createUser] = useCreateUsersMutation();
  const navigate = useNavigate();
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    createUser(formData);
    setFormData({ username: "", email: "", password: "" });
    navigate("/Sign-In");
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6 ">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          placeholder="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handelChange}
        />
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          placeholder="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handelChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          placeholder="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handelChange}
        />

        <button
          type="submit"
          className="bg-black text-white p-2 rounded-md uppercase hover:opacity-75 disabled:opacity-80"
        >
          Sign Up
        </button>
      </form>
      <div className="flex my-2 gap-2">
        <p>Have an account?</p>
        <Link to="/Sign-In">
          <span className="text-blue-700 font-semibold">Sign In</span>
        </Link>
      </div>
    </div>
  );
};
export default SignUp;
