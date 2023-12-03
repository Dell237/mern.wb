import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-5xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold">MERN</h1>
        </Link>
        <ul className="flex gap-3 ">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/About">
            <li>About</li>
          </Link>
          <Link to="/Sign-In">
            <li>Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
