const { getAllDeals, getPostsBySearch } = require("../controllers/deals");
const router = require("express").Router();

router.route("/getDeals").get(getAllDeals);
router.route("/search").get(getPostsBySearch);

module.exports = router;
