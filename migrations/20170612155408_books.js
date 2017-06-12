
exports.up = function (knex) {
  return knex.schema.createTable('books', (table) => {
    table.increments();
    table.string('Book Title').notNullable().defaultTo('');
    table.string('Book Genre').notNullable().defaultTo('');
    table.string('Book Description').notNullable().defaultTo('');
    table.string('Book Cover URL').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('books');
};
