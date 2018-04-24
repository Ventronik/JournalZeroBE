const TABLE_NAME = 'papers'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, title:'Is bat-boy real?', abstract: 'Lorem Ipsum', url: '', user_id: 1},
        {id: 2, title:'Can we launch astronauts from a cannon?', abstract: 'Lorem Ipsum', url: '', user_id: 2},
        {id: 3, title:'Excess arboreal propulsion delivered via small woodland creatures', abstract: 'Lorem Ipsum', url: '', user_id: 3},
        {id: 4, title:'Inquiries within the Nantucket, MA male population and defying the mean', abstract: 'Lorem Ipsum', url: '', user_id: 1}
      ]);
    });
};
