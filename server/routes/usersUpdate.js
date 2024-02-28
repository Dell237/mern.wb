const express = require("express");
const {
  updatePassword,
  updateUsername,
  updateProfileBild,
  deleteAccount,
} = require("../controllers/user");

const router = express.Router();

router.route("/:userId/updatePassword").post(updatePassword);
router.route("/:userId/updateUsername").post(updateUsername);
router.route("/:userId/updateProfileBild").post(updateProfileBild);
router.route("/:userId/delete").delete(deleteAccount);

module.exports = router;
