'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.use((req, res, next) => {
  if (req.user) {
    return next();
  }
  res.sendStatus(401);
});
router.get('/notes', (req, res, next) => {
  let userId;
  if (Number(req.headers.userid) === 0) {
    userId = req.headers.userid;
  } else {
    userId = req.user.id;
  }
  knex('notes')
    .select(
      'notes.id',
      'video_url',
      'img',
      'videos.title AS video_title',
      'description'
    )
    .where('user_id', userId)
    .innerJoin('videos', 'videos.id', 'notes.video_id')
  .then(notes => res.send(notes))
  .catch(error => console.error(error));
});

router.get('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  let userId;
  if (Number(req.headers.userid) === 0) {
    userId = req.headers.userid;
  } else {
    userId = req.user.id;
  }
  knex('notes')
    .select('*')
    .where('id', id)
    .where('user_id', userId)
    .then((note) => {
      if (!note.length) {
        return res.status(404)
          .set({ 'Content-Type': 'plain/text' })
          .send('Not Found');
      }
      res.send(note);
    })
    .catch(error => console.error(error));
});

router.post('/notes', (req, res, next) => {
  const body = req.body;
  const videoId = body.video_id;
  let userId;
  if (req.body.user_id === 0) {
    userId = req.body.user_id;
  } else {
    userId = req.user.id;
  }
  if (!body.note_file) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Note must not be empty');
  }

  knex('notes')
    .insert({
      note_file: body.note_file,
      user_id: userId,
      video_id: videoId
    })
    .returning('*')
    .then(newNote => res.send(newNote))
    .catch(error => console.error(error));
});

router.patch('/notes/:id', (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;
  const noteId = req.params.id;
  if (!Object.keys(body).length) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Nothing was changed');
  }
  knex('notes')
    .update(body)
    .where('user_id', userId)
    .where('id', noteId)
    .returning('*')
    .then(updatedNote => res.send(updatedNote))
    .catch(error => console.error(error));
});

router.delete('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  knex('notes')
    .del()
    .where('id', id)
    .where('user_id', userId)
    .returning('*')
    .then((deletedNote) => {
      if (!deletedNote) {
        return res.status(404)
          .set({ 'Content-Type': 'plain/text' })
          .send('Not Found');
      }
      res.send(deletedNote);
    })
    .catch(error => console.error(error));
});

module.exports = router;
