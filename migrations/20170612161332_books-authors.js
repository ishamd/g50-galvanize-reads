
exports.up = function (knex) {
  return knex.schema.createTable('books_authors', (table) => {
    table.integer('book_id').references('id').inTable('books').notNullable();
    table.integer('author_id').references('id').inTable('authors').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('books_authors');
};
