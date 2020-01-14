const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const fs=require('fs');
const path=require("path")
const app = express();
app.use(bodyparser());
app.use(cors());

//require models to use as model
fs.readdirSync(path.join(__dirname,"./models")).filter(fileName=>/.*\.js$/.test(fileName)).map((fileName)=>require(path.join(__dirname,"./models/",fileName)));
// require("./models/user");
// require("./models/tweet");
require('./configure/db')
require('./configure/redis')
require('./configure/routes')(app)

module.exports = app;