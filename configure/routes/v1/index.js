const mongoose = require("mongoose");
const router = require("express").Router();
const user = require("../../../controllers/signup");

router.post("/signup", user.signup);
router.post("/login", user.login);
module.exports = router;
