const {
  createDeal,
  getDeal,
  deleteDeal,
  updateDeal,
} = require("../controllers/deals");
const router = require("express").Router();

router.route("/").post(createDeal);
router.route("/:id").get(getDeal).delete(deleteDeal).patch(updateDeal);

module.exports = router;
