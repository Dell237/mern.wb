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
import React, { useEffect } from "react";
import {
  disLikeDeals,
  getDeals,
  getLikedDeals,
} from "../../../features/api/dealSlice";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate, useLocation } from "react-router-dom";
import { logOut } from "../../../features/api/apiSlice";

const Favorite = () => {
  const { userId } = useSelector((state) => state.user);
  const { likedDeals, isLoading } = useSelector((state) => state.deal);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  const handleDisLike = async (e, dealId) => {
    e.preventDefault();
    try {
      await dispatch(disLikeDeals({ userId, dealId }));
      await checkIfLiked();
    } catch (error) {
      await dispatch(logOut());
      console.error("Fehler beim Überprüfen des Likes:", error);
    }
  };
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
    dispatch(getDeals());
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
        likedDeals.map((deal) => (
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
                  <Button
                    sx={{
                      color: "rgb(73, 190, 37, 1)",
                      "&:hover": {
                        color: "rgb(68, 227, 19, 1)",
                      },
                    }}
                    onClick={(e) => handleDisLike(e, deal._id)}
                  >
                    <FavoriteIcon />
                  </Button>
                  <Button
                    sx={{
                      bgcolor: "rgb(73, 190, 37, 1)",
                      color: "white",

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

export default Favorite;
