const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const authController = require('../controllers/auth')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.post('/', userController.create)

router.get('/:id/papers', authController.isAuthenticated, userController.getAllUserPapers)

router.post('/:id/papers', authController.isAuthenticated, userController.postPapers)

router.post('/:id/papers/:paper_id', userController.paperStatusChange)

router.delete('/:id/papers/:paper_id', userController.paperDelete)




module.exports = router
