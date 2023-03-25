const express = require('express')
const router = express.Router()

const {createUser, getUserByEmail, deleteUser, updateUser} = require('../controllers/apiUsersControllers')

router.get('/', getUserByEmail)
router.post('/', createUser)
router.delete('/:email',deleteUser)
router.put('/:email', updateUser)



module.exports=router