
exports.up = function (knex) {
  return knex.schema.createTable('authors', (table) => {
    table.increments('id');
    table.string('First Name').notNullable().defaultTo('');
    table.string('Last Name').notNullable().defaultTo('');
    table.text('Biography').notNullable().defaultTo('');
    table.text('Portrait URL').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('authors');
};
