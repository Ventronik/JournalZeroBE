const db = require('../../db')
const bcrypt = require('bcrypt-as-promised')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getOneByUserName(user_name){
  return (
    db('users')
    .where({ user_name })
    .first()
  )
}

//////////////////////////////////////////////////////////////////////////////
// Create a user
//
// 1. Check to see if user already exists
//   a. if so, return a 400 with appropriate error message
// 2. Hash password
// 3. Insert record into database
// 4. strip hashed password away from object
// 5. "return/continue" promise
//////////////////////////////////////////////////////////////////////////////

function create(username, password){

  // check to see of user already exists
  return getOneByUserName(username)
  .then(function(data){
    // if user already exists, return 400
    if(data) throw { status: 400, message:'User already exists'}

    // hash password
    return bcrypt.hash(password, 10)
  })
  .then(function(hashedPassword){

    // 3. Insert record into database
    return (
      db('users')
      .insert({ user_name: username, password: hashedPassword })
      .returning('*')
    )
  })
  .then(function([ data ]){
    // 4. strip hashed password away from object
    delete data.password
    // 5. "return/continue" promise
    return data
  })
}

function getAllUserPapers(id) {
  return db('papers')
    .select('papers.title', 'papers.abstract', 'papers.field', 'papers.url', 'papers.authors', 'paper_status.updated_at')
    .join('users', 'users.id', 'papers.user_id')
    .join('paper_status', 'paper_status.paper_id', 'papers.id')
    .where('users.id', id)
}

function postPapers(data, id) {
  const abstract = data.abstract
  const authors = data.authors
  const field = data.field
  const url = data.url
  const user_id = id
  const title = data.title

  return (
    db('papers')
      .insert({ abstract, authors, field, url, title, user_id })
    .returning('*')
    .then(function([ data ]){
      return db('paper_status')
                .insert( {paper_id: data.id, status_id:1 }) //all papers are created with the status pending(1)
      .returning('*')
    }

    )
  )
}

function paperStatusChange(status_id, paper_id) {
  return (
  db('paper_status')
    .insert({status_id, paper_id})
  .returning('*')
  )
}

module.exports = {
  getOneByUserName,
  create,
  getAllUserPapers,
  postPapers,
  paperStatusChange
}
