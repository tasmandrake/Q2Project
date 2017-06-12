'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.use((req, res, next) => {
  if (req.user) {
    return next();
  }
  res.sendStatus(401);
  // res.redirect('../public/index.html');
});

router.get('/videos', (req, res, next) => {
  knex('videos')
    .select('*')
    .then(videos => res.send(videos))
    .catch(error => console.error(error));
});

router.get('/videos/:id', (req, res, next) => {
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
      res.send(videos);
    });
});

router.post('/videos', (req, res, next) => {
  const body = req.body;

  if (!req.body.video_url) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Video URL must not be blank');
  }

  knex('videos')
    .insert(body)
    .returning('*')
    .then((newVideos) => {
      // res.send() or res.redirect
      res.send(newVideos);
    })
    .catch(error => console.error(error));
});

module.exports = router;
