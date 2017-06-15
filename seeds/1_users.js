'use strict';

exports.seed = (knex, Promise) => {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Note',
          last_name: 'Taker',
          email: 'notes@gmail.com',
          username: 'notes',
          hashed_password: '$2a$10$AbHO8Jnj.Bm3LAZygMWKmeVaQZR2ZuI9gNGXXXR40S0pisqatCQVK', // 'livenotes'
          created_at: new Date('2017-06-10 20:30:11 UTC'),
          updated_at: new Date('2017-06-10 20:30:11 UTC')
        },
        {
          id: 2,
          first_name: 'Unauthorized',
          last_name: 'User',
          email: 'spy@gmail.com',
          username: 'hacker',
          hashed_password: '$2a$10$Ckn0aiWY3kItq0H5WmeY1u1uUhNrUR9ygYACGdNtQnjawI7JH0a7u', // 'securitytest'
          created_at: new Date('2017-06-10 20:30:11 UTC'),
          updated_at: new Date('2017-06-10 20:30:11 UTC')
        },
        {
          id: 0,
          first_name: 'Share',
          last_name: 'Notes',
          email: 'share',
          username: 'share',
          hashed_password: '$2a$10$AbHO8Jnj.Bm3LAZygMWKmeVaQZR2ZuI9gNGXXXR40S0pisqatCQV4',
          created_at: new Date('2017-06-10 20:30:11 UTC'),
          updated_at: new Date('2017-06-10 20:30:11 UTC')
        },
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
