const {
  createDeal,
  getDeal,
  deleteDeal,
  updateDeal,
  likeDeal,
} = require("../controllers/deals");
const router = require("express").Router();

router.route("/").post(createDeal);
router.route("/:id").get(getDeal).delete(deleteDeal).patch(updateDeal);

router.route("/:id/likeDeal").patch(likeDeal);

module.exports = router;
