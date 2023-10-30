const express = require("express");

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
        isEmail: true
      },
      password: {
        errorMessage: "Invalid password",
        notEmpty: true,
        isLength: {
          options: { min: 8, max: 15 },
        }
      }
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // validates the user details from the client
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    
    // validates the user details with the mongoDB

    // see if the username/ email already exists
    
    // get user avatar

    //Encrypt the password and insert in DB

    // return JSONWeb token


    const newUser = (({ firstName, lastName, email }) => ({ firstName, lastName, email}))(req.body);
    res.send({"msg":"User created successfully", data: newUser});
  }
);

module.exports = router;
