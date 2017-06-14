

const express = require('express');
const ejs = require('ejs');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');

const app = express();

app.set('view engine', 'ejs');

// requests all books from our database
router.get('/books', (_req, res, next) => {
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
    }).then((books) => {
      res.render('books', {
        books,
      });
    });
  }

  return getBookWithAuthors(1)

  // knex.from('books')
  // .innerJoin('books_authors', 'books.id', 'books_authors.book_id')
  // .innerJoin('authors', 'books_authors.author_id', 'authors.id')
  // .then((books) => {
  //   console.log(books);
  //   res.render('books', {
  //     books,
  //   });
  // })

  // knex('books')
  // .then((books) => {
  //   res.render('books', {
  //     books,
  //   });
  // })
  .catch((err) => {
    next(err);
  });
});


module.exports = router;
