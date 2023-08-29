const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const couldinary = require("../services/couldinary");
// const mail = require("../services/emailService");
const { unlinkSync } = require("fs");

const signUp = async (req, res) => {
  const registerData = new userSchema(req.body);
  try {
    const isUserExists = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExists) {
      req.file ? unlinkSync(req.file.path) : null // Delete multer unnecessary uploaded photo
      res.status(409).json({
        success: false,
        message: "User is already existed with this email",
      });
    } else {
      if (req.file !== undefined) {
        const result = await couldinary.uploader.upload(req.file.path, {
          public_id: `${registerData._id}_${Date.now()}_ProfilePIC`,
        });
        registerData.profilePic = result.url;
      }
      registerData.userPassword = await bcrypt.hash(req.body.userPassword, 10);
      const user = await registerData.save();
      res.status(201).json({
        success: true,
        message: "Registered successfully",
        data: user,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      Error: `Error occur ${error.stack}`,
    });
  }
};


// user login API
const userLogin = async (req, res) => {
  const { userEmail, userPassword } = req.body
  try {
      const userData = await userSchema.findOne({ userEmail: userEmail })
      if (!userData) {
          return res.status(400).json({
              success: false,
              message: "Email id not found"
          })
      } else {
          const passwordMatch = await bcrypt.compare(userPassword, userData.userPassword)
          if (userData && passwordMatch) {
              const token = jwt.sign({ userId: userData._id }, process.env.JWT, { expiresIn: "5d" })
              return res.status(200).json({
                  success: true,
                  message: "Login successfully",
                  token: token
              })
          } else {
              return res.status(401).json({
                  success: false,
                  message: "Invalid email or password"
              })
          }
      }
  } catch (err) {
      return res.status(500).json({
          success: false,
          error: err.message
      })
  }
}
module.exports = {
  signUp,
  userLogin
};
