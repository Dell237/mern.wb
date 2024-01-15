import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { likeDeal } from "../features/api/dealSlice";

const Deal = ({ deal, setLike }) => {
  const dispatch = useDispatch();

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const resp = await dispatch(likeDeal(deal._id)).unwrap();

      setLike(deal.likeCount + 1);
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
      }}
    >
      <CardMedia
        sx={{
          width: 344,
          height: 194,
        }}
        component="img"
        image={deal.selectedFile}
        alt="Bild"
      />
      <CardContent className="flex  justify-between">
        <Typography gutterBottom variant="h5" component="div">
          {deal.headline}
        </Typography>
        <div className="text-green-600 text-lg font-bold">
          <Typography gutterBottom variant="h5">
            {deal.preis}€
          </Typography>
        </div>
      </CardContent>
      <CardActions className=" flex justify-between  " disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon fontSize="small" /> &nbsp; {deal.likeCount}
        </IconButton>
        <Button color="success" onClick={() => openInNewTab(deal.link)}>
          Zum Deal
        </Button>
      </CardActions>
    </Card>
  );
};

export default Deal;
