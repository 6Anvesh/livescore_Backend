const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtService = require("../configure/auth");
let User = mongoose.model("Usermodel");
const tweetModel=mongoose.model("tweetModel");
const redis=require('./redisOperations');
module.exports = {
  checkuserExists:async(req,res)=>{
try{
  console.log("checkuserExists", req.body);
  let count = await User.find({ username: req.body.username }).countDocuments();
return  res.json({ success: count?true:false });
}catch(err){
 throw new Error(err);
}
  },
  signup: async (req, res) => {
    console.log("Signup", req.body);
    try {
      console.log("signup");
 let data = JSON.parse(JSON.stringify(req.body));
      let useremail = await User.find({ email: data.email }).countDocuments();

      if (!useremail) {
        var user = new User(data);
        user.password = bcrypt.hashSync(data.password, 10);
        console.log("<<<<<???", user);
        let userdata = await user.save();
        if (userdata) return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  login: async (req, res) => {
    try {
      const remainingCount= req.rateLimit && await req.rateLimit();
      console.log(req.body);
      let data = JSON.parse(JSON.stringify(req.body));
      const user = await User.find({ email: data.email });
      if (user.length) {
        console.log(data.password, user);
        if (bcrypt.compareSync(data.password, user[0].password))
          return res.json({
            success: true,
            token: jwtService.createToken(user[0]),
            _id: user[0]._id,
            username:user[0].username
          });
        else throw new Error("Authenticated user not found!");
      } else {
        throw new Error("Authenticated user not found!");
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  tweetSave: async (req, res) => {
    try {
      let data = JSON.parse(JSON.stringify(req.body));
      data=new tweetModel(data);
      console.log(data);
     let tweetDoc= await data.save();
     console.log(tweetDoc)
      return res.json({
        success: true
      });
    } catch (error) {
      console.log("error", error);
    }
  },
  alltweets: async (req, res) => {
    try {
   const tweetDoc=await tweetModel.find({"username":req.params.username});
     console.log(tweetDoc);
      return res.json({
        success: true,
        tweets:tweetDoc
      });
    } catch (error) {
      console.log("error", error);
    }
  },
  searchtweets: async (req, res) => {
    try {
   const tweetDoc=await tweetModel.find({"username":req.params.username});
     console.log(tweetDoc);
      return res.json({
        success: true,
        tweets:tweetDoc
      });
    } catch (error) {
      console.log("error", error);
    }
  },
  searchHashtag: async (req, res) => {
    try {
   const tweetDoc=await tweetModel.find({"hashTags":{$eq:"#"+req.params.hashtag}});
     console.log(tweetDoc);
      return res.json({
        success: true,
        tweets:tweetDoc
      });
    } catch (error) {
      console.log("error", error);
    }
  }
};
