
exports.up = function(knex) {
    return knex.schema.createTable('games', function (table) {
      table.increments()
      table.string('nome').notNullable()
      table.integer('categoria').notNullable()

      table.foreign('categoria').references('id').inTable('categories_games')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('games')
};
