import React, { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handelSubmit = () => {};
  const handelChange = () => {};
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6 ">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
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
          Sign In
        </button>
      </form>
    </div>
  );
};
export default SignIn;
