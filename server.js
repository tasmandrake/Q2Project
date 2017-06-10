'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 8000;

const notes = require('./routes/notes');
const users = require('./routes/users');
const videos = require('./routes/videos');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use(notes);
app.use(users);
app.use(videos);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});



module.exports = app;
