import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Deal from "./Deal/Deal";
import { Grid, CircularProgress } from "@mui/material";
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
          console.log(response);
          await setLikedPosts(response);
        }
      } catch (error) {
        console.error("Fehler beim Überprüfen des Likes:", error);
      }
    };

    checkIfLiked();
    dispatch(getDeals());
  }, [Like, dispatch]);

  return !dealItem.length ? (
    <CircularProgress />
  ) : (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
      marginTop={"5px"}
    >
      {dealItem.map((deal) => (
        <Grid item key={deal._id} xs={12} sm={6} md={4} lg={3}>
          <Deal deal={deal} setLike={setLike} likedPosts={likedPosts} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Deals;
