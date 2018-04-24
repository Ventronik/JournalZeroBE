const TABLE_NAME = 'paper_status'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, paper_id: 1, status_id: 1},
        {id: 2, paper_id: 3, status_id: 2},
        {id: 3, paper_id: 2, status_id: 3}
      ]);
    });
};
