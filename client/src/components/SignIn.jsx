import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/api/apiSlice";

const SignIn = () => {
  const [Data, setData] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const sigInRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    sigInRef.current.focus();
  }, [errMsg]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (Data.email === "" || Data.password === "") {
      return setErrMsg("Please provide email and password!");
    }
    try {
      const data = await dispatch(loginUser(Data)).unwrap();
      console.log(data);
      setUsername(data.user.username);
    } catch (error) {
      return setErrMsg(error);
    }

    errRef.current.focus();
    setSuccess(true);
    setData({ email: "", password: "" });
  };

  const handelChange = (e) => {
    setData({ ...Data, [e.target.id]: e.target.value });
  };
  return (
    <>
      {success ? (
        <section className="flex mt-2 flex-col">
          <h2 className="flex justify-center font-bold text-green-600">
            Success!
          </h2>
          {username && <h1>Hallo, {username}</h1>}

          <p>
            <a href="/">go to Homepage</a>
          </p>
        </section>
      ) : (
        <div className="p-3 max-w-lg mx-auto">
          <p
            ref={errRef}
            className={
              errMsg
                ? "bg-red-400 text-fuchsia-50 font-bold p-2 mt-2"
                : "absolute -left-2/4"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-3xl text-center font-semibold my-6 ">Sign In</h1>
          <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              value={Data.email}
              placeholder="email"
              className="bg-slate-100 p-3 rounded-lg"
              onChange={handelChange}
              ref={sigInRef}
            />
            <input
              type="password"
              name="password"
              id="password"
              value={Data.password}
              placeholder="password"
              className="bg-slate-100 p-3 rounded-lg"
              onChange={handelChange}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white p-2 rounded-md uppercase hover:opacity-75 disabled:opacity-80"
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default SignIn;
