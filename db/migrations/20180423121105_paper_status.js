const TABLE_NAME = 'paper_status'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.integer('paper_id').notNullable().references('papers.id')
    table.integer('status_id').notNullable().references('status.id')
    table.timestamps(true, true)
  });
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists(TABLE_NAME)
};
