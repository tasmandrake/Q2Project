'use strict';

exports.up = (knex, Promise) => {
  return knex.schema.createTable('notes', (table) => {
    table.increments('id').primary();
    table.string('note_file', 40000).notNullable().defaultTo('');
    table.timestamps(true, true);
    table.integer('user_id').index().references('users.id').onDelete('CASCADE').notNullable();
    table.integer('video_id').index().references('videos.id').onDelete('CASCADE').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('notes');
};
