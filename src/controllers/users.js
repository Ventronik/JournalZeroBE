const userModel = require('../models/users')
const authController = require('./auth.js')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function create(req, res, next){

  if(!req.body.username){
    return next({ status: 400, message: 'Bad username'})
  }

  if(!req.body.password){
    return next({ status: 400, message: 'Bad password'})
  }

  userModel.create(req.body.username, req.body.password)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

function getAllUserPapers(req, res, next) {

  userModel.getAllUserPapers(req.params.id)
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}

function postPapers (req, res, next){
  userModel.postPapers(req.body, req.params.id)
    .then(function(data){
      console.log('hi dustin', data)
    return res.status(201).send({ data })
  })
  .catch(next)
}

function paperStatusChange(req,res, next){
  userModel.paperStatusChange(req.body.status_id, req.params.paper_id)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

function paperDelete(req, res, next) {
  userModel.paperDelete(req.params.paper_id, req.params.id)
  .then (function(data){
    return res.status(204).send({ data })
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Quality of Life functions
//////////////////////////////////////////////////////////////////////////////

module.exports = {
  create,
  getAllUserPapers,
  postPapers,
  paperStatusChange,
  paperDelete
}
