const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));


app.listen(port, ()=>{
  console.log('Listening on port ' + port);
});



module.exports = app;
