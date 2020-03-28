/** @format */

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User.model");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    //Get the user from the DB
    const user = await await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
