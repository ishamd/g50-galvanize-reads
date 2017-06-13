

const express = require('express');
const ejs = require('ejs');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');

const app = express();

app.set('view engine', 'ejs');

// requests all books from our database
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


module.exports = router;
