

const express = require('express');
const ejs = require('ejs');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');

const app = express();

app.set('view engine', 'ejs');

// GET request for all books from our database
router.get('/', (_req, res, next) => res.render('index'));

router.post('/test', (req, res) => {
  console.log(req.body);
  res.send('test!');
});

module.exports = router;
