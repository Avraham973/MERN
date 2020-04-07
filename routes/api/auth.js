/** @format */

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User.model");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

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

// @route   POST api/auth
// @desc    Authentecate User & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is reqired").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body); //The obj data sent to this route

    const { email, password } = req.body;
    try {
      //Check if the user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Ivalid Credentials" }] });
      }

      //In this line we compare the 'password' that has been given from the user
      //within the encypted password that we just retrievd from the DB
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Ivalid Credentials" }] });
      }

      //Sending back the JSON -ksonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwrToken"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //res.send("Users register");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
