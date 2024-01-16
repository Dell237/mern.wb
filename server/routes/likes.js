const { likeDeal, getLikedDeals } = require("../controllers/like");
const router = require("express").Router();

router.route("/likeDeal").post(likeDeal);
router.route("/liked-deals/:userId").get(getLikedDeals);

module.exports = router;
