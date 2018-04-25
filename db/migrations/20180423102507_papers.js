const TABLE_NAME = 'papers'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.string('title').notNullable()
    table.text('abstract').notNullable()
    table.string('authors').notNullable()
    table.string('url').notNullable()
    table.integer('user_id').notNullable().references('users.id')
    table.string('field').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists(TABLE_NAME)
};
