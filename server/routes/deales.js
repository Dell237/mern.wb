const {
  getAllDeals,
  createDeal,
  getDeal,
  deleteDeal,
  updateDeal,
} = require("../controllers/deals");
const router = require("express").Router();

router.route("/").post(createDeal).get(getAllDeals);
router.route("/:id").get(getDeal).delete(deleteDeal).patch(updateDeal);

module.exports = router;
