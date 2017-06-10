
exports.up = function(knex, Promise) {
  return knex.schema.table('notes', (table) => {
     table.integer('user_id').index().references('users.id').onDelete('CASCADE').notNullable();
     table.integer('video_id').index().references('videos.id').onDelete('CASCADE').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('notes', function (table) {
    table.dropColumn('user_id');
    table.dropColumn('video_id');
  });
};
