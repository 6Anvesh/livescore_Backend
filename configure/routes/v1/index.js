const router = require("express").Router();
const user = require("../../../controllers/signup");
const ratelimiter=require('../../rateLimit')

router.post("/signup", user.signup);
router.post("/checkuserExists", user.checkuserExists);
router.post("/login", [ratelimiter(),user.login]);
router.post("/tweet", [user.tweetSave]);
router.get("/alltweets/:username", [user.alltweets]);
router.get("/searchtweets/:username", [user.searchtweets]);
router.get("/searchHashtag/:hashtag", [user.searchHashtag]);


module.exports = router;
