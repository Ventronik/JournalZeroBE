const TABLE_NAME = 'comments'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, comment: 'Well... duh.', paper_id:1, user_id: 3 },
        {id: 2, comment: 'Your methods failed to consider the possibility of mole men.', paper_id:1, user_id: 1},
        {id: 3, comment: 'Your font is hideous, no wonder your hypothesis was rejected.', paper_id:3, user_id: 2}
      ]);
    });
};
