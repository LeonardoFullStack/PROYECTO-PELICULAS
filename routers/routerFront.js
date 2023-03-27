const express=require('express');
const router=express.Router();
const bodyParser = require('body-parser');
const {getIndex, getSearch, getSignup, addMovie} = require('../controllers/frontControllers')
const {checkLogin, logout,viewMovie } = require('../controllers/apiUsersControllers')
const {goDashboard} = require('../controllers/usersControllers')
const {validarJwt} = require('../middleware/validarJwt')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', getIndex);


router.get('/search/?',validarJwt, getSearch)
router.get('/dashboard',validarJwt,goDashboard)
router.get('/search/add/:id',validarJwt, addMovie)
router.get('/search/view/:id',validarJwt, viewMovie)

router.get('/signup', getSignup)
router.get('/logout', logout)
router.post('/login', checkLogin)



module.exports = router