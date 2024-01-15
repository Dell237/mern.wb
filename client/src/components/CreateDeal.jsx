import React, { useRef, useState } from "react";
import { createDeal } from "../features/api/dealSlice";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";

const CreateDeal = () => {
  const dispatch = useDispatch();
  const dealRef = useRef();

  const [Data, setData] = useState({
    headline: "",
    preis: "",
    link: "",
    selectedFile: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    dispatch(createDeal(Data)).unwrap();

    clear();
  };
  // to clear all the inputs
  const clear = () => {
    setData({ headline: "", preis: "", link: "", selectedFile: "" });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6 ">
        Deal erstellen
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
        <input
          type="text"
          name="headline"
          value={Data.headline}
          placeholder="Überschrift"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={(e) => setData({ ...Data, headline: e.target.value })}
          ref={dealRef}
        />
        <input
          type="preis"
          name="preis"
          value={Data.preis}
          placeholder="Preis"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={(e) => setData({ ...Data, preis: e.target.value })}
        />
        <input
          type="text"
          name="link"
          value={Data.link}
          placeholder="Link"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={(e) => setData({ ...Data, link: e.target.value })}
        />
        <div className="bg-slate-100 p-3 rounded-lg">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setData({ ...Data, selectedFile: base64 })}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white p-2 rounded-md uppercase hover:opacity-75 disabled:opacity-80"
        >
          erstellen
        </button>
      </form>
    </div>
  );
};

export default CreateDeal;
