import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Favorite from "./Favorite/Favorite";
import { getLikedDeals } from "../../../features/api/dealSlice";
import { logOut } from "../../../features/api/apiSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Favorites = () => {
  const { likedDeals, isLoading } = useSelector((state) => state.deal);
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const checkIfLiked = async () => {
    try {
      if (userId !== null) {
        await dispatch(getLikedDeals({ userId }));
      }
    } catch (error) {
      await dispatch(logOut());
      console.error("Fehler beim Überprüfen des Likes:", error);
      return navigate("/SignIn", { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    checkIfLiked();
  }, [userId]);
  if (isLoading) {
    return (
      <div className="text-center mt-4">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div style={{ width: "100%", marginTop: "25px" }}>
      <Typography sx={{ m: 2, fontSize: "1rem" }}>All</Typography>
      {!likedDeals.length ? (
        <div className="flex flex-col justify-center items-center ">
          <Typography variant="h4">Ups!</Typography>
          <Typography variant="h6">
            Du hast anscheinend noch keine Beiträge gespeichert!
          </Typography>
        </div>
      ) : (
        <Container sx={{ pt: 7 }} maxWidth="xl">
          <Grid container spacing={4}>
            {likedDeals.map((deal) => (
              <Grid item key={deal._id} xs={12} sm={6} md={4} xl={3}>
                <Favorite deal={deal} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default Favorites;
