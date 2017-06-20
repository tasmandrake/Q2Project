'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const secret = process.env.SECRET;

router.get('/token', (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        res.clearCookie('token').send(false);
      } else {
        res.send(true);
      }
    });
  } else {
    res.send(false);
  }
});

router.post('/token', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Email must not be blank');
  } else if (!password) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Password must not be blank');
  }

  knex('users')
    .where('email', email)
    .then((user) => {
      const hashPassword = user[0].hashed_password;

      if (bcrypt.compareSync(password, hashPassword)) {
        const userInfo = {
          id: user[0].id,
          firstName: user[0].first_name,
          lastName: user[0].last_name,
          email: user[0].email,
          username: user[0].username
        };
        const token = jwt.sign(userInfo, secret);

        res.cookie('token', token, { httpOnly: true }).send(userInfo);
      } else {
        console.log('why');
        res.status(400)
            .set({ 'Content-Type': 'plain/text' })
            .send('Bad email or password');
      }
    }).catch((err) => {
      res.status(400)
          .set({ 'Content-Type': 'plain/text' })
          .send('Bad email or password');
          console.log(err);
    });
});

router.delete('/token', (req, res, next) => {
  res.clearCookie('token').send();
});

module.exports = router;
