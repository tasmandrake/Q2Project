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
      res.send(videos);
    });
});

// can post duplicate videos, how do you knwo which to delete
// delete videos only when deleting notes that are tied to them?
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

router.patch('/videos/:id', (req, res, next) => {
  const body = req.body;
  const id = req.params.id;

  if (!Object.keys(body).length) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Nothing was changed');
  }

  knex('videos')
    .update(body)
    .returning('*')
    .where('id', id)
    .then((updateVideo) => {
      // res.send() or res.redirect
      res.send(updateVideo);
    })
    .catch(error => console.error(error));
});


// need to change how delet works so that it doesn't delete videos that other people are using
// unlink video from the user?
router.delete('/videos/:id', (req, res, next) => {
  const id = req.params.id;

  knex('notes')
    .del()
    .where('id', id)
    .returning('*')
    .then((deletedVideo) => {
      if (!deletedVideo) {
        return res.status(404)
          .set({ 'Content-Type': 'plain/text' })
          .send('Not Found');
      }
      res.send(deletedVideo);
      // res.redirect('../public/userpage.html');
    })
    .catch(error => console.error(error));
});

module.exports = router;
