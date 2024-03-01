import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  disLikeDeals,
  getLikedDeals,
} from "../../../../features/api/dealSlice";
import { logOut } from "../../../../features/api/apiSlice";

const Favorite = ({ deal }) => {
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const handleDisLike = async (e, dealId) => {
    e.preventDefault();
    try {
      await dispatch(disLikeDeals({ userId, dealId }));
      await dispatch(getLikedDeals({ userId }));
    } catch (error) {
      await dispatch(logOut());
      console.error("Fehler beim Überprüfen des Likes:", error);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: "none 1 1",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          flexBasis: 200,
          minWidth: 190,
          minHeight: 190,
          objectFit: "contain",
        }}
        image={deal.selectedFile}
        alt="pic"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <div className="flex flex-row justify-between">
          <Typography gutterBottom variant="h5" component="h2">
            {deal.headline}
          </Typography>
          <Typography variant="h5" color="green">
            {deal.preis}€
          </Typography>
        </div>

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
      <CardActions className="flex justify-between ">
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
    </Card>
  );
};

export default Favorite;
