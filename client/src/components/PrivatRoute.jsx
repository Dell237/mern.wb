import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivatRoute = () => {
  const { accessToken } = useSelector((state) => state.user);
  return accessToken ? <Outlet /> : <Navigate to="/SignIn" />;
};

export default PrivatRoute;
