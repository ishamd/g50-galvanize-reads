const bookList = require('../books');

exports.seed = function (knex) {
  return knex('books')
    .del()
    .then(() => knex('books').insert(bookList));
};
