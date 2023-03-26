const express = require('express')
const router = express.Router()
const {goDashboard} = require('../controllers/usersControllers')
const {validarJwt} = require('../middleware/validarJwt')

router.use(validarJwt)

router.get('/', goDashboard)

module.exports = router