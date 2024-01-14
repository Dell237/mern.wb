import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-5xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold ">Deals</h1>
        </Link>
        <ul className="flex gap-3 ">
          <Link to="/">
            <li>Home</li>
          </Link>

          {user ? (
            <>
              <Link to="/create">
                <li>neu Deal</li>
              </Link>
              <Link to="/About">
                <li>About</li>
              </Link>
              <Link to="/Profile">
                <img
                  src={user.profileBild}
                  alt="profile"
                  className="h-7 w-7 rounded-full object-cover"
                />
              </Link>
            </>
          ) : (
            <Link to="/Sign-In">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
