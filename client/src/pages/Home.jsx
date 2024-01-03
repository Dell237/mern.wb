import React, { useRef, useState } from "react";
import { createDeal } from "../features/api/dealSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const dealRef = useRef();

  const [Data, setData] = useState({
    headline: "",
    preis: "",
  });

  const handelChange = (e) => {
    setData({ ...Data, [e.target.id]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(createDeal(Data)).unwrap();
      // return result.data;
      return setData({ headline: "", preis: "" });
    } catch (error) {
      if (error?.statue === 401) {
        console.log("Unauthorized");
      }
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6 ">Create Deal</h1>
      <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
        <input
          type="text"
          name="headline"
          id="headline"
          value={Data.headline}
          placeholder="headline"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handelChange}
          ref={dealRef}
        />
        <input
          type="preis"
          name="preis"
          id="preis"
          value={Data.preis}
          placeholder="preis"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handelChange}
        />

        <button
          type="submit"
          className="bg-black text-white p-2 rounded-md uppercase hover:opacity-75 disabled:opacity-80"
        >
          create
        </button>
      </form>
    </div>
  );
};

export default Home;
