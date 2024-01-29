const express = require("express");
const {
  register,
  login,
  updatePassword,
  logout,
  updateUsername,
  updateProfileBild,
  ResetPassword,
  forgotPassword,
  unintendedRegistration,
} = require("../controllers/user");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router
  .route("/unintended-registration/:userId/:email")
  .delete(unintendedRegistration);
router.route("/:userId/updatePassword").post(updatePassword);
router.route("/:userId/updateUsername").post(updateUsername);
router.route("/:userId/updateProfileBild").post(updateProfileBild);
router.route("/forgot-password").post(forgotPassword);
router.route("/forgot-password/:id").post(ResetPassword);

module.exports = router;
