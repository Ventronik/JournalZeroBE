const TABLE_NAME = 'comments'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.integer('paper_id').notNullable().references('papers.id')
    table.integer('user_id').notNullable().references('users.id')
    table.string('comment').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists(TABLE_NAME)
};
