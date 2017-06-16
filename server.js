
const methodOverride = require('method-override');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const index = require('./routes/index');
const books = require('./routes/books');
const authors = require('./routes/authors');


const port = process.env.PORT || 8000;

const app = express();

app.disable('x-powered-by');

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join('public')));

app.use(index);
app.use(books);
app.use(authors);
// app.get('/', (_req, res, next) => res.render('index'));
//
// app.post('/test', (req, res) => {
//   console.log(req.body);
//   res.send('test!');
// });
// app.use(methodOverride('X-HTTP-Method-Override'));


app.use((_req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    console.log('Listening on port', port);
  }
});

module.exports = app;
