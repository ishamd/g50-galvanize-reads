

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

router.get('/book', (_req, res, next) => {
  knex('authors')
  .then((authors) => {
    res.render('books_add', {
      authors,
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

// GET request to populate book edit page using book id/info
router.get('/books/:id/edit', (_req, res, next) => {
  const id = Number.parseInt(_req.params.id);

  getBookWithAuthors(id)

  .then((books) => {
    res.render('books_edit', {
      books,
    });
  })

  .catch((err) => {
    next(err);
  });
});

router.patch('/books/:id/edit', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .then((book) => {
      if (!book) {
        return next();
      }
      return knex('books')
        .update({
          'Book Title': req.body.title,
          'Book Genre': req.body.genre,
          'Book Description': req.body.description,
          'Book Cover URL': req.body.cover_url }, '*')
        .where('id', req.params.id);
    })
    .then((books) => {
      res.render('books_edit', {
        books,
      });
    })
    .catch((err) => {
      next(err);
    });
});
// let authorId;
// const insertIdsToJoinTable = id => knex('books_authors')
//     .insert({
//       book_id: id,
//       author_id: authorId }, '*');


router.post('/book', (req, res, next) => {
  const book = req.body;
  const authorId = book.author;
  // console.log(authorId);
  knex('books')
  .insert({
    'Book Title': book.title,
    'Book Genre': book.genre,
    'Book Description': book.description,
    'Book Cover URL': book.cover_url }, '*')
    .returning('id')
    .then(id => knex('books_authors')
        .insert({
          book_id: parseInt(id),
          author_id: authorId }, '*'))
    .then(() => {
      res.redirect('/books');
    })
  .catch((err) => {
    next(err);
  });
});


module.exports = router;
