'use strict';

exports.seed = function(knex, Promise) {
  return knex('videos').del()
    .then(() => {
      return knex('videos').insert([
        {id: 1, video_url: 'Ct96Y751-_E'},
        {id: 2, video_url: 'https://www.youtube.com/watch?v=48KJ5HUY6NE'}
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('videos_id_seq', (SELECT MAX(id) FROM videos))");
    });
};
