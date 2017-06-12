const booksAuthorsList = require('../books-authors-join');

exports.seed = function (knex) {
  return knex('books_authors')
    .del()
    .then(() => knex('books_authors').insert(booksAuthorsList));
};
