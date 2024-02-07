import React, { useRef, useState } from "react";
import { createDeal } from "../features/api/dealSlice";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { logOut } from "../features/api/apiSlice";

const CreateDeal = () => {
  const dispatch = useDispatch();
  const dealRef = useRef();

  const [Data, setData] = useState({
    headline: "",
    preis: "",
    link: "",
    message: "",
    selectedFile: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createDeal(Data)).unwrap();
    } catch (error) {
      await dispatch(logOut());
    } finally {
      clear();
    }
  };
  // to clear all the inputs
  const clear = () => {
    setData({
      headline: "",
      preis: "",
      link: "",
      message: "",
      selectedFile: "",
    });
  };
  const defaultTheme = createTheme();
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
            Deal erstellen
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handelSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Überschrift"
                  name="headline"
                  required
                  fullWidth
                  label="Überschrift"
                  autoFocus
                  value={Data.headline}
                  onChange={(e) =>
                    setData({ ...Data, headline: e.target.value })
                  }
                  ref={dealRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  label="Preis"
                  name="Preis"
                  autoComplete="Preis"
                  value={Data.preis}
                  onChange={(e) => setData({ ...Data, preis: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Link"
                  name="link"
                  autoComplete="link"
                  value={Data.link}
                  onChange={(e) => setData({ ...Data, link: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="message"
                  variant="outlined"
                  label="Message"
                  fullWidth
                  multiline
                  rows={4}
                  value={Data.message}
                  onChange={(e) =>
                    setData({ ...Data, message: e.target.value })
                  }
                />

                <div className="bg-slate-100 p-3 rounded-lg mt-3">
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setData({ ...Data, selectedFile: base64 })
                    }
                  />
                </div>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              erstellen
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );

  //   <div className="p-3 max-w-lg mx-auto">
  //     <h1 className="text-3xl text-center font-semibold my-6 ">
  //       Deal erstellen
  //     </h1>
  //     <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
  //       <input
  //         type="text"
  //         name="headline"
  //         value={Data.headline}
  //         placeholder="Überschrift"
  //         className="bg-slate-100 p-3 rounded-lg"
  //         onChange={(e) => setData({ ...Data, headline: e.target.value })}
  //         ref={dealRef}
  //       />
  //       <input
  //         type="preis"
  //         name="preis"
  //         value={Data.preis}
  //         placeholder="Preis"
  //         className="bg-slate-100 p-3 rounded-lg"
  //         onChange={(e) => setData({ ...Data, preis: e.target.value })}
  //       />
  //       <input
  //         type="text"
  //         name="link"
  //         value={Data.link}
  //         placeholder="Link"
  //         className="bg-slate-100 p-3 rounded-lg"
  //         onChange={(e) => setData({ ...Data, link: e.target.value })}
  //       />
  //       <div className="bg-slate-100 p-3 rounded-lg">
  //         <FileBase
  //           type="file"
  //           multiple={false}
  //           onDone={({ base64 }) => setData({ ...Data, selectedFile: base64 })}
  //         />
  //       </div>

  //       <button
  //         type="submit"
  //         className="bg-black text-white p-2 rounded-md uppercase hover:opacity-75 disabled:opacity-80"
  //       >
  //         erstellen
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default CreateDeal;
