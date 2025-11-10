const express = require("express");
const {
  signupValidation,
  loginValidation,
} = require("../Middleware/authValidation");
const router = express.Router();
const { signup, login } = require("../Controllers/AuthController");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

module.exports = router;
