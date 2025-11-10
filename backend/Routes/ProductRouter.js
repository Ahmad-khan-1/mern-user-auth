const express = require("express");
const ensureAuthenticated = require("../Middleware/auth");
const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    {
      name: "mobile",
      price: 10000,
    },
    {
      name: "tv",
      price: "10000",
    },
  ]);
});

module.exports = router;
