const User = require("../models/userModel");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../utils/googleConfig");

/* GET Google Authentication API. */
exports.googleLogin = async (req, res, next) => {
  const code = req.query.code;
  try {
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name, picture } = userRes.data;
    // console.log(userRes);
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        image: picture,
      });
    }
    const { _id } = user;
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    res.status(200).json({
      message: "success",
      token,
      user,
    });
  } catch (err) {
  console.error("Google Login Error:", err.response?.data || err.message || err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message // optional, only in dev
  });
  }
};

