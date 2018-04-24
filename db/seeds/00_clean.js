exports.seed = function(knex, Promise) {

  const tablesToClean = ['paper_status', 'comments', 'papers', 'users']

  return tablesToClean.reduce((acc, ele) => acc.then(() => knex(ele).del()), Promise.resolve())

};
