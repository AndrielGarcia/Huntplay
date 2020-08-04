
exports.up = function(knex) {
    return knex.schema.createTable('match_messages', function (table) {
        table.increments('id')
        table.string('cod_partida').notNullable()
        table.string('autor').notNullable()
        table.string('desc_message').notNullable()
        table.integer('status'). notNullable()
        table.timestamps(true, true)

        table.foreign('cod_partida').references('cod_partida').inTable('matches').onDelete('CASCADE')
        table.foreign('autor').references('id_user').inTable('users')

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('match_messages')
};
