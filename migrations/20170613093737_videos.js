exports.up = function(knex, Promise) {
  return knex.schema.table('videos', (table)=>{
    table.string('img').notNullable().defaultTo('img/youtube_default');
    table.string('title').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('videos', function (table) {
    table.dropColumn('img');
    table.dropColumn('title');
    table.dropColumn('description');
  });
};
