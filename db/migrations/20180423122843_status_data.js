const TABLE_NAME = 'status'

exports.up = function(knex, Promise) {
  return knex(TABLE_NAME).insert([
    {id: 1, status: 'Pending'},
    {id: 2, status: 'Reviewing'},
    {id: 3, status: 'Published'},
  ])
};

exports.down = function(knex, Promise) {
  return knex(TABLE_NAME).del()
};
