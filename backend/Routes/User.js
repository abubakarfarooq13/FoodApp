const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  "/createuser",
  [
    // username must be an email
    body("email", "Enter valid email").isEmail(),
    body("name", "Name length is must be 5").isLength({ min: 5 }),
    // password must be at least 5 chars long
    body("password", "Password too short").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    // username must be an email
    body("email", "Enter valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password too short").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Invalid Email" });
      }
      if (req.body.password !== userData.password) {
        return res.status(400).json({ errors: "Invalid Password" });
      }
      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
