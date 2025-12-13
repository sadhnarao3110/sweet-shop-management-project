const express = require("express");
const { createUserAccount, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", createUserAccount);

router.post("/login", loginUser);8
module.exports = router;

export {};
