const paperModel = require('../models/papers')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAllPapers(req, res, next){

  paperModel.getAllPapers()
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}

function getAllPublished(req, res, next){

  paperModel.getAllPublished()
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Quality of Life functions
//////////////////////////////////////////////////////////////////////////////

module.exports = {
  getAllPapers,
  getAllPublished
}
