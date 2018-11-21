let express = require('express');
const router = require('express').Router();
require('../models/user')
module.exports = function(app){
    app.get('/',(req,res)=>{
        res.json({success:true,meassage: "mainpage"})
    })
 
    app.use('/api',require('../configure/auth'))
}