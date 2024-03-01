import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../api/axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { isLoading } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!isLoading) {
      userRef.current.focus();
    }
  }, []);

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const v1 = PWD_REGEX.test(formData.password);
    if (!v1) {
      setErrMsg(
        "Kennwort von 8 bis 24 Zeichen. Muss Groß- und Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten"
      );
      return;
    }
    try {
      await axios.post(`/auth/register`, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setFormData({ username: "", email: "", password: "" });
      navigate("/SignIn");
    } catch (error) {
      if (!error?.response) {
        setErrMsg("Keine Serverantwort");
      } else if (error.response?.status === 400) {
        setErrMsg("Benutzername vergeben");
      } else {
        setErrMsg("Registrierung fehlgeschlagen");
      }
      errRef.current.focus();
    }
  };

  return isLoading ? (
    <h2 className="flex mt-4 justify-center font-extrabold text-green-600">
      is Loading ....
    </h2>
  ) : (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6 ">Sign Up</h1>
      <p
        ref={errRef}
        className={
          errMsg
            ? "border border-solid border-2 border-red-600  text-red-700 font-medium  p-2 mt-2"
            : "absolute -left-2/4"
        }
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
        <input
          type="text"
          id="username"
          value={formData.username}
          placeholder="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handelChange}
          autoComplete="off"
          ref={userRef}
          required
        />
        <input
          type="email"
          id="email"
          value={formData.email}
          placeholder="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handelChange}
          autoComplete="off"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          placeholder="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handelChange}
          autoComplete="off"
          required
        />

        <button
          type="submit"
          className="bg-blue-700 text-white p-2 rounded-md uppercase hover:opacity-75 disabled:opacity-80"
        >
          Sign Up
        </button>
      </form>
      <div className="flex my-2 gap-2">
        <p>Have an account?</p>
        <Link to="/SignIn">
          <span className="text-blue-700 font-semibold">Sign In</span>
        </Link>
      </div>
    </div>
  );
};
export default SignUp;
