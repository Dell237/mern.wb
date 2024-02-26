const {
  createDeal,
  getUserDeal,
  deleteDeal,
  updateDeal,
} = require("../controllers/deals");
const router = require("express").Router();

router.route("/").post(createDeal);
router.route("/deals").get(getUserDeal);
router.route("/:id").delete(deleteDeal).patch(updateDeal);

module.exports = router;
