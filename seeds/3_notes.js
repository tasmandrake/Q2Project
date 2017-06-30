'use strict';

exports.seed = (knex, Promise) => {
  return knex('notes').del()
    .then(() => {
      return knex('notes').insert([
        {
          id: 1,
          note_file: '<ul class="default"><li data-time="72" class="time">Talking about the routes we need to build during the assesment</li><li data-time="140" class="time">Looking at the test for the assesment</li><li data-time="175" class="time">Useing the knex document to look up joins</li><li data-time="300" class="time">This is an invalid time, what happens if a time gets inserted wrong</li></ul>',
          created_at: new Date('2017-06-10 20:30:11 UTC'),
          updated_at: new Date('2017-06-10 20:30:11 UTC'),
          user_id: 1,
          video_id: 1
        },
        {
          id: 2,
          note_file: '<ul class="default"><li data-time="64" class="time">Seed increment code</li><li data-time="85" class="time">How to make seeds</li><li data-time="210" class="time">Completed seed file</li><li data-time="251" class="time">Seeding the database and using psql to see if the table was seeded</li><li data-time="556" class="time">Simplified seed file that includes how incrementing function for id when seeding</li></ul>',
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
