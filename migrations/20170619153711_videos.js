'use strict';

exports.up = (knex, Promise) => {
  return knex.schema.createTable('videos', (table) => {
    table.increments('id').primary();
    table.string('video_url', 1000).notNullable().defaultTo('');
    table.string('img').notNullable().defaultTo('img/youtube_default');
    table.string('title').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('videos');
};
