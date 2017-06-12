'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 8000;

const notes = require('./routes/notes');
const users = require('./routes/users');
const videos = require('./routes/videos');
const tokens = require('./routes/tokens');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use(tokens);

app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        res.clearCookie('token');
        return next(error);
      }
      req.user = decoded;
      next();
    });
  } else {
    next();
  }
});

app.use(users);
app.use(notes);
app.use(videos);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});

module.exports = app;
