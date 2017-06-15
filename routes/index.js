

const express = require('express');
const ejs = require('ejs');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');

const app = express();

app.set('view engine', 'ejs');

// GET request for all books from our database
router.get('/', (_req, res, next) => res.render('index'));

module.exports = router;
