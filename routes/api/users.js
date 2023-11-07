const express = require("express");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { checkSchema, validationResult } = require("express-validator");

const router = express.Router();

// @route  POST  api/users
// @desc   Register users
// @access Public
router.post(
  "/",
  [
    checkSchema({
      firstName: {
        errorMessage: "Invalid firstName",
        notEmpty: true,
        isLength: {
          options: { min: 3, max: 15 },
        },
      },
      lastName: {
        errorMessage: "Invalid lastName",
        notEmpty: true,
        isLength: {
          options: { min: 3, max: 15 },
        },
      },
      email: {
        errorMessage: "Invalid email",
        notEmpty: true,
        isEmail: true,
      },
      password: {
        errorMessage: "Invalid password",
        notEmpty: true,
        isLength: {
          options: { min: 8, max: 15 },
        },
      },
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // validates the user details from the client
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // validates the user details with the mongoDB
      const { firstName, lastName, email, password } = req.body;

      let userFromDB = await User.findOne({ email: email });
      // see if the username/ email already exists
      if (userFromDB) {
        return res
          .status(400)
          .json({ errors: [{ msg: "email is already exist" }] });
      }
      // get user avatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "png",
        d: "mm",
      });
      //Encrypt the password and insert in DB

      let newUserToInsert = new User({
        firstName,
        lastName,
        email,
        password,
        avatar,
      });
      const salt = await bcrypt.genSalt(10);
      newUserToInsert.password = await bcrypt.hash(password, salt);
      await newUserToInsert.save();
      // return JSONWeb token
      const payload = {
        user: {
          id: newUserToInsert.id,
        },
      };
      jwt.sign(payload, config.get("jwtSecret"), {expiresIn:360000},
      (err, token) =>{
        if(err) throw err;
        res.json({token});
      });

     // res.send({ msg: "User created successfully", data: newUserToInsert });
    } catch (error) {
      console.log(error);
      return res.status(500).send("something went wrong");
    }
  }
);

module.exports = router;
