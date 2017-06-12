
exports.up = function (knex) {
  return knex.schema.createTable('books-authors', (table) => {
    table.increments();
    table.integer('book_id')
      .notNullable()
      .references('id')
      .inTable('books');
    table.integer('author_id')
      .notNullable()
      .references('id')
      .inTable('authors');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('books-authors');
};
