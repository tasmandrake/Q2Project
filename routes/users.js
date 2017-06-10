'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const saltRounds = 10;


router.get('/users', (req, res, next)=>{

});

router.get('/users/:id', (req, res, next)=>{

});

router.post('/users', (req, res, next)=>{
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

  
});

router.patch('/users/:id', (req, res, next)=>{

});

router.delete('/users/:id', (req, res, next)=>{

});
