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
    .insert(body)
    .returning([
      'id',
      'first_name',
      'last_name',
      'email',
      'username'
    ])
    .then((newUser) => {
      const token = jwt.sign(newUser[0], secret);

      res.cookie('token', token, { httpOnly: true });
      // I think this is how redirect works but I haven't tried it yet, need basic framework to try it
      res.redirect('../public/userpage.html');
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

router.patch('/users/:id', (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  knex('users')
    .where('id', id)
    .update(body)
    .then(() => {
      // not sure what to put here
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

router.delete('/users/:id', (req, res, next) => {
  const id = req.params.id;
  knex('users')
    .del()
    .where('id', id)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404)
          .set({ 'Content-Type': 'plain/text' })
          .send('User not found');
      }
      // I think this is how redirect works but I haven't tried it yet, need basic framework to try it
      res.redirect('../public/index.html');
    })
    .catch((error) => {
      return res.send(error);
    });
});

module.exports = router;
