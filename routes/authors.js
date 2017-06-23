

const express = require('express');
const ejs = require('ejs');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');

const app = express();

app.set('view engine', 'ejs');

// functions to be used in GET requests
function getAuthor(id) {
  return knex('authors')
    .where('authors.id', id);
}

function getBooksForAuthor(authorId) {
  return knex('books')
    .join('books_authors', 'books.id', 'books_authors.book_id')
    .where('books_authors.author_id', authorId);
}

function getAuthorWithBooks(authorId) {
  return Promise.all([
    getAuthor(authorId),
    getBooksForAuthor(authorId)
  ]).then((results) => {
    const [author, books] = results;
    author.books = books;
    return author;
  });
}

// GET request for all books from our database
router.get('/authors', (_req, res, next) => {
  knex('authors')
  .then((authors) => {
    res.render('authors', {
      authors
    });
  })
  .catch((err) => {
    next(err);
  });
});

// GET request for individual book with author info
router.get('/authors/:id', (_req, res, next) => {
  const id = Number.parseInt(_req.params.id);

  getAuthorWithBooks(id)

  .then((authors) => {
    res.render('authors_profile', {
      authors
    });
  })

  .catch((err) => {
    next(err);
  });
});

// GET request to render the books_add page with list of authors
router.get('/author', (_req, res, next) => {
  res.render('authors_add');
});

// POST request to add new author to db
router.post('/author', (req, res, next) => {
  const author = req.body;
  // const authorId = book.author;

  knex('authors')
  .insert({
    'First Name': author.first_name,
    'Last Name': author.last_name,
    Biography: author.biography,
    'Portrait URL': author.portrait_url }, '*')
    // .returning('id')
    // .then(id => knex('books_authors')
    //     .insert({
    //       book_id: parseInt(id),
    //       author_id: authorId }, '*'))
    .then(() => {
      res.redirect('/authors');
    })
  .catch((err) => {
    next(err);
  });
});

// GET request to populate book edit page using book id/info
router.get('/authors/:id/edit', (_req, res, next) => {
  const id = Number.parseInt(_req.params.id);

  getAuthorWithBooks(id)

  .then((authors) => {
    res.render('authors_edit', {
      authors
    });
  })

  .catch((err) => {
    next(err);
  });
});

// PATCH request to update book information
router.patch('/authors/:id/edit', (req, res, next) => {
  knex('authors')
    .where('id', req.params.id)
    .then((author) => {
      if (!author) {
        return next();
      }
      return knex('authors')
        .update({
          id: req.params.id,
          'First Name': req.body.first,
          'Last Name': req.body.last,
          Biography: req.body.biography,
          'Portrait URL': req.body.url }, '*')
        .where('id', req.params.id);
    })
    .then((authors) => {
      res.render('authors_edit', {
        authors
      });
    })
    .catch((err) => {
      next(err);
    });
});

// DELETE request to remove a book and its reference in join table
router.delete('/authors/:id', (req, res, next) => {
  const authorID = req.params.id;

  knex('books_authors')
  .del()
  .where('author_id', authorID)

    .then(() => knex('authors')
    .where('id', authorID)
    .first()

      .then((row) => {
        if (!row) {
          return next();
        }
        return knex('authors')
          .del()
          .where('id', authorID);
      })
    )
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
