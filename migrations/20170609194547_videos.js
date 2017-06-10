
exports.up = function(knex, Promise) {
  return knex.schema.createTable('videos', (table) => {
    table.increments('id').primary();
    table.string('video_url', 1000).notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('videos');
};
