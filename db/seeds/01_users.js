const TABLE_NAME = 'users'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, userName: 'student', password:'$2a$10$62UkBoiMb6xiITByxXSePeUR/wj/EpUxS05u2d1nSMocAFgSf/foC'},
        {id: 2, userName: 'student', password:'$2a$10$zlAKx5qAqcy9T0S1RJTYmeJESp7AztBdD7wdW53Ptxoiaoz.bNnfG'},
        {id: 3, userName: 'student', password:'$2a$10$Hel6K9vtJMCSl5dQmaktVODi6NeulFojmhJjFVx4ebS8jxkeOw41m'}
      ]);
    });
};
