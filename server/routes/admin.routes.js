const express=require('express')
const routes=express.Router()
const {downloadExcel} = require('../controllers/admin.controller')

routes.get('/downloadExcel', downloadExcel)

module.exports = routes