const db = require('../../db')
const bcrypt = require('bcrypt')

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
  return (
    db('papers')
      .select(
        'papers.id',
        'papers.title',
        'papers.abstract',
        'papers.field',
        'papers.url',
        'papers.authors',
      )
      .join('users', 'users.id', 'papers.user_id')
      .where('users.id', id)
    .then((papers)=> {
      return Promise.all(papers.map((paper)=>{
        return db('paper_status')
          .join('status', 'status.id', 'paper_status.status_id')
          .orderBy('paper_status.updated_at', 'desc').first()
          .where('paper_status.paper_id', paper.id)
          .then(status => {
              paper.udpated_at = status.updated_at
              paper.status = status.status
              return paper
          })
      }))
    })
  )
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

function paperDelete(paper_id, id) {
  return(
    db('papers')
    .select('papers.user_id')
    .where('id', paper_id)
    .then(function(result){
      let [{ user_id }] = result
      console.log(user_id, parseInt(id))
      if(user_id !== parseInt(id)) {
        throw {status:403, message: 'Missing permission to access paper'}
      }
    })
    .then(function(){
    db('comments')
      .del()
      .where('paper_id', paper_id)
    .then(function(){
      return db('paper_status')
      .del()
      .where('paper_id', paper_id)
    })
    .then(function(){
      return db('papers')
      .del()
      .where('id', paper_id)
      .returning('*')
    })
  })
  )
}

module.exports = {
  getOneByUserName,
  create,
  getAllUserPapers,
  postPapers,
  paperStatusChange,
  paperDelete
}
