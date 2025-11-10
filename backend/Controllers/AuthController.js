const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
  try {
    //Get data from request
    const { name, email, password } = req.body;
    const existUser = await UserModel.findOne({ email });
    // Check if the user already exist
    if (existUser) {
      return res
        .status(409)
        .json({ message: " User is already exist", success: false });
    } //If a user is found, stop the function and send a 409 (Conflict) response.

    // Create new user
    const userModel = new UserModel({ name, email, password });
    // Hash the password
    userModel.password = await bcrypt.hash(password, 10);
    // save this new user in DB
    await userModel.save();
    // Response
    res.status(201).json({
      message: "signup successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};
//the Login controller function handles user authentication by verifying the provided email and password against stored user data.
const login = async (req, res) => {
  try {
    //Get data from request
    const { email, password } = req.body;
    //Check the user exits in the database using the provided email.
    const existUser = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email and password is wrong";
    // if the user not fout , return 403
    if (!existUser) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    //compare the entered passord with the stored hashed password.
    const isPassEqual = await bcrypt.compare(password, existUser.password);
    // if the password is incorrect, send error response
    if (!isPassEqual) {
      return res.status(403).json({
        message: "errorMsg",
        success: false,
      });
    }
    // ✅ Create JWT token
    const jwtToken = jwt.sign(
      { email: existUser.email, id: existUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // valid for 7 days
    );
    //The backend sends this token to the frontend after login.
    // Response
    res.status(200).json({
      message: "login successfully",
      success: true,
      jwtToken,
      email,
      name: existUser.name,
    });
    //"message": "login successfully",
    // "success": true,
    // "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    // "email": "john@example.com",
    // "name": "John"
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
