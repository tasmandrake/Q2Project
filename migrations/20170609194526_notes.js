
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable().defaultTo('');
    table.string('note_file', 40000).notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
