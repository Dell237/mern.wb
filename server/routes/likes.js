const {
  likeDeal,
  getLikedDeals,
  disLikeDeals,
} = require("../controllers/like");
const router = require("express").Router();

router.route("/likeDeal").post(likeDeal);
router.route("/liked-deals/:userId").get(getLikedDeals);
router.route("/disliked/:userId/:dealId").delete(disLikeDeals);

module.exports = router;
