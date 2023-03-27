const express=require('express');
const router=express.Router();
const bodyParser = require('body-parser');
const {getIndex, getSearch, getSignup, getDashboard} = require('../controllers/frontControllers')
const {checkLogin} = require('../controllers/apiUsersControllers')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', getIndex);
router.get('/dashboard',getDashboard)
router.get('/search/?', getSearch)
router.get('/signup', getSignup)

router.post('/login', checkLogin)


module.exports = router