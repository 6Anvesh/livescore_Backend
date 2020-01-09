const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyparser());
app.use(cors());
module.exports = app;
require('./configure/db')
require('./configure/redis')
require('./configure/routes')(app)