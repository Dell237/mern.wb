import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUserDeal } from "../features/api/dealSlice";

const UserDeal = () => {
  const dispatch = useDispatch();
  const [UserDeals, setUserDeals] = useState([]);

  useEffect(() => {
    const getUserDeals = async () => {
      const resp = await dispatch(getAllUserDeal()).unwrap();
      setUserDeals(resp.deal);
    };
    getUserDeals();
  }, []);

  return (
    <div style={{ width: "100%", marginTop: "25px" }}>
      <Typography sx={{ m: 2, fontSize: "2rem" }}>Mein Deals</Typography>
      {!UserDeals.length ? (
        <CircularProgress />
      ) : (
        UserDeals.map((deal) => (
          <Card key={deal._id} sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: 1,
                m: 2,
                p: 2,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#101010" : "#fff",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                borderRadius: 2,
                fontSize: "0.875rem",
                fontWeight: "700",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 144, height: 144, m: 1 }}
                image={deal.selectedFile}
                alt="pic"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <CardContent sx={{ width: "100%" }}>
                  <Typography component="div" variant="h5">
                    {deal.headline}
                  </Typography>
                  <Typography
                    style={{
                      lineHeight: "1.4em",
                      maxHeight: "4.2em",
                      overflow: "hidden",
                    }}
                  >
                    {deal.message}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <FavoriteIcon />
                    &nbsp; {deal.likeCount}
                  </div>
                  <Button
                    sx={{
                      bgcolor: "rgb(73, 190, 37, 1)",
                      color: "white",
                      pr: 7,
                      pl: 7,
                      borderRadius: 2.5,
                      "&:hover": {
                        bgcolor: "rgb(68, 227, 19, 1)",
                      },
                    }}
                    onClick={() => openInNewTab(deal.link)}
                  >
                    Zum Deal
                  </Button>
                </CardActions>
              </Box>
            </Box>
          </Card>
        ))
      )}
    </div>
  );
};

export default UserDeal;
