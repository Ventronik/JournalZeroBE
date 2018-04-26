
const db = require('../../db')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAllPapers() {
  return db('papers')
}

function getAllPublished() {
  return db('papers')
    .join('paper_status', 'paper_status.paper_id', 'papers.id')
    .join('status', 'status.id', 'paper_status.status_id')
    .where('status.status', 'Published')
}

module.exports = {
  getAllPapers,
  getAllPublished
}
