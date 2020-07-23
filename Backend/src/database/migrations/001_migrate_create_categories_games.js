exports.up = function(knex) {
    return knex.schema.createTable('categories_games', function (table) {
        table.increments()
        table.string('desc_category', 30).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('categories_games')
};