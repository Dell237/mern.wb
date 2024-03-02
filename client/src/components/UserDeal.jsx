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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDeal, getAllUserDeal } from "../features/api/dealSlice";

const UserDeal = () => {
  const { userId } = useSelector((state) => state.user);
  const { userDeals, isLoading } = useSelector((state) => state.deal);
  const dispatch = useDispatch();
  const handleDeleteDeal = async (e, dealId) => {
    e.preventDefault();
    try {
      await dispatch(deleteDeal({ userId, dealId }));
      await getUserDeals();
    } catch (error) {
      throw error;
    }
  };
  const getUserDeals = async () => {
    await dispatch(getAllUserDeal());
  };
  useEffect(() => {
    getUserDeals();
  }, []);
  if (isLoading) {
    return (
      <div className="text-center mt-4">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div style={{ width: "100%", marginTop: "25px" }}>
      <Typography sx={{ m: 2, fontSize: "2rem" }}>Mein Deals</Typography>
      {!userDeals.length ? (
        <div className="flex flex-col justify-center items-center ">
          <Typography variant="h4">Ups!</Typography>
          <Typography variant="h6">
            Du hast anscheinend noch keine Beiträge gepostet!
          </Typography>
        </div>
      ) : (
        userDeals.map((deal) => (
          <Card key={deal._id} sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 1,
                m: 2,
                p: 2,
                borderRadius: 2,
                fontSize: "0.875rem",
                fontWeight: "700",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 144, height: 144, m: 1, alignSelf: "center" }}
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
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="self-center">
                    <FavoriteIcon />
                    &nbsp; {deal.likeCount}
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={(e) => handleDeleteDeal(e, deal._id)}
                      sx={{
                        color: "rgb(185 28 28)",
                        font: "inherit",
                        "&:hover": {
                          bgcolor: "rgb(254 226 226)",
                        },
                      }}
                    >
                      Deal Löschen
                    </Button>
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
                  </div>
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
