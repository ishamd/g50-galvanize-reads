const authorList = require('../authors');

exports.seed = function (knex) {
  return knex('authors')
    .del()
    .then(() => knex('authors').insert(authorList));
};
