const express = require("express");
const {
  register,
  checkSignUp,
  login,
  logout,
  ResetPassword,
  forgotPassword,
  unintendedRegistration,
} = require("../controllers/user");

const router = express.Router();

router.route("/register").post(register);
router.route("/signup/:userId").post(checkSignUp);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/forgot-password/:userId").post(ResetPassword);
router
  .route("/unintended-registration/:userId/:email")
  .delete(unintendedRegistration);

module.exports = router;
