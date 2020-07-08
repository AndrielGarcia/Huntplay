
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
      table.string('id_user',25).primary()
      table.string('nome',50).notNullable()
      table.date('data_nascimento').notNullable()
      table.integer('nacionalidade').notNullable()
      table.string('email').notNullable()
      table.string('senha').notNullable()

      table.foreign('nacionalidade').references('id').inTable('countries')
  })

};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
