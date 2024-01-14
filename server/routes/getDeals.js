const { getAllDeals } = require("../controllers/deals");
const router = require("express").Router();

router.route("/getDeals").get(getAllDeals);

module.exports = router;
