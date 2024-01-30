import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checkSignUp } from "../../features/api/apiSlice";

const CheckSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tokenInQuery = new URLSearchParams(location.search); // get token from url query
  const token = tokenInQuery.get("token");
  const { id } = useParams();
  const dispatch = useDispatch();

  const [verificationStatus, setVerificationStatus] = useState("");

  const handleVerification = async (e) => {
    try {
      e.preventDefault();
      await dispatch(checkSignUp({ id, token })).unwrap();
      return navigate("/");
    } catch (error) {
      console.error("Error during email verification:", error);
      setVerificationStatus("Error during email verification");
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <p>Enter the token received in your email:</p>
      <input type="text" value={token} readOnly />
      <button onClick={handleVerification}>Verify Email</button>
      <p>Status: {verificationStatus}</p>
    </div>
  );
};

export default CheckSignUp;
