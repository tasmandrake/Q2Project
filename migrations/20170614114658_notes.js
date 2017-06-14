
exports.up = (knex, Promise) => {
  return knex.schema.table('notes', (table) => {
    table.dropColumn('title');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('notes');
};
