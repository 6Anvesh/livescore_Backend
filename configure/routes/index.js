let express = require("express");
const router = require("express").Router();
require("./../../models/user");

module.exports = function(app) {
  app.use(function (req, res,next) {
    res._json = res.json;
    res.json = function (data) {
      data['apiversion'] = "1.0.0.0.0.1";
        res._json(data);
    }
    next();
  })
  app.get("/", (req, res) => res.status(200).send({ success: true, meassage: "started successfully...." }));

  app.use("/api/v1", require("./v1"));

  app.use(function (req, res) {
  return res.status(404).send({success:false,error:"route not found"});
  })
  
};
