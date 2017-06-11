const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../knex');

router.get('/videos', (req, res, next) => {
  knex('videos')
    .select('*')
    .then((videos) => res.send(videos))
    .catch((error) => console.error(error));
});

router.get('/videos/:id', (req, res, next) => {
  // do we want to join here or on notes to eliminate a route, or join both
  const id = req.params.id;

  knex('videos')
    .select('*')
    .where('id', id)
    .then((videos) => {
      if (!videos.length) {
        return res.status(404)
          .set({ 'Content-Type': 'plain/text' })
          .send('Not Found');
      }
      res.send(book[0]);
    });
});

router.post('/videos', (req, res, next)=>{
  const body = req.body;

  if (!req.body.video_url) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Video url must not be blank');
  }

  knex('videos')
    .insert(body)
    .then((newVideos) => {
      // res.send() or res.redirect
    })
    .catch((error) => console.error(error));
});

router.patch('/videos/:id', (req, res, next)=>{
  const body = req.body;

  knex('videos')
    .update(body)
    .then((updateVideo) => {
      // res.send() or res.redirect
    })
    .catch((error) => console.error(error));
});

router.delete('/videos/:id', (req, res, next)=>{
  const id = req.params.id;

  knex('notes')
    .del()
    .where('id', id)
    .then((deletedVideo) => {
      if (!deletedVideo) {
        return res.status(404)
          .set({ 'Content-Type': 'plain/text' })
          .send('Not Found');
      }
      res.redirect('../public/userpage.html');
    })
    .catch((error) => console.error(error));
});

module.exports = router;
