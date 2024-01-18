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
import { useDispatch, useSelector } from "react-redux";
import { likeDeal } from "../../../features/api/dealSlice";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import Grid from "@mui/material/Grid";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
import useStyle from "./styles";

const Deal = ({ deal, likedPosts, setLike }) => {
  const { userId } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const classes = useStyle();

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
  // return (
  //   <Paper
  //     sx={{
  //       p: 2,
  //       margin: "auto",
  //       maxWidth: 600,
  //       flexGrow: 1,
  //       backgroundColor: (theme) =>
  //         theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //     }}
  //   >
  //     <Grid container spacing={2}>
  //       <Grid item>
  //         <CardMedia sx={{ width: 128, height: 128 }}>
  //           <Img alt="complex" src={deal.selectedFile} />
  //         </CardMedia>
  //       </Grid>
  //       <Grid item xs={12} sm container>
  //         <Grid item xs container direction="column" spacing={2}>
  //           <Grid item xs>
  //             <Typography gutterBottom variant="subtitle1" component="div">
  //               {deal.headline}
  //             </Typography>
  //           </Grid>
  //           <Grid item>
  //             <IconButton
  //               aria-label="add to favorites"
  //               disabled={likedPosts.some(
  //                 (LikedPost) => LikedPost._id === deal._id
  //               )}
  //               onClick={(e) => {
  //                 handleLike(e, deal._id, userId);
  //               }}
  //             >
  //               <FavoriteIcon fontSize="small" /> &nbsp; {deal.likeCount}
  //             </IconButton>
  //           </Grid>
  //         </Grid>
  //         <Grid item>
  //           <Typography
  //             className="text-green-600 text-lg font-bold"
  //             variant="subtitle1"
  //             component="div"
  //           >
  //             {deal.preis}€
  //           </Typography>
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //   </Paper>
  // );

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={deal.selectedFile}
        alt="Bild"
        component={"div"}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="div">
          {deal.headline}
        </Typography>
        <div className="text-green-600 text-lg font-bold">
          <Typography gutterBottom variant="h5">
            {deal.preis}€
          </Typography>
        </div>
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <IconButton
          aria-label="add to favorites"
          disabled={likedPosts.some((LikedPost) => LikedPost._id === deal._id)}
          onClick={(e) => {
            handleLike(e, deal._id, userId);
          }}
        >
          <FavoriteIcon fontSize="small" /> &nbsp; {deal.likeCount}
        </IconButton>
        <Button color="success" onClick={() => openInNewTab(deal.link)}>
          Zum Deal
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={deal.selectedFile} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {deal.headline}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {deal.preis}€
          </Typography>
        </div>
        <Typography
          // dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions className={classes.cardActions}>
        <IconButton
          aria-label="add to favorites"
          disabled={likedPosts.some((LikedPost) => LikedPost._id === deal._id)}
          onClick={(e) => {
            handleLike(e, deal._id, userId);
          }}
        >
          <FavoriteIcon fontSize="small" /> &nbsp; {deal.likeCount}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Deal;
