const express = require('express')
const router = express.Router()
const papersController = require('../controllers/papers')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.get('/', papersController.getAllPapers)
router.get('/published', papersController.getAllPublished)



module.exports = router
