const express = require("express");
const { signUp, signIn, getAllUsers, getRole } = require("../controllers/authController.js");
const router = express.Router();


router.post("/auth/signIn", signIn)
router.post("/auth/signUp", signUp);
router.get('/auth/getAllUSers', getAllUsers)

module.exports = router;