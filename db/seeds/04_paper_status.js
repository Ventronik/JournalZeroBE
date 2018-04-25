const TABLE_NAME = 'paper_status'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, paper_id: 1, status_id: 1},
        {id: 2, paper_id: 3, status_id: 2},
        {id: 3, paper_id: 2, status_id: 3},
        {id: 4, paper_id: 4, status_id: 2},
        {id: 5, paper_id: 5, status_id: 3},
        {id: 6, paper_id: 6, status_id: 3},
        {id: 7, paper_id: 7, status_id: 3},
        {id: 8, paper_id: 8, status_id: 3},
        {id: 9, paper_id: 9, status_id: 3},
        {id: 10, paper_id: 10, status_id: 3},
        {id: 11, paper_id: 11, status_id: 3},
        {id: 12, paper_id: 12, status_id: 3},
        {id: 13, paper_id: 13, status_id: 3},
        {id: 14, paper_id: 14, status_id: 3},
        {id: 15, paper_id: 15, status_id: 3},
        {id: 16, paper_id: 16, status_id: 3},
        {id: 17, paper_id: 17, status_id: 3}
      ]);
    });
};
