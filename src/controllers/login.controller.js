const { generateAccessToken } = require("../services/jsonwebtoken.service");

const express = require("express");
const bcrypt = require("bcrypt");

const userService = require("../services/user.service");
const bcryptService = require("../services/bcrypt.service");
const jwtService = require("../services/jsonwebtoken.service");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const match = await bcryptService.comparePasswords(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateAccessToken(user.email);
    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get("/verify-token", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwtService.verifyToken(token);
    return res.status(200).json({
      message: "Token is valid",
      userData: decoded,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
});

module.exports = router;
