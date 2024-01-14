import React, { useRef } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          src={user.profileBild}
          alt="profileBild"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />

        <input
          type="text"
          placeholder="username"
          className="bg-slate-100 rounded-lg p-3"
          defaultValue={user.username}
        />

        <input
          type="email"
          placeholder="email"
          className="bg-slate-100 rounded-lg p-3"
          defaultValue={user.email}
        />
        <input
          type="password"
          placeholder="password"
          className="bg-slate-100 rounded-lg p-3"
          defaultValue={user.password}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-black text-white p-2 rounded-md uppercase hover:opacity-75 disabled:opacity-80"
        >
          {isLoading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
