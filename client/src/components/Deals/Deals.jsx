import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Deal from "./Deal/Deal";
import {
  Grid,
  CircularProgress,
  ThemeProvider,
  CssBaseline,
  Container,
  createTheme,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { getDeals, getLikedDeals } from "../../features/api/dealSlice";

const Deals = () => {
  const { userId } = useSelector((state) => state.user);

  const { dealItem } = useSelector((state) => state.deal);
  const [likedPosts, setLikedPosts] = useState([]);
  const [Like, setLike] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        if (userId !== null && localStorage.getItem("jwt")) {
          const response = await dispatch(getLikedDeals({ userId })).unwrap();
          return await setLikedPosts(response);
        }
      } catch (error) {
        return console.error("Fehler beim Überprüfen des Likes:", error);
      }
    };

    checkIfLiked();
    dispatch(getDeals());
  }, [Like, userId, dispatch]);

  const defaultTheme = createTheme();
  return !dealItem ? (
    <CircularProgress />
  ) : (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {dealItem.map((deal) => (
            <Grid item key={deal._id} xs={12} sm={6} md={4}>
              <Deal deal={deal} setLike={setLike} likedPosts={likedPosts} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Deals
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Angebote, Deals, Gutscheine
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="localhost:5000/">
            Deals
          </Link>
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </ThemeProvider>
  );
  // return !dealItem.length ? (
  //   <CircularProgress />
  // ) : (
  //   <Grid
  //     container
  //     justifyContent="center"
  //     alignItems="center"
  //     spacing={2}
  //     marginTop={"5px"}
  //   >
  //     {dealItem.map((deal) => (
  //       <Grid item key={deal._id} xs={12} sm={6} md={4} lg={3}>
  //         <Deal deal={deal} setLike={setLike} likedPosts={likedPosts} />
  //       </Grid>
  //     ))}
  //   </Grid>
  // );
};

export default Deals;
