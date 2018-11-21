const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtService = require("../configure/auth");
let User = require("../models/user");
module.exports = {
  signup: async (req, res) => {
    console.log("Signup", req.body);
    try {
      let data = JSON.parse(JSON.stringify(req.body));
      let useremail = await User.find({ email: data.email }).count();
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
      console.log(req.body);
      let data = JSON.parse(JSON.stringify(req.body));
      const user = await User.find({ email: data.email });
      if (user.length) {
        console.log(data.password, user);
        if (bcrypt.compareSync(data.password, user[0].password))
          return res.json({
            success: "success",
            token: jwtService.createToken(user[0]),
            _id: user[0]._id
          });
        else throw new Error("Authenticated user not found!");
      } else {
        throw new Error("Authenticated user not found!");
      }
    } catch (error) {
      console.log("error", error);
    }
  }
};
