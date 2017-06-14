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

router.get('/videos/url', (req, res, next)=>{
  let q = req.query.vidurl;
  let tok = req.user.id;

  knex('videos').select('videos.id AS vidId', 'note_file', 'notes.id AS notesId').where('video_url', q).innerJoin('notes', 'videos.id', 'notes.video_id').where('notes.user_id', tok).then((result)=>{
    if(result.length){
      return res.send(result)
    }
    else{
      knex('videos').select('id AS vidId').where('video_url', q).then(data => res.send(data))
    }
  }).catch(error => console.error(error))
})

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
  if (!body.video_url) {
    return res.status(400)
    .set({ 'Content-Type': 'plain/text' })
    .send('Video URL must not be blank');
  }

  var isThere;
  knex('videos').select('video_url','id AS vidId').where('video_url', req.body.video_url).then((data) =>{
    console.log(data)
    isThere = data.length
    if(isThere){
      return res.status(200).send(''+data[0].id);
    }
    else{
      knex('videos')
        .insert(body)
        .returning('*')
        .then((newVideos) => {
          // res.send() or res.redirect
          res.send(newVideos);
        })
        .catch(error => console.error(error));
    }
} ).catch(err => console.error(err));







});

module.exports = router;
