const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../knex');

router.use((req, res, next) => {
  if (req.user) {
    return next();
  }
  res.sendStatus(401).redirect('../public/index.html');
});

router.get('/notes', (req, res, next) => {
  knex('notes')
    .select(
      'id',
      'title',
      'note_file',
      'user_id',
      'video_id'
    )
    .then((notes) => res.send(notes))
    .catch((error) => console.error(error));
});

router.get('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  knex('notes')

  // do we want to join with videos to get all info needed? for note taking page?

  .select(
    'id',
    'title',
    'note_file',
    'user_id',
    'video_id'
  )
  .where('id', id)
  .then((note) => {
    if (!note.length) {
      return res.status(404)
        .set({ 'Content-Type': 'plain/text' })
        .send('Not Found');
    }
    res.send(note[0]);
  }).catch((error) => console.error(error));
});

router.post('/notes', (req, res, next) => {
  const body = req.body;

  if (!body.title) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Note title must not be blank');
  } else if (!body.note_file) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Note must not be empty');
  } else if (!body.user_id) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('User ID must not be blank');
  } else if (!body.video_id) {
    return res.status(400)
      .set({ 'Content-Type': 'plain/text' })
      .send('Video ID must not be blank');
  }

  knex('notes')
    .insert(body)
    .then((newNote) => {
      // res.sendStatus(200) or res.redirect()
    })
    .catch((error) => console.error(error));
});

router.patch('/notes/:id', (req, res, next) => {
  const body = req.body;

  knex('notes')
    .update(body)
    .then((updatedNote) => {
      // res.sendStatus(200) or res.redirect()
    })
    .catch((error) => console.error(error));
});

router.delete('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  knex('notes')
    .del()
    .where('id', id)
    .then((deletedNote) => {
      if (!deletedNote) {
        return res.status(404)
          .set({ 'Content-Type': 'plain/text' })
          .send('Not Found');
      }
      res.redirect('../public/index.html');
    }).catch((error) => console.error(error));
});

module.exports = router;
