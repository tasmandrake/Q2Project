'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const saltRounds = 10;
const secret = process.env.SECRET;

router.get('/users', (req, res, next) => {
  // do we need gets for users?
});

router.get('/users/:id', (req, res, next) => {
  // do we need gets for users?
});

router.post('/users', (req, res, next) => {
  const body = req.body;

  if (!body.first_name) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('First name must not be blank');
  } else if (!body.last_name) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Last Name must not be blank');
  } else if (!body.email) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Email must not be blank');
  } else if (!body.username) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Username must not be blank');
  } else if (!body.password) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Password must not be blank');
  }

  body.password = bcrypt.hashSync(body.password, saltRounds);

  knex('users')
    .insert({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      username: body.username,
      hashed_password: body.password
    })
    .returning([
      'id',
      'first_name',
      'last_name',
      'email',
      'username'
    ])
    .then((newUser) => {
      const token = jwt.sign(newUser[0], secret);

      res.cookie('token', token, { httpOnly: true }).send(newUser);
    })
    .catch((error) => {
      if (error) {
        return console.error(error);
      }
      res.status(400)
        .set({ 'Content-Type': 'plain/text' })
        .send('Email already exists');
    });
});

router.use((req, res, next) => {
  if (req.user) {
    return next();
  }
  res.sendStatus(401);
});

router.patch('/users', (req, res, next) => {
  const id = req.user.id;
  const body = req.body;
  if (!Object.keys(body).length) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Nothing was changed');
  }
  if (body.password) {
    body.hashed_password = bcrypt.hashSync(body.password, saltRounds);
    delete body.password;
  }
  knex('users')
    .where('id', id)
    .update(body)
    .returning([
      'id',
      'first_name',
      'last_name',
      'email',
      'username'
    ])
    .then((updateUser) => {
      // refresh
      res.send(updateUser);
    })
    .catch((error) => {
      if (error) {
        return console.error(error);
      }
      return res.status(404)
        .set({ 'Content-Type': 'plain/text' })
        .send('Not Found');
    });
});

router.delete('/users', (req, res, next) => {
  const id = req.user.id;
  knex('users')
    .del()
    .where('id', id)
    .returning([
      'id',
      'first_name',
      'last_name',
      'email',
      'username'
    ])
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404)
          .set({ 'Content-Type': 'plain/text' })
          .send('User not found');
      }
      // I think this is how redirect works but I haven't tried it yet, need basic framework to try it
      // res.redirect('../public/index.html');
      res.clearCookie('token').send(deletedUser);
    })
    .catch((error) => {
      if (error) {
        return console.error(error);
      }
      return res.status(404)
        .set({ 'Content-Type': 'plain/text' })
        .send('Not Found');
    });
});

module.exports = router;
