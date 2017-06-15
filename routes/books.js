

const express = require('express');
const ejs = require('ejs');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');

const app = express();

app.set('view engine', 'ejs');

// functions to be used in GET requests
function getBook(id) {
  return knex('books')
    .where('books.id', id);
}

function getAuthorsForBook(bookId) {
  return knex('authors')
    .join('books_authors', 'authors.id', 'books_authors.author_id')
    .where('books_authors.book_id', bookId);
}

function getBookWithAuthors(bookId) {
  return Promise.all([
    getBook(bookId),
    getAuthorsForBook(bookId),
  ]).then((results) => {
    const [book, authors] = results;
    book.authors = authors;
    return book;
  });
}

// GET request for all books from our database
router.get('/books', (_req, res, next) => {
  knex('books')
  .then((books) => {
    res.render('books', {
      books,
    });
  })
  .catch((err) => {
    next(err);
  });
});

// GET request for individual book with author info
router.get('/books/:id', (_req, res, next) => {
  const id = Number.parseInt(_req.params.id);

  getBookWithAuthors(id)

  .then((books) => {
    res.render('books_profile', {
      books,
    });
  })

  .catch((err) => {
    next(err);
  });
});

module.exports = router;
