import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/api/apiSlice";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const SignIn = () => {
  const [Data, setData] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const sigInRef = useRef();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Data.email === "" || Data.password === "") {
      return setErrMsg("Please provide email and password!");
    }
    try {
      const data = await dispatch(loginUser(Data)).unwrap();
      console.log(data);
      setSuccess(true);
      setData({ email: "", password: "" });
      return data;
    } catch (error) {
      setSuccess(false);
      return setErrMsg(error);
    }
  };

  const handelChange = (e) => {
    setData({ ...Data, [e.target.id]: e.target.value });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
            Sign in
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
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={Data.email}
              onChange={handelChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={Data.password}
              onChange={handelChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Sign-Up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography
          sx={{ mt: 8, mb: 4 }}
          variant="body2"
          color="text.secondary"
          align="center"
        >
          {"Copyright © "}
          <Link color="inherit" href="https://dely.com/">
            dely.de
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </ThemeProvider>
  );
  // return (
  //   <>
  //     {success ? (
  //       <section className="flex mt-2 flex-col">
  //         <h2 className="flex justify-center font-bold text-green-600">
  //           Success!
  //         </h2>
  //         {username && <h1>Hallo, {username}</h1>}

  //         <p>
  //           <a href="/">go to Homepage</a>
  //         </p>
  //       </section>
  //     ) : (
  //       <div className="p-3 max-w-lg mx-auto">
  //         <p
  //           ref={errRef}
  //           className={
  //             errMsg
  //               ? "bg-red-400 text-fuchsia-50 font-bold p-2 mt-2"
  //               : "absolute -left-2/4"
  //           }
  //           aria-live="assertive"
  //         >
  //           {errMsg}
  //         </p>
  //         <h1 className="text-3xl text-center font-semibold my-6 ">Sign In</h1>
  //         <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
  //           <input
  //             type="email"
  //             name="email"
  //             id="email"
  //             value={Data.email}
  //             placeholder="email"
  //             className="bg-slate-100 p-3 rounded-lg"
  //             onChange={handelChange}
  //             ref={sigInRef}
  //           />
  //           <input
  //             type="password"
  //             name="password"
  //             id="password"
  //             value={Data.password}
  //             placeholder="password"
  //             className="bg-slate-100 p-3 rounded-lg"
  //             onChange={handelChange}
  //           />

  //           <button
  //             type="submit"
  //             disabled={isLoading}
  //             className="bg-black text-white p-2 rounded-md uppercase hover:opacity-75 disabled:opacity-80"
  //           >
  //             {isLoading ? "Loading..." : "Sign In"}
  //           </button>
  //         </form>
  //       </div>
  //     )}
  //   </>
  // );
};
export default SignIn;
