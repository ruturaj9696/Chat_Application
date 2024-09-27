const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = async (id) => {
  try {
    // Check if JWT_SECRET is available
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // Token expiration set to 30 days
    });

    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Token creation failed");
  }
};
module.exports = { createToken };
