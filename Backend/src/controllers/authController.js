const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.signUp = async (req, res) => {
  try {
    console.log(req.body);

    const { email, password, confirmPassword, fname, sname, userRole } = req.body;
    const username = fname.concat(sname)
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "check your credantials" })
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    user = new User({
      username,
      email,
      password: hash,
      fname,
      sname,
      userRole
    });
    await user.save();

    res.status(200).json({
      message: "User Registered Successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: "check your credantials" })
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: "check your credantials" })
  }
  const token1 = generateToken(user)
  console.log("login success full")
  res.status(200).json({ message: "logined successfully", token1, user })
}
const generateToken = (user) => {
  return jwt.sign({ id: user._id, userRole: user.userRole },
    "suresh123",
    { expiresIn: "1h" })
}
