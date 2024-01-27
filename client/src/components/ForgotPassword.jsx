import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../features/api/apiSlice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const defaultTheme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [statusTimer, setStatusTimer] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const { status } = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isValid) {
        const data = await dispatch(forgotPassword({ email })).unwrap();
        await setStatusTimer(true);
        setErrMsg(status);
        navigate("/Sign-In");

        return data;
      }
    } catch (error) {
      setErrMsg(status);
      console.log(error);
    }
  };
  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return pattern.test(email);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValid(validateEmail(inputEmail));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusTimer(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [statusTimer]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {statusTimer ? (
              <Typography
                className={
                  status
                    ? " text-green-400 font-bold p-2 mt-2"
                    : "absolute -left-2/4"
                }
              >
                {status}
              </Typography>
            ) : (
              <Typography
                className={
                  errMsg
                    ? "bg-red-400 text-fuchsia-50 font-bold p-2 mt-2"
                    : "absolute -left-2/4"
                }
              >
                {errMsg}
              </Typography>
            )}
            <TextField
              margin="normal"
              type="email"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChange}
              error={!isValid}
              helperText={!isValid && "Please enter a valid email address."}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
            >
              send
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
