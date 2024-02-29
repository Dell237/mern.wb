import React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useDispatch, useSelector } from "react-redux";
import { likeDeal } from "../../../features/api/dealSlice";

const Deal = ({ deal, setLike, likedDeals }) => {
  const { userId } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const handleLike = async (e, dealId, userId) => {
    e.preventDefault();

    try {
      if (dealId && userId) {
        const resp = await dispatch(likeDeal({ dealId, userId })).unwrap();

        await setLike(deal.likeCount + 1);
        return resp;
      }
    } catch (error) {
      console.log(error);
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
          // // 16:9

          objectFit: "contain",
          flexBasis: 200,
          minWidth: 190,
          minHeight: 190,
        }}
        image={deal.selectedFile}
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
        <IconButton
          aria-label="add to favorites"
          disabled={likedDeals.some((LikedPost) =>
            LikedPost ? (LikedPost._id === deal._id ? true : false) : false
          )}
          onClick={(e) => {
            handleLike(e, deal._id, userId);
          }}
        >
          <FavoriteIcon fontSize="small" />
          &nbsp; {deal.likeCount}
        </IconButton>
        <Button
          sx={{
            bgcolor: "rgb(73, 190, 37, 1)",
            color: "white",
            position: "relative",
            pr: 7,
            pl: 7,
            borderRadius: 2.5,
            "&:hover": {
              bgcolor: "rgb(69, 200, 25, 1)",
            },
          }}
          onClick={() => openInNewTab(deal.link)}
        >
          Zum Deal <OpenInNewIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Deal;
