exports.up = function(knex) {
    return knex.schema.createTable('mods_games', function (table) {
        table.increments()
        table.string('desc_mod', 30).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('mods_games')
};
