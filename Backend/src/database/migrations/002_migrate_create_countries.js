
exports.up = function(knex) {
    return knex.schema.createTable('countries', function (table) {
        table.increments()
        table.string('desc_country', 50).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('countries')
};
