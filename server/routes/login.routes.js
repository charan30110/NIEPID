const express=require('express')
const routes=express.Router()
const { checkUser } = require('../controllers/login.controller');

routes.post('/',checkUser);

module.exports=routes