
exports.up = function(knex) {
    return knex.schema.createTable('matches', function (table) {
        table.string('cod_partida').primary()
        table.string('moderador',).notNullable()
        table.string('nome_partida',30).notNullable()
        table.date('data').notNullable()
        table.integer('modalidade').notNullable()
        table.integer('modo').notNullable()

        table.foreign('moderador').references('id_user').inTable('users')
        table.foreign('modalidade').references('id').inTable('games')
        table.foreign('modo').references('id').inTable('mods_games')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('matches')
};
