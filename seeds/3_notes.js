'use strict';

exports.seed = function(knex, Promise) {
  return knex('notes').del()
    .then(() => {
      return knex('notes').insert([
        {
          id: 1,
          title: 'rowValue1',
          note_file: '<ul class="default"><li data-time="1:12">Talking about the routes we need to build during the assesment</li><li data-time="2:20">Looking at the test for the assesment</li><li data-time="2:55">Useing the knex document to look up joins</li><li data-time="5:00">This is an invalid time, what happens if a time gets inserted wrong</li></ul>',
          created_at: new Date('2017-06-10 20:30:11 UTC'),
          updated_at: new Date('2017-06-10 20:30:11 UTC'),
          user_id: 1,
          video_id: 1
        },
        {
          id: 2,
          title: 'rowValue1',
          note_file: '<ul class="default"><li data-time="1:04">Seed increment code</li><li data-time="1:25">How to make seeds</li><li data-time="3:30">Completed seed file</li><li data-time="4:11">Seeding the database and using psql to see if the table was seeded</li><li data-time="9:16">Simplified seed file that includes how incrementing function for id when seeding</li></ul>',
          created_at: new Date('2017-06-10 20:30:11 UTC'),
          updated_at: new Date('2017-06-10 20:30:11 UTC'),
          user_id: 1,
          video_id: 2
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('notes_id_seq', (SELECT MAX(id) FROM notes))");
    });
};
