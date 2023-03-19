const express=require('express');
const router=express.Router();
const bodyParser = require('body-parser');
const {getIndex} = require('../controllers/frontControllers')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', getIndex)

module.exports = router