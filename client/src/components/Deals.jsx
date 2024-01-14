import React from "react";
import { useSelector } from "react-redux";
import Deal from "./Deal";
import { Grid, CircularProgress } from "@mui/material";

const Deals = () => {
  const { isLoading, dealItem } = useSelector((state) => state.deal);

  return !dealItem.length ? (
    isLoading ? (
      <CircularProgress />
    ) : (
      <h2>No Deals</h2>
    )
  ) : (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
      marginTop={"5px"}
    >
      {dealItem.map((deal) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={deal._id}>
          <Deal deal={deal} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Deals;
