const mongoose = require("mongoose");
const router = require("express").Router();
const user = require("../../../controllers/signup");
const ratelimiter=require('../../rateLimit')

router.post("/signup", user.signup);
router.get("/login", [ratelimiter(),user.login]);
module.exports = router;
