
exports.up = function (knex) {
  return knex.schema.createTable('authors', (table) => {
    table.increments();
    table.string('First Name').notNullable().defaultTo('');
    table.string('Last Name').notNullable().defaultTo('');
    table.string('Biography').notNullable().defaultTo('');
    table.string('Portait URL').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('authors');
};
