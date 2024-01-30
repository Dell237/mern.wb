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

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../features/api/apiSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [Password, setPassword] = useState("");
  const defaultTheme = createTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const tokenInQuery = new URLSearchParams(location.search); // get token from url query
  const token = tokenInQuery.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await dispatch(
        resetPassword({ id, token, Password })
      ).unwrap();
      navigate("/");
      return data;
    } catch (error) {
      setErrMsg(error);
    }
  };

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
            new Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography
              className={
                errMsg
                  ? "bg-red-400 text-fuchsia-50 font-bold p-2 mt-2"
                  : "absolute -left-2/4"
              }
            >
              {errMsg}
            </Typography>
            <TextField
              margin="normal"
              type="password"
              required
              fullWidth
              id="Password"
              label="new Password"
              name="Password"
              autoComplete="Password"
              autoFocus
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              send
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPassword;
